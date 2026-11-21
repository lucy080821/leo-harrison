# Hình ảnh, âm thanh và video

## Hình ảnh nâng cao

```html
<img src="meo.jpg" alt="Chú mèo ngủ" width="400" height="300" loading="lazy" />
```

- `width` và `height` giúp trình duyệt dành sẵn chỗ, tránh trang bị "nhảy" khi ảnh tải xong.
- `loading="lazy"`: chỉ tải ảnh khi người dùng cuộn tới gần.
- `alt` luôn cần; ảnh trang trí thuần tuý dùng `alt=""` (rỗng) để trình đọc màn hình bỏ qua.

## figure và figcaption

Dùng khi ảnh (hoặc biểu đồ, đoạn code) có **chú thích**:

```html
<figure>
  <img src="map.png" alt="Bản đồ khu vực" />
  <figcaption>Hình 2: Bản đồ khu vực</figcaption>
</figure>
```

## picture: ảnh theo kích thước màn hình

```html
<picture>
  <source media="(min-width: 800px)" srcset="lon.jpg" />
  <source media="(min-width: 400px)" srcset="vua.jpg" />
  <img src="nho.jpg" alt="Phong cảnh" />
</picture>
```

Trình duyệt chọn `<source>` đầu tiên khớp; `<img>` là phương án cuối và là phần bắt buộc.

## Âm thanh và video

```html
<audio controls>
  <source src="nhac.mp3" type="audio/mpeg" />
  <source src="nhac.ogg" type="audio/ogg" />
  Trình duyệt của bạn không hỗ trợ audio.
</audio>

<video controls width="480" poster="bia.jpg">
  <source src="phim.mp4" type="video/mp4" />
  Trình duyệt của bạn không hỗ trợ video.
</video>
```

| Thuộc tính | Tác dụng |
|---|---|
| `controls` | Hiện nút phát, dừng, âm lượng |
| `autoplay` | Tự phát (thường bị chặn nếu có tiếng) |
| `loop` | Lặp lại |
| `muted` | Tắt tiếng |
| `poster` | Ảnh bìa của video |

Chữ nằm trong thẻ chỉ hiện khi trình duyệt **không hỗ trợ** thẻ đó (nội dung dự phòng).

## Nhúng trang khác

```html
<iframe src="https://example.com" width="400" height="300" title="Trang ví dụ"></iframe>
```

`title` của iframe giúp trình đọc màn hình mô tả nội dung được nhúng.
