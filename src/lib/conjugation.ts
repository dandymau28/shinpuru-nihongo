import type { Bi } from "./i18n";

/**
 * Japanese verb + adjective conjugation engine for the practice trainer and the
 * in-lesson drills. Rules operate on plain strings; because inflection only ever
 * touches trailing kana, the same transform is applied to a word's kana and
 * kanji spellings to produce both answers.
 */

// ---------------------------------------------------------------------------
// Word model
// ---------------------------------------------------------------------------

export type WordClass =
  | "godan"
  | "ichidan"
  | "suru"
  | "kuru"
  | "iku"
  | "i-adj"
  | "ii-adj"
  | "na-adj";

export type WordKind = "verb" | "i-adj" | "na-adj";

export interface Word {
  /** Dictionary form with furigana notation, e.g. "書[か]く". */
  dict: string;
  /** Plain kana dictionary form, e.g. "かく". */
  kana: string;
  /** Plain kanji dictionary form (no furigana), e.g. "書く". */
  kanji: string;
  romaji: string;
  cls: WordClass;
  meaning: Bi;
  jlpt: "N5" | "N4";
}

export function wordKind(cls: WordClass): WordKind {
  if (cls === "i-adj" || cls === "ii-adj") return "i-adj";
  if (cls === "na-adj") return "na-adj";
  return "verb";
}

// ---------------------------------------------------------------------------
// Kana row maps (う-row → other rows)
// ---------------------------------------------------------------------------

const I_ROW: Record<string, string> = { う: "い", く: "き", ぐ: "ぎ", す: "し", つ: "ち", ぬ: "に", ぶ: "び", む: "み", る: "り" };
const A_ROW: Record<string, string> = { う: "わ", く: "か", ぐ: "が", す: "さ", つ: "た", ぬ: "な", ぶ: "ば", む: "ま", る: "ら" };
const E_ROW: Record<string, string> = { う: "え", く: "け", ぐ: "げ", す: "せ", つ: "て", ぬ: "ね", ぶ: "べ", む: "め", る: "れ" };
const O_ROW: Record<string, string> = { う: "お", く: "こ", ぐ: "ご", す: "そ", つ: "と", ぬ: "の", ぶ: "ぼ", む: "も", る: "ろ" };

function godanTail(word: string, past: boolean): string {
  const body = word.slice(0, -1);
  const end = word.slice(-1);
  const t = past ? "た" : "て";
  const d = past ? "だ" : "で";
  switch (end) {
    case "う":
    case "つ":
    case "る":
      return body + "っ" + t;
    case "ぬ":
    case "ぶ":
    case "む":
      return body + "ん" + d;
    case "く":
      return body + "い" + t;
    case "ぐ":
      return body + "い" + d;
    case "す":
      return body + "し" + t;
    default:
      return word + t;
  }
}

// ---------------------------------------------------------------------------
// Form catalog
// ---------------------------------------------------------------------------

export type FormCategory =
  | "predicate"
  | "te"
  | "volition"
  | "passive-causative"
  | "command"
  | "conditional"
  | "adjective";

export interface ConjForm {
  id: string;
  label: Bi;
  jp: string;
  emoji: string;
  category: FormCategory;
  applies: WordKind[];
  tier: "N5" | "N4";
  explain: Bi;
}

const V = "verb" as const;
const I = "i-adj" as const;
const NA = "na-adj" as const;

