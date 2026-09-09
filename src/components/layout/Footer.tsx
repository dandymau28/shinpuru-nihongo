"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";

export function Footer() {
  const { t } = useSettings();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:px-6">
        <p>
          {t(STR.appName)} · {t(STR.tagline)}
        </p>
        <nav className="flex gap-3 sm:ml-auto">
          <Link href="/planner" className="hover:text-fg">
            {t(STR.nav_planner)}
          </Link>
          <Link href="/practice" className="hover:text-fg">
            {t(STR.nav_practice)}
          </Link>
          <Link href="/settings" className="hover:text-fg">
            {t(STR.nav_settings)}
          </Link>
          <Link href="/about" className="hover:text-fg">
            {t(STR.nav_about)}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
