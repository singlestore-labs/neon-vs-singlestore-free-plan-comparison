import type { BenchmarkQueryResults } from "@repo/benchmark/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip";
import { cn } from "@repo/ui/lib/utils";
import ms from "pretty-ms";
import type { ComponentProps } from "react";

import { Accordion } from "@/components/accordion";
import { Pre } from "@/components/pre";
import { ResultBar } from "@/components/result/bar";
import { QUERY_TITLE_MAP } from "@/constants";

export type ResultListItemProps = ComponentProps<"li"> & {
  title: string;
  date: string;
  version?: string;
  avgTime: number;
  maxAvgTime: number;
  x: number;
  avgQueryTimes: Record<string, number>;
  queryMaxAvgTimes: Record<string, number>;
  queryXTimes: Record<string, number>;
  databaseSchema: string;
  tableRowCount: Record<string, number>;
  queryResults: BenchmarkQueryResults;
};

export function ResultListItem({
  className,
  title,
  date,
  version,
  avgTime,
  maxAvgTime,
  x,
  avgQueryTimes,
  queryMaxAvgTimes,
  queryXTimes,
  databaseSchema,
  tableRowCount,
  queryResults,
  ...props
}: ResultListItemProps) {
  const queryKeys = Object.keys(queryResults);
  const queryTimes = queryResults[queryKeys[0]!]?.length;

  return (
    <li
      {...props}
      className={cn("grid gap-4 border-t pt-6 md:grid-cols-[16rem_1fr]", className)}
    >
      <div className="flex flex-col gap-1">
        <span>{title}</span>
        <span className="text-muted-foreground text-sm">{new Date(date).toLocaleDateString()}</span>
        {version && <span className="text-muted-foreground text-sm">{version}</span>}
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group relative grid items-center gap-4 text-end md:grid-cols-[1fr_8rem]">
              <span className="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 hidden h-[calc(100%_+_theme(spacing.1))] w-[calc(100%_+_theme(spacing.4))] -translate-1/2 rounded-sm group-hover:block" />

              <ResultBar
                variant={title.startsWith("SingleStore") ? "primary" : "default"}
                value={avgTime}
                limit={maxAvgTime}
              />
              <span>
                x{x} ({ms(avgTime)})
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="py-3">
            <ul className="list-disc pl-3">
              <li>Displays mean of average times.</li>
              <li>
                Average over {queryKeys.length} queries, each executed {queryTimes} times.
              </li>
              <li>Compared to the slowest system&apos;s aggregate average.</li>
            </ul>
          </TooltipContent>
        </Tooltip>

        <ul className="mt-2 flex flex-col text-sm md:gap-2">
          {Object.entries(avgQueryTimes).map(([queryKey, avgTime]) => (
            <li
              key={queryKey}
              className="group relative grid gap-4 md:grid-cols-[10rem_1fr]"
            >
              <span className="bg-primary/10 absolute top-1/2 left-1/2 hidden h-[calc(100%_+_theme(spacing.1))] w-[calc(100%_+_theme(spacing.4))] -translate-1/2 rounded-xs group-hover:block" />
              <span>{QUERY_TITLE_MAP[queryKey as keyof typeof QUERY_TITLE_MAP]}</span>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="grid items-center gap-4 text-end md:grid-cols-[1fr_8rem]">
                    <ResultBar
                      variant={title.startsWith("SingleStore") ? "primary" : "default"}
                      size="sm"
                      value={avgTime}
                      limit={queryMaxAvgTimes[queryKey] ?? 0}
                    />
                    <span>
                      x{queryXTimes[queryKey]} ({ms(avgTime)})
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="py-3">
                  <ul className="list-disc pl-3">
                    <li>Executed {queryTimes} times.</li>
                    <li>Displays average time for this query.</li>
                    <li>Compared to the slowest average for this query across all systems.</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-4 border-t pt-4">
          <Accordion
            triggerChildren="Database schema"
            contentChildren={<Pre>{databaseSchema}</Pre>}
          />
          <Accordion
            triggerChildren="Table row count"
            contentChildren={<Pre>{JSON.stringify(tableRowCount, null, 2)}</Pre>}
          />
        </div>
      </div>
    </li>
  );
}
