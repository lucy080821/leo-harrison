# CSS Grid (2): vùng và lưới tự co giãn

## Đặt tên vùng với `grid-template-areas`

Cách trực quan nhất để dựng **bố cục trang**: bạn "vẽ" bố cục bằng chữ.

```css
.page {
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

Mỗi chuỗi trong `grid-template-areas` là **một hàng**, mỗi từ là **một cột**. Từ lặp lại (`header header`) nghĩa là vùng đó **trải qua nhiều ô**. Dấu chấm `.` đại diện ô trống.

Để đổi bố cục khi màn hình nhỏ, bạn chỉ cần viết lại chuỗi này trong media query:

```css
@media (max-width: 600px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main" "sidebar" "footer";
  }
}
```

![grid-template-areas mô tả bố cục bằng tên vùng](/lessons/css/08-grid-areas-auto-fit-fig-vi.svg)
*grid-template-areas mô tả bố cục bằng tên vùng*

## Lưới tự co giãn: `auto-fit` và `minmax()`

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}
```

- `minmax(150px, 1fr)`: mỗi cột **ít nhất 150px**, nhiều nhất là một phần đều của không gian còn trống.
- `auto-fit`: tự tính **số cột vừa khít** trong chiều rộng hiện có.

Với bề rộng $W$, khoảng cách $g$ và cột tối thiểu $m$, số cột xấp xỉ

$$
n = \left\lfloor \frac{W + g}{m + g} \right\rfloor
$$

Ví dụ $W = 560$, $g = 12$, $m = 150$ cho $n = \lfloor 572/162 \rfloor = 3$ cột. Thu nhỏ cửa sổ thì $n$ giảm, **không cần media query**.

### `auto-fit` và `auto-fill`

- `auto-fill`: tạo càng nhiều cột càng tốt, kể cả cột **trống**.
- `auto-fit`: giống `auto-fill` nhưng **thu cột trống lại** để các cột có nội dung giãn ra lấp chỗ. Thường là lựa chọn bạn muốn.

## Căn từng ô

```css
.item { justify-self: end; align-self: center; }
```
