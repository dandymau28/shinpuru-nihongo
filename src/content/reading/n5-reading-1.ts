import type { ContentModule } from "@/lib/types";

export const n5Reading1: ContentModule = {
  type: "reading",
  slug: "n5-reading-1",
  title: { en: "N5 Reading — Everyday Texts", id: "Membaca N5 — Teks Sehari-hari" },
  description: {
    en: "Five short passages: a note, a schedule, an email, a diary entry, and a notice. Read once for the gist, then answer.",
    id: "Lima bacaan singkat: catatan, jadwal, email, catatan harian, dan pengumuman. Baca sekali untuk inti, lalu jawab.",
  },
  items: [
    {
      id: "note",
      title: { en: "A note on the table", id: "Catatan di meja" },
      passage:
        "リンさんへ\n\n今日[きょう]は 仕事[しごと]が 遅[おそ]く なります。 晩[ばん]ご飯[はん]は 冷蔵庫[れいぞうこ]の 中[なか]に あります。 温[あたた]めて 食[た]べて ください。\nお皿[さら]は 洗[あら]わなくても いいです。 わたしが 帰[かえ]ってから します。\n\n田中[たなか]",
      translation: {
        en: "To Lin — I'll be late from work today. Dinner is in the fridge. Please heat it up and eat. You don't have to wash the dishes; I'll do them after I get home. — Tanaka",
        id: "Untuk Lin — Hari ini aku pulang kerja terlambat. Makan malam ada di kulkas. Tolong panaskan lalu makan. Piringnya tidak perlu dicuci; nanti aku yang cuci setelah pulang. — Tanaka",
      },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "Where is the dinner?", id: "Di mana makan malamnya?" },
          options: [
            { en: "On the table", id: "Di atas meja" },
            { en: "In the fridge", id: "Di dalam kulkas" },
            { en: "At the restaurant", id: "Di restoran" },
            { en: "Tanaka has it", id: "Dibawa Tanaka" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "What should Lin do about the dishes?", id: "Apa yang harus Lin lakukan soal piring?" },
          options: [
            { en: "Wash them now", id: "Cuci sekarang" },
            { en: "Leave them for Tanaka", id: "Biarkan untuk Tanaka" },
            { en: "Put them in the fridge", id: "Masukkan ke kulkas" },
            { en: "Throw them away", id: "Buang" },
          ],
          answer: 1,
          explain: {
            en: "洗わなくてもいいです = you don't have to wash them; Tanaka will.",
            id: "洗わなくてもいいです = tidak perlu mencuci; Tanaka yang akan mencuci.",
          },
        },
      ],
    },
    {
      id: "schedule",
      title: { en: "Community centre classes", id: "Kelas balai warga" },
      passage:
        "みなみ市民[しみん]センター 9月[がつ]の 教室[きょうしつ]\n\n・生[い]け花[ばな]  毎週[まいしゅう] 火曜日[かようび]  午前[ごぜん]10時[じ]〜12時\n・ヨガ  毎週 水曜日  午後[ごご]7時〜8時\n・料理[りょうり]  第[だい]2・第4 土曜日[どようび]  午後1時〜4時\n\n申[もう]し込[こ]みは 受付[うけつけ]で。 料理教室は 材料費[ざいりょうひ]500円[えん]が 必要[ひつよう]です。",
      translation: {
        en: "Minami Citizens' Centre, September classes: Ikebana — every Tuesday 10:00–12:00. Yoga — every Wednesday 19:00–20:00. Cooking — 2nd & 4th Saturdays 13:00–16:00. Apply at reception. The cooking class needs a 500-yen materials fee.",
        id: "Pusat Warga Minami, kelas September: Ikebana — tiap Selasa 10:00–12:00. Yoga — tiap Rabu 19:00–20:00. Memasak — Sabtu ke-2 & ke-4, 13:00–16:00. Daftar di resepsi. Kelas memasak butuh biaya bahan 500 yen.",
      },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "When is the yoga class?", id: "Kapan kelas yoga?" },
          options: [
            { en: "Tuesday morning", id: "Selasa pagi" },
            { en: "Wednesday evening", id: "Rabu malam" },
            { en: "Saturday afternoon", id: "Sabtu siang" },
            { en: "Every day", id: "Setiap hari" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "Which class costs extra money?", id: "Kelas mana yang butuh biaya tambahan?" },
          options: [
            { en: "Ikebana", id: "Ikebana" },
            { en: "Yoga", id: "Yoga" },
            { en: "Cooking", id: "Memasak" },
            { en: "All of them", id: "Semuanya" },
          ],
          answer: 2,
        },
        {
          kind: "mcq",
          prompt: { en: "How often is the cooking class?", id: "Seberapa sering kelas memasak?" },
          options: [
            { en: "Every Saturday", id: "Setiap Sabtu" },
            { en: "Twice a month", id: "Dua kali sebulan" },
            { en: "Once a week", id: "Seminggu sekali" },
            { en: "Every day", id: "Setiap hari" },
          ],
          answer: 1,
          explain: { en: "第2・第4土曜日 = the 2nd and 4th Saturdays.", id: "第2・第4土曜日 = Sabtu ke-2 dan ke-4." },
        },
      ],
    },
    {
      id: "email",
      title: { en: "An email to a friend", id: "Email kepada teman" },
      passage:
        "けん君[くん]\n\n来週[らいしゅう]の 土曜日[どようび]、うちで 誕生日[たんじょうび]パーティーを します。 6時[じ]ごろ 来[き]て ください。\nプレゼントは いりません。 でも、けん君は ギターが 上手[じょうず]だから、少[すこ]し 弾[ひ]いて くれませんか。\n\nみか",
      translation: {
        en: "Ken — Next Saturday I'm having a birthday party at my place. Please come around 6. No presents needed. But since you're good at guitar, could you play a little?  — Mika",
        id: "Ken — Sabtu depan aku mengadakan pesta ulang tahun di rumah. Datang sekitar jam 6 ya. Tidak perlu hadiah. Tapi karena kamu jago gitar, bisa main sebentar?  — Mika",
      },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "What does Mika ask Ken to bring or do?", id: "Apa yang Mika minta Ken bawa atau lakukan?" },
          options: [
            { en: "Bring a present", id: "Membawa hadiah" },
            { en: "Bring food", id: "Membawa makanan" },
            { en: "Play the guitar", id: "Bermain gitar" },
            { en: "Come early to help", id: "Datang awal untuk membantu" },
          ],
          answer: 2,
        },
        {
          kind: "mcq",
          prompt: { en: "What time should Ken arrive?", id: "Jam berapa Ken sebaiknya datang?" },
          options: ["Around 5", "Around 6", "Around 7", "Around 8"],
          answer: 1,
        },
      ],
    },
    {
      id: "diary",
      title: { en: "Diary: a rainy day", id: "Catatan harian: hari hujan" },
      passage:
        "今日[きょう]は 朝[あさ]から 雨[あめ]でした。 かさを 持[も]って 行[い]きましたが、電車[でんしゃ]の 中[なか]に 忘[わす]れて しまいました。\n駅[えき]から 会社[かいしゃ]まで 走[はし]りました。 服[ふく]が ぬれて、寒[さむ]かったです。\n明日[あした]は 晴[は]れると いいなあ。",
      translation: {
        en: "It rained from the morning today. I took an umbrella, but I left it on the train. I ran from the station to the office. My clothes got wet and I was cold. I hope it's sunny tomorrow.",
        id: "Hari ini hujan sejak pagi. Aku bawa payung, tapi ketinggalan di kereta. Aku berlari dari stasiun ke kantor. Bajuku basah dan aku kedinginan. Semoga besok cerah.",
      },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "What happened to the umbrella?", id: "Apa yang terjadi dengan payungnya?" },
          options: [
            { en: "It broke", id: "Rusak" },
            { en: "It was left on the train", id: "Tertinggal di kereta" },
            { en: "It was stolen", id: "Dicuri" },
            { en: "It was forgotten at home", id: "Tertinggal di rumah" },
          ],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "How did the writer feel?", id: "Bagaimana perasaan penulis?" },
          options: [
            { en: "Warm and happy", id: "Hangat dan senang" },
            { en: "Wet and cold", id: "Basah dan kedinginan" },
            { en: "Tired but dry", id: "Lelah tapi kering" },
            { en: "Nothing in particular", id: "Biasa saja" },
          ],
          answer: 1,
        },
      ],
    },
    {
      id: "notice",
      title: { en: "Library notice", id: "Pengumuman perpustakaan" },
      passage:
        "図書館[としょかん]を 利用[りよう]する みなさまへ\n\n8月[がつ]15日[にち]から 20日[にち]まで、館内[かんない]の 工事[こうじ]の ため、2階[かい]は 使[つか]えません。 1階[かい]と 3階[かい]は いつも どおり 利用[りよう]できます。\n本[ほん]を 返[かえ]す 人[ひと]は、入口[いりぐち]の 前[まえ]の ボックスを 使[つか]って ください。\n\nご迷惑[めいわく]を おかけします。",
      translation: {
        en: "To library users: From 15 to 20 August, the 2nd floor is closed due to construction. The 1st and 3rd floors are open as usual. To return books, please use the box in front of the entrance. We apologise for the inconvenience.",
        id: "Kepada pengguna perpustakaan: Dari 15–20 Agustus, lantai 2 tutup karena renovasi. Lantai 1 dan 3 buka seperti biasa. Untuk mengembalikan buku, gunakan kotak di depan pintu masuk. Mohon maaf atas ketidaknyamanannya.",
      },
      questions: [
        {
          kind: "mcq",
          prompt: { en: "Which floor is closed?", id: "Lantai mana yang tutup?" },
          options: ["1st", "2nd", "3rd", "All floors"],
          answer: 1,
        },
        {
          kind: "mcq",
          prompt: { en: "How can you return books during this time?", id: "Bagaimana mengembalikan buku selama masa ini?" },
          options: [
            { en: "Give them to a staff member on the 2nd floor", id: "Berikan ke petugas lantai 2" },
            { en: "Use the box in front of the entrance", id: "Gunakan kotak di depan pintu masuk" },
            { en: "Wait until 21 August", id: "Tunggu sampai 21 Agustus" },
            { en: "Post them by mail", id: "Kirim lewat pos" },
          ],
          answer: 1,
        },
      ],
    },
  ],
};
