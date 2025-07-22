import { runBenchmark } from "@repo/benchmark/run";
import { benchmarkConfig } from "@repo/neon/config";
import { benchmarkQueries } from "@repo/neon/queries";

(async () => {
  try {
    await runBenchmark(benchmarkConfig, benchmarkQueries);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
