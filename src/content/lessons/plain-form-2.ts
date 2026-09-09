import type { ContentModule } from "@/lib/types";

export const plainForm2: ContentModule = {
  type: "lesson",
  slug: "plain-form-2",
  level: "N4",
  title: { en: "Plain Form (2): Casual Speech", id: "Bentuk Biasa (2): Ragam Kasual" },
  titleJa: "普通形（２）",
  summary: {
    en: "Now use plain form to actually speak casually — with friends, family, and in your own head. Learn what drops, what changes, and what stays polite.",
    id: "Sekarang pakai bentuk biasa untuk benar-benar berbicara santai — dengan teman, keluarga, dan dalam pikiran sendiri. Pelajari apa yang hilang, apa yang berubah, dan apa yang tetap sopan.",
  },
  sections: [
    {
      kind: "prose",
      heading: { en: "From です／ます to plain", id: "Dari です／ます ke biasa" },
      body: {
        en: "Casual speech = plain forms + dropped particles + rising intonation for questions.\n• 食[た]べますか → 食べる？ (drop か, raise pitch)\n• 高[たか]いです → 高い\n• 学生[がくせい]です → 学生（だ）— women and casual speech often drop だ\n• 行きましょう → 行こう (volitional)",
        id: "Ragam kasual = bentuk biasa + partikel yang dihilangkan + intonasi naik untuk pertanyaan.\n• 食[た]べますか → 食べる？ (hilangkan か, naikkan nada)\n• 高[たか]いです → 高い\n• 学生[がくせい]です → 学生（だ）— perempuan dan ragam santai sering menghilangkan だ\n• 行きましょう → 行こう (bentuk ajakan)",
      },
    },
    {
      kind: "table",
      heading: { en: "Common casual contractions", id: "Kontraksi kasual umum" },
      columns: [
        { en: "Full", id: "Lengkap" },
        { en: "Casual", id: "Kasual" },
      ],
      rows: [
        { cells: ["〜ている", "〜てる"], ja: true },
        { cells: ["〜ておく", "〜とく"], ja: true },
        { cells: ["〜てしまう", "〜ちゃう"], ja: true },
        { cells: ["〜なければならない", "〜なきゃ"], ja: true },
        { cells: ["〜という", "〜って"], ja: true },
      ],
    },
    {
      kind: "note",
      tone: "tip",
      body: {
        en: "Register is a choice, not a default. Use plain form with people close to or below you; keep です／ます with strangers, customers, teachers, and anyone older you don't know well. When unsure, stay polite.",
        id: "Ragam bahasa adalah pilihan, bukan bawaan. Pakai bentuk biasa dengan orang yang dekat atau di bawahmu; tetap です／ます dengan orang asing, pelanggan, guru, dan orang yang lebih tua yang belum akrab. Kalau ragu, tetap sopan.",
      },
    },
    {
      kind: "examples",
      items: [
        { ja: "ねえ、今日[きょう] ひま？ — うん、ひまだよ。", en: "Hey, are you free today? — Yeah, I'm free.", id: "Hei, hari ini luang? — Ya, luang." },
        { ja: "もう 昼[ひる]ご飯[はん] 食[た]べた？ — まだ。", en: "Did you eat lunch yet? — Not yet.", id: "Sudah makan siang? — Belum." },
        { ja: "明日[あした]までに 宿題[しゅくだい] やらなきゃ。", en: "I have to do the homework by tomorrow.", id: "Aku harus mengerjakan PR sebelum besok." },
        { ja: "駅[えき]で 待[ま]ってる ね。", en: "I'll be waiting at the station.", id: "Aku tunggu di stasiun ya." },
      ],
    },
  ],
  exercises: [
    {
      id: "plain-form-2:casualise",
      title: { en: "Make it casual", id: "Buat jadi kasual" },
      instructions: { en: "Rewrite the underlined part in casual plain form.", id: "Tulis ulang bagian bergaris bawah dalam bentuk biasa kasual." },
      questions: [
        { kind: "cloze", ja: "あした 映画[えいが]を 見[み]ますか → あした 映画 ___？", accept: ["見る", "みる"], en: "Will you watch a movie tomorrow?", id: "Besok nonton film?", explain: { en: "見ますか → 見る？", id: "見ますか → 見る？" } },
        { kind: "cloze", ja: "この ケーキは おいしいです → この ケーキ ___", accept: ["おいしい"], en: "This cake is delicious.", id: "Kue ini enak.", explain: { en: "い-adj: just drop です.", id: "kata sifat い: cukup hilangkan です." } },
        { kind: "cloze", ja: "今[いま] テレビを 見[み]ています → 今 テレビ ___", accept: ["見てる", "みてる"], en: "I'm watching TV now.", id: "Sedang nonton TV sekarang.", explain: { en: "〜ている → 〜てる.", id: "〜ている → 〜てる." } },
        { kind: "cloze", ja: "早[はや]く 帰[かえ]らなければなりません → 早く 帰ら___", accept: ["なきゃ"], en: "I have to go home early.", id: "Harus pulang cepat.", explain: { en: "〜なければならない → 〜なきゃ.", id: "〜なければならない → 〜なきゃ." } },
      ],
    },
    {
      id: "plain-form-2:register",
      title: { en: "Polite or casual?", id: "Sopan atau kasual?" },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "Talking to a store customer, you should say:", id: "Berbicara kepada pelanggan toko, sebaiknya:" },
          options: ["これ、いる？", "こちらは いかがですか。", "これ 買[か]う？"],
          answer: 1,
          explain: { en: "Customer service → keep です／ます and honorifics.", id: "Layanan pelanggan → tetap です／ます dan bentuk hormat." },
        },
        {
          kind: "mcq",
          prompt: { en: "Which is natural casual speech between friends?", id: "Mana ragam kasual yang wajar antar teman?" },
          options: ["明日[あした] 来[き]ますか？", "明日 来る？", "明日 来ますだ？"],
          answer: 1,
          explain: { en: "Plain form + rising intonation.", id: "Bentuk biasa + intonasi naik." },
        },
      ],
    },
  ],
};
