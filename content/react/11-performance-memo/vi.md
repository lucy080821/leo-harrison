# Hiệu năng: React.memo, useCallback và key

**Quy tắc số 1: đừng tối ưu sớm.** React vốn nhanh. Chỉ tối ưu khi **đo được** vấn đề (React DevTools Profiler, cảm giác giật khi gõ/cuộn).

## Khi nào React render lại component?

1. **State của nó** đổi.
2. **Component cha** render lại (kể cả khi props con không đổi!).
3. **Context** nó dùng đổi.

Mục (2) là nguyên nhân phổ biến: cha đổi state thì **mọi con** render lại theo.

![Cha render lại kéo theo con; memo chặn khi props không đổi](/lessons/react/11-performance-memo-fig-vi.svg)
*Cha render lại kéo theo con; memo chặn khi props không đổi*

## React.memo

```jsx
const Row = memo(function Row({ label }) { ... });
```

`memo` bỏ qua render nếu **props không đổi** (so sánh nông, `Object.is`). Hữu ích với component **đắt** được render nhiều lần với props giống nhau.

## Bẫy: tham chiếu mới mỗi lần render

`<Row onPick={() => ...} />` tạo **hàm mới** mỗi lần render ⇒ props "đổi" ⇒ `memo` vô tác dụng. Khi truyền hàm/object/mảng cho component **đã memo**, giữ tham chiếu ổn định:

```jsx
const onPick = useCallback((x) => setPicked(x), []);
const style = useMemo(() => ({ color }), [color]);
```

## key: định danh trong danh sách

`key` giúp React biết phần tử nào là phần tử nào giữa các lần render.

- Dùng **id ổn định, duy nhất** (id từ CSDL).
- **Không dùng index** nếu danh sách có thể chèn/xoá/sắp xếp: state của phần tử (ô nhập, hiệu ứng) sẽ bị gán nhầm.
- Không dùng `Math.random()` (key đổi mỗi lần ⇒ mount lại toàn bộ).

## Các kỹ thuật khác

| Vấn đề | Giải pháp |
|---|---|
| Danh sách rất dài | **ảo hoá** (react-window, TanStack Virtual) |
| Tính toán đắt | `useMemo` |
| Cập nhật nặng khi gõ | `useDeferredValue`, `useTransition` (bài sau) |
| Bundle lớn | **tách mã** `lazy` + `Suspense` |
| State đặt quá cao | **hạ state xuống** gần nơi dùng |

Mẹo hay bị quên: **chuyển state xuống component con** nhỏ thay vì `memo` ở khắp nơi, đơn giản và hiệu quả hơn.

## Nguồn tham khảo

- react.dev: "Render and Commit", "memo", "useCallback", "Rendering Lists".
- Kent C. Dodds, "Fix the slow render before you fix the re-render".
