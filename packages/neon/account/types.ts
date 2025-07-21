import type { accountRecordSchema, accountValuesSchema } from "@repo/neon/account/schema";
import type { z } from "zod/v4";

export type AccountRecord = z.infer<typeof accountRecordSchema>;
export type AccountValues = z.infer<typeof accountValuesSchema>;
