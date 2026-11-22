# State và sự kiện

Biến thường **không** làm giao diện đổi. Để giao diện cập nhật khi dữ liệu đổi, React có **state**.

## useState

```jsx
const [count, setCount] = useState(0);
```

- `count`: giá trị hiện tại.
- `setCount`: hàm để **đổi** giá trị. Khi gọi, React **vẽ lại** component.
- `0`: giá trị khởi đầu.

![Vòng: sự kiện → setState → render lại](/lessons/react/03-state-events-fig-vi.svg)
*Vòng: sự kiện → setState → render lại*

## Sự kiện

Gắn hàm vào thuộc tính `onClick`, `onChange`, `onSubmit`…

```jsx
<button onClick={() => setCount(count + 1)}>+1</button>
```

Truyền **hàm**, đừng gọi nó: `onClick={handle}` hoặc `onClick={() => handle(5)}`, không phải `onClick={handle(5)}`.

## Cập nhật dựa trên giá trị cũ

Khi giá trị mới phụ thuộc giá trị cũ, dùng dạng hàm cho chắc:

```jsx
setCount((c) => c + 1);
```

## Không sửa state trực tiếp

Với mảng/đối tượng, tạo bản **mới**:

```jsx
setList([...list, newItem]);
setUser({ ...user, name: "Lexi" });
```
