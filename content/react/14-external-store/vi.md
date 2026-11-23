# State toàn cục: tự viết store với useSyncExternalStore

Khi nhiều component **ở xa nhau** cần chung dữ liệu (người dùng đăng nhập, giỏ hàng, theme), câu hỏi là: **state nên đặt ở đâu**?

## Thang chọn nơi đặt state

| Nhu cầu | Giải pháp |
|---|---|
| Chỉ một component dùng | `useState` cục bộ |
| Vài component anh em | **nâng state** lên cha chung |
| Dữ liệu ít đổi, nhiều nơi đọc (theme, ngôn ngữ, người dùng) | **Context** |
| Dữ liệu **đổi thường xuyên**, nhiều nơi đọc, cần tối ưu render | **store ngoài** (Zustand, Redux Toolkit, Jotai) |
| Dữ liệu **từ máy chủ** | **TanStack Query/SWR**, không nhét vào store |
| Trạng thái **trong URL** (bộ lọc, trang) | tham số URL |

Điều quan trọng: **phần lớn "state" thực ra là dữ liệu máy chủ** hoặc URL; store toàn cục thật sự cần ít hơn nhiều người tưởng.

![Store nằm ngoài React; component đăng ký và chỉ render khi phần đã chọn đổi](/lessons/react/14-external-store-fig-vi.svg)
*Store nằm ngoài React; component đăng ký và chỉ render khi phần đã chọn đổi*

## Vì sao Context không luôn đủ

Mọi component dùng một Context **render lại khi giá trị Context đổi**, dù chỉ dùng một trường. Với state đổi liên tục, điều này gây render thừa.

## Store ngoài React

State nằm trong một object **bên ngoài** cây component, kèm `subscribe`. Hook `useSyncExternalStore(subscribe, getSnapshot)` (React 18) đồng bộ store với React **an toàn** với render đồng thời. Chỉ render lại khi **kết quả của selector** đổi (so sánh `Object.is`).

```jsx
const count = useStore((s) => s.count);
```

Lưu ý: `getSnapshot` phải trả **cùng tham chiếu** nếu dữ liệu chưa đổi (đừng tạo object mới mỗi lần), nếu không sẽ lặp vô hạn.

## Thư viện thực tế

- **Zustand**: ~vài chục dòng như bài này, API cực gọn. Lựa chọn mặc định hiện nay.
- **Redux Toolkit**: chuẩn cho ứng dụng lớn, công cụ gỡ lỗi tuyệt vời, quy ước rõ.
- **Jotai/Recoil**: state dạng nguyên tử.

## Quy tắc bất biến

Luôn **tạo object mới** khi cập nhật (`{...state, ...patch}`), không sửa tại chỗ, để React nhận ra thay đổi.

## Nguồn tham khảo

- react.dev: "useSyncExternalStore", "Scaling Up with Reducer and Context".
- Zustand và Redux Toolkit documentation.
