# Vector hoá và hiệu năng: tránh vòng lặp và apply

Khi bảng có hàng triệu dòng, cách bạn viết code quyết định chạy **giây** hay chạy **giờ**. Quy tắc số một của pandas/NumPy: **hãy làm việc trên cả cột, đừng lặp từng dòng.**

## Vì sao vector hoá nhanh

Vòng lặp Python xử lý từng phần tử trong trình thông dịch (chậm). **Vector hoá** đẩy vòng lặp vào mã C đã biên dịch của NumPy, chạy trên khối bộ nhớ liền nhau, thường nhanh hơn **10 đến 100 lần**.

| Chậm | Nhanh |
|---|---|
| `for` qua từng dòng | `df["a"] * df["b"]` |
| `df.apply(f, axis=1)` | phép toán cột, `np.where`, `np.select` |
| `if/else` từng dòng | `np.where(cond, x, y)`, `np.select([c1, c2], [v1, v2], default)` |
| `iterrows()` | `.str`, `.dt`, phép toán cột |

![Vector hoá nhanh hơn vòng lặp hàng chục lần](/lessons/python-data/18-vectorization-performance-fig-vi.svg)
*Vector hoá nhanh hơn vòng lặp hàng chục lần*

## Khi vẫn cần `apply`

Logic quá phức tạp không viết được bằng thao tác cột: dùng `apply`/hàm tự viết, nhưng nhớ nó **chậm**. Cân nhắc `numba` hoặc viết lại bằng phép toán cột.

## Kiểu dữ liệu và bộ nhớ

- `astype("int16")`, `astype("float32")` giảm một nửa/bốn lần bộ nhớ khi giá trị đủ nhỏ.
- `category` cho cột ít giá trị lặp.
- Đọc CSV lớn theo **khối** (`chunksize`) hoặc chỉ cột cần (`usecols`).

## `query` và `eval`

`df.query("region == 'North' and units >= 10")` dễ đọc hơn mặt nạ lồng nhau; với bảng rất lớn có thể nhanh hơn nhờ tối ưu biểu thức.

## Đo trước khi tối ưu

Dùng `%timeit` (notebook) hoặc `time.perf_counter()`; tối ưu ở nơi **thật sự** chậm. Nhiều khi đọc dữ liệu hoặc gom nhóm mới là nút cổ chai, không phải phép tính.

## Nguồn tham khảo

- McKinney, W. *Python for Data Analysis*, chương về hiệu năng.
- NumPy documentation, "Broadcasting" và "Universal functions".
- VanderPlas, J. *Python Data Science Handbook*, chương "High-Performance Pandas: eval() and query()".
