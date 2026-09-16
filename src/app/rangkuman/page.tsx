import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/layout/PageHeading";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { STR } from "@/lib/strings";
import { LocalizedText } from "@/components/layout/LocalizedText";
import { SUMMARIES } from "@/content/summaryRegistry";

export const metadata: Metadata = { title: "Grammar Summaries · Shinpuru Nihongo" };

export default function RangkumanHubPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.rangkuman_title} subtitle={STR.rangkuman_intro} />
      <div className="grid gap-3 sm:grid-cols-2">
        {SUMMARIES.map((s) => (
          <Link key={s.slug} href={`/rangkuman/${s.slug}`}>
            <Card className="h-full space-y-1.5 transition-colors hover:border-primary/50 hover:bg-surface-2">
              <div className="flex items-center gap-2">
                <Pill tone={s.level === "N5" ? "primary" : "accent"}>{s.level}</Pill>
                {s.titleJa && <span className="font-jp text-sm font-bold">{s.titleJa}</span>}
              </div>
              <h2 className="font-semibold">
                <LocalizedText value={s.title} />
              </h2>
              <p className="text-sm text-muted">
                <LocalizedText value={s.intro} />
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
