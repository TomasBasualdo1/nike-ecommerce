import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { z } from "zod";

export const colors = pgTable("colors", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  hexCode: text("hex_code").notNull(),
});

export const insertColorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  hexCode: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
});
export const selectColorSchema = insertColorSchema.extend({
  id: z.string().uuid(),
});
