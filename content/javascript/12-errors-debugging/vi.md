# Xử lý lỗi và gỡ lỗi

Lỗi là chuyện **bình thường** khi lập trình. Bài này dạy cách **xử lý** lỗi khi chạy và cách **tìm** lỗi khi viết code.

## Các loại lỗi

| Loại | Ví dụ | Khi nào phát hiện |
|---|---|---|
| **Cú pháp** (`SyntaxError`) | Thiếu ngoặc, sai từ khoá | Trước khi chạy |
| **Thời gian chạy** (`TypeError`, `ReferenceError`...) | Gọi hàm trên `undefined`, dùng biến chưa khai báo | Khi đang chạy |
| **Logic** | Kết quả sai nhưng không báo lỗi | Bạn phải tự phát hiện |

![try / catch / finally: luồng xử lý lỗi](/lessons/javascript/12-errors-debugging-fig-vi.svg)
*try / catch / finally: luồng xử lý lỗi*

## try / catch / finally

```javascript
try {
  const data = JSON.parse(text);    // đoạn có thể lỗi
  use(data);
} catch (error) {                   // chạy NẾU có lỗi ném ra
  console.log(error.name, error.message);
} finally {                         // LUÔN chạy, dù lỗi hay không
  hideSpinner();
}
```

`catch` không cần tham số nếu bạn không dùng: `catch { ... }`. Chỉ bọc `try` quanh đoạn **có thể lỗi thật** (phân tích JSON, gọi mạng), không bọc cả chương trình.

## Ném lỗi với throw

```javascript
function divide(a, b) {
  if (b === 0) throw new Error("Không thể chia cho 0");
  return a / b;
}
```

- Luôn ném đối tượng `Error` (có `name`, `message`, `stack`), **không** ném chuỗi.
- Có các lớp con: `TypeError`, `RangeError`... và bạn có thể tự tạo: `class ValidationError extends Error {}`.
- Lỗi **nổi lên** qua các hàm gọi nhau cho tới khi gặp một `catch`. Nếu không ai bắt, chương trình dừng và lỗi hiện trong console.

## Các lỗi thường gặp và cách đọc

| Thông báo | Nghĩa thường là |
|---|---|
| `x is not defined` | Gõ sai tên biến hoặc quên khai báo |
| `Cannot read properties of undefined (reading 'name')` | Biến là `undefined`/`null` nhưng bạn lấy `.name` |
| `x is not a function` | Gọi thứ không phải hàm (sai tên, sai kiểu) |
| `Unexpected token` | Lỗi cú pháp: dấu ngoặc, dấu phẩy... |

Đọc **dòng đầu** của thông báo và **số dòng** đi kèm.

## Kỹ năng gỡ lỗi

1. **`console.log`** giá trị nghi ngờ: in `typeof x`, in cả đối tượng. Khung Console bên phải hiện cả lỗi màu đỏ.
2. **Thu hẹp vấn đề:** comment bớt code hoặc tách ra ví dụ nhỏ nhất vẫn gây lỗi.
3. **DevTools** (F12): tab *Sources* cho phép đặt **breakpoint** để dừng chương trình và xem từng biến; lệnh `debugger;` trong code cũng dừng ở đó.
4. **Đọc kỹ thông báo lỗi**: nó thường nói thẳng chuyện gì sai.
5. **Giải thích cho "vịt cao su"**: nói to từng dòng code làm gì, bạn sẽ tự thấy chỗ sai.

> Đừng "nuốt lỗi" bằng `catch {}` rỗng: bạn sẽ không bao giờ biết vì sao chương trình hỏng. Ít nhất hãy `console.error(e)`.
