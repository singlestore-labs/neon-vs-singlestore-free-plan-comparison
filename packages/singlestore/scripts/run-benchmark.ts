import { runBenchmark } from "@repo/benchmark/run";
import { config } from "@repo/singlestore/config";
import { databaseSchemaQuery, queries, tableRowCountQuery } from "@repo/singlestore/queries";

(async () => {
  try {
    await runBenchmark(config, queries, databaseSchemaQuery, tableRowCountQuery);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
