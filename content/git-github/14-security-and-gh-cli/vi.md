# Bảo mật tài khoản và GitHub CLI

## Bảo vệ tài khoản

- **Xác thực hai lớp (2FA)**: GitHub yêu cầu 2FA cho người đóng góp mã (triển khai từ 2023). Ưu tiên *passkey* hoặc ứng dụng xác thực; lưu **mã khôi phục**.
- **Mật khẩu mạnh, duy nhất**, dùng trình quản lý mật khẩu.
- **Token tối thiểu quyền**: ưu tiên *fine-grained personal access token* chỉ cho đúng kho cần, đặt thời hạn ngắn, và **thu hồi** khi không dùng.
- **Khoá SSH** có passphrase; xem *Settings → SSH and GPG keys* để gỡ khoá lạ.
- **Ký commit** (GPG hoặc SSH) để GitHub gắn nhãn *Verified*, chứng minh commit do bạn tạo.

## Bí mật không bao giờ vào kho

Quy tắc: **không commit** mật khẩu, token, khoá riêng, `.env`. Nếu lỡ:

1. **Thu hồi/đổi ngay** bí mật đó (xoá commit không đủ vì lịch sử và bản sao vẫn còn).
2. Gỡ khỏi lịch sử bằng công cụ như `git filter-repo` (nâng cao), rồi báo mọi người cập nhật.
3. Thêm vào `.gitignore`.

GitHub có **secret scanning** (và *push protection*) tự phát hiện nhiều loại token phổ biến khi bạn push.

![Lớp bảo vệ quanh kho: 2FA, token hạn chế, quét bí mật, Dependabot](/lessons/git-github/14-security-and-gh-cli-security-vi.svg)
*Nhiều lớp phòng thủ nhỏ hợp lại: tài khoản, token, mã nguồn, thư viện.*

## Giữ phụ thuộc an toàn

**Dependabot** tự mở PR cập nhật thư viện lỗi thời hoặc có lỗ hổng. **Security advisories** thông báo lỗ hổng đã biết. Bật các tính năng này trong *Settings → Code security*.

## GitHub CLI (`gh`)

**`gh`** là công cụ dòng lệnh chính thức của GitHub, giúp làm trên terminal những việc thường làm ở website:

```bash
gh auth login                 # đăng nhập (thay thế việc tự quản lý token)
gh repo create ten --public   # tạo repo
gh repo clone ban/ten
gh issue list
gh pr create --fill           # mở PR từ nhánh hiện tại
gh pr checkout 42             # lấy PR số 42 về máy để thử
gh pr merge --squash
```

Cài `gh` từ cli.github.com. `gh` là *phần bổ sung* cho Git, không thay thế `git`.

## Bảng nhớ nhanh

| Mục tiêu | Lệnh |
|---|---|
| Bắt đầu | `git init` / `git clone` |
| Lưu | `git add` → `git commit` |
| Nhánh | `git switch -c` / `git merge` |
| Chia sẻ | `git push` / `git pull` |
| Hoàn tác | `git restore` / `git revert` |
| Cộng tác | pull request, review |

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- GitHub Docs: "Securing your account with two-factor authentication", "About secret scanning", "About Dependabot", "About commit signature verification".
- GitHub CLI manual, cli.github.com/manual.
- GitHub Blog, "GitHub will require all code contributors to use 2FA by end of 2023".
- OWASP, "Secrets Management Cheat Sheet".
