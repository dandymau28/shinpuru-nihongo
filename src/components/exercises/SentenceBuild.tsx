"use client";

import { useEffect, useMemo, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { BuildQuestion } from "@/lib/types";
import { furigana } from "@/lib/furigana";
import { Button } from "@/components/ui/Button";
import { Feedback } from "./Feedback";
import { cn } from "@/lib/cn";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SentenceBuild({
  question,
  onResult,
}: {
  question: BuildQuestion;
  onResult: (correct: boolean) => void;
}) {
  const { t, lang } = useSettings();
  const ordered = useMemo(
    () =>
      [...question.tiles, ...(question.distractors ?? [])].map((text, id) => ({
        id,
        text,
      })),
    [question],
  );
  // Shuffle only after mount so SSR and first client render match.
  const [pool, setPool] = useState(ordered);
  useEffect(() => setPool(shuffle(ordered)), [ordered]);
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const answer = picked.map((id) => pool.find((p) => p.id === id)!.text);
  const correct =
    answer.length === question.tiles.length &&
    answer.every((tok, i) => tok === question.tiles[i]);

  function check() {
    if (picked.length === 0 || checked) return;
    setChecked(true);
    onResult(correct);
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">{lang === "id" ? question.id : question.en}</p>

      <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border border-dashed border-border bg-surface-2 p-2">
        {picked.length === 0 && (
          <span className="px-1 text-xs text-muted">—</span>
        )}
        {picked.map((id) => {
          const tile = pool.find((p) => p.id === id)!;
          return (
            <button
              key={id}
              disabled={checked}
              onClick={() => setPicked((p) => p.filter((x) => x !== id))}
              className="rounded-lg border border-border bg-surface px-2.5 py-1 font-jp text-sm"
            >
              {furigana(tile.text)}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {pool.map((tile) => {
          const used = picked.includes(tile.id);
          return (
            <button
              key={tile.id}
              disabled={used || checked}
              onClick={() => setPicked((p) => [...p, tile.id])}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-jp text-sm transition-colors",
                used
                  ? "border-transparent bg-surface-2 text-muted opacity-40"
                  : "border-border hover:bg-surface-2",
              )}
            >
              {furigana(tile.text)}
            </button>
          );
        })}
      </div>

      {!checked ? (
        <div className="flex gap-2">
          <Button size="sm" onClick={check} disabled={picked.length === 0}>
            {t(STR.ex_check)}
          </Button>
          {picked.length > 0 && (
            <Button size="sm" variant="ghost" onClick={() => setPicked([])}>
              {t(STR.ex_retry)}
            </Button>
          )}
        </div>
      ) : (
        <Feedback
          correct={correct}
          explain={question.explain}
          answerText={question.tiles.join(" ")}
        />
      )}
    </div>
  );
}
