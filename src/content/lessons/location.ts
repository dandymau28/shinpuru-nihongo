import type { ContentModule } from "@/lib/types";

export const location: ContentModule = {
  type: "lesson",
  slug: "location",
  level: "N5",
  title: { en: "Talking About Location", id: "Membicarakan Lokasi" },
  titleJa: "場所の言い方",
  summary: {
    en: "あります／います, position words, and the こそあど demonstratives — everything you need to say where things are.",
    id: "あります／います, kata posisi, dan penunjuk こそあど — semua yang dibutuhkan untuk menyatakan di mana sesuatu berada.",
  },
  sections: [
    {
      kind: "prose",
      heading: { en: "あります vs います", id: "あります vs います" },
      body: {
        en: "います — living things that move (people, animals). あります — everything else (objects, plants, events, buildings).\nPattern: [place] に [thing] が あります／います.\nOr, topic-first: [thing] は [place] に あります／います.",
        id: "います — makhluk hidup yang bergerak (orang, hewan). あります — selain itu (benda, tumbuhan, acara, gedung).\nPola: [tempat] に [benda] が あります／います.\nAtau, topik dulu: [benda] は [tempat] に あります／います.",
      },
    },
    {
      kind: "table",
      heading: { en: "Position words (＋ の)", id: "Kata posisi (＋ の)" },
      columns: [
        { en: "Japanese", id: "Jepang" },
        { en: "Meaning", id: "Arti" },
      ],
      rows: [
        { cells: ["上[うえ]", { en: "on / above", id: "di atas" }], ja: true },
        { cells: ["下[した]", { en: "under / below", id: "di bawah" }], ja: true },
        { cells: ["中[なか]", { en: "inside", id: "di dalam" }], ja: true },
        { cells: ["外[そと]", { en: "outside", id: "di luar" }], ja: true },
        { cells: ["前[まえ]", { en: "in front of", id: "di depan" }], ja: true },
        { cells: ["後[うし]ろ", { en: "behind", id: "di belakang" }], ja: true },
        { cells: ["となり", { en: "next to (same category)", id: "di sebelah (kategori sama)" }], ja: true },
        { cells: ["そば・近[ちか]く", { en: "near", id: "dekat" }], ja: true },
        { cells: ["間[あいだ]", { en: "between (A と B の間)", id: "di antara (A と B の間)" }], ja: true },
      ],
    },
    {
      kind: "prose",
      heading: { en: "こそあど", id: "こそあど" },
      body: {
        en: "こ = near me · そ = near you · あ = away from both · ど = which?\nthing: これ／それ／あれ／どれ\n+ noun: この／その／あの／どの 本[ほん]\nplace: ここ／そこ／あそこ／どこ\ndirection (polite): こちら／そちら／あちら／どちら",
        id: "こ = dekat saya · そ = dekat kamu · あ = jauh dari keduanya · ど = yang mana?\nbenda: これ／それ／あれ／どれ\n+ nomina: この／その／あの／どの 本[ほん]\ntempat: ここ／そこ／あそこ／どこ\narah (sopan): こちら／そちら／あちら／どちら",
      },
    },
    {
      kind: "examples",
      items: [
        {
          ja: "机[つくえ]の 上[うえ]に 財布[さいふ]が あります。",
          en: "There's a wallet on the desk.",
          id: "Ada dompet di atas meja.",
        },
        {
          ja: "銀行[ぎんこう]は コンビニと 郵便局[ゆうびんきょく]の 間[あいだ]に あります。",
          en: "The bank is between the convenience store and the post office.",
          id: "Bank itu di antara minimarket dan kantor pos.",
        },
        {
          ja: "教室[きょうしつ]の 中[なか]に 学生[がくせい]が 3人[さんにん] います。",
          en: "There are three students inside the classroom.",
          id: "Ada tiga siswa di dalam kelas.",
        },
        {
          ja: "すみません、トイレは どこですか。 — あそこです。",
          en: "Excuse me, where is the toilet? — Over there.",
          id: "Permisi, di mana toiletnya? — Di sebelah sana.",
        },
      ],
    },
    {
      kind: "note",
      tone: "warning",
      body: {
        en: "Use に (not で) with あります／います — it's about existence, not action. 公園[こうえん]で 遊[あそ]びます (action) vs 公園に います (location).",
        id: "Pakai に (bukan で) dengan あります／います — ini soal keberadaan, bukan tindakan. 公園[こうえん]で 遊[あそ]びます (tindakan) vs 公園に います (lokasi).",
      },
    },
  ],
  exercises: [
    {
      id: "location:cloze",
      title: { en: "Complete the sentence", id: "Lengkapi kalimatnya" },
      speak: true,
      questions: [
        {
          kind: "cloze",
          ja: "駅[えき]の 前[まえ]に タクシー___ います。",
          accept: ["が"],
          en: "There are taxis in front of the station.",
          id: "Ada taksi di depan stasiun.",
          explain: { en: "New thing existing → が.", id: "Hal baru yang ada → が." },
        },
        {
          kind: "cloze",
          ja: "ねこは ベッドの 下[した]___ います。",
          accept: ["に"],
          en: "The cat is under the bed.",
          id: "Kucingnya di bawah tempat tidur.",
          explain: { en: "Location of existence → に.", id: "Lokasi keberadaan → に." },
        },
        {
          kind: "cloze",
          ja: "テーブルの 上[うえ]に 何[なに]も あり___。",
          accept: ["ません"],
          en: "There is nothing on the table.",
          id: "Tidak ada apa-apa di atas meja.",
          explain: { en: "何も + negative verb.", id: "何も + kata kerja negatif." },
        },
        {
          kind: "cloze",
          ja: "この 近[ちか]く___ 郵便局[ゆうびんきょく]が ありますか。",
          accept: ["に"],
          en: "Is there a post office near here?",
          id: "Apakah ada kantor pos di dekat sini?",
          explain: { en: "近くに = nearby (location).", id: "近くに = di dekat (lokasi)." },
        },
      ],
    },
    {
      id: "location:mcq",
      title: { en: "あります or います?", id: "あります atau います?" },
      questions: [
        {
          kind: "mcq",
          ja: "庭[にわ]に 犬[いぬ]が ＿＿＿。",
          prompt: { en: "\"There is a dog in the garden.\"", id: "\"Ada anjing di taman.\"" },
          options: ["あります", "います", "です", "いります"],
          answer: 1,
          explain: { en: "A dog moves → います.", id: "Anjing bergerak → います." },
        },
        {
          kind: "mcq",
          ja: "冷蔵庫[れいぞうこ]の 中[なか]に ジュースが ＿＿＿。",
          prompt: { en: "\"There is juice in the fridge.\"", id: "\"Ada jus di kulkas.\"" },
          options: ["います", "あります", "でます", "みます"],
          answer: 1,
          explain: { en: "Juice is an object → あります.", id: "Jus adalah benda → あります." },
        },
        {
          kind: "mcq",
          prompt: { en: "\"the book near you\" (pointing at listener's side)", id: "\"buku yang dekat kamu\"" },
          options: ["この 本[ほん]", "その 本[ほん]", "あの 本[ほん]", "どの 本[ほん]"],
          answer: 1,
          explain: { en: "Near the listener → その.", id: "Dekat lawan bicara → その." },
        },
      ],
    },
    {
      id: "location:build",
      title: { en: "Build it", id: "Susun" },
      questions: [
        {
          kind: "build",
          tiles: ["病院[びょういん]は", "駅[えき]の", "後[うし]ろに", "あります"],
          en: "The hospital is behind the station.",
          id: "Rumah sakit ada di belakang stasiun.",
        },
      ],
    },
  ],
};
