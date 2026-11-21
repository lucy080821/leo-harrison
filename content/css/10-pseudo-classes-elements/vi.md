# Pseudo-class, pseudo-element và combinator

## Pseudo-class: chọn theo **trạng thái**

Viết với **một** dấu hai chấm `:`.

| Pseudo-class | Chọn khi |
|---|---|
| `:hover` | Rê chuột lên |
| `:focus` | Phần tử đang được focus (bàn phím/ nhấp) |
| `:focus-visible` | Focus bằng bàn phím (nên dùng cho vòng focus) |
| `:active` | Đang được nhấn |
| `:disabled`, `:checked`, `:required` | Trạng thái của form |
| `:first-child`, `:last-child` | Con đầu, con cuối |
| `:nth-child(n)` | Con thứ n: `2`, `odd`, `even`, `3n`, `3n+1` |
| `:not(.x)` | Phần tử **không** khớp bộ chọn |

```css
.btn:hover { background: #0aa5b8; }
li:nth-child(even) { background: #eaf2fb; }   /* sọc xen kẽ */
a:not(.btn) { text-decoration: underline; }
```

## Pseudo-element: chọn **một phần** của phần tử

Viết với **hai** dấu hai chấm `::`.

| Pseudo-element | Chọn |
|---|---|
| `::before`, `::after` | Chèn nội dung ảo trước hoặc sau nội dung |
| `::first-letter`, `::first-line` | Chữ cái / dòng đầu |
| `::placeholder` | Chữ gợi ý trong ô nhập |
| `::selection` | Phần chữ đang bôi đen |

```css
.new::before { content: "★ "; color: gold; }
```

`::before` và `::after` **chỉ hoạt động khi có thuộc tính `content`** (có thể là chuỗi rỗng `""`). Nội dung này nằm trong CSS, không phải trong HTML, nên chỉ nên dùng cho **trang trí**, không dùng cho thông tin quan trọng.

## Combinator: chọn theo **quan hệ**

| Cú pháp | Tên | Chọn |
|---|---|---|
| `A B` | Hậu duệ | Mọi `B` nằm bên trong `A` (ở bất kỳ cấp nào) |
| `A > B` | Con trực tiếp | `B` là con ngay dưới `A` |
| `A + B` | Anh em kế tiếp | `B` đứng **ngay sau** `A` |
| `A ~ B` | Anh em chung | Mọi `B` đứng sau `A` cùng cha |

```css
nav a { color: white; }              /* mọi <a> trong nav */
ul > li { margin: 4px 0; }           /* chỉ li con trực tiếp */
h2 + p { font-size: 1.1rem; }        /* đoạn văn ngay sau h2 */
```

Gộp nhiều bộ chọn một quy tắc bằng dấu phẩy: `h1, h2, h3 { font-weight: 700; }`.
