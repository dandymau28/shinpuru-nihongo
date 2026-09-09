import type { ContentModule, McqQuestion } from "@/lib/types";

const grammar: McqQuestion[] = [
  { kind: "mcq", ja: "わたしは まいにち コーヒー＿＿ のみます。", prompt: { en: "Particle.", id: "Partikel." }, options: ["を", "が", "に", "で"], answer: 0 },
  { kind: "mcq", ja: "きのう ともだち＿＿ てがみを かきました。", prompt: { en: "Particle (to a person).", id: "Partikel (kepada orang)." }, options: ["に", "を", "で", "が"], answer: 0 },
  { kind: "mcq", ja: "にちようび、うち＿＿ えいがを みます。", prompt: { en: "Particle (place of action).", id: "Partikel (tempat aksi)." }, options: ["で", "に", "へ", "の"], answer: 0 },
  { kind: "mcq", ja: "「この かばんは だれ＿＿ ですか。」", prompt: { en: "\"Whose bag is this?\"", id: "\"Tas siapa ini?\"" }, options: ["の", "が", "を", "に"], answer: 0 },
  { kind: "mcq", ja: "きのうは あまり さむ＿＿。", prompt: { en: "い-adj past negative + polite.", id: "Lampau negatif kata sifat い + sopan." }, options: ["くなかったです", "くないでした", "いじゃなかったです", "かったです"], answer: 0 },
  { kind: "mcq", ja: "この まちは しずか＿＿ きれいです。", prompt: { en: "Linking two な-adjectives.", id: "Menghubungkan dua kata sifat な." }, options: ["で", "くて", "と", "に"], answer: 0 },
  { kind: "mcq", ja: "はやく ＿＿ ください。（asking to come）", prompt: { en: "て-form of 来る.", id: "Bentuk て dari 来る." }, options: ["きて", "こて", "くて", "きって"], answer: 0 },
  { kind: "mcq", ja: "いま あめが ふって ＿＿。", prompt: { en: "Ongoing state.", id: "Keadaan berlangsung." }, options: ["います", "あります", "きます", "みます"], answer: 0 },
  { kind: "mcq", ja: "ここで しゃしんを とっても ＿＿ですか。", prompt: { en: "Permission.", id: "Izin." }, options: ["いい", "だめ", "ほしい", "すき"], answer: 0 },
  { kind: "mcq", ja: "ばんごはんを たべて＿＿、テレビを みます。", prompt: { en: "\"after eating dinner\"", id: "\"setelah makan malam\"" }, options: ["から", "まで", "のに", "ながら"], answer: 0 },
  { kind: "mcq", ja: "つくえの うえ＿＿ ほんが あります。", prompt: { en: "Particle for existence.", id: "Partikel keberadaan." }, options: ["に", "で", "を", "へ"], answer: 0 },
  { kind: "mcq", ja: "きょうは しごとが あります＿＿、いけません。", prompt: { en: "\"…so I can't go.\"", id: "\"…jadi tidak bisa pergi.\"" }, options: ["から", "でも", "が", "し"], answer: 0 },
  { kind: "mcq", ja: "あの ひとは にほんご＿＿ じょうずです。", prompt: { en: "Particle with 上手.", id: "Partikel dengan 上手." }, options: ["が", "を", "に", "で"], answer: 0 },
  { kind: "mcq", ja: "この へやには まど＿＿ ありません。", prompt: { en: "\"There isn't even a window.\"", id: "\"Jendela pun tidak ada.\"" }, options: ["も", "は", "が", "を"], answer: 0 },
  { kind: "mcq", ja: "きのう 3じかん にほんごを ＿＿。", prompt: { en: "Plain past of 勉強する.", id: "Lampau biasa 勉強する." }, options: ["べんきょうした", "べんきょうする", "べんきょうして", "べんきょうしない"], answer: 0 },
];

