import type * as neon from "@repo/neon/transaction/types";
import type * as singlestore from "@repo/singlestore/transaction/types";

export type TransactionRecord = neon.TransactionRecord | singlestore.TransactionRecord;
export type TransactionValues = neon.TransactionValues | singlestore.TransactionValues;

export type TransactionTypeRecord = neon.TransactionTypeRecord | singlestore.TransactionTypeRecord;
export type TransactionTypeValues = neon.TransactionTypeValues | singlestore.TransactionTypeValues;

export type TransactionStatusRecord = neon.TransactionStatusRecord | singlestore.TransactionStatusRecord;
export type TransactionStatusValues = neon.TransactionStatusValues | singlestore.TransactionStatusValues;
