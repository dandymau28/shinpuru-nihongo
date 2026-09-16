import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUMMARY_SLUGS, getSummary } from "@/content/summaryRegistry";
import { pick } from "@/lib/i18n";
import { RangkumanView } from "@/components/rangkuman/RangkumanView";

export function generateStaticParams() {
  return [...SUMMARY_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const summary = getSummary(slug);
  if (!summary) return { title: "Summary · Shinpuru Nihongo" };
  return { title: `${pick(summary.title, "en")} · Rangkuman · Shinpuru Nihongo` };
}

export default async function RangkumanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const summary = getSummary(slug);
  if (!summary) notFound();

  return <RangkumanView summary={summary} />;
}
