import type { ContentModule } from "@/lib/types";
import { conjugationGroup } from "@/data/verbs-n5";

export const verbForms: ContentModule = {
  type: "lesson",
  slug: "verb-forms",
  level: "N5",
  title: { en: "Verb Groups & Basic Forms", id: "Golongan & Bentuk Dasar Kata Kerja" },
  titleJa: "動詞のグループ",
  summary: {
    en: "Every Japanese verb belongs to one of three groups. Once you can spot the group, the ます / dictionary / ない / た forms follow simple rules.",
    id: "Setiap kata kerja bahasa Jepang masuk salah satu dari tiga golongan. Begitu bisa mengenali golongannya, bentuk ます / kamus / ない / た mengikuti aturan sederhana.",
  },
  sections: [
    {
      kind: "prose",
      heading: { en: "The three groups", id: "Tiga golongan" },
      body: {
        en: "Group 2 (ichidan / \"る-verbs\"): dictionary form ends in ‑iる or ‑eる, e.g. 食べる, 見る. Drop る and add the ending.\nGroup 3 (irregular): only する and 来[く]る.\nGroup 1 (godan / \"う-verbs\"): everything else — ends in any う-row kana (く, む, う, る…). A few ‑る verbs look like Group 2 but are Group 1: 帰[かえ]る, 入[はい]る, 走[はし]る.",
        id: "Golongan 2 (ichidan / \"kata kerja る\"): bentuk kamus berakhiran ‑iる atau ‑eる, mis. 食べる, 見る. Hilangkan る lalu tambahkan akhiran.\nGolongan 3 (tak beraturan): hanya する dan 来[く]る.\nGolongan 1 (godan / \"kata kerja う\"): selain itu — berakhiran kana baris‑う (く, む, う, る…). Beberapa kata kerja ‑る tampak Golongan 2 tapi sebenarnya Golongan 1: 帰[かえ]る, 入[はい]る, 走[はし]る.",
      },
    },
    {
      kind: "table",
      heading: { en: "Group 1 stem changes", id: "Perubahan akar Golongan 1" },
      columns: [
        { en: "Dictionary", id: "Kamus" },
        { en: "ます", id: "ます" },
        { en: "ない", id: "ない" },
        { en: "た (past)", id: "た (lampau)" },
      ],
      rows: [
        { cells: ["書[か]く", "書きます", "書かない", "書いた"], ja: true },
        { cells: ["飲[の]む", "飲みます", "飲まない", "飲んだ"], ja: true },
        { cells: ["買[か]う", "買います", "買わない", "買った"], ja: true },
        { cells: ["待[ま]つ", "待ちます", "待たない", "待った"], ja: true },
        { cells: ["話[はな]す", "話します", "話さない", "話した"], ja: true },
      ],
    },
    {
      kind: "table",
      heading: { en: "Group 2 & 3", id: "Golongan 2 & 3" },
      columns: [
        { en: "Dictionary", id: "Kamus" },
        { en: "ます", id: "ます" },
        { en: "ない", id: "ない" },
        { en: "た", id: "た" },
      ],
      rows: [
        { cells: ["食[た]べる", "食べます", "食べない", "食べた"], ja: true },
        { cells: ["見[み]る", "見ます", "見ない", "見た"], ja: true },
        { cells: ["する", "します", "しない", "した"], ja: true },
        { cells: ["来[く]る", "来[き]ます", "来[こ]ない", "来[き]た"], ja: true },
      ],
    },
    {
      kind: "note",
      tone: "tip",
      body: {
        en: "For Group 1 た-form, the rule mirrors て-form: く→いた, ぐ→いだ, う・つ・る→った, ぬ・ぶ・む→んだ, す→した. The one irregular: 行[い]く → 行った.",
        id: "Untuk bentuk た Golongan 1, aturannya sama dengan bentuk て: く→いた, ぐ→いだ, う・つ・る→った, ぬ・ぶ・む→んだ, す→した. Satu pengecualian: 行[い]く → 行った.",
      },
    },
    {
      kind: "examples",
      heading: { en: "Same verb, four forms", id: "Kata kerja sama, empat bentuk" },
      items: [
        {
          ja: "毎日[まいにち] 日本語[にほんご]を 話[はな]します。",
          en: "I speak Japanese every day.",
          id: "Saya berbicara bahasa Jepang setiap hari.",
        },
        {
          ja: "今日[きょう]は 話[はな]さない。",
          en: "I won't speak (Japanese) today.",
          id: "Hari ini saya tidak akan berbicara.",
        },
        {
          ja: "きのう 先生[せんせい]と 話[はな]した。",
          en: "I talked with the teacher yesterday.",
          id: "Kemarin saya berbicara dengan guru.",
        },
        {
          ja: "友[とも]だちと 話[はな]すのが 好[す]きです。",
          en: "I like talking with friends. (dictionary form + の)",
          id: "Saya suka mengobrol dengan teman. (bentuk kamus + の)",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "verb-forms:group-mcq",
      title: { en: "Which group?", id: "Golongan berapa?" },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "食[た]べる belongs to…", id: "食[た]べる termasuk…" },
          options: ["Group 1 (godan)", "Group 2 (ichidan)", "Group 3 (irregular)"],
          answer: 1,
          explain: { en: "Ends in ‑eる, regular → Group 2.", id: "Berakhiran ‑eる, beraturan → Golongan 2." },
        },
        {
          kind: "mcq",
          prompt: { en: "帰[かえ]る belongs to…", id: "帰[かえ]る termasuk…" },
          options: ["Group 1 (godan)", "Group 2 (ichidan)", "Group 3 (irregular)"],
          answer: 0,
          explain: {
            en: "Looks like a る-verb but is a known Group 1 exception: 帰ります, 帰らない.",
            id: "Tampak seperti kata kerja る tapi pengecualian Golongan 1: 帰ります, 帰らない.",
          },
        },
        {
          kind: "mcq",
          prompt: { en: "The ます-form of 飲[の]む is…", id: "Bentuk ます dari 飲[の]む adalah…" },
          options: ["飲みます", "飲まます", "飲んます", "飲むます"],
          answer: 0,
          explain: { en: "む → み + ます.", id: "む → み + ます." },
        },
        {
          kind: "mcq",
          prompt: { en: "The plain past (た) of 行[い]く is…", id: "Bentuk lampau biasa (た) dari 行[い]く adalah…" },
          options: ["行いた", "行った", "行きた", "行んだ"],
          answer: 1,
          explain: { en: "行く is the famous exception → 行った.", id: "行く adalah pengecualian terkenal → 行った." },
        },
        {
          kind: "mcq",
          prompt: { en: "The ない-form of 買[か]う is…", id: "Bentuk ない dari 買[か]う adalah…" },
          options: ["買あない", "買らない", "買わない", "買いない"],
          answer: 2,
          explain: { en: "For う-ending godan verbs, う → わ before ない.", id: "Untuk kata kerja godan berakhiran う, う → わ sebelum ない." },
        },
      ],
    },
    conjugationGroup(
      "verb-forms:drill",
      { en: "Conjugation streak — ます, ない, た", id: "Runtun konjugasi — ます, ない, た" },
      ["masu", "nai", "ta"],
    ),
  ],
};
