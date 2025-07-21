import type { Optional } from "@repo/types/utils";

export type AccountRecord = {
  id: number;
  userId: number;
  balance: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountValues = Optional<AccountRecord, "balance" | "createdAt" | "updatedAt">;
