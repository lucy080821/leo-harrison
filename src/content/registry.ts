import type { L10n } from "@/lib/i18n";

export type CategoryId = "frontend" | "backend" | "data" | "ai";

export type Category = {
  id: CategoryId;
  name: L10n;
  desc: L10n;
};

export type Course = {
  id: string;
  category: CategoryId;
  badge: string; // chữ viết tắt hiển thị trên thẻ
  name: L10n;
  desc: L10n;
};

export const categories: Category[] = [
  {
    id: "frontend",
    name: { vi: "Frontend", en: "Frontend" },
    desc: {
      vi: "Xây giao diện web và ứng dụng di động: HTML, CSS, JavaScript, Next.js, React Native.",
      en: "Build web and mobile interfaces: HTML, CSS, JavaScript, Next.js, React Native.",
    },
  },
  {
    id: "backend",
    name: { vi: "Backend", en: "Backend" },
    desc: {
      vi: "Xây máy chủ, API và logic phía server với Node.js.",
      en: "Build servers, APIs and server-side logic with Node.js.",
    },
  },
  {
    id: "data",
    name: { vi: "Dữ liệu", en: "Data" },
    desc: {
      vi: "Python từ con số 0, Python cho Data Analyst (numpy, pandas) và SQL.",
      en: "Python from scratch, Python for Data Analysts (numpy, pandas) and SQL.",
    },
  },
  {
    id: "ai",
    name: { vi: "AI & Machine Learning", en: "AI & Machine Learning" },
    desc: {
      vi: "Toán cho ML, Machine Learning, Deep Learning và AI hiện đại — lý thuyết đầy đủ.",
      en: "Math for ML, Machine Learning, Deep Learning and modern AI — with complete theory.",
    },
  },
];

export const courses: Course[] = [
  // Frontend
  {
    id: "html",
    category: "frontend",
    badge: "HTML",
    name: { vi: "HTML", en: "HTML" },
    desc: { vi: "Ngôn ngữ đánh dấu — bộ khung của mọi trang web.", en: "The markup language — the skeleton of every web page." },
  },
  {
    id: "css",
    category: "frontend",
    badge: "CSS",
    name: { vi: "CSS", en: "CSS" },
    desc: { vi: "Tạo kiểu, bố cục và hiệu ứng cho trang web.", en: "Style, lay out and animate web pages." },
  },
  {
    id: "javascript",
    category: "frontend",
    badge: "JS",
    name: { vi: "JavaScript", en: "JavaScript" },
    desc: { vi: "Ngôn ngữ lập trình của trình duyệt — làm trang web biết tương tác.", en: "The language of the browser — make pages interactive." },
  },
  {
    id: "nextjs",
    category: "frontend",
    badge: "Next",
    name: { vi: "Next.js", en: "Next.js" },
    desc: { vi: "Framework React full-stack: routing, SSR, deploy.", en: "The full-stack React framework: routing, SSR, deployment." },
  },
  {
    id: "react-native",
    category: "frontend",
    badge: "RN",
    name: { vi: "React Native", en: "React Native" },
    desc: { vi: "Xây ứng dụng di động bằng React.", en: "Build mobile apps with React." },
  },
  // Backend
  {
    id: "nodejs",
    category: "backend",
    badge: "Node",
    name: { vi: "Node.js", en: "Node.js" },
    desc: { vi: "JavaScript phía server: module, file, HTTP, Express, API.", en: "Server-side JavaScript: modules, files, HTTP, Express, APIs." },
  },
  // Data
  {
    id: "python-basics",
    category: "data",
    badge: "Py",
    name: { vi: "Python cơ bản", en: "Python Basics" },
    desc: { vi: "Học Python từ con số 0 — không cần biết gì trước.", en: "Learn Python from zero — no prior knowledge needed." },
  },
  {
    id: "python-data",
    category: "data",
    badge: "DA",
    name: { vi: "Python cho Data Analyst", en: "Python for Data Analysis" },
    desc: { vi: "numpy, pandas, matplotlib và quy trình phân tích dữ liệu.", en: "numpy, pandas, matplotlib and the data-analysis workflow." },
  },
  {
    id: "sql",
    category: "data",
    badge: "SQL",
    name: { vi: "SQL", en: "SQL" },
    desc: { vi: "Truy vấn và quản lý dữ liệu quan hệ.", en: "Query and manage relational data." },
  },
  // AI
  {
    id: "math-for-ml",
    category: "ai",
    badge: "∑",
    name: { vi: "Toán cho Machine Learning", en: "Math for Machine Learning" },
    desc: { vi: "Đại số tuyến tính, xác suất, giải tích, gradient descent.", en: "Linear algebra, probability, calculus, gradient descent." },
  },
  {
    id: "machine-learning",
    category: "ai",
    badge: "ML",
    name: { vi: "Machine Learning", en: "Machine Learning" },
    desc: { vi: "Các thuật toán ML cổ điển với scikit-learn, từ hồi quy đến cây quyết định.", en: "Classical ML algorithms with scikit-learn, from regression to decision trees." },
  },
  {
    id: "deep-learning",
    category: "ai",
    badge: "DL",
    name: { vi: "Deep Learning", en: "Deep Learning" },
    desc: { vi: "Mạng nơ-ron, CNN, RNN, Transformer — tự cài đặt từ đầu bằng numpy.", en: "Neural nets, CNN, RNN, Transformers — built from scratch with numpy." },
  },
  {
    id: "modern-ai",
    category: "ai",
    badge: "AI",
    name: { vi: "AI hiện đại", en: "Modern AI" },
    desc: { vi: "NLP, embedding, LLM, RAG, agent và học tăng cường.", en: "NLP, embeddings, LLMs, RAG, agents and reinforcement learning." },
  },
];

export function getCourse(id: string) {
  return courses.find((c) => c.id === id);
}
export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}
export function coursesOf(category: CategoryId) {
  return courses.filter((c) => c.category === category);
}
