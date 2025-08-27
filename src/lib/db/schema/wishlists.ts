import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { products } from "./products";

export const wishlists = pgTable("wishlists", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});
