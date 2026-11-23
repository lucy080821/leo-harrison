# Cache trong dịch vụ: LRU, TTL và các bẫy

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Cache là cách **rẻ nhất** để làm hệ thống nhanh hơn và chịu tải tốt hơn: lưu kết quả của việc tốn kém để lần sau trả ngay. Nhưng nó cũng là **nguồn bug tinh vi nhất**.

## Cache-aside (mẫu phổ biến nhất)

```js
async function getUser(id) {
  const hit = await cache.get('user:' + id)
  if (hit) return hit                    // trúng
  const user = await db.findUser(id)     // trượt: lấy từ nguồn
  await cache.set('user:' + id, user, { ttl: 60 })
  return user
}
```

Ứng dụng tự quản lý cache; khi sửa dữ liệu thì **xoá/cập nhật** mục tương ứng.



![LRU loại mục lâu không dùng nhất khi cache đầy](/lessons/nodejs/19-caching-lru-fig-vi.svg)
*LRU loại mục lâu không dùng nhất khi cache đầy*

## Hai câu hỏi cốt lõi

1. **Khi nào loại mục?** TTL (hết hạn theo thời gian), **LRU** (loại mục lâu không dùng khi đầy), LFU (ít dùng nhất).
2. **Khi nào vô hiệu hoá?** Sau mỗi lần sửa (sạch nhưng phức tạp) hoặc chấp nhận **dữ liệu cũ tới TTL** (đơn giản).

## Nơi đặt cache

| Nơi | Đặc điểm |
|---|---|
| **Trong tiến trình** (Map/LRU) | nhanh nhất, nhưng **mỗi tiến trình một bản**; mất khi khởi động lại |
| **Redis/Memcached** | chung cho mọi máy, bền hơn; thêm một bước mạng |
| **CDN/HTTP cache** | gần người dùng nhất |

## Các bẫy nổi tiếng

- **Cache stampede (thundering herd)**: mục hết hạn, hàng nghìn yêu cầu cùng lúc cùng tính lại, đè sập CSDL. Cách chặn: **gộp lời gọi đồng thời** (chia sẻ một Promise), TTL ngẫu nhiên, làm mới nền (stale-while-revalidate).
- **Dữ liệu cũ gây hại**: giá/tồn kho/quyền truy cập: đặt TTL ngắn hoặc **vô hiệu hoá chủ động**.
- **Khoá cache thiếu thông tin**: quên đưa `userId`/ngôn ngữ vào khoá ⇒ **người dùng A thấy dữ liệu người dùng B**. Lỗi bảo mật nghiêm trọng.
- **Cache âm**: lưu cả kết quả "không tìm thấy" (TTL ngắn) để chặn truy vấn lặp vào dữ liệu không tồn tại.
- **Bộ nhớ vô hạn**: luôn có **giới hạn kích thước** (LRU).

## HTTP caching

Cho phản hồi công khai: `Cache-Control: public, max-age=300, stale-while-revalidate=60`. Cho **điều kiện**: `ETag`/`If-None-Match` cho phép trả **304 Not Modified** không kèm thân, tiết kiệm băng thông. Dữ liệu riêng của người dùng: `Cache-Control: private` hoặc `no-store`.

## Nguyên tắc

1. **Đo trước**: cache chỉ đáng khi truy vấn thật sự chậm/đắt và đọc nhiều hơn ghi.
2. Mọi cache có **TTL và giới hạn**.
3. Theo dõi **tỷ lệ trúng** (hit ratio).

## Nguồn tham khảo

- Redis docs: caching patterns; Wikipedia: Cache replacement policies.
- MDN: HTTP caching; RFC 9111 (HTTP Caching), RFC 5861 (stale-while-revalidate).
