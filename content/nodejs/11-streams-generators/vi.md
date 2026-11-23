# Stream và xử lý dữ liệu lớn bằng async generator

> **Lưu ý:** trong trình duyệt không có Node thật, nên Learn With Leo chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Đọc một tệp CSV 5 GB bằng `fs.readFileSync` sẽ **nạp hết vào RAM** và sập. **Stream** xử lý dữ liệu **từng mảnh**: bộ nhớ dùng gần như không đổi dù dữ liệu lớn cỡ nào.

## Bốn loại stream của Node

| Loại | Ví dụ |
|---|---|
| **Readable** | `fs.createReadStream`, yêu cầu HTTP đến |
| **Writable** | `fs.createWriteStream`, phản hồi HTTP |
| **Duplex** | socket TCP |
| **Transform** | `zlib.createGzip()`, bộ phân tích tuỳ chỉnh |

```js
import { pipeline } from 'node:stream/promises'
await pipeline(
  fs.createReadStream('big.csv'),
  zlib.createGzip(),
  fs.createWriteStream('big.csv.gz'),
)
```

`pipeline` nối các stream, **dọn dẹp** và **lan truyền lỗi** đúng cách (tốt hơn nhiều so với `.pipe()` thủ công).



![Stream xử lý từng mảnh nên bộ nhớ gần như không đổi](/lessons/nodejs/11-streams-generators-fig-vi.svg)
*Stream xử lý từng mảnh nên bộ nhớ gần như không đổi*

## Áp suất ngược (backpressure)

Nếu bên đọc nhanh hơn bên ghi (đọc đĩa nhanh, gửi qua mạng chậm), dữ liệu **chất đống trong RAM**. Stream giải quyết bằng cách **tạm dừng nguồn** khi đích chưa kịp nhận. `pipeline` và `for await` xử lý tự động; viết tay `.write()` mà bỏ qua giá trị trả về là lỗi kinh điển.

## Async iterator: cách viết hiện đại

Stream Readable là **async iterable**; bạn viết như vòng lặp thường, và các bước biến đổi là **async generator**:

```js
for await (const chunk of fs.createReadStream('log.txt', 'utf8')) { ... }

async function* lines(chunks) { ... }      // Transform = generator
async function* batch(iter, size) { ... }  // gom lô để ghi CSDL từng nhóm
```

Bài này dùng async generator để bạn thấy **ý tưởng** ngay trong trình duyệt; mã tương đương chạy trên Node thật với stream thật.

## Cạm bẫy: mảnh không trùng ranh giới

Dữ liệu đến theo mảnh **tuỳ ý**: một dòng/ký tự nhiều byte/JSON có thể bị **cắt giữa hai mảnh**. Luôn giữ **phần dư** (`rest`) cho lần sau như ví dụ `lines()`.

## Khi nào dùng stream

- Tệp/tải lên/tải xuống **lớn hoặc không biết trước kích thước**.
- ETL, nén, mã hoá, xử lý log, truyền video.
- Với dữ liệu nhỏ (vài MB), `readFile` đơn giản hơn là đủ.

## Web Streams

Node cũng hỗ trợ **Web Streams** (`ReadableStream`) giống trình duyệt và `fetch`: `Readable.fromWeb`, `toWeb` để chuyển đổi.

## Nguồn tham khảo

- Node.js docs: `stream`, `stream/promises`, "Backpressuring in Streams".
- MDN: Async iterators and generators.
