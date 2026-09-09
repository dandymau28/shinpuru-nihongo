"use client";

import type { ContentModule } from "@/lib/types";
import { LessonView } from "./LessonView";
import { TestRunner } from "./TestRunner";
import { ReadingRunner } from "./ReadingRunner";
import { ListeningRunner } from "./ListeningRunner";
import { DeckRunner } from "./DeckRunner";
import { SkillView } from "./SkillView";

export function ContentRenderer({
  module,
  dayNumber,
}: {
  module: ContentModule;
  dayNumber: number;
}) {
  switch (module.type) {
    case "lesson":
      return <LessonView lesson={module} dayNumber={dayNumber} />;
    case "test":
      return <TestRunner module={module} dayNumber={dayNumber} />;
    case "reading":
      return <ReadingRunner module={module} dayNumber={dayNumber} />;
    case "listening":
      return <ListeningRunner module={module} dayNumber={dayNumber} />;
    case "deck":
      return <DeckRunner module={module} dayNumber={dayNumber} />;
    case "skill":
      return <SkillView module={module} dayNumber={dayNumber} />;
    default:
      return null;
  }
}
