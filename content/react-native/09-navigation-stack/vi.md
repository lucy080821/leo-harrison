# Điều hướng: ngăn xếp màn hình và truyền tham số

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Ứng dụng di động gồm nhiều **màn hình**; **điều hướng** là cách người dùng đi giữa chúng. Khác web (mỗi trang một URL), di động dùng mô hình **ngăn xếp (stack)**: *đi tới* = `push` màn mới lên trên; *quay lại* = `pop`.

## Mô hình ngăn xếp

```
[Home]            →  push(Detail, {id: 7})  →  [Home, Detail{7}]  →  pop  →  [Home]
```

- Màn trên cùng là màn **đang hiển thị**.
- Nút Back (iOS: vuốt cạnh; Android: nút/cử chỉ hệ thống) **pop**.
- Màn dưới **vẫn nằm trong bộ nhớ** (giữ trạng thái, vị trí cuộn).

![Ngăn xếp màn hình: push thêm lên trên, pop để quay lại](/lessons/react-native/09-navigation-stack-fig-vi.svg)
*Ngăn xếp màn hình: push thêm lên trên, pop để quay lại*

## Các kiểu điều hướng thường gặp

| Kiểu | Dùng cho |
|---|---|
| **Stack** | luồng tuyến tính: danh sách → chi tiết |
| **Tabs** | các khu vực chính song song (Trang chủ, Tìm kiếm, Hồ sơ) |
| **Drawer** | ngăn kéo bên cạnh với nhiều mục |
| **Modal** | tác vụ tập trung, hiện **đè lên** (soạn thư, bộ lọc) |

Ứng dụng thật **lồng** chúng: Tabs ở gốc, mỗi tab có Stack riêng.

## Thư viện

- **React Navigation**: tiêu chuẩn lâu năm, điều hướng cấu hình bằng mã.
- **Expo Router**: định tuyến **dựa trên tệp** như Next.js (`app/post/[id].tsx`); dựa trên React Navigation, hỗ trợ **liên kết sâu (deep link)** và web.

```js
navigation.navigate('Detail', { id: 7 })      // React Navigation
router.push({ pathname: '/post/[id]', params: { id: 7 } })   // Expo Router
const { id } = route.params                   // đọc tham số
```

## Truyền tham số: quy tắc

- Chỉ truyền **ID hoặc dữ liệu nhỏ, tuần tự hoá được**; màn chi tiết **tự lấy** dữ liệu theo ID (nhờ vậy làm mới hay mở bằng liên kết đều chạy).
- **Đừng** truyền hàm hoặc đối tượng lớn/không tuần tự hoá được (cảnh báo, hỏng khi khôi phục trạng thái, liên kết sâu).
- Kiểu hoá tham số bằng TypeScript (`RootStackParamList`).

## Liên kết sâu (deep link)

URL như `myapp://post/7` hoặc liên kết web mở thẳng màn chi tiết: nền tảng của **thông báo đẩy**, chia sẻ và chuyển từ web sang app. Thiết kế **tham số = một phần URL** từ đầu.

## Trải nghiệm

- Giữ **nút Back** hoạt động như người dùng mong đợi (Android).
- Với chặn thoát ("bỏ thay đổi?"), dùng cơ chế `beforeRemove` của thư viện.
- **Đăng nhập**: dựng hai ngăn xếp (chưa đăng nhập / đã đăng nhập), đổi theo trạng thái xác thực thay vì chuyển hướng thủ công.

## Nguồn tham khảo

- React Navigation documentation; Expo Router documentation.
- Apple HIG: Navigation; Material Design: Navigation.
