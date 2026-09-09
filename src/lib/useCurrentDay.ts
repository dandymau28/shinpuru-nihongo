"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { currentDayNumber, planNotStarted, dayOffset } from "./dates";

/**
 * The plan day (1..90) that "today" maps to, given the configured start date.
 * Returns `null` until mounted to avoid SSR/client mismatch.
 */
export function useCurrentDay(): {
  day: number | null;
  notStarted: boolean;
  offset: number | null;
} {
  const { startDate, hydrated } = useSettings();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  if (!now || !hydrated) return { day: null, notStarted: false, offset: null };
  return {
    day: currentDayNumber(startDate, now),
    notStarted: planNotStarted(startDate, now),
    offset: dayOffset(startDate, now),
  };
}
