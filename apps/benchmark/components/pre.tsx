import { cn } from "@repo/ui/lib/utils";
import type { ComponentProps } from "react";

export type PreProps = ComponentProps<"pre">;

export function Pre({ className, ...props }: PreProps) {
  return (
    <pre
      {...props}
      className={cn("bg-background max-h-80 w-full overflow-auto rounded-xl p-4 whitespace-pre-wrap", className)}
    />
  );
}
