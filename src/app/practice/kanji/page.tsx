import type { Metadata } from "next";
import { KanjiTrainer } from "@/components/practice/KanjiTrainer";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";

export const metadata: Metadata = { title: "Kanji Trainer · Shinpuru Nihongo" };

export default function KanjiPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.kj_title} subtitle={STR.practice_kanji_desc} />
      <KanjiTrainer />
    </div>
  );
}
