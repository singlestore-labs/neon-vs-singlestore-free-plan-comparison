import fs from "node:fs";
import path from "node:path";

import type { BenchmarkResult } from "@repo/benchmark/types";
import { Card, CardContent } from "@repo/ui/components/card";
import { sync } from "glob";

import { ResultList } from "@/components/result/list";
import { ResultListItem } from "@/components/result/list-item";
import { QUERY_KEYS } from "@/constants";
import { calcAverage, calcX } from "@/utils";

async function getBenchmarkResults(): Promise<BenchmarkResult[]> {
  const rootDir = path.resolve(process.cwd(), "../../");
  const resultFiles = sync("packages/**/result.json", { cwd: rootDir });

  return resultFiles.map((relativePath) => {
    const fullPath = path.join(rootDir, relativePath);
    const raw = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(raw);
  });
}

export default async function PageHome() {
  const results = await getBenchmarkResults();

  const systemAvgQueryTimes: Record<string, Record<string, number>> = {};
  for (const result of results) {
    for (const queryKey of QUERY_KEYS) {
      const times = result.queryResults[queryKey]?.map((i) => (i === null ? 0 : i));
      const avgTime = times ? calcAverage(times) : 0;
      systemAvgQueryTimes[result.title] = { ...systemAvgQueryTimes[result.title], [queryKey]: avgTime };
    }
  }

  const systemAvgTimes: Record<string, number> = {};
  for (const result of results) {
    systemAvgTimes[result.title] = calcAverage(Object.values(systemAvgQueryTimes[result.title] ?? []));
  }

  const systemMaxAvgTime: number = Math.max(...Object.values(systemAvgTimes));

  const queryMaxAvgTimes: Record<string, number> = {};
  for (const queryKey of QUERY_KEYS) {
    const avgTimes = results.reduce<number[]>((acc, result) => {
      const time = systemAvgQueryTimes[result.title]?.[queryKey];
      return time ? [...acc, time] : acc;
    }, []);

    queryMaxAvgTimes[queryKey] = Math.max(...avgTimes);
  }

  const systemXTimes: Record<string, number> = {};
  for (const [system, avgTime] of Object.entries(systemAvgTimes)) {
    systemXTimes[system] = calcX(avgTime, systemMaxAvgTime);
  }

  const systemQueryXTimes: Record<string, Record<string, number>> = {};
  for (const [system, queryAvgTimes] of Object.entries(systemAvgQueryTimes)) {
    if (!systemQueryXTimes[system]) {
      systemQueryXTimes[system] = {};
    }

    for (const [queryKey, avgTime] of Object.entries(queryAvgTimes)) {
      systemQueryXTimes[system][queryKey] = calcX(avgTime, queryMaxAvgTimes[queryKey] ?? 0);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent>
          <div className="grid grid-cols-[16rem_1fr] gap-4">
            <span className="font-medium">System</span>
            <span className="font-medium">Aggregate Performance</span>
          </div>

          <ResultList className="mt-6">
            {results.map((result) => (
              <ResultListItem
                key={result.title}
                title={result.title}
                date={result.date}
                version={result.version}
                queryResults={result.queryResults}
                avgTime={systemAvgTimes[result.title] ?? 0}
                maxAvgTime={systemMaxAvgTime}
                x={systemXTimes[result.title] ?? 0}
                avgQueryTimes={systemAvgQueryTimes[result.title] ?? {}}
                queryMaxAvgTimes={queryMaxAvgTimes}
                queryXTimes={systemQueryXTimes[result.title] ?? {}}
                databaseSchema={result.databaseSchema}
                tableRowCount={result.tableRowCount}
              />
            ))}
          </ResultList>
        </CardContent>
      </Card>
    </div>
  );
}
