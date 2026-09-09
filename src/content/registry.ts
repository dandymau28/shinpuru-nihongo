import type { ContentModule } from "@/lib/types";

import { particles } from "./lessons/particles";
import { verbForms } from "./lessons/verb-forms";
import { adjectives } from "./lessons/adjectives";
import { teForm } from "./lessons/te-form";
import { location } from "./lessons/location";
import { plainForm1 } from "./lessons/plain-form-1";
import { plainForm2 } from "./lessons/plain-form-2";
import { timeRoutine } from "./skills/time-routine";
import { n5VocabKanji } from "./decks/n5-vocab-kanji";
import { n5Reading1 } from "./reading/n5-reading-1";
import { n5Listening1 } from "./listening/n5-listening-1";
import { n5Diagnostic } from "./tests/n5-diagnostic";
import { n5Integration } from "./tests/n5-integration";
import { n5Exit } from "./tests/n5-exit";

const MODULES: ContentModule[] = [
  particles,
  verbForms,
  adjectives,
  teForm,
  location,
  plainForm1,
  plainForm2,
  timeRoutine,
  n5VocabKanji,
  n5Reading1,
  n5Listening1,
  n5Diagnostic,
  n5Integration,
  n5Exit,
];

const BY_SLUG = new Map<string, ContentModule>(MODULES.map((m) => [m.slug, m]));

export function getContent(slug?: string): ContentModule | undefined {
  return slug ? BY_SLUG.get(slug) : undefined;
}

export function hasContent(slug?: string): boolean {
  return !!slug && BY_SLUG.has(slug);
}

export const AUTHORED_SLUGS = new Set(BY_SLUG.keys());
