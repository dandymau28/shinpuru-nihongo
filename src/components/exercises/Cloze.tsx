"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { ClozeQuestion } from "@/lib/types";
import { furigana } from "@/lib/furigana";
import { answerMatches } from "@/lib/answers";
import { Button } from "@/components/ui/Button";
import { Feedback } from "./Feedback";

export function Cloze({
  question,
  speak,
  onResult,
}: {
  question: ClozeQuestion;
  speak?: boolean;
  onResult: (correct: boolean) => void;
}) {
  const { t, lang } = useSettings();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const correct = answerMatches(value, question.accept);

  const [before, after] = question.ja.split("___");

  function check() {
    if (!value.trim() || checked) return;
    setChecked(true);
    onResult(correct);
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">
        {lang === "id" ? question.id : question.en}
      </p>
      <p className="font-jp text-lg leading-relaxed">
        {furigana(before ?? "")}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={checked}
          onKeyDown={(e) => e.key === "Enter" && check()}
          aria-label={t(STR.ex_type_answer)}
          className="mx-1 w-28 rounded-lg border-b-2 border-primary bg-primary-soft/40 px-2 py-0.5 text-center font-jp focus:outline-none"
        />
        {furigana(after ?? "")}
      </p>

      {speak && !checked && (
        <p className="text-xs text-muted">{t(STR.ex_prompt_speak)}</p>
      )}

      {!checked ? (
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={check} disabled={!value.trim()}>
            {t(STR.ex_check)}
          </Button>
          {question.hint && (
            <button
              onClick={() => setShowHint((v) => !v)}
              className="text-xs text-muted underline hover:text-fg"
            >
              {t(STR.ex_show_hint)}
            </button>
          )}
          {showHint && question.hint && (
            <span className="text-xs text-muted">{t(question.hint)}</span>
          )}
        </div>
      ) : (
        <Feedback
          correct={correct}
          explain={question.explain}
          answerText={question.accept[0]}
        />
      )}
    </div>
  );
}
