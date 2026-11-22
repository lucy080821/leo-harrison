# useEffect: tác dụng phụ

Component thuần chỉ **tính giao diện từ props và state**. Những việc "bên ngoài" — đổi tiêu đề trang, đặt đồng hồ, gọi API, đăng ký sự kiện — gọi là **tác dụng phụ** (side effect) và đặt trong `useEffect`.

```jsx
useEffect(() => {
  // chạy SAU khi giao diện được vẽ
  return () => { /* dọn dẹp (tùy chọn) */ };
}, [dependencies]);
```

## Mảng phụ thuộc

| Mảng | Khi nào chạy |
|---|---|
| không có | sau **mọi** lần vẽ |
| `[]` | **một lần** sau lần vẽ đầu |
| `[a, b]` | khi `a` hoặc `b` **đổi** |

![Vòng đời useEffect: render → commit → effect → cleanup](/lessons/react/05-effects-fig-vi.svg)
*Vòng đời useEffect: render → commit → effect → cleanup*

## Dọn dẹp

Hàm trả về từ effect chạy trước lần chạy tiếp theo và khi component biến mất. Dùng để `clearInterval`, bỏ đăng ký sự kiện, hủy yêu cầu mạng.

## Khi nào KHÔNG cần effect

- Tính giá trị từ state/props → tính ngay trong thân component.
- Phản hồi một cú bấm → đặt logic trong `onClick`.

Effect dành cho việc **đồng bộ với thế giới bên ngoài React**.
