"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import {
  MODE_HINT,
  MODE_LABEL,
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
          <Segmented
            value={settings.levels.slice().sort().join("+")}
            onChange={(v) =>
              set({ levels: v === "N4+N5" ? ["N5", "N4"] : (v.split("+") as ("N5" | "N4")[]) })
            }
            options={[
              { value: "N5", label: "N5" },
              { value: "N4", label: "N4" },
              { value: "N4+N5", label: "N5 + N4" },
            ]}
          />
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
