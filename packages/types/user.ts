import type { Optional } from "@repo/types/utils";

export type UserRecord = {
  id: number;
  name: string | null;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserValues = Optional<UserRecord, "name" | "email" | "createdAt" | "updatedAt">;
