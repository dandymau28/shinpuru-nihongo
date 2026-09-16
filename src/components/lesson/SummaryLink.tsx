"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";

/** A small "View summary" link shown when a materi has a rangkuman sheet. */
export function SummaryLink({ slug }: { slug: string }) {
  const { t } = useSettings();
  return (
    <Link
      href={`/rangkuman/${slug}`}
      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      📋 {t(STR.rangkuman_view_link)}
    </Link>
  );
}
