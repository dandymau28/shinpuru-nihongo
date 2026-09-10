import type { Bi } from "./i18n";

/** UI chrome strings, keyed. Content strings live with their content modules. */
export const STR = {
  appName: { en: "Shinpuru Nihongo", id: "Shinpuru Nihongo" },
  tagline: {
    en: "Your 90-day N5 → N4 plan, with every lesson and drill built in.",
    id: "Rencana 90 hari N5 → N4-mu, lengkap dengan semua materi dan latihannya.",
  },

  nav_dashboard: { en: "Dashboard", id: "Beranda" },
  nav_planner: { en: "Planner", id: "Planner" },
  nav_practice: { en: "Practice", id: "Latihan" },
  nav_settings: { en: "Settings", id: "Pengaturan" },
  nav_about: { en: "About", id: "Tentang" },

  // Practice hub
  practice_title: { en: "Practice Tools", id: "Alat Latihan" },
  practice_intro: {
    en: "Free-practice drills you can use any time, separate from the day-by-day plan.",
    id: "Latihan bebas yang bisa dipakai kapan saja, terpisah dari rencana harian.",
  },
  practice_conj_name: { en: "Conjugation Trainer", id: "Latihan Konjugasi" },
  practice_conj_desc: {
    en: "Drill every N5–N4 verb and adjective form — pick the forms, type the answer, build a streak.",
    id: "Latih setiap bentuk verba & kata sifat N5–N4 — pilih bentuknya, ketik jawaban, kumpulkan runtun.",
  },
  practice_particles_name: { en: "Particle Trainer", id: "Latihan Partikel" },
  practice_particles_desc: {
    en: "Fill-in-the-blank drills for は が を に で へ and more — tap the right particle, with は-vs-が and に-vs-で focus sets.",
    id: "Latihan isi-titik untuk は が を に で へ dan lainnya — ketuk partikel yang tepat, dengan set fokus は-vs-が dan に-vs-で.",
  },
  practice_kanji_name: { en: "Kanji Trainer", id: "Latihan Kanji" },
  practice_kanji_desc: {
    en: "~150 N5–N4 kanji words — drill reading, meaning, or kana → kanji, four options per question.",
    id: "~150 kata kanji N5–N4 — latih bacaan, arti, atau kana → kanji, empat pilihan per soal.",
  },

  // Particle trainer
  pt_title: { en: "Particle Trainer", id: "Latihan Partikel" },
  pt_pick_what: { en: "What do you want to drill?", id: "Mau latihan yang mana?" },
  pt_choose_particles: { en: "Choose particles", id: "Pilih partikel" },
  pt_no_drills: {
    en: "No sentences match — pick more particles or a wider level.",
    id: "Tidak ada kalimat yang cocok — pilih lebih banyak partikel atau tingkat yang lebih luas.",
  },

  // Kanji trainer
  kj_title: { en: "Kanji Trainer", id: "Latihan Kanji" },
  kj_pick_what: { en: "What do you want to drill?", id: "Mau latihan yang mana?" },
  kj_level: { en: "Level", id: "Tingkat" },
  kj_no_words: {
    en: "Pick at least one level.",
    id: "Pilih minimal satu tingkat.",
  },

  // Conjugation trainer
  conj_title: { en: "Conjugation Trainer", id: "Latihan Konjugasi" },
  conj_conjugate_to: { en: "Conjugate to", id: "Konjugasikan ke" },
  conj_type_answer: { en: "type the conjugated form", id: "ketik bentuk konjugasinya" },
  conj_check: { en: "Check", id: "Periksa" },
  conj_next: { en: "Next", id: "Lanjut" },
  conj_reveal: { en: "Show answer", id: "Lihat jawaban" },
  conj_correct: { en: "Correct", id: "Benar" },
  conj_incorrect: { en: "Not quite", id: "Belum tepat" },
  conj_answer: { en: "Answer", id: "Jawaban" },
  conj_streak: { en: "Streak", id: "Runtun" },
  conj_best: { en: "Best", id: "Terbaik" },
  conj_accuracy: { en: "Accuracy", id: "Akurasi" },
  conj_settings: { en: "Settings", id: "Pengaturan" },
  conj_start: { en: "Start", id: "Mulai" },
  conj_restart: { en: "New session", id: "Sesi baru" },
  conj_end_session: { en: "End session", id: "Akhiri sesi" },
  conj_session_done: { en: "Session complete", id: "Sesi selesai" },
  conj_practice_weak: { en: "Practice weak forms", id: "Latih bentuk yang lemah" },
  conj_no_pairs: {
    en: "No words match — pick at least one word type and one form.",
    id: "Tidak ada kata yang cocok — pilih minimal satu jenis kata dan satu bentuk.",
  },
  conj_input_mode: { en: "Input", id: "Masukan" },
  conj_input_romaji: { en: "Romaji (auto → kana)", id: "Romaji (otomatis → kana)" },
  conj_input_kana: { en: "Kana (needs IME)", id: "Kana (butuh IME)" },
  conj_word_types: { en: "Word types", id: "Jenis kata" },
  conj_level: { en: "Vocabulary level", id: "Tingkat kosakata" },
  conj_forms: { en: "Individual forms", id: "Bentuk satuan" },
  conj_forms_short: { en: "forms", id: "bentuk" },
  conj_presets: { en: "Presets", id: "Prasetel" },
  conj_pick_what: { en: "What do you want to drill?", id: "Mau latihan yang mana?" },
  conj_advanced: { en: "Advanced", id: "Lanjutan" },
  conj_advanced_title: { en: "Advanced settings", id: "Pengaturan lanjutan" },
  conj_advanced_intro: {
    en: "Pick exactly which forms and word types to drill.",
    id: "Pilih persis bentuk dan jenis kata yang mau dilatih.",
  },
  conj_custom_selection: { en: "Custom selection", id: "Pilihan khusus" },
  conj_done: { en: "Done", id: "Selesai" },
  conj_session_mode: { en: "Session length", id: "Panjang sesi" },
  conj_endless: { en: "Endless", id: "Tanpa henti" },
  conj_show_meaning: { en: "Show meaning", id: "Tampilkan arti" },
  conj_show_reading: { en: "Show reading", id: "Tampilkan bacaan" },
  conj_always: { en: "Always", id: "Selalu" },
  conj_after_answer: { en: "After answering", id: "Setelah dijawab" },
  conj_weak_spots: { en: "Weak spots", id: "Titik lemah" },
  conj_lifetime: { en: "All-time", id: "Sepanjang waktu" },
  conj_reset_stats: { en: "Reset stats", id: "Atur ulang statistik" },
  conj_cls_godan: { en: "う-verbs (godan)", id: "verba う (godan)" },
  conj_cls_ichidan: { en: "る-verbs (ichidan)", id: "verba る (ichidan)" },
  conj_cls_irregular: { en: "irregular verbs", id: "verba tak beraturan" },
  conj_cls_iadj: { en: "い-adjectives", id: "kata sifat い" },
  conj_cls_naadj: { en: "な-adjectives", id: "kata sifat な" },
  conj_open_trainer: { en: "Open the full conjugation trainer", id: "Buka latihan konjugasi lengkap" },

  // Dashboard
  today: { en: "Today", id: "Hari ini" },
  day: { en: "Day", id: "Hari" },
  of90: { en: "of 90", id: "dari 90" },
  resume: { en: "Continue today's study", id: "Lanjutkan belajar hari ini" },
  progress: { en: "Progress", id: "Progres" },
  completed: { en: "completed", id: "selesai" },
  streak: { en: "Streak", id: "Runtun" },
  days_unit: { en: "days", id: "hari" },
  up_next: { en: "Up next", id: "Berikutnya" },
  phase: { en: "Phase", id: "Fase" },
  jump_back_in: { en: "Jump back in", id: "Lanjutkan" },

  // Phases
  phase_n5refresher: { en: "N5 Refresher", id: "Penyegaran N5" },
  phase_n4core: { en: "N4 Grammar Core", id: "Inti Tata Bahasa N4" },
  phase_examsprint: { en: "Exam Sprint", id: "Sprint Ujian" },

  // Day types
  type_diagnostic: { en: "Diagnostic", id: "Diagnostik" },
  type_grammar: { en: "Grammar", id: "Tata Bahasa" },
  "type_vocab-kanji": { en: "Vocab / Kanji", id: "Kosakata / Kanji" },
  type_reading: { en: "Reading", id: "Membaca" },
  type_listening: { en: "Listening", id: "Menyimak" },
  type_review: { en: "Review", id: "Ulasan" },
  type_test: { en: "Test", id: "Tes" },
  type_skill: { en: "Skill", id: "Keterampilan" },

  // Planner
  planner_title: { en: "90-Day Planner", id: "Planner 90 Hari" },
  filter_all: { en: "All", id: "Semua" },
  filter_phase: { en: "Phase", id: "Fase" },
  filter_type: { en: "Type", id: "Jenis" },
  filter_status: { en: "Status", id: "Status" },

  // Status
  status_not_yet: { en: "Not started", id: "Belum" },
  status_partial: { en: "In progress", id: "Sebagian" },
  status_done: { en: "Done", id: "Selesai" },

  // Day detail
  study_task: { en: "Study task", id: "Tugas belajar" },
  suggested_time: { en: "Suggested time", id: "Waktu yang disarankan" },
  original_references: {
    en: "Original references (rebuilt here)",
    id: "Referensi asli (dibangun ulang di sini)",
  },
  lesson: { en: "Lesson", id: "Materi" },
  exercises: { en: "Exercises", id: "Latihan" },
  open_lesson: { en: "Open full lesson", id: "Buka materi lengkap" },
  content_coming: {
    en: "Native lesson & exercises for this day are coming. For now, the original references above cover the material.",
    id: "Materi & latihan untuk hari ini sedang disiapkan. Untuk sekarang, referensi asli di atas sudah mencakup materinya.",
  },
  your_progress: { en: "Your progress", id: "Progresmu" },
  mark_status: { en: "Status", id: "Status" },
  reviewed_label: { en: "Reviewed later", id: "Sudah diulang" },

  // Day score counter
  day_score: { en: "Day score", id: "Skor hari ini" },
  sets_done: { en: "exercises done", id: "latihan selesai" },
  score_so_far: { en: "correct so far", id: "benar sejauh ini" },
  score_breakdown: { en: "Score breakdown", id: "Rincian skor" },
  not_attempted: { en: "not started", id: "belum" },
  day_all_done: { en: "All exercises complete", id: "Semua latihan selesai" },
  practice_done: { en: "done", id: "selesai" },
  best_streak: { en: "best streak", id: "runtun terbaik" },
  no_exercises_scored: {
    en: "This day has no scored exercises.",
    id: "Hari ini tidak ada latihan berskor.",
  },
  notes_label: { en: "Notes", id: "Catatan" },
  notes_ph: { en: "Mistakes, weak points, reminders…", id: "Kesalahan, titik lemah, pengingat…" },
  saved: { en: "Saved", id: "Tersimpan" },
  prev_day: { en: "Previous day", id: "Hari sebelumnya" },
  next_day: { en: "Next day", id: "Hari berikutnya" },
  back_to_planner: { en: "Back to planner", id: "Kembali ke planner" },

  // Exercises
  ex_check: { en: "Check", id: "Periksa" },
  ex_next: { en: "Next", id: "Lanjut" },
  ex_finish: { en: "Finish", id: "Selesai" },
  ex_retry: { en: "Try again", id: "Coba lagi" },
  ex_correct: { en: "Correct", id: "Benar" },
  ex_incorrect: { en: "Not quite", id: "Belum tepat" },
  ex_answer_was: { en: "Answer", id: "Jawaban" },
  ex_your_answer: { en: "Your answer", id: "Jawabanmu" },
  ex_score: { en: "You scored", id: "Skormu" },
  ex_type_answer: { en: "Type your answer", id: "Ketik jawabanmu" },
  ex_show_hint: { en: "Hint", id: "Petunjuk" },
  ex_reveal_transcript: { en: "Show transcript", id: "Tampilkan transkrip" },
  ex_hide_transcript: { en: "Hide transcript", id: "Sembunyikan transkrip" },
  ex_play: { en: "Play audio", id: "Putar audio" },
  ex_replay: { en: "Replay", id: "Ulangi" },
  ex_stop: { en: "Stop", id: "Berhenti" },
  ex_tts_unsupported: {
    en: "Your browser can't play synthesized Japanese audio. The transcript is shown below instead.",
    id: "Browser-mu tidak bisa memutar audio Jepang sintetis. Transkrip ditampilkan di bawah sebagai gantinya.",
  },
  ex_passage: { en: "Passage", id: "Bacaan" },
  ex_start: { en: "Start", id: "Mulai" },
  ex_of: { en: "of", id: "dari" },
  ex_streak: { en: "Streak", id: "Runtun" },
  ex_best: { en: "Best", id: "Terbaik" },
  ex_prompt_speak: {
    en: "Say each answer out loud before checking.",
    id: "Ucapkan tiap jawaban dengan lantang sebelum memeriksa.",
  },
  ex_writing_prompt: { en: "Writing prompt", id: "Latihan menulis" },
  ex_self_check: { en: "Self-check", id: "Periksa sendiri" },
  ex_mark_done: { en: "I completed this", id: "Saya sudah menyelesaikan ini" },

  // Reading aids
  aid_furigana: { en: "Furigana", id: "Furigana" },
  aid_romaji: { en: "Romaji", id: "Romaji" },
  aid_language: { en: "Explanation language", id: "Bahasa penjelasan" },
  aid_theme: { en: "Theme", id: "Tema" },
  theme_light: { en: "Light", id: "Terang" },
  theme_dark: { en: "Dark", id: "Gelap" },
  theme_system: { en: "System", id: "Sistem" },

  // Settings
  settings_title: { en: "Settings", id: "Pengaturan" },
  settings_start_date: { en: "Plan start date", id: "Tanggal mulai rencana" },
  settings_start_date_help: {
    en: "Used to work out which day is \"today\". Default: 2 September 2026.",
    id: "Dipakai untuk menentukan hari \"ini\". Bawaan: 2 September 2026.",
  },
  settings_data: { en: "Your data", id: "Datamu" },
  settings_data_help: {
    en: "Progress is stored only in this browser. Export a backup, or move it to another device.",
    id: "Progres hanya disimpan di browser ini. Ekspor cadangan, atau pindahkan ke perangkat lain.",
  },
  export_progress: { en: "Export progress", id: "Ekspor progres" },
  import_progress: { en: "Import progress", id: "Impor progres" },
  reset_progress: { en: "Reset all progress", id: "Atur ulang semua progres" },
  reset_confirm: {
    en: "Reset all progress and notes? This cannot be undone.",
    id: "Atur ulang semua progres dan catatan? Ini tidak bisa dibatalkan.",
  },
  import_failed: { en: "Import failed — file not recognised.", id: "Impor gagal — file tidak dikenali." },
  imported_ok: { en: "Progress imported.", id: "Progres berhasil diimpor." },

  // About
  about_title: { en: "About Shinpuru Nihongo", id: "Tentang Shinpuru Nihongo" },

  // Misc
  coming_soon: { en: "Coming soon", id: "Segera hadir" },
  no_results: { en: "No days match these filters.", id: "Tidak ada hari yang cocok dengan filter ini." },
} satisfies Record<string, Bi>;

export type StrKey = keyof typeof STR;
