# Module và thư viện chuẩn

Một **module** là một file Python chứa sẵn hàm, lớp và biến để bạn dùng lại. Python có **thư viện chuẩn** cực kỳ phong phú ("batteries included"): toán học, ngày giờ, file, mạng, JSON...

## Cách import

```python
import math                       # dùng: math.sqrt(16)
from math import sqrt, pi         # dùng thẳng: sqrt(16)
import math as m                  # đặt bí danh: m.sqrt(16)
from datetime import date, timedelta
```

- `import tên` giữ tên module làm tiền tố, **rõ ràng nhất**.
- Tránh `from module import *` vì làm lẫn tên.
- Gõ `dir(math)` để liệt kê nội dung, `help(math.sqrt)` để xem hướng dẫn.

## math: toán học

```python
import math
math.sqrt(144)        # 12.0
math.pi               # 3.141592653589793
math.floor(4.7)       # 4    làm tròn xuống
math.ceil(4.2)        # 5    làm tròn lên
math.log(100, 10)     # 2.0
math.sin(math.pi / 2) # 1.0
math.isclose(0.1 + 0.2, 0.3)   # True (so sánh số thực đúng cách)
```

## random: ngẫu nhiên

```python
import random
random.random()                  # số thực trong [0, 1)
random.randint(1, 6)             # số nguyên từ 1 đến 6 (gồm cả hai đầu)
random.choice(["a", "b", "c"])   # chọn một phần tử
random.shuffle(items)            # xáo trộn TẠI CHỖ
random.sample(range(100), 5)     # 5 số khác nhau
random.seed(42)                  # đặt hạt giống: kết quả lặp lại được (hữu ích khi thử nghiệm)
```

## datetime: ngày giờ

```python
from datetime import date, datetime, timedelta

d1 = date(2024, 2, 1)
d2 = date(2024, 3, 1)
(d2 - d1).days                       # 29
d1 + timedelta(days=30)              # cộng thêm 30 ngày
d1.strftime("%d/%m/%Y")              # '01/02/2024' (định dạng thành chuỗi)
datetime.strptime("21/11/2026", "%d/%m/%Y")   # chuỗi -> ngày
date.today(); datetime.now()
d1.weekday()                         # 0 = Thứ Hai ... 6 = Chủ nhật
```

Các mã định dạng chính: `%Y` năm 4 chữ số, `%m` tháng, `%d` ngày, `%H:%M:%S` giờ.

## collections: cấu trúc dữ liệu nâng cao

```python
from collections import Counter, defaultdict

Counter("banana")                              # Counter({'a': 3, 'n': 2, 'b': 1})
Counter(words).most_common(2)                  # 2 phần tử phổ biến nhất

groups = defaultdict(list)                     # khoá thiếu tự có danh sách rỗng
for name, city in [("An", "HN"), ("Binh", "HN"), ("Chi", "SG")]:
    groups[city].append(name)
# {'HN': ['An', 'Binh'], 'SG': ['Chi']}
```

## Một số module hay dùng khác

| Module | Làm gì |
|---|---|
| `json` | Đọc/ghi JSON |
| `csv` | Đọc/ghi file CSV |
| `os`, `pathlib` | Làm việc với file và thư mục |
| `re` | Biểu thức chính quy |
| `statistics` | `mean`, `median`, `stdev` |
| `itertools` | Công cụ lặp nâng cao |
| `time` | Đo thời gian chạy |

## Gói của bên thứ ba

Ngoài thư viện chuẩn, hàng trăm nghìn gói trên **PyPI** cài bằng `pip install tên_gói`, ví dụ `numpy`, `pandas`, `requests`. Trong khung thực hành này, các thư viện phổ biến như numpy và pandas tự được tải khi bạn `import` chúng (khoá Python cho Data Analyst).

## Tự viết module

File `helpers.py` có `def double(x): ...` thì file khác viết `import helpers` rồi gọi `helpers.double(2)`. Mỗi file Python tự nhiên là một module.
