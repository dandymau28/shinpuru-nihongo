"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { ReadingSet } from "@/lib/types";
import { furigana } from "@/lib/furigana";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ExerciseSet } from "@/components/exercises/ExerciseSet";

export function ReadingRunner({
  module,
  dayNumber,
}: {
  module: ReadingSet;
  dayNumber: number;
}) {
  const { t } = useSettings();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Pill tone="primary">{t(STR.type_reading)}</Pill>
        <h1 className="text-xl font-bold sm:text-2xl">{t(module.title)}</h1>
        <p className="max-w-prose text-sm text-muted">{t(module.description)}</p>
      </header>

      {module.items.map((item, i) => (
        <div key={item.id} className="space-y-3">
          <Card className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-surface-2 text-xs font-bold">
                {i + 1}
              </span>
              <h2 className="text-sm font-semibold">{t(item.title)}</h2>
            </div>
            <div className="space-y-2 font-jp text-[15px] leading-loose">
              {item.passage.split("\n\n").map((para, pi) => (
                <p key={pi}>{furigana(para)}</p>
              ))}
            </div>
            {item.translation && (
              <details className="text-sm">
                <summary className="cursor-pointer text-xs text-muted">
                  {t({ en: "Translation", id: "Terjemahan" })}
                </summary>
                <p className="mt-1 whitespace-pre-line text-fg/80">{t(item.translation)}</p>
              </details>
            )}
          </Card>

          <ExerciseSet
            dayNumber={dayNumber}
            group={{
              id: `${module.slug}:${item.id}`,
              title: { en: `${t(item.title)} — questions`, id: `${t(item.title)} — soal` },
              questions: item.questions,
            }}
          />
        </div>
      ))}
    </div>
  );
}
