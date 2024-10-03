import express from 'express';
import { eq } from 'drizzle-orm';
import { db, postsTable } from '../db';
import { r2 } from './r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

router.get('/posts', async (_req, res) => {
  const result = await db.select().from(postsTable);
  res.status(200).json({ message: result });
});

router.get('/post/:postId', async (_req, res) => {
  const result = await db.select().from(postsTable).where(eq(postsTable.id, Number(_req.params.postId)));
  res.status(200).json({ message: result });
});

const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })

// TODO: move file upload contents in body to /upload-to-r2 section
router.post('/get-signed-url', upload.single('uploadedImg'), async (_req, res) => {
  const signedURL: any = await getSignedUrl(r2, new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: uuidv4()
  }), {expiresIn: 60});

  res.status(200).json({ url: signedURL });
});

router.post('/upload-to-r2', async (_req, res) => {
  const signedUrl = _req.body.signedUrl;
  // TODO: _req.body here should contain file blob to upload
  await axios.put(signedUrl, _req.body);
})

router.post('/post', async (_req, res) => {
  const result = await db.insert(postsTable).values(_req.body);
  res.status(200).json({message: result});
})

export default router;
