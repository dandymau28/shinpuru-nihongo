import type { Metadata } from "next";
import { ParticleTrainer } from "@/components/practice/ParticleTrainer";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";

export const metadata: Metadata = { title: "Particle Trainer · Shinpuru Nihongo" };

export default function ParticlesPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.pt_title} subtitle={STR.practice_particles_desc} />
      <ParticleTrainer />
    </div>
  );
}
