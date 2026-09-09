/** Katakana → hiragana. */
function kataToHira(s: string): string {
  return s.replace(/[ァ-ヶ]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0x60),
  );
}

/**
 * Normalise a Japanese (or romaji) answer for loose comparison:
 * NFKC, katakana→hiragana, drop spaces and common punctuation, lowercase.
 */
export function normalizeAnswer(s: string): string {
  return kataToHira((s ?? "").normalize("NFKC"))
    .toLowerCase()
    .replace(/[\s、。，．,.！!？?「」『』（）()・]/g, "")
    .trim();
}

/** Does `input` match any of the accepted answers (after normalisation)? */
export function answerMatches(input: string, accept: string[]): boolean {
  const n = normalizeAnswer(input);
  if (!n) return false;
  return accept.some((a) => normalizeAnswer(a) === n);
}
