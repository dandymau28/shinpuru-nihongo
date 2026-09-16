import type { MaterialSummary } from "@/lib/types";

import { particlesSummary } from "./summaries/particles";
import { verbFormsSummary } from "./summaries/verb-forms";
import { adjectivesSummary } from "./summaries/adjectives";
import { teFormSummary } from "./summaries/te-form";
import { locationSummary } from "./summaries/location";
import { plainForm1Summary } from "./summaries/plain-form-1";
import { plainForm2Summary } from "./summaries/plain-form-2";
import { timeRoutineSummary } from "./summaries/time-routine";

export const SUMMARIES: MaterialSummary[] = [
  particlesSummary,
  verbFormsSummary,
  adjectivesSummary,
  teFormSummary,
  locationSummary,
  plainForm1Summary,
  plainForm2Summary,
  timeRoutineSummary,
];

const BY_SLUG = new Map<string, MaterialSummary>(SUMMARIES.map((s) => [s.slug, s]));

export function getSummary(slug?: string): MaterialSummary | undefined {
  return slug ? BY_SLUG.get(slug) : undefined;
}

export function hasSummary(slug?: string): boolean {
  return !!slug && BY_SLUG.has(slug);
}

export const SUMMARY_SLUGS = new Set(BY_SLUG.keys());
