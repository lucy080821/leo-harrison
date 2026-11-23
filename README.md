# Learn With Leo

Web app học lập trình song ngữ **Anh – Việt**: lý thuyết bên trái, trình soạn code chạy **realtime** bên phải, có bài tập tự kiểm tra.

## Chạy trên localhost

```bash
npm install
npm run dev        # http://localhost:3000  (tự chuyển sang /vi hoặc /en)
```

Build production (để deploy VPS): `npm run build && npm start`.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `src/content/registry.ts` | Danh sách category (Frontend, Backend, Data, AI) và khoá học |
| `content/<khoá>/<NN-slug>/` | Mỗi bài: `lesson.json` + `vi.md` + `en.md` |
| `src/lib/sandbox.ts` | Ghép HTML/CSS/JS thành tài liệu chạy trong iframe sandbox |
| `src/components/LessonWorkspace.tsx` | Màn hình chia đôi: lý thuyết / editor + kết quả + bài tập |
| `src/lib/i18n.ts` | Chuỗi giao diện EN/VI |

## Thêm một bài học

1. Tạo thư mục `content/<khoá>/<NN-slug>/` (số thứ tự quyết định thứ tự bài).
2. Viết `vi.md` và `en.md` (hỗ trợ bảng, code có tô màu, công thức KaTeX `$...$` / `$$...$$`).
3. Viết `lesson.json`: `title`, `summary`, `minutes`, `preview` (`web` | `console`), `files` (code khởi đầu) và `exercises`.
4. Mỗi bài tập có `checks`: `test` là một biểu thức JS chạy **bên trong trang xem trước** (có `document` và mảng `logs` chứa mọi `console.log`), trả về `true` nếu đạt.

## Lộ trình

- [x] Giai đoạn 1: khung app, dark mode, EN/VI, bài tập, tiến độ (lưu trên trình duyệt)
- [x] Giai đoạn 2: HTML (13 bài), CSS (16 bài), JavaScript (22 bài) — song ngữ, 102 bài tập tự chấm
- [x] Giai đoạn 3: Python cơ bản (16 bài), Python Data Analyst (29 bài, đã mở rộng: chuỗi thời gian, vector hoá, kiểm định, hồi quy, cohort, RFM, A/B, dự báo, văn bản), SQL (40 bài, đã mở rộng chuyên sâu: cửa sổ nâng cao, cohort, funnel, RFM, hiệu năng, giao dịch, lược đồ sao…) — chạy bằng Pyodide và SQLite WASM
- [x] Giai đoạn 4: Toán cho ML (7 bài), Machine Learning (24, đã mở rộng: đặc trưng, mất cân bằng, ROC/PR, kiểm định chéo, giải thích mô hình, chuỗi thời gian, bất thường, văn bản, gợi ý), Deep Learning (20, đã mở rộng: khởi tạo, mất mát, chuẩn hoá, lịch LR, toán CNN, embedding, mô hình ngôn ngữ, multi-head, chuyển giao, gỡ lỗi), AI hiện đại (18, đã mở rộng: RAG thực chiến, đánh giá LLM, đầu ra có cấu trúc, chi phí token, KV-cache, LoRA, RLHF/DPO, an toàn, vòng lặp agent, tìm kiếm vector) — scikit-learn chạy trong trình duyệt, mạng nơ-ron tự cài bằng NumPy
- [x] Giai đoạn 5: React (20 bài, đã mở rộng: lấy dữ liệu, form, hiệu năng, hook tự viết, composition, store, router, a11y, Suspense, transition, kiểm thử, dự án giỏ hàng), Node.js (22, đã mở rộng: Buffer, stream, process, lỗi, JWT, kiểm thử, middleware, bảo mật, tầng dữ liệu, cache, event loop, log, dự án API), Next.js (19, đã mở rộng theo Next.js 16: Server Actions, Cache Components, route động, proxy, xác thực, ảnh/font, SEO, lỗi, render, Web Vitals, sản xuất, dự án API), React Native (17, đã mở rộng: FlatList, SectionList, nền tảng, điều hướng, dữ liệu, bàn phím, hoạt ảnh, lưu trữ, trợ năng, chủ đề, hiệu năng, dự án to-do) — React/JSX chạy bằng Babel + esm.sh, Node chạy bằng bản mô phỏng trong trình duyệt
- [x] Nền tảng lập trình (12 bài khái niệm cơ bản, có nguồn học thuật): `content/foundations`
- [x] Xác suất, thống kê và toán cao cấp (39 bài, 4 module): `content/prob-stats`, hiển thị ở hướng học riêng `/learning/statistics` (không nằm trong Lập trình; link cũ `/learning/programming/courses/prob-stats/...` tự chuyển hướng)
- [x] Git và GitHub (14 bài, có trình mô phỏng Git `gitsim` chạy bằng Pyodide): `content/git-github`
- Hình minh hoạ SVG (vi/en) cho mọi khoá (kể cả ngữ âm học) nằm trong `public/lessons/<khoá>/`, sinh bằng matplotlib; mỗi bài có ít nhất một hình
- [ ] Ý tưởng sau này: WebContainers (Node thật trong trình duyệt, cần giấy phép thương mại và header COOP/COEP), tài khoản đăng nhập để đồng bộ tiến độ

