import { bigint, decimal, pgTable, timestamp } from "drizzle-orm/pg-core";

export const accountsTable = pgTable("accounts", {
  id: bigint({ mode: "number" }).primaryKey(),
  userId: bigint("user_id", { mode: "number" }).notNull(),
  balance: decimal({ precision: 18, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
