"use client";

import { useSettings } from "@/context/SettingsContext";
import type { LessonSection, Sentence } from "@/lib/types";
import { furigana } from "@/lib/furigana";
import { cn } from "@/lib/cn";

export function LessonSectionList({ sections }: { sections: LessonSection[] }) {
  return (
    <div className="space-y-5">
      {sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </div>
  );
}

function Section({ section }: { section: LessonSection }) {
  const { t } = useSettings();

  if (section.kind === "prose") {
    return (
      <section className="space-y-2">
        {section.heading && <h2 className="text-base font-bold">{t(section.heading)}</h2>}
        <p className="max-w-prose whitespace-pre-line text-sm leading-relaxed text-fg/90">
          {t(section.body)}
        </p>
      </section>
    );
  }

  if (section.kind === "note") {
    return (
      <div
        className={cn(
          "rounded-xl border-l-4 p-3 text-sm",
          section.tone === "tip"
            ? "border-primary bg-primary-soft/40"
            : "border-warning bg-warning-soft/50",
        )}
      >
        <p className="whitespace-pre-line text-fg/90">{t(section.body)}</p>
      </div>
    );
  }

  if (section.kind === "table") {
    return (
      <section className="space-y-2">
        {section.heading && <h2 className="text-base font-bold">{t(section.heading)}</h2>}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                {section.columns.map((c, i) => (
                  <th key={i} className="px-3 py-2 font-medium">
                    {t(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/60">
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className={cn("px-3 py-2", row.ja && "font-jp")}>
                      {typeof cell === "string" ? furigana(cell) : t(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      {section.heading && <h2 className="text-base font-bold">{t(section.heading)}</h2>}
      <ul className="space-y-3">
        {section.items.map((s, i) => (
          <ExampleSentence key={i} s={s} />
        ))}
      </ul>
    </section>
  );
}

export function ExampleSentence({ s }: { s: Sentence }) {
  const { t, lang, romaji } = useSettings();
  return (
    <li className="rounded-xl border border-border bg-surface p-3">
      <p className="font-jp text-base leading-relaxed">{furigana(s.ja)}</p>
      {romaji && s.romaji && <p className="text-xs italic text-muted">{s.romaji}</p>}
      <p className="mt-1 text-sm text-fg/80">{lang === "id" ? s.id : s.en}</p>
      {s.note && <p className="mt-1 text-xs text-muted">{t(s.note)}</p>}
    </li>
  );
}
