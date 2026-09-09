# Shinpuru Nihongo · シンプル日本語

A self-contained JLPT **N5 → N4** study site built from a 90-day daily study planner.
Each day of the plan has its lesson, drills, reading, listening, or mock test **built into
the site** — no jumping between a dozen external resources.

- **90-day planner** (Sep 2 → Nov 30) with an N5 refresher → N4 grammar core → exam sprint.
- **Interactive exercises**: multiple choice, fill-in-the-blank, sentence building, timed
  conjugation streaks, flashcard decks, reading comprehension, and listening (browser
  speech synthesis, or embedded video where the source is a YouTube clip).
- **Automatic day score** — every graded exercise on a day rolls into one live percentage
  (shown as a sticky counter while you work, and in the planner list). A day flips to
  "done" once all its exercises are finished. Status, a "reviewed" flag, and free-text
  notes are also tracked per day.
- **Conjugation Trainer** (`/practice/conjugation`) — a standalone drill for every N5–N4
  verb and adjective form: ~20 forms (predicate matrix, て-family, potential, passive,
  causative, causative-passive, imperative, conditionals, adverbial), a curated word bank,
  rōmaji auto-conversion for learners without an IME, endless or fixed-set sessions, and
  persistent weak-spot tracking.
- **No accounts, no backend.** One learner per browser: everything is stored in
  `localStorage`, with JSON export / import for backup or moving devices.
- **Bilingual** (English / Bahasa Indonesia) explanations and UI, plus furigana and romaji
  toggles.

## Requirements

- **Node.js 20+** (see `.nvmrc`). Next.js 15 does not run on Node 18.17.

## Getting started

```bash
nvm use            # or: nvm use 20
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (also full type-check + lint)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## Deployment

`next.config.ts` sets `output: "export"`, so `npm run build` emits a fully static `out/`
folder — no server runtime. Serve it with any static host (nginx, Caddy, GitHub Pages,
Netlify) or deploy to Vercel.

See [`docs/deploy.md`](docs/deploy.md) for a step-by-step VPS setup (nginx + Certbot +
a custom subdomain).

## How it fits together

```
src/
  app/                     Routes (App Router)
    page.tsx               Dashboard
    planner/               90-day timeline + filters
    day/[day]/             One day: task, links, embedded lesson/exercises, progress
    lesson/[slug]/         Standalone lesson view
    practice/              Practice hub + practice/conjugation (the trainer)
    settings/  about/
  data/
    planner.ts             All 90 days (title, task, type, phase, links, youtube)
    words.ts               Verb + adjective word bank (N5/N4) for the trainer
    verbs-n5.ts            N5 verb subset + in-lesson conjugation-drill generator
  content/
    lessons/  skills/  decks/  reading/  listening/  tests/
    registry.ts            Maps a day's `lessonSlug` → its content module
  components/
    lesson/                Renderers: LessonView, TestRunner, ReadingRunner,
                           ListeningRunner, DeckRunner, SkillView, ContentRenderer
    exercises/             ExerciseSet + question types
    practice/              ConjugationTrainer + settings / stats panels
    planner/  dashboard/  layout/  ui/
  context/
    SettingsContext.tsx    lang / theme / furigana / romaji / start date
    ProgressContext.tsx    per-day progress (status / reviewed / notes / results), localStorage
  lib/
    types.ts  i18n.ts  strings.ts  labels.ts  dates.ts  dayScore.ts
    furigana.tsx           `漢字[かんじ]` → <ruby>
    conjugation.ts         verb + adjective conjugation engine + form catalog
    conjPractice.ts        trainer session logic + persistent weak-spot stats
    romaji.ts              rōmaji → hiragana (IME-free input)
    answers.ts  tts.ts  useCurrentDay.ts
```

## Content status

Days **1–14** are fully authored (lessons + exercises + decks + reading + listening +
tests). Days 15+ currently show their original reference links and a "coming soon" panel;
their native content is added in batches. See [`docs/authoring.md`](docs/authoring.md) for
how to add a day.

## A note on the content

Explanations, example sentences, passages, and exercise items are written for this site.
They cover the same grammar points as the resources the planner references (Tofugu, Bunpro,
MLC, LTL, Genki notes, and others) but are **not** copied from them. The external links are
kept so you can compare explanations.
