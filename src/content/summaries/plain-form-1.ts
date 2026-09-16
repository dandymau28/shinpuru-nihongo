import type { MaterialSummary } from "@/lib/types";

export const plainForm1Summary: MaterialSummary = {
  slug: "plain-form-1",
  title: { en: "Plain Form (1): The Four Corners", id: "Bentuk Biasa (1): Empat Sudut" },
  titleJa: "普通形（１）",
  level: "N4",
  intro: {
    en: "The base almost every N4 pattern attaches to — non-past/past, positive/negative, all three word types.",
    id: "Dasar tempat hampir semua pola N4 menempel — non-lampau/lampau, positif/negatif, untuk ketiga jenis kata.",
  },
  points: [
    {
      heading: { en: "Why it matters", id: "Mengapa penting" },
      body: {
        en: "〜と思う, 〜かもしれない, 〜つもり, 〜前に, noun modification — all of these attach to the PLAIN form, not ます.",
        id: "〜と思う, 〜かもしれない, 〜つもり, 〜前に, modifikasi nomina — semuanya menempel pada bentuk BIASA, bukan ます.",
      },
    },
    {
      heading: { en: "Verbs", id: "Kata kerja" },
      body: { en: "行く (+) / 行かない (−) / 行った (past +) / 行かなかった (past −).", id: "行く (+) / 行かない (−) / 行った (lampau +) / 行かなかった (lampau −)." },
    },
    {
      heading: { en: "い-adjectives", id: "Kata sifat い" },
      body: { en: "高い (+) / 高くない (−) / 高かった (past +) / 高くなかった (past −).", id: "高い (+) / 高くない (−) / 高かった (lampau +) / 高くなかった (lampau −)." },
    },
    {
      heading: { en: "な-adjectives & nouns", id: "Kata sifat な & nomina" },
      body: {
        en: "静かだ (+) / 静かじゃない (−) / 静かだった (past +) / 静かじゃなかった (past −). Note: plain non-past positive keeps だ.",
        id: "静かだ (+) / 静かじゃない (−) / 静かだった (lampau +) / 静かじゃなかった (lampau −). Catatan: non-lampau positif biasa tetap memakai だ.",
      },
    },
  ],
  examples: [
    { ja: "山田[やまだ]さんは たぶん 来[こ]ないと 思[おも]います。", en: "I think Yamada probably won't come.", id: "Saya pikir Yamada mungkin tidak akan datang." },
    { ja: "この 部屋[へや]は むかし もっと きれいだった。", en: "This room used to be cleaner.", id: "Kamar ini dulu lebih bersih." },
    { ja: "宿題[しゅくだい]を しなかった 学生[がくせい]は 3人[さんにん]です。", en: "Three students didn't do the homework.", id: "Tiga siswa tidak mengerjakan PR." },
  ],
};
