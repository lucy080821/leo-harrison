# Văn bản và kiểu phân loại trong pandas

Dữ liệu thực có rất nhiều **văn bản**: tên, địa chỉ, bình luận, mã sản phẩm. pandas xử lý **cả cột một lần** (vector hoá) bằng accessor `.str`, không cần vòng lặp.

## Các phương thức `.str` hay dùng

| Việc | Ví dụ |
|---|---|
| chuẩn hoá | `s.str.strip().str.lower()` |
| tìm | `s.str.contains("battery", case=False)` |
| thay | `s.str.replace(r"\s+", " ", regex=True)` |
| tách | `s.str.split("-", expand=True)` (ra nhiều cột) |
| trích mẫu | `s.str.extract(r"(\d+)")` (regex có nhóm) |
| độ dài, bắt đầu/kết thúc | `s.str.len()`, `s.str.startswith("A")` |

`NaN` được bỏ qua tự nhiên; thêm `na=False` cho `contains` để khỏi ra `NaN` trong mặt nạ lọc.

![Truy cập .str biến đổi cả cột văn bản](/lessons/python-data/15-strings-categories-fig-vi.svg)
*Truy cập .str biến đổi cả cột văn bản*

## Kiểu `category`

Cột có ít giá trị lặp (kênh, quốc gia, trạng thái) nên đổi sang `category`: lưu **mã số nguyên** cùng danh sách giá trị, **tiết kiệm bộ nhớ** và nhanh hơn khi nhóm. Có thể đặt **thứ tự** (`pd.Categorical(..., ordered=True)`) cho dữ liệu thứ bậc như "thấp < vừa < cao" để sắp xếp và so sánh đúng.

## Thói quen nghề nghiệp

- **Chuẩn hoá trước khi nối bảng**: `str.strip().str.lower()` trên khoá nối để tránh lệch do hoa/thường và khoảng trắng.
- Dùng **regex** để trích mã từ chuỗi lộn xộn, và kiểm tra lại bằng `value_counts()`.
- Đừng dùng `apply` với hàm Python khi đã có phương thức `.str` (chậm hơn nhiều).

## Nguồn tham khảo

- pandas documentation, "Working with text data" và "Categorical data", pandas.pydata.org.
- McKinney, W. *Python for Data Analysis* (3rd ed., O'Reilly), chương 7.
- Python documentation, module `re`.
