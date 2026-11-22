# CSS Grid (1): hàng, cột và fr

**CSS Grid** là hệ thống bố cục **hai chiều**: điều khiển cả **hàng và cột** cùng lúc. Flexbox xếp theo một chiều; Grid dựng cả "tấm lưới".

## Bật grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 3 cột bằng nhau */
  gap: 12px;                            /* khoảng cách hàng và cột */
}
```

Các con trực tiếp tự lấp vào các ô lưới theo thứ tự, hết một hàng thì xuống hàng kế.

![Grid 3 cột với 1fr 2fr 1fr](/lessons/css/07-grid-basics-fig-vi.svg)
*Grid 3 cột với 1fr 2fr 1fr*

## Đơn vị `fr`

`fr` (fraction) là **một phần của không gian còn trống**.

```css
grid-template-columns: 1fr 2fr;        /* cột 2 rộng gấp đôi cột 1 */
grid-template-columns: 200px 1fr;      /* cột cố định + cột co giãn */
grid-template-columns: repeat(3, 1fr); /* viết gọn của 1fr 1fr 1fr */
```

Nếu tổng bề ngang là $W$, các cột $1\text{fr}\ 2\text{fr}$ lần lượt chiếm $\dfrac{W}{3}$ và $\dfrac{2W}{3}$ (trừ phần `gap`).

## Hàng

```css
grid-template-rows: 80px auto 60px;  /* hàng cao cố định, tự co, cố định */
grid-auto-rows: minmax(80px, auto);  /* chiều cao các hàng tạo thêm tự động */
```

## Một ô trải nhiều ô

```css
.wide  { grid-column: span 2; }   /* trải 2 cột */
.tall  { grid-row: span 2; }      /* trải 2 hàng */
.hero  { grid-column: 1 / -1; }   /* từ đường kẻ đầu tới đường kẻ cuối: cả hàng */
```

Số `1 / 3` nghĩa là bắt đầu ở **đường kẻ** (grid line) số 1 và kết thúc ở đường kẻ số 3. Đường kẻ đánh số từ 1, và `-1` là đường kẻ cuối cùng.

## Canh trong lưới

```css
.grid { justify-items: center; align-items: center; }  /* căn nội dung trong từng ô */
.grid { justify-content: center; }                      /* căn cả lưới trong khung chứa */
```

## Flexbox hay Grid?

| Dùng | Khi |
|---|---|
| **Flexbox** | Một chiều: thanh menu, nhóm nút, căn giữa |
| **Grid** | Hai chiều: bố cục trang, lưới thẻ, thư viện ảnh |

Hai cái kết hợp được: grid cho khung trang, flex cho nội dung bên trong từng ô.
