"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { ConjugationItem, ExerciseGroup } from "@/lib/types";
import { furigana, stripFurigana } from "@/lib/furigana";
import { answerMatches } from "@/lib/answers";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function pick<T>(arr: T[], avoid?: T): T {
  if (arr.length === 1) return arr[0];
  let x = arr[Math.floor(Math.random() * arr.length)];
  let guard = 0;
  while (x === avoid && guard++ < 8) x = arr[Math.floor(Math.random() * arr.length)];
  return x;
}

export function ConjugationDrill({
  group,
  onFinish,
}: {
  group: ExerciseGroup;
  onFinish: (result: { correct: number; total: number }) => void;
}) {
  const { t } = useSettings();
  const items = useMemo(
    () => group.questions.filter((q): q is ConjugationItem => q.kind === "conjugation"),
    [group],
  );

  const [current, setCurrent] = useState<ConjugationItem>(items[0]);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) {
      setStarted(true);
      setCurrent(pick(items));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const next = useCallback(
    (prev: ConjugationItem) => {
      setCurrent(pick(items, prev));
      setValue("");
      setState("idle");
      inputRef.current?.focus();
    },
    [items],
  );

  function submit() {
    if (state !== "idle") {
      next(current);
      return;
    }
    if (!value.trim()) return;
    const ok = answerMatches(value, current.accept);
    setAttempts((a) => a + 1);
    if (ok) {
      setState("right");
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBest((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      setState("wrong");
      setStreak(0);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm">
        <span className="rounded-lg bg-surface-2 px-2 py-1">
          {t(STR.ex_streak)} <b className="tabular-nums">{streak}</b>
        </span>
        <span className="text-muted">
          {t(STR.ex_best)} <b className="tabular-nums">{best}</b>
        </span>
        <button
          onClick={() => onFinish({ correct: best, total: attempts })}
          className="ml-auto text-xs text-muted underline hover:text-fg"
        >
          {t(STR.ex_finish)}
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 text-center">
        <p className="text-xs uppercase tracking-wide text-muted">{t(current.target)}</p>
        <p className="mt-1 font-jp text-3xl">{furigana(current.dict)}</p>
        {current.meaning && (
          <p className="mt-1 text-xs text-muted">{t(current.meaning)}</p>
        )}

        <input
          ref={inputRef}
          autoFocus
          value={value}
          disabled={state !== "idle"}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={t(STR.ex_type_answer)}
          className={cn(
            "mt-4 w-full max-w-xs rounded-xl border-2 bg-surface px-3 py-2 text-center font-jp text-lg focus:outline-none",
            state === "idle" && "border-border focus:border-primary",
            state === "right" && "border-success bg-success-soft/50",
            state === "wrong" && "border-danger bg-danger/10",
          )}
        />

        {state === "wrong" && (
          <p className="mt-2 font-jp text-sm">
            <span className="text-muted">{t(STR.ex_answer_was)}: </span>
            <b>{stripFurigana(current.accept[0])}</b>
          </p>
        )}

        <div className="mt-4">
          <Button size="sm" onClick={submit} disabled={state === "idle" && !value.trim()}>
            {state === "idle" ? t(STR.ex_check) : t(STR.ex_next)}
          </Button>
        </div>
      </div>

      <p className="text-center text-xs text-muted">
        {correctCount}/{attempts} {t(STR.ex_correct).toLowerCase()}
      </p>

      <p className="text-center">
        <a
          href="/practice/conjugation"
          className="text-xs text-primary underline hover:opacity-80"
        >
          {t(STR.conj_open_trainer)} →
        </a>
      </p>
    </div>
  );
}
