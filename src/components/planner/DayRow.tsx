"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import type { PlannerDay } from "@/lib/types";
import { TYPE_LABEL } from "@/lib/labels";
import { TYPE_ICON, StatusDot } from "@/components/ui/Pill";
import { formatDate } from "@/lib/dates";
import { quickPct } from "@/lib/dayScore";
import { cn } from "@/lib/cn";

export function DayRow({ day, isToday }: { day: PlannerDay; isToday?: boolean }) {
  const { t, lang } = useSettings();
  const { getDay } = useProgress();
  const progress = getDay(day.day);
  const pct = quickPct(progress.exercises);

  return (
    <Link
      href={`/day/${day.day}`}
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
        isToday
          ? "border-primary/50 bg-primary-soft/40"
          : "border-transparent hover:border-border hover:bg-surface-2",
      )}
    >
      <div className="flex w-10 shrink-0 flex-col items-center">
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted">
          {t({ en: "Day", id: "Hari" })}
        </span>
        <span className="text-lg font-bold leading-none tabular-nums">{day.day}</span>
      </div>

      <div className="w-14 shrink-0 text-xs text-muted">{formatDate(day.date, lang)}</div>

      <span className="shrink-0 text-base" aria-hidden>
        {TYPE_ICON[day.type]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {day.titleJa ? (
            <span className="font-jp">{day.titleJa}</span>
          ) : (
            t(day.title)
          )}
        </p>
        <p className="truncate text-xs text-muted">{t(TYPE_LABEL[day.type])}</p>
      </div>

      {pct != null && (
        <span className="hidden shrink-0 text-xs text-muted tabular-nums sm:block">
          {pct}%
        </span>
      )}
      <StatusDot status={progress.status} />
    </Link>
  );
}
