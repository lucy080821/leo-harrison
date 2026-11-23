# Event loop và đồng thời: thứ tự thực thi và giới hạn song song

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Node chạy JavaScript trên **một luồng chính**, vậy mà phục vụ được hàng chục nghìn kết nối. Bí quyết là **event loop** cùng **I/O không chặn**. Hiểu nó giúp bạn tránh được lỗi hiệu năng đắt giá nhất của Node.

## Mô hình

1. Mã đồng bộ chạy hết trên **call stack**.
2. Thao tác chậm (đọc tệp, mạng, bộ đếm giờ) được **giao cho hệ điều hành/luồng nền**; xong thì đặt **callback** vào hàng đợi.
3. **Event loop** lấy callback từ hàng đợi ra chạy **khi stack rỗng**.

![Đồng bộ chạy trước, rồi microtask, rồi macrotask](/lessons/nodejs/20-event-loop-concurrency-fig-vi.svg)
*Đồng bộ chạy trước, rồi microtask, rồi macrotask*

## Thứ tự: microtask trước macrotask

| Hàng đợi | Gồm | Khi chạy |
|---|---|---|
| **Đồng bộ** | mã đang chạy | ngay |
| **`process.nextTick`** | ưu tiên cao nhất | sau tác vụ hiện tại |
| **Microtask** | `Promise.then`, `await`, `queueMicrotask` | **hết** microtask trước khi sang bước sau |
| **Macrotask** | `setTimeout`, `setInterval`, `setImmediate`, I/O | mỗi vòng lặp một phần |

Vì thế `Promise.then` chạy **trước** `setTimeout(…, 0)`. Lạm dụng đệ quy microtask có thể **bỏ đói** I/O.



## Điều tối kỵ: chặn event loop

Một tác vụ **đồng bộ nặng** làm **mọi người dùng khác chờ**:

- `readFileSync`/`JSON.parse` tệp khổng lồ trong route.
- Vòng lặp tính toán dài (băm bằng tay, nén, xử lý ảnh).
- Biểu thức chính quy **bùng nổ** (ReDoS).

Cách xử lý: dùng phiên bản **bất đồng bộ**, **stream** (bài 11), chia việc nhỏ, hoặc chuyển sang **Worker Threads** (luồng riêng, chia sẻ bộ nhớ) cho việc nặng CPU; **cluster**/nhiều tiến trình (PM2, Kubernetes) để dùng nhiều lõi.

## Đồng thời có kiểm soát

`Promise.all` trên 10.000 phần tử **bắn 10.000 yêu cầu cùng lúc**: làm quá tải CSDL, API, hay vượt giới hạn tệp mở. Dùng **giới hạn đồng thời** (`p-limit`, `p-map`, hoặc tự viết bằng "worker" lấy chỉ số kế tiếp như bài này):

```js
const results = await mapLimit(urls, 5, (u) => fetch(u))   // tối đa 5 cùng lúc
```

Kết hợp với **timeout** (`AbortSignal.timeout(5000)`) và **thử lại có backoff** cho các cuộc gọi ngoài.

## I/O-bound và CPU-bound

| Loại | Ví dụ | Hợp với |
|---|---|---|
| **I/O-bound** (chờ) | API, CSDL, tệp | Node tuyệt vời (async) |
| **CPU-bound** (tính) | mã hoá, ảnh, ML | Worker Threads, dịch vụ riêng, hoặc ngôn ngữ khác |

## Gỡ lỗi

Đo **độ trễ event loop** (`perf_hooks.monitorEventLoopDelay`); nếu tăng đột biến, có thứ đang chặn. Dùng `node --cpu-prof`/`clinic` để tìm hàm nóng.

## Nguồn tham khảo

- Node.js docs: "The Node.js Event Loop, Timers, and process.nextTick()", `worker_threads`, "Don't Block the Event Loop".
- Jake Archibald: "Tasks, microtasks, queues and schedules".
