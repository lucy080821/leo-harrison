export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export type L10n = { vi: string; en: string };

export function tr(v: L10n, lang: Locale): string {
  return v[lang];
}

export const dict = {
  vi: {
    tagline: "Học lập trình từ A đến Z — lý thuyết và thực hành song song",
    heroTitle: "Học code. Thấy kết quả ngay.",
    heroDesc:
      "Mỗi bài học gồm lý thuyết đầy đủ ở bên trái và trình soạn code ở bên phải — bạn gõ đến đâu, kết quả hiện ra đến đó.",
    chooseTrack: "Chọn lộ trình",
    lessons: "bài học",
    soon: "Sắp ra mắt",
    ready: "Đã có bài",
    coursesReady: "khoá học đã có bài",
    start: "Bắt đầu học",
    back: "Quay lại",
    courses: "Khoá học",
    lessonList: "Danh sách bài học",
    minutes: "phút",
    theory: "Lý thuyết",
    practice: "Thực hành",
    playground: "Tự do thử code",
    exercises: "Bài tập",
    doExercise: "Làm bài này",
    check: "Kiểm tra",
    hint: "Gợi ý",
    solution: "Xem đáp án",
    reset: "Đặt lại",
    preview: "Kết quả",
    console: "Console",
    passed: "Chính xác! Bạn đã hoàn thành bài tập.",
    notYet: "Chưa đúng, hãy xem lại các yêu cầu bên dưới.",
    next: "Bài tiếp theo",
    prev: "Bài trước",
    markDone: "Đánh dấu hoàn thành",
    done: "Đã hoàn thành",
    progress: "Tiến độ",
    emptyConsole: "Chưa có log nào. Dùng console.log() để in ra đây.",
    theme: "Giao diện",
    language: "Ngôn ngữ",
    notFound: "Không tìm thấy trang",
    comingSoonBody:
      "Khoá học này đang được soạn. Hãy quay lại sau hoặc thử các khoá đã có bài.",
    runtimeNote: "Code chạy trong khung cách ly (sandbox) ngay trên trình duyệt của bạn.",
  },
  en: {
    tagline: "Learn to code from A to Z — theory and practice side by side",
    heroTitle: "Learn to code. See it live.",
    heroDesc:
      "Every lesson pairs complete theory on the left with a code editor on the right — type a line and the result updates instantly.",
    chooseTrack: "Choose a track",
    lessons: "lessons",
    soon: "Coming soon",
    ready: "Available",
    coursesReady: "courses available",
    start: "Start learning",
    back: "Back",
    courses: "Courses",
    lessonList: "Lessons",
    minutes: "min",
    theory: "Theory",
    practice: "Practice",
    playground: "Free playground",
    exercises: "Exercises",
    doExercise: "Do this exercise",
    check: "Check",
    hint: "Hint",
    solution: "Show solution",
    reset: "Reset",
    preview: "Result",
    console: "Console",
    passed: "Correct! You completed the exercise.",
    notYet: "Not quite yet — review the requirements below.",
    next: "Next lesson",
    prev: "Previous lesson",
    markDone: "Mark as complete",
    done: "Completed",
    progress: "Progress",
    emptyConsole: "No logs yet. Use console.log() to print here.",
    theme: "Theme",
    language: "Language",
    notFound: "Page not found",
    comingSoonBody:
      "This course is being written. Check back soon or try a course that already has lessons.",
    runtimeNote: "Code runs in an isolated sandbox right in your browser.",
  },
} as const;

export type Dict = { [K in keyof (typeof dict)["vi"]]: string };
