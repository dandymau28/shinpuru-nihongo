"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  DayProgress,
  ExerciseResult,
  ProgressMap,
  Status,
} from "@/lib/types";
import { emptyDayProgress } from "@/lib/types";

const STORAGE_KEY = "sn.progress";
const EXPORT_VERSION = 1;

type ProgressContextValue = {
  hydrated: boolean;
  getDay: (day: number) => DayProgress;
  setStatus: (day: number, status: Status) => void;
  setNotes: (day: number, notes: string) => void;
  setReviewed: (day: number, reviewed: boolean) => void;
  recordExercise: (day: number, result: Omit<ExerciseResult, "at">) => void;
  completedCount: number;
  doneDays: Set<number>;
  resetAll: () => void;
  exportJSON: () => string;
  importJSON: (raw: string) => boolean;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let initial: ProgressMap = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) initial = JSON.parse(raw) as ProgressMap;
    } catch {
      /* ignore */
    }
    setMap(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      /* ignore */
    }
  }, [map, hydrated]);

  const mutateDay = useCallback(
    (day: number, fn: (d: DayProgress) => DayProgress) => {
      setMap((prev) => {
        const current = prev[day] ?? emptyDayProgress();
        return { ...prev, [day]: fn({ ...current }) };
      });
    },
    [],
  );

  const getDay = useCallback(
    (day: number): DayProgress => map[day] ?? emptyDayProgress(),
    [map],
  );

  const recordExercise = useCallback(
    (day: number, result: Omit<ExerciseResult, "at">) => {
      mutateDay(day, (d) => {
        const others = d.exercises.filter((e) => e.setId !== result.setId);
        const next: DayProgress = {
          ...d,
          exercises: [...others, { ...result, at: Date.now() }],
        };
        // Starting the exercises moves an untouched day to "in progress".
        if (next.status === "not-yet") next.status = "partial";
        return next;
      });
    },
    [mutateDay],
  );

  const value = useMemo<ProgressContextValue>(() => {
    const doneDays = new Set(
      Object.entries(map)
        .filter(([, p]) => p.status === "done")
        .map(([k]) => Number(k)),
    );
    return {
      hydrated,
      getDay,
      setStatus: (day, status) => mutateDay(day, (d) => ({ ...d, status })),
      setNotes: (day, notes) => mutateDay(day, (d) => ({ ...d, notes })),
      setReviewed: (day, reviewed) =>
        mutateDay(day, (d) => ({ ...d, reviewed })),
      recordExercise,
      completedCount: doneDays.size,
      doneDays,
      resetAll: () => setMap({}),
      exportJSON: () =>
        JSON.stringify(
          { app: "shinpuru-nihongo", version: EXPORT_VERSION, progress: map },
          null,
          2,
        ),
      importJSON: (raw: string) => {
        try {
          const parsed = JSON.parse(raw);
          const next = parsed?.progress ?? parsed;
          if (!next || typeof next !== "object") return false;
          setMap(next as ProgressMap);
          return true;
        } catch {
          return false;
        }
      },
    };
  }, [map, hydrated, getDay, mutateDay, recordExercise]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
