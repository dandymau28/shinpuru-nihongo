"use client";

import { useMemo, useState } from "react";
import { PLANNER } from "@/data/planner";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { useCurrentDay } from "@/lib/useCurrentDay";
import { STR } from "@/lib/strings";
import { PHASE_LABEL, TYPE_LABEL, STATUS_LABEL } from "@/lib/labels";
import type { DayType, Phase, Status } from "@/lib/types";
import { Select } from "@/components/ui/Select";
import { Pill, PHASE_TONE } from "@/components/ui/Pill";
import { DayRow } from "./DayRow";

const MONTH_LABEL: Record<string, { en: string; id: string }> = {
  September: { en: "September", id: "September" },
  Oktober: { en: "October", id: "Oktober" },
  November: { en: "November", id: "November" },
};

export function PlannerView() {
  const { t } = useSettings();
  const { getDay } = useProgress();
  const { day: today } = useCurrentDay();

  const [phase, setPhase] = useState<Phase | "all">("all");
  const [type, setType] = useState<DayType | "all">("all");
  const [status, setStatus] = useState<Status | "all">("all");

  const filtered = useMemo(
    () =>
      PLANNER.filter((d) => {
        if (phase !== "all" && d.phase !== phase) return false;
        if (type !== "all" && d.type !== type) return false;
        if (status !== "all" && getDay(d.day).status !== status) return false;
        return true;
      }),
    [phase, type, status, getDay],
  );

  const byMonth = useMemo(() => {
    const groups: { month: string; days: typeof filtered }[] = [];
    for (const d of filtered) {
      const g = groups[groups.length - 1];
      if (g && g.month === d.month) g.days.push(d);
      else groups.push({ month: d.month, days: [d] });
    }
    return groups;
  }, [filtered]);

  const types: DayType[] = [
    "grammar",
    "vocab-kanji",
    "reading",
    "listening",
    "review",
    "test",
    "diagnostic",
    "skill",
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Select value={phase} onChange={(e) => setPhase(e.target.value as Phase | "all")}>
          <option value="all">{t(STR.filter_phase)}: {t(STR.filter_all)}</option>
          {(["n5-refresher", "n4-core", "exam-sprint"] as Phase[]).map((p) => (
            <option key={p} value={p}>
              {t(PHASE_LABEL[p])}
            </option>
          ))}
        </Select>

        <Select value={type} onChange={(e) => setType(e.target.value as DayType | "all")}>
          <option value="all">{t(STR.filter_type)}: {t(STR.filter_all)}</option>
          {types.map((ty) => (
            <option key={ty} value={ty}>
              {t(TYPE_LABEL[ty])}
            </option>
          ))}
        </Select>

        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | "all")}
        >
          <option value="all">{t(STR.filter_status)}: {t(STR.filter_all)}</option>
          {(["not-yet", "partial", "done"] as Status[]).map((s) => (
            <option key={s} value={s}>
              {t(STATUS_LABEL[s])}
            </option>
          ))}
        </Select>
      </div>

      {byMonth.length === 0 && (
        <p className="rounded-xl border border-border bg-surface p-6 text-center text-sm text-muted">
          {t(STR.no_results)}
        </p>
      )}

      {byMonth.map((group) => (
        <section key={group.month}>
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-sm font-semibold">{t(MONTH_LABEL[group.month])}</h2>
            <span className="text-xs text-muted">
              {group.days.length} {t(STR.days_unit)}
            </span>
          </div>
          <div className="space-y-1">
            {group.days.map((d, i) => {
              const prev = group.days[i - 1];
              const showPhase = !prev || prev.phase !== d.phase;
              return (
                <div key={d.day}>
                  {showPhase && (
                    <div className="px-3 pb-1 pt-2">
                      <Pill tone={PHASE_TONE[d.phase]}>{t(PHASE_LABEL[d.phase])}</Pill>
                    </div>
                  )}
                  <DayRow day={d} isToday={today === d.day} />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
