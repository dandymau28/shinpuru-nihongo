"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { MaterialSummary } from "@/lib/types";
import { Pill } from "@/components/ui/Pill";
import { Card, CardTitle } from "@/components/ui/Card";
import { ExampleSentence } from "@/components/lesson/LessonSectionList";
import { RangkumanNotes } from "./RangkumanNotes";

export function RangkumanView({ summary }: { summary: MaterialSummary }) {
  const { t } = useSettings();

  return (
    <div className="space-y-6">
      <Link
        href="/rangkuman"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        ← {t(STR.rangkuman_back)}
      </Link>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Pill tone={summary.level === "N5" ? "primary" : "accent"}>{summary.level}</Pill>
          {summary.titleJa && <span className="font-jp text-lg font-bold">{summary.titleJa}</span>}
        </div>
        <h1 className="text-xl font-bold sm:text-2xl">{t(summary.title)}</h1>
        <p className="max-w-prose text-sm text-muted">{t(summary.intro)}</p>
      </header>

      <section className="space-y-3">
        {summary.points.map((p, i) => (
          <Card key={i} className="space-y-1">
            <h2 className="text-sm font-bold">{t(p.heading)}</h2>
            <p className="text-sm leading-relaxed text-fg/90">{t(p.body)}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold">{t(STR.rangkuman_examples)}</h2>
        <ul className="space-y-3">
          {summary.examples.map((s, i) => (
            <ExampleSentence key={i} s={s} />
          ))}
        </ul>
      </section>

      <Link
        href={`/lesson/${summary.slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {t(STR.rangkuman_open_full)} →
      </Link>

      <RangkumanNotes slug={summary.slug} />
    </div>
  );
}
