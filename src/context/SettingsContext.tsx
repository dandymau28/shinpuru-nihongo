"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Lang, Bi } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { DEFAULT_START_DATE } from "@/lib/dates";

type Theme = "light" | "dark" | "system";

type Settings = {
  lang: Lang;
  theme: Theme;
  furigana: boolean;
  romaji: boolean;
  startDate: string;
};

const DEFAULTS: Settings = {
  lang: "en",
  theme: "system",
  furigana: true,
  romaji: false,
  startDate: DEFAULT_START_DATE,
};

const STORAGE_KEY = "sn.settings";

type SettingsContextValue = Settings & {
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  setFurigana: (v: boolean) => void;
  setRomaji: (v: boolean) => void;
  setStartDate: (v: string) => void;
  /** Translate a bilingual value using the current language. */
  t: (value: Bi | string) => string;
  hydrated: boolean;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function applyDomFlags(theme: Theme, furigana: boolean) {
  if (typeof document === "undefined") return;
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const dark = theme === "dark" || (theme === "system" && mql.matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.classList.toggle("no-furigana", !furigana);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Settings>;
        setSettings({ ...DEFAULTS, ...parsed });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
    applyDomFlags(settings.theme, settings.furigana);
  }, [settings, hydrated]);

  // React to OS theme changes while on "system"
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyDomFlags(settings.theme, settings.furigana);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [settings.theme, settings.furigana]);

  const patch = useCallback(
    (p: Partial<Settings>) => setSettings((s) => ({ ...s, ...p })),
    [],
  );

  const t = useCallback(
    (value: Bi | string) => pick(value, settings.lang),
    [settings.lang],
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...settings,
      setLang: (lang) => patch({ lang }),
      setTheme: (theme) => patch({ theme }),
      setFurigana: (furigana) => patch({ furigana }),
      setRomaji: (romaji) => patch({ romaji }),
      setStartDate: (startDate) => patch({ startDate }),
      t,
      hydrated,
    }),
    [settings, patch, t, hydrated],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
