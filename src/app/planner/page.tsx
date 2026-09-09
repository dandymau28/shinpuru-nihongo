import type { Metadata } from "next";
import { PlannerView } from "@/components/planner/PlannerView";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";

export const metadata: Metadata = { title: "Planner · Shinpuru Nihongo" };

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.planner_title} subtitle={STR.tagline} />
      <PlannerView />
    </div>
  );
}
