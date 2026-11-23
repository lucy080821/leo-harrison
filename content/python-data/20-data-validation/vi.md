# Kiểm tra và xác thực dữ liệu bằng pandas

*Garbage in, garbage out.* Một phân tích đẹp trên dữ liệu bẩn vẫn sai. Người làm nghề dành **phần lớn thời gian cho dữ liệu**, và bắt đầu bằng **kiểm tra** có hệ thống.

## Danh sách kiểm tra

| Kiểm tra | Mã pandas |
|---|---|
| Kích thước, khoảng thời gian | `df.shape`, `df["d"].min()/.max()` |
| Kiểu dữ liệu | `df.dtypes`, `pd.to_datetime(..., errors="coerce")` |
| Thiếu | `df.isna().sum()` |
| Trùng lặp | `df.duplicated(subset=[...]).sum()` |
| Ngoài phạm vi | `(df["amount"] <= 0).sum()`, `df["age"].between(0, 120)` |
| Khoá ngoại / mồ côi | `~df["user_id"].isin(users["id"])` |
| Quy tắc nghiệp vụ | ngày mua phải sau ngày đăng ký |
| Tập giá trị hợp lệ | `set(df["status"]) <= {"new","paid","cancelled"}` |

![Danh sách kiểm tra chất lượng dữ liệu trước khi phân tích](/lessons/python-data/20-data-validation-fig-vi.svg)
*Danh sách kiểm tra chất lượng dữ liệu trước khi phân tích*

## Biến kiểm tra thành "hợp đồng" bằng `assert`

```python
assert df["id"].is_unique, "id bị trùng"
assert df["amount"].gt(0).all(), "có số tiền không dương"
```

Chạy ở đầu mỗi lần nạp dữ liệu: pipeline **dừng ngay** khi dữ liệu vi phạm, thay vì lặng lẽ cho ra báo cáo sai. Thư viện như **pandera** và **Great Expectations** làm việc này có cấu trúc.

## Xử lý khi phát hiện lỗi

1. **Điều tra nguyên nhân** (lỗi nhập? lỗi hệ thống?).
2. Quyết định: sửa, loại, hay giữ có ghi chú.
3. **Ghi lại** số dòng bị ảnh hưởng và lý do; thông báo cho chủ dữ liệu.
4. Không bao giờ **âm thầm xoá** dữ liệu.

## Nguồn tham khảo

- pandas documentation, "Duplicate labels", "Working with missing data".
- Wickham, H. (2014). Tidy Data. *Journal of Statistical Software* 59(10).
- Great Expectations, pandera: tài liệu chính thức.
