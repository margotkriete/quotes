import express from "express";
import { eq } from "drizzle-orm";
import { db, postsTable, usersTable } from "../db";
import { r2 } from "./r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

var passport = require("passport");

const router = express.Router();

const bcrypt = require("bcrypt");
var LocalStrategy = require("passport-local");
const INCORRECT_MSG = "Incorrect username or password";

interface User {
  id: number;
  username: string;
  hashed_password: Buffer;
}

passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    cb: any
  ) {
    const row = (await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))) as Array<User>;
    if (row.length !== 1) {
      return cb(null, false, { message: INCORRECT_MSG });
    }
    const matchedPw = await bcrypt.compare(password, row[0].hashed_password);
    if (!matchedPw) {
      return cb(null, false, { message: INCORRECT_MSG });
    }
    return cb(null, row[0].username);
  })
);

router.post(
  "/login/password",
  passport.authenticate("local"),
  function (req: any, res) {
    res.status(200).json({ username: req.user });
  }
);

router.get("/posts", async (_req, res) => {
  const result = await db.select().from(postsTable);
  res.status(200).json({ message: result });
});

router.get("/post/:postId", async (req: any, res) => {
  const result = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, Number(req.params.postId)));
  res.status(200).json({ message: result });
});

router.post("/get-signed-url", async (_req, res) => {
  const key = uuidv4();
  getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 60 }
  ).then((signedUrl) => {
    res.status(200).json({ url: signedUrl, key: key });
  });
});

router.post("/post", async (_req, res) => {
  db.insert(postsTable)
    .values(_req.body)
    .returning()
    .then((result) => {
      res.status(200).json({ id: result[0].id });
    });
});

export default router;
