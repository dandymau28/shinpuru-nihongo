"use client";

import { useSettings } from "@/context/SettingsContext";
import type { ExternalLink, LinkKind } from "@/lib/types";
import { STR } from "@/lib/strings";
import { Pill } from "@/components/ui/Pill";

const KIND_LABEL: Record<LinkKind, { en: string; id: string }> = {
  explainer: { en: "Explainer", id: "Penjelasan" },
  exercise: { en: "Exercise", id: "Latihan" },
  reading: { en: "Reading", id: "Bacaan" },
  listening: { en: "Listening", id: "Menyimak" },
  pdf: { en: "PDF", id: "PDF" },
  video: { en: "Video", id: "Video" },
  sample: { en: "Official sample", id: "Contoh resmi" },
  reference: { en: "Reference", id: "Referensi" },
};

export function ExternalLinks({ links }: { links: ExternalLink[] }) {
  const { t } = useSettings();
  if (links.length === 0) return null;

  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold text-muted">
        {t(STR.original_references)}
      </h2>
      <ul className="space-y-1.5">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm transition-colors hover:bg-surface-2 ${
                link.dead ? "opacity-50" : ""
              }`}
            >
              <Pill tone="neutral">{t(KIND_LABEL[link.kind])}</Pill>
              <span className="min-w-0 flex-1 truncate">{t(link.label)}</span>
              {link.dead ? (
                <span className="text-xs text-muted">offline</span>
              ) : (
                <span className="text-muted transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
