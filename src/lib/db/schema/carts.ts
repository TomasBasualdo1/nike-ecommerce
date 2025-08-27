import { pgTable, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user";
import { guests } from "./guest";
import { productVariants } from "./variants";

export const carts = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  guestId: uuid("guest_id").references(() => guests.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .references(() => carts.id)
    .notNull(),
  productVariantId: uuid("product_variant_id")
    .references(() => productVariants.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
});

export const cartsRelations = relations(carts, ({ many, one }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
  guest: one(guests, { fields: [carts.guestId], references: [guests.id] }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
  variant: one(productVariants, {
    fields: [cartItems.productVariantId],
    references: [productVariants.id],
  }),
}));
