import express from 'express';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
require('dotenv').config() 

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  url: text('url').notNull(),
  note: text('note')
});

const router = express.Router();

router.get('/posts', async (_req, res) => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  const result = await db.select().from(posts);
  res.status(200).json({ message: result });
});

router.get('/post/:postId', async (_req, res) => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  const result = await db.select().from(posts).where(eq(posts.id, Number(_req.params.postId)));
  res.status(200).json({ message: result });
});

export default router;
