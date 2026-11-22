# File và đường dẫn: fs, path

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

## fs — làm việc với file

```javascript
const fs = require("fs");

fs.writeFileSync("a.txt", "nội dung");      // ghi (ghi đè)
fs.appendFileSync("a.txt", "thêm");         // nối thêm
const text = fs.readFileSync("a.txt", "utf8");
fs.existsSync("a.txt");                      // true/false
fs.mkdirSync("thu-muc", { recursive: true });
fs.readdirSync("thu-muc");                   // mảng tên file
fs.unlinkSync("a.txt");                      // xóa
```

Mỗi hàm có ba biến thể:

| Kiểu | Ví dụ | Đặc điểm |
|---|---|---|
| Đồng bộ | `readFileSync` | chặn cho đến khi xong, tiện cho script |
| Callback | `readFile(p, cb)` | không chặn, kiểu cũ |
| Promise | `fs.promises.readFile(p)` | không chặn, dùng với `await` |

Với server, ưu tiên bản **Promise** để không chặn các yêu cầu khác.

![path ghép đường dẫn; fs đọc và ghi tệp](/lessons/nodejs/02-fs-path-fig-vi.svg)
*path ghép đường dẫn; fs đọc và ghi tệp*

## path — ghép đường dẫn đúng chuẩn

Đừng nối chuỗi tay (`"a" + "/" + "b"`) vì Windows dùng `\`. Hãy để `path` lo:

```javascript
const path = require("path");
path.join("/data", "notes", "a.txt");   // /data/notes/a.txt
path.basename("/x/y/a.txt");            // a.txt
path.extname("a.tar.gz");               // .gz
path.dirname("/x/y/a.txt");             // /x/y
path.resolve("a", "b");                 // đường dẫn tuyệt đối
```
