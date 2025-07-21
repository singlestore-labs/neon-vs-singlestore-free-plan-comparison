import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { drizzle } from "drizzle-orm/singlestore";

export const singlestore = drizzle({
  connection: {
    uri: process.env.SINGLESTORE_DB_URL!,
    ssl: {
      ca: readFileSync(resolve("./singlestore_bundle.pem"), "utf-8"),
    },
  },
});
