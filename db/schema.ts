import { sql } from "drizzle-orm";
import { uuid, integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  image_url: text("image_url").default(""),
});
