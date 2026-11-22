# Terminal và cài đặt Git

## Terminal là gì?

**Terminal** (dòng lệnh, *command-line interface*) là nơi bạn điều khiển máy bằng cách gõ lệnh. Lợi thế: chính xác, tự động hoá được, và Git được thiết kế quanh dòng lệnh. Trên Windows dùng *Git Bash* hoặc PowerShell, trên macOS/Linux dùng Terminal có sẵn.

## Các lệnh nền tảng

| Lệnh | Việc làm | Ví dụ |
|---|---|---|
| `pwd` | in thư mục hiện tại | `pwd` |
| `ls` | liệt kê file | `ls` |
| `cd` | đổi thư mục | `cd project`, `cd ..` (lên một cấp) |
| `mkdir` | tạo thư mục | `mkdir project` |
| `touch` | tạo file rỗng | `touch notes.txt` |
| `cat` | xem nội dung file | `cat notes.txt` |

(PowerShell có lệnh tương đương với tên khác; Git Bash dùng đúng các lệnh trên.)

![Cây thư mục và các lệnh cd, ls, pwd di chuyển trong đó](/lessons/git-github/02-terminal-and-setup-term-vi.svg)
*Terminal luôn ở một thư mục hiện tại; cd đổi nơi đứng, ls liệt kê, pwd cho biết đang ở đâu.*

## Cài Git

1. Tải từ **git-scm.com/downloads** (Windows, macOS, Linux) hoặc dùng trình quản lý gói (`brew install git`, `sudo apt install git`).
2. Kiểm tra: `git --version`.

## Khai báo danh tính

Mỗi commit ghi tên và email tác giả, nên phải khai báo một lần:

```bash
git config --global user.name  "Ten Cua Ban"
git config --global user.email "ban@example.com"
git config --list
```

`--global` nghĩa là áp dụng cho mọi kho trên máy. Email nên trùng email tài khoản GitHub (hoặc dùng email *noreply* mà GitHub cung cấp) để commit được gắn đúng tài khoản. Từ Git 2.28, bạn có thể đặt tên nhánh mặc định: `git config --global init.defaultBranch main`.

## Xem trợ giúp

`git help <lệnh>` hoặc `git <lệnh> --help` mở trang hướng dẫn. Đọc tài liệu chính thức là kỹ năng quan trọng.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 1: Installing Git; First-Time Git Setup; Getting Help.
- Git docs: `git-config`, git-scm.com/docs/git-config.
- GitHub Docs, "Set up Git" và "Setting your commit email address".
