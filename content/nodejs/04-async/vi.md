# Bất đồng bộ: callback, Promise, async/await

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Node chạy **một luồng** nhưng vẫn xử lý được hàng nghìn yêu cầu nhờ **event loop**: khi gặp việc chờ (đọc file, gọi mạng, hẹn giờ), nó đăng ký "gọi tôi khi xong" rồi đi làm việc khác.

## Ba thế hệ cú pháp

```javascript
// 1. Callback (cũ, dễ rối thành "callback hell")
fs.readFile("a.txt", "utf8", (err, data) => { if (err) return ...; ... });

// 2. Promise
fs.promises.readFile("a.txt", "utf8").then(...).catch(...);

// 3. async/await (nên dùng) — đọc như code đồng bộ
async function main() {
  try {
    const data = await fs.promises.readFile("a.txt", "utf8");
  } catch (err) {
    console.error(err.message);
  }
}
```

![Callback hell so với async/await](/lessons/nodejs/04-async-fig-vi.svg)
*Callback hell so với async/await*

## Hẹn giờ

```javascript
const { setTimeout: sleep } = require("timers/promises");
await sleep(1000);                 // chờ 1 giây
```

## Chạy song song

`await` lần lượt thì **chậm**. Việc độc lập thì chạy cùng lúc:

```javascript
const [users, posts] = await Promise.all([getUsers(), getPosts()]);
```

## Quy tắc vàng

- Hàm `async` luôn trả về Promise.
- Đừng quên `await` — thiếu nó bạn nhận về Promise thay vì giá trị.
- Luôn xử lý lỗi (`try/catch` hoặc `.catch`) để server không sập.
