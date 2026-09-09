"use client";

import type { ReactNode } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function Feedback({
  correct,
  explain,
  answerText,
  children,
}: {
  correct: boolean;
  explain?: Bi;
  answerText?: string;
  children?: ReactNode;
}) {
  const { t } = useSettings();
  return (
    <div
      className={cn(
        "rounded-xl border p-3 text-sm",
        correct
          ? "border-success/40 bg-success-soft/50"
          : "border-danger/40 bg-danger/10",
      )}
    >
      <p className={cn("font-semibold", correct ? "text-success" : "text-danger")}>
        {correct ? `✓ ${t(STR.ex_correct)}` : `✕ ${t(STR.ex_incorrect)}`}
      </p>
      {!correct && answerText && (
        <p className="mt-1">
          <span className="text-muted">{t(STR.ex_answer_was)}: </span>
          <span className="font-jp font-medium">{answerText}</span>
        </p>
      )}
      {explain && <p className="mt-1 text-muted">{t(explain)}</p>}
      {children}
    </div>
  );
}
