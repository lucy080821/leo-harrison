# display và position

## display

`display` quyết định phần tử **xếp thế nào** trong luồng trang.

| Giá trị | Hành vi |
|---|---|
| `block` | Chiếm hết bề ngang, xuống dòng mới (`div`, `p`) |
| `inline` | Nằm trong dòng chữ; **không** nhận `width`/`height` (`span`, `a`) |
| `inline-block` | Nằm trong dòng nhưng nhận `width`/`height`, `padding` đủ cả 4 phía |
| `none` | **Ẩn hoàn toàn**, không chiếm chỗ |
| `flex`, `grid` | Bố cục hiện đại (bài sau) |

`display: none` khác `visibility: hidden`: cái sau ẩn nhưng **vẫn chiếm chỗ**.

![position: absolute định vị theo tổ tiên có position](/lessons/css/04-display-position-fig-vi.svg)
*position: absolute định vị theo tổ tiên có position*

## position

| Giá trị | Ý nghĩa |
|---|---|
| `static` | Mặc định, theo luồng bình thường |
| `relative` | Theo luồng, nhưng có thể dịch bằng `top/left...`; và là **mốc** cho con `absolute` |
| `absolute` | **Thoát khỏi luồng**, định vị so với tổ tiên gần nhất có `position` khác `static` |
| `fixed` | Cố định so với **cửa sổ**, không đổi khi cuộn |
| `sticky` | Như `relative` cho đến khi cuộn tới ngưỡng `top`, rồi "dính" lại |

```css
.card  { position: relative; }
.badge { position: absolute; top: 8px; right: 8px; }  /* góc trên phải của .card */

.nav   { position: sticky; top: 0; z-index: 10; }      /* dính đầu trang */
```

> Mẹo nhớ: muốn đặt con `absolute` đúng chỗ trong cha, hãy cho **cha `position: relative`**. Nếu quên, con sẽ định vị theo cả trang.

## z-index: thứ tự chồng lớp

Phần tử có `position` khác `static` có thể chồng lên nhau; `z-index` lớn hơn thì nằm trên.

```css
.modal-overlay { position: fixed; inset: 0; z-index: 100; }
```

`inset: 0` là viết gọn của `top: 0; right: 0; bottom: 0; left: 0`.
