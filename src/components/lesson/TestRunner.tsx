"use client";

import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { STR } from "@/lib/strings";
import type { TestModule } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ExerciseSet } from "@/components/exercises/ExerciseSet";

export function TestRunner({
  module,
  dayNumber,
}: {
  module: TestModule;
  dayNumber: number;
}) {
  const { t, lang } = useSettings();
  const { getDay } = useProgress();

  const results = getDay(dayNumber).exercises;
  const groupIds = new Set(module.groups.map((g) => g.id));
  const relevant = results.filter((r) => groupIds.has(r.setId));
  const answered = relevant.reduce((s, r) => s + r.total, 0);
  const correct = relevant.reduce((s, r) => s + r.correct, 0);
  const allDone = relevant.length === module.groups.length;
  const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const pass = module.passMark != null && pct >= module.passMark;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Pill tone="warning">{t(STR.type_test)}</Pill>
          {module.titleJa && (
            <span className="font-jp text-lg font-bold">{module.titleJa}</span>
          )}
        </div>
        <h1 className="text-xl font-bold sm:text-2xl">{t(module.title)}</h1>
        <p className="max-w-prose text-sm text-muted">{t(module.description)}</p>
      </header>

      <Card className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">{t(STR.ex_score)}</p>
          <p className="text-2xl font-bold tabular-nums">
            {correct}/{answered || module.groups.reduce((s, g) => s + g.questions.length, 0)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold tabular-nums">{pct}%</p>
          {module.passMark != null && allDone && (
            <p className={`text-sm font-medium ${pass ? "text-success" : "text-danger"}`}>
              {pass
                ? lang === "id"
                  ? "Lulus"
                  : "Pass"
                : lang === "id"
                  ? `Ambang lulus ${module.passMark}%`
                  : `Pass mark ${module.passMark}%`}
            </p>
          )}
        </div>
      </Card>

      {module.groups.map((g) => (
        <ExerciseSet key={g.id} dayNumber={dayNumber} group={g} />
      ))}
    </div>
  );
}
