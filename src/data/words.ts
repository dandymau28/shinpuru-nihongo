import type { Word, WordClass } from "@/lib/conjugation";
import { wordKind } from "@/lib/conjugation";

/**
 * The word bank for the conjugation trainer. `dict` uses furigana notation;
 * `kana` / `kanji` are the plain spellings the engine transforms.
 */
function w(
  dict: string,
  kana: string,
  kanji: string,
  romaji: string,
  cls: WordClass,
  en: string,
  id: string,
  jlpt: "N5" | "N4",
): Word {
  return { dict, kana, kanji, romaji, cls, meaning: { en, id }, jlpt };
}

// --- Verbs: godan (う-verbs) ------------------------------------------------
const godan: Word[] = [
  w("書[か]く", "かく", "書く", "kaku", "godan", "to write", "menulis", "N5"),
  w("聞[き]く", "きく", "聞く", "kiku", "godan", "to listen / ask", "mendengar / bertanya", "N5"),
  w("話[はな]す", "はなす", "話す", "hanasu", "godan", "to speak", "berbicara", "N5"),
  w("読[よ]む", "よむ", "読む", "yomu", "godan", "to read", "membaca", "N5"),
  w("飲[の]む", "のむ", "飲む", "nomu", "godan", "to drink", "minum", "N5"),
  w("休[やす]む", "やすむ", "休む", "yasumu", "godan", "to rest", "beristirahat", "N5"),
  w("買[か]う", "かう", "買う", "kau", "godan", "to buy", "membeli", "N5"),
  w("会[あ]う", "あう", "会う", "au", "godan", "to meet", "bertemu", "N5"),
  w("使[つか]う", "つかう", "使う", "tsukau", "godan", "to use", "memakai", "N5"),
  w("歌[うた]う", "うたう", "歌う", "utau", "godan", "to sing", "menyanyi", "N5"),
  w("待[ま]つ", "まつ", "待つ", "matsu", "godan", "to wait", "menunggu", "N5"),
  w("持[も]つ", "もつ", "持つ", "motsu", "godan", "to hold / have", "memegang / punya", "N5"),
  w("立[た]つ", "たつ", "立つ", "tatsu", "godan", "to stand", "berdiri", "N5"),
  w("泳[およ]ぐ", "およぐ", "泳ぐ", "oyogu", "godan", "to swim", "berenang", "N5"),
  w("急[いそ]ぐ", "いそぐ", "急ぐ", "isogu", "godan", "to hurry", "bergegas", "N5"),
  w("遊[あそ]ぶ", "あそぶ", "遊ぶ", "asobu", "godan", "to play", "bermain", "N5"),
  w("呼[よ]ぶ", "よぶ", "呼ぶ", "yobu", "godan", "to call", "memanggil", "N5"),
  w("死[し]ぬ", "しぬ", "死ぬ", "shinu", "godan", "to die", "mati", "N5"),
  w("帰[かえ]る", "かえる", "帰る", "kaeru", "godan", "to return home", "pulang", "N5"),
  w("入[はい]る", "はいる", "入る", "hairu", "godan", "to enter", "masuk", "N5"),
  w("取[と]る", "とる", "取る", "toru", "godan", "to take", "mengambil", "N5"),
  w("作[つく]る", "つくる", "作る", "tsukuru", "godan", "to make", "membuat", "N5"),
  w("分[わ]かる", "わかる", "分かる", "wakaru", "godan", "to understand", "mengerti", "N5"),
  w("乗[の]る", "のる", "乗る", "noru", "godan", "to ride", "naik (kendaraan)", "N5"),
  w("売[う]る", "うる", "売る", "uru", "godan", "to sell", "menjual", "N5"),
  w("走[はし]る", "はしる", "走る", "hashiru", "godan", "to run", "berlari", "N5"),
  w("撮[と]る", "とる", "撮る", "toru", "godan", "to take (a photo)", "memotret", "N5"),
  w("行[い]く", "いく", "行く", "iku", "iku", "to go", "pergi", "N5"),
  w("洗[あら]う", "あらう", "洗う", "arau", "godan", "to wash", "mencuci", "N5"),
  w("手伝[てつだ]う", "てつだう", "手伝う", "tetsudau", "godan", "to help", "membantu", "N4"),
  w("運[はこ]ぶ", "はこぶ", "運ぶ", "hakobu", "godan", "to carry", "mengangkut", "N4"),
  w("選[えら]ぶ", "えらぶ", "選ぶ", "erabu", "godan", "to choose", "memilih", "N4"),
  w("笑[わら]う", "わらう", "笑う", "warau", "godan", "to laugh", "tertawa", "N4"),
  w("払[はら]う", "はらう", "払う", "harau", "godan", "to pay", "membayar", "N4"),
  w("送[おく]る", "おくる", "送る", "okuru", "godan", "to send", "mengirim", "N4"),
  w("直[なお]す", "なおす", "直す", "naosu", "godan", "to fix", "memperbaiki", "N4"),
  w("探[さが]す", "さがす", "探す", "sagasu", "godan", "to look for", "mencari", "N4"),
  w("回[まわ]す", "まわす", "回す", "mawasu", "godan", "to turn / spin", "memutar", "N4"),
  w("動[うご]く", "うごく", "動く", "ugoku", "godan", "to move", "bergerak", "N4"),
  w("届[とど]く", "とどく", "届く", "todoku", "godan", "to reach / be delivered", "sampai", "N4"),
  w("怒[おこ]る", "おこる", "怒る", "okoru", "godan", "to get angry", "marah", "N4"),
  w("守[まも]る", "まもる", "守る", "mamoru", "godan", "to protect / keep", "melindungi", "N4"),
  w("騒[さわ]ぐ", "さわぐ", "騒ぐ", "sawagu", "godan", "to make noise", "ribut", "N4"),
];

