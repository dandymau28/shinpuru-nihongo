"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import { answerMatches } from "@/lib/answers";
import { romajiToKana } from "@/lib/romaji";
import {
  DEFAULT_SETTINGS,
  buildQueue,
  eligibleEntries,
  glyphOf,
  hiraToKata,
  loadSettings,
  saveSettings,
  sessionLength,
  type KanaItem,
  type KanaSettings,
} from "@/lib/kanaPractice";
import { STREAK_MILESTONES, usePracticeStats } from "@/lib/practiceStats";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { KanaTrainerSetup } from "./KanaTrainerSetup";
import { PracticeStatsPanel } from "./PracticeStatsPanel";
import { StreakCelebration } from "./StreakCelebration";

type Phase = "setup" | "playing" | "summary";

export function KanaTrainer() {
  const { t } = useSettings();
  const stats = usePracticeStats("sn.kana.stats");

  const [settings, setSettings] = useState<KanaSettings>(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState<Phase>("setup");

  useEffect(() => {
    setSettings(loadSettings());
  }, []);
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const [queue, setQueue] = useState<KanaItem[]>([]);
  const [pos, setPos] = useState(0);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<null | "right" | "wrong" | "revealed">(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [seen, setSeen] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrongItems, setWrongItems] = useState<KanaItem[]>([]);
  const [celebration, setCelebration] = useState<{ milestone: number; id: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const total = sessionLength(settings.session);
  const item = queue[pos % Math.max(queue.length, 1)];

  const start = useCallback(
    (opts?: { weak?: boolean; only?: KanaItem[] }) => {
      const q = opts?.only ?? buildQueue(settings, opts?.weak ? stats.weakKeys : undefined);
      if (q.length === 0) return;
      setQueue(q);
      setPos(0);
      setValue("");
      setResult(null);
      setStreak(0);
      setBest(0);
      setSeen(0);
      setCorrect(0);
      setWrongItems([]);
      setCelebration(null);
      setPhase("playing");
      setTimeout(() => inputRef.current?.focus(), 30);
    },
    [settings, stats.weakKeys],
  );

  /** The correct answer as displayed text, given the current drill direction. */
  function answerText(it: KanaItem): string {
    return settings.mode === "kana-to-romaji" ? it.entry.romaji : glyphOf(it);
  }

  function grade(revealed = false) {
    if (!item || result) return;

    let ok = false;
    let submitted = value;
    if (settings.mode === "kana-to-romaji") {
      ok = !revealed && answerMatches(value, [item.entry.romaji, ...(item.entry.accept ?? [])]);
    } else {
      submitted = romajiToKana(value, { final: true });
      if (item.script === "katakana") submitted = hiraToKata(submitted);
      if (submitted !== value) setValue(submitted);
      ok = !revealed && answerMatches(submitted, [glyphOf(item)]);
    }

    setResult(revealed ? "revealed" : ok ? "right" : "wrong");
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
      setWrongItems((w) => (w.some((x) => x.key === item.key) ? w : [...w, item]));
    }
    stats.record(item.key, ok, ok ? streak + 1 : streak);
  }

  function next() {
    if (total != null && seen >= total) {
      setPhase("summary");
      return;
    }
    setPos((p) => p + 1);
    setValue("");
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 20);
  }

  // Enter submits, then advances.
  useEffect(() => {
    if (phase !== "playing") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.isComposing) return;
      e.preventDefault();
      if (result) next();
      else grade();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (settings.mode === "kana-to-romaji") {
      setValue(raw);
      return;
    }
    const converted = romajiToKana(raw);
    setValue(item?.script === "katakana" ? hiraToKata(converted) : converted);
  }

  // ---- setup ----
  if (phase === "setup") {
    return (
      <div className="space-y-4">
        <KanaTrainerSetup settings={settings} onChange={setSettings} onStart={() => start()} />
        {eligibleEntries(settings).length === 0 && (
          <p className="rounded-xl border border-warning/40 bg-warning-soft/40 p-3 text-sm">
            {t(STR.kana_no_kana)}
          </p>
        )}
        <PracticeStatsPanel stats={stats} renderKey={(k) => k} />
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
            {wrongItems.length > 0 && (
              <Button size="sm" variant="secondary" onClick={() => start({ only: wrongItems })}>
                {t(STR.ex_retry)} ({wrongItems.length})
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => setPhase("setup")}>
              {t(STR.conj_settings)}
            </Button>
          </div>
        </Card>

        {wrongItems.length > 0 && (
          <Card className="space-y-2">
            <h3 className="text-sm font-semibold text-muted">
              {t({ en: "Review these", id: "Ulas ini" })}
            </h3>
            <ul className="space-y-1.5 text-sm">
              {wrongItems.map((w, i) => (
                <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-jp text-base">{glyphOf(w)}</span>
                  <span className="text-muted">→ {w.entry.romaji}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <PracticeStatsPanel stats={stats} renderKey={(k) => k} />
      </div>
    );
  }

  // ---- playing ----
  if (!item) return null;
  const isKanaPrompt = settings.mode === "kana-to-romaji";

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
        <Pill tone={item.script === "hiragana" ? "primary" : "accent"}>
          {item.script === "hiragana" ? "Hiragana" : "Katakana"}
        </Pill>

        <p className={cn("font-jp", isKanaPrompt ? "text-6xl" : "text-3xl")}>
          {isKanaPrompt ? glyphOf(item) : item.entry.romaji}
        </p>

        <input
          ref={inputRef}
          autoFocus
          value={value}
          readOnly={!!result}
          onChange={onInput}
          placeholder={t(STR.ex_type_answer)}
          className={cn(
            "mx-auto w-full max-w-xs rounded-xl border-2 bg-surface px-3 py-2.5 text-center font-jp text-xl focus:outline-none",
            !result && "border-border focus:border-primary",
            result === "right" && "border-success bg-success-soft/50",
            (result === "wrong" || result === "revealed") && "border-danger bg-danger/10",
          )}
        />

        {result && (
          <div
            className={cn(
              "rounded-xl border p-3 text-sm",
              result === "right"
                ? "border-success/40 bg-success-soft/40 text-success"
                : "border-danger/40 bg-danger/10",
            )}
          >
            {result === "right" ? (
              <p className="font-semibold">✓ {t(STR.conj_correct)}</p>
            ) : (
              <p className="font-jp text-base">
                <span className={result === "revealed" ? "text-fg" : "font-semibold text-danger"}>
                  {result === "wrong" && `✕ `}
                  {t(STR.conj_answer)}:{" "}
                </span>
                <b className="text-fg">{answerText(item)}</b>
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center gap-2">
          {!result ? (
            <>
              <Button size="sm" onClick={() => grade()} disabled={!value.trim()}>
                {t(STR.conj_check)}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => grade(true)}>
                {t(STR.conj_reveal)}
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={next}>
              {t(STR.conj_next)} →
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
