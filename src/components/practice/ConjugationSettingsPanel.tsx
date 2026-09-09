"use client";

import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import {
  CONJ_FORMS,
  PRESETS,
  type PracticeSettings,
  type SessionMode,
  type WordClass,
} from "@/lib/conjPractice";
import type { FormCategory } from "@/lib/conjugation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";

const CLASS_GROUPS: { key: string; label: keyof typeof STR; classes: WordClass[] }[] = [
  { key: "godan", label: "conj_cls_godan", classes: ["godan", "iku"] },
  { key: "ichidan", label: "conj_cls_ichidan", classes: ["ichidan"] },
  { key: "irregular", label: "conj_cls_irregular", classes: ["suru", "kuru"] },
  { key: "iadj", label: "conj_cls_iadj", classes: ["i-adj", "ii-adj"] },
  { key: "naadj", label: "conj_cls_naadj", classes: ["na-adj"] },
];

const CATEGORY_LABEL: Record<FormCategory, { en: string; id: string }> = {
  predicate: { en: "Predicate (tense · politeness · polarity)", id: "Predikat (kala · kesopanan · polaritas)" },
  te: { en: "て-form family", id: "Keluarga bentuk て" },
  volition: { en: "Volitional · potential", id: "Ajakan · potensial" },
  "passive-causative": { en: "Passive · causative", id: "Pasif · kausatif" },
  command: { en: "Commands", id: "Perintah" },
  conditional: { en: "Conditionals", id: "Pengandaian" },
  adjective: { en: "Adjective-only", id: "Khusus kata sifat" },
};

const CATEGORY_ORDER: FormCategory[] = [
  "predicate", "te", "volition", "passive-causative", "command", "conditional", "adjective",
];

export function ConjugationSettingsPanel({
  settings,
  onChange,
  onStart,
}: {
  settings: PracticeSettings;
  onChange: (s: PracticeSettings) => void;
  onStart: () => void;
}) {
  const { t } = useSettings();
  const set = (patch: Partial<PracticeSettings>) => onChange({ ...settings, ...patch });

  const toggleClassGroup = (classes: WordClass[]) => {
    const on = classes.every((c) => settings.classes.includes(c));
    set({
      classes: on
        ? settings.classes.filter((c) => !classes.includes(c))
        : [...new Set([...settings.classes, ...classes])],
    });
  };

  const toggleForm = (id: string) => {
    set({
      forms: settings.forms.includes(id)
        ? settings.forms.filter((f) => f !== id)
        : [...settings.forms, id],
    });
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h2 className="text-sm font-semibold text-muted">{t(STR.conj_level)}</h2>
        <Segmented
          value={settings.jlpt.slice().sort().join("+")}
          onChange={(v) =>
            set({ jlpt: v === "N4+N5" ? ["N5", "N4"] : (v.split("+") as ("N5" | "N4")[]) })
          }
          options={[
            { value: "N5", label: "N5" },
            { value: "N4", label: "N4" },
            { value: "N4+N5", label: "N5 + N4" },
          ]}
        />

        <h2 className="pt-1 text-sm font-semibold text-muted">{t(STR.conj_word_types)}</h2>
        <div className="flex flex-wrap gap-1.5">
          {CLASS_GROUPS.map((g) => {
            const on = g.classes.every((c) => settings.classes.includes(c));
            return (
              <button
                key={g.key}
                onClick={() => toggleClassGroup(g.classes)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  on
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border text-muted hover:bg-surface-2",
                )}
              >
                {t(STR[g.label])}
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted">{t(STR.conj_forms)}</h2>
          <span className="text-xs text-muted">{settings.forms.length}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => set({ forms: p.forms })}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted hover:bg-surface-2 hover:text-fg"
            >
              {t(p.label)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {CATEGORY_ORDER.map((cat) => {
            const forms = CONJ_FORMS.filter((f) => f.category === cat);
            if (!forms.length) return null;
            return (
              <div key={cat}>
                <p className="mb-1 text-xs font-medium text-fg/70">
                  {t(CATEGORY_LABEL[cat])}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {forms.map((f) => {
                    const on = settings.forms.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggleForm(f.id)}
                        title={t(f.explain)}
                        className={cn(
                          "rounded-lg border px-2 py-1 text-xs transition-colors",
                          on
                            ? "border-primary bg-primary-soft text-primary"
                            : "border-border text-muted hover:bg-surface-2",
                        )}
                      >
                        <span aria-hidden>{f.emoji}</span> {t(f.label)}
                        <span className="ml-1 font-jp text-[10px] opacity-70">{f.jp}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">{t(STR.conj_session_mode)}</p>
          <Segmented
            value={settings.mode}
            onChange={(v: SessionMode) => set({ mode: v })}
            options={[
              { value: "endless", label: t(STR.conj_endless) },
              { value: "set10", label: "10" },
              { value: "set20", label: "20" },
              { value: "set40", label: "40" },
            ]}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">{t(STR.conj_input_mode)}</p>
          <Segmented
            value={settings.input}
            onChange={(v: "kana" | "romaji") => set({ input: v })}
            options={[
              { value: "romaji", label: t(STR.conj_input_romaji) },
              { value: "kana", label: t(STR.conj_input_kana) },
            ]}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">{t(STR.conj_show_meaning)}</p>
          <Segmented
            value={settings.showMeaning}
            onChange={(v: "always" | "after") => set({ showMeaning: v })}
            options={[
              { value: "always", label: t(STR.conj_always) },
              { value: "after", label: t(STR.conj_after_answer) },
            ]}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">{t(STR.conj_show_reading)}</p>
          <Segmented
            value={settings.showReading}
            onChange={(v: "always" | "after") => set({ showReading: v })}
            options={[
              { value: "always", label: t(STR.conj_always) },
              { value: "after", label: t(STR.conj_after_answer) },
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
