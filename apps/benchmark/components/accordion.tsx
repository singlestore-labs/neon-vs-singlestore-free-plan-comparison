import { Accordion as _Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/accordion";
import { cn } from "@repo/ui/lib/utils";
import type { ReactNode } from "react";

export type AccordionProps = {
  className?: string;
  triggerChildren?: ReactNode;
  triggerClassName?: string;
  contentChildren?: ReactNode;
  contentClassName?: string;
};

export function Accordion({ className, triggerChildren, triggerClassName, contentChildren, contentClassName }: AccordionProps) {
  return (
    <_Accordion
      type="single"
      collapsible
      className={cn("", className)}
    >
      <AccordionItem value="1">
        {triggerChildren && <AccordionTrigger className={cn("", triggerClassName)}>{triggerChildren}</AccordionTrigger>}
        {contentChildren && (
          <AccordionContent className={cn("w-full max-w-full", contentClassName)}>{contentChildren}</AccordionContent>
        )}
      </AccordionItem>
    </_Accordion>
  );
}
