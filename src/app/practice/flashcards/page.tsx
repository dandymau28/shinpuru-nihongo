import type { Metadata } from "next";
import { KanjiFlashcards } from "@/components/practice/KanjiFlashcards";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";

export const metadata: Metadata = { title: "Kanji Flashcards · Shinpuru Nihongo" };

export default function FlashcardsPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.fc_title} subtitle={STR.practice_flashcards_desc} />
      <KanjiFlashcards />
    </div>
  );
}
