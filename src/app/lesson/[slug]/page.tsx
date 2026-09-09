import { notFound } from "next/navigation";
import { AUTHORED_SLUGS, getContent } from "@/content/registry";
import { PLANNER } from "@/data/planner";
import { ContentRenderer } from "@/components/lesson/ContentRenderer";

export function generateStaticParams() {
  return [...AUTHORED_SLUGS].map((slug) => ({ slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = getContent(slug);
  if (!module) notFound();

  const day = PLANNER.find((d) => d.lessonSlug === slug)?.day ?? 0;

  return (
    <div className="space-y-6">
      <ContentRenderer module={module!} dayNumber={day} />
    </div>
  );
}
