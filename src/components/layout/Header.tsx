"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { cn } from "@/lib/cn";
import { Segmented } from "@/components/ui/Segmented";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { t, lang, setLang, theme, setTheme, furigana, setFurigana } = useSettings();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="mr-1 flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-fg font-bold">
            日
          </span>
          <span className="hidden text-sm font-semibold sm:block">
            {t(STR.appName)}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/" label={t(STR.nav_dashboard)} />
          <NavLink href="/planner" label={t(STR.nav_planner)} />
          <NavLink href="/practice" label={t(STR.nav_practice)} />
        </nav>

        <div className="ml-auto flex items-center gap-2" ref={menuRef}>
          <Segmented
            size="sm"
            ariaLabel={t(STR.aid_language)}
            options={[
              { value: "en", label: "EN" },
              { value: "id", label: "ID" },
            ]}
            value={lang}
            onChange={setLang}
          />
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t(STR.nav_settings)}
              aria-expanded={open}
              className="grid size-8 place-items-center rounded-lg border border-border hover:bg-surface-2"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.31.22.65.22 1s-.08.69-.22 1z" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-surface p-3 shadow-lg">
                <div className="space-y-3">
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-muted">{t(STR.aid_theme)}</p>
                    <Segmented
                      size="sm"
                      value={theme}
                      onChange={setTheme}
                      options={[
                        { value: "light", label: t(STR.theme_light) },
                        { value: "dark", label: t(STR.theme_dark) },
                        { value: "system", label: t(STR.theme_system) },
                      ]}
                    />
                  </div>
                  <label className="flex items-center justify-between text-sm">
                    <span>{t(STR.aid_furigana)}</span>
                    <input
                      type="checkbox"
                      checked={furigana}
                      onChange={(e) => setFurigana(e.target.checked)}
                      className="size-4 accent-[var(--primary)]"
                    />
                  </label>
                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-fg"
                  >
                    {t(STR.nav_settings)} →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
