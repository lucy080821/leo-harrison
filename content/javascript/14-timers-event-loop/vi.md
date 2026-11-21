# Bất đồng bộ (1): timer, callback và event loop

## Vì sao cần bất đồng bộ?

JavaScript chạy **một việc một lúc** (đơn luồng). Nhưng nhiều việc **chậm**: tải dữ liệu từ mạng, đọc file, chờ người dùng bấm. Nếu đứng chờ, cả trang sẽ đơ. Giải pháp: **bắt đầu việc, đi làm việc khác, và được gọi lại khi xong**. Đó là **bất đồng bộ** (asynchronous).

## setTimeout và setInterval

```javascript
setTimeout(() => console.log("1 giây sau"), 1000);       // chạy MỘT lần sau 1000ms

const id = setInterval(() => console.log("mỗi giây"), 1000);   // lặp lại mãi
clearInterval(id);                                        // dừng lặp
```

Cả hai nhận một **callback** (hàm sẽ được gọi lại) và số mili giây. Hai hàm trả về `id` để huỷ: `clearTimeout(id)` và `clearInterval(id)`.

> Nếu quên `clearInterval`, timer chạy mãi và có thể gây rò rỉ bộ nhớ, nhất là khi trang đã bỏ phần tử.

## Event loop: thứ tự chạy

```javascript
console.log("1");
setTimeout(() => console.log("3"), 0);
console.log("2");
// In: 1, 2, 3
```

Dù chờ 0ms, callback của `setTimeout` **luôn chạy sau** khi code đồng bộ hiện tại xong. Cơ chế như sau:

```text
 Call Stack  ← đang chạy code đồng bộ, từng hàm một
      ▲
 Event Loop  ← khi Stack trống, lấy việc kế tiếp từ hàng đợi
      ▲
 Hàng đợi    ← callback của timer, sự kiện, ... chờ đến lượt
```

1. Code đồng bộ chạy hết trên **Call Stack**.
2. Timer hết giờ → callback được xếp vào **hàng đợi**.
3. **Event Loop** thấy Stack trống thì đưa callback lên chạy.

Vì thế `setTimeout(fn, 1000)` nghĩa là "**ít nhất** 1 giây sau", không phải chính xác.

## Callback và "callback hell"

Khi việc sau phụ thuộc kết quả việc trước, callback lồng nhau thành tháp khó đọc:

```javascript
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getItems(orders[0], (items) => {
      console.log(items);          // 😵 tháp lồng nhau
    });
  });
});
```

Hai bài sau giới thiệu **Promise** và **async/await**: cách viết phẳng, dễ đọc và xử lý lỗi gọn hơn nhiều.

## Mẹo

- `setTimeout(fn, 0)` thường dùng để "để trình duyệt vẽ xong rồi chạy".
- Với hiệu ứng theo khung hình, dùng `requestAnimationFrame` thay vì `setInterval`.
- Có thể truyền đối số cho callback: `setTimeout(greet, 500, "Lexi")`.
