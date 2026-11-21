# Bộ chọn và màu sắc

**CSS** (Cascading Style Sheets) mô tả **cách hiển thị** của HTML: màu sắc, cỡ chữ, khoảng cách, bố cục.

## Cú pháp một quy tắc

```css
selector {
  property: value;
}
```

- **selector (bộ chọn)**: chọn phần tử nào sẽ được tạo kiểu.
- **property (thuộc tính)**: điều gì sẽ thay đổi, ví dụ `color`.
- **value (giá trị)**: thay đổi thành gì, ví dụ `tomato`.
- Mỗi khai báo kết thúc bằng dấu `;`.

## Ba bộ chọn cơ bản

| Bộ chọn | Ví dụ | Chọn |
|---|---|---|
| Thẻ | `p { }` | mọi thẻ `<p>` |
| Class | `.note { }` | mọi phần tử có `class="note"` |
| Id | `#title { }` | phần tử duy nhất có `id="title"` |

Quy ước: **id là duy nhất** trong một trang, còn class dùng lại được nhiều lần. Thông thường bạn sẽ dùng class nhiều nhất.

Khi nhiều quy tắc cùng nhắm vào một phần tử, **độ ưu tiên** là: id > class > thẻ. Nếu bằng nhau, quy tắc **viết sau** thắng.

## Cách khai báo màu

```css
color: red;                 /* tên màu */
color: #0b6fd6;             /* hex: đỏ-xanh lá-xanh dương */
color: rgb(11, 111, 214);   /* rgb */
color: hsl(210 90% 44%);    /* hsl: sắc độ, bão hoà, độ sáng */
background-color: #fef3c7;  /* màu nền */
```

## Một số thuộc tính văn bản hay dùng

```css
font-size: 18px;
font-weight: 700;       /* đậm */
text-align: center;
line-height: 1.6;       /* giãn dòng */
```

## Liên kết CSS với HTML

Trong khung bên phải, file `style.css` được tự động áp dụng. Khi làm web thật bạn thêm vào `<head>`:

```html
<link rel="stylesheet" href="style.css" />
```
