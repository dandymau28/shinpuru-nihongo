"use client";

import { useMemo, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import type { ListeningClip, ListeningSet } from "@/lib/types";
import { furigana, stripFurigana } from "@/lib/furigana";
import { useJapaneseTts } from "@/lib/tts";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { ExerciseSet } from "@/components/exercises/ExerciseSet";
import { cn } from "@/lib/cn";

function TtsClip({ clip }: { clip: ListeningClip }) {
  const { t } = useSettings();
  const lines = useMemo(
    () => clip.script.map((l) => ({ speaker: l.speaker, text: stripFurigana(l.ja) })),
    [clip],
  );
  const { supported, playing, lineIndex, play, stop } = useJapaneseTts(lines);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="space-y-2">
      {supported ? (
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={playing ? stop : play}>
            {playing ? `⏹ ${t(STR.ex_stop)}` : `▶ ${t(STR.ex_play)}`}
          </Button>
          <button
            onClick={() => setShowTranscript((v) => !v)}
            className="text-xs text-muted underline hover:text-fg"
          >
            {showTranscript ? t(STR.ex_hide_transcript) : t(STR.ex_reveal_transcript)}
          </button>
        </div>
      ) : (
        <p className="rounded-lg bg-warning-soft/50 p-2 text-xs text-fg/80">
          {t(STR.ex_tts_unsupported)}
        </p>
      )}

      {(showTranscript || !supported) && (
        <ul className="space-y-1 rounded-xl border border-border bg-surface-2 p-3 font-jp text-sm">
          {clip.script.map((l, i) => (
            <li
              key={i}
              className={cn(
                "leading-relaxed transition-colors",
                playing && lineIndex === i && "rounded bg-primary-soft px-1",
              )}
            >
              {l.speaker && <span className="mr-1 text-muted">{l.speaker}:</span>}
              {furigana(l.ja)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ClipBlock({
  clip,
  dayNumber,
  slug,
  index,
}: {
  clip: ListeningClip;
  dayNumber: number;
  slug: string;
  index: number;
}) {
  const { t } = useSettings();
  return (
    <div className="space-y-3">
      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-surface-2 text-xs font-bold">
            {index + 1}
          </span>
          <h2 className="text-sm font-semibold">{t(clip.title)}</h2>
        </div>

        {clip.youtube ? (
          <div className="aspect-video overflow-hidden rounded-xl border border-border">
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${clip.youtube}`}
              title={t(clip.title)}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <TtsClip clip={clip} />
        )}
      </Card>

      <ExerciseSet
        dayNumber={dayNumber}
        group={{
          id: `${slug}:${clip.id}`,
          title: { en: `${t(clip.title)} — questions`, id: `${t(clip.title)} — soal` },
          questions: clip.questions,
        }}
      />
    </div>
  );
}

export function ListeningRunner({
  module,
  dayNumber,
}: {
  module: ListeningSet;
  dayNumber: number;
}) {
  const { t } = useSettings();
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Pill tone="primary">{t(STR.type_listening)}</Pill>
        <h1 className="text-xl font-bold sm:text-2xl">{t(module.title)}</h1>
        <p className="max-w-prose text-sm text-muted">{t(module.description)}</p>
      </header>

      {module.clips.map((clip, i) => (
        <ClipBlock
          key={clip.id}
          clip={clip}
          dayNumber={dayNumber}
          slug={module.slug}
          index={i}
        />
      ))}
    </div>
  );
}
