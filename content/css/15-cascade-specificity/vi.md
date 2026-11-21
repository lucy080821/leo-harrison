# Cascade, độ ưu tiên và kế thừa

Khi **nhiều quy tắc** cùng nhắm vào một phần tử và đặt **giá trị khác nhau** cho cùng thuộc tính, ai thắng? Đó là **cascade** ("thác nước"), chữ C trong CSS.

## Thứ tự ưu tiên

Trình duyệt xét lần lượt:

1. **Nguồn gốc và `!important`**: khai báo có `!important` thắng khai báo thường.
2. **Độ cụ thể (specificity)** của bộ chọn: cụ thể hơn thì thắng.
3. **Thứ tự xuất hiện**: bằng nhau thì quy tắc **viết sau** thắng.

## Độ cụ thể (specificity)

Mỗi bộ chọn được chấm điểm theo ba cột `(id, class, thẻ)`:

| Bộ chọn | Điểm |
|---|---|
| `p` | (0, 0, 1) |
| `.title` | (0, 1, 0) |
| `p.title` | (0, 1, 1) |
| `#heading` | (1, 0, 0) |
| `#nav .item a` | (1, 1, 1) |
| style trực tiếp `style="..."` | thắng mọi thứ ở trên |

So sánh **từ trái sang phải** từng cột: `(1,0,0)` thắng `(0,5,9)`, vì một id mạnh hơn mọi số lượng class.

> Đây là lý do trong bài tập, `#heading` (id) thắng `.title` (class) dù `.title` viết sau.

Bộ chọn `*` và các combinator (`>`, `+`) **không** cộng điểm; `:where()` có điểm 0; `:not()`, `:is()` lấy điểm của đối số mạnh nhất.

## `!important`: lựa chọn cuối cùng

```css
.title { color: red !important; }
```

Nó đè gần như mọi thứ, và **chỉ còn cách `!important` khác** mới thắng nổi, dẫn tới "cuộc chạy đua vũ trang". Chỉ dùng khi ghi đè CSS thư viện bên ngoài. Thay vào đó hãy:

- Giữ bộ chọn **đơn giản, ít cụ thể** (ưu tiên class, tránh id để tạo kiểu).
- Sắp xếp quy tắc **từ tổng quát đến cụ thể**.

## Kế thừa (inheritance)

Một số thuộc tính **tự truyền xuống** phần tử con nếu con không tự đặt:

| Kế thừa | Không kế thừa |
|---|---|
| `color`, `font-family`, `font-size`, `line-height`, `text-align`, `visibility` | `margin`, `padding`, `border`, `background`, `width`, `display` |

Nhờ vậy bạn đặt phông chữ và màu chữ **một lần trên `body`** là cả trang dùng:

```css
body { font-family: system-ui, sans-serif; color: #0b2540; }
```

Ép kế thừa hoặc đặt lại bằng từ khoá:

```css
a { color: inherit; }     /* lấy từ phần tử cha */
.x { all: unset; }        /* xoá mọi kiểu */
.y { color: initial; }    /* về giá trị mặc định của CSS */
```

## Mẹo gỡ lỗi

Mở **DevTools** (F12), chọn phần tử, và xem các khai báo bị **gạch ngang**: đó là những khai báo đã thua trong cascade.
