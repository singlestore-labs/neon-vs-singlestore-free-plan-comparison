import fs from "node:fs";
import path from "node:path";

import type {
  BenchmarkConfig,
  BenchmarkDatabaseSchemaQuery,
  BenchmarkQueries,
  BenchmarkQueryResults,
  BenchmarkResult,
  BenchmarkTableRowCountQuery,
} from "@repo/benchmark/types";

const DEFAULT_TRIES = 5;

export async function runBenchmark(
  config: BenchmarkConfig,
  queries: BenchmarkQueries,
  databaseSchemaQuery: BenchmarkDatabaseSchemaQuery,
  tableRowCountQuery: BenchmarkTableRowCountQuery,
): Promise<BenchmarkResult> {
  const resultsPath = path.resolve(path.dirname(process.argv[1] ?? ""), "../");
  fs.mkdirSync(resultsPath, { recursive: true });

  const queryResults: BenchmarkQueryResults = {};

  for (const [name, query] of Object.entries(queries)) {
    console.log(`[${config.title}] Executing query "${name}"`);

    for (let i = 1; i <= DEFAULT_TRIES; i++) {
      if (!queryResults[name]) {
        queryResults[name] = [];
      }

      try {
        const start = performance.now();
        await query();
        const time = performance.now() - start;
        queryResults[name].push(time);
      } catch (error) {
        console.error(`[${config.title}] Error executing query "${name}", attempt #${i}`, error);
        queryResults[name].push(null);
        continue;
      }
    }
  }

  const result: BenchmarkResult = {
    ...config,
    date: new Date().toISOString(),
    databaseSchema: await databaseSchemaQuery(),
    tableRowCount: await tableRowCountQuery(),
    queryResults,
  };

  fs.writeFileSync(path.join(resultsPath, "result.json"), JSON.stringify(result, null, 2), "utf-8");

  return result;
}
