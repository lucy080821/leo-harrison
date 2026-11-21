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
- [ ] Giai đoạn 2: HTML, CSS, JavaScript đầy đủ (hiện có 2 bài mẫu mỗi môn)
- [ ] Giai đoạn 3: Python cơ bản, Python Data Analyst (Pyodide), SQL (SQLite WASM)
- [ ] Giai đoạn 4: Toán cho ML, Machine Learning, Deep Learning, AI hiện đại
- [ ] Giai đoạn 5: React, Next.js, React Native, Node.js (WebContainers)
