"use client";

import { useRef, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useProgress } from "@/context/ProgressContext";
import { STR } from "@/lib/strings";
import { Card, CardTitle } from "@/components/ui/Card";
import { Segmented } from "@/components/ui/Segmented";
import { Button } from "@/components/ui/Button";
import { PageHeading } from "@/components/layout/PageHeading";

export function SettingsView() {
  const {
    t,
    lang,
    setLang,
    theme,
    setTheme,
    furigana,
    setFurigana,
    romaji,
    setRomaji,
    startDate,
    setStartDate,
  } = useSettings();
  const { exportJSON, importJSON, resetAll } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function doExport() {
    const blob = new Blob([exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shinpuru-nihongo-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function doImport(file: File) {
    const text = await file.text();
    setMsg(importJSON(text) ? t(STR.imported_ok) : t(STR.import_failed));
  }

  return (
    <div className="space-y-6">
      <PageHeading title={STR.settings_title} />

      <Card className="space-y-4">
        <CardTitle>{t({ en: "Display", id: "Tampilan" })}</CardTitle>

        <Row label={t(STR.aid_language)}>
          <Segmented
            value={lang}
            onChange={setLang}
            options={[
              { value: "en", label: "English" },
              { value: "id", label: "Indonesia" },
            ]}
          />
        </Row>

        <Row label={t(STR.aid_theme)}>
          <Segmented
            value={theme}
            onChange={setTheme}
            options={[
              { value: "light", label: t(STR.theme_light) },
              { value: "dark", label: t(STR.theme_dark) },
              { value: "system", label: t(STR.theme_system) },
            ]}
          />
        </Row>

        <Row label={t(STR.aid_furigana)}>
          <Toggle checked={furigana} onChange={setFurigana} />
        </Row>

        <Row label={t(STR.aid_romaji)}>
          <Toggle checked={romaji} onChange={setRomaji} />
        </Row>
      </Card>

      <Card className="space-y-3">
        <CardTitle>{t(STR.settings_start_date)}</CardTitle>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="h-9 rounded-xl border border-border bg-surface px-3 text-sm"
        />
        <p className="text-xs text-muted">{t(STR.settings_start_date_help)}</p>
      </Card>

      <Card className="space-y-3">
        <CardTitle>{t(STR.settings_data)}</CardTitle>
        <p className="text-xs text-muted">{t(STR.settings_data_help)}</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={doExport}>
            {t(STR.export_progress)}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
            {t(STR.import_progress)}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) doImport(f);
              e.target.value = "";
            }}
          />
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              if (confirm(t(STR.reset_confirm))) {
                resetAll();
                setMsg(null);
              }
            }}
          >
            {t(STR.reset_progress)}
          </Button>
        </div>
        {msg && <p className="text-xs text-success">{msg}</p>}
      </Card>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border px-0.5 transition-colors ${
        checked ? "border-primary bg-primary" : "border-border bg-surface-2"
      }`}
    >
      <span
        className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}
