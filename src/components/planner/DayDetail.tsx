"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { PlannerDay } from "@/lib/types";
import { PHASE_LABEL, TYPE_LABEL } from "@/lib/labels";
import { getContent } from "@/content/registry";
import { formatDateLong } from "@/lib/dates";
import { Pill, PHASE_TONE, TYPE_ICON } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { ExternalLinks } from "./ExternalLinks";
import { ProgressControls } from "./ProgressControls";
import { DayScoreBar } from "./DayScoreBar";
import { ContentRenderer } from "@/components/lesson/ContentRenderer";
import { getDay } from "@/data/planner";

export function DayDetail({ day }: { day: PlannerDay }) {
  const { t, lang } = useSettings();
  const module = getContent(day.lessonSlug);
  const showYoutube =
    day.youtube && day.youtube.length > 0 && module?.type !== "listening";

  const prev = day.day > 1 ? getDay(day.day - 1) : undefined;
  const next = day.day < 90 ? getDay(day.day + 1) : undefined;

  return (
    <div className="space-y-6">
      <Link
        href="/planner"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        ← {t(STR.back_to_planner)}
      </Link>

      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={PHASE_TONE[day.phase]}>{t(PHASE_LABEL[day.phase])}</Pill>
          <Pill tone="neutral">
            <span aria-hidden>{TYPE_ICON[day.type]}</span> {t(TYPE_LABEL[day.type])}
          </Pill>
          <span className="text-xs text-muted">
            {t(STR.day)} {day.day} · {formatDateLong(day.date, lang)}
          </span>
        </div>
        <h1 className="text-2xl font-bold">
          {day.titleJa ? (
            <span className="font-jp">{day.titleJa}</span>
          ) : (
            t(day.title)
          )}
        </h1>
        {day.titleJa && <p className="text-sm text-muted">{t(day.title)}</p>}
      </header>

      <DayScoreBar dayNumber={day.day} lessonSlug={day.lessonSlug} />

      <Card className="space-y-1.5">
        <p className="text-xs font-semibold text-muted">{t(STR.study_task)}</p>
        <p className="text-sm">{t(day.task)}</p>
        {day.durationNote && (
          <p className="text-xs text-muted">
            {t(STR.suggested_time)}: {t(day.durationNote)}
          </p>
        )}
      </Card>

      {showYoutube && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-muted">{t(STR.type_listening)}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {day.youtube!.map((id) => (
              <div
                key={id}
                className="aspect-video overflow-hidden rounded-xl border border-border"
              >
                <iframe
                  className="size-full"
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  title="Listening practice"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <ExternalLinks links={day.links} />

      {module ? (
        <div className="border-t border-border pt-6">
          <ContentRenderer module={module} dayNumber={day.day} />
        </div>
      ) : (
        <Card className="border-dashed">
          <p className="text-sm text-muted">{t(STR.content_coming)}</p>
        </Card>
      )}

      <ProgressControls day={day.day} lessonSlug={day.lessonSlug} />

      <nav className="flex items-center justify-between gap-2 border-t border-border pt-4 text-sm">
        {prev ? (
          <Link href={`/day/${prev.day}`} className="text-muted hover:text-fg">
            ← {t(STR.prev_day)}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/day/${next.day}`} className="text-muted hover:text-fg">
            {t(STR.next_day)} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
