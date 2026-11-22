# Gộp nhánh và giải quyết xung đột

## Gộp ba bên (three-way merge)

Khi **cả hai nhánh đều có commit mới** từ điểm tách chung, Git không thể chỉ dời con trỏ. Nó tìm **tổ tiên chung** của hai đầu nhánh rồi so sánh *ba ảnh chụp*: tổ tiên chung (base), nhánh của bạn, nhánh kia. Với mỗi file:

- Chỉ một bên đổi → lấy bên đã đổi.
- Hai bên đổi *cùng kết quả* → lấy kết quả đó.
- Hai bên đổi *khác nhau cùng chỗ* → **xung đột**.

Nếu gộp thành công, Git tạo **commit gộp (merge commit)** có **hai commit cha**.

![Gộp ba bên: hai nhánh phân kỳ rồi gộp thành commit có hai cha](/lessons/git-github/06-merge-conflicts-merge-vi.svg)
*Commit gộp M có hai cha: đầu của main và đầu của feature.*

## Xung đột

Xung đột không phải lỗi: Git chỉ không đoán được bạn muốn gì. Nó đánh dấu trong file:

```text
<<<<<<< HEAD
pho bo
=======
pho chay
>>>>>>> vegan
```

Phần giữa `<<<<<<<` và `=======` là phiên bản của bạn (HEAD), phần còn lại là của nhánh kia.

### Quy trình giải quyết

1. `git status` xem file nào xung đột ("unmerged").
2. Mở file, **sửa thành nội dung đúng** (giữ bên này, bên kia, hoặc kết hợp), **xoá hết các dấu** `<<<<<<<`, `=======`, `>>>>>>>`.
3. `git add <file>` để báo đã giải xong.
4. `git commit` hoàn tất commit gộp.

Muốn bỏ cuộc gộp: `git merge --abort`.

## Giảm xung đột

- Nhánh sống ngắn, gộp thường xuyên.
- Cập nhật nhánh từ `main` hay (`git merge main`).
- Chia việc để mỗi người sửa file khác nhau; giao tiếp khi cùng sửa một chỗ.

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 3: Basic Merging; Basic Merge Conflicts.
- Git docs: `git-merge` (mục How conflicts are presented).
- GitHub Docs, "Resolving a merge conflict using the command line".
