# Bất đồng bộ (2): Promise

**Promise** (lời hứa) là đối tượng đại diện cho một kết quả **sẽ có trong tương lai**. Nó giải quyết "callback hell" bằng cách cho phép **nối chuỗi** các bước.

## Ba trạng thái

```text
          ┌── resolve(giá trị) ──► fulfilled (thành công)
pending ──┤
 (chờ)    └── reject(lỗi)       ──► rejected  (thất bại)
```

Một Promise **chỉ đổi trạng thái một lần**, rồi giữ nguyên.

## Tạo Promise

```javascript
const wait = (ms, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), ms);   // gọi resolve khi xong
    // gọi reject(new Error("...")) nếu thất bại
  });
```

Thông thường bạn **dùng** Promise do thư viện trả về (`fetch`, v.v.) hơn là tự tạo; tự tạo khi bọc API dùng callback cũ như `setTimeout`.

## Dùng Promise: then / catch / finally

```javascript
wait(100, "xong")
  .then((v) => v.toUpperCase())        // nhận kết quả; giá trị trả về đi tiếp
  .then((v) => console.log(v))         // "XONG"
  .catch((err) => console.log(err))    // bắt LỖI ở BẤT KỲ bước nào phía trên
  .finally(() => console.log("dọn dẹp"));   // luôn chạy
```

- `.then` luôn trả về **Promise mới**, nên nối chuỗi được.
- Nếu `.then` trả về Promise khác, chuỗi sẽ **đợi** Promise đó.
- Một lỗi ném ra ở bất kỳ bước nào sẽ **bỏ qua các `.then` còn lại** và rơi vào `.catch` gần nhất.

## Chạy nhiều Promise cùng lúc

| Hàm | Kết quả |
|---|---|
| `Promise.all([p1, p2])` | Chờ **tất cả** xong → mảng kết quả theo thứ tự. **Một** cái lỗi là cả nhóm lỗi |
| `Promise.allSettled([...])` | Chờ tất cả; trả về trạng thái từng cái, không bao giờ reject |
| `Promise.race([...])` | Lấy cái **xong đầu tiên** (thành công hoặc lỗi) |
| `Promise.any([...])` | Lấy cái **thành công đầu tiên** |

```javascript
Promise.all([wait(50, "a"), wait(100, "b"), wait(30, "c")])
  .then((results) => console.log(results));   // ["a","b","c"] sau ~100ms, không phải 180ms
```

Chạy **song song** nên tổng thời gian bằng việc **chậm nhất**, không phải tổng cộng.

## Microtask: Promise ưu tiên hơn timer

Callback của Promise vào hàng đợi **microtask**, chạy **trước** callback của `setTimeout`:

```javascript
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
// sync, promise, timeout
```

## Lỗi thường gặp

- Quên `return` trong `.then` làm bước sau nhận `undefined`.
- Không có `.catch`: lỗi thành "unhandled rejection".
- Lồng `.then` bên trong `.then` thay vì trả Promise ra để nối chuỗi phẳng.

Bài kế tiếp, **async/await**, là cách viết dễ đọc hơn nữa trên nền Promise.
