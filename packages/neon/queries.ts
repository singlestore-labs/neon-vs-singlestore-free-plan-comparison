import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import type { BenchmarkDatabaseSchemaQuery, BenchmarkQueries, BenchmarkTableRowCountQuery } from "@repo/benchmark/types";
import { neon } from "@repo/neon/index";
import * as schema from "@repo/neon/schema";
import { accountsTable } from "@repo/neon/schemas/account";
import { transactionsTable, transactionStatusesTable, transactionTypesTable } from "@repo/neon/schemas/transaction";
import { usersTable } from "@repo/neon/schemas/user";
import { subDays } from "date-fns";
import { and, asc, count, desc, eq, getTableName, gt, gte, sql, sum } from "drizzle-orm";

export const databaseSchemaQuery: BenchmarkDatabaseSchemaQuery = async () => {
  return readFileSync(resolve("./schema.sql"), "utf-8");
};

export const tableRowCountQuery: BenchmarkTableRowCountQuery = async () => {
  const result: Awaited<ReturnType<BenchmarkTableRowCountQuery>> = {};

  for (const table of Object.values(schema)) {
    const row = (await neon.select({ count: count() }).from(table)).at(0);
    result[getTableName(table)] = row?.count ?? 0;
  }

  return result;
};

export const queries: BenchmarkQueries = {
  getTransactionsSum: async () => {
    const result = await neon
      .select({ sum: sum(transactionsTable.amount) })
      .from(transactionsTable)
      .innerJoin(transactionStatusesTable, eq(transactionStatusesTable.id, transactionsTable.statusId))
      .where(and(gt(transactionsTable.createdAt, subDays(new Date(), 30)), eq(transactionStatusesTable.name, "success")));

    return +(result.at(0)?.sum ?? 0);
  },

  listTopRecipients: async () => {
    const result = await neon
      .select({
        accountId: transactionsTable.accountIdTo,
        count: count(transactionsTable.id).as("count"),
      })
      .from(transactionsTable)
      .innerJoin(transactionTypesTable, eq(transactionTypesTable.id, transactionsTable.typeId))
      .innerJoin(transactionStatusesTable, eq(transactionStatusesTable.id, transactionsTable.statusId))
      .where(and(eq(transactionTypesTable.name, "transfer"), eq(transactionStatusesTable.name, "success")))
      .groupBy(transactionsTable.accountIdTo)
      .orderBy(desc(sql`"count"`), asc(transactionsTable.accountIdTo))
      .limit(10);

    return result;
  },

  listRecentTransactionsWithInfo: async () => {
    const result = await neon
      .select({
        userId: usersTable.id,
        accountId: accountsTable.id,
        name: usersTable.name,
        amount: transactionsTable.amount,
        type: transactionTypesTable.name,
        createdAt: transactionsTable.createdAt,
      })
      .from(usersTable)
      .innerJoin(accountsTable, eq(accountsTable.userId, usersTable.id))
      .innerJoin(transactionsTable, eq(transactionsTable.accountIdFrom, accountsTable.id))
      .innerJoin(transactionTypesTable, eq(transactionTypesTable.id, transactionsTable.typeId))
      .where(gte(transactionsTable.createdAt, subDays(new Date(), 7)))
      .orderBy(desc(transactionsTable.createdAt), desc(transactionsTable.id))
      .limit(100);

    return result;
  },
};