// --- Verbs: ichidan (る-verbs) -------------------------------------------
const ichidan: Word[] = [
  w("食[た]べる", "たべる", "食べる", "taberu", "ichidan", "to eat", "makan", "N5"),
  w("見[み]る", "みる", "見る", "miru", "ichidan", "to see / watch", "melihat", "N5"),
  w("寝[ね]る", "ねる", "寝る", "neru", "ichidan", "to sleep", "tidur", "N5"),
  w("起[お]きる", "おきる", "起きる", "okiru", "ichidan", "to get up", "bangun", "N5"),
  w("出[で]る", "でる", "出る", "deru", "ichidan", "to leave / exit", "keluar", "N5"),
  w("着[き]る", "きる", "着る", "kiru", "ichidan", "to wear", "memakai (baju)", "N5"),
  w("開[あ]ける", "あける", "開ける", "akeru", "ichidan", "to open", "membuka", "N5"),
  w("閉[し]める", "しめる", "閉める", "shimeru", "ichidan", "to close", "menutup", "N5"),
  w("教[おし]える", "おしえる", "教える", "oshieru", "ichidan", "to teach", "mengajar", "N5"),
  w("覚[おぼ]える", "おぼえる", "覚える", "oboeru", "ichidan", "to memorise", "menghafal", "N5"),
  w("忘[わす]れる", "わすれる", "忘れる", "wasureru", "ichidan", "to forget", "lupa", "N5"),
  w("借[か]りる", "かりる", "借りる", "kariru", "ichidan", "to borrow", "meminjam", "N5"),
  w("浴[あ]びる", "あびる", "浴びる", "abiru", "ichidan", "to take (a shower)", "mandi (shower)", "N5"),
  w("降[お]りる", "おりる", "降りる", "oriru", "ichidan", "to get off", "turun (kendaraan)", "N5"),
  w("見[み]せる", "みせる", "見せる", "miseru", "ichidan", "to show", "memperlihatkan", "N5"),
  w("調[しら]べる", "しらべる", "調べる", "shiraberu", "ichidan", "to look up / investigate", "memeriksa", "N4"),
  w("答[こた]える", "こたえる", "答える", "kotaeru", "ichidan", "to answer", "menjawab", "N4"),
  w("始[はじ]める", "はじめる", "始める", "hajimeru", "ichidan", "to begin (sth)", "memulai", "N4"),
  w("続[つづ]ける", "つづける", "続ける", "tsuzukeru", "ichidan", "to continue (sth)", "melanjutkan", "N4"),
  w("捨[す]てる", "すてる", "捨てる", "suteru", "ichidan", "to throw away", "membuang", "N4"),
  w("比[くら]べる", "くらべる", "比べる", "kuraberu", "ichidan", "to compare", "membandingkan", "N4"),
  w("集[あつ]める", "あつめる", "集める", "atsumeru", "ichidan", "to collect", "mengumpulkan", "N4"),
  w("決[き]める", "きめる", "決める", "kimeru", "ichidan", "to decide", "memutuskan", "N4"),
  w("遅[おく]れる", "おくれる", "遅れる", "okureru", "ichidan", "to be late", "terlambat", "N4"),
  w("片付[かたづ]ける", "かたづける", "片付ける", "katazukeru", "ichidan", "to tidy up", "membereskan", "N4"),
  w("増[ふ]える", "ふえる", "増える", "fueru", "ichidan", "to increase", "bertambah", "N4"),
  w("見[み]つける", "みつける", "見つける", "mitsukeru", "ichidan", "to find", "menemukan", "N4"),
  w("止[や]める", "やめる", "止める", "yameru", "ichidan", "to quit / stop (sth)", "berhenti / berhenti melakukan", "N4"),
];

