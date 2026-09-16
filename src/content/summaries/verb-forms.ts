import type { MaterialSummary } from "@/lib/types";

export const verbFormsSummary: MaterialSummary = {
  slug: "verb-forms",
  title: { en: "Verb Groups & Basic Forms", id: "Golongan & Bentuk Dasar Kata Kerja" },
  titleJa: "動詞のグループ",
  level: "N5",
  intro: {
    en: "Spot the group first — ます／ない／た then follow fixed rules.",
    id: "Kenali dulu golongannya — ます／ない／た lalu mengikuti aturan tetap.",
  },
  points: [
    {
      heading: { en: "Three groups", id: "Tiga golongan" },
      body: {
        en: "Group 2 (ichidan): dict. form ends ‑iる／‑eる (食べる, 見る) — drop る. Group 3 (irregular): only する, 来る. Group 1 (godan): everything else, incl. lookalikes 帰る・入る・走る.",
        id: "Golongan 2 (ichidan): bentuk kamus berakhir ‑iる／‑eる (食べる, 見る) — hilangkan る. Golongan 3 (tak beraturan): hanya する, 来る. Golongan 1 (godan): selain itu, termasuk yang mirip 帰る・入る・走る.",
      },
    },
    {
      heading: { en: "ます-form", id: "Bentuk ます" },
      body: {
        en: "Group 1: う-row → い-row + ます (書く→書きます). Group 2: drop る + ます. Group 3: irregular (する→します, 来る→来ます).",
        id: "Golongan 1: baris う → baris い + ます (書く→書きます). Golongan 2: hilangkan る + ます. Golongan 3: tak beraturan (する→します, 来る→来ます).",
      },
    },
    {
      heading: { en: "ない-form", id: "Bentuk ない" },
      body: {
        en: "Group 1: う-row → あ-row + ない (買う→買わない, note う→わ). Group 2: drop る + ない. Group 3: irregular (する→しない, 来る→来ない).",
        id: "Golongan 1: baris う → baris あ + ない (買う→買わない, catat う→わ). Golongan 2: hilangkan る + ない. Golongan 3: tak beraturan (する→しない, 来る→来ない).",
      },
    },
    {
      heading: { en: "た-form (mirrors て-form)", id: "Bentuk た (sama seperti て)" },
      body: {
        en: "う・つ・る→った, ぬ・ぶ・む→んだ, く→いた, ぐ→いだ, す→した. One exception: 行く→行った.",
        id: "う・つ・る→った, ぬ・ぶ・む→んだ, く→いた, ぐ→いだ, す→した. Satu pengecualian: 行く→行った.",
      },
    },
  ],
  examples: [
    { ja: "毎朝[まいあさ] 新聞[しんぶん]を 読[よ]みます。", en: "I read the newspaper every morning.", id: "Setiap pagi saya membaca koran." },
    { ja: "今夜[こんや]は どこにも 行[い]かない。", en: "I'm not going anywhere tonight.", id: "Malam ini saya tidak pergi ke mana-mana." },
    { ja: "きのう 早[はや]く 寝[ね]た。", en: "I went to sleep early yesterday.", id: "Kemarin saya tidur lebih awal." },
    { ja: "先週[せんしゅう] 京都[きょうと]に 行[い]った。", en: "I went to Kyoto last week.", id: "Minggu lalu saya pergi ke Kyoto.", note: { en: "行く exception → 行った", id: "Pengecualian 行く → 行った" } },
  ],
};
