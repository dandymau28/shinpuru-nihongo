"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useSettings } from "@/context/SettingsContext";

const COLORS = ["#4f46e5", "#e11d68", "#f59e0b", "#22c55e", "#8b5cf6", "#06b6d4"];
const PIECES = 70;
const DURATION = 2600;

/**
 * One-shot party-popper. Re-fires whenever `runId` changes; auto-clears itself.
 * `pointer-events: none` so it never blocks the drill underneath.
 */
export function StreakCelebration({
  milestone,
  runId,
}: {
  milestone: number;
  runId: number;
}) {
  const { t } = useSettings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const id = window.setTimeout(() => setVisible(false), DURATION);
    return () => window.clearTimeout(id);
  }, [runId]);

  const pieces = useMemo(
    () =>
      Array.from({ length: PIECES }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 1.6 + Math.random() * 1.3,
        size: 6 + Math.random() * 7,
        ratio: 0.4 + Math.random() * 0.9,
        drift: (Math.random() - 0.5) * 260,
        spin: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540),
        color: COLORS[i % COLORS.length],
      })),
    [runId],
  );

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
      aria-live="polite"
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          className="sn-confetti"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * p.ratio,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--sn-drift": `${p.drift}px`,
              "--sn-spin": `${p.spin}deg`,
            } as CSSProperties
          }
        />
      ))}

      <div className="absolute left-1/2 top-20 -translate-x-1/2 px-4">
        <div className="sn-pop rounded-full border border-primary/40 bg-surface px-5 py-2 text-center text-base font-bold shadow-lg sm:text-lg">
          🎉 {t({ en: `${milestone} in a row!`, id: `Runtun ${milestone}!` })} 🎉
        </div>
      </div>
    </div>
  );
}
