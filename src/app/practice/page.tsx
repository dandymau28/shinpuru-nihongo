import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/layout/PageHeading";
import { Card } from "@/components/ui/Card";
import { STR } from "@/lib/strings";
import { LocalizedText } from "@/components/layout/LocalizedText";

export const metadata: Metadata = { title: "Practice · Shinpuru Nihongo" };

const TOOLS = [
  {
    href: "/practice/conjugation",
    emoji: "🔀",
    name: STR.practice_conj_name,
    desc: STR.practice_conj_desc,
  },
  {
    href: "/practice/particles",
    emoji: "🧩",
    name: STR.practice_particles_name,
    desc: STR.practice_particles_desc,
  },
];

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.practice_title} subtitle={STR.practice_intro} />
      <div className="grid gap-3 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full transition-colors hover:border-primary/50 hover:bg-surface-2">
              <div className="text-2xl" aria-hidden>
                {tool.emoji}
              </div>
              <h2 className="mt-2 font-semibold">
                <LocalizedText value={tool.name} />
              </h2>
              <p className="mt-1 text-sm text-muted">
                <LocalizedText value={tool.desc} />
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
