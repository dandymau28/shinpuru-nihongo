"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE = "sn.rangkuman.notes";

function loadAll(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return JSON.parse(raw) as Record<string, string>;
  } catch {
    /* ignore */
  }
  return {};
}

function saveAll(notes: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(notes));
  } catch {
    /* ignore */
  }
}

/**
 * Per-material personal notes, kept only in this browser — independent of
 * the day-level notes in ProgressContext (a materi can outlive any one day).
 */
export function useRangkumanNotes(slug: string) {
  const [note, setNoteState] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    setNoteState(loadAll()[slug] ?? "");
    setHydrated(true);
    firstRender.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const setNote = useCallback(
    (value: string) => {
      setNoteState(value);
      const all = loadAll();
      all[slug] = value;
      saveAll(all);

      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      setSavedFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setSavedFlash(false), 1200);
    },
    [slug],
  );

  useEffect(() => () => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
  }, []);

  return { note, setNote, hydrated, savedFlash };
}
