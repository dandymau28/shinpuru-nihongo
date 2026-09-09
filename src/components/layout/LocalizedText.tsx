"use client";

import { useSettings } from "@/context/SettingsContext";
import type { Bi } from "@/lib/i18n";

/** Renders a bilingual string in the active language. */
export function LocalizedText({ value }: { value: Bi | string }) {
  const { t } = useSettings();
  return <>{t(value)}</>;
}
