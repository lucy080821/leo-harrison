# Form thực tế: kiểm tra hợp lệ và lỗi từng trường

Form là nơi người dùng **mất kiên nhẫn nhất**. Form tốt nói rõ lỗi ở đâu, đúng lúc, và không chặn người dùng vô lý.

## State của form

Dùng **một object** cho toàn bộ giá trị thay vì mỗi trường một `useState`:

```jsx
const [values, setValues] = useState({ email: "", password: "" });
setValues({ ...values, [name]: e.target.value });
```

![Lỗi được dẫn xuất từ giá trị, chỉ hiện sau khi chạm vào ô](/lessons/react/10-forms-validation-fig-vi.svg)
*Lỗi được dẫn xuất từ giá trị, chỉ hiện sau khi chạm vào ô*

## Lỗi là dữ liệu DẪN XUẤT

Đừng lưu `errors` trong state rồi cố đồng bộ. **Tính từ `values`** mỗi lần render:

```jsx
const errors = validate(values);
const valid = Object.keys(errors).length === 0;
```

Luôn đúng, không bao giờ lệch (nguyên tắc "một nguồn sự thật").

## Khi nào hiện lỗi?

Hiện ngay khi vừa gõ ký tự đầu tiên rất khó chịu ("email không hợp lệ" khi mới gõ "a"). Mẫu thông dụng: ghi nhận trường nào đã **touched** (đã rời `onBlur`), chỉ hiện lỗi cho các trường đó, và hiện hết lỗi khi bấm **gửi**.

## Gửi form

```jsx
<form onSubmit={(e) => { e.preventDefault(); if (valid) submit(values); }}>
```

- `preventDefault()` chặn trình duyệt tải lại trang.
- Khi đang gửi: vô hiệu hoá nút, hiện "Đang gửi…" để chống bấm hai lần.
- Lỗi từ **máy chủ** (email đã tồn tại) cũng phải hiện ra cạnh trường tương ứng.

## Kiểm tra phía máy khách KHÔNG đủ

Người dùng (hoặc kẻ tấn công) có thể bỏ qua giao diện. **Luôn kiểm tra lại ở máy chủ.** Kiểm tra phía client chỉ để **trải nghiệm tốt hơn**.

## Thư viện

Form lớn: **React Hook Form** (ít render lại) + **Zod** (schema dùng chung cho client và server). Hiểu cách thủ công trước khi dùng.

## Nguồn tham khảo

- react.dev: "Reacting to Input with State", "Choosing the State Structure".
- React Hook Form và Zod documentation.
- MDN: Client-side form validation.
