import type { ContentModule } from "@/lib/types";

export const timeRoutine: ContentModule = {
  type: "skill",
  slug: "time-routine",
  title: { en: "Time Expressions & Daily Routine", id: "Ungkapan Waktu & Rutinitas Harian" },
  titleJa: "時間と一日の生活",
  description: {
    en: "The vocabulary and patterns to describe when things happen — then write about your own day.",
    id: "Kosakata dan pola untuk menjelaskan kapan sesuatu terjadi — lalu tulis tentang harimu sendiri.",
  },
  sections: [
    {
      kind: "table",
      heading: { en: "Telling time", id: "Menyebut waktu" },
      columns: [
        { en: "Japanese", id: "Jepang" },
        { en: "Reading / meaning", id: "Bacaan / arti" },
      ],
      rows: [
        { cells: ["1時[じ] / 4時 / 7時 / 9時", "いちじ / よじ / しちじ / くじ"], ja: true },
        { cells: ["〜分[ふん・ぷん]", { en: "minutes (1ぷん, 3ぷん, 4ふん…)", id: "menit (1ぷん, 3ぷん, 4ふん…)" }] },
        { cells: ["半[はん]", { en: "half past", id: "lewat setengah" }] },
        { cells: ["午前[ごぜん] / 午後[ごご]", { en: "a.m. / p.m.", id: "pagi / siang-malam" }] },
        { cells: ["〜ごろ", { en: "around ~ (time)", id: "sekitar ~ (waktu)" }] },
      ],
    },
    {
      kind: "prose",
      heading: { en: "Particles with time", id: "Partikel dengan waktu" },
      body: {
        en: "• Specific time point → に:  7時[しちじ]に 起[お]きます。 6月[ろくがつ]に 行[い]きます。\n• Relative time (today, tomorrow, now, every day) → no particle:  きょう 勉強[べんきょう]します。\n• Span → 〜から〜まで:  9時から 5時まで 働[はたら]きます。\n• Duration (how long) → no に:  2時間[じかん] 勉強しました。",
        id: "• Titik waktu spesifik → に:  7時[しちじ]に 起[お]きます。 6月[ろくがつ]に 行[い]きます。\n• Waktu relatif (hari ini, besok, sekarang, setiap hari) → tanpa partikel:  きょう 勉強[べんきょう]します。\n• Rentang → 〜から〜まで:  9時から 5時まで 働[はたら]きます。\n• Durasi (berapa lama) → tanpa に:  2時間[じかん] 勉強しました。",
      },
    },
    {
      kind: "table",
      heading: { en: "Frequency adverbs", id: "Keterangan frekuensi" },
      columns: [
        { en: "Japanese", id: "Jepang" },
        { en: "Meaning", id: "Arti" },
        { en: "Verb form", id: "Bentuk verba" },
      ],
      rows: [
        { cells: ["いつも", { en: "always", id: "selalu" }, "+"] },
        { cells: ["よく", { en: "often", id: "sering" }, "+"] },
        { cells: ["ときどき", { en: "sometimes", id: "kadang-kadang" }, "+"] },
        { cells: ["あまり", { en: "not very often", id: "jarang" }, "−"] },
        { cells: ["ぜんぜん", { en: "never / not at all", id: "tidak pernah" }, "−"] },
      ],
    },
    {
      kind: "examples",
      items: [
        { ja: "毎朝[まいあさ] 6時半[ろくじはん]ごろ 起[お]きます。", en: "I get up around 6:30 every morning.", id: "Setiap pagi saya bangun sekitar jam 6:30." },
        { ja: "月曜日[げつようび]から 金曜日[きんようび]まで 大学[だいがく]に 行[い]きます。", en: "I go to university from Monday to Friday.", id: "Saya kuliah dari Senin sampai Jumat." },
        { ja: "週末[しゅうまつ]は あまり 出[で]かけません。", en: "I don't go out much on weekends.", id: "Di akhir pekan saya jarang keluar." },
        { ja: "夜[よる] 11時[じゅういちじ]に 寝[ね]る 前[まえ]に、本[ほん]を 読[よ]みます。", en: "Before I sleep at 11 p.m., I read a book.", id: "Sebelum tidur jam 11 malam, saya membaca buku." },
      ],
    },
  ],
  exercises: [
    {
      id: "time-routine:cloze",
      title: { en: "Particle check", id: "Cek partikel" },
      instructions: { en: "に or nothing (× = no particle).", id: "に atau tidak ada (× = tanpa partikel)." },
      questions: [
        { kind: "cloze", ja: "毎日[まいにち] 7時[しちじ]___ 会社[かいしゃ]に 行[い]きます。", accept: ["に"], en: "I go to work at 7 every day.", id: "Setiap hari saya berangkat kerja jam 7.", explain: { en: "Clock time → に.", id: "Waktu jam → に." } },
        { kind: "cloze", ja: "あした___ 京都[きょうと]へ 行[い]きます。", accept: ["×", "x", "なし"], en: "I'm going to Kyoto tomorrow.", id: "Besok saya ke Kyoto.", explain: { en: "あした is relative time → no particle. (type ×)", id: "あした waktu relatif → tanpa partikel. (ketik ×)" } },
        { kind: "cloze", ja: "きのう 3時間[じかん]___ ゲームを しました。", accept: ["×", "x", "なし"], en: "I played games for 3 hours yesterday.", id: "Kemarin saya main game 3 jam.", explain: { en: "Duration → no に. (type ×)", id: "Durasi → tanpa に. (ketik ×)" } },
        { kind: "cloze", ja: "店[みせ]は 10時[じゅうじ]___ 8時[はちじ]まで 開[あ]いています。", accept: ["から"], en: "The shop is open from 10 to 8.", id: "Toko buka dari jam 10 sampai jam 8.", explain: { en: "Span start → から.", id: "Awal rentang → から." } },
      ],
    },
  ],
  writing: {
    id: "time-routine:writing",
    prompt: {
      en: "Write 5–8 sentences about a typical weekday: when you get up, what you do in the morning, afternoon, and evening, and one thing you sometimes / rarely do. Use at least three time expressions and two frequency adverbs.",
      id: "Tulis 5–8 kalimat tentang hari kerja biasa: kapan bangun, apa yang dilakukan pagi, siang, dan malam, serta satu hal yang kadang / jarang dilakukan. Gunakan minimal tiga ungkapan waktu dan dua keterangan frekuensi.",
    },
    checklist: [
      { en: "Every clock time is followed by に", id: "Setiap waktu jam diikuti に" },
      { en: "Relative times (今日, 毎日…) have no particle", id: "Waktu relatif (今日, 毎日…) tanpa partikel" },
      { en: "Frequency adverbs match the verb polarity (あまり／ぜんぜん + negative)", id: "Keterangan frekuensi cocok dengan polaritas verba (あまり／ぜんぜん + negatif)" },
      { en: "Verbs are in consistent です／ます form", id: "Verba konsisten dalam bentuk です／ます" },
    ],
    modelAnswer: [
      { ja: "私[わたし]は 毎朝[まいあさ] 6時[ろくじ]に 起[お]きます。", en: "I get up at 6 every morning.", id: "Setiap pagi saya bangun jam 6." },
      { ja: "朝[あさ]ご飯[はん]を 食[た]べてから、7時半[しちじはん]に 家[いえ]を 出[で]ます。", en: "After breakfast, I leave home at 7:30.", id: "Setelah sarapan, saya keluar rumah jam 7:30." },
      { ja: "午前中[ごぜんちゅう]は 大学[だいがく]で 授業[じゅぎょう]が あります。", en: "In the morning I have classes at university.", id: "Pagi hari ada kuliah di kampus." },
      { ja: "昼[ひる]ご飯[はん]は たいてい 友[とも]だちと 食[た]べます。", en: "I usually eat lunch with friends.", id: "Makan siang biasanya bersama teman." },
      { ja: "午後[ごご]は 図書館[としょかん]で 3時間[じかん]ぐらい 勉強[べんきょう]します。", en: "In the afternoon I study at the library for about 3 hours.", id: "Sore hari saya belajar di perpustakaan sekitar 3 jam." },
      { ja: "夜[よる]は ときどき ジムに 行[い]きますが、週末[しゅうまつ]は あまり 出[で]かけません。", en: "In the evening I sometimes go to the gym, but on weekends I don't go out much.", id: "Malam kadang ke gym, tapi akhir pekan jarang keluar." },
      { ja: "11時[じゅういちじ]ごろ 寝[ね]ます。", en: "I sleep around 11.", id: "Saya tidur sekitar jam 11." },
    ],
  },
};
