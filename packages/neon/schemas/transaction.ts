import { bigint, decimal, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const transactionTypesTable = pgTable("transaction_types", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const transactionStatusesTable = pgTable("transaction_statuses", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const transactionsTable = pgTable("transactions", {
  id: bigint({ mode: "number" }).primaryKey(),
  accountIdFrom: bigint("account_id_from", { mode: "number" }),
  accountIdTo: bigint("account_id_to", { mode: "number" }),
  typeId: bigint("transaction_type_id", { mode: "number" }).notNull(),
  statusId: bigint("transaction_status_id", { mode: "number" }).notNull(),
  amount: decimal({ precision: 18, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
