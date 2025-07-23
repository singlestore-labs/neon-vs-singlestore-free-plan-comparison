import { runBenchmark } from "@repo/benchmark/run";
import { config } from "@repo/neon/config";
import { queries, tableRowCountQuery } from "@repo/neon/queries";

(async () => {
  try {
    await runBenchmark(config, queries, tableRowCountQuery);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
