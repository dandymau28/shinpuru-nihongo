"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { useRangkumanNotes } from "@/lib/rangkumanNotes";
import { Card, CardTitle } from "@/components/ui/Card";

/**
 * Personal notes for one materi — saved to this browser only (localStorage),
 * independent of the day-level notes in ProgressContext. Same "Saved ✓"
 * flash pattern as ProgressControls' day notes.
 */
export function RangkumanNotes({ slug }: { slug: string }) {
  const { t } = useSettings();
  const { note, setNote, hydrated, savedFlash } = useRangkumanNotes(slug);

  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <CardTitle>{t(STR.rangkuman_notes_title)}</CardTitle>
        <span
          className={`text-xs text-success transition-opacity ${savedFlash ? "opacity-100" : "opacity-0"}`}
        >
          {t(STR.saved)} ✓
        </span>
      </div>
      <p className="text-xs text-muted">{t(STR.rangkuman_notes_help)}</p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t(STR.notes_ph)}
        rows={4}
        disabled={!hydrated}
        className="w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:opacity-60"
      />
    </Card>
  );
}
