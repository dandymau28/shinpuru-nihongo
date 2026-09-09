"use client";

import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { getContent } from "@/content/registry";
import { computeDayScore } from "@/lib/dayScore";
import { STR } from "@/lib/strings";
import { STATUS_LABEL } from "@/lib/labels";
import type { Status } from "@/lib/types";
import { Card, CardTitle } from "@/components/ui/Card";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/cn";

export function ProgressControls({
  day,
  lessonSlug,
}: {
  day: number;
  lessonSlug?: string;
}) {
  const { t } = useSettings();
  const { getDay, setStatus, setNotes, setReviewed } = useProgress();
  const p = getDay(day);
  const score = computeDayScore(getContent(lessonSlug), p.exercises);

  const [savedFlash, setSavedFlash] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSavedFlash(true);
    const id = setTimeout(() => setSavedFlash(false), 1200);
    return () => clearTimeout(id);
  }, [p.status, p.notes, p.reviewed]);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <CardTitle>{t(STR.your_progress)}</CardTitle>
        <span
          className={`text-xs text-success transition-opacity ${savedFlash ? "opacity-100" : "opacity-0"}`}
        >
          {t(STR.saved)} ✓
        </span>
      </div>

      {score.totalSets > 0 && (
        <div className="rounded-xl border border-border bg-surface-2 p-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-muted">{t(STR.day_score)}</span>
            <span className="text-2xl font-bold tabular-nums">
              {score.pct == null ? "—" : `${score.pct}%`}
            </span>
          </div>
          <p className="text-xs text-muted tabular-nums">
            {score.correct}/{score.answered || score.totalQuestions} · {score.setsDone}/
            {score.totalSets} {t(STR.sets_done)}
            {score.bestStreak != null && (
              <> · {t(STR.best_streak)} {score.bestStreak}</>
            )}
          </p>

          <ul className="mt-2 space-y-1">
            {score.perSet.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-2 text-xs">
                <span className="min-w-0 flex-1 truncate">{t(s.label)}</span>
                {s.result ? (
                  <span
                    className={cn(
                      "shrink-0 tabular-nums font-medium",
                      s.result.correct === s.result.total
                        ? "text-success"
                        : "text-fg",
                    )}
                  >
                    {s.result.correct}/{s.result.total}
                  </span>
                ) : (
                  <span className="shrink-0 text-muted">{t(STR.not_attempted)}</span>
                )}
              </li>
            ))}
            {score.practice.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-2 text-xs">
                <span className="min-w-0 flex-1 truncate text-muted">{t(s.label)}</span>
                <span className="shrink-0 text-muted">
                  {s.result
                    ? s.kind === "streak"
                      ? `${t(STR.best_streak)} ${s.result.correct}`
                      : `✓ ${t(STR.practice_done)}`
                    : t(STR.not_attempted)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">
          {t(STR.mark_status)}
        </label>
        <Segmented
          value={p.status}
          onChange={(s: Status) => setStatus(day, s)}
          options={(["not-yet", "partial", "done"] as Status[]).map((s) => ({
            value: s,
            label: t(STATUS_LABEL[s]),
          }))}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={p.reviewed}
          onChange={(e) => setReviewed(day, e.target.checked)}
          className="size-4 accent-[var(--primary)]"
        />
        <span>{t(STR.reviewed_label)}</span>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium text-muted">
          {t(STR.notes_label)}
        </span>
        <textarea
          value={p.notes}
          onChange={(e) => setNotes(day, e.target.value)}
          placeholder={t(STR.notes_ph)}
          rows={3}
          className="w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        />
      </label>
    </Card>
  );
}
