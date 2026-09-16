import type { MaterialSummary } from "@/lib/types";

export const teFormSummary: MaterialSummary = {
  slug: "te-form",
  title: { en: "The て-Form", id: "Bentuk て" },
  titleJa: "て形",
  level: "N5",
  intro: {
    en: "One connector form that unlocks requests, ongoing actions, permission, and sequencing.",
    id: "Satu bentuk penghubung yang membuka permintaan, aksi berlangsung, izin, dan urutan kejadian.",
  },
  points: [
    {
      heading: { en: "Group 1 sound changes", id: "Perubahan bunyi Golongan 1" },
      body: {
        en: "う・つ・る→って, ぬ・ぶ・む→んで, く→いて, ぐ→いで, す→して. Exception: 行く→行って.",
        id: "う・つ・る→って, ぬ・ぶ・む→んで, く→いて, ぐ→いで, す→して. Pengecualian: 行く→行って.",
      },
    },
    {
      heading: { en: "Group 2 & 3", id: "Golongan 2 & 3" },
      body: { en: "Group 2: drop る, add て (食べる→食べて). Group 3: する→して, 来る→来て.", id: "Golongan 2: hilangkan る, tambah て (食べる→食べて). Golongan 3: する→して, 来る→来て." },
    },
    {
      heading: { en: "What it's used for", id: "Kegunaannya" },
      body: {
        en: "〜てください (please), 〜ています (ongoing/state), 〜てもいいです (may I), 〜てはいけません (must not), 〜て〜 (then), 〜てから (after doing).",
        id: "〜てください (tolong), 〜ています (sedang berlangsung/keadaan), 〜てもいいです (bolehkah), 〜てはいけません (tidak boleh), 〜て〜 (lalu), 〜てから (setelah melakukan).",
      },
    },
    {
      heading: { en: "Bonus: た-form is free", id: "Bonus: bentuk た gratis" },
      body: { en: "Plain past uses the exact same sound changes — just swap て→た, で→だ.", id: "Lampau biasa memakai perubahan bunyi yang sama persis — tinggal ganti て→た, で→だ." },
    },
  ],
  examples: [
    { ja: "この 書類[しょるい]に サインしてください。", en: "Please sign this document.", id: "Tolong tanda tangani dokumen ini." },
    { ja: "妹[いもうと]は 今[いま] 音楽[おんがく]を 聞[き]いています。", en: "My little sister is listening to music right now.", id: "Adik perempuan saya sedang mendengarkan musik sekarang." },
    { ja: "ここで 写真[しゃしん]を 撮[と]ってもいいですか。", en: "Is it OK to take photos here?", id: "Boleh saya memotret di sini?" },
    { ja: "このドアを 開[あ]けてはいけません。", en: "You must not open this door.", id: "Pintu ini tidak boleh dibuka." },
    { ja: "手[て]を 洗[あら]ってから、食[た]べます。", en: "I wash my hands, then eat.", id: "Saya cuci tangan dulu, lalu makan." },
  ],
};
