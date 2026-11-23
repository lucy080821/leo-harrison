# Kiểm thử Node: bộ chạy test tự viết, assert và app.inject

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Kiểm thử không phải "việc làm thêm": nó là thứ cho bạn **can đảm sửa mã**. Một API không có test là một API **không ai dám đụng** sau ba tháng.

## Test runner thực chất là gì

Một hàm nhận tên và hàm kiểm tra, chạy, bắt lỗi, báo kết quả (đoạn mã đầu bài). Node 18+ có sẵn **`node:test`**:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('cộng hai số', () => {
  assert.equal(add(2, 3), 5)
})
```

Chạy bằng `node --test`. Các lựa chọn khác: **Vitest** (nhanh, tương thích Jest), **Jest**.

![Arrange - Act - Assert](/lessons/nodejs/15-testing-node-fig-vi.svg)
*Arrange - Act - Assert*

## Cấu trúc một test: Arrange - Act - Assert

1. **Arrange**: dựng dữ liệu/trạng thái.
2. **Act**: gọi đúng một hành vi.
3. **Assert**: kiểm tra kết quả **quan sát được**.

Test nên **nhỏ, độc lập, nhanh, đặt tên mô tả hành vi** ("trả 404 khi bài viết không tồn tại").



## Kiểm thử API: không cần mở cổng

Express app là một hàm xử lý yêu cầu. Thư viện **supertest** (hoặc `app.inject` trong bản mô phỏng này, `fastify.inject` của Fastify) gọi thẳng nó, nhanh và không xung đột cổng:

```js
const res = await request(app).get('/ping')
assert.equal(res.status, 200)
```

Hãy kiểm thử **cả đường lỗi**: đầu vào sai (400), thiếu quyền (401/403), không tìm thấy (404).

## Mock: thay phụ thuộc bên ngoài

Thư gửi email, thanh toán, API bên thứ ba **không nên chạy thật** trong test. Truyền phụ thuộc vào (**dependency injection**) rồi thay bằng bản giả ghi lại lời gọi; kiểm tra được *"đã gọi với đúng đối số chưa"*. `node:test` có `mock.fn()`.

Nguyên tắc: mock ở **biên hệ thống** (mạng, email, đồng hồ), không mock chính mã của bạn quá nhiều (test sẽ vỡ khi refactor dù hành vi đúng).

## Kim tự tháp kiểm thử

| Tầng | Số lượng | Ví dụ |
|---|---|---|
| **Đơn vị** | nhiều | hàm thuần, tính toán, validate |
| **Tích hợp** | vừa | API + CSDL thật (container), kiểm tra lát cắt |
| **End-to-end** | ít | luồng quan trọng qua trình duyệt |

Dùng **CSDL thật trong container** (Testcontainers/Docker) cho test tích hợp thay vì mock CSDL: bắt lỗi truy vấn thật.

## Thói quen tốt

- Chạy test trong **CI** cho mọi pull request.
- **Độ bao phủ** là chỉ báo, không phải mục tiêu: 100% bao phủ vẫn có thể bỏ sót lỗi. Ưu tiên **chỗ rủi ro** (thanh toán, phân quyền).
- Viết test cho mỗi bug đã sửa để nó **không quay lại**.
- Tránh test phụ thuộc thời gian/ngẫu nhiên: **tiêm đồng hồ** và hạt giống.

## Nguồn tham khảo

- Node.js docs: `node:test`, `assert`.
- Supertest; Vitest documentation.
- Martin Fowler: "Practical Test Pyramid".
