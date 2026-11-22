# GitHub: tài khoản, kho từ xa và xác thực

## GitHub là gì?

**GitHub** là dịch vụ web lưu **kho Git từ xa** và thêm công cụ cộng tác: *pull request, issue, review, Actions, Pages…* Các dịch vụ tương tự: GitLab, Bitbucket. Git là phần mềm; GitHub là nơi bạn đặt kho để *sao lưu, chia sẻ và cộng tác*.

## Tạo kho trên website

1. Đăng ký tài khoản tại github.com, **bật xác thực hai lớp (2FA)**.
2. Nhấn **New repository**. Đặt tên, chọn *Public* (ai cũng xem) hoặc *Private*.
3. Có thể tích *Add a README*, `.gitignore` và giấy phép (**License**; không có giấy phép thì người khác về mặt pháp lý chưa được tự do dùng code của bạn).
4. **Create repository**: GitHub hiện các lệnh để kết nối.

## Remote và push

**Remote** là tên gọi (thường `origin`) cho URL của kho từ xa.

```bash
git remote add origin https://github.com/ban/ten-repo.git
git push -u origin main     # đẩy nhánh main lên, -u nhớ liên kết
git clone https://github.com/ban/ten-repo.git   # tải một kho về máy
```

![Máy của bạn, remote origin trên GitHub và các lệnh push, pull, clone](/lessons/git-github/07-github-account-remote-remote-vi.svg)
*push đẩy commit lên GitHub; pull/fetch kéo về; clone tải cả kho lần đầu.*

Sau `-u`, các lần sau chỉ cần `git push` / `git pull`.

## Xác thực: HTTPS hay SSH?

GitHub **không còn chấp nhận mật khẩu tài khoản** cho thao tác Git qua dòng lệnh (từ tháng 8/2021). Có hai cách:

- **HTTPS + Personal Access Token (PAT)** hoặc trình quản lý thông tin đăng nhập (Git Credential Manager / `gh auth login`). Token có phạm vi quyền và hạn dùng, hãy cấp quyền *tối thiểu*.
- **SSH**: tạo cặp khoá bằng `ssh-keygen -t ed25519`, dán **khoá công khai** (`.pub`) vào *Settings → SSH and GPG keys*, rồi dùng URL dạng `git@github.com:ban/ten-repo.git`. **Khoá riêng không bao giờ chia sẻ.**

> Token và khoá riêng là bí mật: không dán vào chat, không commit vào kho.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 2: Working with Remotes; chương 6: GitHub (Account Setup and Configuration).
- GitHub Docs, "Creating a new repository", "Connecting to GitHub with SSH", "Managing your personal access tokens", "Securing your account with two-factor authentication".
- GitHub Blog (2020), "Token authentication requirements for Git operations".
