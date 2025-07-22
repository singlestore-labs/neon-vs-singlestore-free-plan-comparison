import { cn, cva, VariantProps } from "@repo/ui/lib/utils";
import type { ComponentProps } from "react";

const resultBarVariants = cva("flex-1 flex relative bg-neutral-600", {
  variants: {
    variant: {
      default: "",
      primary: "",
    },

    size: {
      default: "h-4 rounded-sm",
      sm: "h-2 rounded-xs",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const valueBarVariants = cva("absolute flex top-0 left-0 h-full", {
  variants: {
    variant: {
      default: "bg-neutral-400",
      primary: "bg-primary-accent",
    },

    size: {
      default: "rounded-sm",
      sm: "rounded-xs",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ResultBarProps = ComponentProps<"div"> &
  VariantProps<typeof resultBarVariants> & {
    value: number;
    limit: number;
  };

export function ResultBar({ className, value, limit, variant, size, ...props }: ResultBarProps) {
  const percentage = Math.min((value / limit) * 100, 100);

  return (
    <div
      {...props}
      className={cn(resultBarVariants({ variant, size }), className)}
    >
      <div
        className={cn(valueBarVariants({ variant, size }))}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
