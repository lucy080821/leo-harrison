# Lưu trữ cục bộ: AsyncStorage, kho an toàn và đồng bộ

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Ứng dụng di động **bị đóng và mở lại liên tục**, và thường chạy khi **mất mạng**. Cần lưu dữ liệu **trên thiết bị**: cài đặt, đăng nhập, bản nháp, bộ nhớ đệm.

## Chọn kho theo loại dữ liệu

| Kho | Dữ liệu | Lưu ý |
|---|---|---|
| **AsyncStorage** (`@react-native-async-storage/async-storage`) | cài đặt nhỏ, cờ, bộ nhớ đệm nhẹ | khoá-giá trị **chuỗi**, bất đồng bộ, **không mã hoá** |
| **MMKV** | khoá-giá trị rất nhanh (đồng bộ) | cho dữ liệu đọc thường xuyên |
| **SecureStore / Keychain / Keystore** (`expo-secure-store`) | **token, khoá, bí mật** | mã hoá bằng phần cứng hệ điều hành; dung lượng nhỏ |
| **SQLite** (`expo-sqlite`), WatermelonDB, Realm | dữ liệu **có cấu trúc, nhiều**, truy vấn, ngoại tuyến | khoá SQL của Lexi Learn áp dụng trực tiếp |
| **Hệ thống tệp** (`expo-file-system`) | ảnh, tệp tải về | quản lý dung lượng |

**Quy tắc bảo mật:** bí mật (token đăng nhập, khoá API riêng) **không bao giờ** vào AsyncStorage thuần: trên thiết bị đã root/jailbreak hoặc qua sao lưu, nó đọc được. Dùng kho an toàn.

![Chọn kho lưu theo loại dữ liệu; bí mật vào kho an toàn](/lessons/react-native/13-local-storage-fig-vi.svg)
*Chọn kho lưu theo loại dữ liệu; bí mật vào kho an toàn*

## API bất đồng bộ và chỉ lưu chuỗi

```js
await AsyncStorage.setItem('prefs', JSON.stringify({ theme: 'dark' }))
const raw = await AsyncStorage.getItem('prefs')
const prefs = raw ? JSON.parse(raw) : defaultPrefs
```

Vì **bất đồng bộ**, lần render đầu chưa có dữ liệu: dùng cờ `ready` (màn hình khởi động/spinner) tránh nhấp nháy giá trị mặc định. Hook `useStoredState` gói mẫu này (xem bài).

## Dữ liệu hỏng và đổi phiên bản

- **`JSON.parse` có thể ném lỗi** (dữ liệu hỏng, ghi dở): luôn `try/catch` và quay về mặc định.
- Ứng dụng **cập nhật** nhưng dữ liệu trong máy là **định dạng cũ**: lưu kèm **số phiên bản** (`v`) và viết **hàm di chuyển** `migrate(data)` nâng cấp từng bước. Không làm vậy, người dùng cũ sẽ **sập ứng dụng** sau cập nhật.

## Đồng bộ với máy chủ

Cục bộ là **bản sao**, máy chủ là **nguồn sự thật**:

1. Ghi cục bộ ngay (phản hồi tức thì, **cập nhật lạc quan**).
2. Xếp hàng thao tác, gửi khi có mạng.
3. Xử lý **xung đột** (hai thiết bị cùng sửa): "ghi sau thắng" (đơn giản) hoặc hợp nhất theo trường; dùng **dấu thời gian/phiên bản**.

Công cụ hỗ trợ: TanStack Query persister, WatermelonDB sync, PowerSync, Realm Device Sync.

## Quyền riêng tư

Dữ liệu cá nhân lưu máy vẫn là dữ liệu cá nhân: **chỉ lưu cái cần**, **xoá khi đăng xuất**, tuân thủ quy định (GDPR, Nghị định 13/2023/NĐ-CP), và cẩn trọng với **sao lưu đám mây** tự động của hệ điều hành.

## Nguồn tham khảo

- React Native docs: "AsyncStorage" (cộng đồng); Expo docs: `expo-secure-store`, `expo-sqlite`.
- OWASP MASVS-STORAGE.
- MMKV (github.com/mrousavy/react-native-mmkv).
