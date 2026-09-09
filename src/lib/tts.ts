"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Is Japanese speech synthesis plausibly available in this browser? */
export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickJapaneseVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "ja-JP") ??
    voices.find((v) => v.lang.startsWith("ja")) ??
    null
  );
}

export type TtsLine = { speaker?: string; text: string };

/**
 * Speak a sequence of Japanese lines in order, with a short gap between
 * speakers. Returns controls and playback state.
 */
export function useJapaneseTts(lines: TtsLine[]) {
  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [lineIndex, setLineIndex] = useState<number>(-1);
  const cancelled = useRef(false);

  useEffect(() => {
    setSupported(ttsSupported());
    // Voices can load async.
    if (ttsSupported()) {
      window.speechSynthesis.getVoices();
      const handler = () => {};
      window.speechSynthesis.addEventListener?.("voiceschanged", handler);
      return () => {
        window.speechSynthesis.removeEventListener?.("voiceschanged", handler);
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const stop = useCallback(() => {
    cancelled.current = true;
    if (ttsSupported()) window.speechSynthesis.cancel();
    setPlaying(false);
    setLineIndex(-1);
  }, []);

  const play = useCallback(() => {
    if (!ttsSupported() || lines.length === 0) return;
    window.speechSynthesis.cancel();
    cancelled.current = false;
    setPlaying(true);

    const voice = pickJapaneseVoice();

    const speakAt = (i: number) => {
      if (cancelled.current || i >= lines.length) {
        setPlaying(false);
        setLineIndex(-1);
        return;
      }
      setLineIndex(i);
      const u = new SpeechSynthesisUtterance(lines[i].text);
      u.lang = "ja-JP";
      if (voice) u.voice = voice;
      u.rate = 0.92;
      u.pitch = 1;
      u.onend = () => {
        if (cancelled.current) return;
        window.setTimeout(() => speakAt(i + 1), 350);
      };
      u.onerror = () => {
        if (cancelled.current) return;
        window.setTimeout(() => speakAt(i + 1), 350);
      };
      window.speechSynthesis.speak(u);
    };

    speakAt(0);
  }, [lines]);

  return { supported, playing, lineIndex, play, stop };
}
