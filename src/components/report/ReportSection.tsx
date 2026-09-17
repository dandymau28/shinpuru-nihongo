"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { LocalizedText } from "@/components/layout/LocalizedText";

interface RankedItem {
  key: string;
  seen: number;
  correct: number;
  pct: number;
}

/** Structural shape shared by `usePracticeStats()` and the conjugation
 *  trainer's own `useConjStats()` — both work here as-is. */
export interface StatsLike {
  stats: { totalSeen: number; totalCorrect: number; bestStreak: number };
  hydrated: boolean;
  ranked: RankedItem[];
  reset: () => void;
}

export function ReportSection({
  title,
  emoji,
  href,
  stats,
  renderKey,
}: {
  title: Bi;
  emoji: string;
  href: string;
  stats: StatsLike;
  renderKey?: (key: string) => ReactNode;
}) {
  const { t } = useSettings();
  const { stats: s, ranked, reset, hydrated } = stats;

  if (!hydrated) return null;

  const heading = (
    <div className="flex items-center gap-2">
      <span aria-hidden>{emoji}</span>
      <h2 className="font-semibold">
        <LocalizedText value={title} />
      </h2>
    </div>
  );

  if (s.totalSeen === 0) {
    return (
      <Card className="space-y-1.5">
        {heading}
        <p className="text-sm text-muted">{t(STR.report_no_data)}</p>
        <Link href={href} className="text-sm font-medium text-primary hover:underline">
          {t(STR.report_go_practice)} →
        </Link>
      </Card>
    );
  }

  const acc = Math.round((s.totalCorrect / s.totalSeen) * 100);
  const eligible = ranked.filter((r) => r.seen >= 3);
  const showSplit = eligible.length >= 4;
  const half = showSplit ? Math.min(5, Math.floor(eligible.length / 2)) : 0;
  const weaknesses = showSplit ? eligible.slice(0, half) : eligible.slice(0, 5);
  const strengths = showSplit ? eligible.slice(-half).reverse() : [];

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        {heading}
        <Link href={href} className="text-xs font-medium text-primary hover:underline">
          {t(STR.report_open)} →
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <span>
          {t(STR.conj_accuracy)} <b className="tabular-nums">{acc}%</b>
        </span>
        <span className="text-muted">
          {t(STR.conj_best)} {t(STR.conj_streak).toLowerCase()}{" "}
          <b className="tabular-nums">{s.bestStreak}</b>
        </span>
        <span className="text-muted tabular-nums">
          {s.totalCorrect}/{s.totalSeen}
        </span>
      </div>

      {eligible.length === 0 ? (
        <p className="text-xs text-muted">{t(STR.report_need_more)}</p>
      ) : showSplit ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-success">{t(STR.report_strengths)}</h3>
            <ul className="space-y-1">
              {strengths.map((r) => (
                <RankedRow key={r.key} r={r} renderKey={renderKey} />
              ))}
            </ul>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-danger">{t(STR.report_weaknesses)}</h3>
            <ul className="space-y-1">
              {weaknesses.map((r) => (
                <RankedRow key={r.key} r={r} renderKey={renderKey} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <ul className="space-y-1">
          {weaknesses.map((r) => (
            <RankedRow key={r.key} r={r} renderKey={renderKey} />
          ))}
        </ul>
      )}

      <button onClick={reset} className="text-xs text-muted underline hover:text-danger">
        {t(STR.conj_reset_stats)}
      </button>
    </Card>
  );
}

function RankedRow({
  r,
  renderKey,
}: {
  r: RankedItem;
  renderKey?: (key: string) => ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 text-xs">
      <span className="w-20 shrink-0 truncate font-jp text-sm font-bold" title={r.key}>
        {renderKey ? renderKey(r.key) : r.key}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn(
            "h-full rounded-full",
            r.pct >= 80 ? "bg-success" : r.pct >= 60 ? "bg-warning" : "bg-danger",
          )}
          style={{ width: `${r.pct}%` }}
        />
      </div>
      <span className="w-12 shrink-0 text-right tabular-nums text-muted">
        {r.correct}/{r.seen}
      </span>
    </li>
  );
}
