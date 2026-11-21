import type { L10n } from "@/lib/i18n";

export type EnglishCourse = { id: string; name: L10n; desc: L10n };

export const englishCourses: EnglishCourse[] = [
  {
    id: "phonetics",
    name: { vi: "Ngữ âm học tiếng Anh", en: "English Phonetics" },
    desc: {
      vi: "Giáo trình ngữ âm học cho sinh viên ngành ngôn ngữ và giáo viên: cấu âm, âm học, thính học, ngữ âm tiếng Anh (Anh-Anh và Anh-Mỹ), âm vị học và đối chiếu với tiếng Việt. Có công cụ tương tác ngay trong trình duyệt.",
      en: "A phonetics course for linguistics students and teachers: articulatory, acoustic and auditory phonetics, English phonetics (British and American), phonology and contrast with Vietnamese. With interactive tools right in the browser.",
    },
  },
];

export type Module = { id: string; title: L10n; desc: L10n };

/** Các module của khoá ngữ âm. Bài thuộc module nào được khai báo trong lesson.json ("module"). */
export const phoneticsModules: Module[] = [
  { id: "m1", title: { vi: "Nhập môn", en: "Foundations" }, desc: { vi: "Chuỗi lời nói, phiên âm, bảng IPA và cách nghiên cứu lời nói.", en: "The speech chain, transcription, the IPA chart and how speech is studied." } },
  { id: "m2", title: { vi: "Cấu âm", en: "Articulatory phonetics" }, desc: { vi: "Cơ quan phát âm, luồng hơi, phát thanh, phụ âm, nguyên âm, dấu phụ và đồng cấu âm.", en: "Speech organs, airstreams, phonation, consonants, vowels, diacritics and coarticulation." } },
  { id: "m3", title: { vi: "Âm học", en: "Acoustic phonetics" }, desc: { vi: "Sóng âm, nguồn và bộ lọc, phổ đồ, formant, VOT và thực hành với Praat.", en: "Sound waves, source and filter, spectrograms, formants, VOT and hands-on Praat." } },
  { id: "m4", title: { vi: "Thính học và tri nhận", en: "Auditory phonetics and perception" }, desc: { vi: "Tai nghe thế nào, các dấu hiệu âm học, tri nhận phạm trù và các lý thuyết.", en: "How the ear works, acoustic cues, categorical perception and theories." } },
  { id: "m5", title: { vi: "Ngữ âm học tiếng Anh", en: "English phonetics" }, desc: { vi: "Hệ thống âm RP và GA, biến thể, âm tiết, trọng âm, nói liền mạch và ngữ điệu.", en: "The RP and GA systems, allophones, syllables, stress, connected speech and intonation." } },
  { id: "m6", title: { vi: "Âm vị học nhập môn", en: "Introduction to phonology" }, desc: { vi: "Âm vị, đặc trưng khu biệt, quy tắc âm vị và biến đổi âm.", en: "Phonemes, distinctive features, phonological rules and sound change." } },
  { id: "m7", title: { vi: "Đối chiếu Việt - Anh", en: "Vietnamese and English contrasted" }, desc: { vi: "Ngữ âm tiếng Việt, thanh điệu, phân tích đối chiếu và khả năng hiểu nhau.", en: "Vietnamese phonetics, tones, contrastive analysis and intelligibility." } },
  { id: "m8", title: { vi: "Ứng dụng và nghiên cứu", en: "Application and research" }, desc: { vi: "Dạy phát âm, thiết kế nghiên cứu nhỏ, bài cuối khoá và thuật ngữ.", en: "Teaching pronunciation, designing a small study, the capstone and the glossary." } },
];

export const quizText = {
  vi: {
    quickCheck: "Kiểm tra nhanh",
    practiceIntro: "Đây là bài ôn nhẹ. Không tính điểm, làm sai cũng không sao, cứ thử lại.",
    check: "Kiểm tra",
    retry: "Thử lại",
    showAnswer: "Xem đáp án",
    correct: "Đúng rồi!",
    wrong: "Chưa đúng, thử lại nhé.",
    answerIs: "Đáp án",
    typeHere: "Gõ đáp án ở đây",
    allDone: "Bạn đã làm đúng hết phần này. Giỏi lắm!",
    markDone: "Đánh dấu đã học xong",
    done: "Đã học xong",
    prev: "Bài trước",
    next: "Bài tiếp theo",
    backToCourse: "Về mục lục khoá học",
    minutes: "phút",
    practice: "Thực hành",
    progress: "Tiến độ",
    lessons: "bài",
    hintIpa: "Có thể gõ có hoặc không có dấu / /. Dấu : được tính như ː.",
    start: "Bắt đầu học",
  },
  en: {
    quickCheck: "Quick check",
    practiceIntro: "This is a gentle review. There's no score, and mistakes are fine. Just try again.",
    check: "Check",
    retry: "Try again",
    showAnswer: "Show answer",
    correct: "Correct!",
    wrong: "Not quite, try again.",
    answerIs: "Answer",
    typeHere: "Type your answer here",
    allDone: "You got everything right in this part. Well done!",
    markDone: "Mark as finished",
    done: "Finished",
    prev: "Previous",
    next: "Next",
    backToCourse: "Back to the course contents",
    minutes: "min",
    practice: "Practice",
    progress: "Progress",
    lessons: "lessons",
    hintIpa: "You can type with or without / /. A colon : counts as ː.",
    start: "Start learning",
  },
} as const;
