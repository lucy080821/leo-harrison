import type { L10n } from "@/lib/i18n";

export const owner = {
  name: "Tạ Hoàng Anh Tuấn",
  nick: "Leo",
  email: "tahoanganhtuan1996@gmail.com",
  phone: "+84869603164",
  phoneDisplay: "+84 869 603 164",
  github: "https://github.com/lucy080821",
  facebook: "https://www.facebook.com/profile.php?id=61575890257643",
};

export const nav: { href: string; label: L10n }[] = [
  { href: "projects", label: { vi: "Dự án", en: "Projects" } },
  { href: "learning", label: { vi: "Học", en: "Learning" } },
  { href: "about", label: { vi: "Giới thiệu", en: "About" } },
];

/** Câu mở đầu: tiếng Việt và tiếng Anh, gõ lần lượt trên trang chủ. */
export const heroLine: L10n = {
  vi: "Mình làm công cụ để việc học và dữ liệu dễ hiểu hơn.",
  en: "I build tools that make learning and data easier to understand.",
};

export type Project = {
  id: string;
  name: string;
  url: string;
  host: string;
  logo?: string;
  shot?: string;
  /** Liên kết phụ cạnh nút chính (blog, game...). */
  links?: { label: L10n; url: string }[];
  /** Kênh nội dung: hiện danh sách kênh thay cho ảnh chụp màn hình. */
  channels?: { name: string; handle: string; url: string }[];
  /** Số liệu kênh (nhập tay từ YouTube Studio), kèm ngày lấy số liệu. */
  channelStats?: { asOf: string; items: { n: L10n; label: L10n }[] };
  tagline: L10n;
  summary: L10n;
  points: L10n[];
};

