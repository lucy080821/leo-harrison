# Dự án: Ứng dụng Todo

Bạn sẽ dựng ứng dụng **danh sách việc cần làm** hoàn chỉnh chỉ bằng HTML, CSS và JavaScript: thêm việc, đánh dấu hoàn thành, xoá việc. Đây là dự án kinh điển vì nó gói đủ các kỹ năng DOM.

## Phân tích yêu cầu

| Tính năng | Kỹ thuật |
|---|---|
| Thêm việc khi gửi form | `submit` + `preventDefault` + `createElement` |
| Bỏ qua việc rỗng | `trim()` và `if (!text) return` |
| Đánh dấu hoàn thành | `classList.toggle("done")` (CSS gạch ngang chữ) |
| Xoá việc | `element.remove()` |
| Hoạt động với việc thêm sau này | **Ủy quyền sự kiện** trên `<ul>` |

## Cấu trúc HTML mỗi việc

```html
<li>
  <span class="text">Học JS</span>
  <button class="del">×</button>
</li>
```

## Quy trình làm

1. **Dựng giao diện tĩnh** trong HTML/CSS (đã có sẵn).
2. Viết hàm `addTodo(text)` tạo `<li>` và gắn vào danh sách.
3. Bắt sự kiện `submit` của form, đọc `input.value`, gọi `addTodo`, xoá ô nhập.
4. Thêm **một** handler `click` trên `<ul>`, dùng `event.target.closest("li")` để biết bấm vào việc nào.
5. Kiểm tra từng chức năng trước khi sang bước kế.

## Gợi ý mở rộng (tự làm thêm)

- **Lưu vào `localStorage`** để tải lại trang không mất việc (xem bài JSON và lưu trữ): lưu mảng `[{ text, done }]` bằng `JSON.stringify`.
- Đếm số việc còn lại: "3 việc chưa xong".
- Bộ lọc: Tất cả / Đang làm / Đã xong.
- Sửa nội dung việc bằng nhấp đúp.
- Tách **dữ liệu** (mảng) khỏi **hiển thị**: có mảng `todos` và hàm `render()` vẽ lại danh sách mỗi khi dữ liệu đổi. Đây chính là ý tưởng nền của React.

## Điều cần rút ra

> Ứng dụng giao diện thường là vòng lặp: **sự kiện → đổi dữ liệu/trạng thái → cập nhật giao diện**. Giữ vòng lặp này rõ ràng, code sẽ gọn dù ứng dụng lớn lên.