const vocabKanji: McqQuestion[] = [
  { kind: "mcq", prompt: { en: "「電車」 is read:", id: "「電車」 dibaca:" }, options: ["でんしゃ", "でんき", "てんしゃ", "でんわ"], answer: 0 },
  { kind: "mcq", prompt: { en: "「新しい」 is read:", id: "「新しい」 dibaca:" }, options: ["あたらしい", "あだらしい", "しんしい", "あらたしい"], answer: 0 },
  { kind: "mcq", ja: "でんきを ＿＿。（部屋が あかるく なる）", prompt: { en: "\"turn on the light\"", id: "\"menyalakan lampu\"" }, options: ["つけます", "けします", "しめます", "とめます"], answer: 0 },
  { kind: "mcq", ja: "「いそがしい」の いみは？", prompt: { en: "いそがしい means:", id: "いそがしい berarti:" }, options: [{ en: "busy", id: "sibuk" }, { en: "boring", id: "membosankan" }, { en: "quiet", id: "tenang" }, { en: "easy", id: "mudah" }], answer: 0 },
  { kind: "mcq", prompt: { en: "Which means \"to return (something)\"?", id: "Mana yang berarti \"mengembalikan\"?" }, options: ["かえす", "かえる", "かける", "かりる"], answer: 0 },
  { kind: "mcq", ja: "「らいしゅう」を かんじで かくと？", prompt: { en: "らいしゅう in kanji:", id: "らいしゅう dalam kanji:" }, options: ["来週", "来月", "先週", "今週"], answer: 0 },
  { kind: "mcq", ja: "「あんぜん」の はんたいは？", prompt: { en: "opposite of あんぜん (safe):", id: "lawan あんぜん (aman):" }, options: ["あぶない", "つよい", "べんり", "しずか"], answer: 0 },
];

const reading: McqQuestion[] = [
  {
    kind: "mcq",
    ja: "（おしらせ）「あした、9じから 12じまで みずが とまります。ごちゅういください。」",
    prompt: { en: "What will happen tomorrow?", id: "Apa yang terjadi besok?" },
    options: [
      { en: "The water will be off from 9 to 12", id: "Air mati dari jam 9 sampai 12" },
      { en: "The electricity will be off", id: "Listrik mati" },
      { en: "The building will close", id: "Gedung tutup" },
      { en: "There is a party", id: "Ada pesta" },
    ],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "（にっき）「きょうは たんじょうびだった。かぞくと レストランで ばんごはんを たべた。プレゼントに とけいを もらった。うれしかった。」",
    prompt: { en: "What did the writer receive?", id: "Apa yang diterima penulis?" },
    options: [
      { en: "A watch", id: "Jam tangan" },
      { en: "A cake", id: "Kue" },
      { en: "Money", id: "Uang" },
      { en: "Flowers", id: "Bunga" },
    ],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "つづき: どこで ばんごはんを たべましたか。",
    prompt: { en: "Where did they eat dinner?", id: "Di mana mereka makan malam?" },
    options: [
      { en: "At a restaurant", id: "Di restoran" },
      { en: "At home", id: "Di rumah" },
      { en: "At a friend's house", id: "Di rumah teman" },
      { en: "At school", id: "Di sekolah" },
    ],
    answer: 0,
  },
];

export const n5Exit: ContentModule = {
  type: "test",
  slug: "n5-exit",
  title: { en: "N5 Exit Test", id: "Tes Akhir N5" },
  description: {
    en: "Twenty-five questions across grammar, vocab/kanji, and reading. Aim for 60%+ before moving into the N4 core.",
    id: "Dua puluh lima soal mencakup tata bahasa, kosakata/kanji, dan membaca. Targetkan 60%+ sebelum masuk inti N4.",
  },
  passMark: 60,
  groups: [
    { id: "n5-exit:grammar", title: { en: "Grammar (15)", id: "Tata Bahasa (15)" }, questions: grammar },
    { id: "n5-exit:vocab", title: { en: "Vocab & Kanji (7)", id: "Kosakata & Kanji (7)" }, questions: vocabKanji },
    { id: "n5-exit:reading", title: { en: "Reading (3)", id: "Membaca (3)" }, questions: reading },
  ],
};
