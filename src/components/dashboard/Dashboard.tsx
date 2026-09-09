"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { useCurrentDay } from "@/lib/useCurrentDay";
import { PLANNER, getDay, PHASES } from "@/data/planner";
import { STR } from "@/lib/strings";
import { PHASE_LABEL, TYPE_LABEL } from "@/lib/labels";
import { formatDate, formatDateLong } from "@/lib/dates";
import { Card, CardTitle } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Pill, PHASE_TONE, TYPE_ICON, StatusDot } from "@/components/ui/Pill";
import { ButtonLink } from "@/components/ui/Button";

export function Dashboard() {
  const { t, lang, hydrated } = useSettings();
  const { getDay: getProgress, completedCount, doneDays } = useProgress();
  const { day: today, notStarted } = useCurrentDay();

  const focusDay = today ?? 1;
  const plannerToday = getDay(focusDay);

  // Streak: contiguous done days ending at (or just before) today.
  let streak = 0;
  for (let d = focusDay; d >= 1; d--) {
    if (doneDays.has(d)) streak++;
    else if (d === focusDay) continue; // today not done yet is fine
    else break;
  }

  const upNext = PLANNER.filter(
    (d) => d.day >= focusDay && getProgress(d.day).status !== "done",
  ).slice(0, 4);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">
          {t({ en: "Welcome back", id: "Selamat datang kembali" })}
        </h1>
        <p className="mt-1 text-sm text-muted">{t(STR.tagline)}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <Card className="flex items-center justify-center">
          <ProgressRing
            value={completedCount}
            max={90}
            label={`${completedCount}`}
            sublabel={`${t(STR.of90)} · ${Math.round((completedCount / 90) * 100)}%`}
          />
        </Card>

        <Card className="flex flex-col justify-center gap-3">
          {!hydrated ? (
            <p className="text-sm text-muted">…</p>
          ) : notStarted ? (
            <div>
              <CardTitle>{t(STR.today)}</CardTitle>
              <p className="mt-1 text-sm">
                {t({
                  en: "Your plan starts on",
                  id: "Rencanamu dimulai pada",
                })}{" "}
                <b>{formatDateLong(PLANNER[0].date, lang)}</b>.
              </p>
              <ButtonLink href="/planner" size="sm" variant="secondary" className="mt-3 w-fit">
                {t(STR.nav_planner)}
              </ButtonLink>
            </div>
          ) : (
            plannerToday && (
              <>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    {t(STR.today)} · {t(STR.day)} {focusDay}
                  </CardTitle>
                  <Pill tone={PHASE_TONE[plannerToday.phase]}>
                    {t(PHASE_LABEL[plannerToday.phase])}
                  </Pill>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    <span aria-hidden className="mr-1">
                      {TYPE_ICON[plannerToday.type]}
                    </span>
                    {plannerToday.titleJa ? (
                      <span className="font-jp">{plannerToday.titleJa}</span>
                    ) : (
                      t(plannerToday.title)
                    )}
                  </p>
                  <p className="text-sm text-muted">{t(plannerToday.task)}</p>
                </div>
                <ButtonLink href={`/day/${focusDay}`} size="sm" className="w-fit">
                  {t(STR.resume)} →
                </ButtonLink>
              </>
            )
          )}
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardTitle>{t(STR.streak)}</CardTitle>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            {streak}{" "}
            <span className="text-base font-normal text-muted">{t(STR.days_unit)}</span>
          </p>
        </Card>
        {PHASES.map((p) => {
          const total = p.to - p.from + 1;
          const done = [...doneDays].filter((d) => d >= p.from && d <= p.to).length;
          return (
            <Card key={p.id}>
              <CardTitle>{t(PHASE_LABEL[p.id])}</CardTitle>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(done / total) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted tabular-nums">
                {done}/{total} {t(STR.days_unit)}
              </p>
            </Card>
          );
        })}
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-muted">{t(STR.up_next)}</h2>
        <div className="space-y-1">
          {upNext.map((d) => (
            <Link
              key={d.day}
              href={`/day/${d.day}`}
              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 hover:border-border hover:bg-surface-2"
            >
              <span className="w-8 shrink-0 text-center text-sm font-bold tabular-nums">
                {d.day}
              </span>
              <span className="w-12 shrink-0 text-xs text-muted">
                {formatDate(d.date, lang)}
              </span>
              <span aria-hidden>{TYPE_ICON[d.type]}</span>
              <span className="min-w-0 flex-1 truncate text-sm">
                {d.titleJa ? <span className="font-jp">{d.titleJa}</span> : t(d.title)}
              </span>
              <StatusDot status={getProgress(d.day).status} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
