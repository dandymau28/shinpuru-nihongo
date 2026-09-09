import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLANNER, getDay } from "@/data/planner";
import { pick } from "@/lib/i18n";
import { DayDetail } from "@/components/planner/DayDetail";

export function generateStaticParams() {
  return PLANNER.map((d) => ({ day: String(d.day) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>;
}): Promise<Metadata> {
  const { day } = await params;
  const d = getDay(Number(day));
  if (!d) return { title: "Day · Shinpuru Nihongo" };
  return { title: `Day ${d.day}: ${pick(d.title, "en")} · Shinpuru Nihongo` };
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const n = Number(day);
  const d = getDay(n);
  if (!d || !Number.isInteger(n)) notFound();
  return <DayDetail day={d!} />;
}
