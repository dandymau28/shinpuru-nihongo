"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import type { usePracticeStats } from "@/lib/practiceStats";
import { Card } from "@/components/ui/Card";

export function ParticleStatsPanel({
  stats,
}: {
  stats: ReturnType<typeof usePracticeStats>;
}) {
  const { t } = useSettings();
  const { stats: s, ranked, reset, hydrated } = stats;

  if (!hydrated || s.totalSeen === 0) return null;

  const acc = Math.round((s.totalCorrect / s.totalSeen) * 100);

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted">{t(STR.conj_weak_spots)}</h2>
        <button
          onClick={reset}
          className="text-xs text-muted underline hover:text-danger"
        >
          {t(STR.conj_reset_stats)}
        </button>
      </div>

      <div className="flex gap-4 text-sm">
        <span>
          {t(STR.conj_lifetime)} {t(STR.conj_accuracy).toLowerCase()}{" "}
          <b className="tabular-nums">{acc}%</b>
        </span>
        <span className="text-muted">
          {t(STR.conj_best)} {t(STR.conj_streak).toLowerCase()}{" "}
          <b className="tabular-nums">{s.bestStreak}</b>
        </span>
        <span className="text-muted tabular-nums">{s.totalSeen}</span>
      </div>

      <ul className="space-y-1">
        {ranked.slice(0, 8).map((r) => (
          <li key={r.key} className="flex items-center gap-2 text-xs">
            <span className="w-10 shrink-0 font-jp text-sm font-bold">{r.key}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div
                className={cn(
                  "h-full rounded-full",
                  r.pct >= 80 ? "bg-success" : r.pct >= 60 ? "bg-warning" : "bg-danger",
                )}
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right tabular-nums text-muted">
              {r.correct}/{r.seen}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
