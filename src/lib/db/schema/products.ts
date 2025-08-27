import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { genders } from "./filters/genders";
import { brands } from "./brands";
import { z } from "zod";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  genderId: uuid("gender_id")
    .references(() => genders.id)
    .notNull(),
  brandId: uuid("brand_id")
    .references(() => brands.id)
    .notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  // optional FK to a variant (set after variants exist) kept without reference to avoid circular import
  defaultVariantId: uuid("default_variant_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Zod validation
export const insertProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string().uuid(),
  genderId: z.string().uuid(),
  brandId: z.string().uuid(),
  isPublished: z.boolean().optional(),
  defaultVariantId: z.string().uuid().optional(),
});
export const selectProductSchema = insertProductSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
