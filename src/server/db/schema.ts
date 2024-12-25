// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  decimal,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `split-smart_${name}`);

export const groups = createTable("groups", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const users = createTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  clerkId: varchar("clerk_id", { length: 256 }).unique().notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  name: varchar("name", { length: 256 }),
});

export const groupMembers = createTable("group_members", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  groupId: integer("group_id").references(() => groups.id),
  userId: integer("user_id").references(() => users.id),
  joinedAt: timestamp("joined_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const orders = createTable("orders", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  groupId: integer("group_id")
    .references(() => groups.id)
    .notNull(),
  createdBy: integer("created_by")
    .references(() => users.id)
    .notNull(),
  date: timestamp("date", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  platform: varchar("platform", { length: 256 }),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
});

export const items = createTable("items", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
});

export const itemShares = createTable("item_shares", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  itemId: integer("item_id").references(() => items.id),
  userId: integer("user_id").references(() => users.id),
  shareCount: decimal("share_count", { precision: 5, scale: 2 }).notNull(),
});
