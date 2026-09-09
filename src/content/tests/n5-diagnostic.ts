import type { ContentModule, McqQuestion } from "@/lib/types";

const grammar: McqQuestion[] = [
  {
    kind: "mcq",
    ja: "わたし＿＿ がくせいです。",
    prompt: { en: "Choose the particle.", id: "Pilih partikel." },
    options: ["は", "を", "で", "に"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "きのう えいが＿＿ みました。",
    prompt: { en: "Choose the particle.", id: "Pilih partikel." },
    options: ["が", "を", "に", "へ"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "としょかん＿＿ ほんを よみます。",
    prompt: { en: "Choose the particle.", id: "Pilih partikel." },
    options: ["に", "を", "で", "と"],
    answer: 2,
  },
  {
    kind: "mcq",
    ja: "７じ＿＿ おきます。",
    prompt: { en: "Choose the particle.", id: "Pilih partikel." },
    options: ["に", "で", "を", "が"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "この みずは つめた＿＿です。",
    prompt: { en: "Complete the adjective.", id: "Lengkapi kata sifatnya." },
    options: ["く", "い", "な", "だ"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "きのうの テストは かんたん＿＿。",
    prompt: { en: "Past tense of a な-adjective.", id: "Bentuk lampau kata sifat な." },
    options: ["かったです", "でした", "いでした", "です"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "まいあさ コーヒーを ＿＿。",
    prompt: { en: "Choose the verb.", id: "Pilih kata kerja." },
    options: ["のみます", "のみました", "のんで", "のむだ"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "ここで しゃしんを とっても ＿＿ですか。",
    prompt: { en: "Asking permission.", id: "Meminta izin." },
    options: ["だめ", "いい", "ほしい", "じょうず"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "テーブルの うえに りんごが ＿＿。",
    prompt: { en: "Choose the verb.", id: "Pilih kata kerja." },
    options: ["います", "あります", "です", "なります"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "きょうは あめ＿＿、うちに います。",
    prompt: { en: "\"Because it's raining…\"", id: "\"Karena hujan…\"" },
    options: ["から", "でも", "が", "まで"],
    answer: 0,
  },
];

const vocabKanji: McqQuestion[] = [
  {
    kind: "mcq",
    ja: "「あたらしい」の はんたいは？",
    prompt: { en: "The opposite of あたらしい (new) is:", id: "Lawan kata あたらしい (baru):" },
    options: ["ふるい", "たかい", "おおきい", "はやい"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "でんわを ＿＿。",
    prompt: { en: "Which verb collocates with でんわ?", id: "Kata kerja mana yang cocok dengan でんわ?" },
    options: ["かけます", "あけます", "つけます", "のみます"],
    answer: 0,
  },
  {
    kind: "mcq",
    prompt: { en: "「学校」 is read:", id: "「学校」 dibaca:" },
    options: ["がっこう", "がくこう", "かっこう", "がくもん"],
    answer: 0,
  },
  {
    kind: "mcq",
    prompt: { en: "「時間」 is read:", id: "「時間」 dibaca:" },
    options: ["じかん", "じっかん", "ときあいだ", "じま"],
    answer: 0,
  },
  {
    kind: "mcq",
    prompt: { en: "Which kanji means \"to buy\"?", id: "Kanji mana yang berarti \"membeli\"?" },
    options: ["売", "買", "貸", "借"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "まいにち にほんごを ＿＿ します。",
    prompt: { en: "Fill the noun (study).", id: "Isi nomina (belajar)." },
    options: ["べんきょう", "しごと", "りょこう", "かいもの"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "「ちかてつ」の いみは？",
    prompt: { en: "ちかてつ means:", id: "ちかてつ berarti:" },
    options: [
      { en: "subway", id: "kereta bawah tanah" },
      { en: "map", id: "peta" },
      { en: "express train", id: "kereta ekspres" },
      { en: "ticket gate", id: "gerbang tiket" },
    ],
    answer: 0,
  },
  {
    kind: "mcq",
    prompt: { en: "「毎週」 is read:", id: "「毎週」 dibaca:" },
    options: ["まいしゅう", "まいあさ", "まいばん", "まいかい"],
    answer: 0,
  },
];

const reading: McqQuestion[] = [
  {
    kind: "mcq",
    ja: "（メモ）「10じに えきの まえで あいましょう。おくれたら でんわして ください。」",
    prompt: { en: "Where should they meet?", id: "Di mana mereka bertemu?" },
    options: [
      { en: "In front of the station at 10", id: "Di depan stasiun jam 10" },
      { en: "Inside the station at 10", id: "Di dalam stasiun jam 10" },
      { en: "At home at 10", id: "Di rumah jam 10" },
      { en: "They didn't decide", id: "Belum diputuskan" },
    ],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "（メモ）つづき: 「おくれたら でんわして ください。」",
    prompt: { en: "What should you do if you're late?", id: "Apa yang harus dilakukan jika terlambat?" },
    options: [
      { en: "Wait at home", id: "Menunggu di rumah" },
      { en: "Phone them", id: "Menelepon" },
      { en: "Send a letter", id: "Mengirim surat" },
      { en: "Go to a different station", id: "Pergi ke stasiun lain" },
    ],
    answer: 1,
  },
];

export const n5Diagnostic: ContentModule = {
  type: "test",
  slug: "n5-diagnostic",
  title: { en: "N5 Diagnostic", id: "Diagnostik N5" },
  description: {
    en: "A quick health check before the refresher. Don't stress about the score — it just shows which areas to focus on.",
    id: "Pemeriksaan cepat sebelum penyegaran. Jangan stres soal skor — ini hanya menunjukkan area mana yang perlu difokuskan.",
  },
  groups: [
    { id: "n5-diagnostic:grammar", title: { en: "Grammar", id: "Tata Bahasa" }, questions: grammar },
    { id: "n5-diagnostic:vocab", title: { en: "Vocab & Kanji", id: "Kosakata & Kanji" }, questions: vocabKanji },
    { id: "n5-diagnostic:reading", title: { en: "Reading", id: "Membaca" }, questions: reading },
  ],
};
