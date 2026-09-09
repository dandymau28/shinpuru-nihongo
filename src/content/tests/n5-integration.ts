import type { ContentModule, McqQuestion } from "@/lib/types";

const mixed: McqQuestion[] = [
  {
    kind: "mcq",
    ja: "ともだち＿＿ えいがを みに いきました。",
    prompt: { en: "Particle.", id: "Partikel." },
    options: ["と", "を", "に", "で"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "へやに だれ＿＿ いますか。",
    prompt: { en: "Particle.", id: "Partikel." },
    options: ["は", "が", "を", "も"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "はしを つかって、ごはんを ＿＿。",
    prompt: { en: "Verb.", id: "Kata kerja." },
    options: ["たべます", "のみます", "みます", "ききます"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "きって を かって＿＿、てがみを だします。",
    prompt: { en: "\"after buying stamps…\"", id: "\"setelah membeli perangko…\"" },
    options: ["から", "まで", "ながら", "のに"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "この コーヒーは あつ＿＿ のめません。",
    prompt: { en: "\"too hot to drink\" — link form.", id: "\"terlalu panas untuk diminum\" — bentuk penghubung." },
    options: ["くて", "いで", "で", "に"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "きのうの ばん、ぜんぜん ＿＿。",
    prompt: { en: "Match ぜんぜん.", id: "Cocokkan dengan ぜんぜん." },
    options: ["ねました", "ねませんでした", "ねます", "ねましょう"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "あそこで しゃしんを とっては ＿＿。",
    prompt: { en: "Prohibition.", id: "Larangan." },
    options: ["いいです", "いけません", "ください", "います"],
    answer: 1,
  },
  {
    kind: "mcq",
    ja: "まいにち、6じ＿＿ 8じ＿＿ はたらきます。",
    prompt: { en: "from … to …", id: "dari … sampai …" },
    options: ["から / まで", "まで / から", "に / に", "で / で"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "この レストランは やすくて ＿＿です。",
    prompt: { en: "Natural continuation.", id: "Lanjutan yang wajar." },
    options: ["おいしい", "たかい", "まずい", "せまい"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "あめが ふって いますから、かさを ＿＿。",
    prompt: { en: "Best ending.", id: "Akhiran terbaik." },
    options: ["もって いって ください", "たべて ください", "みて ください", "きいて ください"],
    answer: 0,
  },
  {
    kind: "mcq",
    prompt: { en: "「便利」 is read:", id: "「便利」 dibaca:" },
    options: ["べんり", "びんり", "べんとう", "ふり"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "でんきを ＿＿ ください。（暗いです）",
    prompt: { en: "It's dark — what do you ask for?", id: "Gelap — apa yang diminta?" },
    options: ["つけて", "けして", "あけて", "しめて"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "（かいわ）「その ペンを かして くれませんか。」「はい、＿＿。」",
    prompt: { en: "Natural reply.", id: "Jawaban wajar." },
    options: ["どうぞ", "どうも", "けっこうです", "だめです"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "しゅくだいを ＿＿ から、あそびます。",
    prompt: { en: "Complete: 「する」 → て-form.", id: "Lengkapi: 「する」 → bentuk て." },
    options: ["して", "した", "する", "しない"],
    answer: 0,
  },
  {
    kind: "mcq",
    ja: "きょうしつに つくえが 20 ＿＿ あります。",
    prompt: { en: "Counter for flat/furniture-like objects here.", id: "Penggolong yang tepat di sini." },
    options: ["こ", "だい", "ほん", "まい"],
    answer: 0,
    explain: {
      en: "机 is commonly counted with 〜つ／〜個 at N5 level; 台 is for machines/vehicles.",
      id: "机 di tingkat N5 umumnya dihitung dengan 〜つ／〜個; 台 untuk mesin/kendaraan.",
    },
  },
];

export const n5Integration: ContentModule = {
  type: "test",
  slug: "n5-integration",
  title: { en: "Week 1 Integration Test", id: "Tes Integrasi Pekan 1" },
  description: {
    en: "Fifteen mixed questions covering particles, verb forms, adjectives, て-form, and location from days 2–10.",
    id: "Lima belas soal campuran mencakup partikel, bentuk kata kerja, kata sifat, bentuk て, dan lokasi dari hari 2–10.",
  },
  passMark: 70,
  groups: [
    { id: "n5-integration:mixed", title: { en: "Mixed review", id: "Ulasan campuran" }, questions: mixed },
  ],
};
