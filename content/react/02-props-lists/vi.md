# Props và danh sách

## Props — dữ liệu đi vào component

**Props** (properties) là tham số của component. Chúng chỉ **đọc**, không sửa.

```jsx
function Badge({ text, color }) {
  return <span style={{ background: color }}>{text}</span>;
}

<Badge text="Mới" color="gold" />
```

Dùng destructuring `{ text, color }` cho gọn. Giá trị không phải chuỗi đặt trong `{}`: `<Counter start={5} />`.

## children

Nội dung đặt giữa hai thẻ là prop đặc biệt `children`:

```jsx
<Card title="Hi"><p>Nội dung</p></Card>
```

## Danh sách với map

Biến mảng thành các phần tử bằng `.map()`:

```jsx
<ul>{items.map((x) => <li key={x.id}>{x.name}</li>)}</ul>
```

**`key`** giúp React nhận ra phần tử nào là phần tử nào khi danh sách đổi. Dùng giá trị **ổn định và duy nhất** (id), tránh chỉ số mảng nếu danh sách có thể đổi thứ tự.
