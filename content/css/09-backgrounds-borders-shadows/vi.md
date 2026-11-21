# Nền, viền, bo góc và đổ bóng

## Nền

```css
.box {
  background-color: #eaf2fb;                       /* màu nền */
  background-image: url("anh.jpg");                /* ảnh nền */
  background-size: cover;                          /* phủ kín (cắt bớt nếu cần) */
  background-position: center;                     /* canh giữa */
  background-repeat: no-repeat;                    /* không lặp */
}
```

Viết gọn: `background: #eaf2fb url("anh.jpg") center / cover no-repeat;`

| `background-size` | Ý nghĩa |
|---|---|
| `cover` | Phủ kín khung, có thể bị cắt |
| `contain` | Thấy trọn ảnh, có thể thừa chỗ |

## Gradient (chuyển sắc)

Gradient là một dạng **ảnh** tạo bằng CSS, không cần file ảnh.

```css
background: linear-gradient(135deg, #0b6fd6, #0aa5b8);        /* theo góc 135° */
background: linear-gradient(to right, #fff, #0b6fd6 60%, #000); /* nhiều điểm màu */
background: radial-gradient(circle, #fff, #0b6fd6);            /* toả tròn */
```

## Viền và bo góc

```css
border: 2px solid #0b6fd6;
border-bottom: 1px dashed #999;
border-radius: 12px;         /* bo 4 góc */
border-radius: 50%;          /* hình tròn (nếu rộng = cao) */
outline: 2px solid orange;   /* đường bao ngoài, không chiếm chỗ */
```

## Đổ bóng

```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
/*          x  y   mờ   màu */
box-shadow: inset 0 0 0 2px #0b6fd6;  /* bóng bên trong (hiệu ứng viền) */
text-shadow: 1px 1px 2px rgba(0,0,0,.4);
```

Bốn giá trị là: lệch ngang, lệch dọc, độ mờ (blur) và màu. Dùng `rgba()` để bóng trong suốt, trông tự nhiên hơn bóng đen đặc.

## Ảnh trong khung

Khi ép ảnh vào khung có tỉ lệ khác, dùng `object-fit` để ảnh không bị méo:

```css
img { width: 100px; height: 100px; object-fit: cover; border-radius: 50%; }
```

## Độ trong suốt

```css
opacity: 0.6;                  /* làm mờ CẢ phần tử và nội dung */
background: rgb(0 0 0 / 0.6);  /* chỉ nền trong suốt, chữ vẫn rõ */
```