export const projects: Project[] = [
  {
    id: "lucytutor",
    name: "Lucy Tutor",
    url: "https://lucytutor.online/",
    host: "lucytutor.online",
    logo: "/projects/lucytutor.jpg",
    shot: "/projects/lucytutor-d.jpg",
    tagline: { vi: "Học và luyện thi tiếng Anh cùng AI", en: "Learn English and prepare for exams with AI" },
    summary: {
      vi: "Nền tảng cho cả học viên và giáo viên. Học viên làm bài kiểm tra trình độ, luyện bốn kỹ năng và được AI chấm Writing; trang còn có blog chia sẻ cách học và các game để học mà chơi. Giáo viên quản lý lớp, điểm danh và học phí trong cùng một nơi.",
      en: "A platform for both students and teachers. Students take a level test, practise all four skills and get Writing graded by AI; the site also has a blog on how to study and games that make learning feel like play. Teachers manage classes, attendance and tuition in one place.",
    },
    links: [
      { label: { vi: "Blog", en: "Blog" }, url: "https://lucytutor.online/blog" },
      { label: { vi: "Game học tiếng Anh", en: "English games" }, url: "https://lucytutor.online/game-hoc-tieng-anh" },
    ],
    points: [
      { vi: "Kiểm tra trình độ từ A1 đến C1", en: "Level test from A1 to C1" },
      { vi: "Bảng 44 âm IPA và luyện phát âm với AI", en: "A 44-sound IPA chart and pronunciation practice with AI" },
      { vi: "Đề THPT Quốc gia và IELTS Cambridge", en: "National high-school exam and IELTS Cambridge papers" },
      {
        vi: "Blog: mẹo luyện thi, phát âm, ngữ pháp và phương pháp tự học từ giáo viên",
        en: "Blog: exam tips, pronunciation, grammar and self-study methods from teachers",
      },
      {
        vi: "Game: Qilin Run (chạy và vượt cổng bằng cách trả lời câu hỏi), Nông Trại Qilin (cây chín theo lịch ôn lặp lại ngắt quãng) và bộ trò chơi cho học sinh lớp 3",
        en: "Games: Qilin Run (run and clear gates by answering questions), Qilin Farm (plants ripen on a spaced-repetition schedule) and a set of games for grade 3",
      },
    ],
  },
  {
    id: "cerno",
    name: "Cerno",
    url: "https://cerno.cloud/",
    host: "cerno.cloud",
    logo: "/projects/cerno.svg",
    shot: "/projects/cerno-d.jpg",
    tagline: { vi: "Dashboard từ Google Sheets, đặt biểu đồ tự do", en: "Dashboards from Google Sheets, charts placed freely" },
    summary: {
      vi: "Chọn cột dữ liệu, kéo biểu đồ và chỉ số lên một khung vẽ tự do, rồi chia sẻ bằng liên kết hoặc nhúng vào trang khác. Không cần biết lập trình.",
      en: "Pick your columns, drag charts and KPIs onto a free canvas, then share by link or embed in another page. No programming needed.",
    },
    points: [
      { vi: "13 loại biểu đồ, từ cột và đường đến heatmap và gauge", en: "13 chart types, from columns and lines to heatmap and gauge" },
      { vi: "Dữ liệu tự làm mới sau mỗi 2 giờ", en: "Data refreshes automatically every 2 hours" },
      { vi: "Trợ lý AI chỉnh dashboard bằng tiếng Việt", en: "An AI assistant that edits the dashboard in plain language" },
      { vi: "Chia sẻ bằng liên kết, lời mời email hoặc iframe", en: "Share by link, email invite or iframe" },
    ],
  },
  {
    id: "tienganhkhongkho",
    name: "Tiếng Anh Không Khó",
    url: "https://www.youtube.com/@tienganhkhongkho-e2e",
    host: "YouTube, TikTok",
    logo: "/projects/tienganhkhongkho.png",
    channelStats: {
      asOf: "21/11/2026",
      items: [
        { n: { vi: "81", en: "81" }, label: { vi: "người đăng ký YouTube", en: "YouTube subscribers" } },
        { n: { vi: "+39", en: "+39" }, label: { vi: "người đăng ký mới trong 28 ngày", en: "new subscribers in 28 days" } },
        { n: { vi: "10,1 nghìn", en: "10.1K" }, label: { vi: "lượt xem trong 28 ngày", en: "views in 28 days" } },
        { n: { vi: "47,6", en: "47.6" }, label: { vi: "giờ xem trong 28 ngày", en: "hours watched in 28 days" } },
      ],
    },
    tagline: { vi: "Kênh chia sẻ tiếng Anh trên YouTube và TikTok", en: "An English-learning channel on YouTube and TikTok" },
    summary: {
      vi: "Kênh nội dung về học tiếng Anh, với cái tên nói lên mục tiêu: làm cho tiếng Anh bớt nặng nề và dễ tiếp cận hơn.",
      en: "A content channel about learning English, named for its goal: to make English feel lighter and easier to approach.",
    },
    points: [
      { vi: "Có mặt trên YouTube và TikTok", en: "On both YouTube and TikTok" },
      { vi: "Chủ đề nổi bật: cách luyện viết tiếng Anh", en: "Top topic: how to practise English writing" },
    ],
    channels: [
      { name: "YouTube", handle: "@tienganhkhongkho-e2e", url: "https://www.youtube.com/@tienganhkhongkho-e2e" },
      { name: "TikTok", handle: "@tienganhkhongkho7", url: "https://www.tiktok.com/@tienganhkhongkho7" },
    ],
  },
];

