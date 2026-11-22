# Rebase, stash và tag

## Rebase: lịch sử thẳng hàng

Gộp (`merge`) giữ nguyên lịch sử thật, có commit gộp. **Rebase** thì *phát lại* các commit của nhánh bạn lên đầu mới nhất của nhánh khác, tạo lịch sử **tuyến tính** gọn hơn:

```bash
git switch feature
git rebase main        # đặt các commit của feature lên trên main mới nhất
```

![So sánh merge và rebase của nhánh feature trên main](/lessons/git-github/12-rebase-stash-tags-rebase-vi.svg)
*Merge giữ hai nhánh và thêm commit gộp; rebase đặt commit feature thành chuỗi thẳng (mã băm mới).*

Vì mỗi commit được **tạo lại** (cha mới ⇒ mã băm mới), rebase **viết lại lịch sử**.

> **Quy tắc vàng của rebase** (*Pro Git*): **không rebase những commit đã push và người khác có thể đã dùng.** Rebase thoải mái cho nhánh *cục bộ* của riêng bạn.

Rebase cũng cho phép dọn dẹp: `git rebase -i HEAD~3` (interactive) để gộp, sửa, xoá, xếp lại vài commit trước khi mở PR. Khi có xung đột, giải từng commit rồi `git rebase --continue`; muốn thoát: `git rebase --abort`.

Chọn merge hay rebase là vấn đề quy ước nhóm; cả hai đều hợp lệ.

## Stash: cất việc dở

Đang sửa dở mà cần chuyển nhánh gấp? **Stash** cất thay đổi chưa commit vào một ngăn xếp:

```bash
git stash              # cất, thư mục sạch trở lại
git switch hotfix      # làm việc khác...
git switch feature
git stash pop          # lấy lại việc dở
git stash list
```

## Tag: đánh dấu phát hành

**Tag** là nhãn *cố định* gắn vào một commit (khác nhánh, nhánh sẽ tiến lên):

```bash
git tag v1.0.0                       # tag nhẹ
git tag -a v1.0.0 -m "Phat hanh 1.0" # tag chú thích (khuyên dùng cho phát hành)
git push origin v1.0.0               # tag không tự được push
```

Trên GitHub, tag trở thành **Release** với ghi chú và file đính kèm.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 3: Rebasing; chương 7: Stashing and Cleaning; chương 2: Tagging; Rewriting History.
- Git docs: `git-rebase`, `git-stash`, `git-tag`.
- GitHub Docs, "Managing releases in a repository".