## Cấu trúc trang

| Đường dẫn | Nội dung |
|---|---|
| `/vi`, `/en` | Trang chủ portfolio (câu mở đầu song ngữ, dự án, học, liên hệ) |
| `/projects` | Lucy Tutor và Cerno |
| `/learning` | Danh mục học: Lập trình (Learn With Leo), Tiếng Anh chuyên sâu (sắp ra mắt) |
| `/learning/programming/...` | Learn With Leo: lộ trình, khoá học, bài học |
| `/about` | Giới thiệu và liên hệ |

Nội dung portfolio (tên, email, dự án, câu chữ) nằm trong `src/content/site.ts`; logo dự án trong `public/projects/`. Font Be Vietnam Pro và Newsreader được đóng gói sẵn (`@fontsource`), không tải từ Google.

## Khoá Ngữ âm học tiếng Anh (giáo trình dạng bài viết)

- Nằm ở `/learning/english/phonetics`: 8 module, 42 bài (bài học, bài ôn sau mỗi module, bảng thuật ngữ và tài liệu tham khảo), song ngữ Việt - Anh. Nguồn tham khảo và các giới hạn được ghi ở bài cuối và ở cuối từng bài.
- Mỗi bài là một thư mục `content/phonetics/NN-slug/` gồm `lesson.json`, `vi.md`, `en.md`. `lesson.json` khai báo `module` (m1 đến m8, định nghĩa trong `src/content/english.ts`), `kind` (`lesson` hoặc `practice`) và `quiz` (câu hỏi `choice` hoặc `text`, kèm giải thích song ngữ).
- Phiên âm viết trong backtick, ví dụ `` `/θɪŋk/` ``, sẽ tự hiện bằng font IPA (Charis SIL).
- **Hình minh hoạ** nằm ở `public/phonetics/` (tạo bằng matplotlib từ số liệu và công thức chuẩn); chèn bằng cú pháp Markdown `![mô tả](/phonetics/ten.svg)`.
- **Công cụ tương tác** chèn bằng một dòng riêng `{{widget:vowel-lab}}` (bộ tổng hợp nguyên âm F1-F2, Web Audio) hoặc `{{widget:spectrogram}}` (phổ đồ và F0 từ micro hoặc file âm thanh). Chạy hoàn toàn trong trình duyệt, âm thanh không được gửi đi đâu.
- `node scripts/verify.mjs phonetics` kiểm tra mỗi bài có đủ bản VI/EN và câu hỏi hợp lệ.
- Chưa có video và âm thanh mẫu; sau này thêm trường `video` vào `lesson.json` và nhúng ở `ArticleLesson`.

## SEO

