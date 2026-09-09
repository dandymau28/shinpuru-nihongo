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
  mode: "endless",
  input: "romaji",
  showMeaning: "always",
  showReading: "after",
};

export const PRESETS: { id: string; label: Bi; forms: string[] }[] = [
  {
    id: "n5-core",
    label: { en: "N5 essentials", id: "Dasar N5" },
    forms: ["polite-nonpast", "plain-nonpast-neg", "plain-past", "te"],
  },
  {
    id: "n5-full",
    label: { en: "All N5 forms", id: "Semua bentuk N5" },
    forms: N5_FORMS,
  },
  {
    id: "predicate",
    label: { en: "Full predicate matrix", id: "Matriks predikat lengkap" },
    forms: CONJ_FORMS.filter((f) => f.category === "predicate").map((f) => f.id),
  },
  {
    id: "n4-advanced",
    label: { en: "N4 advanced (passive, causative…)", id: "Lanjutan N4 (pasif, kausatif…)" },
    forms: ["potential", "passive", "causative", "causative-passive", "volitional", "imperative", "ba", "tara"],
  },
  {
    id: "everything",
    label: { en: "Everything", id: "Semuanya" },
    forms: ALL_FORMS,
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
}

const EMPTY_STATS: ConjStats = { bestStreak: 0, totalSeen: 0, totalCorrect: 0, byForm: {} };
const STORAGE_STATS = "sn.conj.stats";

export function useConjStats() {
  const [stats, setStats] = useState<ConjStats>(EMPTY_STATS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_STATS);
      if (raw) setStats({ ...EMPTY_STATS, ...JSON.parse(raw) });
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

  return { stats, hydrated, record, reset, weakForms, ranked };
}

export { CONJ_FORMS, wordKind, ALL_CLASSES };
export type { WordClass, WordKind };
