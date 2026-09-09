import type { ContentModule } from "@/lib/types";
import { conjugationGroup } from "@/data/verbs-n5";

export const teForm: ContentModule = {
  type: "lesson",
  slug: "te-form",
  level: "N5",
  title: { en: "The て-Form", id: "Bentuk て" },
  titleJa: "て形",
  summary: {
    en: "The connector form. Master these endings once and you unlock requests, progressives, permission, sequencing, and dozens of N4 patterns.",
    id: "Bentuk penghubung. Kuasai akhiran ini sekali dan kamu membuka permintaan, bentuk sedang berlangsung, izin, urutan, dan puluhan pola N4.",
  },
  sections: [
    {
      kind: "table",
      heading: { en: "Group 1 endings", id: "Akhiran Golongan 1" },
      columns: [
        { en: "Ends in", id: "Berakhiran" },
        { en: "→", id: "→" },
        { en: "Example", id: "Contoh" },
      ],
      rows: [
        { cells: ["う・つ・る", "って", "買[か]う → 買って"], ja: true },
        { cells: ["ぬ・ぶ・む", "んで", "飲[の]む → 飲んで"], ja: true },
        { cells: ["く", "いて", "書[か]く → 書いて"], ja: true },
        { cells: ["ぐ", "いで", "泳[およ]ぐ → 泳いで"], ja: true },
        { cells: ["す", "して", "話[はな]す → 話して"], ja: true },
        { cells: [{ en: "exception", id: "pengecualian" }, "行[い]って", "行[い]く → 行って"], ja: true },
      ],
    },
    {
      kind: "prose",
      heading: { en: "Group 2 & 3", id: "Golongan 2 & 3" },
      body: {
        en: "Group 2: drop る, add て — 食[た]べる → 食べて, 見[み]る → 見て.\nGroup 3: する → して, 来[く]る → 来[き]て.",
        id: "Golongan 2: hilangkan る, tambah て — 食[た]べる → 食べて, 見[み]る → 見て.\nGolongan 3: する → して, 来[く]る → 来[き]て.",
      },
    },
    {
      kind: "table",
      heading: { en: "What て-form is used for", id: "Kegunaan bentuk て" },
      columns: [
        { en: "Pattern", id: "Pola" },
        { en: "Meaning", id: "Arti" },
      ],
      rows: [
        { cells: ["〜てください", { en: "please do ~", id: "tolong lakukan ~" }] },
        { cells: ["〜ています", { en: "~ing / ongoing state", id: "sedang ~ / keadaan berlangsung" }] },
        { cells: ["〜てもいいです", { en: "may / it's OK to ~", id: "boleh ~" }] },
        { cells: ["〜てはいけません", { en: "must not ~", id: "tidak boleh ~" }] },
        { cells: ["〜て、〜", { en: "do A, then B / and", id: "lakukan A, lalu B / dan" }] },
        { cells: ["〜てから", { en: "after doing ~", id: "setelah melakukan ~" }] },
      ],
    },
    {
      kind: "examples",
      items: [
        {
          ja: "ここに 名前[なまえ]を 書[か]いてください。",
          en: "Please write your name here.",
          id: "Tolong tulis nama Anda di sini.",
        },
        {
          ja: "今[いま] 昼[ひる]ご飯[はん]を 食[た]べています。",
          en: "I'm eating lunch right now.",
          id: "Saya sedang makan siang sekarang.",
        },
        {
          ja: "写真[しゃしん]を 撮[と]ってもいいですか。",
          en: "Is it OK to take a photo?",
          id: "Boleh saya memotret?",
        },
        {
          ja: "朝[あさ] 起[お]きて、コーヒーを 飲[の]んで、新聞[しんぶん]を 読[よ]みます。",
          en: "I get up in the morning, drink coffee, and read the newspaper.",
          id: "Pagi hari saya bangun, minum kopi, lalu membaca koran.",
        },
        {
          ja: "宿題[しゅくだい]を してから、テレビを 見[み]ます。",
          en: "After I do my homework, I watch TV.",
          id: "Setelah mengerjakan PR, saya menonton TV.",
        },
      ],
    },
    {
      kind: "note",
      tone: "tip",
      body: {
        en: "The た-form (plain past) uses the exact same sound changes — just swap て→た and で→だ. Learn one, get the other free.",
        id: "Bentuk た (lampau biasa) memakai perubahan bunyi yang sama persis — cukup ganti て→た dan で→だ. Belajar satu, dapat yang lain gratis.",
      },
    },
  ],
  exercises: [
    {
      id: "te-form:drill",
      title: { en: "て-form streak", id: "Runtun bentuk て" },
      questions: conjugationGroup("_", { en: "", id: "" }, ["te"]).questions,
      mode: "streak",
    },
    {
      id: "te-form:usage",
      title: { en: "Choose the right pattern", id: "Pilih pola yang tepat" },
      questions: [
        {
          kind: "mcq",
          ja: "すみません、道[みち]を おしえて＿＿＿。",
          prompt: { en: "\"Please tell me the way.\"", id: "\"Tolong beri tahu jalannya.\"" },
          options: ["います", "ください", "から", "もいいです"],
          answer: 1,
          explain: { en: "Request → 〜てください.", id: "Permintaan → 〜てください." },
        },
        {
          kind: "mcq",
          ja: "父[ちち]は 今[いま] 電話[でんわ]で 話[はな]して＿＿＿。",
          prompt: { en: "\"My father is talking on the phone now.\"", id: "\"Ayah sedang menelepon sekarang.\"" },
          options: ["います", "ください", "から", "はいけません"],
          answer: 0,
          explain: { en: "Ongoing action → 〜ています.", id: "Aksi berlangsung → 〜ています." },
        },
        {
          kind: "mcq",
          ja: "ここで たばこを すって＿＿＿。",
          prompt: { en: "\"You must not smoke here.\"", id: "\"Dilarang merokok di sini.\"" },
          options: ["ください", "います", "はいけません", "から"],
          answer: 2,
          explain: { en: "Prohibition → 〜てはいけません.", id: "Larangan → 〜てはいけません." },
        },
        {
          kind: "cloze",
          ja: "手[て]を 洗[あら]___ から、ご飯[はん]を 食[た]べます。",
          accept: ["って"],
          en: "I'll eat after washing my hands.",
          id: "Saya makan setelah cuci tangan.",
          explain: { en: "洗う → 洗って (う→って).", id: "洗う → 洗って (う→って)." },
        },
      ],
    },
    {
      id: "te-form:build",
      title: { en: "Sequence the actions", id: "Urutkan tindakannya" },
      questions: [
        {
          kind: "build",
          tiles: ["デパートに", "行[い]って", "友[とも]だちに", "会[あ]って", "買[か]い物[もの]を", "しました"],
          en: "I went to the department store, met a friend, and did some shopping.",
          id: "Saya pergi ke department store, bertemu teman, lalu berbelanja.",
        },
      ],
    },
  ],
};
