import type { BenchmarkQueries } from "@repo/benchmark/types";
import type { Metadata } from "next";

export const TITLE = "Neon vs SingleStore: Free Plan Comparison (3.5M Rows)";

export const METADATA = {
  title: TITLE,
  description: "",
} satisfies Metadata;

export const GITHUB_REPOSITORY_URL = "https://github.com/singlestore-labs/neon-vs-singlestore-free-plan-comparison";

export const HEADER_CTA_URL =
  "https://portal.singlestore.com/intention/cloud?utm_source=yaroslav&utm_medium=app&utm_campaign=general-technical&utm_content=neon-vs-singlestore-free-plan-comparison";

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
