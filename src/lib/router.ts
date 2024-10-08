import express from "express";
import { eq } from "drizzle-orm";
import { db, postsTable } from "../db";
import { r2 } from "./r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

var passport = require("passport");

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

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