export const t = {
  hello: { vi: "Xin chào, mình là", en: "Hi, I'm" } as L10n,
  heroSub: {
    vi: "Mình làm Lucy Tutor (học và luyện thi tiếng Anh cùng AI), Cerno (biến Google Sheets thành dashboard) và Lexi Learn (khóa học lập trình song ngữ, có bài tập tự chấm). Mình cũng làm kênh Tiếng Anh Không Khó trên YouTube và TikTok.",
    en: "I build Lucy Tutor (learn English and prepare for exams with AI), Cerno (turn Google Sheets into dashboards) and Lexi Learn (a bilingual programming course with auto-checked exercises). I also run the Tiếng Anh Không Khó channel on YouTube and TikTok.",
  } as L10n,
  seeProjects: { vi: "Xem các dự án", en: "See my projects" } as L10n,
  startLearning: { vi: "Học lập trình", en: "Learn to code" } as L10n,
  projectsTitle: { vi: "Dự án", en: "Projects" } as L10n,
  projectsIntro: {
    vi: "Những sản phẩm và kênh mình đang làm.",
    en: "The products and channels I'm working on.",
  } as L10n,
  openProduct: { vi: "Mở", en: "Open" } as L10n,
  learningTitle: { vi: "Học cùng mình", en: "Learn with me" } as L10n,
  learningIntro: {
    vi: "Những gì mình học rồi viết lại thành bài, song ngữ và có bài tập để bạn tự thử.",
    en: "What I learn, written up as lessons in two languages, with exercises you can try yourself.",
  } as L10n,
  programming: { vi: "Lập trình", en: "Programming" } as L10n,
  programmingDesc: {
    vi: "Lexi Learn: HTML, CSS, JavaScript, React, Next.js, Node.js, Python, SQL và nhập môn AI. Lý thuyết bên trái, code chạy trực tiếp bên phải.",
    en: "Lexi Learn: HTML, CSS, JavaScript, React, Next.js, Node.js, Python, SQL and an intro to AI. Theory on the left, live code on the right.",
  } as L10n,
  english: { vi: "Tiếng Anh chuyên sâu", en: "Advanced English" } as L10n,
  englishDesc: {
    vi: "Đang soạn: những điều đi sâu hơn giáo trình thông thường.",
    en: "In the works: material that goes deeper than a usual course.",
  } as L10n,
  soon: { vi: "Sắp ra mắt", en: "Coming soon" } as L10n,
  lessons: { vi: "bài học", en: "lessons" } as L10n,
  contactTitle: { vi: "Liên hệ", en: "Contact" } as L10n,
  contactBody: {
    vi: "Muốn hợp tác, góp ý cho một dự án hay chỉ chào một tiếng, cứ gửi email cho mình.",
    en: "If you'd like to work together, give feedback on a project, or just say hi, send me an email.",
  } as L10n,
  aboutTitle: { vi: "Giới thiệu", en: "About" } as L10n,
  aboutBody: [
    {
      vi: "Mình là Tạ Hoàng Anh Tuấn, mọi người hay gọi mình là Leo. Mình làm những công cụ giúp việc học và việc đọc dữ liệu bớt nặng nề hơn.",
      en: "I'm Tạ Hoàng Anh Tuấn, and people call me Leo. I build tools that make learning and reading data less of a chore.",
    },
    {
      vi: "Lucy Tutor ra đời để học và luyện thi tiếng Anh có AI đồng hành. Cerno dành cho ai có dữ liệu trong Google Sheets nhưng chưa có cách trình bày. Lexi Learn là nơi mình viết lại những gì đã học về lập trình, để người khác bắt đầu từ con số 0 mà không bị lạc. Kênh Tiếng Anh Không Khó trên YouTube và TikTok đưa tiếng Anh đến người học theo cách nhẹ nhàng hơn.",
      en: "Lucy Tutor lets people study and prepare for English exams with an AI alongside them. Cerno is for anyone whose data sits in Google Sheets with no good way to show it. Lexi Learn is where I write down what I've learned about programming so others can start from zero without getting lost. The Tiếng Anh Không Khó channel on YouTube and TikTok brings English to learners in a lighter way.",
    },
    {
      vi: "Trang này gom tất cả lại một chỗ, kèm những gì mình học được và muốn chia sẻ. Phần tiếng Anh chuyên sâu sẽ là chủ đề tiếp theo.",
      en: "This site puts everything in one place, along with what I've learned and want to share. In-depth English is the next topic.",
    },
  ] as L10n[],
  englishPageTitle: { vi: "Tiếng Anh chuyên sâu", en: "Advanced English" } as L10n,
  englishPageBody: {
    vi: "Phần này đang được soạn. Mục tiêu là đi sâu hơn những gì một giáo trình thông thường dạy: cách dùng từ tự nhiên, ngữ pháp ở những chỗ người học hay sai, và kỹ năng cho bài thi.",
    en: "This section is being written. The aim is to go deeper than a usual course: natural word choice, grammar where learners often slip, and exam skills.",
  } as L10n,
  englishPageNow: {
    vi: "Trong lúc chờ, bạn có thể luyện tiếng Anh ngay trên Lucy Tutor.",
    en: "In the meantime, you can practise English right now on Lucy Tutor.",
  } as L10n,
  backToLearning: { vi: "Về trang Học", en: "Back to Learning" } as L10n,
  statsAsOf: { vi: "Số liệu YouTube tính đến", en: "YouTube figures as of" } as L10n,
  rights: { vi: "Mọi quyền được bảo lưu.", en: "All rights reserved." } as L10n,
  skip: { vi: "Bỏ qua, đến nội dung chính", en: "Skip to main content" } as L10n,
};

