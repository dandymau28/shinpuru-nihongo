import type { Metadata } from "next";
import { KanaTrainer } from "@/components/practice/KanaTrainer";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";

export const metadata: Metadata = { title: "Kana Trainer · Shinpuru Nihongo" };

export default function KanaPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.kana_title} subtitle={STR.practice_kana_desc} />
      <KanaTrainer />
    </div>
  );
}
