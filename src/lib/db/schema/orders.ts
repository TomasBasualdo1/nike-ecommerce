import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user";
import { productVariants } from "./variants";

export const orderStatusEnum = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export const paymentMethodEnum = ["stripe", "paypal", "cod"] as const;
export const paymentStatusEnum = ["initiated", "completed", "failed"] as const;

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  status: text("status").$type<(typeof orderStatusEnum)[number]>().notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  shippingAddressId: uuid("shipping_address_id").notNull(),
  billingAddressId: uuid("billing_address_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  productVariantId: uuid("product_variant_id")
    .references(() => productVariants.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: numeric("price_at_purchase", {
    precision: 10,
    scale: 2,
  }).notNull(),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  method: text("method").$type<(typeof paymentMethodEnum)[number]>().notNull(),
  status: text("payment_status")
    .$type<(typeof paymentStatusEnum)[number]>()
    .notNull(),
  paidAt: timestamp("paid_at"),
  transactionId: text("transaction_id"),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
  payments: many(payments),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  variant: one(productVariants, {
    fields: [orderItems.productVariantId],
    references: [productVariants.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, { fields: [payments.orderId], references: [orders.id] }),
}));
