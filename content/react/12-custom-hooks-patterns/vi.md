# Hook tự viết thực dụng: useLocalStorage và useDebounce

**Hook tự viết** là hàm bắt đầu bằng `use` và có thể gọi các hook khác. Nó cho phép **tái sử dụng logic có state** giữa nhiều component mà không đổi cấu trúc cây component (khác HOC hay render props).

## Quy tắc của Hooks

1. Chỉ gọi hook ở **cấp cao nhất** của component/hook (không trong `if`, vòng lặp, hàm lồng).
2. Chỉ gọi từ **component hàm** hoặc **hook khác**.

Lý do: React nhận diện hook theo **thứ tự gọi** mỗi lần render. Plugin `eslint-plugin-react-hooks` bắt lỗi này.

![Hook tự viết gói logic có state dùng lại ở nhiều nơi](/lessons/react/12-custom-hooks-patterns-fig-vi.svg)
*Hook tự viết gói logic có state dùng lại ở nhiều nơi*

## Ví dụ 1: useToggle

Logic bật/tắt lặp đi lặp lại (modal, menu, accordion) gói thành một hook nhỏ trả `[on, toggle]`.

## Ví dụ 2: useLocalStorage

State **bền** qua lần tải lại trang:

```jsx
const [theme, setTheme] = useLocalStorage("theme", "light");
```

Chi tiết quan trọng: khởi tạo **lười** `useState(() => đọc localStorage)` để chỉ đọc một lần; bọc `try/catch` vì `localStorage` có thể bị chặn (chế độ riêng tư). Với **SSR/Next.js**, `localStorage` không tồn tại trên máy chủ, cần đọc trong `useEffect` để tránh lệch hydration.

## Ví dụ 3: useDebounce

Gõ vào ô tìm kiếm không nên gọi API **mỗi phím**. Debounce chờ người dùng **ngừng gõ** một lúc:

```jsx
useEffect(() => {
  const t = setTimeout(() => setV(value), ms);
  return () => clearTimeout(t);   // gõ tiếp thì huỷ lần chờ trước
}, [value, ms]);
```

Hàm dọn dẹp của effect chính là cơ chế huỷ timer cũ. Dùng giá trị `debounced` làm phụ thuộc của effect gọi API.

## Thiết kế hook tốt

- Một hook, **một trách nhiệm**; đặt tên theo điều nó làm (`useOnlineStatus`).
- Trả về thứ **dễ dùng**: mảng `[giá trị, hàm]` cho cặp đơn giản, object khi nhiều giá trị.
- Hook **không** chia sẻ state giữa các nơi gọi: mỗi lần gọi có state riêng. Chia sẻ thật dùng Context hoặc store.
- Thử trước thư viện có sẵn (**usehooks-ts**, **react-use**) trước khi tự viết.

## Nguồn tham khảo

- react.dev: "Reusing Logic with Custom Hooks", "Rules of Hooks".
- Josh W. Comeau, "The Perils of Rehydration".
