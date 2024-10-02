import express from 'express';
import { eq } from 'drizzle-orm';
import { db, postsTable } from '../db';

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

router.post('/upload', upload.single('uploadedImg'), async (_req, res) => {
  console.info('request body', _req.body)
  const result = await db.insert(postsTable).values(_req.body);
  res.status(200).json({ message: result });
});

export default router;
