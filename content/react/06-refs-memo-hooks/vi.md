# useRef, useMemo và hook tự viết

## useRef — hộp chứa không gây vẽ lại

```jsx
const ref = useRef(null);
<input ref={ref} />
ref.current.focus();
```

`ref.current` trỏ tới phần tử DOM thật. Đổi `ref.current` **không** làm component vẽ lại (khác state). Dùng khi cần focus, đo kích thước, hoặc nhớ một giá trị giữa các lần vẽ (như id của timer).

## useMemo — ghi nhớ kết quả tính nặng

```jsx
const total = useMemo(() => items.reduce((s, x) => s + x.price, 0), [items]);
```

Chỉ tính lại khi `items` đổi. Đừng lạm dụng — chỉ dùng khi phép tính thật sự chậm.

## Hook tự viết

Khi hai component lặp lại cùng logic có state, tách thành một hàm bắt đầu bằng `use`:

```jsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return [on, () => setOn((v) => !v)];
}
```

Mỗi lần gọi hook có state **riêng**. Hook chỉ được gọi ở đầu component hoặc hook khác — không trong `if`, vòng lặp.
