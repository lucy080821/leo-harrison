import type { L10n } from "@/lib/i18n";

export const owner = {
  name: "Tạ Hoàng Anh Tuấn",
  nick: "Leo",
  email: "tahoanganhtuan1996@gmail.com",
};

export const nav: { href: string; label: L10n }[] = [
  { href: "projects", label: { vi: "Dự án", en: "Projects" } },
  { href: "learning", label: { vi: "Học", en: "Learning" } },
  { href: "about", label: { vi: "Giới thiệu", en: "About" } },
];

/** Câu mở đầu chia thành cụm: cụm tiếng Việt và cụm tiếng Anh thẳng hàng nhau. */
export const heroChunks: L10n[] = [
  { vi: "Tôi làm công cụ", en: "I build tools" },
  { vi: "để việc học", en: "that make learning" },
  { vi: "và dữ liệu", en: "and data" },
  { vi: "dễ hiểu hơn.", en: "easier to grasp." },
];

export type Project = {
  id: string;
  name: string;
  url: string;
  host: string;
  logo: string;
  shot: string;
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
      vi: "Nền tảng cho cả học viên và giáo viên. Học viên làm bài kiểm tra trình độ, luyện bốn kỹ năng và được AI chấm Writing. Giáo viên quản lý lớp, điểm danh và học phí trong cùng một nơi.",
      en: "A platform for both students and teachers. Students take a level test, practise all four skills and get Writing graded by AI. Teachers manage classes, attendance and tuition in one place.",
    },
    points: [
      { vi: "Kiểm tra trình độ từ A1 đến C1", en: "Level test from A1 to C1" },
      { vi: "Bảng 44 âm IPA và luyện phát âm với AI", en: "A 44-sound IPA chart and pronunciation practice with AI" },
      { vi: "Đề THPT Quốc gia và IELTS Cambridge", en: "National high-school exam and IELTS Cambridge papers" },
      { vi: "Từ vựng ôn theo thuật toán lặp lại ngắt quãng (SM-2)", en: "Vocabulary reviewed with spaced repetition (SM-2)" },
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
];

export const stats: { n: string | null; label: L10n }[] = [
  { n: "3", label: { vi: "sản phẩm", en: "products" } },
  { n: null, label: { vi: "bài học có bài tập", en: "lessons with exercises" } },
  { n: "2", label: { vi: "ngôn ngữ: Việt và Anh", en: "languages: Vietnamese and English" } },
];

export const t = {
  learningLabel: { vi: "Chia sẻ kiến thức", en: "Knowledge sharing" } as L10n,
  portfolio: { vi: "Portfolio", en: "Portfolio" } as L10n,
  ctaLead: { vi: "Hãy", en: "Let's" } as L10n,
  ctaWord: { vi: "trò chuyện", en: "talk" } as L10n,
  emailMe: { vi: "Gửi email", en: "Email" } as L10n,
  openProduct: { vi: "Xem", en: "View" } as L10n,
  alsoHere: { vi: "Cũng ở đây", en: "Also here" } as L10n,
  hello: { vi: "Xin chào, tôi là", en: "Hi, I'm" } as L10n,
  heroSub: {
    vi: "Tôi thiết kế và xây dựng sản phẩm về học tập và dữ liệu, rồi viết lại những gì mình học để chia sẻ với mọi người.",
    en: "I design and build products for learning and data, then write down what I learn to share with others.",
  } as L10n,
  seeProjects: { vi: "Xem dự án", en: "See the projects" } as L10n,
  startLearning: { vi: "Vào học", en: "Start learning" } as L10n,
  projectsTitle: { vi: "Dự án", en: "Projects" } as L10n,
  projectsIntro: {
    vi: "Hai sản phẩm đang chạy thật mà tôi đã thiết kế và xây dựng.",
    en: "Two live products that I designed and built.",
  } as L10n,
  visit: { vi: "Mở", en: "Visit" } as L10n,
  allProjects: { vi: "Tất cả dự án", en: "All projects" } as L10n,
  learningTitle: { vi: "Học cùng tôi", en: "Learn with me" } as L10n,
  learningIntro: {
    vi: "Những thứ tôi học và dạy lại, viết song ngữ và có bài tập để tự thử.",
    en: "Things I learn and teach back, written in two languages with exercises to try yourself.",
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
  contactTitle: { vi: "Liên hệ", en: "Get in touch" } as L10n,
  contactBody: {
    vi: "Muốn hợp tác, góp ý cho một dự án hay chỉ chào một tiếng, cứ gửi email.",
    en: "Want to work together, give feedback on a project, or just say hi? Send an email.",
  } as L10n,
  aboutTitle: { vi: "Giới thiệu", en: "About" } as L10n,
  aboutBody: [
    {
      vi: "Tôi là Tạ Hoàng Anh Tuấn, mọi người gọi tôi là Leo. Tôi xây dựng các công cụ giúp việc học và việc đọc dữ liệu bớt nặng nề hơn.",
      en: "I'm Tạ Hoàng Anh Tuấn, and people call me Leo. I build tools that make learning and reading data less of a chore.",
    },
    {
      vi: "Lucy Tutor ra đời để học và luyện thi tiếng Anh có người đồng hành là AI. Cerno dành cho ai có dữ liệu trong Google Sheets nhưng chưa có cách trình bày. Lexi Learn là nơi tôi viết lại những gì mình học về lập trình, để người khác bắt đầu từ con số 0 mà không bị lạc.",
      en: "Lucy Tutor lets people study and prepare for English exams with an AI alongside them. Cerno is for anyone whose data sits in Google Sheets with no good way to show it. Lexi Learn is where I write down what I learn about programming so others can start from zero without getting lost.",
    },
    {
      vi: "Trang này gom tất cả lại một chỗ, kèm những gì tôi học được và muốn chia sẻ. Phần tiếng Anh chuyên sâu sẽ là chủ đề tiếp theo.",
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
  rights: { vi: "Mọi quyền được bảo lưu.", en: "All rights reserved." } as L10n,
};
