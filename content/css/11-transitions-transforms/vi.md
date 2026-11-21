# Transition và Transform

## Transform: biến đổi hình dạng

`transform` dịch chuyển, xoay, co giãn phần tử mà **không làm xê dịch** các phần tử khác (nó không ảnh hưởng đến bố cục).

```css
.box {
  transform: translate(20px, -10px);  /* dịch ngang 20, dọc -10 */
  transform: scale(1.2);              /* phóng 120% */
  transform: rotate(45deg);           /* xoay 45° theo chiều kim đồng hồ */
  transform: skewX(10deg);            /* nghiêng */
  transform: translateY(-4px) scale(1.05) rotate(5deg); /* kết hợp, áp từ trái sang phải */
}
```

- `transform-origin` đổi điểm gốc của phép biến đổi (mặc định là tâm): `transform-origin: top left;`.
- Xoay theo hướng ngược lại dùng số âm: `rotate(-15deg)`.

Một phép xoay góc $\theta$ biến điểm $(x, y)$ thành

$$
x' = x\cos\theta - y\sin\theta,\qquad y' = x\sin\theta + y\cos\theta
$$

## Transition: chuyển động mượt

Khi một thuộc tính **đổi giá trị** (ví dụ khi `:hover`), `transition` làm nó đổi từ từ thay vì nhảy ngay.

```css
.btn {
  background: #0b6fd6;
  transition: background-color 0.3s ease, transform 0.2s ease-out;
}
.btn:hover {
  background: #0aa5b8;
  transform: translateY(-2px);
}
```

Cú pháp: `transition: <thuộc tính> <thời lượng> <hàm thời gian> <độ trễ>`.

| Hàm thời gian | Cảm giác |
|---|---|
| `ease` | Nhanh ở giữa, chậm ở hai đầu (mặc định) |
| `linear` | Đều |
| `ease-in` / `ease-out` | Chậm ở đầu / chậm ở cuối |
| `cubic-bezier(...)` | Tuỳ chỉnh đường cong |

**Quan trọng:** đặt `transition` trên trạng thái **gốc** (`.btn`), không chỉ trên `:hover`, để hiệu ứng chạy cả khi rê chuột **ra**.

## Hiệu năng

Nên animate `transform` và `opacity`: trình duyệt xử lý bằng GPU nên rất mượt. Tránh animate `width`, `height`, `top`, `left` vì buộc trình duyệt tính lại bố cục mỗi khung hình.

> Tôn trọng người dùng bị chóng mặt vì chuyển động: bọc hiệu ứng lớn trong `@media (prefers-reduced-motion: no-preference) { ... }`.
