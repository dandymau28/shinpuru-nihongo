import { STR } from "./strings";
import type { Bi } from "./i18n";
import type { Phase, DayType, Status } from "./types";

export const PHASE_LABEL: Record<Phase, Bi> = {
  "n5-refresher": STR.phase_n5refresher,
  "n4-core": STR.phase_n4core,
  "exam-sprint": STR.phase_examsprint,
};

export const TYPE_LABEL: Record<DayType, Bi> = {
  diagnostic: STR.type_diagnostic,
  grammar: STR.type_grammar,
  "vocab-kanji": STR["type_vocab-kanji"],
  reading: STR.type_reading,
  listening: STR.type_listening,
  review: STR.type_review,
  test: STR.type_test,
  skill: STR.type_skill,
};

export const STATUS_LABEL: Record<Status, Bi> = {
  "not-yet": STR.status_not_yet,
  partial: STR.status_partial,
  done: STR.status_done,
};
