/**
 * Wāpuro-style rōmaji → hiragana, for learners practising without a Japanese IME.
 * Converts greedily left to right; unconverted trailing romaji (a partial
 * syllable being typed) is left as-is.
 */

const DIGRAPHS: Record<string, string> = {
  kya: "きゃ", kyu: "きゅ", kyo: "きょ",
  gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
  sha: "しゃ", shu: "しゅ", sho: "しょ", sya: "しゃ", syu: "しゅ", syo: "しょ",
  ja: "じゃ", ju: "じゅ", jo: "じょ", jya: "じゃ", jyu: "じゅ", jyo: "じょ",
  cha: "ちゃ", chu: "ちゅ", cho: "ちょ", tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ",
  nya: "にゃ", nyu: "にゅ", nyo: "にょ",
  hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",
  bya: "びゃ", byu: "びゅ", byo: "びょ",
  pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
  mya: "みゃ", myu: "みゅ", myo: "みょ",
  rya: "りゃ", ryu: "りゅ", ryo: "りょ",
};

const BASE: Record<string, string> = {
  a: "あ", i: "い", u: "う", e: "え", o: "お",
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
  ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
  sa: "さ", si: "し", shi: "し", su: "す", se: "せ", so: "そ",
  za: "ざ", zi: "じ", ji: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
  ta: "た", ti: "ち", chi: "ち", tu: "つ", tsu: "つ", te: "て", to: "と",
  da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど",
  na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",
  ha: "は", hi: "ひ", fu: "ふ", hu: "ふ", he: "へ", ho: "ほ",
  ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",
  pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
  ma: "ま", mi: "み", mu: "む", me: "め", mo: "も",
  ya: "や", yu: "ゆ", yo: "よ",
  ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",
  wa: "わ", wo: "を", nn: "ん",
  "-": "ー", ".": "。", ",": "、",
};

const VOWELS = new Set(["a", "i", "u", "e", "o"]);

export function romajiToKana(input: string): string {
  let s = input.toLowerCase();
  let out = "";
  let i = 0;

  while (i < s.length) {
    const c = s[i];

    // small tsu: doubled consonant (kk, tt, ...) except nn
    if (
      c === s[i + 1] &&
      !VOWELS.has(c) &&
      c !== "n" &&
      /[a-z]/.test(c)
    ) {
      out += "っ";
      i += 1;
      continue;
    }

    // ん: "n'" or "n" not followed by a vowel/y
    if (c === "n") {
      const next = s[i + 1];
      if (next === "'" || next === " ") {
        out += "ん";
        i += 2;
        continue;
      }
      if (next === undefined || (!VOWELS.has(next) && next !== "y" && next !== "n")) {
        out += "ん";
        i += 1;
        continue;
      }
    }

    const three = s.slice(i, i + 3);
    if (DIGRAPHS[three]) {
      out += DIGRAPHS[three];
      i += 3;
      continue;
    }
    const threeBase = BASE[three];
    if (threeBase) {
      out += threeBase;
      i += 3;
      continue;
    }
    const two = s.slice(i, i + 2);
    if (DIGRAPHS[two]) {
      out += DIGRAPHS[two];
      i += 2;
      continue;
    }
    if (BASE[two]) {
      out += BASE[two];
      i += 2;
      continue;
    }
    const one = s.slice(i, i + 1);
    if (BASE[one]) {
      out += BASE[one];
      i += 1;
      continue;
    }

    // leave as-is (mid-syllable typing)
    out += c;
    i += 1;
  }

  return out;
}
