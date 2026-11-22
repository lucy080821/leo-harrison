# Nhánh (branch)

## Nhánh là gì?

Trong Git, **nhánh chỉ là một con trỏ có tên trỏ tới một commit**; nó cực kỳ nhẹ (một file 41 byte). *Pro Git* nhấn mạnh đây là "tính năng sát thủ" của Git: tạo nhánh gần như tức thì, nên bạn nên dùng nhánh cho từng tính năng hay lỗi.

**HEAD** là con trỏ đặc biệt cho biết *bạn đang đứng ở đâu* (thường trỏ tới nhánh hiện tại). Khi commit, nhánh hiện tại tiến lên một bước.

![Hai nhánh main và feature cùng trỏ vào chuỗi commit, HEAD ở feature](/lessons/git-github/05-branches-branch-vi.svg)
*Nhánh chỉ là nhãn trỏ vào một commit; HEAD cho biết nhánh đang đứng.*

## Lệnh

```bash
git branch                 # liệt kê nhánh
git branch feature-x       # tạo nhánh (chưa chuyển sang)
git switch feature-x       # chuyển nhánh
git switch -c feature-x    # tạo và chuyển (kiểu cũ: git checkout -b)
git branch -d feature-x    # xoá nhánh đã gộp
```

Khi chuyển nhánh, Git cập nhật thư mục làm việc cho khớp với commit của nhánh đó. Nếu bạn có thay đổi chưa commit mà việc chuyển sẽ ghi đè, Git từ chối để bảo vệ bạn.

## Gộp nhánh: fast-forward

Nếu nhánh đích **chưa có commit mới** nào kể từ khi bạn tách nhánh, Git chỉ cần *dời con trỏ tới trước*: gọi là **fast-forward**, không tạo commit mới. Bài sau xem trường hợp hai nhánh cùng tiến.

![Gộp fast-forward: nhãn main dời tới commit của feature](/lessons/git-github/05-branches-ff-vi.svg)
*Không có commit gộp mới; main chỉ bước tới trước.*

## Đặt tên nhánh

Quy ước phổ biến: `feature/ten`, `fix/ten`, `docs/ten`. Dùng chữ thường, gạch nối, ngắn và nói rõ mục đích.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 3 "Git Branching": Branches in a Nutshell; Basic Branching and Merging.
- Git docs: `git-branch`, `git-switch`, `git-merge`.
- GitHub Docs, "About branches".
