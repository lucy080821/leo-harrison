# Thiết kế component: composition, children và compound components

React khuyến khích **kết hợp (composition)** thay vì **kế thừa**: xây component phức tạp bằng cách **ghép** component nhỏ.

## children: "lỗ trống" của component

```jsx
function Card({ title, children }) {
  return <div className="card"><h3>{title}</h3>{children}</div>;
}
<Card title="Xin chào"><p>Nội dung bất kỳ</p></Card>
```

`Card` không cần biết bên trong là gì ⇒ **tái sử dụng** cao. Đây cũng là cách thoát khỏi **prop drilling**: thay vì truyền props xuyên nhiều tầng, truyền *phần tử đã dựng sẵn* qua `children`.

![Compound components chia sẻ state qua Context](/lessons/react/13-composition-patterns-fig-vi.svg)
*Compound components chia sẻ state qua Context*

## Nhiều "lỗ": slot qua props

```jsx
<Layout header={<Nav />} sidebar={<Menu />}>{trang}</Layout>
```

Props không chỉ là chuỗi/số mà có thể là **JSX**.

## Compound components

Một nhóm component **phối hợp** qua state chung (Context), người dùng tự do sắp xếp:

```jsx
<Tabs defaultValue="a">
  <Tabs.Tab value="a">Một</Tabs.Tab>
  <Tabs.Panel value="a">…</Tabs.Panel>
</Tabs>
```

API gọn và linh hoạt hơn nhiều prop cấu hình (`tabs={[{label, content}]}`). Thư viện như **Radix UI**, **Headless UI**, **shadcn/ui** dùng mẫu này.

## Render props

Component nhận một **hàm trả về JSX** để chia sẻ *logic* và để người dùng quyết định *giao diện*:

```jsx
<Toggle render={(on, toggle) => <button onClick={toggle}>{on ? "Mở" : "Đóng"}</button>} />
```

Ngày nay **hook tự viết** thay thế phần lớn nhu cầu render props, nhưng mẫu này còn gặp (ví dụ `<Formik>`, `<Downshift>`).

## Khi nào chia component?

- Một phần JSX **lặp lại** hoặc **có state riêng**.
- Component dài hơn ~100–150 dòng hoặc làm nhiều việc.
- Cần **kiểm thử/tái sử dụng** riêng.

Đừng chia quá sớm: tách khi thực sự thấy lợi ích.

## Nguồn tham khảo

- react.dev: "Passing Props to a Component", "Thinking in React".
- Kent C. Dodds, "Compound Components"; Radix UI documentation.