/** Tiêu đề và mô tả dùng cho SEO. Tiêu đề khoảng 60 ký tự, mô tả khoảng 150 ký tự. */
export const seo: Record<"home" | "projects" | "learning" | "about" | "english", { title: L10n; description: L10n }> = {
  home: {
    title: { vi: "Leo – Tạ Hoàng Anh Tuấn | Lập trình, tiếng Anh, dữ liệu", en: "Leo – Tạ Hoàng Anh Tuấn | Code, English learning, data" },
    description: {
      vi: "Mình là Leo. Mình làm Lucy Tutor (học tiếng Anh cùng AI), Cerno (dashboard từ Google Sheets) và Lexi Learn (học lập trình song ngữ, có bài tập tự chấm).",
      en: "I'm Leo. I build Lucy Tutor (learn English with AI), Cerno (dashboards from Google Sheets) and Lexi Learn (a bilingual programming course with auto-checked exercises).",
    },
  },
  projects: {
    title: { vi: "Dự án: Lucy Tutor, Cerno, Tiếng Anh Không Khó | Leo", en: "Projects: Lucy Tutor, Cerno, Tiếng Anh Không Khó | Leo" },
    description: {
      vi: "Lucy Tutor học và luyện thi tiếng Anh cùng AI, Cerno tạo dashboard từ Google Sheets, và kênh Tiếng Anh Không Khó trên YouTube, TikTok.",
      en: "Lucy Tutor for English learning and exam prep with AI, Cerno for dashboards from Google Sheets, and the Tiếng Anh Không Khó channel on YouTube and TikTok.",
    },
  },
  learning: {
    title: { vi: "Học cùng Leo | Lập trình và tiếng Anh", en: "Learn with Leo | Programming and English" },
    description: {
      vi: "Các khóa học song ngữ Việt - Anh do Leo biên soạn: lập trình từ con số 0 với bài tập tự chấm, và tiếng Anh chuyên sâu (sắp ra mắt).",
      en: "Bilingual Vietnamese-English courses by Leo: programming from zero with auto-checked exercises, and in-depth English (coming soon).",
    },
  },
  about: {
    title: { vi: "Giới thiệu | Leo – Tạ Hoàng Anh Tuấn", en: "About | Leo – Tạ Hoàng Anh Tuấn" },
    description: {
      vi: "Tạ Hoàng Anh Tuấn (Leo) làm công cụ giúp việc học và đọc dữ liệu dễ hơn: Lucy Tutor, Cerno, Lexi Learn và kênh Tiếng Anh Không Khó.",
      en: "Tạ Hoàng Anh Tuấn (Leo) builds tools that make learning and reading data easier: Lucy Tutor, Cerno, Lexi Learn and the Tiếng Anh Không Khó channel.",
    },
  },
  english: {
    title: { vi: "Tiếng Anh chuyên sâu (sắp ra mắt) | Leo", en: "Advanced English (coming soon) | Leo" },
    description: {
      vi: "Phần tiếng Anh chuyên sâu đang được soạn: cách dùng từ tự nhiên, ngữ pháp người học hay sai và kỹ năng cho bài thi.",
      en: "In-depth English is being written: natural word choice, grammar where learners often slip, and exam skills.",
    },
  },
};
