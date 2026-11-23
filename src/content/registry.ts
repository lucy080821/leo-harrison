import type { L10n } from "@/lib/i18n";

export type CategoryId = "foundations" | "frontend" | "backend" | "data" | "ai";

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
    id: "foundations",
    name: { vi: "Nền tảng", en: "Foundations" },
    desc: {
      vi: "Khái niệm cốt lõi của khoa học máy tính, trình bày học thuật nhưng giải thích đơn giản: tính toán, nhị phân, thuật toán, web, dữ liệu, kiểm thử, học máy, cùng Git và GitHub.",
      en: "Core computer-science concepts, presented academically but explained simply: computation, binary, algorithms, the web, data, testing, machine learning, plus Git and GitHub.",
    },
  },
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
  // Foundations
  {
    id: "foundations",
    category: "foundations",
    badge: "CS",
    name: { vi: "Nền tảng lập trình", en: "Programming Foundations" },
    desc: {
      vi: "12 bài khái niệm cơ bản dựa trên CS2023, CS50, MIT 6.0001, RFC và các bài báo gốc; mỗi bài có nguồn tham khảo.",
      en: "12 lessons on basic concepts based on CS2023, CS50, MIT 6.0001, RFCs and original papers; every lesson lists its sources.",
    },
  },
  {
    id: "git-github",
    category: "foundations",
    badge: "Git",
    name: { vi: "Git và GitHub", en: "Git and GitHub" },
    desc: {
      vi: "14 bài dùng Git trên terminal và GitHub trên website: commit, nhánh, pull request, Actions, bảo mật. Có trình mô phỏng Git chạy ngay trong trình duyệt.",
      en: "14 lessons on using Git in the terminal and GitHub on the website: commits, branches, pull requests, Actions, security. Includes an in-browser Git simulator.",
    },
  },
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
    id: "react",
    category: "frontend",
    badge: "React",
    name: { vi: "React", en: "React" },
    desc: { vi: "Thư viện UI: component, state, hooks — nền tảng của Next.js và React Native.", en: "The UI library: components, state, hooks — the base of Next.js and React Native." },
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

/** Khoá Xác suất, thống kê và toán cao cấp: một hướng học riêng (/learning/statistics), không nằm trong Lập trình. */
export const statisticsModules: { id: string; title: L10n; desc: L10n }[] = [
  {
    id: "m1",
    title: { vi: "Module 1. Nền tảng xác suất", en: "Module 1. Probability foundations" },
    desc: { vi: "Mô tả dữ liệu, đếm, Bayes, biến ngẫu nhiên, các phân phối chính, CLT và chuỗi Markov.", en: "Describing data, counting, Bayes, random variables, the key distributions, the CLT and Markov chains." },
  },
  {
    id: "m2",
    title: { vi: "Module 2. Suy luận thống kê", en: "Module 2. Statistical inference" },
    desc: { vi: "Thiết kế mẫu, ước lượng, khoảng tin cậy, kiểm định (t, chi-bình phương, ANOVA), power, bootstrap, so sánh bội và Bayes.", en: "Sampling design, estimation, confidence intervals, tests (t, chi-square, ANOVA), power, the bootstrap, multiple comparisons and Bayes." },
  },
  {
    id: "m3",
    title: { vi: "Module 3. Mô hình hoá và thực nghiệm", en: "Module 3. Modelling and experiments" },
    desc: { vi: "Hồi quy đơn và bội, chẩn đoán, hồi quy logistic, chuỗi thời gian, thiết kế thực nghiệm A/B và các bẫy thống kê.", en: "Simple and multiple regression, diagnostics, logistic regression, time series, A/B experiment design and statistical pitfalls." },
  },
  {
    id: "m4",
    title: { vi: "Module 4. Toán cao cấp cho phân tích dữ liệu", en: "Module 4. Advanced math for data analysis" },
    desc: { vi: "Vi tích phân, chuỗi Taylor, giải tích nhiều biến, phương trình vi phân, đại số tuyến tính, PCA và SVD.", en: "Calculus, Taylor series, multivariable calculus, differential equations, linear algebra, PCA and SVD." },
  },
];

export const statisticsCourse = {
  id: "prob-stats",
  badge: "σ",
  name: { vi: "Xác suất, thống kê và toán cao cấp", en: "Probability, Statistics and Advanced Math" } as L10n,
  desc: {
    vi: "39 bài, 4 module, từ khái niệm cơ bản đến nâng cao ở mức làm nghề: xác suất, suy luận, kiểm định, hồi quy, chuỗi thời gian, thực nghiệm A/B, vi tích phân, đại số tuyến tính, SVD; ví dụ thực tế và hình minh hoạ.",
    en: "39 lessons in 4 modules, from basics to professional depth: probability, inference, testing, regression, time series, A/B experiments, calculus, linear algebra, SVD; real-world examples and illustrations.",
  } as L10n,
};
