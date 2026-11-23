# Định tuyến phía client: tự viết router bằng hash

Trang web truyền thống: mỗi URL là **một yêu cầu tới máy chủ** và tải lại cả trang. **Ứng dụng một trang (SPA)** tải một lần, rồi JavaScript **tự đổi giao diện theo URL** mà không tải lại. Việc ánh xạ URL → giao diện gọi là **định tuyến phía client**.

## Ý tưởng cốt lõi

1. **Đọc** URL hiện tại (`location`).
2. **Chọn** component theo URL.
3. **Lắng nghe** thay đổi URL (nút Back/Forward, bấm link) để vẽ lại.

Bài này dùng phần **hash** (`#/about`) vì đơn giản và không cần máy chủ đặc biệt. Sự kiện `hashchange` báo khi hash đổi.

![URL quyết định component nào được hiển thị](/lessons/react/15-client-routing-fig-vi.svg)
*URL quyết định component nào được hiển thị*

## Tham số đường dẫn

`/user/42`: tách đoạn để lấy `42` (`path.split("/")[2]`). Router thật dùng **mẫu** `/user/:id` rồi khớp và trích tham số.

## Hash router vs History API

| | Hash (`#/a`) | History API (`/a`) |
|---|---|---|
| Cấu hình máy chủ | không cần | cần trả `index.html` cho mọi đường dẫn |
| URL | hơi xấu | sạch |
| SEO | kém | tốt hơn (nhất là kèm SSR) |
| API | `hashchange` | `pushState`, `popstate` |

## Router trong thực tế

- **React Router**: tiêu chuẩn cho SPA (`<Routes>`, `<Link>`, `useParams`, `useNavigate`, loader, route lồng nhau).
- **TanStack Router**: an toàn kiểu mạnh.
- **Next.js (App Router)**: định tuyến theo **thư mục/tập tin**, kèm SSR. Xem khoá Next.js.

## Trải nghiệm tốt

- Dùng **`<Link>`/`<a>`** thật để mở trong tab mới và hỗ trợ trình đọc màn hình, không phải `<div onClick>`.
- Trạng thái nên nằm **trong URL** (bộ lọc, trang, tab) để **chia sẻ và đánh dấu được**.
- **Chuyển trang không tải lại**: nhớ **cuộn lên đầu** và đưa **focus** tới tiêu đề (an tiếp cận).
- Trang 404 cho tuyến không tồn tại; **bảo vệ tuyến** cần đăng nhập (và kiểm tra lại ở máy chủ).

## Nguồn tham khảo

- MDN: History API; Window `hashchange` event.
- React Router và TanStack Router documentation.
