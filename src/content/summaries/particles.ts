import type { MaterialSummary } from "@/lib/types";

export const particlesSummary: MaterialSummary = {
  slug: "particles",
  title: { en: "Core Particles", id: "Partikel Inti" },
  titleJa: "助詞",
  level: "N5",
  intro: {
    en: "は・が・を・に・で・へ・と・も at a glance — what each one marks.",
    id: "は・が・を・に・で・へ・と・も sekilas — apa yang ditandai masing-masing.",
  },
  points: [
    {
      heading: { en: "は — topic", id: "は — topik" },
      body: {
        en: "\"As for X…\" Marks what the sentence is about — usually something already known or being contrasted.",
        id: "\"Mengenai X…\" Menandai apa yang dibicarakan kalimat — biasanya sesuatu yang sudah diketahui atau sedang dikontraskan.",
      },
    },
    {
      heading: { en: "が — subject / new info", id: "が — subjek / info baru" },
      body: {
        en: "Introduces something new, answers \"which one?\", marks a question-word subject, and marks the thing after 好き・上手・ある・いる.",
        id: "Memperkenalkan sesuatu yang baru, menjawab \"yang mana?\", menandai subjek berupa kata tanya, dan menandai objek setelah 好き・上手・ある・いる.",
      },
    },
    {
      heading: { en: "を — direct object", id: "を — objek langsung" },
      body: { en: "The thing directly acted on by the verb.", id: "Benda yang langsung dikenai tindakan oleh kata kerja." },
    },
    {
      heading: { en: "に — point", id: "に — titik" },
      body: {
        en: "Destination, a specific clock/calendar time, or where something exists (いる／ある).",
        id: "Tujuan, waktu jam/kalender yang spesifik, atau tempat sesuatu berada (いる／ある).",
      },
    },
    {
      heading: { en: "で — place of action / means", id: "で — tempat tindakan / alat" },
      body: { en: "Where an action happens, or the tool/method used.", id: "Tempat terjadinya tindakan, atau alat/cara yang dipakai." },
    },
    {
      heading: { en: "へ — direction", id: "へ — arah" },
      body: { en: "Almost the same as destination に, but softer — about the direction, not the exact endpoint.", id: "Hampir sama dengan に tujuan, tapi lebih lembut — soal arah, bukan titik akhir yang pasti." },
    },
    {
      heading: { en: "と／も — and, with / also", id: "と／も — dan, dengan / juga" },
      body: { en: "と links nouns (\"and\") or marks a companion (\"with\"). も replaces は or が to mean \"too / also\".", id: "と menghubungkan nomina (\"dan\") atau menandai teman (\"dengan\"). も menggantikan は atau が untuk arti \"juga\"." },
    },
  ],
  examples: [
    {
      ja: "母[はは]は 台所[だいどころ]で 料理[りょうり]を 作[つく]っています。",
      en: "My mother is cooking in the kitchen.",
      id: "Ibu saya sedang memasak di dapur.",
    },
    {
      ja: "電車[でんしゃ]が 来[き]ました。",
      en: "The train has come.",
      id: "Keretanya sudah datang.",
      note: { en: "New event just noticed → が", id: "Kejadian baru yang baru disadari → が" },
    },
    {
      ja: "土曜日[どようび]に 姉[あね]と 買[か]い物[もの]に 行[い]きます。",
      en: "I'm going shopping with my older sister on Saturday.",
      id: "Hari Sabtu saya pergi belanja bersama kakak perempuan.",
    },
    {
      ja: "この 電車[でんしゃ]は 大阪[おおさか]へ 行[い]きます。",
      en: "This train is bound for Osaka.",
      id: "Kereta ini menuju Osaka.",
    },
    {
      ja: "兄[あに]も サッカーが 好[す]きです。",
      en: "My older brother likes soccer too.",
      id: "Kakak laki-laki saya juga suka sepak bola.",
    },
  ],
};
