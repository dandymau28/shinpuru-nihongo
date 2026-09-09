import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As
      className={cn(
        "rounded-2xl border border-border bg-surface p-4 sm:p-5",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-sm font-semibold text-muted", className)}>
      {children}
    </h2>
  );
}
