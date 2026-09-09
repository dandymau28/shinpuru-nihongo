"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { Lesson } from "@/lib/types";
import { Pill } from "@/components/ui/Pill";
import { ExerciseSet } from "@/components/exercises/ExerciseSet";
import { LessonSectionList } from "./LessonSectionList";

export function LessonView({
  lesson,
  dayNumber,
  showExercises = true,
}: {
  lesson: Lesson;
  dayNumber: number;
  showExercises?: boolean;
}) {
  const { t } = useSettings();
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Pill tone={lesson.level === "N5" ? "primary" : "accent"}>{lesson.level}</Pill>
          {lesson.titleJa && (
            <span className="font-jp text-lg font-bold">{lesson.titleJa}</span>
          )}
        </div>
        <h1 className="text-xl font-bold sm:text-2xl">{t(lesson.title)}</h1>
        <p className="max-w-prose text-sm text-muted">{t(lesson.summary)}</p>
      </header>

      <LessonSectionList sections={lesson.sections} />

      {showExercises && lesson.exercises.length > 0 && (
        <div className="space-y-4 border-t border-border pt-6">
          <h2 className="text-lg font-bold">{t(STR.exercises)}</h2>
          {lesson.exercises.map((group) => (
            <ExerciseSet key={group.id} dayNumber={dayNumber} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
