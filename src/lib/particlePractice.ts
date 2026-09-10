"use client";

import type { Bi } from "./i18n";
import { PARTICLE_DRILLS, type Contrast, type ParticleDrill } from "@/data/particle-drills";

export type SessionMode = "endless" | "set10" | "set20" | "set40";

export const PARTICLES = [
  "は", "が", "を", "に", "で", "へ", "と", "も", "の", "か", "から", "まで",
] as const;
export type Particle = (typeof PARTICLES)[number];

export interface ParticleSettings {
  particles: string[];
  levels: ("N5" | "N4")[];
  contrast: Contrast | null;
  mode: SessionMode;
}

export const DEFAULT_SETTINGS: ParticleSettings = {
  particles: ["は", "が", "を", "に", "で", "へ"],
  levels: ["N5"],
  contrast: null,
  mode: "set20",
};

export interface ParticlePreset {
  id: string;
  label: Bi;
  hint: Bi;
  particles: string[];
  levels: ("N5" | "N4")[];
  contrast: Contrast | null;
}

export const PRESETS: ParticlePreset[] = [
  {
    id: "n5-core",
    label: { en: "N5 · Core", id: "N5 · Inti" },
    hint: { en: "は が を に で へ", id: "は が を に で へ" },
    particles: ["は", "が", "を", "に", "で", "へ"],
    levels: ["N5"],
    contrast: null,
  },
  {
    id: "n5-all",
    label: { en: "N5 · All", id: "N5 · Semua" },
    hint: { en: "+ と も の か", id: "+ と も の か" },
    particles: ["は", "が", "を", "に", "で", "へ", "と", "も", "の", "か"],
    levels: ["N5"],
    contrast: null,
  },
  {
    id: "n4",
    label: { en: "N5 + N4", id: "N5 + N4" },
    hint: { en: "+ から まで, N4 sentences", id: "+ から まで, kalimat N4" },
    particles: [...PARTICLES],
    levels: ["N5", "N4"],
    contrast: null,
  },
  {
    id: "wa-ga",
    label: { en: "は vs が", id: "は vs が" },
    hint: { en: "topic vs subject", id: "topik vs subjek" },
    particles: ["は", "が"],
    levels: ["N5", "N4"],
    contrast: "wa-ga",
  },
  {
    id: "ni-de",
    label: { en: "に vs で", id: "に vs で" },
    hint: { en: "existence vs action", id: "keberadaan vs aksi" },
    particles: ["に", "で"],
    levels: ["N5", "N4"],
    contrast: "ni-de",
  },
  {
    id: "wo-ga",
    label: { en: "を vs が", id: "を vs が" },
    hint: { en: "object vs 好き / できる / わかる", id: "objek vs 好き / できる / わかる" },
    particles: ["を", "が"],
    levels: ["N5", "N4"],
    contrast: "wo-ga",
  },
  {
    id: "everything",
    label: { en: "Everything", id: "Semuanya" },
    hint: { en: "all particles · N5 + N4", id: "semua partikel · N5 + N4" },
    particles: [...PARTICLES],
    levels: ["N5", "N4"],
    contrast: null,
  },
];

const STORAGE = "sn.particles.settings";

export function loadSettings(): ParticleSettings {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(s: ParticleSettings) {
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

/** Particles most easily confused with each — used to pick good distractors. */
const CONFUSABLE: Record<string, string[]> = {
  は: ["が", "も", "を"],
  が: ["は", "を", "の"],
  を: ["が", "に", "は"],
  に: ["で", "へ", "を"],
  で: ["に", "を", "へ"],
  へ: ["に", "で", "を"],
  と: ["も", "に", "か"],
  も: ["は", "が", "と"],
  の: ["が", "を", "に"],
  か: ["と", "の", "も"],
  から: ["まで", "に", "で"],
  まで: ["から", "に", "へ"],
};

/**
 * The 4 (or fewer) answer buttons for one drill: the answer plus up to three
 * confusable distractors, all drawn from the active particle set.
 */
export function optionsFor(drill: ParticleDrill, active: string[]): string[] {
  const answer = drill.answer;
  const set = new Set(active);
  const preferred = (CONFUSABLE[answer] ?? []).filter((p) => p !== answer && set.has(p));
  const rest = active.filter((p) => p !== answer && !preferred.includes(p));
  const distractors = [...preferred, ...shuffle(rest)].slice(0, 3);
  return shuffle([answer, ...distractors]);
}

/** Drills whose answer(s) are all inside the active particle set. */
export function eligibleDrills(s: ParticleSettings): ParticleDrill[] {
  const set = new Set(s.particles);
  return PARTICLE_DRILLS.filter((d) => {
    if (!s.levels.includes(d.level)) return false;
    if (s.contrast && d.contrast !== s.contrast) return false;
    const answers = [d.answer, ...(d.accept ?? [])];
    return answers.every((a) => set.has(a));
  });
}

export function buildQueue(
  s: ParticleSettings,
  weak: Set<string> = new Set(),
): ParticleDrill[] {
  const pool = eligibleDrills(s);
  if (pool.length === 0) return [];

  const weighted = shuffle(
    weak.size ? [...pool, ...pool.filter((d) => weak.has(d.answer))] : pool,
  );

  const n = sessionLength(s.mode);
  if (n == null) return weighted.slice(0, Math.min(weighted.length, 120));

  const seen = new Set<string>();
  const out: ParticleDrill[] = [];
  for (const d of weighted) {
    if (seen.has(d.key)) continue;
    seen.add(d.key);
    out.push(d);
    if (out.length >= n) break;
  }
  while (out.length < n && weighted.length) out.push(weighted[out.length % weighted.length]);
  return out;
}

export { PARTICLE_DRILLS };
export type { ParticleDrill, Contrast };
