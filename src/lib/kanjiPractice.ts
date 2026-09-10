"use client";

import type { Bi } from "./i18n";
import { KANJI_WORDS, type KanjiEntry } from "@/data/kanji-drills";

export type SessionMode = "endless" | "set10" | "set20" | "set40";
export type KanjiMode = "reading" | "meaning" | "spelling";

export interface KanjiSettings {
  levels: ("N5" | "N4")[];
  mode: KanjiMode;
  session: SessionMode;
}

export const DEFAULT_SETTINGS: KanjiSettings = {
  levels: ["N5"],
  mode: "reading",
  session: "set20",
};

export const MODE_LABEL: Record<KanjiMode, Bi> = {
  reading: { en: "Reading", id: "Bacaan" },
  meaning: { en: "Meaning", id: "Arti" },
  spelling: { en: "Kana → kanji", id: "Kana → kanji" },
};

export const MODE_HINT: Record<KanjiMode, Bi> = {
  reading: { en: "see the kanji, pick the reading", id: "lihat kanji, pilih bacaannya" },
  meaning: { en: "see the kanji, pick the meaning", id: "lihat kanji, pilih artinya" },
  spelling: { en: "see the reading, pick the kanji", id: "lihat bacaan, pilih kanjinya" },
};

const STORAGE = "sn.kanji.settings";

export function loadSettings(): KanjiSettings {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(s: KanjiSettings) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function sessionLength(mode: SessionMode): number | null {
  return mode === "endless" ? null : Number(mode.replace("set", ""));
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export interface KanjiQuestion {
  key: string; // the word in kanji — used for stats
  mode: KanjiMode;
  /** shown large */
  prompt: string;
  promptKind: "kanji" | "kana";
  /** 4 options — strings for reading/spelling, Bi for meaning */
  options: (string | Bi)[];
  answer: number;
  entry: KanjiEntry;
}

export function eligibleEntries(s: KanjiSettings): KanjiEntry[] {
  return KANJI_WORDS.filter((w) => s.levels.includes(w.level));
}

/** Three distractors of similar shape to `correct`, drawn from `pool`. */
function distractors<T>(
  correct: T,
  candidates: T[],
  same: (a: T, b: T) => boolean,
): T[] {
  const pool = shuffle(candidates.filter((c) => !same(c, correct)));
  return pool.slice(0, 3);
}

function makeQuestion(entry: KanjiEntry, pool: KanjiEntry[], mode: KanjiMode): KanjiQuestion {
  if (mode === "meaning") {
    const wrong = distractors(entry, pool, (a, b) => a.meaning.en === b.meaning.en).map(
      (e) => e.meaning,
    );
    const opts = shuffle<string | Bi>([entry.meaning, ...wrong]);
    return {
      key: entry.kanji,
      mode,
      prompt: entry.kanji,
      promptKind: "kanji",
      options: opts,
      answer: opts.indexOf(entry.meaning),
      entry,
    };
  }

  if (mode === "spelling") {
    // reading shown → pick the kanji; bias distractors to a similar length
    const near = pool.filter((e) => Math.abs(e.kanji.length - entry.kanji.length) <= 1);
    const wrong = distractors(entry, near.length >= 5 ? near : pool, (a, b) => a.kanji === b.kanji)
      .map((e) => e.kanji);
    const opts = shuffle<string | Bi>([entry.kanji, ...wrong]);
    return {
      key: entry.kanji,
      mode,
      prompt: entry.kana,
      promptKind: "kana",
      options: opts,
      answer: opts.indexOf(entry.kanji),
      entry,
    };
  }

  // reading: kanji shown → pick the reading; distractors close in mora count
  const near = pool.filter((e) => Math.abs(e.kana.length - entry.kana.length) <= 1);
  const wrong = distractors(entry, near.length >= 5 ? near : pool, (a, b) => a.kana === b.kana)
    .map((e) => e.kana);
  const opts = shuffle<string | Bi>([entry.kana, ...wrong]);
  return {
    key: entry.kanji,
    mode,
    prompt: entry.kanji,
    promptKind: "kanji",
    options: opts,
    answer: opts.indexOf(entry.kana),
    entry,
  };
}

export function buildQueue(
  s: KanjiSettings,
  weak: Set<string> = new Set(),
  only?: KanjiEntry[],
): KanjiQuestion[] {
  const pool = only ?? eligibleEntries(s);
  if (pool.length < 4) return [];

  const weighted = shuffle(
    weak.size ? [...pool, ...pool.filter((e) => weak.has(e.kanji))] : pool,
  );

  const n = sessionLength(s.session);
  const target = n == null ? Math.min(weighted.length, 120) : n;

  const seen = new Set<string>();
  const picked: KanjiEntry[] = [];
  for (const e of weighted) {
    if (seen.has(e.kanji)) continue;
    seen.add(e.kanji);
    picked.push(e);
    if (picked.length >= target) break;
  }
  while (picked.length < target && weighted.length) {
    picked.push(weighted[picked.length % weighted.length]);
  }

  return picked.map((e) => makeQuestion(e, pool, s.mode));
}
