> **Lưu ý:** Next.js cần Node.js và một máy chủ nên **không chạy được trong trình duyệt**. Ở đây bạn luyện các **ý tưởng cốt lõi** bằng React và JavaScript thật (bên phải); mỗi bài có phần **chạy trên máy bạn** bằng `npx create-next-app@latest`.

# Server Actions: biến form thành lời gọi máy chủ

Trước đây, lưu dữ liệu từ form cần: viết API, `fetch` từ client, xử lý loading/lỗi bằng tay. **Server Function** (thường gọi là **Server Action** khi dùng cho form/mutation) cho phép **gọi hàm chạy trên máy chủ trực tiếp từ giao diện**.

## Khai báo

```js
// app/actions.js
'use server'

export async function createPost(prevState, formData) {
  const title = formData.get('title')
  // ghi CSDL ...
}
```

Chỉ thị `'use server'` ở đầu tệp (hoặc đầu hàm async) đánh dấu hàm chạy trên máy chủ. Có thể dùng trong **Server Components** và **Client Components** (import từ tệp `'use server'`).

![Form gọi hàm chạy trên máy chủ; kiểm tra quyền nằm trong chính hàm](/lessons/nextjs/07-server-actions-fig-vi.svg)
*Form gọi hàm chạy trên máy chủ; kiểm tra quyền nằm trong chính hàm*

## Gọi từ form

```jsx
<form action={createPost}>
  <input name="title" />
  <button>Tạo</button>
</form>
```

Form hoạt động **ngay cả khi JavaScript chưa tải** (tăng cường dần, progressive enhancement). Bên dưới là yêu cầu `POST`; Next.js trả về cả **giao diện mới** và **dữ liệu mới** trong một lượt.

## Lỗi dự kiến: trả như giá trị

Lỗi *dự kiến* (kiểm tra hợp lệ thất bại, API trả 4xx) **không nên `throw`**: trả về object và hiển thị bằng `useActionState`:

```jsx
'use client'
const [state, formAction, pending] = useActionState(createPost, { message: '' })
<form action={formAction}>
  ...
  {state?.message && <p aria-live="polite">{state.message}</p>}
  <button disabled={pending}>Tạo</button>
</form>
```

`pending` cho phép vô hiệu hoá nút khi đang gửi. Lỗi **không dự kiến** (bug) mới được `throw` để rơi vào `error.js`.

## Sau khi thay đổi dữ liệu

Cập nhật cache và điều hướng: `updateTag('posts')`/`revalidatePath('/posts')` rồi `redirect('/posts/' + id)` (bài 8).

## Bảo mật: Server Action là điểm cuối công khai

> Server Functions truy cập được bằng **POST trực tiếp**, không chỉ qua giao diện của bạn. **Luôn kiểm tra xác thực và phân quyền bên trong mỗi Server Function.** (tài liệu Next.js)

Danh sách việc cần làm trong **mọi** action:

1. **Xác thực**: có phiên hợp lệ không?
2. **Phân quyền**: người này có được làm việc này trên **tài nguyên này** không (đừng chỉ ẩn nút)?
3. **Kiểm tra dữ liệu** vào (schema như Zod); không tin `formData`.
4. Giới hạn tần suất với thao tác nhạy cảm.

## Chạy thử trên máy bạn

```bash
npx create-next-app@latest
```

Tạo `app/actions.js` với `'use server'`, một form dùng `action={createPost}`, và quan sát yêu cầu POST trong tab Network.

## Nguồn tham khảo

- Next.js docs: "Mutating Data" và "Error Handling" (nextjs.org/docs).
- React docs: `'use server'`, `useActionState` (react.dev).
- OWASP: Authorization Cheat Sheet.
