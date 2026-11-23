# Lấy dữ liệu: loading, lỗi và race condition

Hầu như mọi ứng dụng thật đều lấy dữ liệu từ máy chủ. Chữ "gọi API" nghe đơn giản, nhưng giao diện tốt phải xử lý **ba trạng thái** chứ không chỉ trường hợp thành công.

## Ba trạng thái

| Trạng thái | Người dùng thấy gì |
|---|---|
| **loading** | khung chờ (skeleton) hoặc "Đang tải…" |
| **error** | thông báo lỗi dễ hiểu + nút **Thử lại** |
| **success** | dữ liệu (kể cả trường hợp **rỗng**: "Chưa có dữ liệu") |

Gộp vào một state `{ status, data, error }` thay vì nhiều boolean rời (tránh trạng thái bất khả như vừa loading vừa error).

![Ba trạng thái của một yêu cầu dữ liệu](/lessons/react/09-data-fetching-fig-vi.svg)
*Ba trạng thái của một yêu cầu dữ liệu*

## Mẫu chuẩn với useEffect

```jsx
useEffect(() => {
  let ignore = false;
  setState({ status: "loading" });
  fetchUser(id)
    .then((u) => !ignore && setState({ status: "success", user: u }))
    .catch((e) => !ignore && setState({ status: "error", message: e.message }));
  return () => { ignore = true; };   // dọn dẹp
}, [id]);
```

## Race condition

Người dùng bấm nhanh id 1 → 2 → 3. Yêu cầu của id 1 có thể về **sau** yêu cầu id 3 và **ghi đè** kết quả đúng bằng dữ liệu cũ. Cờ `ignore` trong hàm dọn dẹp bỏ qua phản hồi của lần chạy đã bị thay thế. Với `fetch` thật, kết hợp `AbortController` để **huỷ hẳn** yêu cầu:

```jsx
const ctrl = new AbortController();
fetch(url, { signal: ctrl.signal });
return () => ctrl.abort();
```

## Thực tế: dùng thư viện

Tự viết như trên để hiểu bản chất. Dự án thật nên dùng **TanStack Query** hoặc **SWR**: cache, tự thử lại, làm mới nền, loại trùng yêu cầu, trạng thái loading/error sẵn có. Với Next.js, ưu tiên **lấy dữ liệu trên máy chủ** (Server Components).

## Lỗi hay gặp

- Quên kiểm tra `response.ok`: `fetch` **không ném lỗi** với HTTP 404/500, bạn phải tự kiểm tra.
- Quên dọn dẹp ⇒ cập nhật state sau khi component đã bị gỡ.
- Hiển thị dữ liệu cũ lẫn mới lúc chuyển id (nên reset về loading).

## Nguồn tham khảo

- React docs: "Synchronizing with Effects" và "You Might Not Need an Effect" (react.dev).
- MDN: Using the Fetch API; AbortController.
- TanStack Query documentation.
