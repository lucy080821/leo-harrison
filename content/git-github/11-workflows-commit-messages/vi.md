# Quy trình nhóm và thông điệp commit

## Chọn một quy trình

**GitHub flow** (đơn giản, phổ biến cho web/phần mềm triển khai liên tục):

1. `main` luôn ở trạng thái **có thể triển khai**.
2. Mỗi việc làm trên **một nhánh ngắn hạn** tách từ `main`.
3. Mở **pull request** sớm; thảo luận và review.
4. Kiểm thử tự động xanh, được duyệt → **gộp vào `main`** → triển khai.

Các mô hình nặng hơn như *Git Flow* (nhánh `develop`, `release`, `hotfix`) phù hợp sản phẩm phát hành theo phiên bản; nhiều nhóm hiện chọn mô hình gọn như GitHub flow hoặc *trunk-based development*.

![GitHub flow: nhánh ngắn hạn từ main, PR, review, gộp lại](/lessons/git-github/11-workflows-commit-messages-flow-vi.svg)
*Vòng lặp lặp đi lặp lại: tách nhánh → PR → review → gộp → triển khai.*

## Bảo vệ nhánh chính

Trong **Settings → Branches (Rulesets)** bạn có thể quy định cho `main`: bắt buộc PR, bắt buộc **số người duyệt**, bắt buộc **kiểm thử qua**, cấm force push. File **CODEOWNERS** tự yêu cầu đúng người duyệt cho từng thư mục.

## Thông điệp commit có cấu trúc

**Conventional Commits** là quy ước phổ biến: `type(scope): mô tả`.

- `feat`: tính năng mới · `fix`: sửa lỗi · `docs`: tài liệu · `refactor`, `test`, `chore`…
- Ví dụ: `feat(login): them nut dang nhap bang Google`.

Lợi ích: lịch sử dễ đọc, tự sinh *changelog*, và suy ra số phiên bản tiếp theo.

## Đánh phiên bản ngữ nghĩa (SemVer)

`MAJOR.MINOR.PATCH`, ví dụ `2.4.1`:

- **MAJOR**: thay đổi *không tương thích ngược*.
- **MINOR**: thêm tính năng *tương thích ngược*.
- **PATCH**: sửa lỗi tương thích ngược.

Trên GitHub, dùng **tag** (`git tag v1.2.0`) và trang **Releases** để phát hành.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- GitHub Docs, "GitHub flow", "About protected branches", "About code owners".
- Conventional Commits 1.0.0, conventionalcommits.org.
- Semantic Versioning 2.0.0, semver.org.
- Driessen, V. (2010). A successful Git branching model (Git Flow).
- *Pro Git*, chương 5: Distributed Workflows.
