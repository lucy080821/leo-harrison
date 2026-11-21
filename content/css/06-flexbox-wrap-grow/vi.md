# Flexbox (2): wrap, gap và flex-grow

## Xuống hàng và khoảng cách

Mặc định flex item **không xuống hàng**, chúng co lại để vừa một dòng. Bật xuống hàng bằng `flex-wrap`:

```css
.tags {
  display: flex;
  flex-wrap: wrap;   /* hết chỗ thì xuống dòng */
  gap: 8px;          /* khoảng cách giữa các item (cả hàng lẫn cột) */
}
```

`gap` thay thế cho việc đặt `margin` lên từng item: gọn và không bị lẻ lề ở rìa.

## Các thuộc tính trên flex item

```css
.item { flex: 1; }
```

`flex` là viết gọn của ba giá trị: `flex-grow flex-shrink flex-basis`.

| Thuộc tính | Ý nghĩa |
|---|---|
| `flex-grow` | Hệ số **giãn ra** để chiếm phần trống (0 = không giãn) |
| `flex-shrink` | Hệ số **co lại** khi thiếu chỗ (0 = không co) |
| `flex-basis` | Kích thước **ban đầu** trước khi giãn/co |

Các cách viết hay gặp:

| Viết | Nghĩa |
|---|---|
| `flex: 1` | Giãn đều chiếm phần trống (`1 1 0`) |
| `flex: 0 0 140px` | **Đúng** 140px, không giãn không co |
| `flex: 2` | Chiếm phần trống gấp **đôi** item có `flex: 1` |

## Mẫu bố cục: sidebar + nội dung

```css
.layout   { display: flex; gap: 12px; }
.sidebar  { flex: 0 0 140px; }   /* cột cố định */
.content  { flex: 1; }           /* cột co giãn */
```

## Thứ tự và căn riêng

```css
.item { order: -1; }            /* đưa lên đầu (mặc định 0) */
.item { align-self: flex-end; } /* ghi đè align-items cho một item */
```

> `order` chỉ đổi thứ tự **nhìn thấy**, không đổi thứ tự trong HTML. Người dùng bàn phím và trình đọc màn hình vẫn đi theo thứ tự HTML, nên đừng lạm dụng.
