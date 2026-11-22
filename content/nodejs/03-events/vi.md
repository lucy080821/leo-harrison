# EventEmitter: lập trình theo sự kiện

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Rất nhiều thứ trong Node (server HTTP, luồng dữ liệu, tiến trình) hoạt động theo **sự kiện**: "khi X xảy ra, hãy làm Y". Lớp `EventEmitter` là nền tảng của mô hình đó.

```javascript
const EventEmitter = require("events");
const bus = new EventEmitter();

bus.on("tin-nhan", (nguoi, noiDung) => { ... });  // đăng ký
bus.emit("tin-nhan", "An", "Chào!");              // phát sự kiện
bus.once("xong", fn);                              // chỉ chạy lần đầu
bus.off("tin-nhan", handler);                      // hủy đăng ký
```

- `on(tên, hàmXửLý)`: lắng nghe. Có thể đăng ký **nhiều** hàm cho một sự kiện.
- `emit(tên, ...đốiSố)`: gọi **đồng bộ** mọi hàm đã đăng ký, theo thứ tự.
- Sự kiện đặc biệt `"error"`: nếu emit mà không ai lắng nghe, Node ném lỗi.

## Kế thừa EventEmitter

```javascript
class Downloader extends EventEmitter {
  start() { this.emit("progress", 50); this.emit("done"); }
}
```

Cách này cho đối tượng của bạn "nói chuyện" với phần còn lại của chương trình mà không phụ thuộc lẫn nhau.

![EventEmitter: emit gọi mọi listener đã đăng ký bằng on](/lessons/nodejs/03-events-fig-vi.svg)
*EventEmitter: emit gọi mọi listener đã đăng ký bằng on*

