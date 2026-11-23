# Error Boundary, Suspense và lazy loading

Hai tình huống "không bình thường" của giao diện: **lỗi** và **chờ**. React có cơ chế chuẩn cho cả hai.

## Vấn đề: một lỗi làm sập cả ứng dụng

Nếu một component ném lỗi khi **render**, React gỡ **toàn bộ cây** và người dùng thấy **trang trắng**. **Error Boundary** giới hạn tác hại: chỉ vùng bị lỗi hiện giao diện dự phòng, phần còn lại sống tiếp.

```jsx
class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { /* ghi log */ }
  render() { return this.state.error ? <Fallback /> : this.props.children; }
}
```

Error Boundary vẫn **phải là class** (chưa có hook). Thư viện **react-error-boundary** cho API hàm tiện hơn (`resetErrorBoundary`, `FallbackComponent`).

**Chỉ bắt lỗi trong render, lifecycle, constructor của cây con.** **Không** bắt: lỗi trong **trình xử lý sự kiện** (dùng `try/catch`), **bất đồng bộ** (`setTimeout`, promise), **SSR**.

Đặt ranh giới ở **nhiều mức**: toàn ứng dụng (ranh giới cuối cùng) và từng **khu vực độc lập** (widget, tab). Ghi log tới **Sentry** trong `componentDidCatch`.

![Error Boundary giới hạn lỗi; Suspense hiện trạng thái chờ](/lessons/react/17-error-boundary-suspense-fig-vi.svg)
*Error Boundary giới hạn lỗi; Suspense hiện trạng thái chờ*

## Suspense: khai báo trạng thái chờ

```jsx
<Suspense fallback={<Spinner />}>
  <ThuHienPhanDangTai />
</Suspense>
```

Khi một component con **chưa sẵn sàng** (mã chưa tải, hoặc dữ liệu đang lấy với thư viện hỗ trợ), `Suspense` hiện `fallback`. Tách **ranh giới chờ** hợp lý để phần đã sẵn sàng không bị che.

## React.lazy: tách mã

```jsx
const Chart = lazy(() => import("./Chart"));   // chỉ tải khi cần
```

Gói JavaScript ban đầu nhỏ hơn ⇒ **trang tải nhanh hơn**. Nên tách theo **tuyến** (mỗi trang một khối) và các thành phần **nặng ít dùng** (biểu đồ, trình soạn thảo, bản đồ).

## Kết hợp

```jsx
<ErrorBoundary>
  <Suspense fallback={<Skeleton />}>
    <Chart />
  </Suspense>
</ErrorBoundary>
```

Lỗi tải mã (mạng rớt) cũng được ErrorBoundary bắt và cho phép **thử lại**.

## Trong Next.js

App Router tích hợp sẵn: `error.js` (Error Boundary theo tuyến), `loading.js` (Suspense theo tuyến), và **streaming** Server Components.

## Nguồn tham khảo

- react.dev: "Component", `Suspense`, `lazy`, mục Error Boundaries.
- react-error-boundary; Sentry for React.
