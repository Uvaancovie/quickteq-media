// drizzle/schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  numeric,
  integer,
  timestamp,
  boolean
} from 'drizzle-orm/pg-core';

// 1) USERS
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('customer'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull()
});

// 2) PRODUCTS
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  brand: varchar('brand', { length: 100 }),
  model: varchar('model', { length: 100 }),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').default(0).notNull(),
  ram: varchar('ram', { length: 50 }),
  processor: varchar('processor', { length: 100 }),
  imageUrl: text('image_url'),
  isSpecial: boolean('is_special').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull()
});

// 3) ORDERS
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 })
    .notNull(),
  paymentStatus: varchar('payment_status', { length: 50 })
    .default('pending')
    .notNull(),
  deliveryStatus: varchar('delivery_status', { length: 50 })
    .default('not_shipped')
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull()
});

// 4) ORDER_ITEMS
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 })
    .notNull(), // price at the time of order
});

// 5) DELIVERIES (Optional)
export const deliveries = pgTable('deliveries', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  courier: varchar('courier', { length: 50 })
    .default('the_courier_guy')
    .notNull(),
  trackingNumber: varchar('tracking_number', { length: 255 }),
  status: varchar('status', { length: 50 }).default('in_transit'),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
});
