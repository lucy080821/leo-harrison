# Xử lý ngoại lệ

Khi có lỗi lúc chạy, Python **ném ngoại lệ** (exception) và dừng chương trình. Bạn có thể **bắt** ngoại lệ để xử lý êm đẹp thay vì sập.

## try / except

```python
try:
    n = int(input_text)           # đoạn có thể lỗi
except ValueError:                # chạy NẾU gặp ValueError
    print("Không phải số hợp lệ")
```

Nếu không có lỗi, khối `except` bị bỏ qua.

## Các ngoại lệ thường gặp

| Ngoại lệ | Khi nào |
|---|---|
| `ValueError` | Giá trị sai: `int("abc")` |
| `TypeError` | Sai kiểu: `"a" + 1` |
| `KeyError` | Khoá không có trong từ điển: `d["x"]` |
| `IndexError` | Chỉ số ngoài phạm vi: `[1, 2][5]` |
| `ZeroDivisionError` | Chia cho 0 |
| `FileNotFoundError` | Mở file không tồn tại |
| `AttributeError` | Đối tượng không có thuộc tính đó |
| `NameError` | Dùng biến chưa khai báo |

## Bắt nhiều loại, lấy thông báo

```python
try:
    result = 10 / int(text)
except ValueError:
    print("không phải số")
except ZeroDivisionError:
    print("không chia được cho 0")
except Exception as e:                # bắt mọi ngoại lệ còn lại, kèm đối tượng lỗi
    print("lỗi khác:", e)
```

> Chỉ bắt đúng loại lỗi bạn **biết cách xử lý**. `except:` trống hoặc `except Exception` bắt tất cả sẽ **giấu lỗi thật** và khó gỡ. Đừng "nuốt lỗi" trong im lặng.

## else và finally

```python
try:
    f = open("data.txt", encoding="utf-8")
except FileNotFoundError:
    print("không có file")
else:
    print("mở thành công")      # chỉ chạy khi KHÔNG có lỗi
    f.close()
finally:
    print("luôn chạy")           # dọn dẹp, dù có lỗi hay không
```

(Với file, tốt nhất dùng `with open(...)`, nó tự dọn dẹp.)

## Ném ngoại lệ với raise

```python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Insufficient funds")
    return balance - amount

try:
    withdraw(100, 500)
except ValueError as e:
    print(e)                     # Insufficient funds
```

`raise` giúp hàm **báo lỗi rõ ràng** thay vì trả kết quả sai lặng lẽ.

## Ngoại lệ tự định nghĩa

```python
class InsufficientFunds(Exception):
    pass

raise InsufficientFunds("Cần thêm 400")
```

## EAFP: xin lỗi dễ hơn xin phép

Văn hoá Python ưu tiên "**cứ thử rồi bắt lỗi**" hơn là kiểm tra trước:

```python
# LBYL (nhìn trước khi nhảy)
if "age" in data:
    age = data["age"]

# EAFP (xin lỗi dễ hơn xin phép): phong cách Python
try:
    age = data["age"]
except KeyError:
    age = None
```

(Với từ điển, ngắn nhất là `data.get("age")`.)

## Đọc traceback

```text
Traceback (most recent call last):
  File "<exec>", line 5, in <module>
  File "<exec>", line 2, in withdraw
ValueError: Insufficient funds
```

Đọc **từ dưới lên**: dòng cuối là loại lỗi và thông báo; các dòng trên là chuỗi lời gọi dẫn tới lỗi.
