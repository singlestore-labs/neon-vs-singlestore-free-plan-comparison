import { bigint, singlestoreTable, timestamp, varchar } from "drizzle-orm/singlestore-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = singlestoreTable("users", {
  id: bigint({ mode: "number" }).primaryKey(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const userRecordSchema = createSelectSchema(usersTable);
export const userValuesSchema = createInsertSchema(usersTable);
