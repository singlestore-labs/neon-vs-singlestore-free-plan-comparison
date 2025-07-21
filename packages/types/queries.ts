import type { AccountRecord } from "@repo/types/account";
import type { TransactionRecord, TransactionTypeRecord } from "@repo/types/transaction";
import type { UserRecord } from "@repo/types/user";

export type GetTransactionsSumResult = number;

export type ListRecentTransactionsWithInfoResult = {
  userId: UserRecord["id"];
  accountId: AccountRecord["id"];
  name: UserRecord["name"];
  amount: TransactionRecord["amount"];
  type: TransactionTypeRecord["name"];
  createdAt: TransactionRecord["createdAt"];
}[];

export type ListTopRecipientsResult =
  | {
      accountId: TransactionRecord["accountIdTo"];
      count: number;
    }
  | undefined;
