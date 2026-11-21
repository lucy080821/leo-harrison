# Hoạt ảnh với `@keyframes`

`transition` chỉ đi từ trạng thái A sang B khi có sự kiện. **Animation** cho phép bạn viết cả **kịch bản nhiều bước**, tự chạy và lặp lại.

## Hai bước

**1. Định nghĩa kịch bản bằng `@keyframes`:**

```css
@keyframes pulse {
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.4); opacity: 0.6; }
  100% { transform: scale(1);   opacity: 1; }
}
```

Phần trăm là **tiến độ** của một lượt chạy. Hai mốc đặc biệt: `from` (= `0%`) và `to` (= `100%`).

**2. Gắn vào phần tử bằng `animation`:**

```css
.dot { animation: pulse 1.5s ease-in-out infinite; }
```

## Các thuộc tính animation

| Thuộc tính | Ý nghĩa |
|---|---|
| `animation-name` | Tên `@keyframes` |
| `animation-duration` | Thời lượng một lượt (`1.5s`, `300ms`) |
| `animation-timing-function` | Đường cong tốc độ (`ease`, `linear`...) |
| `animation-delay` | Chờ trước khi bắt đầu |
| `animation-iteration-count` | Số lần lặp, hoặc `infinite` |
| `animation-direction` | `normal`, `reverse`, `alternate` (đi rồi về), `alternate-reverse` |
| `animation-fill-mode` | `forwards` giữ trạng thái cuối, `backwards` áp trạng thái đầu trong lúc chờ |
| `animation-play-state` | `running` hoặc `paused` |

Viết gọn: `animation: <tên> <thời lượng> <hàm> <trễ> <lặp> <hướng> <fill>`.

## Ví dụ: vòng quay tải trang (spinner)

```css
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  width: 32px; height: 32px;
  border: 4px solid #dcebfb;
  border-top-color: #0b6fd6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

Chỉ cần mốc `to` vì khi thiếu mốc `from`, trình duyệt lấy giá trị hiện tại của phần tử.

## Khi nào dùng animation, khi nào dùng transition?

| | transition | animation |
|---|---|---|
| Kích hoạt | Khi thuộc tính đổi (hover, class) | Tự chạy khi phần tử xuất hiện |
| Số bước | Hai (đầu → cuối) | Nhiều bước |
| Lặp | Không | Có |

> Với người dùng nhạy cảm với chuyển động, hãy tắt animation lớn trong `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`.
