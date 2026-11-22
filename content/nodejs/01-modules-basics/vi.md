# Node.js và module

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

**Node.js** là môi trường chạy JavaScript **ngoài trình duyệt** — dùng cho server, công cụ dòng lệnh, script tự động. Nó dùng cùng ngôn ngữ JavaScript bạn đã học, nhưng thay `window`/`document` bằng các module hệ thống: `fs` (file), `http` (mạng), `path`…

## Module

Mỗi file là một **module**. Xuất ra bằng `module.exports` hoặc `exports`, nhập vào bằng `require`:

```javascript
// math.js
exports.add = (a, b) => a + b;

// app.js
const math = require("./math");
console.log(math.add(2, 3));
```

(Node cũng hỗ trợ `import`/`export` kiểu ES module khi file là `.mjs` hoặc `"type": "module"`.)

![require/import nạp module; module.exports xuất ra](/lessons/nodejs/01-modules-basics-fig-vi.svg)
*require/import nạp module; module.exports xuất ra*

## Đối tượng toàn cục

- `process`: thông tin tiến trình — `process.env` (biến môi trường), `process.argv` (tham số), `process.exit()`.
- `Buffer`: dữ liệu nhị phân thô. `Buffer.from("hi").toString("hex")` → `6869`.
- `__dirname`, `__filename`: thư mục/đường dẫn file hiện tại.

## Chạy ngoài máy

```bash
node app.js
```
