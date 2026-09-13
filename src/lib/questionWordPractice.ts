"use client";

import type { Bi } from "./i18n";
import { QUESTION_WORD_DRILLS, type QWContrast, type QWDrill } from "@/data/question-word-drills";

export type SessionMode = "endless" | "set10" | "set20" | "set40";

export const QUESTION_WORDS = [
  "何", "誰", "どこ", "いつ", "どうして", "どちら", "どんな", "どの", "どれ", "いくつ", "いくら", "どう",
] as const;
export type QuestionWord = (typeof QUESTION_WORDS)[number];

export interface QWSettings {
  words: string[];
  levels: ("N5" | "N4")[];
  contrast: QWContrast | null;
  mode: SessionMode;
}

export const DEFAULT_SETTINGS: QWSettings = {
  words: ["何", "誰", "どこ", "いつ", "どうして"],
  levels: ["N5"],
  contrast: null,
  mode: "set20",
};

export interface QWPreset {
  id: string;
  label: Bi;
  hint: Bi;
  words: string[];
  levels: ("N5" | "N4")[];
  contrast: QWContrast | null;
}

export const PRESETS: QWPreset[] = [
  {
    id: "core",
    label: { en: "5W1H · Core", id: "5W1H · Inti" },
    hint: { en: "何 誰 どこ いつ どうして", id: "何 誰 どこ いつ どうして" },
    words: ["何", "誰", "どこ", "いつ", "どうして"],
    levels: ["N5"],
    contrast: null,
  },
  {
    id: "n5-all",
    label: { en: "N5 · All", id: "N5 · Semua" },
    hint: { en: "+ どちら どんな どの どれ いくつ いくら どう", id: "+ どちら どんな どの どれ いくつ いくら どう" },
    words: [...QUESTION_WORDS],
    levels: ["N5"],
    contrast: null,
  },
  {
    id: "n4",
    label: { en: "N5 + N4", id: "N5 + N4" },
    hint: { en: "all question words, N4 sentences too", id: "semua kata tanya, termasuk kalimat N4" },
    words: [...QUESTION_WORDS],
    levels: ["N5", "N4"],
    contrast: null,
  },
  {
    id: "which-family",
    label: { en: "どの・どれ・どちら", id: "どの・どれ・どちら" },
    hint: { en: "which (+noun) vs which one vs which (of two)", id: "which (+kata benda) vs which one vs which (dari dua)" },
    words: ["どの", "どれ", "どちら"],
    levels: ["N5", "N4"],
    contrast: "which-family",
  },
  {
    id: "ikutsu-ikura",
    label: { en: "いくつ vs いくら", id: "いくつ vs いくら" },
    hint: { en: "how many vs how much", id: "berapa (jumlah) vs berapa (harga)" },
    words: ["いくつ", "いくら"],
    levels: ["N5", "N4"],
    contrast: "ikutsu-ikura",
  },
  {
    id: "everything",
    label: { en: "Everything", id: "Semuanya" },
    hint: { en: "all question words · N5 + N4", id: "semua kata tanya · N5 + N4" },
    words: [...QUESTION_WORDS],
    levels: ["N5", "N4"],
    contrast: null,
  },
];

const STORAGE = "sn.qwords.settings";

export function loadSettings(): QWSettings {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(s: QWSettings) {
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

/** Question words most easily confused with each — used to pick good distractors. */
const CONFUSABLE: Record<string, string[]> = {
  "何": ["どんな", "どれ", "誰"],
  "誰": ["どちら", "何", "どんな"],
  "どこ": ["どちら", "どの", "いつ"],
  "いつ": ["どこ", "どう", "何"],
  "どうして": ["どう", "何", "どんな"],
  "どちら": ["どこ", "どの", "どれ"],
  "どんな": ["何", "どの", "どちら"],
  "どの": ["どれ", "どちら", "どんな"],
  "どれ": ["どの", "どちら", "何"],
  "いくつ": ["いくら", "どの", "何"],
  "いくら": ["いくつ", "何", "どの"],
  "どう": ["どうして", "どんな", "いつ"],
};

/**
 * The 4 (or fewer) answer buttons for one drill: the answer plus up to three
 * confusable distractors, all drawn from the active question-word set.
 */
export function optionsFor(drill: QWDrill, active: string[]): string[] {
  const answer = drill.answer;
  const set = new Set(active);
  const preferred = (CONFUSABLE[answer] ?? []).filter((w) => w !== answer && set.has(w));
  const rest = active.filter((w) => w !== answer && !preferred.includes(w));
  const distractors = [...preferred, ...shuffle(rest)].slice(0, 3);
  return shuffle([answer, ...distractors]);
}

/** Drills whose answer is inside the active question-word set. */
export function eligibleDrills(s: QWSettings): QWDrill[] {
  const set = new Set(s.words);
  return QUESTION_WORD_DRILLS.filter((d) => {
    if (!s.levels.includes(d.level)) return false;
    if (s.contrast && d.contrast !== s.contrast) return false;
    return set.has(d.answer);
  });
}

export function buildQueue(
  s: QWSettings,
  weak: Set<string> = new Set(),
): QWDrill[] {
  const pool = eligibleDrills(s);
  if (pool.length === 0) return [];

  const weighted = shuffle(
    weak.size ? [...pool, ...pool.filter((d) => weak.has(d.answer))] : pool,
  );

  const n = sessionLength(s.mode);
  if (n == null) return weighted.slice(0, Math.min(weighted.length, 120));

  const seen = new Set<string>();
  const out: QWDrill[] = [];
  for (const d of weighted) {
    if (seen.has(d.key)) continue;
    seen.add(d.key);
    out.push(d);
    if (out.length >= n) break;
  }
  while (out.length < n && weighted.length) out.push(weighted[out.length % weighted.length]);
  return out;
}

export { QUESTION_WORD_DRILLS };
export type { QWDrill, QWContrast };