// --- Verbs: irregular --------------------------------------------------
const irregularVerbs: Word[] = [
  w("する", "する", "する", "suru", "suru", "to do", "melakukan", "N5"),
  w("来[く]る", "くる", "来る", "kuru", "kuru", "to come", "datang", "N5"),
  w("勉強[べんきょう]する", "べんきょうする", "勉強する", "benkyou suru", "suru", "to study", "belajar", "N5"),
  w("結婚[けっこん]する", "けっこんする", "結婚する", "kekkon suru", "suru", "to get married", "menikah", "N5"),
  w("運動[うんどう]する", "うんどうする", "運動する", "undou suru", "suru", "to exercise", "berolahraga", "N5"),
  w("心配[しんぱい]する", "しんぱいする", "心配する", "shinpai suru", "suru", "to worry", "khawatir", "N4"),
  w("案内[あんない]する", "あんないする", "案内する", "annai suru", "suru", "to guide / show around", "memandu", "N4"),
  w("説明[せつめい]する", "せつめいする", "説明する", "setsumei suru", "suru", "to explain", "menjelaskan", "N4"),
];

// --- い-adjectives ----------------------------------------------------
const iAdj: Word[] = [
  w("大[おお]きい", "おおきい", "大きい", "ookii", "i-adj", "big", "besar", "N5"),
  w("小[ちい]さい", "ちいさい", "小さい", "chiisai", "i-adj", "small", "kecil", "N5"),
  w("新[あたら]しい", "あたらしい", "新しい", "atarashii", "i-adj", "new", "baru", "N5"),
  w("古[ふる]い", "ふるい", "古い", "furui", "i-adj", "old (thing)", "lama", "N5"),
  w("高[たか]い", "たかい", "高い", "takai", "i-adj", "expensive / tall", "mahal / tinggi", "N5"),
  w("安[やす]い", "やすい", "安い", "yasui", "i-adj", "cheap", "murah", "N5"),
  w("暑[あつ]い", "あつい", "暑い", "atsui", "i-adj", "hot (weather)", "panas", "N5"),
  w("寒[さむ]い", "さむい", "寒い", "samui", "i-adj", "cold (weather)", "dingin", "N5"),
  w("忙[いそが]しい", "いそがしい", "忙しい", "isogashii", "i-adj", "busy", "sibuk", "N5"),
  w("楽[たの]しい", "たのしい", "楽しい", "tanoshii", "i-adj", "fun", "menyenangkan", "N5"),
  w("面白[おもしろ]い", "おもしろい", "面白い", "omoshiroi", "i-adj", "interesting", "menarik", "N5"),
  w("難[むずか]しい", "むずかしい", "難しい", "muzukashii", "i-adj", "difficult", "sulit", "N5"),
  w("易[やさ]しい", "やさしい", "易しい", "yasashii", "i-adj", "easy", "mudah", "N5"),
  w("近[ちか]い", "ちかい", "近い", "chikai", "i-adj", "near", "dekat", "N5"),
  w("遠[とお]い", "とおい", "遠い", "tooi", "i-adj", "far", "jauh", "N5"),
  w("早[はや]い", "はやい", "早い", "hayai", "i-adj", "early / fast", "awal / cepat", "N5"),
  w("遅[おそ]い", "おそい", "遅い", "osoi", "i-adj", "late / slow", "lambat", "N5"),
  w("良[い]い", "いい", "いい", "ii", "ii-adj", "good", "bagus", "N5"),
  w("悪[わる]い", "わるい", "悪い", "warui", "i-adj", "bad", "buruk", "N5"),
  w("危[あぶ]ない", "あぶない", "危ない", "abunai", "i-adj", "dangerous", "berbahaya", "N5"),
  w("優[やさ]しい", "やさしい", "優しい", "yasashii", "i-adj", "kind", "baik hati", "N4"),
  w("厳[きび]しい", "きびしい", "厳しい", "kibishii", "i-adj", "strict", "ketat", "N4"),
  w("寂[さび]しい", "さびしい", "寂しい", "sabishii", "i-adj", "lonely", "kesepian", "N4"),
  w("珍[めずら]しい", "めずらしい", "珍しい", "mezurashii", "i-adj", "rare", "langka", "N4"),
  w("恥[は]ずかしい", "はずかしい", "恥ずかしい", "hazukashii", "i-adj", "embarrassing", "memalukan", "N4"),
  w("正[ただ]しい", "ただしい", "正しい", "tadashii", "i-adj", "correct", "benar", "N4"),
  w("深[ふか]い", "ふかい", "深い", "fukai", "i-adj", "deep", "dalam", "N4"),
];

