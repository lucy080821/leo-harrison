# Giá trị, kiểu và tên

## Đối tượng, giá trị và kiểu

Tài liệu tham chiếu Python (*Data model*) nêu: **đối tượng (object)** là cách Python trừu tượng hoá dữ liệu; mọi dữ liệu trong chương trình Python đều được biểu diễn bằng đối tượng. Mỗi đối tượng có ba thuộc tính:

1. **Định danh (identity)**: không đổi suốt đời đối tượng (trong CPython, `id(x)` là địa chỉ bộ nhớ).
2. **Kiểu (type)**: quy định các thao tác được phép và các giá trị có thể có. Kiểu cũng không đổi.
3. **Giá trị (value)**: có thể đổi hay không tuỳ kiểu.

Đối tượng có giá trị **không đổi được** gọi là **bất biến (immutable)**: số, chuỗi, `tuple`. Đối tượng đổi được gọi là **khả biến (mutable)**: `list`, `dict`, `set`.

![Hai tên cùng trỏ vào một danh sách so với hai danh sách riêng](/lessons/foundations/03-values-types-names-names-vi.svg)
*Gán b = a chỉ thêm một tên; a.copy() mới tạo đối tượng thứ hai.*

## Biến thực chất là một cái tên

Trong Python, câu lệnh `x = 5` không "đặt 5 vào hộp x". Nó **gắn tên `x` vào đối tượng 5** (*name binding*). Nhiều tên có thể cùng chỉ vào một đối tượng:

```python
a = [1, 2, 3]
b = a        # không sao chép, chỉ thêm một tên
b.append(4)  # a cũng thấy 4, vì a và b là MỘT đối tượng
```

Đây là nguồn lỗi kinh điển của người mới học. Muốn bản sao độc lập thì tạo đối tượng mới: `a.copy()` hoặc `list(a)`.

## Kiểu và ép kiểu

Python là ngôn ngữ **định kiểu động (dynamically typed)**: kiểu gắn với *đối tượng* lúc chạy, không gắn với tên. Nhưng nó cũng **định kiểu mạnh**: `"5" + 5` báo lỗi thay vì tự đoán. Muốn chuyển, hãy ép kiểu rõ ràng: `int("5") + 5`.

## Thử ngay

Chạy ví dụ và quan sát `a is b`. Rồi làm bài tập về bản sao.

## Nguồn tham khảo

- Python Software Foundation. *The Python Language Reference*, §3 "Data model" và §4 "Execution model" (naming and binding), docs.python.org.
- MIT 6.0001, bài 2 "Branching and Iteration" và bài 3: biến, kiểu, ép kiểu.
- Ned Batchelder, *Facts and myths about Python names and values* (PyCon 2015), bài nói và bài viết mô tả mô hình "tên → đối tượng".
