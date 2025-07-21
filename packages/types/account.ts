import type * as neon from "@repo/neon/account/types";
import type * as singlestore from "@repo/singlestore/account/types";

export type AccountRecord = neon.AccountRecord | singlestore.AccountRecord;
export type AccountValues = neon.AccountValues | singlestore.AccountValues;
