"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Bi } from "./i18n";
import type { ConjResult, Word, WordClass, WordKind } from "./conjugation";
import { CONJ_FORMS, FORM_BY_ID, conjugate, wordKind } from "./conjugation";
import { WORDS } from "@/data/words";

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export type InputMode = "kana" | "romaji";
export type SessionMode = "endless" | "set10" | "set20" | "set40";

export interface PracticeSettings {
  jlpt: ("N5" | "N4")[];
  classes: WordClass[];
  forms: string[];
  mode: SessionMode;
  input: InputMode;
  showMeaning: "always" | "after";
  showReading: "always" | "after";
}

const ALL_CLASSES: WordClass[] = [
  "godan", "ichidan", "suru", "kuru", "iku", "i-adj", "ii-adj", "na-adj",
];

export const N5_FORMS = CONJ_FORMS.filter((f) => f.tier === "N5").map((f) => f.id);
export const ALL_FORMS = CONJ_FORMS.map((f) => f.id);

export const DEFAULT_SETTINGS: PracticeSettings = {
  jlpt: ["N5"],
  classes: ["godan", "ichidan", "suru", "kuru", "iku", "i-adj", "ii-adj", "na-adj"],
  forms: ["polite-nonpast", "plain-nonpast-neg", "plain-past", "te"],
  mode: "set20",
  input: "romaji",
  showMeaning: "always",
  showReading: "after",
};

export interface Preset {
  id: string;
  label: Bi;
  hint: Bi;
  forms: string[];
  jlpt: ("N5" | "N4")[];
}

export const PRESETS: Preset[] = [
  {
    id: "n5-verbs",
    label: { en: "N5 · Verb basics", id: "N5 · Dasar verba" },
    hint: { en: "ます · ない · た · て", id: "ます · ない · た · て" },
    forms: ["polite-nonpast", "plain-nonpast-neg", "plain-past", "te"],
    jlpt: ["N5"],
  },
  {
    id: "n5-adjectives",
    label: { en: "N5 · Adjectives", id: "N5 · Kata sifat" },
    hint: { en: "〜くない · かった · くて · く / に", id: "〜くない · かった · くて · く / に" },
    forms: ["adj-neg", "adj-past", "adj-past-neg", "adj-te", "adj-adverb"],
    jlpt: ["N5"],
  },
  {
    id: "n5-all",
    label: { en: "N5 · Everything", id: "N5 · Semua" },
    hint: { en: "every N5 verb + adjective form", id: "semua bentuk verba + kata sifat N5" },
    forms: N5_FORMS,
    jlpt: ["N5"],
  },
  {
    id: "n4-intent",
    label: { en: "N4 · Volitional & conditionals", id: "N4 · Ajakan & pengandaian" },
    hint: { en: "〜よう · 〜られる · 〜ば · 〜たら", id: "〜よう · 〜られる · 〜ば · 〜たら" },
    forms: ["volitional", "volitional-polite", "potential", "ba", "tara"],
    jlpt: ["N5", "N4"],
  },
  {
    id: "n4-passive",
    label: { en: "N4 · Passive & causative", id: "N4 · Pasif & kausatif" },
    hint: { en: "〜れる · 〜せる · 〜せられる · 〜ろ", id: "〜れる · 〜せる · 〜せられる · 〜ろ" },
    forms: ["passive", "causative", "causative-passive", "imperative", "prohibitive"],
    jlpt: ["N5", "N4"],
  },
  {
    id: "everything",
    label: { en: "Everything", id: "Semuanya" },
    hint: { en: "all forms · N5 + N4 words", id: "semua bentuk · kata N5 + N4" },
    forms: ALL_FORMS,
    jlpt: ["N5", "N4"],
  },
];

const STORAGE_SETTINGS = "sn.conj.settings";

