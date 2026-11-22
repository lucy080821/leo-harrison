# REST API: CRUD với JSON

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

**REST** là quy ước thiết kế API quanh **tài nguyên** (todos, users, orders…) và các phương thức HTTP. Bốn thao tác cơ bản gọi là **CRUD**:

| Việc | Phương thức | Đường dẫn | Thành công |
|---|---|---|---|
| Liệt kê | GET | `/todos` | 200 |
| Xem một | GET | `/todos/:id` | 200 / 404 |
| Tạo | POST | `/todos` | **201** |
| Sửa | PUT / PATCH | `/todos/:id` | 200 |
| Xóa | DELETE | `/todos/:id` | 204 (không nội dung) |

## Đọc body JSON

```javascript
app.use(express.json());           // đặt TRƯỚC các route
app.post("/todos", (req, res) => {
  const { title } = req.body;
  ...
});
```

![REST CRUD: phương thức HTTP tương ứng thao tác dữ liệu](/lessons/nodejs/08-rest-crud-fig-vi.svg)
*REST CRUD: phương thức HTTP tương ứng thao tác dữ liệu*

## Mẫu một route CRUD

```javascript
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json(todo);
});
```

## Nguyên tắc thiết kế

- Danh từ số nhiều cho đường dẫn (`/todos`), **không** dùng động từ (`/getTodos`).
- Dùng đúng mã trạng thái: 201 khi tạo, 404 khi không có, 400 khi dữ liệu sai.
- Luôn trả JSON có cấu trúc nhất quán, kể cả lỗi.

Dữ liệu ở đây lưu trong mảng nên mất khi server khởi động lại. Thực tế bạn sẽ thay bằng cơ sở dữ liệu (xem khóa SQL).
