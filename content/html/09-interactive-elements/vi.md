# Phần tử tương tác có sẵn

HTML5 có vài phần tử tương tác **không cần JavaScript**.

## details và summary: khối thu gọn

```html
<details>
  <summary>Chính sách đổi trả</summary>
  <p>Đổi trong vòng 7 ngày kể từ ngày mua.</p>
</details>
```

- `<summary>` là dòng tiêu đề luôn hiện; bấm vào để mở hoặc đóng phần còn lại.
- Thêm `open` để mở sẵn: `<details open>`.
- Rất hợp làm **FAQ** (câu hỏi thường gặp).

![details/summary: trạng thái đóng và mở](/lessons/html/09-interactive-elements-fig-vi.svg)
*details/summary: trạng thái đóng và mở*

## dialog: hộp thoại

```html
<dialog open>
  <p>Bạn có chắc muốn xoá?</p>
  <form method="dialog">
    <button>Huỷ</button>
    <button>Xoá</button>
  </form>
</dialog>
```

Thuộc tính `open` hiện hộp thoại. Trong thực tế bạn thường mở bằng JavaScript: `dialog.showModal()` (hộp thoại chặn nội dung phía sau) và đóng bằng `dialog.close()`. `<form method="dialog">` tự đóng hộp thoại khi bấm nút.

## progress: tiến trình

```html
<progress value="40" max="100">40%</progress>
```

Dùng cho một công việc đang tiến triển (đang tải, các bước đăng ký). Bỏ `value` thì thành thanh "đang chạy" không rõ độ dài.

## meter: giá trị trong một khoảng

```html
<meter min="0" max="100" low="30" high="80" optimum="90" value="75">75%</meter>
```

Dùng cho **số đo** (dung lượng ổ đĩa, điểm số), không phải tiến trình.

| | `progress` | `meter` |
|---|---|---|
| Ý nghĩa | Công việc đang hoàn thành | Giá trị đo được |
| Ví dụ | Đang tải 40% | Pin còn 75% |

Chữ nằm bên trong là nội dung dự phòng cho trình duyệt cũ.
