# Kho Git đầu tiên: add và commit

## Ba vùng của Git

Mọi thứ trong Git xoay quanh ba vùng (*Pro Git* gọi là ba trạng thái):

1. **Thư mục làm việc (working directory)**: các file bạn đang sửa.
2. **Vùng staging (index)**: nơi bạn *chọn* những thay đổi sẽ vào commit tiếp theo.
3. **Kho (repository / `.git`)**: nơi lưu các commit vĩnh viễn.

![Ba vùng của Git và các lệnh chuyển file giữa chúng](/lessons/git-github/03-first-repo-areas-vi.svg)
*git add chuyển từ thư mục làm việc sang staging; git commit chuyển từ staging vào kho.*

Vòng làm việc cơ bản: **sửa file → `git add` → `git commit`**. Vùng staging cho phép bạn tạo commit *gọn, có chủ đề*, dù bạn đã sửa nhiều thứ.

## Các lệnh

```bash
git init                 # biến thư mục hiện tại thành kho Git
git status               # xem trạng thái: file nào mới / đã sửa / đã staged
git add README.md        # đưa file vào vùng staging
git add .                # đưa mọi thay đổi trong thư mục
git commit -m "Thông điệp"   # lưu ảnh chụp
git log --oneline        # xem lịch sử gọn
```

Một file có thể ở bốn trạng thái: **chưa theo dõi (untracked)**, **chưa đổi (unmodified)**, **đã sửa (modified)**, **đã staged**.

## Viết thông điệp commit tốt

- Dòng đầu ≤ ~50 ký tự, mệnh lệnh: "Fix login bug", "Add search box".
- Nói *vì sao* khi cần, không chỉ *cái gì*.
- Một commit = một thay đổi có ý nghĩa. Đây là thói quen đáng giá nhất khi làm việc nhóm.

## Cẩn thận: đừng commit thứ không nên có

Mật khẩu, khoá API, file `.env`, thư mục `node_modules`: không bao giờ đưa vào kho (bài sau về `.gitignore`).

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 2 "Git Basics": Getting a Git Repository; Recording Changes to the Repository; Viewing the Commit History.
- Git docs: `git-add`, `git-commit`, `git-status`.
- GitHub Docs, "Git cheat sheet".
