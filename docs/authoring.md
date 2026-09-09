# Authoring a day

Every planner day optionally points at a **content module** via its `lessonSlug`
(`src/data/planner.ts`). Modules live under `src/content/**` and are wired up in
`src/content/registry.ts`. A day with no module (or an unknown slug) renders its external
links plus a "coming soon" panel — so adding content is purely additive.

## Steps

1. **Pick / confirm the slug** on the day in `src/data/planner.ts` (`lessonSlug: "…"`).
2. **Create the module file** under the folder for its kind:
   `content/lessons`, `content/skills`, `content/decks`, `content/reading`,
   `content/listening`, or `content/tests`.
3. **Register it** — import and add to the `MODULES` array in `content/registry.ts`.
4. `npm run typecheck` and open `/day/<n>`.

All types are in `src/lib/types.ts`. All prose is bilingual: `{ en, id }`.

## Module shapes

| Kind | Type | Renderer | Use for |
|------|------|----------|---------|
| `lesson` | `Lesson` | `LessonView` | grammar points: sections + exercises |
| `skill` | `SkillModule` | `SkillView` | strategy days, writing practice |
| `deck` | `DeckModule` | `DeckRunner` | vocab / kanji flashcards + quiz |
| `reading` | `ReadingSet` | `ReadingRunner` | passages + comprehension MCQs |
| `listening` | `ListeningSet` | `ListeningRunner` | TTS scripts or embedded YouTube + MCQs |
| `test` | `TestModule` | `TestRunner` | mock tests, weekly reviews (groups + `passMark`) |

Each exported const is `{ type: "lesson", slug: "...", ... }` etc.

## Lesson sections

`sections: LessonSection[]` — one of:

- `{ kind: "prose", heading?, body }`
- `{ kind: "note", tone: "tip" | "warning", body }`
- `{ kind: "table", heading?, columns: Bi[], rows: [{ cells: (string|Bi)[], ja?: boolean }] }`
- `{ kind: "examples", heading?, items: Sentence[] }`

`Sentence` = `{ ja, romaji?, en, id, note? }`.

## Furigana notation

Write readings inline as `漢字[かんじ]`. The reading attaches to the run of kanji directly
before the bracket: `私[わたし]は 学生[がくせい]です`. Use it everywhere Japanese appears
(sentences, table cells marked `ja: true`, cloze prompts, drill dictionary forms).

## Exercises

`exercises: ExerciseGroup[]` on a lesson (or `quiz` on a deck, `groups` on a test).

```ts
{
  id: "slug:something",        // unique; also the progress key
  title: { en, id },
  instructions?: { en, id },
  speak?: true,                // prompt the learner to say answers aloud
  mode?: "list" | "streak",    // streak = timed conjugation drill
  questions: Question[],
}
```

Question kinds:

- **`mcq`** — `{ kind:"mcq", prompt, ja?, options:(string|Bi)[], answer:number, explain? }`
- **`cloze`** — `{ kind:"cloze", ja:"… ___ …", accept:string[], en, id, hint?, explain? }`
  (`accept` is matched loosely: katakana→hiragana, spaces/punctuation stripped)
- **`build`** — `{ kind:"build", tiles:string[], en, id, distractors?, explain? }`
- **`conjugation`** — `{ kind:"conjugation", dict, target, accept:string[], meaning? }`
  (only inside a `mode:"streak"` group)

### Conjugation drills from the verb deck

Instead of hand-writing `conjugation` items, generate them:

```ts
import { conjugationGroup } from "@/data/verbs-n5";

conjugationGroup(
  "my-slug:drill",
  { en: "て-form streak", id: "Runtun bentuk て" },
  ["te", "nai", "ta"],   // FormId[]
)
```

## The conjugation trainer

`/practice/conjugation` is a standalone tool, not part of any day. To extend it:

- **Add words:** `src/data/words.ts` — `w(dict, kana, kanji, romaji, cls, en, id, jlpt)`.
  `cls` is one of `godan | ichidan | suru | kuru | iku | i-adj | ii-adj | na-adj`.
- **Add / change forms:** the catalog is `CONJ_FORMS` in `src/lib/conjugation.ts`; the
  transform lives in `verbTransform` / `adjTransform` in the same file. `conjugate(word,
  formId)` returns `{ kana, kanji, accept[], note? }`.
- Deep-link a lesson to a preset: `/practice/conjugation?forms=te,plain-past`.

## Listening

`ListeningClip`:

```ts
{
  id, title,
  script: [{ speaker?: "店員", ja: "いらっしゃいませ" }, …],  // read by TTS in order
  youtube: "VIDEO_ID",   // optional — if set, embeds the video instead of using TTS
  questions: McqQuestion[],
}
```

## Tests

`TestModule.groups` are just `ExerciseGroup[]`; set `passMark` (percent) to show a
pass/fail line once every group is finished. `TestRunner` sums results across the groups
using each group's `id` in the day's progress record.

## The day score

`src/lib/dayScore.ts` rolls every graded set on a day into one live percentage
(`DayScoreBar` on the day page, the breakdown in `ProgressControls`, the `%` in the
planner list). A set counts toward the score when its questions are objectively graded —
MCQ / cloze / build. **Excluded** (tracked as "practice", not scored): `mode: "streak"`
conjugation drills, flashcard decks, and writing prompts.

For this to work, the `id` you give an `ExerciseGroup` must be stable, and reading /
listening sets are keyed `"<slug>:<itemId>"` / `"<slug>:<clipId>"` automatically. When
every graded **and** practice set on a day has a result, the day flips to "done".

There is no pre-seeding of progress — every learner starts from zero.
