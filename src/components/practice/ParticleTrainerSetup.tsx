"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import {
  PARTICLES,
  PRESETS,
  type ParticleSettings,
  type SessionMode,
} from "@/lib/particlePractice";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
}

export function ParticleTrainerSetup({
  settings,
  onChange,
  onStart,
}: {
  settings: ParticleSettings;
  onChange: (s: ParticleSettings) => void;
  onStart: () => void;
}) {
  const { t } = useSettings();
  const [pickOpen, setPickOpen] = useState(false);
  const set = (patch: Partial<ParticleSettings>) => onChange({ ...settings, ...patch });

  const activePreset = PRESETS.find(
    (p) =>
      p.contrast === settings.contrast &&
      sameSet(p.particles, settings.particles) &&
      sameSet(p.levels, settings.levels),
  );

  const toggleParticle = (p: string) => {
    set({
      contrast: null,
      particles: settings.particles.includes(p)
        ? settings.particles.filter((x) => x !== p)
        : [...settings.particles, p],
    });
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">{t(STR.pt_pick_what)}</h2>
          <button
            onClick={() => setPickOpen((v) => !v)}
            className="shrink-0 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted hover:bg-surface-2 hover:text-fg"
          >
            {t(STR.pt_choose_particles)}
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {PRESETS.map((p) => {
            const on = activePreset?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() =>
                  set({
                    particles: p.particles,
                    levels: p.levels,
                    contrast: p.contrast,
                  })
                }
                aria-pressed={on}
                className={cn(
                  "rounded-xl border p-3 text-left transition-colors",
                  on ? "border-primary bg-primary-soft" : "border-border hover:bg-surface-2",
                )}
              >
                <p className={cn("font-jp text-sm font-semibold", on && "text-primary")}>
                  {t(p.label)}
                </p>
                <p className="mt-0.5 font-jp text-xs text-muted">{t(p.hint)}</p>
              </button>
            );
          })}
        </div>

        {pickOpen && (
          <div className="space-y-2 rounded-xl border border-border p-3">
            <p className="text-xs font-semibold text-muted">
              {t(STR.pt_choose_particles)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PARTICLES.map((p) => {
                const on = settings.particles.includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => toggleParticle(p)}
                    className={cn(
                      "min-w-9 rounded-lg border px-2 py-1 font-jp text-sm font-bold transition-colors",
                      on
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border text-muted hover:bg-surface-2",
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <Segmented
              size="sm"
              value={settings.levels.slice().sort().join("+")}
              onChange={(v) =>
                set({
                  contrast: null,
                  levels: v === "N4+N5" ? ["N5", "N4"] : (v.split("+") as ("N5" | "N4")[]),
                })
              }
              options={[
                { value: "N5", label: "N5" },
                { value: "N4", label: "N4" },
                { value: "N4+N5", label: "N5 + N4" },
              ]}
            />
          </div>
        )}
      </Card>

      <Card>
        <p className="mb-1.5 text-xs font-semibold text-muted">{t(STR.conj_session_mode)}</p>
        <Segmented
          value={settings.mode}
          onChange={(v: SessionMode) => set({ mode: v })}
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
