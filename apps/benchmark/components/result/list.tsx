import { cn } from "@repo/ui/lib/utils";
import type { ComponentProps } from "react";

export type ResultListProps = ComponentProps<"ul">;

export function ResultList({ className, ...props }: ResultListProps) {
  return (
    <ul
      {...props}
      className={cn("flex flex-col gap-6", className)}
    />
  );
}
