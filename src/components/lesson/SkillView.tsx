"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { STR } from "@/lib/strings";
import type { SkillModule } from "@/lib/types";
import { furigana } from "@/lib/furigana";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { ExerciseSet } from "@/components/exercises/ExerciseSet";
import { LessonSectionList } from "./LessonSectionList";

export function SkillView({
  module,
  dayNumber,
}: {
  module: SkillModule;
  dayNumber: number;
}) {
  const { t, lang } = useSettings();
  const { getDay, setStatus, recordExercise } = useProgress();
  const [text, setText] = useState("");
  const done = getDay(dayNumber).exercises.some((e) => e.setId === `${module.slug}:writing`);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Pill tone="primary">{t(STR.type_skill)}</Pill>
          {module.titleJa && <span className="font-jp text-lg font-bold">{module.titleJa}</span>}
        </div>
        <h1 className="text-xl font-bold sm:text-2xl">{t(module.title)}</h1>
        <p className="max-w-prose text-sm text-muted">{t(module.description)}</p>
      </header>

      <LessonSectionList sections={module.sections} />

      {module.exercises?.map((g) => (
        <ExerciseSet key={g.id} dayNumber={dayNumber} group={g} />
      ))}

      {module.writing && (
        <Card className="space-y-3">
          <h3 className="font-semibold">{t(STR.ex_writing_prompt)}</h3>
          <p className="text-sm text-fg/90">{t(module.writing.prompt)}</p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 font-jp text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
            placeholder="日本語で書いてみましょう…"
          />

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted">{t(STR.ex_self_check)}</p>
            <ul className="space-y-1">
              {module.writing.checklist.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1 size-3.5 accent-[var(--primary)]" />
                  <span>{t(c)}</span>
                </li>
              ))}
            </ul>
          </div>

          {module.writing.modelAnswer && (
            <details className="rounded-xl border border-border bg-surface-2 p-3 text-sm">
              <summary className="cursor-pointer font-medium">
                {lang === "id" ? "Contoh jawaban" : "Model answer"}
              </summary>
              <ul className="mt-2 space-y-2">
                {module.writing.modelAnswer.map((s, i) => (
                  <li key={i}>
                    <p className="font-jp">{furigana(s.ja)}</p>
                    <p className="text-xs text-muted">{lang === "id" ? s.id : s.en}</p>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <Button
            size="sm"
            variant={done ? "secondary" : "primary"}
            onClick={() => {
              recordExercise(dayNumber, {
                setId: `${module.slug}:writing`,
                correct: 1,
                total: 1,
                scored: false,
              });
              if (getDay(dayNumber).status !== "done") setStatus(dayNumber, "partial");
            }}
          >
            {done ? `${t(STR.saved)} ✓` : t(STR.ex_mark_done)}
          </Button>
        </Card>
      )}
    </div>
  );
}