export const CONJ_FORMS: ConjForm[] = [
  // --- Verb: predicate matrix -------------------------------------------
  {
    id: "plain-nonpast-neg",
    label: { en: "Plain negative", id: "Biasa negatif" },
    jp: "〜ない",
    emoji: "🚫",
    category: "predicate",
    applies: [V],
    tier: "N5",
    explain: {
      en: "Godan: う-row → あ-row + ない (う→わ). Ichidan: + ない. する→しない, 来る→こない.",
      id: "Godan: baris う → baris あ + ない (う→わ). Ichidan: + ない. する→しない, 来る→こない.",
    },
  },
  {
    id: "plain-past",
    label: { en: "Plain past", id: "Biasa lampau" },
    jp: "〜た",
    emoji: "⏮️",
    category: "predicate",
    applies: [V],
    tier: "N5",
    explain: {
      en: "Same sound changes as て-form: く→いた, ぐ→いだ, う・つ・る→った, ぬ・ぶ・む→んだ, す→した. 行く→行った.",
      id: "Perubahan bunyi sama dengan bentuk て: く→いた, ぐ→いだ, う・つ・る→った, ぬ・ぶ・む→んだ, す→した. 行く→行った.",
    },
  },
  {
    id: "plain-past-neg",
    label: { en: "Plain past negative", id: "Biasa lampau negatif" },
    jp: "〜なかった",
    emoji: "🚫",
    category: "predicate",
    applies: [V],
    tier: "N5",
    explain: {
      en: "Take the plain negative and change 〜ない → 〜なかった.",
      id: "Ambil bentuk biasa negatif lalu ubah 〜ない → 〜なかった.",
    },
  },
  {
    id: "polite-nonpast",
    label: { en: "Polite", id: "Sopan" },
    jp: "〜ます",
    emoji: "🙇",
    category: "predicate",
    applies: [V],
    tier: "N5",
    explain: {
      en: "Godan: う-row → い-row + ます. Ichidan: + ます. する→します, 来る→きます.",
      id: "Godan: baris う → baris い + ます. Ichidan: + ます. する→します, 来る→きます.",
    },
  },
  {
    id: "polite-nonpast-neg",
    label: { en: "Polite negative", id: "Sopan negatif" },
    jp: "〜ません",
    emoji: "🙇",
    category: "predicate",
    applies: [V],
    tier: "N5",
    explain: {
      en: "ます-stem + ません.",
      id: "Akar ます + ません.",
    },
  },
  {
    id: "polite-past",
    label: { en: "Polite past", id: "Sopan lampau" },
    jp: "〜ました",
    emoji: "🙇",
    category: "predicate",
    applies: [V],
    tier: "N5",
    explain: {
      en: "ます-stem + ました.",
      id: "Akar ます + ました.",
    },
  },
  {
    id: "polite-past-neg",
    label: { en: "Polite past negative", id: "Sopan lampau negatif" },
    jp: "〜ませんでした",
    emoji: "🙇",
    category: "predicate",
    applies: [V],
    tier: "N5",
    explain: {
      en: "ます-stem + ませんでした.",
      id: "Akar ます + ませんでした.",
    },
  },
  // --- Verb: て family -------------------------------------------------
  {
    id: "te",
    label: { en: "て-form", id: "Bentuk て" },
    jp: "〜て",
    emoji: "🔗",
    category: "te",
    applies: [V],
    tier: "N5",
    explain: {
      en: "Godan: う・つ・る→って, ぬ・ぶ・む→んで, く→いて, ぐ→いで, す→して (行く→行って). Ichidan: +て. する→して, 来る→きて.",
      id: "Godan: う・つ・る→って, ぬ・ぶ・む→んで, く→いて, ぐ→いで, す→して (行く→行って). Ichidan: +て. する→して, 来る→きて.",
    },
  },
  {
    id: "tai",
    label: { en: "Want to", id: "Ingin" },
    jp: "〜たい",
    emoji: "🙋",
    category: "te",
    applies: [V],
    tier: "N5",
    explain: {
      en: "ます-stem + たい. Conjugates like an い-adjective afterwards.",
      id: "Akar ます + たい. Setelahnya berkonjugasi seperti kata sifat い.",
    },
  },
  {
    id: "tai-neg",
    label: { en: "Don't want to", id: "Tidak ingin" },
    jp: "〜たくない",
    emoji: "🙅",
    category: "te",
    applies: [V],
    tier: "N4",
    explain: {
      en: "〜たい → 〜たくない (い-adjective negative).",
      id: "〜たい → 〜たくない (negatif kata sifat い).",
    },
  },
  // Volition / potential
  {
    id: "volitional",
    label: { en: "Volitional (let's / shall)", id: "Ajakan (ayo)" },
    jp: "〜よう / おう",
    emoji: "🤝",
    category: "volition",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Godan: う-row → お-row + う. Ichidan: + よう. する→しよう, 来る→こよう.",
      id: "Godan: baris う → baris お + う. Ichidan: + よう. する→しよう, 来る→こよう.",
    },
  },
  {
    id: "volitional-polite",
    label: { en: "Volitional polite", id: "Ajakan sopan" },
    jp: "〜ましょう",
    emoji: "🤝",
    category: "volition",
    applies: [V],
    tier: "N5",
    explain: {
      en: "ます-stem + ましょう.",
      id: "Akar ます + ましょう.",
    },
  },
  {
    id: "potential",
    label: { en: "Potential (can do)", id: "Potensial (bisa)" },
    jp: "〜られる / 〜える",
    emoji: "💪",
    category: "volition",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Godan: う-row → え-row + る. Ichidan: + られる (casual 〜れる). する→できる, 来る→こられる.",
      id: "Godan: baris う → baris え + る. Ichidan: + られる (santai 〜れる). する→できる, 来る→こられる.",
    },
  },
  // Passive / causative
  {
    id: "passive",
    label: { en: "Passive (is done to)", id: "Pasif (dikenai)" },
    jp: "〜られる / 〜あれる",
    emoji: "🎭",
    category: "passive-causative",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Godan: う-row → あ-row + れる. Ichidan: + られる. する→される, 来る→こられる.",
      id: "Godan: baris う → baris あ + れる. Ichidan: + られる. する→される, 来る→こられる.",
    },
  },
  {
    id: "causative",
    label: { en: "Causative (make / let do)", id: "Kausatif (menyuruh / membiarkan)" },
    jp: "〜させる / 〜あせる",
    emoji: "🎬",
    category: "passive-causative",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Godan: う-row → あ-row + せる. Ichidan: + させる. する→させる, 来る→こさせる.",
      id: "Godan: baris う → baris あ + せる. Ichidan: + させる. する→させる, 来る→こさせる.",
    },
  },
  {
    id: "causative-passive",
    label: { en: "Causative-passive (be made to)", id: "Kausatif-pasif (dipaksa)" },
    jp: "〜させられる",
    emoji: "😩",
    category: "passive-causative",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Causative + passive. Godan often contracts: 書かせられる → 書かされる (not for す-verbs).",
      id: "Kausatif + pasif. Godan sering menyusut: 書かせられる → 書かされる (kecuali verba す).",
    },
  },
  // Commands
  {
    id: "imperative",
    label: { en: "Imperative (do it!)", id: "Perintah (lakukan!)" },
    jp: "〜ろ / 〜え",
    emoji: "❗",
    category: "command",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Godan: う-row → え-row. Ichidan: + ろ. する→しろ, 来る→こい.",
      id: "Godan: baris う → baris え. Ichidan: + ろ. する→しろ, 来る→こい.",
    },
  },
  {
    id: "prohibitive",
    label: { en: "Prohibitive (don't!)", id: "Larangan (jangan!)" },
    jp: "〜な",
    emoji: "⛔",
    category: "command",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Dictionary form + な.",
      id: "Bentuk kamus + な.",
    },
  },
  // Conditionals
  {
    id: "ba",
    label: { en: "〜ば conditional", id: "Pengandaian 〜ば" },
    jp: "〜ば",
    emoji: "🔀",
    category: "conditional",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Godan: う-row → え-row + ば. Ichidan: + れば. する→すれば, 来る→くれば.",
      id: "Godan: baris う → baris え + ば. Ichidan: + れば. する→すれば, 来る→くれば.",
    },
  },
  {
    id: "tara",
    label: { en: "〜たら conditional", id: "Pengandaian 〜たら" },
    jp: "〜たら",
    emoji: "🔀",
    category: "conditional",
    applies: [V],
    tier: "N4",
    explain: {
      en: "Plain past + ら.",
      id: "Bentuk biasa lampau + ら.",
    },
  },
  // --- Adjectives (い / な) -------------------------------------------
  {
    id: "adj-neg",
    label: { en: "Adj · negative", id: "Sifat · negatif" },
    jp: "〜くない / じゃない",
    emoji: "🚫",
    category: "adjective",
    applies: [I, NA],
    tier: "N5",
    explain: {
      en: "い-adj: 〜くない (いい→よくない). な-adj: + じゃない (also ではない).",
      id: "Sifat い: 〜くない (いい→よくない). Sifat な: + じゃない (juga ではない).",
    },
  },
  {
    id: "adj-past",
    label: { en: "Adj · past", id: "Sifat · lampau" },
    jp: "〜かった / だった",
    emoji: "⏮️",
    category: "adjective",
    applies: [I, NA],
    tier: "N5",
    explain: {
      en: "い-adj: 〜かった (いい→よかった). な-adj: + だった. Never 〜いでした.",
      id: "Sifat い: 〜かった (いい→よかった). Sifat な: + だった. Bukan 〜いでした.",
    },
  },
  {
    id: "adj-past-neg",
    label: { en: "Adj · past negative", id: "Sifat · lampau negatif" },
    jp: "〜くなかった / じゃなかった",
    emoji: "🚫",
    category: "adjective",
    applies: [I, NA],
    tier: "N5",
    explain: {
      en: "い-adj: 〜くなかった. な-adj: + じゃなかった.",
      id: "Sifat い: 〜くなかった. Sifat な: + じゃなかった.",
    },
  },
  {
    id: "adj-polite",
    label: { en: "Adj · polite", id: "Sifat · sopan" },
    jp: "〜いです / です",
    emoji: "🙇",
    category: "adjective",
    applies: [I, NA],
    tier: "N5",
    explain: {
      en: "Both types add です to the dictionary form.",
      id: "Kedua jenis menambahkan です ke bentuk kamus.",
    },
  },
  {
    id: "adj-polite-past",
    label: { en: "Adj · polite past", id: "Sifat · sopan lampau" },
    jp: "〜かったです / でした",
    emoji: "🙇",
    category: "adjective",
    applies: [I, NA],
    tier: "N5",
    explain: {
      en: "い-adj: 〜かったです. な-adj: + でした.",
      id: "Sifat い: 〜かったです. Sifat な: + でした.",
    },
  },
  {
    id: "adj-te",
    label: { en: "Adj · linking て", id: "Sifat · penghubung て" },
    jp: "〜くて / で",
    emoji: "🔗",
    category: "adjective",
    applies: [I, NA],
    tier: "N5",
    explain: {
      en: "い-adj: 〜くて (いい→よくて). な-adj: + で. Joins clauses.",
      id: "Sifat い: 〜くて (いい→よくて). Sifat な: + で. Menyambung klausa.",
    },
  },
  {
    id: "adj-adverb",
    label: { en: "Adj · adverbial", id: "Sifat · keterangan" },
    jp: "〜く / に",
    emoji: "🏃",
    category: "adjective",
    applies: [I, NA],
    tier: "N5",
    explain: {
      en: "い-adj: 〜い → 〜く (いい→よく). な-adj: + に.",
      id: "Sifat い: 〜い → 〜く (いい→よく). Sifat な: + に.",
    },
  },
  {
    id: "adj-ba",
    label: { en: "Adj · 〜ば / なら", id: "Sifat · 〜ば / なら" },
    jp: "〜ければ / なら",
    emoji: "🔀",
    category: "adjective",
    applies: [I, NA],
    tier: "N4",
    explain: {
      en: "い-adj: 〜ければ. な-adj: 〜なら (also 〜ならば).",
      id: "Sifat い: 〜ければ. Sifat な: 〜なら (juga 〜ならば).",
    },
  },
  {
    id: "adj-tara",
    label: { en: "Adj · 〜たら", id: "Sifat · 〜たら" },
    jp: "〜かったら / だったら",
    emoji: "🔀",
    category: "adjective",
    applies: [I, NA],
    tier: "N4",
    explain: {
      en: "い-adj: 〜かったら. な-adj: 〜だったら.",
      id: "Sifat い: 〜かったら. Sifat な: 〜だったら.",
    },
  },
];

