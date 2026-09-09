"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { McqQuestion } from "@/lib/types";
import { furigana } from "@/lib/furigana";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Feedback } from "./Feedback";

export function MultipleChoice({
  question,
  onResult,
}: {
  question: McqQuestion;
  onResult: (correct: boolean) => void;
}) {
  const { t } = useSettings();
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === question.answer;

  function check() {
    if (selected === null || checked) return;
    setChecked(true);
    onResult(correct);
  }

  return (
    <div className="space-y-3">
      {question.ja && (
        <p className="font-jp text-lg leading-relaxed">{furigana(question.ja)}</p>
      )}
      <p className="text-sm font-medium">{t(question.prompt)}</p>

      <div className="grid gap-2">
        {question.options.map((opt, i) => {
          const isAnswer = i === question.answer;
          const isPicked = i === selected;
          return (
            <button
              key={i}
              disabled={checked}
              onClick={() => setSelected(i)}
              className={cn(
                "rounded-xl border px-3 py-2 text-left font-jp text-sm transition-colors",
                !checked && isPicked && "border-primary bg-primary-soft",
                !checked && !isPicked && "border-border hover:bg-surface-2",
                checked && isAnswer && "border-success bg-success-soft/60",
                checked && isPicked && !isAnswer && "border-danger bg-danger/10",
                checked && !isAnswer && !isPicked && "border-border opacity-60",
              )}
            >
              {t(opt)}
            </button>
          );
        })}
      </div>

      {!checked ? (
        <Button size="sm" onClick={check} disabled={selected === null}>
          {t(STR.ex_check)}
        </Button>
      ) : (
        <Feedback correct={correct} explain={question.explain} />
      )}
    </div>
  );
}
