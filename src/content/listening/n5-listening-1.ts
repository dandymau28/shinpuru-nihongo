import type { ContentModule } from "@/lib/types";

export const n5Listening1: ContentModule = {
  type: "listening",
  slug: "n5-listening-1",
  title: { en: "N5 Listening — Short Exchanges", id: "Menyimak N5 — Percakapan Singkat" },
  description: {
    en: "Play each clip (your browser reads it in Japanese), answer without looking, then reveal the transcript to check.",
    id: "Putar tiap klip (browser membacakannya dalam bahasa Jepang), jawab tanpa melihat, lalu buka transkrip untuk memeriksa.",
  },
  clips: [
    {
      id: "cafe",
      title: { en: "Ordering at a café", id: "Memesan di kafe" },
      script: [
        { speaker: "店員", ja: "いらっしゃいませ。ご注文は？" },
        { speaker: "客", ja: "ホットコーヒーを 一つ ください。" },
        { speaker: "店員", ja: "サイズは いかがですか。" },
        { speaker: "客", ja: "Mサイズで。あ、あと チーズケーキも お願いします。" },
        { speaker: "店員", ja: "かしこまりました。合わせて 八百円です。" },
      ],
      questions: [
        {
          kind: "mcq",
          prompt: { en: "What does the customer order?", id: "Apa yang dipesan pelanggan?" },
          options: [
            { en: "Iced coffee only", id: "Kopi dingin saja" },
            { en: "Hot coffee and cheesecake", id: "Kopi panas dan cheesecake" },
            { en: "Tea and cake", id: "Teh dan kue" },
            { en: "Hot coffee only", id: "Kopi panas saja" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "How much is it in total?", id: "Berapa totalnya?" },
          options: ["¥400", "¥600", "¥800", "¥1,000"],
          answer: 2,
        },
      ],
    },
    {
      id: "meeting-time",
      title: { en: "What time to meet", id: "Jam berapa bertemu" },
      script: [
        { speaker: "男", ja: "明日の 映画、何時からだっけ？" },
        { speaker: "女", ja: "七時半からだよ。" },
        { speaker: "男", ja: "じゃあ、七時に 駅で 会おうか。" },
        { speaker: "女", ja: "うーん、十五分前に しよう。人が 多いから。" },
        { speaker: "男", ja: "分かった。six forty-five ね。" },
      ],
      questions: [
        {
          kind: "mcq",
          prompt: { en: "What time will they meet at the station?", id: "Jam berapa mereka bertemu di stasiun?" },
          options: ["7:00", "7:15", "6:45", "7:30"],
          answer: 2,
          explain: { en: "十五分前 before 7:00 = 6:45.", id: "十五分前 sebelum 7:00 = 6:45." },
        },
        {
          kind: "mcq",
          prompt: { en: "Why do they meet earlier?", id: "Mengapa mereka bertemu lebih awal?" },
          options: [
            { en: "The movie starts early", id: "Filmnya mulai lebih awal" },
            { en: "It will be crowded", id: "Akan ramai" },
            { en: "They want dinner first", id: "Mereka ingin makan dulu" },
            { en: "The train is slow", id: "Keretanya lambat" },
          ],
          answer: 1,
        },
      ],
    },
    {
      id: "lost-item",
      title: { en: "At the station office", id: "Di kantor stasiun" },
      script: [
        { speaker: "駅員", ja: "はい、忘れ物 係です。" },
        { speaker: "客", ja: "すみません、さっき 電車に かばんを 忘れました。" },
        { speaker: "駅員", ja: "何色の かばんですか。" },
        { speaker: "客", ja: "黒くて、小さい かばんです。中に 財布と 傘が 入っています。" },
        { speaker: "駅員", ja: "少々 お待ちください。……ああ、ありました。緑の 窓口で 受け取って ください。" },
      ],
      questions: [
        {
          kind: "mcq",
          prompt: { en: "What did the person lose?", id: "Apa yang hilang?" },
          options: [
            { en: "A black wallet", id: "Dompet hitam" },
            { en: "A small black bag", id: "Tas kecil hitam" },
            { en: "A green umbrella", id: "Payung hijau" },
            { en: "A phone", id: "Telepon" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "Where should they pick it up?", id: "Di mana mengambilnya?" },
          options: [
            { en: "The lost-and-found office", id: "Kantor barang hilang" },
            { en: "The green window / counter", id: "Loket hijau" },
            { en: "On the platform", id: "Di peron" },
            { en: "The police box", id: "Pos polisi" },
          ],
          answer: 1,
        },
      ],
    },
    {
      id: "weekend-plan",
      title: { en: "Weekend plans", id: "Rencana akhir pekan" },
      script: [
        { speaker: "女", ja: "土曜日、何か 予定 ある？" },
        { speaker: "男", ja: "午前中は 部屋の 掃除を するつもり。午後は 暇だよ。" },
        { speaker: "女", ja: "じゃあ、一緒に 買い物に 行かない？新しい 靴が 欲しいんだ。" },
        { speaker: "男", ja: "いいね。二時ごろ 駅で どう？" },
        { speaker: "女", ja: "オッケー。" },
      ],
      questions: [
        {
          kind: "mcq",
          prompt: { en: "What will the man do on Saturday morning?", id: "Apa yang pria lakukan Sabtu pagi?" },
          options: [
            { en: "Go shopping", id: "Berbelanja" },
            { en: "Clean his room", id: "Membersihkan kamar" },
            { en: "Buy shoes", id: "Membeli sepatu" },
            { en: "Meet at the station", id: "Bertemu di stasiun" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "What does the woman want to buy?", id: "Apa yang ingin dibeli si wanita?" },
          options: [
            { en: "A bag", id: "Tas" },
            { en: "New shoes", id: "Sepatu baru" },
            { en: "A cleaning tool", id: "Alat kebersihan" },
            { en: "A train ticket", id: "Tiket kereta" },
          ],
          answer: 1,
        },
      ],
    },
    {
      id: "directions",
      title: { en: "Asking the way", id: "Menanyakan jalan" },
      script: [
        { speaker: "旅行者", ja: "すみません、この 近くに 郵便局は ありますか。" },
        { speaker: "人", ja: "郵便局ですね。この 道を まっすぐ 行って、二つ目の 信号を 右に 曲がって ください。" },
        { speaker: "旅行者", ja: "二つ目の 信号を 右ですね。" },
        { speaker: "人", ja: "はい。銀行の 隣に あります。歩いて 五分ぐらいです。" },
      ],
      questions: [
        {
          kind: "mcq",
          prompt: { en: "Where do you turn right?", id: "Di mana belok kanan?" },
          options: [
            { en: "At the first light", id: "Di lampu pertama" },
            { en: "At the second light", id: "Di lampu kedua" },
            { en: "At the bank", id: "Di bank" },
            { en: "At the post office", id: "Di kantor pos" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "The post office is next to…", id: "Kantor pos ada di sebelah…" },
          options: [
            { en: "a bank", id: "bank" },
            { en: "a convenience store", id: "minimarket" },
            { en: "a station", id: "stasiun" },
            { en: "a school", id: "sekolah" },
          ],
          answer: 0,
        },
      ],
    },
    {
      id: "phone-message",
      title: { en: "A phone message", id: "Pesan telepon" },
      script: [
        { speaker: "田中", ja: "もしもし、佐藤さんですか。田中です。" },
        { speaker: "田中", ja: "明日の 会議ですが、部屋が 変わりました。3階の 305号室です。" },
        { speaker: "田中", ja: "時間は 同じで、午後 二時からです。資料を 十部 持ってきて ください。" },
        { speaker: "田中", ja: "では、よろしく お願いします。" },
      ],
      questions: [
        {
          kind: "mcq",
          prompt: { en: "What changed about the meeting?", id: "Apa yang berubah dari rapat?" },
          options: [
            { en: "The time", id: "Waktunya" },
            { en: "The room", id: "Ruangannya" },
            { en: "The date", id: "Tanggalnya" },
            { en: "It was cancelled", id: "Dibatalkan" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "How many copies of the materials should Sato bring?", id: "Berapa salinan materi yang harus dibawa Sato?" },
          options: ["3", "5", "10", "15"],
          answer: 2,
        },
        {
          kind: "mcq",
          prompt: { en: "What time does the meeting start?", id: "Jam berapa rapat mulai?" },
          options: ["1 p.m.", "2 p.m.", "3 p.m.", "It didn't say", ],
          answer: 1,
        },
      ],
    },
  ],
};
