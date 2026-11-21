# Từ điển (dict)

**Từ điển** lưu các cặp **khoá → giá trị**, giúp tra cứu theo khoá rất nhanh. Đây là cách tự nhiên để biểu diễn "một thứ có nhiều thuộc tính".

```python
student = {
    "name": "An",
    "age": 20,
    "scores": [8, 9, 7],
}
```

- **Khoá** phải bất biến và băm được (chuỗi, số, tuple), và **không trùng**.
- **Giá trị** có thể là gì cũng được, kể cả danh sách hay từ điển khác.
- Từ Python 3.7, từ điển **giữ thứ tự thêm vào**.

## Truy cập, thêm, sửa, xoá

```python
student["name"]                 # 'An'
student["email"]                # KeyError! khoá không tồn tại
student.get("email")            # None, không lỗi
student.get("email", "chưa có") # giá trị mặc định

student["city"] = "Hanoi"       # thêm khoá mới
student["age"] = 21             # sửa khoá có sẵn
del student["city"]             # xoá
student.pop("age")              # lấy ra và xoá
"name" in student               # kiểm tra có khoá không → True
```

## Duyệt từ điển

```python
for key in student:                      # mặc định duyệt KHOÁ
    print(key)
for value in student.values():           # duyệt GIÁ TRỊ
    print(value)
for key, value in student.items():       # duyệt cả cặp: dùng nhiều nhất
    print(key, "->", value)
```

## Đếm tần suất: mẫu kinh điển

```python
counts = {}
for w in "the cat and the hat".split():
    counts[w] = counts.get(w, 0) + 1
# {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}
```

`counts.get(w, 0)` lấy số đếm hiện có (hoặc 0 nếu chưa có) rồi cộng 1. Có sẵn công cụ gọn hơn: `collections.Counter` và `collections.defaultdict` (bài Module).

## Các thao tác hay dùng

```python
len(d)                           # số cặp
list(d.keys()), list(d.values())
d.update({"a": 1, "b": 2})       # gộp từ điển khác vào
merged = d1 | d2                 # gộp thành từ điển mới (Python 3.9+)
max(scores, key=scores.get)      # KHOÁ có giá trị lớn nhất
sorted(scores.items(), key=lambda kv: kv[1], reverse=True)   # sắp theo giá trị
```

## Từ điển lồng nhau

```python
users = {
    "an":   {"age": 20, "city": "Hanoi"},
    "binh": {"age": 22, "city": "Hue"},
}
print(users["an"]["city"])       # Hanoi
```

Đây cũng chính là cấu trúc của **JSON**, định dạng dữ liệu của web: từ điển Python và JSON gần như giống hệt nhau (module `json` chuyển qua lại).

## Dict comprehension

```python
squares = {n: n ** 2 for n in range(1, 5)}     # {1: 1, 2: 4, 3: 9, 4: 16}
```

## Khi nào dùng dict?

Mỗi khi bạn thấy mình muốn **tra cứu theo tên/id** thay vì theo vị trí: bảng giá, cấu hình, đếm tần suất, nhóm dữ liệu theo khoá, bộ nhớ đệm (cache).
