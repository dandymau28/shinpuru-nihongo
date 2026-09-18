"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE = "sn.kanjicards.seen";

/**
 * Which kanji words the learner has flipped at least once in the flashcard
 * browser — a simple "seen" set, persisted to this browser only. Separate
 * from `sn.kanji.stats` (the MCQ trainer's right/wrong accuracy tracking):
 * this is passive exposure, that's graded recall.
 */
export function useKanjiCardsProgress() {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setSeen(new Set(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify([...seen]));
    } catch {
      /* ignore */
    }
  }, [seen, hydrated]);

  const markSeen = useCallback((kanji: string) => {
    setSeen((prev) => (prev.has(kanji) ? prev : new Set(prev).add(kanji)));
  }, []);

  const reset = useCallback(() => setSeen(new Set()), []);

  return { seen, hydrated, markSeen, reset };
}
