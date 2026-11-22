# Bất đồng bộ (3): async/await và fetch

`async/await` là cách viết code bất đồng bộ **trông như đồng bộ**, xây trên Promise. Đây là cách phổ biến nhất ngày nay.

## Cú pháp

```javascript
async function getUserName(id) {
  const user = await fakeFetchUser(id);   // dừng tại đây ĐẾN KHI Promise xong
  return user.name;
}
```

- Từ khoá `async` trước hàm: hàm **luôn trả về một Promise**. `return x` thành Promise giải quyết ra `x`.
- `await` chỉ dùng **trong hàm `async`** (hoặc ở cấp cao nhất của module). Nó "tạm dừng" **hàm đó** (không phải cả trang) cho tới khi Promise xong và đưa ra **giá trị**.

Cùng một việc, so sánh hai cách:

```javascript
// Promise
getUser(1).then((u) => getOrders(u.id)).then((o) => console.log(o));

// async/await
const u = await getUser(1);
const o = await getOrders(u.id);
console.log(o);
```

![fetch + await: gửi request rồi đợi phản hồi JSON](/lessons/javascript/16-async-await-fetch-fig-vi.svg)
*fetch + await: gửi request rồi đợi phản hồi JSON*

## Xử lý lỗi bằng try/catch

Promise bị reject sẽ **ném lỗi** tại dòng `await`, nên bắt bằng `try/catch` quen thuộc:

```javascript
async function load(id) {
  try {
    const user = await fakeFetchUser(id);
    console.log(user.name);
  } catch (error) {
    console.log("Lỗi: " + error.message);
  }
}
```

## Chạy song song với Promise.all

`await` lần lượt khiến các việc chạy **nối đuôi**. Nếu chúng độc lập, hãy chạy cùng lúc:

```javascript
// Chậm: 50ms + 50ms = 100ms
const a = await fetchA();
const b = await fetchB();

// Nhanh: ~50ms
const [a2, b2] = await Promise.all([fetchA(), fetchB()]);
```

## fetch: gọi API thật

`fetch` trả về Promise của **response**; `response.json()` cũng trả về Promise.

```javascript
async function getTodo(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) {                       // fetch KHÔNG tự ném lỗi khi 404/500!
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();             // parse JSON
}
```

Gửi dữ liệu (POST):

```javascript
await fetch("/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Học async" }),
});
```

> **Lưu ý:** `fetch` chỉ reject khi **lỗi mạng**. Lỗi HTTP như 404/500 vẫn là response "thành công", nên luôn kiểm tra `response.ok`.
>
> Khung thực hành ở đây chạy trong sandbox cách ly và có thể bị chặn gọi mạng, vì vậy bài tập dùng `fakeFetchUser` giả lập. Bạn sẽ gọi API thật trong khoá Node.js và Next.js.

## Lỗi thường gặp

- Quên `await`: nhận về Promise thay vì giá trị (`[object Promise]`).
- Dùng `await` trong `forEach`: không đợi được. Hãy dùng `for...of` hoặc `Promise.all(arr.map(...))`.
- Không bắt lỗi: lỗi trong `async` không có `try/catch` trở thành "unhandled rejection".
