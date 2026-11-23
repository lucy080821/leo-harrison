# Render đồng thời: useTransition và useDeferredValue

Gõ vào ô tìm kiếm mà danh sách 10.000 dòng được lọc lại ngay mỗi phím ⇒ **ô nhập giật**. Vấn đề không phải tổng khối lượng việc mà là **mọi cập nhật đều khẩn cấp như nhau**.

## Cập nhật khẩn cấp và không khẩn cấp

| Loại | Ví dụ | Mong muốn |
|---|---|---|
| **Khẩn cấp** | gõ phím, bấm, kéo | phản hồi **tức thì** |
| **Chuyển tiếp (transition)** | kết quả lọc, đổi tab/trang | **được phép trễ**, có thể bị gián đoạn |

React 18 hỗ trợ **render đồng thời**: có thể **tạm dừng và bỏ** một lần render chưa quan trọng khi có cập nhật khẩn cấp hơn đến.

![Ô nhập cập nhật ngay; danh sách đuổi theo khi rảnh](/lessons/react/18-transitions-deferred-fig-vi.svg)
*Ô nhập cập nhật ngay; danh sách đuổi theo khi rảnh*

## useTransition

Đánh dấu một cập nhật là *không khẩn cấp*:

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setTab("b"));
```

`isPending` cho biết chuyển tiếp đang chạy (hiện spinner nhỏ). Nếu người dùng bấm tiếp, React **bỏ** lần cũ.

## useDeferredValue

Khi bạn **không kiểm soát** nơi gọi `setState` (giá trị đến từ props), hoặc chỉ muốn một "bản trễ" của giá trị:

```jsx
const deferred = useDeferredValue(text);
<List query={deferred} />   // memo(List): chỉ render lại khi deferred đổi
```

`text` cập nhật ngay (ô nhập mượt), `deferred` đuổi theo khi React rảnh. Hãy bọc con trong **`memo`** để lợi ích thực sự xảy ra.

## Khi nào dùng?

- **Lọc/tìm kiếm danh sách lớn**, biểu đồ nặng, chuyển tab chứa nội dung nặng.
- **Không** thay thế được cho: gọi API (vẫn cần debounce hoặc huỷ yêu cầu), danh sách quá dài (cần **ảo hoá**), tính toán cực nặng (đưa vào Web Worker).

## Lưu ý

- Hàm trong `startTransition` phải **đồng bộ** và chỉ chứa cập nhật state.
- Với **input điều khiển**, đừng đặt chính `setText` vào transition (ô sẽ trễ).
- Đo bằng React Profiler trước và sau.

## Nguồn tham khảo

- react.dev: `useTransition`, `useDeferredValue`; bài viết "React 18: Concurrent features".
- Working Group React 18: "Automatic batching" và "Transitions".
