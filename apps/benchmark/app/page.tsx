import fs from "node:fs";
import path from "node:path";

import type { BenchmarkQueries, BenchmarkResult } from "@repo/benchmark/types";
import { Card, CardContent } from "@repo/ui/components/card";
import { sync } from "glob";
import ms from "pretty-ms";

import { ResultBar } from "@/components/result/bar";

const QUERY_TITLE_MAP: Record<keyof BenchmarkQueries, string> = {
  getTransactionsSum: "Get transactions sum",
  listTopRecipients: "List top recipients",
  listRecentTransactionsWithInfo: "List recent transactions",
};

async function getBenchmarkResults(): Promise<BenchmarkResult[]> {
  const rootDir = path.resolve(process.cwd(), "../../");
  const resultFiles = sync("packages/**/result.json", { cwd: rootDir });

  return resultFiles.map((relativePath) => {
    const fullPath = path.join(rootDir, relativePath);
    const raw = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(raw);
  });
}

function calcAverage(value: number[]): number {
  if (value.length === 0) return 0;
  return value.reduce((acc, value) => acc + value, 0) / value.length;
}

function calcX(a: number, b: number): number {
  if (a === b) return 0;
  const faster = Math.min(a, b);
  const slower = Math.max(a, b);
  const ratio = slower / faster;
  return Math.round(ratio * 100) / 100;
}

export default async function PageHome() {
  const results = await getBenchmarkResults();
  const queryKeys = Object.keys(results[0]?.queryResults ?? {});

  const systemAvgQueryTimes: Record<string, Record<string, number>> = {};
  for (const result of results) {
    for (const queryKey of queryKeys) {
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
  for (const queryKey of queryKeys) {
    const avgTimes = results.reduce<number[]>((acc, result) => {
      const time = systemAvgQueryTimes[result.title]?.[queryKey];
      return time ? [...acc, time] : acc;
    }, []);

    queryMaxAvgTimes[queryKey] = Math.max(...avgTimes);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent>
          <span className="font-medium">Dataset</span>
          <pre className="bg-background/50 mt-6 max-h-64 overflow-auto rounded-lg border p-4 text-sm">
            {JSON.stringify(
              Object.entries(results[0]?.tableRowCount ?? {}).reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [key]: new Intl.NumberFormat("en-US").format(value),
                }),
                {},
              ),
              null,
              2,
            )}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="grid grid-cols-[16rem_1fr] gap-4">
            <span className="font-medium">System</span>
            <span className="font-medium">Relative Time (lower is better)</span>
          </div>

          <ul className="mt-6 flex flex-col gap-6">
            {results.map((result) => {
              const avgTime = systemAvgTimes[result.title] ?? 0;
              const x = calcX(avgTime, systemMaxAvgTime);

              return (
                <li
                  key={result.title}
                  className="grid gap-4 border-t pt-6 md:grid-cols-[16rem_1fr]"
                >
                  <div className="flex flex-col gap-1">
                    <span>{result.title}</span>
                    <span className="text-muted-foreground text-sm">{new Date(result.date).toLocaleDateString()}</span>
                    {result.version && <span className="text-muted-foreground text-sm">{result.version}</span>}
                  </div>

                  <div>
                    <div className="group relative grid items-center gap-4 text-end md:grid-cols-[1fr_8rem]">
                      <span className="bg-primary/10 absolute top-1/2 left-1/2 hidden h-[calc(100%_+_theme(spacing.1))] w-[calc(100%_+_theme(spacing.4))] -translate-1/2 rounded-sm group-hover:block" />

                      <ResultBar
                        variant={result.title.startsWith("SingleStore") ? "primary" : "default"}
                        value={avgTime}
                        limit={systemMaxAvgTime}
                      />
                      <span>
                        x{x} ({ms(avgTime)})
                      </span>
                    </div>

                    <ul className="mt-2 flex flex-col text-sm md:gap-2">
                      {queryKeys.map((queryKey) => {
                        const avgTime = systemAvgQueryTimes[result.title]?.[queryKey] ?? 0;
                        const x = calcX(avgTime, queryMaxAvgTimes[queryKey] ?? 0);

                        return (
                          <li
                            key={queryKey}
                            className="group relative grid gap-4 md:grid-cols-[10rem_1fr]"
                          >
                            <span className="bg-primary/10 absolute top-1/2 left-1/2 hidden h-[calc(100%_+_theme(spacing.1))] w-[calc(100%_+_theme(spacing.4))] -translate-1/2 rounded-xs group-hover:block" />
                            <span>{QUERY_TITLE_MAP[queryKey as keyof typeof QUERY_TITLE_MAP]}</span>
                            <div className="grid items-center gap-4 text-end md:grid-cols-[1fr_8rem]">
                              <ResultBar
                                variant={result.title.startsWith("SingleStore") ? "primary" : "default"}
                                size="sm"
                                value={avgTime}
                                limit={queryMaxAvgTimes[queryKey] ?? 0}
                              />
                              <span>
                                x{x} ({ms(avgTime)})
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
