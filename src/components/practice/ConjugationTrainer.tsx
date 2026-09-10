"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import { furigana } from "@/lib/furigana";
import { answerMatches } from "@/lib/answers";
import { romajiToKana } from "@/lib/romaji";
import { FORM_BY_ID } from "@/lib/conjugation";
import {
  DEFAULT_SETTINGS,
  buildQueue,
  loadSettings,
  saveSettings,
  sessionLength,
  useConjStats,
  type PracticeItem,
  type PracticeSettings,
} from "@/lib/conjPractice";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ConjugationSettingsPanel } from "./ConjugationSettingsPanel";
import { ConjugationStatsPanel } from "./ConjugationStatsPanel";

type Phase = "setup" | "playing" | "summary";

export function ConjugationTrainer() {
  const { t, lang } = useSettings();
  const stats = useConjStats();

  const [settings, setSettings] = useState<PracticeSettings>(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState<Phase>("setup");

  useEffect(() => {
    const loaded = loadSettings();
    // `?forms=te,plain-past` pre-selects those forms (read here so the page
    // stays statically exportable — no server searchParams).
    const raw = new URLSearchParams(window.location.search).get("forms");
    const urlForms = raw
      ?.split(",")
      .map((f) => f.trim())
      .filter((f) => FORM_BY_ID.has(f));
    setSettings(urlForms?.length ? { ...loaded, forms: urlForms } : loaded);
  }, []);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // session state
  const [queue, setQueue] = useState<PracticeItem[]>([]);
  const [pos, setPos] = useState(0);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<null | "right" | "wrong" | "revealed">(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [seen, setSeen] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrongItems, setWrongItems] = useState<PracticeItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const total = sessionLength(settings.mode);
  const item = queue[pos % Math.max(queue.length, 1)];
  const form = item && FORM_BY_ID.get(item.formId);

  const start = useCallback(
    (opts?: { weak?: boolean; only?: PracticeItem[] }) => {
      const q = opts?.only ?? buildQueue(settings, opts?.weak ? stats.weakForms : undefined);
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
      setPhase("playing");
      setTimeout(() => inputRef.current?.focus(), 30);
    },
    [settings, stats.weakForms],
  );

  const showAnswerNow = result === "wrong" || result === "revealed";

  function grade(revealed = false) {
    if (!item || result) return;
    const ok = !revealed && answerMatches(value, item.answer.accept);
    setResult(revealed ? "revealed" : ok ? "right" : "wrong");
    setSeen((s) => s + 1);
    if (ok) {
      setCorrect((c) => c + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBest((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      setStreak(0);
      setWrongItems((w) => (w.some((x) => x.word.kana === item.word.kana && x.formId === item.formId) ? w : [...w, item]));
    }
    stats.record(item.formId, ok, ok ? streak + 1 : streak);
  }

  function next() {
    const answeredCount = seen;
    if (total != null && answeredCount >= total) {
      setPhase("summary");
      return;
    }
    setPos((p) => p + 1);
    setValue("");
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 20);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (result) next();
    else grade();
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setValue(settings.input === "romaji" ? romajiToKana(raw) : raw);
  }

  // ---- render ----
  if (phase === "setup") {
    return (
      <div className="space-y-4">
        <ConjugationSettingsPanel
          settings={settings}
          onChange={setSettings}
          onStart={() => start()}
        />
        {buildQueue(settings).length === 0 && (
          <p className="rounded-xl border border-warning/40 bg-warning-soft/40 p-3 text-sm">
            {t(STR.conj_no_pairs)}
          </p>
        )}
        <ConjugationStatsPanel stats={stats} />
      </div>
    );
  }

  if (phase === "summary") {
    const pct = seen > 0 ? Math.round((correct / seen) * 100) : 0;
    return (
      <div className="space-y-5">
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
              {wrongItems.map((w, i) => {
                const f = FORM_BY_ID.get(w.formId);
                return (
                  <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-jp">{furigana(w.word.dict)}</span>
                    <span className="text-xs text-muted">{f && t(f.label)}</span>
                    <span className="font-jp font-medium">→ {w.answer.kanji}</span>
                    <span className="font-jp text-xs text-muted">（{w.answer.kana}）</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}

        <ConjugationStatsPanel stats={stats} />
      </div>
    );
  }

  // playing
  if (!item || !form) return null;
  const showMeaning = settings.showMeaning === "always" || showAnswerNow;
  const showReading = settings.showReading === "always" || showAnswerNow;

  return (
    <div className="space-y-4">
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
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
          <span aria-hidden>{form.emoji}</span>
          {t(form.label)}
          <span className="font-jp text-xs opacity-70">{form.jp}</span>
        </div>

        <div>
          <p className="font-jp text-4xl">{furigana(item.word.dict)}</p>
          <p
            className={cn(
              "mt-1 font-jp text-sm text-muted transition-opacity",
              showReading ? "opacity-100" : "opacity-0",
            )}
          >
            {item.word.kana}
          </p>
          <p
            className={cn(
              "text-sm text-fg/70 transition-opacity",
              showMeaning ? "opacity-100" : "opacity-0",
            )}
          >
            {lang === "id" ? item.word.meaning.id : item.word.meaning.en}
          </p>
        </div>

        <input
          ref={inputRef}
          autoFocus
          value={value}
          disabled={!!result}
          onChange={onInput}
          onKeyDown={onKey}
          inputMode={settings.input === "romaji" ? "text" : undefined}
          placeholder={t(STR.conj_type_answer)}
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
                <b className="text-fg">{item.answer.kanji}</b>
                <span className="text-muted"> （{item.answer.kana}）</span>
              </p>
            )}
            {item.answer.note && (
              <p className="mt-1 text-xs text-muted">{t(item.answer.note)}</p>
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

      <p className="text-center text-xs text-muted">{t(form.explain)}</p>
    </div>
  );
}
