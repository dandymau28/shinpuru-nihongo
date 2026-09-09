import type { ContentModule } from "@/lib/types";

export const adjectives: ContentModule = {
  type: "lesson",
  slug: "adjectives",
  level: "N5",
  title: { en: "い- and な-Adjectives", id: "Kata Sifat い dan な" },
  titleJa: "形容詞",
  summary: {
    en: "Two families of adjectives, two conjugation patterns. い-adjectives conjugate themselves; な-adjectives lean on です / でした.",
    id: "Dua keluarga kata sifat, dua pola konjugasi. Kata sifat い berkonjugasi sendiri; kata sifat な bergantung pada です / でした.",
  },
  sections: [
    {
      kind: "table",
      heading: { en: "The four basic forms", id: "Empat bentuk dasar" },
      columns: [
        { en: "", id: "" },
        { en: "い-adj (高[たか]い)", id: "kata sifat い (高[たか]い)" },
        { en: "な-adj (静[しず]か)", id: "kata sifat な (静[しず]か)" },
      ],
      rows: [
        { cells: [{ en: "present +", id: "kini +" }, "高いです", "静かです"], ja: true },
        { cells: [{ en: "present −", id: "kini −" }, "高くないです", "静かじゃないです"], ja: true },
        { cells: [{ en: "past +", id: "lampau +" }, "高かったです", "静かでした"], ja: true },
        { cells: [{ en: "past −", id: "lampau −" }, "高くなかったです", "静かじゃなかったです"], ja: true },
      ],
    },
    {
      kind: "prose",
      heading: { en: "Modifying a noun", id: "Menerangkan nomina" },
      body: {
        en: "い-adjective + noun directly: 高[たか]い ビル (a tall building).\nな-adjective + な + noun: 静[しず]かな 町[まち] (a quiet town).\nWatch out: きれい and 有名[ゆうめい] end in い but are な-adjectives → きれいな 花[はな].",
        id: "Kata sifat い + nomina langsung: 高[たか]い ビル (gedung tinggi).\nKata sifat な + な + nomina: 静[しず]かな 町[まち] (kota yang tenang).\nHati-hati: きれい dan 有名[ゆうめい] berakhiran い tapi termasuk kata sifat な → きれいな 花[はな].",
      },
    },
    {
      kind: "prose",
      heading: { en: "Adverb form", id: "Bentuk keterangan" },
      body: {
        en: "い-adj: い → く   早[はや]い → 早く 起[お]きる (get up early).\nな-adj: + に   静[しず]か → 静かに 話[はな]す (speak quietly).\nThe one to memorise: いい／よい is irregular → よくない, よかった, よく.",
        id: "Kata sifat い: い → く   早[はや]い → 早く 起[お]きる (bangun pagi-pagi).\nKata sifat な: + に   静[しず]か → 静かに 話[はな]す (berbicara pelan).\nYang wajib dihafal: いい／よい tak beraturan → よくない, よかった, よく.",
      },
    },
    {
      kind: "examples",
      items: [
        {
          ja: "この カメラは 高[たか]くなかったです。",
          en: "This camera wasn't expensive.",
          id: "Kamera ini tidak mahal.",
        },
        {
          ja: "きのうの テストは かんたんでした。",
          en: "Yesterday's test was easy.",
          id: "Tes kemarin mudah.",
        },
        {
          ja: "彼女[かのじょ]は いつも 元気[げんき]に 話[はな]します。",
          en: "She always speaks energetically.",
          id: "Dia selalu berbicara dengan penuh semangat.",
        },
        {
          ja: "新[あたら]しくて きれいな アパートに 住[す]んでいます。",
          en: "I live in a new, clean apartment.",
          id: "Saya tinggal di apartemen yang baru dan bersih.",
          note: { en: "い-adj linking form: 新しい → 新しくて", id: "Bentuk penghubung kata sifat い: 新しい → 新しくて" },
        },
      ],
    },
    {
      kind: "note",
      tone: "warning",
      body: {
        en: "Never say 高いでした for the past. The い-adjective itself carries the tense: 高かったです.",
        id: "Jangan pernah bilang 高いでした untuk lampau. Kata sifat い sendiri yang membawa kala: 高かったです.",
      },
    },
  ],
  exercises: [
    {
      id: "adjectives:transform",
      title: { en: "Change the form", id: "Ubah bentuknya" },
      instructions: { en: "Type the requested form (casual/plain unless です is shown).", id: "Ketik bentuk yang diminta (kasual/biasa kecuali ada です)." },
      questions: [
        {
          kind: "cloze",
          ja: "先週[せんしゅう]の 映画[えいが]は おもしろ___ です。（past +）",
          accept: ["かった"],
          en: "Last week's movie was interesting.",
          id: "Film minggu lalu menarik.",
          explain: { en: "い-adj past: おもしろい → おもしろかった.", id: "Lampau kata sifat い: おもしろい → おもしろかった." },
        },
        {
          kind: "cloze",
          ja: "この 部屋[へや]は しずか___ ないです。（present −）",
          accept: ["じゃ", "では"],
          en: "This room isn't quiet.",
          id: "Kamar ini tidak tenang.",
          explain: { en: "な-adj negative: しずか + じゃない.", id: "Negatif kata sifat な: しずか + じゃない." },
        },
        {
          kind: "cloze",
          ja: "きのうは 天気[てんき]が よ___ です。（past +, from いい）",
          accept: ["かった"],
          en: "The weather was good yesterday.",
          id: "Cuaca kemarin bagus.",
          explain: { en: "いい is irregular → よかった.", id: "いい tak beraturan → よかった." },
        },
        {
          kind: "cloze",
          ja: "もっと 早[はや]___ 来[き]てください。（adverb）",
          accept: ["く"],
          en: "Please come earlier.",
          id: "Tolong datang lebih awal.",
          explain: { en: "い-adj adverb: 早い → 早く.", id: "Keterangan kata sifat い: 早い → 早く." },
        },
        {
          kind: "cloze",
          ja: "彼[かれ]は 有名[ゆうめい]___ 歌手[かしゅ]です。（+ noun）",
          accept: ["な"],
          en: "He is a famous singer.",
          id: "Dia penyanyi terkenal.",
          explain: { en: "有名 is a な-adjective → 有名な.", id: "有名 adalah kata sifat な → 有名な." },
        },
      ],
    },
    {
      id: "adjectives:mcq",
      title: { en: "Pick the correct sentence", id: "Pilih kalimat yang benar" },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "\"It wasn't cold yesterday.\"", id: "\"Kemarin tidak dingin.\"" },
          options: ["きのうは さむいでした。", "きのうは さむくなかったです。", "きのうは さむいじゃなかったです。"],
          answer: 1,
          explain: { en: "さむい → さむくなかった (+ です).", id: "さむい → さむくなかった (+ です)." },
        },
        {
          kind: "mcq",
          prompt: { en: "\"a convenient (べんり) station\"", id: "\"stasiun yang praktis (べんり)\"" },
          options: ["べんりい えき", "べんりな えき", "べんりの えき"],
          answer: 1,
          explain: { en: "べんり is a な-adjective.", id: "べんり adalah kata sifat な." },
        },
        {
          kind: "mcq",
          prompt: { en: "Linking form: \"cheap and delicious\"", id: "Bentuk penghubung: \"murah dan enak\"" },
          options: ["やすいと おいしい", "やすくて おいしい", "やすいで おいしい"],
          answer: 1,
          explain: { en: "い-adj link: やすい → やすくて.", id: "Penghubung kata sifat い: やすい → やすくて." },
        },
      ],
    },
    {
      id: "adjectives:build",
      title: { en: "Build the sentence", id: "Susun kalimatnya" },
      questions: [
        {
          kind: "build",
          tiles: ["この", "レストランの", "料理[りょうり]は", "あまり", "おいしくない", "です"],
          en: "The food at this restaurant isn't very tasty.",
          id: "Masakan di restoran ini kurang enak.",
        },
        {
          kind: "build",
          tiles: ["きれいな", "海[うみ]で", "泳[およ]ぎたい", "です"],
          en: "I want to swim in a beautiful sea.",
          id: "Saya ingin berenang di laut yang indah.",
        },
      ],
    },
  ],
};