export const FORM_BY_ID = new Map(CONJ_FORMS.map((f) => [f.id, f]));

// ---------------------------------------------------------------------------
// Conjugation
// ---------------------------------------------------------------------------

export interface ConjResult {
  /** Canonical kana answer. */
  kana: string;
  /** Kanji spelling of the answer. */
  kanji: string;
  /** Everything accepted as correct (compared loosely). */
  accept: string[];
  note?: Bi;
}

/** Apply a single verb transform to a string that ends like a dictionary verb. */
function verbTransform(s: string, cls: WordClass, formId: string): string | null {
  // Irregulars -----------------------------------------------------------
  if (cls === "suru") {
    const pre = s.endsWith("する") ? s.slice(0, -2) : s;
    const m: Record<string, string> = {
      "plain-nonpast": "する",
      "plain-nonpast-neg": "しない",
      "plain-past": "した",
      "plain-past-neg": "しなかった",
      "polite-nonpast": "します",
      "polite-nonpast-neg": "しません",
      "polite-past": "しました",
      "polite-past-neg": "しませんでした",
      te: "して",
      tai: "したい",
      "tai-neg": "したくない",
      volitional: "しよう",
      "volitional-polite": "しましょう",
      potential: "できる",
      passive: "される",
      causative: "させる",
      "causative-passive": "させられる",
      imperative: "しろ",
      prohibitive: "するな",
      ba: "すれば",
      tara: "したら",
    };
    return m[formId] != null ? pre + m[formId] : null;
  }
  if (cls === "kuru") {
    const kana = !s.includes("来");
    const pre = kana ? s.slice(0, -2) : s.slice(0, -1); // strip くる / る
    const K = (a: string, b: string) => pre + (kana ? a : b);
    switch (formId) {
      case "plain-nonpast": return s;
      case "plain-nonpast-neg": return K("こない", "ない");
      case "plain-past": return K("きた", "た");
      case "plain-past-neg": return K("こなかった", "なかった");
      case "polite-nonpast": return K("きます", "ます");
      case "polite-nonpast-neg": return K("きません", "ません");
      case "polite-past": return K("きました", "ました");
      case "polite-past-neg": return K("きませんでした", "ませんでした");
      case "te": return K("きて", "て");
      case "tai": return K("きたい", "たい");
      case "tai-neg": return K("きたくない", "たくない");
      case "volitional": return K("こよう", "よう");
      case "volitional-polite": return K("きましょう", "ましょう");
      case "potential": return K("こられる", "られる");
      case "passive": return K("こられる", "られる");
      case "causative": return K("こさせる", "させる");
      case "causative-passive": return K("こさせられる", "させられる");
      case "imperative": return K("こい", "い");
      case "prohibitive": return K("くるな", "るな");
      case "ba": return K("くれば", "れば");
      case "tara": return K("きたら", "たら");
      default: return null;
    }
  }

  // Regular godan / ichidan / iku --------------------------------------
  const isIchidan = cls === "ichidan";
  const body = s.slice(0, -1);
  const end = s.slice(-1);
  const stem = isIchidan ? body : body + (I_ROW[end] ?? end); // ます-stem
  const a = isIchidan ? body : body + (A_ROW[end] ?? end);
  const e = isIchidan ? body : body + (E_ROW[end] ?? end);
  const o = isIchidan ? body : body + (O_ROW[end] ?? end);
  const teForm = isIchidan
    ? body + "て"
    : cls === "iku"
      ? body + "って"
      : godanTail(s, false);
  const taForm = isIchidan
    ? body + "た"
    : cls === "iku"
      ? body + "った"
      : godanTail(s, true);

  switch (formId) {
    case "plain-nonpast": return s;
    case "plain-nonpast-neg": return isIchidan ? body + "ない" : a + "ない";
    case "plain-past": return taForm;
    case "plain-past-neg": return isIchidan ? body + "なかった" : a + "なかった";
    case "polite-nonpast": return stem + "ます";
    case "polite-nonpast-neg": return stem + "ません";
    case "polite-past": return stem + "ました";
    case "polite-past-neg": return stem + "ませんでした";
    case "te": return teForm;
    case "tai": return stem + "たい";
    case "tai-neg": return stem + "たくない";
    case "volitional": return isIchidan ? body + "よう" : o + "う";
    case "volitional-polite": return stem + "ましょう";
    case "potential": return isIchidan ? body + "られる" : e + "る";
    case "passive": return isIchidan ? body + "られる" : a + "れる";
    case "causative": return isIchidan ? body + "させる" : a + "せる";
    case "causative-passive":
      return isIchidan ? body + "させられる" : a + "せられる";
    case "imperative": return isIchidan ? body + "ろ" : e;
    case "prohibitive": return s + "な";
    case "ba": return isIchidan ? body + "れば" : e + "ば";
    case "tara": return taForm + "ら";
    default: return null;
  }
}

