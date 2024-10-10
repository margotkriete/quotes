import express from "express";
import { eq } from "drizzle-orm";
import { db, postsTable, usersTable } from "../db";
import { r2 } from "./r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

interface User {
  id: number;
  username: string;
  hashed_password: Buffer;
}

const INCORRECT_MSG = "Incorrect username or password";

passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: any,
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
    return cb(null, row[0]);
  })
);

passport.serializeUser(function (user: any, cb: any) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user: any, cb: any) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();

router.get("/posts", async (_req, res) => {
  const result = await db.select().from(postsTable);
  res.status(200).json({ message: result });
});

router.get("/post/:postId", async (_req, res) => {
  const result = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, Number(_req.params.postId)));
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

router.post(
  "/login/password",
  passport.authenticate("local", {}),
  function (_req, res) {
    console.log("updating result");
    res.status(200).json({ message: "test" });
  }
);

// router.post("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

export default router;
