# Hiệu năng và kiến trúc: JS thread, Hermes, kiến trúc mới và Expo

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Người dùng di động **không tha thứ** cho ứng dụng giật hay chậm mở. Hiểu **cách React Native chạy** giúp bạn biết nên tối ưu ở đâu.

## Hai luồng quan trọng

| Luồng | Việc | Triệu chứng khi quá tải |
|---|---|---|
| **UI (main)** | vẽ giao diện native, xử lý chạm, hoạt ảnh native | cuộn/hoạt ảnh **giật** |
| **JavaScript** | chạy mã React của bạn (render, logic, gọi mạng) | chạm **phản hồi trễ**, hoạt ảnh JS khựng |

Mục tiêu: mỗi khung hình ≤ **16,7 ms** (60 fps; 8,3 ms với màn 120 Hz). JS bận render lớn hay tính toán nặng ⇒ giật. Đo bằng **Perf Monitor** và **React DevTools Profiler**.

![Hai luồng: JS chạy React; UI vẽ native, JSI nối trực tiếp](/lessons/react-native/16-performance-architecture-fig-vi.svg)
*Hai luồng: JS chạy React; UI vẽ native, JSI nối trực tiếp*

## Tối ưu render (giống React web, nhưng đắt hơn vì chạm vào native)

1. **Đừng render lại thứ không đổi**: `React.memo`, `useCallback`, `useMemo` đúng chỗ (xem bài hiệu năng khoá React). Tham chiếu hàm mới mỗi lần render làm `memo` vô tác dụng.
2. **Hạ state xuống** gần nơi dùng; tách component.
3. **Danh sách**: `FlatList` + dòng đã `memo`, `keyExtractor` ổn định, `getItemLayout` khi cao cố định; **FlashList** cho danh sách lớn (bài 6).
4. **Ảnh**: kích thước đúng, định dạng hiện đại, bộ nhớ đệm (`expo-image`).
5. **Tính toán nặng**: `useMemo`, hoặc chuyển ra khỏi luồng JS (Worklets/Reanimated, mô-đun native, máy chủ).
6. **Tránh `console.log` dày đặc** và đối tượng mới trong `style` liên tục (dùng `StyleSheet.create`).

## Hermes và kiến trúc mới

- **Hermes**: động cơ JavaScript do Meta xây riêng cho React Native, là **mặc định**: biên dịch trước ra **bytecode** ⇒ **khởi động nhanh hơn, ít bộ nhớ hơn**.
- **Kiến trúc mới** (mặc định từ React Native 0.76): thay "cầu nối" bất đồng bộ cũ bằng **JSI** (JavaScript gọi trực tiếp native, **đồng bộ**, không tuần tự hoá JSON), cùng **Fabric** (bộ vẽ mới) và **TurboModules** (mô-đun native tải lười). Kết quả: ít độ trễ giữa JS và native, hỗ trợ tốt cho React đồng thời.

Bạn thường **không cần chỉnh** những thứ này, nhưng hiểu để chọn thư viện **tương thích kiến trúc mới**.

## Expo hay React Native "trần"?

Tài liệu React Native hiện **khuyến nghị bắt đầu bằng một framework** như **Expo**:

| Expo | RN trần |
|---|---|
| bộ công cụ, thư viện (camera, tệp, thông báo...), **Expo Router** | tự cấu hình Xcode/Android Studio |
| **EAS Build** (dựng trên đám mây), **EAS Update** (cập nhật mã JS qua mạng) | tự dựng CI |
| **Development builds** cho mô-đun native tuỳ chỉnh | toàn quyền |

Hầu hết dự án nên dùng **Expo** (vẫn thêm được mã native khi cần qua *config plugins*/development build).

## Phát hành

Lên **App Store**/**Google Play**: tài khoản nhà phát triển, ký ứng dụng, biểu tượng/ảnh chụp, **chính sách quyền riêng tư**, đánh giá của cửa hàng (vài ngày). **Cập nhật OTA** (EAS Update) sửa lỗi JS **không cần chờ duyệt** nhưng không đổi mã native. Theo dõi sập ứng dụng bằng **Sentry/Crashlytics**.

## Nguồn tham khảo

- React Native docs: "Performance Overview", "The New Architecture", "Hermes", "Get Started".
- Expo documentation: EAS Build, EAS Update; Shopify FlashList.
