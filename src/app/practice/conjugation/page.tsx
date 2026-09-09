import type { Metadata } from "next";
import { ConjugationTrainer } from "@/components/practice/ConjugationTrainer";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";

export const metadata: Metadata = { title: "Conjugation Trainer · Shinpuru Nihongo" };

export default function ConjugationPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.conj_title} subtitle={STR.practice_conj_desc} />
      {/* A `?forms=te,plain-past` query pre-selects those forms; read client-side
          in ConjugationTrainer so this page stays statically exportable. */}
      <ConjugationTrainer />
    </div>
  );
}
