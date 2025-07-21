import type { Optional } from "@repo/types/utils";

export type TransactionTypeRecord = {
  id: number;
  name: string;
};

export type TransactionTypeValues = TransactionTypeRecord;

export type TransactionStatusRecord = {
  id: number;
  name: string;
};

export type TransactionStatusValues = TransactionStatusRecord;

export type TransactionRecord = {
  id: number;
  accountIdFrom: number | null;
  accountIdTo: number | null;
  typeId: TransactionTypeRecord["id"];
  statusId: TransactionStatusRecord["id"];
  amount: string | null;
  createdAt: Date;
};

export type TransactionValues = Optional<TransactionRecord, "accountIdFrom" | "accountIdTo" | "amount" | "createdAt">;
