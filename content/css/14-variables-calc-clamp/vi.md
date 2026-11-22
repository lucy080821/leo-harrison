# Biến CSS, `calc()` và `clamp()`

## Biến CSS (custom properties)

Khai báo một lần, dùng khắp nơi. Đổi một chỗ, cả trang đổi theo.

```css
:root {                  /* :root = phần tử <html>, biến dùng được toàn trang */
  --brand: #0b6fd6;
  --radius: 8px;
  --space: 1rem;
}

.btn {
  background: var(--brand);
  border-radius: var(--radius);
  padding: var(--space);
}
```

- Tên biến **bắt đầu bằng `--`**, phân biệt hoa thường.
- Dùng bằng `var(--ten)`. Có thể kèm giá trị dự phòng: `var(--brand, blue)`.
- Biến **kế thừa** như thuộc tính thường, nên có thể ghi đè ở phạm vi nhỏ hơn:

```css
.card.danger { --brand: #d64545; }    /* mọi thứ trong .danger dùng màu mới */
```

### Chế độ tối chỉ với biến

```css
:root { --bg: #ffffff; --fg: #0b2540; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #07121f; --fg: #e4eefa; }
}
body { background: var(--bg); color: var(--fg); }
```

Chính trang web này dùng cách đó cho dark mode.

JavaScript cũng đọc và đổi được biến: `el.style.setProperty("--brand", "tomato")`.

![clamp(min, ưa thích, max) giữ cỡ chữ trong khoảng cho phép](/lessons/css/14-variables-calc-clamp-fig-vi.svg)
*clamp(min, ưa thích, max) giữ cỡ chữ trong khoảng cho phép*

## `calc()`: tính toán ngay trong CSS

Trộn được các đơn vị khác nhau:

```css
.sidebar { width: calc(100% - 240px); }
.btn     { padding: calc(var(--space) / 2) var(--space); }
```

Chú ý: toán tử `+` và `-` **phải có dấu cách hai bên**; `*` và `/` không bắt buộc.

## `min()`, `max()`, `clamp()`

| Hàm | Ý nghĩa |
|---|---|
| `min(a, b)` | Lấy giá trị **nhỏ hơn** |
| `max(a, b)` | Lấy giá trị **lớn hơn** |
| `clamp(nhỏ nhất, ưu tiên, lớn nhất)` | Giá trị ưu tiên, nhưng **kẹp** trong khoảng cho trước |

```css
.container { width: min(100% - 2rem, 960px); }      /* tối đa 960px */
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }         /* cỡ chữ co giãn mượt */
```

Với `clamp(1.5rem, 5vw, 3rem)`: cỡ chữ là `5vw`, nhưng không nhỏ hơn 1.5rem (24px) và không lớn hơn 3rem (48px). Về mặt toán, kết quả là

$$
\text{clamp}(a, x, b) = \max\big(a, \min(x, b)\big)
$$
