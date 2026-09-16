import type { MaterialSummary } from "@/lib/types";

export const plainForm2Summary: MaterialSummary = {
  slug: "plain-form-2",
  title: { en: "Plain Form (2): Casual Speech", id: "Bentuk Biasa (2): Ragam Kasual" },
  titleJa: "普通形（２）",
  level: "N4",
  intro: {
    en: "Using plain form to actually talk casually — what drops, what changes, what stays polite.",
    id: "Memakai bentuk biasa untuk benar-benar berbicara santai — apa yang hilang, apa yang berubah, apa yang tetap sopan.",
  },
  points: [
    {
      heading: { en: "From です／ます to casual", id: "Dari です／ます ke kasual" },
      body: {
        en: "Plain form + dropped particles + rising pitch for questions. 食べますか→食べる？ 高いです→高い. 学生です→学生（だ）.",
        id: "Bentuk biasa + partikel dihilangkan + nada naik untuk pertanyaan. 食べますか→食べる？ 高いです→高い. 学生です→学生（だ）.",
      },
    },
    {
      heading: { en: "Common contractions", id: "Kontraksi umum" },
      body: {
        en: "〜ている→〜てる, 〜ておく→〜とく, 〜てしまう→〜ちゃう, 〜なければならない→〜なきゃ, 〜という→〜って.",
        id: "〜ている→〜てる, 〜ておく→〜とく, 〜てしまう→〜ちゃう, 〜なければならない→〜なきゃ, 〜という→〜って.",
      },
    },
    {
      heading: { en: "Register is a choice", id: "Ragam bahasa adalah pilihan" },
      body: {
        en: "Plain form with people close to or below you. Keep です／ます with strangers, customers, teachers, elders you don't know well.",
        id: "Bentuk biasa dengan orang yang dekat atau di bawahmu. Tetap です／ます dengan orang asing, pelanggan, guru, orang lebih tua yang belum akrab.",
      },
    },
  ],
  examples: [
    { ja: "ねえ、宿題[しゅくだい] もう やった？ — まだ やってない。", en: "Hey, did you already do the homework? — Not yet.", id: "Hei, PR sudah dikerjakan? — Belum." },
    { ja: "今[いま] 手[て]が ふさがってるから、あとで やっとくね。", en: "My hands are full right now, so I'll take care of it later.", id: "Tanganku lagi sibuk, nanti aku beresin ya." },
    { ja: "早[はや]く 出[で]なきゃ、遅刻[ちこく]するよ。", en: "I have to leave soon or I'll be late.", id: "Harus segera berangkat, nanti telat." },
  ],
};