/** Adjective form ids map onto the shared transform logic. */
const ADJ_ALIAS: Record<string, string> = {
  "adj-neg": "plain-nonpast-neg",
  "adj-past": "plain-past",
  "adj-past-neg": "plain-past-neg",
  "adj-polite": "polite-nonpast",
  "adj-polite-past": "polite-past",
  "adj-te": "te",
  "adj-adverb": "adverb",
  "adj-ba": "ba",
  "adj-tara": "tara",
};

function adjTransform(s: string, cls: WordClass, formIdRaw: string): string | null {
  const formId = ADJ_ALIAS[formIdRaw] ?? formIdRaw;
  if (cls === "na-adj") {
    switch (formId) {
      case "plain-nonpast": return s + "だ";
      case "plain-nonpast-neg": return s + "じゃない";
      case "plain-past": return s + "だった";
      case "plain-past-neg": return s + "じゃなかった";
      case "polite-nonpast": return s + "です";
      case "polite-nonpast-neg": return s + "じゃないです";
      case "polite-past": return s + "でした";
      case "polite-past-neg": return s + "じゃなかったです";
      case "te": return s + "で";
      case "adverb": return s + "に";
      case "ba": return s + "なら";
      case "tara": return s + "だったら";
      default: return null;
    }
  }
  // い-adjective (regular) / いい (irregular → よ-)
  const irregular = cls === "ii-adj";
  const body = irregular
    ? s.slice(0, -2) + "よ" // いい / かっこいい → …よ
    : s.slice(0, -1);
  switch (formId) {
    case "plain-nonpast": return s;
    case "plain-nonpast-neg": return body + "くない";
    case "plain-past": return body + "かった";
    case "plain-past-neg": return body + "くなかった";
    case "polite-nonpast": return s + "です";
    case "polite-nonpast-neg": return body + "くないです";
    case "polite-past": return body + "かったです";
    case "polite-past-neg": return body + "くなかったです";
    case "te": return body + "くて";
    case "adverb": return body + "く";
    case "ba": return body + "ければ";
    case "tara": return body + "かったら";
    default: return null;
  }
}

