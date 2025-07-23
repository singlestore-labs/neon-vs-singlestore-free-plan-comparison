import type { AccountRecord } from "@repo/types/account";
import type { TransactionRecord, TransactionTypeRecord } from "@repo/types/transaction";
import type { UserRecord } from "@repo/types/user";
import type { Merge } from "@repo/types/utils";

export type BenchmarkTableRowCountQuery = () => Promise<Record<string, number>>;

export type BenchmarkQueries = {
  getTransactionsSum: () => Promise<number>;

  listTopRecipients: () => Promise<
    {
      accountId: TransactionRecord["accountIdTo"];
      count: number;
    }[]
  >;

  listRecentTransactionsWithInfo: () => Promise<
    {
      userId: UserRecord["id"];
      accountId: AccountRecord["id"];
      name: UserRecord["name"];
      amount: TransactionRecord["amount"];
      type: TransactionTypeRecord["name"];
      createdAt: TransactionRecord["createdAt"];
    }[]
  >;
};

export type BenchmarkConfig = {
  title: string;
  description?: string;
  version?: string;
};

export type BenchmarkQueryResults = Record<string, (number | null)[]>;

export type BenchmarkResult = Merge<
  BenchmarkConfig & {
    date: string;
    tableRowCount: Awaited<ReturnType<BenchmarkTableRowCountQuery>>;
    queryResults: BenchmarkQueryResults;
  }
>;
