import type { ConjugationItem, ExerciseGroup } from "@/lib/types";
import type { FormId, VerbEntry, VerbGroup } from "@/lib/conjugation";
import { conjugateKana, FORM_LABEL } from "@/lib/conjugation";
import { WORDS } from "./words";

function toGroup(cls: string): VerbGroup | null {
  if (cls === "godan" || cls === "iku") return "godan";
  if (cls === "ichidan") return "ichidan";
  if (cls === "suru" || cls === "kuru") return "irregular";
  return null;
}

/** N5 verbs, derived from the shared word bank, for the in-lesson drills. */
export const VERBS_N5: VerbEntry[] = WORDS.filter((w) => w.jlpt === "N5")
  .map((w) => {
    const group = toGroup(w.cls);
    return group ? { dict: w.dict, kana: w.kana, group, meaning: w.meaning } : null;
  })
  .filter((v): v is VerbEntry => v !== null);

/**
 * Build a streak-mode conjugation exercise group from the verb list.
 * `forms` picks which target forms appear.
 */
export function conjugationGroup(
  id: string,
  title: { en: string; id: string },
  forms: FormId[],
  verbs: VerbEntry[] = VERBS_N5,
): ExerciseGroup {
  const questions: ConjugationItem[] = [];
  for (const v of verbs) {
    for (const f of forms) {
      questions.push({
        kind: "conjugation",
        dict: v.dict,
        target: FORM_LABEL[f],
        accept: [conjugateKana(v, f)],
        meaning: v.meaning,
      });
    }
  }
  return { id, title, mode: "streak", questions };
}
