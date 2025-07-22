import { runBenchmark } from "@repo/benchmark/run";
import { benchmarkConfig } from "@repo/singlestore/config";
import { benchmarkQueries } from "@repo/singlestore/queries";

(async () => {
  try {
    await runBenchmark(benchmarkConfig, benchmarkQueries);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
