# File, JSON và CSV

Chương trình thật cần **lưu và đọc dữ liệu**. Bài này dạy ba việc: file văn bản, JSON và CSV.

> Trong khung thực hành, "file" nằm trong **hệ file ảo tạm thời** của trình duyệt (mất khi tải lại trang). Trên máy bạn, code giống hệt nhưng file được lưu thật vào đĩa.

## Mở file với `with`

```python
with open("notes.txt", "w", encoding="utf-8") as f:    # "w": ghi (xoá nội dung cũ)
    f.write("dòng 1\n")
    f.write("dòng 2\n")

with open("notes.txt", encoding="utf-8") as f:         # mặc định "r": đọc
    content = f.read()
```

- **`with`** tự động **đóng file** khi ra khỏi khối, kể cả khi có lỗi. Luôn dùng nó.
- Luôn ghi rõ `encoding="utf-8"` để tiếng Việt không bị lỗi.

| Chế độ | Ý nghĩa |
|---|---|
| `"r"` | Đọc (mặc định); lỗi nếu file chưa có |
| `"w"` | Ghi, **xoá sạch** nội dung cũ |
| `"a"` | Ghi **nối tiếp** vào cuối |
| `"x"` | Tạo mới, lỗi nếu đã tồn tại |

![Đọc/ghi tệp bằng with open(...)](/lessons/python-basics/13-files-json-csv-fig-vi.svg)
*Đọc/ghi tệp bằng with open(...)*

## Các cách đọc

```python
with open("notes.txt", encoding="utf-8") as f:
    text = f.read()               # toàn bộ thành MỘT chuỗi
with open("notes.txt", encoding="utf-8") as f:
    lines = f.read().splitlines() # danh sách các dòng (đã bỏ \n)
with open("notes.txt", encoding="utf-8") as f:
    for line in f:                # từng dòng một: tiết kiệm bộ nhớ với file lớn
        print(line.strip())
```

## Đường dẫn với pathlib

```python
from pathlib import Path
p = Path("data") / "notes.txt"        # ghép đường dẫn đúng chuẩn mọi hệ điều hành
p.exists(); p.read_text(encoding="utf-8"); p.write_text("xin chào", encoding="utf-8")
```

## JSON

**JSON** là định dạng văn bản để trao đổi dữ liệu (API web, cấu hình). Python ↔ JSON:

| Python | JSON |
|---|---|
| `dict` | object `{}` |
| `list`, `tuple` | array `[]` |
| `str`, `int`, `float` | string, number |
| `True`, `False`, `None` | `true`, `false`, `null` |

```python
import json

text = json.dumps({"name": "An", "scores": [8, 9]}, ensure_ascii=False, indent=2)  # dict -> chuỗi
data = json.loads(text)                                                            # chuỗi -> dict

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)       # ghi thẳng ra file
with open("data.json", encoding="utf-8") as f:
    data = json.load(f)                          # đọc thẳng từ file
```

Nhớ: `dumps`/`loads` làm việc với **chuỗi** (s = string), `dump`/`load` với **file**.

## CSV

**CSV** là bảng dạng văn bản, mỗi dòng một bản ghi, các cột cách nhau dấu phẩy.

```python
import csv

with open("scores.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):          # mỗi dòng thành một dict theo tên cột
        print(row["name"], int(row["score"]))   # NHỚ: mọi giá trị đọc ra là CHUỖI

with open("out.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "score"])
    writer.writerow(["An", 8])
```

> Với bảng dữ liệu lớn và phân tích thống kê, người ta dùng **pandas** (`pd.read_csv`), đã nằm trong khoá "Python cho Data Analyst".

## Bắt lỗi khi làm việc với file

```python
try:
    with open("khong_co.txt", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("File không tồn tại")
```

Chi tiết về `try/except` ở bài kế tiếp.