// --- な-adjectives --------------------------------------------------
const naAdj: Word[] = [
  w("静[しず]か", "しずか", "静か", "shizuka", "na-adj", "quiet", "tenang", "N5"),
  w("有名[ゆうめい]", "ゆうめい", "有名", "yuumei", "na-adj", "famous", "terkenal", "N5"),
  w("元気[げんき]", "げんき", "元気", "genki", "na-adj", "healthy / lively", "sehat / segar", "N5"),
  w("暇[ひま]", "ひま", "暇", "hima", "na-adj", "free (time)", "senggang", "N5"),
  w("便利[べんり]", "べんり", "便利", "benri", "na-adj", "convenient", "praktis", "N5"),
  w("親切[しんせつ]", "しんせつ", "親切", "shinsetsu", "na-adj", "kind", "ramah", "N5"),
  w("大変[たいへん]", "たいへん", "大変", "taihen", "na-adj", "tough / awful", "berat / repot", "N5"),
  w("上手[じょうず]", "じょうず", "上手", "jouzu", "na-adj", "skilled", "mahir", "N5"),
  w("下手[へた]", "へた", "下手", "heta", "na-adj", "unskilled", "tidak mahir", "N5"),
  w("好[す]き", "すき", "好き", "suki", "na-adj", "liked", "suka", "N5"),
  w("嫌[きら]い", "きらい", "嫌い", "kirai", "na-adj", "disliked", "benci", "N5"),
  w("きれい", "きれい", "きれい", "kirei", "na-adj", "pretty / clean", "cantik / bersih", "N5"),
  w("にぎやか", "にぎやか", "にぎやか", "nigiyaka", "na-adj", "lively (place)", "ramai", "N5"),
  w("大丈夫[だいじょうぶ]", "だいじょうぶ", "大丈夫", "daijoubu", "na-adj", "all right", "tidak apa-apa", "N5"),
  w("簡単[かんたん]", "かんたん", "簡単", "kantan", "na-adj", "simple", "mudah", "N4"),
  w("大切[たいせつ]", "たいせつ", "大切", "taisetsu", "na-adj", "important", "penting", "N4"),
  w("安全[あんぜん]", "あんぜん", "安全", "anzen", "na-adj", "safe", "aman", "N4"),
  w("複雑[ふくざつ]", "ふくざつ", "複雑", "fukuzatsu", "na-adj", "complicated", "rumit", "N4"),
  w("丁寧[ていねい]", "ていねい", "丁寧", "teinei", "na-adj", "polite / careful", "sopan / teliti", "N4"),
  w("熱心[ねっしん]", "ねっしん", "熱心", "nesshin", "na-adj", "enthusiastic", "bersemangat", "N4"),
  w("残念[ざんねん]", "ざんねん", "残念", "zannen", "na-adj", "regrettable", "disayangkan", "N4"),
  w("必要[ひつよう]", "ひつよう", "必要", "hitsuyou", "na-adj", "necessary", "diperlukan", "N4"),
  w("特別[とくべつ]", "とくべつ", "特別", "tokubetsu", "na-adj", "special", "istimewa", "N4"),
];

export const WORDS: Word[] = [
  ...godan,
  ...ichidan,
  ...irregularVerbs,
  ...iAdj,
  ...naAdj,
].filter((x) => x.kana && x.kanji);

export function wordsFor(opts: {
  jlpt: ("N5" | "N4")[];
  classes: WordClass[];
}): Word[] {
  return WORDS.filter(
    (word) => opts.jlpt.includes(word.jlpt) && opts.classes.includes(word.cls),
  );
}

export { wordKind };