/** Alternate acceptable answers for a given form. */
function alternates(kanaAns: string, cls: WordClass, formIdRaw: string): string[] {
  const formId = ADJ_ALIAS[formIdRaw] ?? formIdRaw;
  const out: string[] = [];
  if (cls === "ichidan" && (formId === "potential")) {
    // ら-less potential: 見られる → 見れる
    out.push(kanaAns.replace(/られる$/, "れる"));
  }
  if (formId === "causative-passive" && (cls === "godan" || cls === "iku")) {
    // contracted: 書かせられる → 書かされる
    out.push(kanaAns.replace(/せられる$/, "される"));
  }
  if (cls === "na-adj") {
    if (formId === "plain-nonpast-neg") out.push(kanaAns.replace(/じゃない$/, "ではない"));
    if (formId === "plain-past-neg") out.push(kanaAns.replace(/じゃなかった$/, "ではなかった"));
    if (formId === "polite-nonpast-neg") {
      out.push(kanaAns.replace(/じゃないです$/, "じゃありません"));
      out.push(kanaAns.replace(/じゃないです$/, "ではありません"));
    }
    if (formId === "polite-past-neg") {
      out.push(kanaAns.replace(/じゃなかったです$/, "じゃありませんでした"));
    }
    if (formId === "ba") out.push(kanaAns + "ば");
  }
  if ((cls === "i-adj" || cls === "ii-adj")) {
    if (formId === "polite-nonpast-neg") out.push(kanaAns.replace(/くないです$/, "くありません"));
    if (formId === "polite-past-neg") out.push(kanaAns.replace(/くなかったです$/, "くありませんでした"));
  }
  return out;
}

