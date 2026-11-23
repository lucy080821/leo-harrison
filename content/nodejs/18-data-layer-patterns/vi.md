# Tầng dữ liệu: repository, truy vấn tham số hoá và giao dịch

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

API thực tế gần như luôn có CSDL. Cách bạn **tổ chức mã truy cập dữ liệu** quyết định bảo trì, bảo mật và hiệu năng.

## Phân tầng

```
route/controller  →  service (nghiệp vụ)  →  repository (dữ liệu)  →  CSDL
```

- **Route**: đọc yêu cầu, kiểm tra đầu vào, trả phản hồi. **Không** chứa SQL.
- **Service**: quy tắc nghiệp vụ ("không thể huỷ đơn đã giao").
- **Repository**: **chỉ biết** cách lưu/lấy dữ liệu: `findById`, `listActive`. Đổi CSDL hay đổi ORM chỉ ảnh hưởng tầng này, và test dùng **repository giả** dễ dàng (bài 15).



![Route không chứa SQL; repository che giấu nơi lưu trữ](/lessons/nodejs/18-data-layer-patterns-fig-vi.svg)
*Route không chứa SQL; repository che giấu nơi lưu trữ*

## Truy vấn an toàn

Luôn **tham số hoá** (bài 17): `{ text: 'SELECT … WHERE id = $1', values: [id] }`. Tên bảng/cột **không** tham số hoá được: chỉ nhận từ **danh sách cho phép** trong mã.

| Công cụ | Ghi chú |
|---|---|
| **pg** / **mysql2** | trình điều khiển thô: kiểm soát tối đa |
| **Drizzle**, **Kysely** | truy vấn có kiểu, gần SQL |
| **Prisma** | ORM với lược đồ, tiện nhưng trừu tượng dày hơn |

Dù dùng ORM, **hiểu SQL** (khoá SQL của Lexi Learn) để đọc truy vấn sinh ra và tối ưu chỉ mục.

## Giao dịch (transaction)

Chuyển tiền gồm trừ A rồi cộng B: nếu hỏng giữa chừng, tiền **biến mất**. Giao dịch đảm bảo **tất cả hoặc không gì cả** (tính nguyên tử của ACID):

```js
await db.transaction(async (tx) => {
  await tx.query('UPDATE accounts SET bal = bal - $1 WHERE id = $2', [amt, from])
  await tx.query('UPDATE accounts SET bal = bal + $1 WHERE id = $2', [amt, to])
})   // lỗi ⇒ tự ROLLBACK
```

Giữ giao dịch **ngắn**; không gọi API ngoài bên trong. Chú ý **cạnh tranh** (hai yêu cầu cùng sửa một dòng): khoá hàng (`SELECT … FOR UPDATE`) hoặc kiểm tra phiên bản (khoá lạc quan).

## N+1 và hiệu năng

Lấy 100 bài viết rồi lặp lấy tác giả từng bài = **101 truy vấn**. Giải pháp: `JOIN`, hoặc `WHERE id IN (...)` một lần rồi ghép trong bộ nhớ. Dùng **pool kết nối** (không mở kết nối mới mỗi yêu cầu) và đặt **chỉ mục** cho cột lọc/sắp xếp.

## Phân trang

- **offset** (`LIMIT 20 OFFSET 40`): đơn giản, **chậm dần** ở trang sâu, lệch khi dữ liệu đổi.
- **keyset/con trỏ** (`WHERE id > $1 ORDER BY id LIMIT 20`): nhanh và ổn định, trả `nextCursor`. Lựa chọn cho nguồn cấp dữ liệu, danh sách lớn.

## Di cư lược đồ (migration)

Thay đổi cấu trúc bảng bằng **tệp migration có phiên bản** (Drizzle Kit, Prisma Migrate, node-pg-migrate), chạy trong CI/CD; đừng sửa tay trên máy chủ sản xuất. Thay đổi phải **tương thích ngược** với bản mã đang chạy (thêm cột trước, bỏ cột sau).

## Nguồn tham khảo

- PostgreSQL docs: Transactions, Indexes, Parameters (`$1`).
- Martin Fowler, *Patterns of Enterprise Application Architecture*: Repository.
- Use The Index, Luke: "Paging Through Results".
