import { singlestore } from "@repo/singlestore";
import { accountsTable } from "@repo/singlestore/schemas/account";
import { transactionsTable, transactionTypesTable } from "@repo/singlestore/schemas/transaction";
import { usersTable } from "@repo/singlestore/schemas/user";
import type { ListRecentTransactionsWithInfoResult } from "@repo/types/queries";
import { subDays } from "date-fns";
import { desc, eq, gte } from "drizzle-orm";

export async function listRecentTransactionsWithInfo(): Promise<ListRecentTransactionsWithInfoResult> {
  const result = await singlestore
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
}
