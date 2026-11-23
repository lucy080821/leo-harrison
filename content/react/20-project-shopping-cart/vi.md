# Dự án: giỏ hàng với useReducer, Context và state dẫn xuất

Bài tổng hợp: ghép các kỹ thuật của khoá thành một tính năng **gần với thực tế**: giỏ hàng thương mại điện tử.

## Bước 1: thiết kế state tối thiểu

Quy tắc: lưu **ít nhất có thể**, **dẫn xuất** phần còn lại.

```js
// Lưu: id và số lượng. KHÔNG lưu tên, giá, tổng.
lines = [{ id: 1, qty: 2 }, { id: 2, qty: 1 }]
```

Giá và tên lấy từ danh mục sản phẩm (nguồn sự thật); **tổng tiền và số lượng tính mỗi lần render**. Nhờ vậy không thể bị lệch.

![State tối thiểu trong reducer; tổng tiền và số lượng được dẫn xuất](/lessons/react/20-project-shopping-cart-fig-vi.svg)
*State tối thiểu trong reducer; tổng tiền và số lượng được dẫn xuất*

## Bước 2: reducer thuần

```js
function reducer(state, action) {
  switch (action.type) {
    case "add": /* tăng qty hoặc thêm dòng */
    case "remove": return state.filter((l) => l.id !== action.id);
  }
}
```

- **Thuần**: cùng đầu vào cho cùng đầu ra, **không sửa** `state` tại chỗ, không hiệu ứng phụ.
- Dễ **kiểm thử** trực tiếp (bài 19): `expect(reducer([], {type:"add", id:1})).toEqual([{id:1, qty:1}])`.

## Bước 3: Context cho state dùng chung

`CartProvider` giữ `useReducer` và phát `{ lines, dispatch }` xuống cây. Hook `useCart()` che chi tiết Context. Cửa hàng (nút Thêm) và giỏ (tổng) ở xa nhau vẫn dùng chung dữ liệu, **không prop drilling**.



## Bước 4: hoàn thiện thực tế

| Tính năng | Gợi ý |
|---|---|
| Tăng/giảm số lượng, xoá khi qty = 0 | thêm hành động `dec` |
| Giỏ **bền** qua tải lại | `useLocalStorage` (bài 12) cho `lines` |
| Mã giảm giá | dẫn xuất thêm bước giảm; kiểm tra phía máy chủ |
| Giá thật | lấy từ API bằng TanStack Query (bài 9), không tin giá phía client |
| Hiệu năng | `memo` cho dòng sản phẩm, tách Context đọc/ghi |
| Trợ năng | `aria-live` thông báo "Đã thêm vào giỏ" (bài 16) |
| Kiểm thử | reducer (đơn vị) + luồng thêm/xoá (Testing Library) |

## Bài học thiết kế

1. **Một nguồn sự thật**: ít state, nhiều dẫn xuất.
2. **Tách logic khỏi giao diện**: reducer thuần ⇒ dễ kiểm thử, dễ mở rộng.
3. **Chọn đúng nơi đặt state**: Context vừa đủ cho giỏ hàng; nếu cập nhật dồn dập, cân nhắc store ngoài (bài 14).
4. **Máy chủ là nguồn quyết định cuối cùng** về giá và tồn kho.

## Hướng đi tiếp

Học **Next.js** để có định tuyến, lấy dữ liệu trên máy chủ và triển khai; **TypeScript** để kiểu hoá `action` và `state` (union kiểu cho `action.type`).

## Nguồn tham khảo

- react.dev: "Extracting State Logic into a Reducer", "Passing Data Deeply with Context", "Choosing the State Structure".
- Redux style guide: "Keep state minimal, derive the rest".
