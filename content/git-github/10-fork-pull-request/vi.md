# Fork và Pull Request

## Pull request là gì?

**Pull request (PR)** là *đề nghị gộp một nhánh vào nhánh khác*, kèm không gian thảo luận. Nó là trung tâm của cộng tác trên GitHub: người khác xem diff, nhận xét từng dòng, chạy kiểm thử tự động, rồi mới gộp.

![Vòng đời PR: nhánh, push, mở PR, review, gộp vào main](/lessons/git-github/10-fork-pull-request-pr-vi.svg)
*PR nằm giữa push và merge: nơi thảo luận và kiểm thử trước khi vào main.*

## Quy trình trong cùng một kho (có quyền ghi)

1. Tạo nhánh từ `main`: `git switch -c feature/ten`.
2. Commit, rồi `git push -u origin feature/ten`.
3. Trên GitHub, bấm **Compare & pull request**, viết tiêu đề và mô tả (*làm gì, vì sao, cách kiểm tra*, `Fixes #12`).
4. **Reviewer** xem tab *Files changed*, để lại nhận xét, **Approve** hoặc **Request changes**.
5. Bạn sửa tiếp bằng cách commit thêm lên cùng nhánh; PR tự cập nhật.
6. Khi đạt yêu cầu và kiểm thử xanh, bấm **Merge**.

Ba kiểu gộp trên GitHub: **Merge commit** (giữ nguyên lịch sử), **Squash and merge** (gộp mọi commit thành một), **Rebase and merge** (xếp commit lại thẳng hàng). Tuỳ quy ước nhóm.

## Fork: đóng góp cho dự án không có quyền ghi

Với mã nguồn mở, bạn **fork** (tạo bản sao dưới tài khoản của bạn), sửa ở đó rồi mở PR về kho gốc:

```bash
git clone https://github.com/ban/du-an.git       # kho fork của bạn
git remote add upstream https://github.com/goc/du-an.git
git fetch upstream && git switch -c fix/loi-chinh-ta upstream/main
# sửa, commit, push lên fork của bạn, rồi mở PR trên GitHub
```

`origin` là fork của bạn, `upstream` là kho gốc.

## Review lịch sự và hiệu quả

- PR **nhỏ và tập trung**: dễ review hơn nhiều.
- Reviewer: nhận xét *code*, không phải *con người*; nêu lý do; phân biệt "bắt buộc" và "gợi ý".
- Người gửi: đọc kỹ, trả lời từng nhận xét, cảm ơn.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- GitHub Docs: "About pull requests", "Reviewing proposed changes in a pull request", "Fork a repo", "About merge methods on GitHub".
- *Pro Git*, chương 6: Contributing to a Project.
- GitHub Docs, "GitHub flow".