export function canConjugate(word: Word, formId: string): boolean {
  const form = FORM_BY_ID.get(formId);
  if (!form) return false;
  return form.applies.includes(wordKind(word.cls));
}

export function conjugate(word: Word, formId: string): ConjResult | null {
  const kind = wordKind(word.cls);
  const fn = kind === "verb" ? verbTransform : adjTransform;
  const kana = fn(word.kana, word.cls, formId);
  const kanji = fn(word.kanji, word.cls, formId);
  if (kana == null || kanji == null) return null;

  const accept = new Set<string>([kana, kanji, ...alternates(kana, word.cls, formId)]);
  // Also accept the kanji-body spelling of each alternate.
  for (const alt of alternates(kana, word.cls, formId)) {
    const kj = fn(word.kanji, word.cls, formId);
    if (kj) accept.add(kj.replace(kana, alt));
  }

  const form = FORM_BY_ID.get(formId);
  return { kana, kanji, accept: [...accept], note: potentialNote(word, formId) ?? form?.explain };
}

function potentialNote(word: Word, formId: string): Bi | undefined {
  if (word.cls === "ichidan" && formId === "potential") {
    return { en: "Casual 〜れる (見れる) is also accepted.", id: "Bentuk santai 〜れる (見れる) juga diterima." };
  }
  if ((word.cls === "ichidan") && (formId === "passive" || formId === "potential")) {
    return {
      en: "For ichidan verbs, passive and potential share this form.",
      id: "Untuk verba ichidan, bentuk pasif dan potensial sama.",
    };
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Back-compat shims for the in-lesson drills (src/data/verbs-n5.ts)
// ---------------------------------------------------------------------------

export type VerbGroup = "godan" | "ichidan" | "irregular";
export interface VerbEntry {
  dict: string;
  kana: string;
  group: VerbGroup;
  meaning: Bi;
}

export type FormId =
  | "masu"
  | "te"
  | "nai"
  | "ta"
  | "nakatta"
  | "potential"
  | "volitional";

export const FORM_LABEL: Record<FormId, Bi> = {
  masu: { en: "ます-form", id: "bentuk ます" },
  te: { en: "て-form", id: "bentuk て" },
  nai: { en: "ない-form", id: "bentuk ない" },
  ta: { en: "た-form (plain past)", id: "bentuk た (lampau biasa)" },
  nakatta: { en: "なかった-form", id: "bentuk なかった" },
  potential: { en: "potential", id: "bentuk potensial" },
  volitional: { en: "volitional (〜よう)", id: "bentuk ajakan (〜よう)" },
};

const LEGACY_FORM: Record<FormId, string> = {
  masu: "polite-nonpast",
  te: "te",
  nai: "plain-nonpast-neg",
  ta: "plain-past",
  nakatta: "plain-past-neg",
  potential: "potential",
  volitional: "volitional",
};

function legacyClass(v: Pick<VerbEntry, "kana" | "group">): WordClass {
  if (v.group === "godan") return v.kana === "いく" ? "iku" : "godan";
  if (v.group === "ichidan") return "ichidan";
  if (v.kana.endsWith("する")) return "suru";
  if (v.kana.endsWith("くる") || v.kana === "くる") return "kuru";
  return "godan";
}

export function conjugateKana(
  v: Pick<VerbEntry, "kana" | "group">,
  form: FormId,
): string {
  const out = verbTransform(v.kana, legacyClass(v), LEGACY_FORM[form]);
  return out ?? v.kana;
}