- Đặt địa chỉ thật của website trước khi build: `NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban.com npm run build` (dùng cho canonical, hreflang, sitemap, ảnh chia sẻ).
- Mỗi trang có `<title>`, mô tả, canonical, hreflang vi/en/x-default, Open Graph và Twitter Card (`src/lib/seo.ts`). Tiêu đề và mô tả các trang chính nằm trong `src/content/site.ts` (mục `seo`).
- `/sitemap.xml` và `/robots.txt` được tạo tự động từ danh sách trang và bài học.
- Dữ liệu có cấu trúc (JSON-LD): `Person` và `WebSite` ở trang chủ, `Course` ở trang khoá học, `LearningResource` và `BreadcrumbList` ở từng bài.
- Ảnh chia sẻ `public/og-vi.png`, `public/og-en.png` (1200x630) được dựng sẵn; muốn đổi thì thay file.
- Sau khi deploy: gửi `https://ten-mien/sitemap.xml` vào Google Search Console.

## Engine chạy code

| Engine | Dùng cho | Cách chạy |
|---|---|---|
| `web` (mặc định) | HTML, CSS, JavaScript | iframe sandbox (`src/lib/sandbox.ts`) |
| `web` + `runtime: "react"` | React, Next.js (ý tưởng cốt lõi) | JSX biên dịch bằng Babel standalone, React 18 từ esm.sh |
| `web` + `runtime: "rn"` | React Native | như trên, `react-native` ánh xạ sang react-native-web |
| `web` + `runtime: "node"` | Node.js, Express | lớp mô phỏng `src/lib/nodeShim.ts`: `fs` trong bộ nhớ, `http`, Express thu nhỏ, kiểm thử bằng `app.inject()` |
| `python` | Python, NumPy, pandas, matplotlib | Pyodide trong Web Worker (`public/workers/python-worker.js`) |
| `sql` | SQL | SQLite WASM (sql.js) trong Web Worker (`public/workers/sql-worker.js`) |

- **Python cần Internet** ở lần đầu: Pyodide và các thư viện (numpy, pandas...) được tải từ CDN jsDelivr rồi trình duyệt cache lại. SQLite WASM nằm sẵn trong `public/vendor/sqljs/` nên SQL chạy offline được.
- **React và React Native cần Internet** (Babel + React tải từ CDN). Node mô phỏng chạy offline được. Next.js cần Node thật nên bài học chỉ luyện ý tưởng cốt lõi và có hướng dẫn chạy trên máy.
- Với `react`/`rn`, `test` là biểu thức JS chạy trong iframe sau khi trang dựng xong (có thể trả về Promise, ví dụ bấm nút rồi chờ). Với `node`, `test` đọc mảng `logs`.
- Mỗi lần chạy dùng **môi trường sạch** (namespace Python mới / CSDL SQL nạp lại từ đầu).
- Dữ liệu mẫu: `content/_data/files/*.csv` (Python), `content/_data/sql/*.sql` (SQL). Khai báo trong `lesson.json` bằng `"data": [...]` hoặc `"dataset": "all"`.
- Với Python, `test` của bài tập là **biểu thức Python** chạy sau khi code của người học chạy xong (có biến `_out` chứa toàn bộ chữ đã in). Với SQL, `test` là **biểu thức JS** có `columns`, `rows`, `tables` và hàm `q(sql)`.

## Kiểm tra nội dung tự động

```bash
node scripts/verify.mjs          # tất cả khoá
node scripts/verify.mjs css      # một khoá

# Python cần một môi trường có numpy, pandas, matplotlib:
python3 -m venv .venv && .venv/bin/pip install numpy pandas matplotlib scipy scikit-learn
PYTHON_VERIFY=.venv/bin/python node scripts/verify.mjs python-data   # hoặc machine-learning, deep-learning...

# Lưu ý: venv thường có scikit-learn mới hơn Pyodide (1.7), nên bài tập ML chấm bằng NGƯỠNG hợp lý thay vì so khớp số lẻ.
```

Script mở từng bài tập trong Chromium (Playwright) và xác nhận: **đáp án đạt mọi check**, **đề khởi đầu chưa đạt hết**, và mỗi bài có đủ `vi.md`/`en.md`. Hãy chạy nó sau mỗi lần thêm hoặc sửa bài.
