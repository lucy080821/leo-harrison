# Lấy dữ liệu trong ứng dụng di động: tải, lỗi, rỗng và thử lại

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Trên điện thoại, mạng **không đáng tin**: vào thang máy, hầm, vùng sóng yếu, chuyển Wi-Fi sang 4G. Ứng dụng tốt **chủ động xử lý mọi trạng thái**, không chỉ trường hợp mạng đẹp.

## Bốn trạng thái của một màn hình dữ liệu

| Trạng thái | Giao diện |
|---|---|
| **Đang tải** | `ActivityIndicator` hoặc **khung xương (skeleton)** đúng hình dạng nội dung |
| **Lỗi** | thông báo dễ hiểu + nút **Thử lại** (đừng hiện "Network request failed" thô) |
| **Rỗng** | "Chưa có gì" + lời kêu gọi hành động |
| **Có dữ liệu** | nội dung |

Gom vào **một state** `{ status, data, error }` (tránh trạng thái bất khả như vừa tải vừa lỗi); mẫu `useEffect` + cờ `ignore` chống chạy lộn thứ tự giống khoá React (bài lấy dữ liệu).

![Bốn trạng thái của màn hình dữ liệu](/lessons/react-native/10-data-fetching-states-fig-vi.svg)
*Bốn trạng thái của màn hình dữ liệu*

## Thực tế di động

- **Mạng chập chờn**: đặt **timeout** (`AbortController`), **thử lại có backoff**, và giữ **dữ liệu cũ** hiển thị khi làm mới thất bại.
- **Ngoại tuyến**: theo dõi kết nối (`@react-native-community/netinfo`), hiện **biểu ngữ "Đang ngoại tuyến"**, xếp hàng thao tác ghi để gửi sau.
- **Bộ nhớ đệm**: lần mở sau thấy ngay dữ liệu cũ rồi **làm mới nền** (stale-while-revalidate).
- **Pin và dữ liệu di động**: hạn chế gọi lặp, gộp yêu cầu, tôn trọng chế độ tiết kiệm.
- **Pull-to-refresh** (`refreshing` + `onRefresh`) là thao tác người dùng kỳ vọng.

## Đừng tự viết hết: TanStack Query

**TanStack Query** (cũng có cho React Native) cho sẵn: trạng thái tải/lỗi, **cache**, thử lại, làm mới khi mở lại ứng dụng, loại trùng yêu cầu, phân trang vô hạn (`useInfiniteQuery`), **cập nhật lạc quan**. Kết hợp `focusManager`/`onlineManager` với `AppState` và NetInfo.

```js
const { data, isPending, error, refetch } = useQuery({ queryKey: ['users'], queryFn: getUsers })
```

## Bảo mật

- Gọi **HTTPS** (iOS ATS và Android chặn HTTP trơn theo mặc định).
- **Không nhúng khoá bí mật** trong ứng dụng: ai cũng có thể **giải nén** gói cài đặt. Khoá thật nằm ở **máy chủ của bạn**; ứng dụng gọi máy chủ đó.
- Lưu token ở **kho an toàn** (Keychain/Keystore: `expo-secure-store`), không phải `AsyncStorage` thuần.

## Nguồn tham khảo

- React Native docs: "Networking"; Expo docs: `expo-secure-store`.
- TanStack Query documentation (React Native guide).
- OWASP MASVS: Network communication; Storage.
