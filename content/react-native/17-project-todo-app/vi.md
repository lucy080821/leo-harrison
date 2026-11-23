# Dự án: ứng dụng việc cần làm với danh sách, lọc và state dẫn xuất

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Bài tổng hợp của khoá: dùng **component cốt lõi, state, form, danh sách, hiệu năng, trợ năng** để dựng một ứng dụng nhỏ **nhưng đúng cách**.

## Bước 1: thiết kế state tối thiểu

```js
todos  = [{ id, title, done }]        // nguồn sự thật DUY NHẤT của dữ liệu
text   = "..."                        // nội dung ô nhập
filter = "all" | "active" | "done"    // bộ lọc đang chọn
```

Mọi thứ khác là **DẪN XUẤT**: số việc còn lại, danh sách đang hiển thị. Không lưu chúng trong state (dễ lệch pha), **tính từ `todos`** mỗi lần render (`useMemo` nếu đắt).

![State tối thiểu là todos; số còn lại và danh sách hiển thị được dẫn xuất](/lessons/react-native/17-project-todo-app-fig-vi.svg)
*State tối thiểu là todos; số còn lại và danh sách hiển thị được dẫn xuất*

## Bước 2: cập nhật bất biến

```js
setTodos((prev) => [...prev, { id: Date.now(), title, done: false }])      // thêm
setTodos((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t)) // đánh dấu
setTodos((prev) => prev.filter((t) => t.id !== id))                          // xoá
```

Luôn tạo mảng/đối tượng **mới**; dùng **dạng hàm** `prev => ...` khi giá trị mới phụ thuộc giá trị cũ.

## Bước 3: giao diện

- `FlatList` với `keyExtractor` theo `id` ổn định, và **`ListEmptyComponent`** cho danh sách rỗng (bài 6).
- Ô nhập với `onSubmitEditing`, `returnKeyType="done"` (bài 11); **chuẩn hoá** (`trim`) và **bỏ qua chuỗi rỗng**.
- Nút có **`accessibilityRole`/`Label`** và vùng chạm ≥ 44 (bài 14).
- Bộ lọc: ba nút, nút đang chọn có `accessibilityState={{ selected: true }}`.

## Bước 4: hoàn thiện cho thực tế

| Tính năng | Gợi ý |
|---|---|
| Giữ dữ liệu sau khi đóng app | `useStoredState` + AsyncStorage (bài 13), có `migrate` |
| Đồng bộ nhiều thiết bị | API + TanStack Query, cập nhật lạc quan (bài 10) |
| Sửa tên, kéo thả sắp xếp | màn hình chi tiết (bài 9), `react-native-draggable-flatlist` |
| Hạn chót, nhắc việc | `expo-notifications`, thông báo cục bộ |
| Chủ đề tối | token màu + Context (bài 15) |
| Hoạt ảnh thêm/xoá | `LayoutAnimation`/Reanimated (bài 12) |
| Hiệu năng | `memo` cho dòng, `useCallback` (bài 16) |
| Kiểm thử | Jest + **React Native Testing Library** (kiểm thử theo hành vi người dùng) |

## Bài học thiết kế

1. **Ít state, nhiều dẫn xuất.**
2. **Cập nhật bất biến, dạng hàm.**
3. **Mọi trạng thái đều có giao diện**: rỗng, tải, lỗi.
4. **Trợ năng từ đầu**, không vá sau.
5. **Tách logic thuần** (lọc, đếm, di chuyển dữ liệu) khỏi giao diện để dễ kiểm thử.

## Bước tiếp theo

Dựng ứng dụng thật bằng **Expo** (`npx create-expo-app`), chạy trên **thiết bị thật** (Expo Go hoặc development build), thêm **TypeScript**, rồi phát hành thử qua **TestFlight/Internal testing** trước khi lên cửa hàng.

## Nguồn tham khảo

- React Native docs: "Get Started", "Core Components"; Expo documentation.
- react.dev: "Choosing the State Structure", "Updating Arrays in State".
- React Native Testing Library documentation.
