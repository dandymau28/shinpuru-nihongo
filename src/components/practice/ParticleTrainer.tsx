"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import { furigana } from "@/lib/furigana";
import {
  DEFAULT_SETTINGS,
  buildQueue,
  eligibleDrills,
  loadSettings,
  saveSettings,
  sessionLength,
  type ParticleDrill,
  type ParticleSettings,
} from "@/lib/particlePractice";
import { STREAK_MILESTONES, usePracticeStats } from "@/lib/practiceStats";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ParticleTrainerSetup } from "./ParticleTrainerSetup";
import { ParticleStatsPanel } from "./ParticleStatsPanel";
import { StreakCelebration } from "./StreakCelebration";

type Phase = "setup" | "playing" | "summary";

export function ParticleTrainer() {
  const { t, lang } = useSettings();
  const stats = usePracticeStats("sn.particles.stats");

  const [settings, setSettings] = useState<ParticleSettings>(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState<Phase>("setup");

  useEffect(() => {
    setSettings(loadSettings());
  }, []);
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const [queue, setQueue] = useState<ParticleDrill[]>([]);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<null | "right" | "wrong">(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [seen, setSeen] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState<ParticleDrill[]>([]);
  const [celebration, setCelebration] = useState<{ milestone: number; id: number } | null>(null);

  const total = sessionLength(settings.mode);
  const item = queue[pos % Math.max(queue.length, 1)];
  const chips = useMemo(
    () => settings.particles.slice().sort((a, b) => a.length - b.length),
    [settings.particles],
  );

  const start = useCallback(
    (opts?: { weak?: boolean; only?: ParticleDrill[] }) => {
      const q =
        opts?.only ?? buildQueue(settings, opts?.weak ? stats.weakKeys : undefined);
      if (q.length === 0) return;
      setQueue(q);
      setPos(0);
      setPicked(null);
      setResult(null);
      setStreak(0);
      setBest(0);
      setSeen(0);
      setCorrect(0);
      setWrong([]);
      setCelebration(null);
      setPhase("playing");
    },
    [settings, stats.weakKeys],
  );

  function choose(p: string) {
    if (!item || result) return;
    const ok = p === item.answer || (item.accept?.includes(p) ?? false);
    setPicked(p);
    setResult(ok ? "right" : "wrong");
    setSeen((s) => s + 1);
    if (ok) {
      setCorrect((c) => c + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBest((b) => Math.max(b, newStreak));
      if (
        stats.hydrated &&
        STREAK_MILESTONES.includes(newStreak) &&
        !stats.stats.celebrated.includes(newStreak)
      ) {
        stats.markCelebrated(newStreak);
        setCelebration({ milestone: newStreak, id: Date.now() });
      }
    } else {
      setStreak(0);
      setWrong((w) => (w.some((x) => x.key === item.key) ? w : [...w, item]));
    }
    stats.record(item.answer, ok, ok ? streak + 1 : streak);
  }

  function next() {
    if (total != null && seen >= total) {
      setPhase("summary");
      return;
    }
    setPos((p) => p + 1);
    setPicked(null);
    setResult(null);
  }

  // Enter → next; number keys 1-9 → pick the nth chip.
  useEffect(() => {
    if (phase !== "playing") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (result) {
          e.preventDefault();
          next();
        }
        return;
      }
      if (!result && /^[1-9]$/.test(e.key)) {
        const i = Number(e.key) - 1;
        if (i < chips.length) {
          e.preventDefault();
          choose(chips[i]);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // ---- setup ----
  if (phase === "setup") {
    return (
      <div className="space-y-4">
        <ParticleTrainerSetup
          settings={settings}
          onChange={setSettings}
          onStart={() => start()}
        />
        {eligibleDrills(settings).length === 0 && (
          <p className="rounded-xl border border-warning/40 bg-warning-soft/40 p-3 text-sm">
            {t(STR.pt_no_drills)}
          </p>
        )}
        <ParticleStatsPanel stats={stats} />
      </div>
    );
  }

  // ---- summary ----
  if (phase === "summary") {
    const pct = seen > 0 ? Math.round((correct / seen) * 100) : 0;
    return (
      <div className="space-y-5">
        {celebration && (
          <StreakCelebration milestone={celebration.milestone} runId={celebration.id} />
        )}
        <Card className="space-y-2 text-center">
          <p className="text-sm text-muted">{t(STR.conj_session_done)}</p>
          <p className="text-4xl font-bold tabular-nums">
            {correct}/{seen}
          </p>
          <p className="text-sm text-muted">
            {pct}% · {t(STR.conj_best)} {t(STR.conj_streak).toLowerCase()} {best}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Button size="sm" onClick={() => start()}>
              {t(STR.conj_restart)}
            </Button>
            {wrong.length > 0 && (
              <Button size="sm" variant="secondary" onClick={() => start({ only: wrong })}>
                {t(STR.ex_retry)} ({wrong.length})
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => setPhase("setup")}>
              {t(STR.conj_settings)}
            </Button>
          </div>
        </Card>

        {wrong.length > 0 && (
          <Card className="space-y-2">
            <h3 className="text-sm font-semibold text-muted">
              {t({ en: "Review these", id: "Ulas ini" })}
            </h3>
            <ul className="space-y-2 text-sm">
              {wrong.map((d) => (
                <li key={d.key}>
                  <p className="font-jp">
                    {furigana(d.ja.replace("___", `【${d.answer}】`))}
                  </p>
                  <p className="text-xs text-muted">{t(d.why)}</p>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <ParticleStatsPanel stats={stats} />
      </div>
    );
  }

  // ---- playing ----
  if (!item) return null;
  const [before, after] = item.ja.split("___");

  return (
    <div className="space-y-4">
      {celebration && (
        <StreakCelebration milestone={celebration.milestone} runId={celebration.id} />
      )}

      <div className="flex items-center gap-3 text-sm">
        <span className="rounded-lg bg-surface-2 px-2 py-1">
          {t(STR.conj_streak)} <b className="tabular-nums">{streak}</b>
        </span>
        <span className="text-muted">
          {t(STR.conj_best)} <b className="tabular-nums">{best}</b>
        </span>
        <span className="text-muted tabular-nums">
          {correct}/{seen}
        </span>
        <button
          onClick={() => setPhase("summary")}
          className="ml-auto text-xs text-muted underline hover:text-fg"
        >
          {t(STR.conj_end_session)}
        </button>
      </div>

      {total != null && (
        <div className="h-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(Math.min(seen, total) / total) * 100}%` }}
          />
        </div>
      )}

      <Card className="space-y-4">
        <p className="text-center font-jp text-xl leading-relaxed sm:text-2xl">
          {furigana(before ?? "")}
          <span
            className={cn(
              "mx-1 inline-flex min-w-9 items-center justify-center rounded-md border-b-2 px-2 py-0.5 font-bold",
              !result && "border-primary bg-primary-soft/50 text-primary",
              result === "right" && "border-success bg-success-soft/60 text-success",
              result === "wrong" && "border-danger bg-danger/10 text-danger",
            )}
          >
            {picked ?? "？"}
          </span>
          {furigana(after ?? "")}
        </p>

        <p className="text-center text-sm text-fg/70">
          {lang === "id" ? item.gloss.id : item.gloss.en}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((p) => {
            const isAnswer =
              !!result && (p === item.answer || (item.accept?.includes(p) ?? false));
            const isPicked = p === picked;
            return (
              <button
                key={p}
                disabled={!!result}
                onClick={() => choose(p)}
                className={cn(
                  "min-w-12 rounded-xl border-2 px-3 py-2 font-jp text-lg font-bold transition-colors",
                  !result && "border-border hover:border-primary hover:bg-surface-2",
                  result && isAnswer && "border-success bg-success-soft/60 text-success",
                  result && isPicked && !isAnswer && "border-danger bg-danger/10 text-danger",
                  result && !isPicked && !isAnswer && "border-border opacity-40",
                )}
              >
                {p}
              </button>
            );
          })}
        </div>

        {result && (
          <div
            className={cn(
              "rounded-xl border p-3 text-sm",
              result === "right"
                ? "border-success/40 bg-success-soft/40"
                : "border-danger/40 bg-danger/10",
            )}
          >
            <p
              className={cn(
                "font-semibold",
                result === "right" ? "text-success" : "text-danger",
              )}
            >
              {result === "right"
                ? `✓ ${t(STR.conj_correct)}`
                : `✕ ${t(STR.conj_incorrect)} — ${item.answer}`}
            </p>
            <p className="mt-1 text-muted">{t(item.why)}</p>
          </div>
        )}

        {result && (
          <div className="flex justify-center">
            <Button size="sm" onClick={next}>
              {t(STR.conj_next)} →
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
