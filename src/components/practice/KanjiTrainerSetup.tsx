"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import {
  KANJI_LEVELS,
  MODE_HINT,
  MODE_LABEL,
  type KanjiLevel,
  type KanjiMode,
  type KanjiSettings,
  type SessionMode,
} from "@/lib/kanjiPractice";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";

const MODES: KanjiMode[] = ["reading", "meaning", "spelling"];

export function KanjiTrainerSetup({
  settings,
  onChange,
  onStart,
}: {
  settings: KanjiSettings;
  onChange: (s: KanjiSettings) => void;
  onStart: () => void;
}) {
  const { t } = useSettings();
  const set = (patch: Partial<KanjiSettings>) => onChange({ ...settings, ...patch });

  const toggleLevel = (lvl: KanjiLevel) => {
    const has = settings.levels.includes(lvl);
    if (has && settings.levels.length === 1) return; // keep at least one level on
    set({
      levels: has ? settings.levels.filter((l) => l !== lvl) : [...settings.levels, lvl],
    });
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h2 className="text-sm font-semibold">{t(STR.kj_pick_what)}</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {MODES.map((m) => {
            const on = settings.mode === m;
            return (
              <button
                key={m}
                onClick={() => set({ mode: m })}
                aria-pressed={on}
                className={cn(
                  "rounded-xl border p-3 text-left transition-colors",
                  on ? "border-primary bg-primary-soft" : "border-border hover:bg-surface-2",
                )}
              >
                <p className={cn("text-sm font-semibold", on && "text-primary")}>
                  {t(MODE_LABEL[m])}
                </p>
                <p className="mt-0.5 text-xs text-muted">{t(MODE_HINT[m])}</p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">{t(STR.kj_level)}</p>
          <div className="flex flex-wrap gap-1.5">
            {KANJI_LEVELS.map((lvl) => {
              const on = settings.levels.includes(lvl);
              return (
                <button
                  key={lvl}
                  onClick={() => toggleLevel(lvl)}
                  aria-pressed={on}
                  className={cn(
                    "min-w-11 rounded-lg border px-2.5 py-1.5 text-sm font-bold transition-colors",
                    on
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border text-muted hover:bg-surface-2",
                  )}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">{t(STR.conj_session_mode)}</p>
          <Segmented
            value={settings.session}
            onChange={(v: SessionMode) => set({ session: v })}
            options={[
              { value: "set10", label: "10" },
              { value: "set20", label: "20" },
              { value: "set40", label: "40" },
              { value: "endless", label: "∞" },
            ]}
          />
        </div>
      </Card>

      <Button size="lg" className="w-full" onClick={onStart}>
        {t(STR.conj_start)} →
      </Button>
    </div>
  );
}
