"use client";

import { useMemo, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { STR } from "@/lib/strings";
import type { ExerciseGroup, Question } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MultipleChoice } from "./MultipleChoice";
import { Cloze } from "./Cloze";
import { SentenceBuild } from "./SentenceBuild";
import { ConjugationDrill } from "./ConjugationDrill";

function QuestionCard({
  question,
  speak,
  onResult,
}: {
  question: Question;
  speak?: boolean;
  onResult: (correct: boolean) => void;
}) {
  switch (question.kind) {
    case "mcq":
      return <MultipleChoice question={question} onResult={onResult} />;
    case "cloze":
      return <Cloze question={question} speak={speak} onResult={onResult} />;
    case "build":
      return <SentenceBuild question={question} onResult={onResult} />;
    default:
      return null;
  }
}

export function ExerciseSet({
  dayNumber,
  group,
}: {
  dayNumber: number;
  group: ExerciseGroup;
}) {
  const { t } = useSettings();
  const { recordExercise, getDay } = useProgress();

  const listQuestions = useMemo(
    () => group.questions.filter((q) => q.kind !== "conjugation"),
    [group],
  );

  const prior = getDay(dayNumber).exercises.find((e) => e.setId === group.id);

  const [index, setIndex] = useState(0);
  const [graded, setGraded] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [runKey, setRunKey] = useState(0);

  if (group.mode === "streak") {
    return (
      <Card className="space-y-3">
        <SetHeader group={group} prior={prior} />
        <ConjugationDrill
          key={runKey}
          group={group}
          onFinish={(r) => {
            if (r.total > 0)
              recordExercise(dayNumber, { setId: group.id, ...r, scored: false });
            setRunKey((k) => k + 1);
          }}
        />
      </Card>
    );
  }

  const total = listQuestions.length;
  const q = listQuestions[index];
  const isLast = index === total - 1;

  function handleResult(correct: boolean) {
    setGraded(true);
    if (correct) setCorrectCount((c) => c + 1);
  }

  function advance() {
    if (isLast) {
      recordExercise(dayNumber, {
        setId: group.id,
        correct: correctCount,
        total,
        scored: true,
      });
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setGraded(false);
    }
  }

  function restart() {
    setIndex(0);
    setGraded(false);
    setCorrectCount(0);
    setFinished(false);
    setRunKey((k) => k + 1);
  }

  if (finished) {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    return (
      <Card className="space-y-3">
        <SetHeader group={group} prior={prior} />
        <div className="rounded-xl border border-border bg-surface-2 p-4 text-center">
          <p className="text-sm text-muted">{t(STR.ex_score)}</p>
          <p className="text-3xl font-bold tabular-nums">
            {correctCount}/{total}
          </p>
          <p className="text-sm text-muted">{pct}%</p>
        </div>
        <Button size="sm" variant="secondary" onClick={restart}>
          {t(STR.ex_retry)}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <SetHeader group={group} prior={prior} />

      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${((index + (graded ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted">
          {index + 1} {t(STR.ex_of)} {total}
        </span>
      </div>

      <div key={`${runKey}-${index}`}>
        <QuestionCard question={q} speak={group.speak} onResult={handleResult} />
      </div>

      {graded && (
        <Button size="sm" onClick={advance}>
          {isLast ? t(STR.ex_finish) : t(STR.ex_next)}
        </Button>
      )}
    </Card>
  );
}

function SetHeader({
  group,
  prior,
}: {
  group: ExerciseGroup;
  prior?: { correct: number; total: number };
}) {
  const { t } = useSettings();
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{t(group.title)}</h3>
        {prior && (
          <span className="text-xs text-muted">
            {t(STR.ex_best)}: {prior.correct}
            {group.mode === "streak" ? "" : `/${prior.total}`}
          </span>
        )}
      </div>
      {group.instructions && (
        <p className="mt-0.5 text-sm text-muted">{t(group.instructions)}</p>
      )}
    </div>
  );
}
