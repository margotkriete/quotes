import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, serial, text, customType } from "drizzle-orm/pg-core";

require("dotenv").config();
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  note: text("note"),
});

export const bytea = customType<{
  data: Buffer;
  notNull: false;
  default: false;
}>({
  dataType() {
    return "bytea";
  },
});

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  hashed_password: bytea("hashed_password"),
});

// export const createUser = async () => {
//   console.info("creating user");
//   const hashedPassword = await bcrypt.hash("pw-here", 8);
//   await db.insert(usersTable).values({
//     username: "username-here",
//     hashed_password: hashedPassword,
//   });
// };
