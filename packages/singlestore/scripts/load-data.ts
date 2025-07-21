import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

import { singlestore } from "@repo/singlestore/index";
import { sql } from "drizzle-orm";

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
    await singlestore.execute(
      sql.raw(`
        SET autocommit = 0;
        SET unique_checks = 0;
        SET foreign_key_checks = 0;
      `),
    );

    for (const { tableName, filePrefix } of ENTITIES) {
      await singlestore.execute(sql.raw(`TRUNCATE ${tableName};`));

      for (let i = 1; ; i++) {
        const dataFilePath = join(DATA_PATH, `${filePrefix}-${i}.csv`);
        if (!existsSync(dataFilePath)) break;
        console.log(`[singlestore] Loading ${dataFilePath} → ${tableName}`);

        await singlestore.execute(
          sql.raw(`
            LOAD DATA LOCAL INFILE '${dataFilePath}'
            INTO TABLE ${tableName}
            FIELDS TERMINATED BY ','
            ENCLOSED BY '"';
          `),
        );

        await singlestore.execute(sql.raw("COMMIT;"));
      }
    }

    await singlestore.execute(
      sql.raw(`
        SET autocommit = 1;
        SET unique_checks = 1;
        SET foreign_key_checks = 1;
      `),
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
