# GitHub Actions và GitHub Pages

## CI/CD là gì?

**Tích hợp liên tục (Continuous Integration, CI)** là chạy build và kiểm thử *tự động* mỗi lần có thay đổi, để lỗi bị phát hiện sớm. **Triển khai liên tục (CD)** tự động đưa bản đã qua kiểm thử lên môi trường chạy. Cả hai là thực hành cốt lõi của kỹ nghệ phần mềm hiện đại.

## GitHub Actions

**GitHub Actions** là nền tảng CI/CD tích hợp sẵn. Bạn mô tả quy trình trong file YAML đặt tại `.github/workflows/ten.yml`:

```yaml
name: CI
on: [push, pull_request]        # sự kiện kích hoạt
jobs:
  test:                          # một job
    runs-on: ubuntu-latest       # máy chạy (runner)
    steps:
      - uses: actions/checkout@v4          # tải code về
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
```

Các khái niệm: **workflow** (file YAML) gồm các **job** chạy song song hoặc nối tiếp; mỗi job gồm các **step** (`run` lệnh shell hoặc `uses` một *action* dùng lại); **runner** là máy chạy job. Kết quả hiện ngay trên PR dưới dạng dấu ✓/✗ (**status check**), kết hợp với bảo vệ nhánh để chặn gộp khi kiểm thử đỏ.

![Đường ống CI: push → checkout → cài đặt → kiểm thử → trạng thái trên PR](/lessons/git-github/13-actions-pages-actions-vi.svg)
*Mỗi lần push, runner chạy các bước theo thứ tự và báo ✓/✗ về pull request.*

### Bí mật trong workflow

Khoá API, token để trong **Settings → Secrets and variables → Actions**, dùng qua `${{ secrets.TEN }}`. **Không bao giờ** ghi thẳng vào file workflow. Khi dùng action của bên thứ ba, nên ghim theo phiên bản/commit cụ thể.

## GitHub Pages

**GitHub Pages** đăng website **tĩnh** (HTML/CSS/JS) trực tiếp từ kho: *Settings → Pages* rồi chọn nguồn (một nhánh/thư mục, hoặc dùng GitHub Actions để build rồi đăng). Địa chỉ mặc định dạng `https://tenban.github.io/ten-repo/`, có thể gắn tên miền riêng. Phù hợp cho portfolio, tài liệu, blog tĩnh. Không chạy được mã phía server.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- GitHub Docs: "Understanding GitHub Actions", "Workflow syntax for GitHub Actions", "Using secrets in GitHub Actions", "What is GitHub Pages?".
- Humble, J. & Farley, D. *Continuous Delivery* (Addison-Wesley, 2010).
