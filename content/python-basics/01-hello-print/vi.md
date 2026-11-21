# Chương trình Python đầu tiên

**Python** là ngôn ngữ lập trình dễ đọc, dễ học, và cực kỳ phổ biến: phân tích dữ liệu, trí tuệ nhân tạo, tự động hoá, web, khoa học... Bạn sẽ đi từ con số 0, **không cần biết gì trước**.

> Khung bên phải chạy **Python thật** (qua WebAssembly) ngay trong trình duyệt. Lần đầu mất vài giây để tải Python, sau đó bạn gõ đến đâu, kết quả hiện đến đó.

## Lệnh print

`print()` in ra màn hình. Đây là cách bạn "nói chuyện" với chương trình và xem kết quả.

```python
print("Hello, Lexi!")        # in một chuỗi chữ
print("2 + 3 =", 2 + 3)      # in nhiều giá trị, cách nhau bằng dấu cách
```

- Chữ (chuỗi) nằm trong **dấu nháy**: `"..."` hoặc `'...'`.
- Số và phép tính **không** cần nháy: `2 + 3` được tính ra `5` trước khi in.
- Mỗi `print` mặc định **xuống dòng** sau khi in.

## Hai đối số hữu ích: sep và end

```python
print("Python", "is", "fun", sep="-")     # Python-is-fun   (sep: thứ tự ngăn cách)
print("Không xuống dòng", end=" ... ")     # end: thứ in ở cuối (mặc định là xuống dòng)
print("tiếp tục trên cùng dòng")
```

## Chú thích

Mọi thứ sau dấu `#` trên một dòng là **chú thích**: Python bỏ qua, dành cho con người đọc.

```python
# Dòng này là chú thích
print("Xin chào")   # chú thích cuối dòng cũng được
```

## Python quan tâm đến thụt lề

Khác nhiều ngôn ngữ dùng `{ }`, Python dùng **thụt lề** (4 dấu cách) để nhóm code. Đừng thụt lề tuỳ tiện:

```python
print("ổn")
    print("lỗi!")     # IndentationError: unexpected indent
```

## Đọc thông báo lỗi

Khi code sai, Python báo lỗi kèm **số dòng**. Ví dụ thiếu nháy đóng:

```python
print("Hello)
```

```text
SyntaxError: unterminated string literal (detected at line 1)
```

Hãy đọc **dòng cuối** của thông báo: nó nói **loại lỗi** và nguyên nhân. Khung kết quả sẽ hiện lỗi màu đỏ để bạn sửa ngay.

## Đặt tên và phong cách

- Python **phân biệt hoa thường**: `print` đúng, `Print` sai.
- Quy ước chung của cộng đồng gọi là **PEP 8**: 4 dấu cách thụt lề, tên biến viết thường `snake_case`.
- Có thể gõ `import this` để xem "Zen of Python", bộ nguyên tắc thiết kế của ngôn ngữ.

> **Về `input()`:** trong thực tế bạn dùng `input("Tên bạn? ")` để đọc dữ liệu người dùng gõ. Khung thực hành trong trình duyệt này không có bàn phím cho `input`, nên các bài tập dùng biến để gán sẵn giá trị.
