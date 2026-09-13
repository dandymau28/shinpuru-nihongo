import type { Metadata } from "next";
import { QuestionWordTrainer } from "@/components/practice/QuestionWordTrainer";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";

export const metadata: Metadata = { title: "Question Word Trainer · Shinpuru Nihongo" };

export default function QuestionWordsPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.qw_title} subtitle={STR.practice_qw_desc} />
      <QuestionWordTrainer />
    </div>
  );
}
