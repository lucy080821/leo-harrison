# Xem thay đổi, hoàn tác và .gitignore

## Xem điều gì đã đổi

```bash
git status          # tổng quan
git diff            # thay đổi CHƯA staged (thư mục làm việc so với staging)
git diff --staged   # thay đổi ĐÃ staged (staging so với commit gần nhất)
git log --oneline   # lịch sử
git show <mã>       # chi tiết một commit
```

## Hoàn tác an toàn: chọn đúng công cụ

| Tình huống | Lệnh |
|---|---|
| Bỏ thay đổi chưa add trong một file | `git restore <file>` |
| Bỏ file khỏi staging (giữ nguyên nội dung) | `git restore --staged <file>` |
| Sửa thông điệp/nội dung commit **chưa push** | `git commit --amend` |
| Đảo ngược một commit **đã chia sẻ** | `git revert <mã>` (tạo commit mới) |
| Lùi nhánh về commit cũ (cục bộ, **nguy hiểm**) | `git reset --hard <mã>` |

`git restore` và `git switch` được thêm vào Git 2.23 (2019) để tách các việc mà `git checkout` từng làm lẫn lộn.

> **Quy tắc vàng:** lệnh *đổi lịch sử* (`reset --hard`, `commit --amend`, `rebase`) chỉ dùng cho commit **chưa push**. Với commit đã chia sẻ, hãy dùng `revert` vì nó *thêm* lịch sử thay vì xoá.

![Bảng chọn: lệnh hoàn tác tuỳ theo commit đã push hay chưa](/lessons/git-github/04-undo-ignore-undo-vi.svg)
*Chưa push: có thể sửa lịch sử. Đã push: dùng revert.*

Dù lỡ tay, `git reflog` ghi lại mọi nơi `HEAD` từng đứng, thường cứu được commit tưởng đã mất (trong một thời gian).

## .gitignore

File `.gitignore` liệt kê mẫu tên file/thư mục Git phải **bỏ qua**:

```gitignore
node_modules/
.env
*.log
.DS_Store
```

- Cần tạo **trước** khi `git add`; file *đã được theo dõi* thì ignore không có tác dụng (phải `git rm --cached`).
- GitHub có kho mẫu `github/gitignore` cho từng ngôn ngữ.
- **Bí mật (mật khẩu, token) lỡ commit vẫn nằm trong lịch sử.** Hãy thu hồi (rotate) bí mật đó ngay, đừng chỉ xoá file.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 2: Undoing Things; Ignoring Files; chương 7: Reset Demystified.
- Git docs: `git-restore`, `git-revert`, `git-reset`, `gitignore`.
- GitHub Docs, "Ignoring files" và "Removing sensitive data from a repository".
