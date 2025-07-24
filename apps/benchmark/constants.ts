import type { BenchmarkQueries } from "@repo/benchmark/types";

export const QUERY_KEY_MAP = {
  GET_TRANSACTIONS_SUM: "getTransactionsSum",
  LIST_TOP_RECIPIENTS: "listTopRecipients",
  LIST_RECENT_TRANSACTIONS_WITH_INFO: "listRecentTransactionsWithInfo",
} satisfies Record<string, keyof BenchmarkQueries>;

export const QUERY_KEYS = Object.values(QUERY_KEY_MAP);

export const QUERY_TITLE_MAP = {
  [QUERY_KEY_MAP.GET_TRANSACTIONS_SUM]: "Get transactions sum",
  [QUERY_KEY_MAP.LIST_TOP_RECIPIENTS]: "List top recipients",
  [QUERY_KEY_MAP.LIST_RECENT_TRANSACTIONS_WITH_INFO]: "List recent transactions",
};
