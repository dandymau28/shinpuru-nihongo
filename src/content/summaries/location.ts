import type { MaterialSummary } from "@/lib/types";

export const locationSummary: MaterialSummary = {
  slug: "location",
  title: { en: "Talking About Location", id: "Membicarakan Lokasi" },
  titleJa: "場所の言い方",
  level: "N5",
  intro: {
    en: "あります／います, position words, and こそあど — everything to say where things are.",
    id: "あります／います, kata posisi, dan こそあど — semua untuk menyatakan di mana sesuatu berada.",
  },
  points: [
    {
      heading: { en: "あります vs います", id: "あります vs います" },
      body: {
        en: "います = living, moving things (people, animals). あります = everything else. Pattern: [place]に [thing]が あります／います.",
        id: "います = makhluk hidup yang bergerak (orang, hewan). あります = selain itu. Pola: [tempat]に [benda]が あります／います.",
      },
    },
    {
      heading: { en: "Position words + の", id: "Kata posisi + の" },
      body: {
        en: "上 (on), 下 (under), 中 (inside), 外 (outside), 前 (in front), 後ろ (behind), となり (next to), そば／近く (near), 間 (between A と B).",
        id: "上 (atas), 下 (bawah), 中 (dalam), 外 (luar), 前 (depan), 後ろ (belakang), となり (sebelah), そば／近く (dekat), 間 (antara A と B).",
      },
    },
    {
      heading: { en: "こそあど", id: "こそあど" },
      body: {
        en: "こ=near me, そ=near you, あ=far from both, ど=which? → これ／それ／あれ／どれ (thing), この／その／あの／どの＋noun, ここ／そこ／あそこ／どこ (place), こちら／そちら／あちら／どちら (polite direction).",
        id: "こ=dekat saya, そ=dekat kamu, あ=jauh dari keduanya, ど=yang mana? → これ／それ／あれ／どれ (benda), この／その／あの／どの＋nomina, ここ／そこ／あそこ／どこ (tempat), こちら／そちら／あちら／どちら (arah sopan).",
      },
    },
    {
      heading: { en: "に, not で", id: "に, bukan で" },
      body: { en: "あります／います always take に — it's about existence, not action.", id: "あります／います selalu memakai に — soal keberadaan, bukan tindakan." },
    },
  ],
  examples: [
    { ja: "冷蔵庫[れいぞうこ]の 中[なか]に 卵[たまご]が あります。", en: "There are eggs inside the fridge.", id: "Ada telur di dalam kulkas." },
    { ja: "公園[こうえん]は 図書館[としょかん]の となりに あります。", en: "The park is next to the library.", id: "Taman itu di sebelah perpustakaan." },
    { ja: "庭[にわ]に ねこが 2匹[にひき] います。", en: "There are two cats in the garden.", id: "Ada dua ekor kucing di halaman." },
    { ja: "その 傘[かさ]は だれのですか。 — それは 私[わたし]のです。", en: "Whose umbrella is that? — That's mine.", id: "Payung itu punya siapa? — Itu punya saya." },
  ],
};
