import express from 'express';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  url: text('url').notNull(),
  note: text('note')
});

const router = express.Router();

router.get('/posts', async (_req, res) => {
  require('dotenv').config() 
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  const result = await db.select().from(posts);
  res.status(200).json({ message: result });
});

export default router;
