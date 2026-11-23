# Kiểm thử component React: viết để dễ kiểm thử

Kiểm thử không phải để "có điểm bao phủ" mà để **thay đổi mã mà không sợ**. Khi bạn dám refactor vì có bộ kiểm thử tin cậy, bạn làm việc nhanh hơn.

## Kim tự tháp kiểm thử

| Tầng | Kiểm thử gì | Số lượng | Công cụ |
|---|---|---|---|
| **Đơn vị** | hàm thuần, hook | nhiều | Vitest/Jest |
| **Component/tích hợp** | một vùng giao diện với hành vi người dùng | vừa | **Testing Library** |
| **End-to-end** | luồng thật trên trình duyệt | ít | Playwright, Cypress |

![Kim tự tháp kiểm thử: nhiều đơn vị, vừa tích hợp, ít end-to-end](/lessons/react/19-testing-react-fig-vi.svg)
*Kim tự tháp kiểm thử: nhiều đơn vị, vừa tích hợp, ít end-to-end*

## Nguyên tắc vàng: kiểm thử hành vi, không phải cài đặt

> "Kiểm thử càng giống cách phần mềm được dùng, càng đáng tin." (Testing Library)

**Nên:** tìm phần tử như người dùng (theo **nhãn, vai trò, văn bản**), thao tác (gõ, bấm), rồi xác nhận **điều người dùng thấy**.

```jsx
render(<App />);
await userEvent.type(screen.getByLabelText("Mã giảm giá"), "SALE10");
expect(screen.getByTestId("total")).toHaveTextContent("180");
```

**Tránh:** kiểm thử `state` nội bộ, tên hàm, số lần render. Chúng vỡ khi refactor dù hành vi không đổi.

Thứ tự ưu tiên truy vấn: `getByRole` → `getByLabelText` → `getByText` → `getByTestId` (cuối cùng). Dùng `getByRole` khuyến khích **trợ năng** (bài 16).

## Viết mã dễ kiểm thử

1. **Tách logic thuần** (tính toán, kiểm tra hợp lệ) ra hàm riêng: kiểm thử đơn vị trực tiếp, nhanh, không cần render.
2. Component **nhận phụ thuộc qua props** (hàm lấy dữ liệu), dễ thay bằng giả.
3. Hạn chế hiệu ứng phụ ẩn (`Date.now()`, `Math.random()`): truyền vào hoặc giả lập.

## Mạng: giả lập ở biên

Đừng giả lập `fetch` rải rác trong từng bài. Dùng **MSW (Mock Service Worker)** chặn yêu cầu mạng ở tầng thấp: mã ứng dụng chạy y như thật, chỉ máy chủ là giả.

## Bất đồng bộ

Dùng `await screen.findBy...` (tự chờ phần tử xuất hiện) thay vì `setTimeout` cố định, để kiểm thử **ổn định**, không chập chờn (flaky).

## Vài thói quen tốt

- Mỗi kiểm thử **độc lập**, không phụ thuộc thứ tự.
- Kiểm thử **ca lỗi và ca rỗng**, không chỉ đường thành công.
- Chạy kiểm thử trong **CI** cho mọi pull request.
- Bao phủ cao không bằng **kiểm thử đúng chỗ rủi ro** (thanh toán, phân quyền).

## Nguồn tham khảo

- Testing Library documentation: "Guiding Principles", "Queries".
- Kent C. Dodds, "Testing Implementation Details".
- Vitest và MSW documentation.
