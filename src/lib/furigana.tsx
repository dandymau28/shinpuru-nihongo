import { Fragment, type ReactNode } from "react";

/**
 * Renders text written with `漢字[かんじ]` furigana notation.
 *
 * The reading in brackets attaches to the run of kanji (or 々 / ヶ) immediately
 * before it; if there is no kanji there, it attaches to the single preceding
 * character. Everything else is passed through untouched.
 *
 *   "私[わたし]は 学生[がくせい]です"  →  ruby(私・わたし) は ruby(学生・がくせい) です
 */
const TOKEN = /([一-鿿㐀-䶿々〆ヶ]+|.)\[([^\]]+)\]/g;

export function furigana(text: string): ReactNode {
  if (!text) return text;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) out.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    out.push(
      <ruby key={key++}>
        {m[1]}
        <rp>(</rp>
        <rt>{m[2]}</rt>
        <rp>)</rp>
      </ruby>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return out.length === 1 ? out[0] : out;
}

/** Strip furigana notation, leaving `漢字[かんじ]` → `漢字`. */
export function stripFurigana(text: string): string {
  return text.replace(TOKEN, "$1");
}

/** The plain reading form: `漢字[かんじ]` → `かんじ`, other chars kept. */
export function toReading(text: string): string {
  return text.replace(TOKEN, "$2");
}
