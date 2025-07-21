import type * as neon from "@repo/neon/user/types";
import type * as singlestore from "@repo/singlestore/user/types";

export type UserRecord = neon.UserRecord | singlestore.UserRecord;
export type UserValues = neon.UserValues | singlestore.UserValues;
