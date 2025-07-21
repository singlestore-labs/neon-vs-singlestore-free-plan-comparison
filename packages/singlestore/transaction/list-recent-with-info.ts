import { singlestore } from "@repo/singlestore";
import { accountsTable } from "@repo/singlestore/account/schema";
import { transactionsTable, transactionTypesTable } from "@repo/singlestore/transaction/schema";
import { usersTable } from "@repo/singlestore/user/schema";
import { subDays } from "date-fns";
import { desc, eq, gte } from "drizzle-orm";

export async function listRecentTransactionsWithInfo() {
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
