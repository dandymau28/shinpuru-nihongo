import type { MaterialSummary } from "@/lib/types";

export const timeRoutineSummary: MaterialSummary = {
  slug: "time-routine",
  title: { en: "Time Expressions & Daily Routine", id: "Ungkapan Waktu & Rutinitas Harian" },
  titleJa: "時間と一日の生活",
  level: "N5",
  intro: {
    en: "Clock time, particle rules for time, and frequency adverbs.",
    id: "Waktu jam, aturan partikel untuk waktu, dan keterangan frekuensi.",
  },
  points: [
    {
      heading: { en: "Telling time", id: "Menyebut waktu" },
      body: { en: "〜時 (o'clock), 〜分 (minutes), 半 (half past), 午前／午後 (a.m./p.m.), 〜ごろ (around ~).", id: "〜時 (jam), 〜分 (menit), 半 (lewat setengah), 午前／午後 (pagi/siang-malam), 〜ごろ (sekitar ~)." },
    },
    {
      heading: { en: "Particles with time", id: "Partikel dengan waktu" },
      body: {
        en: "Specific point → に (7時に). Relative time (きょう, 毎日) → no particle. Span → 〜から〜まで. Duration → no に.",
        id: "Titik spesifik → に (7時に). Waktu relatif (きょう, 毎日) → tanpa partikel. Rentang → 〜から〜まで. Durasi → tanpa に.",
      },
    },
    {
      heading: { en: "Frequency adverbs", id: "Keterangan frekuensi" },
      body: {
        en: "Positive verb: いつも (always), よく (often), ときどき (sometimes). Negative verb: あまり (not very), ぜんぜん (never).",
        id: "Verba positif: いつも (selalu), よく (sering), ときどき (kadang-kadang). Verba negatif: あまり (jarang), ぜんぜん (tidak pernah).",
      },
    },
  ],
  examples: [
    { ja: "毎晩[まいばん] 10時[じゅうじ]ごろ お風呂[ふろ]に 入[はい]ります。", en: "I take a bath around 10 every night.", id: "Setiap malam saya mandi sekitar jam 10." },
    { ja: "土曜日[どようび]から 日曜日[にちようび]まで 休[やす]みです。", en: "I'm off from Saturday to Sunday.", id: "Saya libur dari Sabtu sampai Minggu." },
    { ja: "彼[かれ]は ぜんぜん 野菜[やさい]を 食[た]べません。", en: "He never eats vegetables.", id: "Dia sama sekali tidak makan sayur." },
  ],
};
