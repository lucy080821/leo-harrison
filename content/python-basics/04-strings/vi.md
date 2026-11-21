# Chuỗi (string)

Chuỗi là **dãy ký tự**, rất hay dùng trong mọi chương trình.

## Tạo chuỗi

```python
a = "dấu nháy kép"
b = 'dấu nháy đơn'
c = "Anh ấy nói: 'chào'"          # nháy này bên trong nháy kia
d = '''Chuỗi
nhiều dòng'''                     # ba nháy cho nhiều dòng
```

Ký tự đặc biệt dùng `\`: `\n` xuống dòng, `\t` tab, `\"` nháy kép, `\\` dấu gạch chéo ngược.

## Chỉ số và cắt lát (slicing)

Chỉ số bắt đầu từ **0**, và số **âm** đếm từ cuối.

```text
 p   y   t   h   o   n
 0   1   2   3   4   5     (chỉ số dương)
-6  -5  -4  -3  -2  -1     (chỉ số âm)
```

```python
word = "python"
word[0]        # 'p'
word[-1]       # 'n'
word[1:4]      # 'yth'      từ chỉ số 1 đến TRƯỚC 4
word[:3]       # 'pyt'      3 ký tự đầu
word[3:]       # 'hon'      từ chỉ số 3 đến hết
word[::2]      # 'pto'      cách một ký tự
word[::-1]     # 'nohtyp'   đảo ngược
```

Cú pháp `[bắt_đầu : kết_thúc : bước]`, kết thúc **không** được tính.

> Chuỗi **bất biến**: `word[0] = "P"` gây lỗi. Muốn "sửa", tạo chuỗi mới: `"P" + word[1:]`.

## Các phương thức thường dùng

| Phương thức | Ví dụ → kết quả |
|---|---|
| `s.upper()`, `s.lower()`, `s.title()` | `"hi".upper()` → `'HI'` |
| `s.strip()` | Bỏ khoảng trắng hai đầu |
| `s.split(sep)` | `"a,b".split(",")` → `['a','b']` (không `sep` thì tách theo khoảng trắng) |
| `sep.join(list)` | `"-".join(["a","b"])` → `'a-b'` |
| `s.replace(a, b)` | `"hello".replace("l","L")` → `'heLLo'` |
| `s.find(sub)` | Vị trí đầu tiên, hoặc `-1` |
| `s.startswith(x)`, `s.endswith(x)` | `True`/`False` |
| `s.count(sub)` | Đếm số lần xuất hiện |
| `s.isdigit()`, `s.isalpha()` | Kiểm tra loại ký tự |

```python
len("python")            # 6
"th" in "python"         # True
"ab" * 3                 # 'ababab'
"Xin " + "chào"          # 'Xin chào'
```

Phương thức **trả về chuỗi mới**, không sửa chuỗi cũ: `s.upper()` không đổi `s`.

## Định dạng

```python
name, score = "An", 8.456
print(f"{name} đạt {score:.1f} điểm")     # An đạt 8.5 điểm
print(f"{name:>10}|{score:<8.2f}|")        # canh phải / trái, độ rộng
print("{} có {} điểm".format(name, 8))     # cách cũ, vẫn gặp trong code cũ
```

## Duyệt chuỗi

```python
for ch in "abc":
    print(ch)
```

## Kiểm tra palindrome (đối xứng)

```python
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]
```

Mẫu "đảo ngược rồi so sánh" bằng `[::-1]` là một cách làm rất đặc trưng Python.
