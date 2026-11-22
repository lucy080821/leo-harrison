# Giao diện web GitHub: README, issue, nhãn

## Đọc một repository

Trang chính của repo hiển thị: danh sách file, **README** (tự động render bên dưới), nhánh hiện tại, số commit, ngôn ngữ. Các tab quan trọng: **Code**, **Issues**, **Pull requests**, **Actions**, **Settings**.

- Nhấn một file để xem; nút **History** hiện lịch sử file; **Blame** cho biết dòng nào do ai sửa lần cuối.
- Phím **`.`** mở trình soạn thảo web; phím **`t`** tìm file nhanh.
- Có thể sửa file ngay trên web (biểu tượng bút chì); GitHub sẽ tạo commit cho bạn.

![Sơ đồ trang repo GitHub: thanh tab, danh sách file, README, cột bên](/lessons/git-github/09-github-web-repo-vi.svg)
*Các khu vực chính của một repo: Code, Issues, Pull requests, Actions, README.*

## README và Markdown

`README.md` là "cửa trước" của dự án: nó nên nói *dự án là gì, cài và chạy thế nào, đóng góp ra sao*. GitHub dùng **GitHub Flavored Markdown**: `# Tiêu đề`, `**đậm**`, danh sách `- mục`, khối code bằng ba dấu huyền, bảng, danh sách việc `- [ ] việc`, và nhắc người dùng `@tên`.

## Issues: theo dõi công việc

**Issue** là một đầu việc: lỗi, đề xuất, câu hỏi. Mỗi issue có số (`#12`), tiêu đề, mô tả, người được giao (**assignee**), **nhãn (label)** như `bug`, `enhancement`, `good first issue`, và **milestone**.

Báo lỗi tốt cần: các bước tái hiện, kết quả mong đợi, kết quả thực tế, phiên bản/môi trường.

### Liên kết issue với code

Ghi **`Fixes #12`** (hoặc `Closes`, `Resolves`) trong mô tả pull request hoặc thông điệp commit: khi PR được gộp vào nhánh mặc định, GitHub **tự đóng issue #12**. Nhắc `#12` bất kỳ đâu sẽ tạo liên kết qua lại.

## Khám phá và tìm kiếm

Thanh tìm kiếm hỗ trợ bộ lọc như `language:python stars:>100`. Nút **Star** đánh dấu quan tâm; **Watch** nhận thông báo; **Fork** tạo bản sao của bạn (bài sau).

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- GitHub Docs: "About READMEs", "About issues", "Basic writing and formatting syntax", "Linking a pull request to an issue".
- *Pro Git*, chương 6 "GitHub".
