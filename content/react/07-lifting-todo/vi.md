# Nâng state và bài Todo

## Nâng state lên (lifting state up)

Khi hai component cần **cùng một dữ liệu**, đặt state ở **cha chung** gần nhất rồi truyền xuống qua props. Con báo thay đổi lên cha qua hàm (callback).

```jsx
function Parent() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  );
}
```

Luồng dữ liệu của React luôn **đi xuống** (props), sự kiện **đi lên** (callback).

## Quy trình xây một app React

1. Chia giao diện thành các component.
2. Tìm dữ liệu nào thay đổi → đó là state.
3. Đặt state ở component cha thấp nhất mà cần nó.
4. Truyền dữ liệu xuống, hàm cập nhật xuống.

## Cập nhật mảng bất biến

| Việc | Cách |
|---|---|
| Thêm | `[...list, item]` |
| Xóa | `list.filter((x) => x.id !== id)` |
| Sửa | `list.map((x) => x.id === id ? {...x, done: true} : x)` |

Giá trị dẫn xuất (như số việc còn lại) **không cần state** — tính từ state có sẵn.
