import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  real,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";
import { colors } from "./filters/colors";
import { sizes } from "./filters/sizes";
import { z } from "zod";

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .references(() => products.id)
      .notNull(),
    sku: text("sku").notNull().unique(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
    colorId: uuid("color_id")
      .references(() => colors.id)
      .notNull(),
    sizeId: uuid("size_id")
      .references(() => sizes.id)
      .notNull(),
    inStock: integer("in_stock").notNull(),
    weight: real("weight").notNull(),
    dimensions: jsonb("dimensions"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      colorProductIdx: index("idx_variants_color_product").on(
        table.colorId,
        table.productId
      ),
      sizeProductIdx: index("idx_variants_size_product").on(
        table.sizeId,
        table.productId
      ),
    };
  }
);

export const productVariantsRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    color: one(colors, {
      fields: [productVariants.colorId],
      references: [colors.id],
    }),
    size: one(sizes, {
      fields: [productVariants.sizeId],
      references: [sizes.id],
    }),
  })
);

export const insertVariantSchema = z.object({
  productId: z.string().uuid(),
  sku: z.string().min(1),
  price: z.string(),
  salePrice: z.string().optional(),
  colorId: z.string().uuid(),
  sizeId: z.string().uuid(),
  inStock: z.number().int().nonnegative(),
  weight: z.number().positive(),
  dimensions: z
    .object({ length: z.number(), width: z.number(), height: z.number() })
    .optional(),
});
export const selectVariantSchema = insertVariantSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date().optional(),
});
