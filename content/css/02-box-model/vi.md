# Mô hình hộp (Box Model)

Với CSS, **mọi phần tử đều là một chiếc hộp** hình chữ nhật gồm 4 lớp, từ trong ra ngoài:

```text
┌──────────────── margin ────────────────┐
│  ┌──────────── border ──────────────┐  │
│  │  ┌──────── padding ──────────┐   │  │
│  │  │        content            │   │  │
│  │  └───────────────────────────┘   │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

| Lớp | Ý nghĩa |
|---|---|
| **content** | Nội dung thật (chữ, ảnh); kích thước đặt bằng `width`, `height` |
| **padding** | Khoảng đệm **bên trong** viền, quanh nội dung |
| **border** | Đường viền |
| **margin** | Khoảng cách **bên ngoài** viền, đẩy các phần tử khác ra xa |

## Viết gọn

```css
padding: 20px;             /* cả 4 cạnh */
padding: 10px 20px;        /* trên-dưới 10, trái-phải 20 */
padding: 5px 10px 15px 20px; /* trên, phải, dưới, trái (theo chiều kim đồng hồ) */

border: 2px solid #0b6fd6; /* độ dày, kiểu, màu */
margin: 16px auto;         /* auto ở trái-phải giúp canh giữa khối có width */
```

## Vấn đề kích thước và `box-sizing`

Mặc định (`content-box`), `width` chỉ tính phần **content**. Khi đó:

$$
W = w + 2p + 2b
$$

Trong đó $W$ là tổng chiều rộng hiển thị, $w$ là `width`, $p$ là `padding` một bên, $b$ là độ dày `border` một bên.

Ví dụ `width: 300px; padding: 20px; border: 2px` cho tổng **344px**, và hộp dễ bị tràn khỏi cột của bạn.

Cách khắc phục được dùng gần như trong mọi dự án:

```css
* {
  box-sizing: border-box; /* width đã bao gồm cả padding và border */
}
```

Với `border-box`, `width: 300px` nghĩa là hộp rộng **đúng 300px** dù bạn thêm padding hay border.
