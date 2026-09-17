/**
 * The full hiragana/katakana syllabary as paired entries — one romaji per
 * pair, both scripts derived from the same table so they can never drift
 * out of sync. 104 entries: 46 base (gojūon) + 25 dakuten/handakuten +
 * 33 yōon (combined sounds).
 *
 * ぢ／づ use "di"／"du" as their canonical romaji (not "ji"／"zu") purely so
 * the romaji-prompt is unambiguous in "romaji → kana" mode — じ already owns
 * "ji" and ず already owns "zu". "ji"／"zu" are still accepted as answers.
 */

export type KanaRow = "base" | "dakuten" | "youon";

export interface KanaEntry {
  key: string;
  hira: string;
  kata: string;
  romaji: string;
  /** Extra romanizations accepted as correct (Hepburn/Kunrei variants, etc). */
  accept?: string[];
  row: KanaRow;
}

function K(
  key: string,
  hira: string,
  kata: string,
  romaji: string,
  row: KanaRow,
  accept?: string[],
): KanaEntry {
  return { key, hira, kata, romaji, row, ...(accept ? { accept } : {}) };
}

export const KANA_TABLE: KanaEntry[] = [
  // ---- base (gojūon) — 46 -------------------------------------------------
  K("a", "あ", "ア", "a", "base"),
  K("i", "い", "イ", "i", "base"),
  K("u", "う", "ウ", "u", "base"),
  K("e", "え", "エ", "e", "base"),
  K("o", "お", "オ", "o", "base"),

  K("ka", "か", "カ", "ka", "base"),
  K("ki", "き", "キ", "ki", "base"),
  K("ku", "く", "ク", "ku", "base"),
  K("ke", "け", "ケ", "ke", "base"),
  K("ko", "こ", "コ", "ko", "base"),

  K("sa", "さ", "サ", "sa", "base"),
  K("shi", "し", "シ", "shi", "base", ["si"]),
  K("su", "す", "ス", "su", "base"),
  K("se", "せ", "セ", "se", "base"),
  K("so", "そ", "ソ", "so", "base"),

  K("ta", "た", "タ", "ta", "base"),
  K("chi", "ち", "チ", "chi", "base", ["ti"]),
  K("tsu", "つ", "ツ", "tsu", "base", ["tu"]),
  K("te", "て", "テ", "te", "base"),
  K("to", "と", "ト", "to", "base"),

  K("na", "な", "ナ", "na", "base"),
  K("ni", "に", "ニ", "ni", "base"),
  K("nu", "ぬ", "ヌ", "nu", "base"),
  K("ne", "ね", "ネ", "ne", "base"),
  K("no", "の", "ノ", "no", "base"),

  K("ha", "は", "ハ", "ha", "base"),
  K("hi", "ひ", "ヒ", "hi", "base"),
  K("fu", "ふ", "フ", "fu", "base", ["hu"]),
  K("he", "へ", "ヘ", "he", "base"),
  K("ho", "ほ", "ホ", "ho", "base"),

  K("ma", "ま", "マ", "ma", "base"),
  K("mi", "み", "ミ", "mi", "base"),
  K("mu", "む", "ム", "mu", "base"),
  K("me", "め", "メ", "me", "base"),
  K("mo", "も", "モ", "mo", "base"),

  K("ya", "や", "ヤ", "ya", "base"),
  K("yu", "ゆ", "ユ", "yu", "base"),
  K("yo", "よ", "ヨ", "yo", "base"),

  K("ra", "ら", "ラ", "ra", "base"),
  K("ri", "り", "リ", "ri", "base"),
  K("ru", "る", "ル", "ru", "base"),
  K("re", "れ", "レ", "re", "base"),
  K("ro", "ろ", "ロ", "ro", "base"),

  K("wa", "わ", "ワ", "wa", "base"),
  K("wo", "を", "ヲ", "wo", "base", ["o"]),
  K("n", "ん", "ン", "n", "base", ["nn"]),

  // ---- dakuten / handakuten — 25 ------------------------------------------
  K("ga", "が", "ガ", "ga", "dakuten"),
  K("gi", "ぎ", "ギ", "gi", "dakuten"),
  K("gu", "ぐ", "グ", "gu", "dakuten"),
  K("ge", "げ", "ゲ", "ge", "dakuten"),
  K("go", "ご", "ゴ", "go", "dakuten"),

  K("za", "ざ", "ザ", "za", "dakuten"),
  K("ji", "じ", "ジ", "ji", "dakuten", ["zi"]),
  K("zu", "ず", "ズ", "zu", "dakuten"),
  K("ze", "ぜ", "ゼ", "ze", "dakuten"),
  K("zo", "ぞ", "ゾ", "zo", "dakuten"),

  K("da", "だ", "ダ", "da", "dakuten"),
  K("di", "ぢ", "ヂ", "di", "dakuten", ["ji"]),
  K("du", "づ", "ヅ", "du", "dakuten", ["zu"]),
  K("de", "で", "デ", "de", "dakuten"),
  K("do", "ど", "ド", "do", "dakuten"),

  K("ba", "ば", "バ", "ba", "dakuten"),
  K("bi", "び", "ビ", "bi", "dakuten"),
  K("bu", "ぶ", "ブ", "bu", "dakuten"),
  K("be", "べ", "ベ", "be", "dakuten"),
  K("bo", "ぼ", "ボ", "bo", "dakuten"),

  K("pa", "ぱ", "パ", "pa", "dakuten"),
  K("pi", "ぴ", "ピ", "pi", "dakuten"),
  K("pu", "ぷ", "プ", "pu", "dakuten"),
  K("pe", "ぺ", "ペ", "pe", "dakuten"),
  K("po", "ぽ", "ポ", "po", "dakuten"),

  // ---- yōon (combined sounds) — 33 ----------------------------------------
  K("kya", "きゃ", "キャ", "kya", "youon"),
  K("kyu", "きゅ", "キュ", "kyu", "youon"),
  K("kyo", "きょ", "キョ", "kyo", "youon"),

  K("gya", "ぎゃ", "ギャ", "gya", "youon"),
  K("gyu", "ぎゅ", "ギュ", "gyu", "youon"),
  K("gyo", "ぎょ", "ギョ", "gyo", "youon"),

  K("sha", "しゃ", "シャ", "sha", "youon", ["sya"]),
  K("shu", "しゅ", "シュ", "shu", "youon", ["syu"]),
  K("sho", "しょ", "ショ", "sho", "youon", ["syo"]),

  K("ja", "じゃ", "ジャ", "ja", "youon", ["zya", "jya"]),
  K("ju", "じゅ", "ジュ", "ju", "youon", ["zyu", "jyu"]),
  K("jo", "じょ", "ジョ", "jo", "youon", ["zyo", "jyo"]),

  K("cha", "ちゃ", "チャ", "cha", "youon", ["tya"]),
  K("chu", "ちゅ", "チュ", "chu", "youon", ["tyu"]),
  K("cho", "ちょ", "チョ", "cho", "youon", ["tyo"]),

  K("nya", "にゃ", "ニャ", "nya", "youon"),
  K("nyu", "にゅ", "ニュ", "nyu", "youon"),
  K("nyo", "にょ", "ニョ", "nyo", "youon"),

  K("hya", "ひゃ", "ヒャ", "hya", "youon"),
  K("hyu", "ひゅ", "ヒュ", "hyu", "youon"),
  K("hyo", "ひょ", "ヒョ", "hyo", "youon"),

  K("bya", "びゃ", "ビャ", "bya", "youon"),
  K("byu", "びゅ", "ビュ", "byu", "youon"),
  K("byo", "びょ", "ビョ", "byo", "youon"),

  K("pya", "ぴゃ", "ピャ", "pya", "youon"),
  K("pyu", "ぴゅ", "ピュ", "pyu", "youon"),
  K("pyo", "ぴょ", "ピョ", "pyo", "youon"),

  K("mya", "みゃ", "ミャ", "mya", "youon"),
  K("myu", "みゅ", "ミュ", "myu", "youon"),
  K("myo", "みょ", "ミョ", "myo", "youon"),

  K("rya", "りゃ", "リャ", "rya", "youon"),
  K("ryu", "りゅ", "リュ", "ryu", "youon"),
  K("ryo", "りょ", "リョ", "ryo", "youon"),
];
