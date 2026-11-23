# Buffer và mã hoá: hex, base64 và nhị phân

> **Lưu ý:** trong trình duyệt không có Node thật, nên Learn With Leo chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Máy tính lưu và truyền **byte**, không phải "chữ". Mỗi khi đọc tệp, nhận dữ liệu mạng, làm việc với ảnh, mã hoá, bạn đang xử lý **byte**. Trong Node, `Buffer` là đối tượng giữ một dãy byte.

## Ký tự khác byte

Văn bản được mã hoá thành byte bằng một **bảng mã**; chuẩn hiện nay là **UTF-8**: ký tự Latin cơ bản 1 byte, chữ có dấu tiếng Việt 2-3 byte, emoji 4 byte.

```js
"Việt".length               // 4 ký tự
Buffer.byteLength("Việt")   // 6 byte
```

Hệ quả thực tế: giới hạn kích thước (cột CSDL, tải lên, tiêu đề HTTP) tính theo **byte**; cắt chuỗi theo byte có thể **làm hỏng ký tự** ở giữa.



![Cùng một dãy byte, ba cách viết thành chữ](/lessons/nodejs/10-buffer-encoding-fig-vi.svg)
*Cùng một dãy byte, ba cách viết thành chữ*

## Các cách biểu diễn byte dưới dạng chữ

| Mã hoá | Đặc điểm | Dùng cho |
|---|---|---|
| **hex** | 2 ký tự mỗi byte, dễ đọc | băm, ID, gỡ lỗi |
| **base64** | 4 ký tự cho 3 byte (+33% dung lượng) | nhúng ảnh (`data:` URL), email |
| **base64url** | thay `+ /` bằng `- _`, bỏ `=` | **JWT**, URL, tên tệp |

**Quan trọng:** base64 **không phải mã hoá bảo mật**. Ai cũng giải mã được ngay. Nó chỉ để chuyển byte qua kênh chỉ chấp nhận chữ.

## Thao tác thường dùng

```js
const b = Buffer.from("Node")             // từ chuỗi
Buffer.from("4e6f6465", "hex")            // từ hex
b.toString("base64")                       // sang base64
Buffer.concat([b1, b2])                    // nối
Buffer.alloc(16)                           // 16 byte 0
crypto.randomBytes(16).toString("hex")     // ngẫu nhiên an toàn (cho token)
```

## Cạm bẫy

- Nối chuỗi với Buffer (`"a" + buf`) tự gọi `toString()` UTF-8: làm hỏng dữ liệu **nhị phân**. Giữ ở dạng Buffer cho đến khi cần.
- Đọc tệp **không truyền mã hoá** cho Buffer (đúng), truyền `'utf8'` cho chuỗi.
- Với nhận dữ liệu từng mảnh, **ký tự nhiều byte có thể bị cắt** giữa hai mảnh: dùng `StringDecoder` hoặc gom Buffer rồi mới giải mã.
- Dùng `Buffer.alloc`, không dùng `new Buffer()` (cũ, không an toàn).

## Nguồn tham khảo

- Node.js docs: `Buffer`.
- RFC 4648 (Base16, Base32, Base64, base64url); RFC 3629 (UTF-8).
