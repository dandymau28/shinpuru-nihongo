"use client";

import { useConjStats } from "@/lib/conjPractice";
import { usePracticeStats } from "@/lib/practiceStats";
import { FORM_BY_ID } from "@/lib/conjugation";
import { KANA_TABLE } from "@/lib/kanaPractice";
import { useSettings } from "@/context/SettingsContext";
import { STR } from "@/lib/strings";
import { Card } from "@/components/ui/Card";
import { LocalizedText } from "@/components/layout/LocalizedText";
import { ReportSection, type StatsLike } from "./ReportSection";

export function PersonalReport() {
  const { t } = useSettings();
  const conjRaw = useConjStats();
  // useConjStats() predates the shared usePracticeStats() hook and names its
  // ranked-item id field `id` instead of `key` — adapt it to the same shape.
  const conj: StatsLike = {
    stats: conjRaw.stats,
    hydrated: conjRaw.hydrated,
    reset: conjRaw.reset,
    ranked: conjRaw.ranked.map((r) => ({ key: r.id, seen: r.seen, correct: r.correct, pct: r.pct })),
  };
  const particles = usePracticeStats("sn.particles.stats");
  const kanji = usePracticeStats("sn.kanji.stats");
  const qwords = usePracticeStats("sn.qwords.stats");
  const kana = usePracticeStats("sn.kana.stats");

  const all = [conj, particles, kanji, qwords, kana];
  const allHydrated = all.every((a) => a.hydrated);
  if (!allHydrated) return null;

  const totalSeen = all.reduce((sum, a) => sum + a.stats.totalSeen, 0);
  const totalCorrect = all.reduce((sum, a) => sum + a.stats.totalCorrect, 0);
  const trainersUsed = all.filter((a) => a.stats.totalSeen > 0).length;

  return (
    <div className="space-y-4">
      {totalSeen === 0 ? (
        <Card className="text-center text-sm text-muted">{t(STR.report_empty)}</Card>
      ) : (
        <Card className="space-y-1.5 text-center">
          <p className="text-sm text-muted">{t(STR.report_overview)}</p>
          <p className="text-4xl font-bold tabular-nums">
            {Math.round((totalCorrect / totalSeen) * 100)}%
          </p>
          <p className="text-sm text-muted tabular-nums">
            {totalCorrect}/{totalSeen} · {trainersUsed}/5 {t(STR.report_trainers_used)}
          </p>
        </Card>
      )}

      <ReportSection
        title={STR.practice_conj_name}
        emoji="🔀"
        href="/practice/conjugation"
        stats={conj}
        renderKey={(id) => {
          const f = FORM_BY_ID.get(id);
          return f ? <LocalizedText value={f.label} /> : id;
        }}
      />
      <ReportSection
        title={STR.practice_particles_name}
        emoji="🧩"
        href="/practice/particles"
        stats={particles}
      />
      <ReportSection
        title={STR.practice_kanji_name}
        emoji="🈳"
        href="/practice/kanji"
        stats={kanji}
      />
      <ReportSection
        title={STR.practice_qw_name}
        emoji="❓"
        href="/practice/questions"
        stats={qwords}
      />
      <ReportSection
        title={STR.practice_kana_name}
        emoji="あ"
        href="/practice/kana"
        stats={kana}
        renderKey={(key) => {
          const i = key.indexOf("-");
          const script = key.slice(0, i);
          const entryKey = key.slice(i + 1);
          const entry = KANA_TABLE.find((e) => e.key === entryKey);
          if (!entry) return key;
          return script === "katakana" ? entry.kata : entry.hira;
        }}
      />
    </div>
  );
}
