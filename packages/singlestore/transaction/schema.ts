import { bigint, decimal, singlestoreTable, timestamp, varchar } from "drizzle-orm/singlestore-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const transactionTypesTable = singlestoreTable("transaction_types", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const transactionTypeRecordSchema = createSelectSchema(transactionTypesTable);
export const transactionTypeValuesSchema = createInsertSchema(transactionTypesTable);

export const transactionStatusesTable = singlestoreTable("transaction_statuses", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const transactionStatusRecordSchema = createSelectSchema(transactionStatusesTable);
export const transactionStatusValuesSchema = createInsertSchema(transactionStatusesTable);

export const transactionsTable = singlestoreTable("transactions", {
  id: bigint({ mode: "bigint" }).primaryKey(),
  accountIdFrom: bigint("account_id_from", { mode: "bigint" }),
  accountIdTo: bigint("account_id_to", { mode: "bigint" }),
  typeId: bigint("transaction_type_id", { mode: "bigint" }).notNull(),
  statusId: bigint("transaction_status_id", { mode: "bigint" }).notNull(),
  amount: decimal({ precision: 18, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactionRecordSchema = createSelectSchema(transactionsTable);
export const transactionValuesSchema = createInsertSchema(transactionsTable);
