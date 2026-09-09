import type { ContentModule } from "@/lib/types";

export const plainForm1: ContentModule = {
  type: "lesson",
  slug: "plain-form-1",
  level: "N4",
  title: { en: "Plain Form (1): The Four Corners", id: "Bentuk Biasa (1): Empat Sudut" },
  titleJa: "普通形（１）",
  summary: {
    en: "Plain (dictionary) form is the base for almost every N4 grammar pattern. First, lock in the plain non-past and past, positive and negative, for all three word types.",
    id: "Bentuk biasa (kamus) adalah dasar hampir semua pola tata bahasa N4. Pertama, kuasai bentuk biasa non-lampau dan lampau, positif dan negatif, untuk ketiga jenis kata.",
  },
  sections: [
    {
      kind: "prose",
      heading: { en: "Why it matters", id: "Mengapa penting" },
      body: {
        en: "Patterns like 〜と思う, 〜かもしれない, 〜つもり, 〜前に, noun modification — they all attach to the PLAIN form, not the ます form. If your plain forms are shaky, every N4 pattern feels hard. This lesson is pure drilling.",
        id: "Pola seperti 〜と思う, 〜かもしれない, 〜つもり, 〜前に, modifikasi nomina — semuanya menempel pada bentuk BIASA, bukan bentuk ます. Kalau bentuk biasamu goyah, setiap pola N4 terasa sulit. Materi ini murni latihan.",
      },
    },
    {
      kind: "table",
      heading: { en: "Verbs (例: 行く / 食べる)", id: "Kata kerja (例: 行く / 食べる)" },
      columns: [
        { en: "", id: "" },
        { en: "+", id: "+" },
        { en: "−", id: "−" },
      ],
      rows: [
        { cells: [{ en: "non-past", id: "non-lampau" }, "行く", "行かない"], ja: true },
        { cells: [{ en: "past", id: "lampau" }, "行った", "行かなかった"], ja: true },
        { cells: [{ en: "non-past", id: "non-lampau" }, "食[た]べる", "食べない"], ja: true },
        { cells: [{ en: "past", id: "lampau" }, "食べた", "食べなかった"], ja: true },
      ],
    },
    {
      kind: "table",
      heading: { en: "い-adjectives & な-adj / nouns", id: "Kata sifat い & kata sifat な / nomina" },
      columns: [
        { en: "", id: "" },
        { en: "い-adj (高い)", id: "sifat い (高い)" },
        { en: "な-adj / noun (静か / 学生)", id: "sifat な / nomina (静か / 学生)" },
      ],
      rows: [
        { cells: [{ en: "non-past +", id: "non-lampau +" }, "高[たか]い", "静[しず]かだ / 学生[がくせい]だ"], ja: true },
        { cells: [{ en: "non-past −", id: "non-lampau −" }, "高くない", "静かじゃない / 学生じゃない"], ja: true },
        { cells: [{ en: "past +", id: "lampau +" }, "高かった", "静かだった / 学生だった"], ja: true },
        { cells: [{ en: "past −", id: "lampau −" }, "高くなかった", "静かじゃなかった / 学生じゃなかった"], ja: true },
      ],
    },
    {
      kind: "note",
      tone: "warning",
      body: {
        en: "The trap: な-adjectives and nouns keep だ in the plain non-past positive (学生だ), but many patterns then drop or change that だ — e.g. 学生だと思う keeps it, but 学生な のに / 学生の 人 change it. Learn the plain form first; the attachment rules come next lesson and beyond.",
        id: "Jebakannya: kata sifat な dan nomina tetap memakai だ pada bentuk biasa non-lampau positif (学生だ), tapi banyak pola lalu menghilangkan atau mengubah だ itu — mis. 学生だと思う tetap, tapi 学生な のに / 学生の 人 berubah. Kuasai dulu bentuk biasanya; aturan penyambungan menyusul di materi berikutnya.",
      },
    },
    {
      kind: "examples",
      items: [
        { ja: "あした 雨[あめ]が 降[ふ]ると 思[おも]います。", en: "I think it will rain tomorrow.", id: "Saya pikir besok akan hujan." },
        { ja: "子[こ]どもの とき、この 町[まち]は しずかだった。", en: "When I was a child, this town was quiet.", id: "Waktu kecil, kota ini tenang." },
        { ja: "きのう 学校[がっこう]に 来[こ]なかった 人[ひと]は だれですか。", en: "Who didn't come to school yesterday?", id: "Siapa yang tidak datang ke sekolah kemarin?" },
      ],
    },
  ],
  exercises: [
    {
      id: "plain-form-1:transform",
      title: { en: "Convert to plain form", id: "Ubah ke bentuk biasa" },
      instructions: { en: "Write the plain-form equivalent.", id: "Tulis padanan bentuk biasanya." },
      questions: [
        { kind: "cloze", ja: "行きません → 行か___", accept: ["ない"], en: "does not go", id: "tidak pergi", explain: { en: "polite neg → plain ない.", id: "negatif sopan → biasa ない." } },
        { kind: "cloze", ja: "食べました → 食べ___", accept: ["た"], en: "ate", id: "makan (lampau)", explain: { en: "polite past → plain た.", id: "lampau sopan → biasa た." } },
        { kind: "cloze", ja: "飲みませんでした → 飲ま___", accept: ["なかった"], en: "did not drink", id: "tidak minum (lampau)", explain: { en: "polite past-neg → plain なかった.", id: "lampau-negatif sopan → biasa なかった." } },
        { kind: "cloze", ja: "たかいです → たか___（past +）", accept: ["かった"], en: "was expensive", id: "mahal (lampau)", explain: { en: "い-adj past.", id: "lampau kata sifat い." } },
        { kind: "cloze", ja: "べんりでした → べんり___（plain past +）", accept: ["だった"], en: "was convenient", id: "praktis (lampau)", explain: { en: "な-adj past → だった.", id: "lampau kata sifat な → だった." } },
        { kind: "cloze", ja: "学生[がくせい]じゃありませんでした → 学生じゃ___", accept: ["なかった"], en: "was not a student", id: "bukan pelajar (lampau)", explain: { en: "noun past-neg → じゃなかった.", id: "nomina lampau-negatif → じゃなかった." } },
      ],
    },
    {
      id: "plain-form-1:mcq",
      title: { en: "Spot the correct plain form", id: "Temukan bentuk biasa yang benar" },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "plain past negative of 来[く]る", id: "lampau negatif biasa dari 来[く]る" },
          options: ["こなかった", "きなかった", "くなかった", "こないだった"],
          answer: 0,
          explain: { en: "来る → 来[こ]ない → 来[こ]なかった.", id: "来る → 来[こ]ない → 来[こ]なかった." },
        },
        {
          kind: "mcq",
          prompt: { en: "plain non-past of \"is famous\" (有名)", id: "non-lampau biasa dari \"terkenal\" (有名)" },
          options: ["有名い", "有名だ", "有名です", "有名な"],
          answer: 1,
          explain: { en: "な-adj plain positive keeps だ.", id: "positif biasa kata sifat な tetap だ." },
        },
      ],
    },
  ],
};
