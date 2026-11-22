# Thiết kế responsive

**Responsive** nghĩa là một trang web **tự thích nghi** với mọi kích thước màn hình: điện thoại, máy tính bảng, laptop, màn hình lớn.

## Bước 1: thẻ viewport

Không có thẻ này, điện thoại sẽ giả vờ màn hình rộng ~980px rồi thu nhỏ cả trang lại.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

![Bố cục thích ứng theo điểm ngắt: điện thoại, máy tính bảng, máy tính](/lessons/css/13-responsive-design-fig-vi.svg)
*Bố cục thích ứng theo điểm ngắt: điện thoại, máy tính bảng, máy tính*

## Bước 2: đơn vị và ảnh linh hoạt

```css
img { max-width: 100%; height: auto; }   /* ảnh không bao giờ tràn khung, giữ tỉ lệ */
.container { width: min(100% - 2rem, 960px); margin-inline: auto; }
```

Dùng `%`, `fr`, `rem`, `flex`, `grid` thay vì `px` cứng cho kích thước bố cục.

## Bước 3: media query

Media query áp dụng CSS **chỉ khi** điều kiện đúng:

```css
@media (max-width: 600px) {
  .container { flex-direction: column; }
}
```

| Điều kiện | Nghĩa |
|---|---|
| `(max-width: 600px)` | Khung nhìn rộng **≤ 600px** |
| `(min-width: 768px)` | Khung nhìn rộng **≥ 768px** |
| `(min-width: 600px) and (max-width: 900px)` | Trong khoảng |
| `(prefers-color-scheme: dark)` | Người dùng chọn chế độ tối |
| `(prefers-reduced-motion: reduce)` | Người dùng muốn giảm chuyển động |
| `print` | Khi in |

## Mobile-first

Viết CSS cho **màn hình nhỏ trước** (không cần media query), rồi dùng `min-width` để bổ sung cho màn lớn:

```css
.container { display: flex; flex-direction: column; }   /* điện thoại */

@media (min-width: 600px) {
  .container { flex-direction: row; }                   /* màn hình rộng hơn */
}
```

Lý do: mã đơn giản hơn, tải nhẹ hơn cho điện thoại và buộc bạn tập trung vào nội dung cốt lõi.

## Các điểm ngắt (breakpoint) thường gặp

| Tên | Chiều rộng |
|---|---|
| Điện thoại | < 600px |
| Máy tính bảng | ≥ 600px |
| Laptop | ≥ 900px |
| Màn hình lớn | ≥ 1200px |

Đừng bám vào tên thiết bị; hãy kéo hẹp cửa sổ và **thêm điểm ngắt chỗ nào bố cục bắt đầu xấu**.

## Công cụ hay: `clamp()`

Cỡ chữ co giãn mượt không cần media query (sẽ học kỹ ở bài sau):

```css
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }
```
