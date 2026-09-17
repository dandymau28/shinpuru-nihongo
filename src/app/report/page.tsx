import type { Metadata } from "next";
import { PageHeading } from "@/components/layout/PageHeading";
import { STR } from "@/lib/strings";
import { PersonalReport } from "@/components/report/PersonalReport";

export const metadata: Metadata = { title: "Personal Report · Shinpuru Nihongo" };

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <PageHeading title={STR.report_title} subtitle={STR.report_intro} />
      <PersonalReport />
    </div>
  );
}
