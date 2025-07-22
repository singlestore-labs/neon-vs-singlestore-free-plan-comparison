import { bigint, decimal, singlestoreTable, timestamp } from "drizzle-orm/singlestore-core";

export const accountsTable = singlestoreTable("accounts", {
  id: bigint({ mode: "number" }).primaryKey(),
  userId: bigint("user_id", { mode: "number" }).notNull(),
  balance: decimal({ precision: 18, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
