# Đồng bộ: fetch, pull, push

## Nhánh theo dõi từ xa

Sau khi `clone` hoặc `fetch`, máy bạn có thêm các nhánh chỉ-đọc như **`origin/main`**: ảnh chụp *lần cuối bạn thấy* nhánh `main` trên remote. Chúng chỉ cập nhật khi bạn nói chuyện với server. `main` (của bạn) và `origin/main` có thể lệch nhau.

![Hai nhánh main (cục bộ) và origin/main (từ xa) lệch nhau, push/pull đưa chúng về khớp](/lessons/git-github/08-sync-fetch-pull-push-sync-vi.svg)
*fetch cập nhật origin/main; pull gộp nó vào main; push đẩy main lên.*

## Ba lệnh

| Lệnh | Làm gì |
|---|---|
| `git fetch` | tải commit mới về, **cập nhật `origin/main`**, KHÔNG đụng nhánh của bạn |
| `git merge origin/main` | gộp thay đổi đã tải vào nhánh hiện tại |
| `git pull` | = `fetch` + `merge` (hoặc `rebase` nếu cấu hình) |
| `git push` | đẩy commit của bạn lên remote |

Thói quen an toàn: `git fetch` trước để *xem* người khác làm gì (`git log main..origin/main`), rồi mới gộp.

## Vì sao push bị từ chối?

Nếu remote đã có commit mà bạn **chưa có**, `git push` bị từ chối (*non-fast-forward*): Git không cho ghi đè công sức người khác. Cách xử lý: `git pull` (gộp, giải xung đột nếu có) rồi `git push` lại.

> **Đừng dùng** `git push --force` trên nhánh chung. Nếu bắt buộc, dùng `--force-with-lease`, an toàn hơn vì từ chối nếu có commit mới bạn chưa thấy.

## Quy trình mỗi ngày

```bash
git switch main
git pull                      # cập nhật
git switch -c feature/abc     # làm việc trên nhánh riêng
# ... sửa, add, commit ...
git push -u origin feature/abc
```

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- *Pro Git*, chương 2: Working with Remotes; chương 3: Remote Branches.
- Git docs: `git-fetch`, `git-pull`, `git-push`.
- GitHub Docs, "Getting changes from a remote repository" và "About remote repositories".
