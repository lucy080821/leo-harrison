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
- [ ] Giai đoạn 4: Toán cho ML, Machine Learning, Deep Learning, AI hiện đại
- [ ] Giai đoạn 5: React, Next.js, React Native, Node.js (WebContainers)

## Engine chạy code

| Engine | Dùng cho | Cách chạy |
|---|---|---|
| `web` (mặc định) | HTML, CSS, JavaScript | iframe sandbox (`src/lib/sandbox.ts`) |
| `python` | Python, NumPy, pandas, matplotlib | Pyodide trong Web Worker (`public/workers/python-worker.js`) |
| `sql` | SQL | SQLite WASM (sql.js) trong Web Worker (`public/workers/sql-worker.js`) |

- **Python cần Internet** ở lần đầu: Pyodide và các thư viện (numpy, pandas...) được tải từ CDN jsDelivr rồi trình duyệt cache lại. SQLite WASM nằm sẵn trong `public/vendor/sqljs/` nên SQL chạy offline được.
- Mỗi lần chạy dùng **môi trường sạch** (namespace Python mới / CSDL SQL nạp lại từ đầu).
- Dữ liệu mẫu: `content/_data/files/*.csv` (Python), `content/_data/sql/*.sql` (SQL). Khai báo trong `lesson.json` bằng `"data": [...]` hoặc `"dataset": "all"`.
- Với Python, `test` của bài tập là **biểu thức Python** chạy sau khi code của người học chạy xong (có biến `_out` chứa toàn bộ chữ đã in). Với SQL, `test` là **biểu thức JS** có `columns`, `rows`, `tables` và hàm `q(sql)`.

## Kiểm tra nội dung tự động

```bash
node scripts/verify.mjs          # tất cả khoá
node scripts/verify.mjs css      # một khoá

# Python cần một môi trường có numpy, pandas, matplotlib:
python3 -m venv .venv && .venv/bin/pip install numpy pandas matplotlib scipy
PYTHON_VERIFY=.venv/bin/python node scripts/verify.mjs python-data
```

Script mở từng bài tập trong Chromium (Playwright) và xác nhận: **đáp án đạt mọi check**, **đề khởi đầu chưa đạt hết**, và mỗi bài có đủ `vi.md`/`en.md`. Hãy chạy nó sau mỗi lần thêm hoặc sửa bài.
