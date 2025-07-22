import { bigint, singlestoreTable, timestamp, varchar } from "drizzle-orm/singlestore-core";

export const usersTable = singlestoreTable("users", {
  id: bigint({ mode: "number" }).primaryKey(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
