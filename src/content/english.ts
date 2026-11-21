import type { L10n } from "@/lib/i18n";

export type EnglishCourse = { id: string; name: L10n; desc: L10n };

export const englishCourses: EnglishCourse[] = [
  {
    id: "phonetics",
    name: { vi: "Ngữ âm học tiếng Anh", en: "English Phonetics" },
    desc: {
      vi: "Hiểu âm thanh tiếng Anh được tạo ra thế nào, từ từng âm đến trọng âm và ngữ điệu. Dạy song song giọng Anh-Anh và Anh-Mỹ, nhẹ nhàng cho người mới và đủ sâu cho giáo viên.",
      en: "Understand how English sounds are made, from single sounds to stress and intonation. British and American accents side by side, gentle for beginners and deep enough for teachers.",
    },
  },
];

export type Module = { id: string; title: L10n; desc: L10n };

/** Các module của khoá ngữ âm. Bài thuộc module nào được khai báo trong lesson.json ("module"). */
export const phoneticsModules: Module[] = [
  {
    id: "m1",
    title: { vi: "Làm quen với âm thanh", en: "Getting to know sounds" },
    desc: { vi: "Âm khác chữ thế nào, cơ quan phát âm và cách đọc IPA.", en: "How sounds differ from letters, the speech organs and reading IPA." },
  },
  {
    id: "m2",
    title: { vi: "Phụ âm", en: "Consonants" },
    desc: { vi: "Bản đồ phụ âm, những âm khó với người Việt, âm cuối và cụm phụ âm.", en: "The consonant map, sounds that are hard for Vietnamese speakers, final consonants and clusters." },
  },
  {
    id: "m3",
    title: { vi: "Nguyên âm", en: "Vowels" },
    desc: { vi: "Bảng nguyên âm, ngắn và dài, nguyên âm đôi, và Anh-Anh khác Anh-Mỹ ra sao.", en: "The vowel chart, short and long vowels, diphthongs, and how British and American differ." },
  },
  {
    id: "m4",
    title: { vi: "Từ và câu", en: "Words and sentences" },
    desc: { vi: "Trọng âm, nhịp điệu, dạng yếu, nói liền mạch và ngữ điệu.", en: "Stress, rhythm, weak forms, connected speech and intonation." },
  },
  {
    id: "m5",
    title: { vi: "Nhìn sâu hơn (cho giáo viên)", en: "A closer look (for teachers)" },
    desc: { vi: "Âm vị và biến thể, so sánh tiếng Việt với tiếng Anh, và cách dạy phát âm.", en: "Phonemes and allophones, comparing Vietnamese with English, and how to teach pronunciation." },
  },
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
