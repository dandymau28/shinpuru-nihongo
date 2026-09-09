"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { getContent } from "@/content/registry";
import { computeDayScore } from "@/lib/dayScore";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";

/**
 * Sticky, always-visible counter that rolls up every graded exercise on the day.
 * Also promotes the day to "done" once every exercise (graded + practice) is finished.
 */
export function DayScoreBar({
  dayNumber,
  lessonSlug,
}: {
  dayNumber: number;
  lessonSlug?: string;
}) {
  const { t } = useSettings();
  const { getDay, setStatus, hydrated } = useProgress();
  const module = getContent(lessonSlug);
  const progress = getDay(dayNumber);
  const score = computeDayScore(module, progress.exercises);

  // Promote to "done" only on the transition to all-complete, so the learner
  // can still manually move a finished day back to another status afterwards.
  const wasComplete = useRef(false);
  useEffect(() => {
    if (!hydrated) return;
    if (score.allComplete && !wasComplete.current && progress.status !== "done") {
      setStatus(dayNumber, "done");
    }
    wasComplete.current = score.allComplete;
  }, [hydrated, score.allComplete, progress.status, dayNumber, setStatus]);

  if (score.totalSets === 0) return null;

  const pctColor =
    score.pct == null
      ? "text-muted"
      : score.pct >= 80
        ? "text-success"
        : score.pct >= 60
          ? "text-warning"
          : "text-danger";

  return (
    <div className="sticky top-[57px] z-20 -mx-4 border-b border-border bg-bg/95 px-4 py-2 backdrop-blur sm:top-[61px] sm:-mx-6 sm:px-6">
      <div className="flex items-center gap-3 text-sm">
        <span className="font-medium">{t(STR.day_score)}</span>

        <span className={cn("font-bold tabular-nums", pctColor)}>
          {score.pct == null ? "—" : `${score.pct}%`}
        </span>

        {score.answered > 0 && (
          <span className="text-muted tabular-nums">
            {score.correct}/{score.answered}
          </span>
        )}

        <span className="ml-auto text-xs text-muted tabular-nums">
          {score.setsDone}/{score.totalSets} {t(STR.sets_done)}
        </span>
      </div>

      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(score.setsDone / score.totalSets) * 100}%` }}
        />
      </div>

      {score.allComplete && (
        <p className="mt-1 text-xs font-medium text-success">
          ✓ {t(STR.day_all_done)}
        </p>
      )}
    </div>
  );
}
