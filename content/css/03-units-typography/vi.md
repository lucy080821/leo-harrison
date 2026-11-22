# Đơn vị và chữ (Typography)

## Các đơn vị độ dài

| Đơn vị | Loại | Ý nghĩa |
|---|---|---|
| `px` | Tuyệt đối | Điểm ảnh; đơn giản nhưng **không co giãn** theo cài đặt của người dùng |
| `rem` | Tương đối | Bội số của cỡ chữ **gốc** (`<html>`, thường 16px). `1.5rem` = 24px |
| `em` | Tương đối | Bội số của cỡ chữ **phần tử cha/ chính nó** |
| `%` | Tương đối | Phần trăm của giá trị tương ứng ở phần tử cha |
| `vw`, `vh` | Tương đối | 1% chiều rộng, chiều cao của **khung nhìn** |
| `ch` | Tương đối | Chiều rộng ký tự "0" — rất hợp để giới hạn độ dài dòng |

**Lời khuyên:** dùng `rem` cho cỡ chữ và khoảng cách (tôn trọng cài đặt cỡ chữ của người dùng), `px` cho chi tiết nhỏ như viền 1px, `%`/`fr` cho bố cục.

Công thức đổi: $\text{rem} = \dfrac{\text{px}}{16}$, ví dụ $20 \div 16 = 1.25$rem.

![So sánh đơn vị: px cố định, rem theo cỡ gốc](/lessons/css/03-units-typography-fig-vi.svg)
*So sánh đơn vị: px cố định, rem theo cỡ gốc*

## Thuộc tính chữ thường dùng

```css
body {
  font-family: "Segoe UI", Roboto, Arial, sans-serif;  /* danh sách ưu tiên */
  font-size: 1rem;
  font-weight: 400;        /* 400 thường, 700 đậm */
  line-height: 1.6;        /* giãn dòng, KHÔNG đơn vị */
  letter-spacing: 0.02em;
  text-align: left;        /* left | center | right | justify */
  text-transform: uppercase;
  text-decoration: underline;
}
```

### Họ phông dự phòng (fallback)

Trình duyệt thử từng phông từ trái sang phải; luôn kết thúc bằng một họ **generic**: `serif`, `sans-serif`, `monospace`. Tên phông có dấu cách phải để trong dấu nháy: `"Segoe UI"`.

### line-height không đơn vị

`line-height: 1.6` nghĩa là **1.6 × cỡ chữ của chính phần tử**, và con cháu sẽ tính lại theo cỡ chữ của chúng. Văn bản dài dễ đọc nhất ở khoảng **1.5–1.8**.

### Độ dài dòng

Dòng quá dài khó đọc. Giới hạn bằng `max-width: 60ch;` (khoảng 60 ký tự).
