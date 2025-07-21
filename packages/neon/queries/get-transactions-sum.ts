import { neon } from "@repo/neon";
import { transactionsTable, transactionStatusesTable } from "@repo/neon/schemas/transaction";
import type { GetTransactionsSumResult } from "@repo/types/queries";
import { subDays } from "date-fns";
import { and, eq, gt, sum } from "drizzle-orm";

export async function getTransactionsSum(): Promise<GetTransactionsSumResult> {
  const result = await neon
    .select({ sum: sum(transactionsTable.amount) })
    .from(transactionsTable)
    .innerJoin(transactionStatusesTable, eq(transactionStatusesTable.id, transactionsTable.statusId))
    .where(and(gt(transactionsTable.createdAt, subDays(new Date(), 30)), eq(transactionStatusesTable.name, "success")));

  return +(result.at(0)?.sum ?? 0);
}
