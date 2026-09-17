"use client";

import type { Bi } from "./i18n";
import { KANA_TABLE, type KanaEntry, type KanaRow } from "@/data/kana";

export type SessionMode = "endless" | "set10" | "set20" | "set40";
export type KanaMode = "kana-to-romaji" | "romaji-to-kana";
export type Script = "hiragana" | "katakana";

export interface KanaSettings {
  scripts: Script[];
  rows: KanaRow[];
  mode: KanaMode;
  session: SessionMode;
}

export const DEFAULT_SETTINGS: KanaSettings = {
  scripts: ["hiragana"],
  rows: ["base"],
  mode: "kana-to-romaji",
  session: "set20",
};

export const MODE_LABEL: Record<KanaMode, Bi> = {
  "kana-to-romaji": { en: "Kana → romaji", id: "Kana → romaji" },
  "romaji-to-kana": { en: "Romaji → kana", id: "Romaji → kana" },
};

export const MODE_HINT: Record<KanaMode, Bi> = {
  "kana-to-romaji": { en: "see the character, type its sound", id: "lihat karakternya, ketik bunyinya" },
  "romaji-to-kana": { en: "see the sound, type the character", id: "lihat bunyinya, ketik karakternya" },
};

export interface KanaPreset {
  id: string;
  label: Bi;
  hint: Bi;
  scripts: Script[];
  rows: KanaRow[];
}

export const PRESETS: KanaPreset[] = [
  {
    id: "hira-base",
    label: { en: "Hiragana · Basic 46", id: "Hiragana · 46 Dasar" },
    hint: { en: "あ〜ん, no dakuten", id: "あ〜ん, tanpa dakuten" },
    scripts: ["hiragana"],
    rows: ["base"],
  },
  {
    id: "hira-all",
    label: { en: "Hiragana · Everything", id: "Hiragana · Semua" },
    hint: { en: "+ dakuten, handakuten, yōon", id: "+ dakuten, handakuten, yōon" },
    scripts: ["hiragana"],
    rows: ["base", "dakuten", "youon"],
  },
  {
    id: "kata-base",
    label: { en: "Katakana · Basic 46", id: "Katakana · 46 Dasar" },
    hint: { en: "ア〜ン, no dakuten", id: "ア〜ン, tanpa dakuten" },
    scripts: ["katakana"],
    rows: ["base"],
  },
  {
    id: "kata-all",
    label: { en: "Katakana · Everything", id: "Katakana · Semua" },
    hint: { en: "+ dakuten, handakuten, yōon", id: "+ dakuten, handakuten, yōon" },
    scripts: ["katakana"],
    rows: ["base", "dakuten", "youon"],
  },
  {
    id: "both-base",
    label: { en: "Both scripts · Basic", id: "Kedua aksara · Dasar" },
    hint: { en: "hiragana + katakana, 46 each", id: "hiragana + katakana, 46 masing-masing" },
    scripts: ["hiragana", "katakana"],
    rows: ["base"],
  },
  {
    id: "everything",
    label: { en: "Everything", id: "Semuanya" },
    hint: { en: "both scripts, full syllabary", id: "kedua aksara, silabel lengkap" },
    scripts: ["hiragana", "katakana"],
    rows: ["base", "dakuten", "youon"],
  },
];

const STORAGE = "sn.kana.settings";

export function loadSettings(): KanaSettings {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(s: KanaSettings) {
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

export interface KanaItem {
  /** `${script}-${entry.key}` — unique per (script, kana), used for stats. */
  key: string;
  script: Script;
  entry: KanaEntry;
}

/** The character shown/expected for this item, in its own script. */
export function glyphOf(item: KanaItem): string {
  return item.script === "hiragana" ? item.entry.hira : item.entry.kata;
}

export function eligibleEntries(s: KanaSettings): KanaEntry[] {
  return KANA_TABLE.filter((e) => s.rows.includes(e.row));
}

function allItems(s: KanaSettings): KanaItem[] {
  const entries = eligibleEntries(s);
  const items: KanaItem[] = [];
  for (const script of s.scripts) {
    for (const entry of entries) items.push({ key: `${script}-${entry.key}`, script, entry });
  }
  return items;
}

export function buildQueue(s: KanaSettings, weak: Set<string> = new Set()): KanaItem[] {
  const pool = allItems(s);
  if (pool.length === 0) return [];

  const weighted = shuffle(weak.size ? [...pool, ...pool.filter((i) => weak.has(i.key))] : pool);

  const n = sessionLength(s.session);
  if (n == null) return weighted.slice(0, Math.min(weighted.length, 120));

  const seen = new Set<string>();
  const out: KanaItem[] = [];
  for (const item of weighted) {
    if (seen.has(item.key)) continue;
    seen.add(item.key);
    out.push(item);
    if (out.length >= n) break;
  }
  while (out.length < n && weighted.length) out.push(weighted[out.length % weighted.length]);
  return out;
}

/** Hiragana → katakana (parallel Unicode blocks, fixed +0x60 offset). */
export function hiraToKata(s: string): string {
  return s.replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));
}

export { KANA_TABLE };
export type { KanaEntry, KanaRow };
