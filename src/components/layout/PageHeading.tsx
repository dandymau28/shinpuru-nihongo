"use client";

import type { ReactNode } from "react";
import { useSettings } from "@/context/SettingsContext";
import type { Bi } from "@/lib/i18n";

export function PageHeading({
  title,
  subtitle,
  right,
}: {
  title: Bi | string;
  subtitle?: Bi | string;
  right?: ReactNode;
}) {
  const { t } = useSettings();
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">{t(title)}</h1>
        {subtitle != null && (
          <p className="mt-1 max-w-prose text-sm text-muted">{t(subtitle)}</p>
        )}
      </div>
      {right}
    </div>
  );
}
