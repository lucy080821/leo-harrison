# Lexi Learn

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
- [x] Giai đoạn 3: Python cơ bản (16 bài), Python Data Analyst (14 bài), SQL (15 bài) — chạy bằng Pyodide và SQLite WASM
- [x] Giai đoạn 4: Toán cho ML (7 bài), Machine Learning (13), Deep Learning (10), AI hiện đại (8) — scikit-learn chạy trong trình duyệt, mạng nơ-ron tự cài bằng NumPy
- [x] Giai đoạn 5: React (8 bài), Node.js (9), Next.js (6), React Native (5) — React/JSX chạy bằng Babel + esm.sh, Node chạy bằng bản mô phỏng trong trình duyệt
- [ ] Ý tưởng sau này: WebContainers (Node thật trong trình duyệt, cần giấy phép thương mại và header COOP/COEP), tài khoản đăng nhập để đồng bộ tiến độ

## Cấu trúc trang

| Đường dẫn | Nội dung |
|---|---|
| `/vi`, `/en` | Trang chủ portfolio (câu mở đầu song ngữ, dự án, học, liên hệ) |
| `/projects` | Lucy Tutor và Cerno |
| `/learning` | Danh mục học: Lập trình (Lexi Learn), Tiếng Anh chuyên sâu (sắp ra mắt) |
| `/learning/programming/...` | Lexi Learn: lộ trình, khoá học, bài học |
| `/about` | Giới thiệu và liên hệ |

Nội dung portfolio (tên, email, dự án, câu chữ) nằm trong `src/content/site.ts`; logo dự án trong `public/projects/`. Font Be Vietnam Pro và Newsreader được đóng gói sẵn (`@fontsource`), không tải từ Google.

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
