# Lỗi trong Node: lớp lỗi tuỳ chỉnh, lỗi vận hành và lỗi lập trình

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Xử lý lỗi tốt là ranh giới giữa dịch vụ **đáng tin** và dịch vụ "thỉnh thoảng sập không rõ vì sao".

## Hai loại lỗi

| | **Lỗi vận hành** | **Lỗi lập trình** |
|---|---|---|
| Nguyên nhân | môi trường: mạng rớt, tệp thiếu, đầu vào sai, hết thời gian | bug: `undefined.x`, sai kiểu, thiếu `await` |
| Ví dụ | `ECONNREFUSED`, 404, kiểm tra hợp lệ thất bại | `TypeError`, `ReferenceError` |
| Cách xử lý | **xử lý**: thử lại, báo người dùng, dùng giá trị dự phòng | **sửa mã**; ghi log, thoát, để trình giám sát khởi động lại |

(Phân loại của Joyent, "Error Handling in Node.js".) Đừng "nuốt" lỗi lập trình bằng `catch` rỗng: bạn che đi bug.

![Lỗi vận hành được xử lý; lỗi lập trình thì sửa mã](/lessons/nodejs/13-error-classes-handling-fig-vi.svg)
*Lỗi vận hành được xử lý; lỗi lập trình thì sửa mã*

## Lớp lỗi tuỳ chỉnh

```js
class AppError extends Error {
  constructor(message, { status = 500, code = 'INTERNAL', cause } = {}) {
    super(message, { cause })
    this.name = this.constructor.name
    this.status = status
    this.code = code
  }
}
class NotFoundError extends AppError { ... }   // 404
```

Lợi ích: kiểm tra bằng `instanceof`, mang **mã máy đọc được** (`code`) và **mã HTTP**, phân biệt lỗi **dự kiến** (`AppError`) với lỗi **bất ngờ**.



## cause: giữ nguyên nhân gốc

`new Error('Không tải được user', { cause: e })` (ES2022) nối chuỗi nguyên nhân: log cho bạn thấy **cả lớp cao lẫn lỗi gốc** (kết nối CSDL), không mất ngữ cảnh.

## Ánh xạ lỗi sang phản hồi HTTP

Một **middleware xử lý lỗi tập trung** (bài 7) chuyển `AppError` thành phản hồi JSON nhất quán; lỗi lạ trả **500 chung chung** và ghi log chi tiết. **Không bao giờ** trả stack trace hay thông điệp nội bộ cho client (lộ cấu trúc hệ thống).

## Quy tắc thực hành

1. Chỉ `catch` khi bạn **làm được điều gì có ích** (thử lại, bổ sung ngữ cảnh, chuyển đổi lỗi).
2. **Ném `Error`**, không ném chuỗi/object trần (mất stack).
3. Với `async`, luôn `await` hoặc `.catch`; **Promise bị bỏ rơi** gây `unhandledRejection`.
4. Dùng mã lỗi ổn định (`code`) để client/log xử lý, không so sánh thông điệp.
5. Đưa **mã yêu cầu** vào log lỗi để lần vết.

## Nguồn tham khảo

- Node.js docs: `Error`, "Errors" (mã lỗi hệ thống), `error.cause`.
- Joyent: "Error Handling in Node.js"; MDN: `Error.prototype.cause`.
