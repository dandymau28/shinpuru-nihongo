"use client";

import { useEffect, useMemo, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { STR } from "@/lib/strings";
import type { DeckModule, FlashCard } from "@/lib/types";
import { furigana } from "@/lib/furigana";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { ExerciseSet } from "@/components/exercises/ExerciseSet";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function Deck({
  cards,
  onDone,
}: {
  cards: FlashCard[];
  onDone: (known: number, total: number) => void;
}) {
  const { t, lang } = useSettings();
  const [queue, setQueue] = useState(cards);
  useEffect(() => setQueue(shuffle(cards)), [cards]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [reviewed, setReviewed] = useState(0);

  const card = queue[pos];
  const finished = pos >= queue.length;

  if (finished) {
    return (
      <div className="rounded-xl border border-border bg-surface-2 p-4 text-center">
        <p className="text-sm text-muted">{t({ en: "Round complete", id: "Ronde selesai" })}</p>
        <p className="text-2xl font-bold tabular-nums">
          {known}/{cards.length}
        </p>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => {
            setQueue(shuffle(cards));
            setPos(0);
            setFlipped(false);
            setKnown(0);
            setReviewed(0);
          }}
        >
          {t(STR.ex_retry)}
        </Button>
      </div>
    );
  }

  function grade(ok: boolean) {
    const nextReviewed = reviewed + 1;
    const nextKnown = known + (ok ? 1 : 0);
    setReviewed(nextReviewed);
    setKnown(nextKnown);
    setFlipped(false);
    setPos((p) => p + 1);
    if (pos + 1 >= queue.length) onDone(nextKnown, cards.length);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(pos / queue.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted">
          {pos + 1} {t(STR.ex_of)} {queue.length}
        </span>
      </div>

      <button
        onClick={() => setFlipped((v) => !v)}
        className="grid min-h-40 w-full place-items-center rounded-2xl border border-border bg-surface p-6 text-center"
      >
        {!flipped ? (
          <span className="font-jp text-3xl">{furigana(card.front)}</span>
        ) : (
          <div className="space-y-1">
            {card.reading && (
              <p className="font-jp text-lg text-muted">{card.reading}</p>
            )}
            <p className="text-lg font-medium">{lang === "id" ? card.meaning.id : card.meaning.en}</p>
            {card.example && (
              <p className="mt-2 font-jp text-sm text-fg/80">{furigana(card.example.ja)}</p>
            )}
          </div>
        )}
      </button>

      {flipped ? (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" className="flex-1" onClick={() => grade(false)}>
            {t({ en: "Review again", id: "Ulang lagi" })}
          </Button>
          <Button size="sm" className="flex-1" onClick={() => grade(true)}>
            {t({ en: "Got it", id: "Paham" })}
          </Button>
        </div>
      ) : (
        <p className="text-center text-xs text-muted">
          {t({ en: "Tap the card to flip", id: "Ketuk kartu untuk membalik" })}
        </p>
      )}
    </div>
  );
}

export function DeckRunner({
  module,
  dayNumber,
}: {
  module: DeckModule;
  dayNumber: number;
}) {
  const { t } = useSettings();
  const { recordExercise } = useProgress();
  const [activeDeck, setActiveDeck] = useState(module.decks[0]?.id ?? "");

  const deck = useMemo(
    () => module.decks.find((d) => d.id === activeDeck) ?? module.decks[0],
    [module.decks, activeDeck],
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Pill tone="primary">{t(STR["type_vocab-kanji"])}</Pill>
        <h1 className="text-xl font-bold sm:text-2xl">{t(module.title)}</h1>
        <p className="max-w-prose text-sm text-muted">{t(module.description)}</p>
      </header>

      {module.decks.length > 1 && (
        <Segmented
          value={activeDeck}
          onChange={setActiveDeck}
          options={module.decks.map((d) => ({ value: d.id, label: t(d.label) }))}
        />
      )}

      {deck && (
        <Card>
          <Deck
            key={deck.id}
            cards={deck.cards}
            onDone={(known, total) =>
              recordExercise(dayNumber, {
                setId: `${module.slug}:${deck.id}`,
                correct: known,
                total,
                scored: false,
              })
            }
          />
        </Card>
      )}

      {module.quiz && module.quiz.length > 0 && (
        <div className="space-y-4 border-t border-border pt-6">
          <h2 className="text-lg font-bold">{t(STR.exercises)}</h2>
          {module.quiz.map((g) => (
            <ExerciseSet key={g.id} dayNumber={dayNumber} group={g} />
          ))}
        </div>
      )}
    </div>
  );
}
