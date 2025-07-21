import "dotenv/config";

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    url: process.env.SINGLESTORE_DB_URL!,
    ssl: {
      ca: readFileSync(resolve("./singlestore_bundle.pem"), "utf-8"),
    },
  },
});