export function loadSettings(): PracticeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_SETTINGS);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(s: PracticeSettings) {
  try {
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------------------
// Queue
// ---------------------------------------------------------------------------

export interface PracticeItem {
  word: Word;
  formId: string;
  answer: ConjResult;
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function eligiblePairs(settings: PracticeSettings): PracticeItem[] {
  const words = WORDS.filter(
    (w) => settings.jlpt.includes(w.jlpt) && settings.classes.includes(w.cls),
  );
  const forms = settings.forms
    .map((id) => FORM_BY_ID.get(id))
    .filter((f): f is NonNullable<typeof f> => !!f);

  const items: PracticeItem[] = [];
  for (const word of words) {
    const kind = wordKind(word.cls);
    for (const form of forms) {
      if (!form.applies.includes(kind)) continue;
      const answer = conjugate(word, form.id);
      if (answer) items.push({ word, formId: form.id, answer });
    }
  }
  return items;
}

export function sessionLength(mode: SessionMode): number | null {
  return mode === "endless" ? null : Number(mode.replace("set", ""));
}

/** Build a fresh queue. Endless returns a long shuffled stream that the caller
 *  cycles; fixed modes return exactly N. `weightForms` biases toward weak forms. */
export function buildQueue(
  settings: PracticeSettings,
  weakForms: Set<string> = new Set(),
): PracticeItem[] {
  const pool = eligiblePairs(settings);
  if (pool.length === 0) return [];

  const weighted = shuffle(
    weakForms.size
      ? [...pool, ...pool.filter((p) => weakForms.has(p.formId))]
      : pool,
  );

  const n = sessionLength(settings.mode);
  if (n == null) return weighted.slice(0, Math.min(weighted.length, 120));

  // fixed set: unique-ish sample of n
  const seen = new Set<string>();
  const out: PracticeItem[] = [];
  for (const item of weighted) {
    const key = `${item.word.kana}:${item.formId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= n) break;
  }
  while (out.length < n && weighted.length) out.push(weighted[out.length % weighted.length]);
  return out;
}

// ---------------------------------------------------------------------------
// Persistent stats (weak-spot tracking)
// ---------------------------------------------------------------------------

export interface FormStat {
  seen: number;
  correct: number;
}
export interface ConjStats {
  bestStreak: number;
  totalSeen: number;
  totalCorrect: number;
  byForm: Record<string, FormStat>;
  /** Streak milestones the learner has already celebrated (once ever). */
  celebrated: number[];
}

export { STREAK_MILESTONES } from "./practiceStats";

const EMPTY_STATS: ConjStats = {
  bestStreak: 0,
  totalSeen: 0,
  totalCorrect: 0,
  byForm: {},
  celebrated: [],
};
const STORAGE_STATS = "sn.conj.stats";

export function useConjStats() {
  const [stats, setStats] = useState<ConjStats>(EMPTY_STATS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_STATS);
      if (raw) {
        const parsed = JSON.parse(raw);
        setStats({
          ...EMPTY_STATS,
          ...parsed,
          celebrated: Array.isArray(parsed.celebrated) ? parsed.celebrated : [],
        });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_STATS, JSON.stringify(stats));
    } catch {
      /* ignore */
    }
  }, [stats, hydrated]);

  const record = useCallback((formId: string, correct: boolean, streak: number) => {
    setStats((s) => {
      const cur = s.byForm[formId] ?? { seen: 0, correct: 0 };
      return {
        ...s,
        bestStreak: Math.max(s.bestStreak, streak),
        totalSeen: s.totalSeen + 1,
        totalCorrect: s.totalCorrect + (correct ? 1 : 0),
        byForm: {
          ...s.byForm,
          [formId]: { seen: cur.seen + 1, correct: cur.correct + (correct ? 1 : 0) },
        },
      };
    });
  }, []);

  /** Record that a streak milestone was celebrated (persists across sessions). */
  const markCelebrated = useCallback((milestone: number) => {
    setStats((s) =>
      s.celebrated.includes(milestone)
        ? s
        : { ...s, celebrated: [...s.celebrated, milestone] },
    );
  }, []);

  const reset = useCallback(() => setStats(EMPTY_STATS), []);

  const weakForms = useMemo(() => {
    const out = new Set<string>();
    for (const [id, st] of Object.entries(stats.byForm)) {
      if (st.seen >= 4 && st.correct / st.seen < 0.7) out.add(id);
    }
    return out;
  }, [stats]);

  const ranked = useMemo(
    () =>
      Object.entries(stats.byForm)
        .filter(([, st]) => st.seen >= 3)
        .map(([id, st]) => ({
          id,
          form: FORM_BY_ID.get(id),
          seen: st.seen,
          correct: st.correct,
          pct: Math.round((st.correct / st.seen) * 100),
        }))
        .sort((a, b) => a.pct - b.pct),
    [stats],
  );

  return { stats, hydrated, record, markCelebrated, reset, weakForms, ranked };
}

export { CONJ_FORMS, wordKind, ALL_CLASSES };
export type { WordClass, WordKind };
