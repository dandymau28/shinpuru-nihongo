import type { MaterialSummary } from "@/lib/types";

export const adjectivesSummary: MaterialSummary = {
  slug: "adjectives",
  title: { en: "い- and な-Adjectives", id: "Kata Sifat い dan な" },
  titleJa: "形容詞",
  level: "N5",
  intro: {
    en: "Two families, two conjugation patterns — い-adjectives carry their own tense; な-adjectives lean on です／だ.",
    id: "Dua keluarga, dua pola konjugasi — kata sifat い membawa kalanya sendiri; kata sifat な bergantung pada です／だ.",
  },
  points: [
    {
      heading: { en: "い-adjective, 4 forms", id: "Kata sifat い, 4 bentuk" },
      body: {
        en: "高い → 高くない (−) → 高かった (past) → 高くなかった (past −). The い itself carries the tense — never 高いでした.",
        id: "高い → 高くない (−) → 高かった (lampau) → 高くなかった (lampau −). い sendiri yang membawa kala — jangan pernah 高いでした.",
      },
    },
    {
      heading: { en: "な-adjective, 4 forms", id: "Kata sifat な, 4 bentuk" },
      body: {
        en: "静か + です (+) → じゃないです (−) → でした (past) → じゃなかったです (past −).",
        id: "静か + です (+) → じゃないです (−) → でした (lampau) → じゃなかったです (lampau −).",
      },
    },
    {
      heading: { en: "Before a noun", id: "Sebelum nomina" },
      body: {
        en: "い-adj + noun directly (高い ビル). な-adj + な + noun (静かな 町). Trap: きれい・有名 end in い but are な-adjectives.",
        id: "Kata sifat い + nomina langsung (高い ビル). Kata sifat な + な + nomina (静かな 町). Jebakan: きれい・有名 berakhiran い tapi termasuk kata sifat な.",
      },
    },
    {
      heading: { en: "Adverb form", id: "Bentuk keterangan" },
      body: {
        en: "い-adj: い→く (早い→早く). な-adj: +に (静か→静かに). Irregular: いい／よい → よくない, よかった, よく.",
        id: "Kata sifat い: い→く (早い→早く). Kata sifat な: +に (静か→静かに). Tak beraturan: いい／よい → よくない, よかった, よく.",
      },
    },
  ],
  examples: [
    { ja: "この コーヒーは あまり 熱[あつ]くないです。", en: "This coffee isn't very hot.", id: "Kopi ini tidak terlalu panas." },
    { ja: "去年[きょねん] 会[あ]った 先生[せんせい]は 親切[しんせつ]でした。", en: "The teacher I met last year was kind.", id: "Guru yang saya temui tahun lalu ramah." },
    { ja: "駅[えき]の 近[ちか]くに べんりな スーパーが あります。", en: "There's a convenient supermarket near the station.", id: "Ada supermarket yang praktis dekat stasiun." },
    { ja: "もっと ゆっくり 話[はな]してください。", en: "Please speak more slowly.", id: "Tolong bicara lebih pelan.", note: { en: "ゆっくり is already adverbial (no い/な to convert)", id: "ゆっくり sudah berupa keterangan (tak perlu diubah dari い/な)" } },
  ],
};
