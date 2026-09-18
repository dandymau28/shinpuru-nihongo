"use client";

import { useEffect, useMemo, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import { KANJI_WORDS, type KanjiEntry } from "@/data/kanji-drills";
import { useKanjiCardsProgress } from "@/lib/kanjiCards";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Flashcards are scoped to N5+N4 only — N3/N2 stay MCQ-only in the trainer.
const DECK: KanjiEntry[] = KANJI_WORDS.filter((w) => w.level === "N5" || w.level === "N4");

type LevelFilter = "all" | "N5" | "N4";
type ViewFilter = "all" | "unread" | "read";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function KanjiFlashcards() {
  const { t, lang } = useSettings();
  const { seen, hydrated, markSeen, reset } = useKanjiCardsProgress();

  const [level, setLevel] = useState<LevelFilter>("all");
  const [view, setView] = useState<ViewFilter>("all");
  const [order, setOrder] = useState<KanjiEntry[]>(DECK);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Shuffle once on mount, client-side only (no Math.random() during render).
  useEffect(() => setOrder(shuffle(DECK)), []);

  const filtered = useMemo(() => {
    return order.filter((w) => {
      if (level !== "all" && w.level !== level) return false;
      if (!hydrated) return true;
      if (view === "unread" && seen.has(w.kanji)) return false;
      if (view === "read" && !seen.has(w.kanji)) return false;
      return true;
    });
  }, [order, level, view, seen, hydrated]);

  useEffect(() => {
    setPos(0);
    setFlipped(false);
  }, [level, view]);

  const card = filtered.length ? filtered[pos % filtered.length] : undefined;

  function flip() {
    if (!card) return;
    setFlipped((v) => {
      const next = !v;
      if (next) markSeen(card.kanji);
      return next;
    });
  }
  function next() {
    if (!filtered.length) return;
    setPos((p) => (p + 1) % filtered.length);
    setFlipped(false);
  }
  function prev() {
    if (!filtered.length) return;
    setPos((p) => (p - 1 + filtered.length) % filtered.length);
    setFlipped(false);
  }
  function reshuffle() {
    setOrder(shuffle(DECK));
    setPos(0);
    setFlipped(false);
  }

  // Arrow keys navigate, space/enter flips — rebind every render so the
  // closures above always see the current filtered list / position.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flip();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const readCount = hydrated ? DECK.filter((w) => seen.has(w.kanji)).length : 0;

  const levelOptions: { value: LevelFilter; label: string }[] = [
    { value: "all", label: t(STR.filter_all) },
    { value: "N5", label: "N5" },
    { value: "N4", label: "N4" },
  ];
  const viewOptions: { value: ViewFilter; label: string }[] = [
    { value: "all", label: t(STR.fc_view_all) },
    { value: "unread", label: t(STR.fc_view_unread) },
    { value: "read", label: t(STR.fc_view_read) },
  ];

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>
            <b className="tabular-nums">{readCount}</b>/{DECK.length} {t(STR.fc_read)}
          </span>
          <button
            onClick={reset}
            className="text-xs text-muted underline hover:text-danger"
          >
            {t(STR.fc_reset_progress)}
          </button>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${DECK.length ? (readCount / DECK.length) * 100 : 0}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {levelOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setLevel(o.value)}
              aria-pressed={level === o.value}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors",
                level === o.value
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border text-muted hover:bg-surface-2",
              )}
            >
              {o.label}
            </button>
          ))}
          <span className="mx-0.5 text-border" aria-hidden>
            |
          </span>
          {viewOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setView(o.value)}
              aria-pressed={view === o.value}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors",
                view === o.value
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border text-muted hover:bg-surface-2",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </Card>

      {!card ? (
        <Card className="text-center text-sm text-muted">{t(STR.fc_empty)}</Card>
      ) : (
        <>
          <p className="text-center text-xs tabular-nums text-muted">
            {pos + 1} / {filtered.length}
          </p>

          <button
            onClick={flip}
            className="grid min-h-48 w-full place-items-center rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:bg-surface-2"
          >
            {!flipped ? (
              <span className="font-jp text-5xl font-bold">{card.kanji}</span>
            ) : (
              <div className="space-y-1.5">
                <p className="font-jp text-2xl text-muted">{card.kana}</p>
                <p className="text-lg font-medium">
                  {lang === "id" ? card.meaning.id : card.meaning.en}
                </p>
              </div>
            )}
          </button>
          <p className="text-center text-xs text-muted">{t(STR.fc_tap_hint)}</p>

          <div className="flex justify-center gap-2">
            <Button size="sm" variant="secondary" onClick={prev}>
              ← {t(STR.fc_prev)}
            </Button>
            <Button size="sm" variant="ghost" onClick={reshuffle}>
              🔀 {t(STR.fc_shuffle)}
            </Button>
            <Button size="sm" onClick={next}>
              {t(STR.fc_next)} →
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
