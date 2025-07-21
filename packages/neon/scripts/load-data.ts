import { createReadStream, existsSync } from "node:fs";
import { join, resolve } from "node:path";

import { pgPool } from "@repo/neon/index";
import pgCopyStreams from "pg-copy-streams";

const DATA_PATH = resolve("../../apps/data-generator/export");

const ENTITIES = [
  { tableName: "users", filePrefix: "users" },
  { tableName: "accounts", filePrefix: "accounts" },
  { tableName: "transaction_types", filePrefix: "transaction-types" },
  { tableName: "transaction_statuses", filePrefix: "transaction-statuses" },
  { tableName: "transactions", filePrefix: "transactions" },
] as const;

(async () => {
  try {
    const client = await pgPool.connect();

    for (const { tableName, filePrefix } of ENTITIES) {
      await client.query(`TRUNCATE TABLE ${tableName}`);

      for (let i = 1; ; i++) {
        const dataFilePath = join(DATA_PATH, `${filePrefix}-${i}.csv`);
        if (!existsSync(dataFilePath)) break;
        console.log(`[neon] Loading ${dataFilePath} → ${tableName}`);

        const stream = client.query(pgCopyStreams.from(`COPY ${tableName} FROM STDIN WITH CSV`));
        const fileStream = createReadStream(dataFilePath);

        await new Promise<void>((resolve, reject) => {
          fileStream.pipe(stream).on("finish", resolve).on("error", reject);
        });
      }
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
