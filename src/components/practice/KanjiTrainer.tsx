"use client";

import { useCallback, useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import {
  DEFAULT_SETTINGS,
  buildQueue,
  eligibleEntries,
  loadSettings,
  saveSettings,
  sessionLength,
  MODE_LABEL,
  type KanjiQuestion,
  type KanjiSettings,
} from "@/lib/kanjiPractice";
import { STREAK_MILESTONES, usePracticeStats } from "@/lib/practiceStats";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { KanjiTrainerSetup } from "./KanjiTrainerSetup";
import { PracticeStatsPanel } from "./PracticeStatsPanel";
import { StreakCelebration } from "./StreakCelebration";

type Phase = "setup" | "playing" | "summary";

export function KanjiTrainer() {
  const { t, lang } = useSettings();
  const stats = usePracticeStats("sn.kanji.stats");
  const gloss = (b: { en: string; id: string }) => (lang === "id" ? b.id : b.en);

  const [settings, setSettings] = useState<KanjiSettings>(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState<Phase>("setup");

  useEffect(() => {
    setSettings(loadSettings());
  }, []);
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const [queue, setQueue] = useState<KanjiQuestion[]>([]);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<null | "right" | "wrong">(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [seen, setSeen] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState<KanjiQuestion[]>([]);
  const [celebration, setCelebration] = useState<{ milestone: number; id: number } | null>(null);

  const total = sessionLength(settings.session);
  const item = queue[pos % Math.max(queue.length, 1)];

  const start = useCallback(
    (opts?: { weak?: boolean; only?: KanjiQuestion[] }) => {
      const q =
        opts?.only ??
        buildQueue(
          settings,
          opts?.weak ? stats.weakKeys : undefined,
          opts?.weak
            ? eligibleEntries(settings).filter((e) => stats.weakKeys.has(e.kanji))
            : undefined,
        );
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

  function choose(i: number) {
    if (!item || result) return;
    const ok = i === item.answer;
    setPicked(i);
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
    stats.record(item.key, ok, ok ? streak + 1 : streak);
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
      if (!result && /^[1-4]$/.test(e.key) && item) {
        e.preventDefault();
        choose(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // ---- setup ----
  if (phase === "setup") {
    return (
      <div className="space-y-4">
        <KanjiTrainerSetup
          settings={settings}
          onChange={setSettings}
          onStart={() => start()}
        />
        {eligibleEntries(settings).length < 4 && (
          <p className="rounded-xl border border-warning/40 bg-warning-soft/40 p-3 text-sm">
            {t(STR.kj_no_words)}
          </p>
        )}
        <PracticeStatsPanel stats={stats} />
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
            <ul className="space-y-1.5 text-sm">
              {wrong.map((q) => (
                <li key={q.key} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-jp font-medium">{q.entry.kanji}</span>
                  <span className="font-jp text-xs text-muted">（{q.entry.kana}）</span>
                  <span className="text-xs text-muted">{gloss(q.entry.meaning)}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <PracticeStatsPanel
          stats={stats}
          renderKey={(key) => key}
        />
      </div>
    );
  }

  // ---- playing ----
  if (!item) return null;

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

      <Card className="space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          {t(MODE_LABEL[item.mode])}
        </div>

        <p
          className={cn(
            "font-jp font-bold",
            item.promptKind === "kanji" ? "text-5xl" : "text-3xl",
          )}
        >
          {item.prompt}
        </p>

        <div className="mx-auto grid max-w-sm gap-2 sm:grid-cols-2">
          {item.options.map((opt, i) => {
            const label = typeof opt === "string" ? opt : gloss(opt);
            const isAnswer = i === item.answer;
            const isPicked = i === picked;
            return (
              <button
                key={i}
                disabled={!!result}
                onClick={() => choose(i)}
                className={cn(
                  "rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-colors",
                  item.mode === "meaning" ? "text-left" : "font-jp text-lg",
                  !result && "border-border hover:border-primary hover:bg-surface-2",
                  result && isAnswer && "border-success bg-success-soft/60 text-success",
                  result && isPicked && !isAnswer && "border-danger bg-danger/10 text-danger",
                  result && !isPicked && !isAnswer && "border-border opacity-40",
                )}
              >
                {label}
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
              {result === "right" ? `✓ ${t(STR.conj_correct)}` : `✕ ${t(STR.conj_incorrect)}`}
            </p>
            <p className="mt-1 font-jp text-base">
              <b>{item.entry.kanji}</b>
              <span className="text-muted"> （{item.entry.kana}）</span>
              <span className="text-fg/70"> — {gloss(item.entry.meaning)}</span>
            </p>
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
