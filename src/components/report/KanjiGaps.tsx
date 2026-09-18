"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { KANJI_WORDS } from "@/data/kanji-drills";
import { useKanjiCardsProgress } from "@/lib/kanjiCards";
import { usePracticeStats } from "@/lib/practiceStats";
import { Card } from "@/components/ui/Card";

// Flashcards (and so this gap analysis) only cover N5+N4 — N3/N2 are MCQ-only.
const DECK = KANJI_WORDS.filter((w) => w.level === "N5" || w.level === "N4");

/**
 * Cross-references flashcard "seen" tracking with the kanji trainer's
 * accuracy stats to surface what's still worth reviewing: never flipped in
 * the flashcards, and/or answered wrong often enough to count as weak.
 */
export function KanjiGaps() {
  const { t, lang } = useSettings();
  const cards = useKanjiCardsProgress();
  const kanjiStats = usePracticeStats("sn.kanji.stats");

  const gaps = useMemo(() => {
    const weak = kanjiStats.weakKeys;
    return DECK.map((word) => ({
      word,
      unreviewed: !cards.seen.has(word.kanji),
      isWeak: weak.has(word.kanji),
    }))
      .filter((g) => g.unreviewed || g.isWeak)
      .sort((a, b) => Number(b.isWeak) - Number(a.isWeak))
      .slice(0, 12);
  }, [cards.seen, kanjiStats.weakKeys]);

  if (!cards.hydrated || !kanjiStats.hydrated) return null;

  const readCount = DECK.filter((w) => cards.seen.has(w.kanji)).length;

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span aria-hidden>🎯</span>
          <h2 className="font-semibold">{t(STR.report_kanji_gaps_title)}</h2>
        </div>
        <Link
          href="/practice/flashcards"
          className="text-xs font-medium text-primary hover:underline"
        >
          {t(STR.report_review_flashcards)} →
        </Link>
      </div>
      <p className="text-sm text-muted">{t(STR.report_kanji_gaps_intro)}</p>
      <p className="text-sm">
        <b className="tabular-nums">{readCount}</b>/{DECK.length} {t(STR.report_kanji_reviewed)}
      </p>

      {gaps.length === 0 ? (
        <p className="text-xs text-muted">{t(STR.report_kanji_gaps_empty)}</p>
      ) : (
        <ul className="space-y-1.5">
          {gaps.map(({ word, unreviewed, isWeak }) => (
            <li key={word.kanji} className="flex items-center gap-2 text-sm">
              <span className="font-jp font-bold">{word.kanji}</span>
              <span className="shrink-0 font-jp text-xs text-muted">（{word.kana}）</span>
              <span className="min-w-0 flex-1 truncate text-xs text-fg/70">
                {lang === "id" ? word.meaning.id : word.meaning.en}
              </span>
              <span className="flex shrink-0 gap-1">
                {unreviewed && (
                  <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                    {t(STR.report_gap_unreviewed)}
                  </span>
                )}
                {isWeak && (
                  <span className="rounded-full bg-danger/10 px-1.5 py-0.5 text-[10px] font-medium text-danger">
                    {t(STR.report_gap_weak)}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
