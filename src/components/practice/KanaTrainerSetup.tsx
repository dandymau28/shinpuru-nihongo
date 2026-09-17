"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import {
  MODE_HINT,
  MODE_LABEL,
  PRESETS,
  type KanaMode,
  type KanaSettings,
  type SessionMode,
} from "@/lib/kanaPractice";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";

const MODES: KanaMode[] = ["kana-to-romaji", "romaji-to-kana"];

function sameSet<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
}

export function KanaTrainerSetup({
  settings,
  onChange,
  onStart,
}: {
  settings: KanaSettings;
  onChange: (s: KanaSettings) => void;
  onStart: () => void;
}) {
  const { t } = useSettings();
  const set = (patch: Partial<KanaSettings>) => onChange({ ...settings, ...patch });

  const activePreset = PRESETS.find(
    (p) => sameSet(p.scripts, settings.scripts) && sameSet(p.rows, settings.rows),
  );

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h2 className="text-sm font-semibold">{t(STR.kana_pick_mode)}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
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

      <Card className="space-y-3">
        <h2 className="text-sm font-semibold">{t(STR.kana_pick_scope)}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {PRESETS.map((p) => {
            const on = activePreset?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => set({ scripts: p.scripts, rows: p.rows })}
                aria-pressed={on}
                className={cn(
                  "rounded-xl border p-3 text-left transition-colors",
                  on ? "border-primary bg-primary-soft" : "border-border hover:bg-surface-2",
                )}
              >
                <p className={cn("font-jp text-sm font-semibold", on && "text-primary")}>
                  {t(p.label)}
                </p>
                <p className="mt-0.5 text-xs text-muted">{t(p.hint)}</p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
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
      </Card>

      <Button size="lg" className="w-full" onClick={onStart}>
        {t(STR.conj_start)} →
      </Button>
    </div>
  );
}
