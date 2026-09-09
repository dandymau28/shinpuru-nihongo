import type { Bi } from "./i18n";
import type {
  ContentModule,
  ExerciseGroup,
  ExerciseResult,
  Question,
} from "./types";

/** A set whose result counts toward the day's overall score. */
export interface ScorableSet {
  id: string;
  total: number;
  label: Bi;
}

/** A self-graded / practice set — completion tracked, not scored. */
export interface PracticeSet {
  id: string;
  label: Bi;
  kind: "flashcards" | "streak" | "writing";
}

const gradable = (qs: Question[]) => qs.filter((q) => q.kind !== "conjugation").length;

/**
 * Percentage over answered questions, from results alone — cheap enough for list
 * views (no content module needed). Practice results (`scored === false`) are ignored.
 */
export function quickPct(results: ExerciseResult[]): number | null {
  let correct = 0;
  let answered = 0;
  for (const r of results) {
    if (r.scored === false) continue;
    correct += r.correct;
    answered += r.total;
  }
  return answered > 0 ? Math.round((correct / answered) * 100) : null;
}

function groupsToSets(groups: ExerciseGroup[]): ScorableSet[] {
  return groups
    .filter((g) => g.mode !== "streak")
    .map((g) => ({ id: g.id, total: gradable(g.questions), label: g.title }))
    .filter((s) => s.total > 0);
}

/** Every scorable set contributed by a day's content module. */
export function scorableSets(module: ContentModule | undefined): ScorableSet[] {
  if (!module) return [];
  switch (module.type) {
    case "lesson":
      return groupsToSets(module.exercises);
    case "skill":
      return groupsToSets(module.exercises ?? []);
    case "test":
      return groupsToSets(module.groups);
    case "deck":
      return groupsToSets(module.quiz ?? []);
    case "reading":
      return module.items.map((it) => ({
        id: `${module.slug}:${it.id}`,
        total: it.questions.length,
        label: it.title,
      }));
    case "listening":
      return module.clips.map((c) => ({
        id: `${module.slug}:${c.id}`,
        total: c.questions.length,
        label: c.title,
      }));
    default:
      return [];
  }
}

/** Practice sets (flashcard decks, conjugation streaks, writing). */
export function practiceSets(module: ContentModule | undefined): PracticeSet[] {
  if (!module) return [];
  const out: PracticeSet[] = [];
  if (module.type === "lesson" || module.type === "test") {
    for (const g of module.type === "lesson" ? module.exercises : module.groups) {
      if (g.mode === "streak") out.push({ id: g.id, label: g.title, kind: "streak" });
    }
  }
  if (module.type === "deck") {
    for (const d of module.decks) {
      out.push({ id: `${module.slug}:${d.id}`, label: d.label, kind: "flashcards" });
    }
    for (const g of module.quiz ?? []) {
      if (g.mode === "streak") out.push({ id: g.id, label: g.title, kind: "streak" });
    }
  }
  if (module.type === "skill") {
    for (const g of module.exercises ?? []) {
      if (g.mode === "streak") out.push({ id: g.id, label: g.title, kind: "streak" });
    }
    if (module.writing) {
      out.push({ id: `${module.slug}:writing`, label: module.writing.prompt, kind: "writing" });
    }
  }
  return out;
}

export interface SetOutcome extends ScorableSet {
  result: ExerciseResult | null;
}

export interface DayScore {
  perSet: SetOutcome[];
  practice: (PracticeSet & { result: ExerciseResult | null })[];
  /** graded sets finished */
  setsDone: number;
  totalSets: number;
  /** every graded set plus every practice set has a result */
  allComplete: boolean;
  correct: number;
  answered: number;
  /** total questions across all graded sets, whether attempted or not */
  totalQuestions: number;
  /** 0–100 over answered questions, or null if nothing graded yet */
  pct: number | null;
  bestStreak: number | null;
}

export function computeDayScore(
  module: ContentModule | undefined,
  results: ExerciseResult[],
): DayScore {
  const sets = scorableSets(module);
  const practice = practiceSets(module);
  const byId = new Map(results.map((r) => [r.setId, r]));

  let correct = 0;
  let answered = 0;
  let setsDone = 0;
  const perSet: SetOutcome[] = sets.map((s) => {
    const result = byId.get(s.id) ?? null;
    if (result) {
      correct += result.correct;
      answered += result.total;
      setsDone += 1;
    }
    return { ...s, result };
  });

  const practiceOut = practice.map((p) => ({ ...p, result: byId.get(p.id) ?? null }));
  const streakResults = practiceOut
    .filter((p) => p.kind === "streak" && p.result)
    .map((p) => p.result!.correct);

  const allComplete =
    sets.length + practice.length > 0 &&
    perSet.every((s) => s.result) &&
    practiceOut.every((p) => p.result);

  return {
    perSet,
    practice: practiceOut,
    setsDone,
    totalSets: sets.length,
    allComplete,
    correct,
    answered,
    totalQuestions: sets.reduce((a, s) => a + s.total, 0),
    pct: answered > 0 ? Math.round((correct / answered) * 100) : null,
    bestStreak: streakResults.length ? Math.max(...streakResults) : null,
  };
}
