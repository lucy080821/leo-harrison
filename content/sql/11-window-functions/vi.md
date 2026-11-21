# Window function

`GROUP BY` **gộp** nhiều dòng thành một. **Window function** thì khác: nó tính toán **dựa trên nhóm dòng liên quan** nhưng **vẫn giữ nguyên từng dòng**. Đây là công cụ quan trọng bậc nhất của người phân tích dữ liệu.

## Cú pháp

```sql
hàm(...) OVER (
  PARTITION BY cột_nhóm      -- chia thành "cửa sổ" (tuỳ chọn)
  ORDER BY cột_sắp_xếp       -- thứ tự trong cửa sổ (tuỳ chọn)
)
```

## Xếp hạng

```sql
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;
```

| Hàm | Hành vi khi đồng điểm (lương 2300, 2300) |
|---|---|
| `ROW_NUMBER()` | Số thứ tự **duy nhất**: 6, 7 |
| `RANK()` | **Đồng hạng, bỏ số**: 6, 6, rồi 8 |
| `DENSE_RANK()` | **Đồng hạng, không bỏ số**: 6, 6, rồi 7 |

## PARTITION BY: chia cửa sổ

Giống `GROUP BY` nhưng **không gộp dòng**:

```sql
SELECT name, department_id, salary,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;
```

Hạng được tính **lại từ 1 trong mỗi phòng ban**.

**Top N mỗi nhóm** (mẫu rất hay gặp): bọc vào CTE rồi lọc:

```sql
WITH ranked AS (
  SELECT name, department_id, salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT * FROM ranked WHERE rn <= 2;         -- 2 người lương cao nhất mỗi phòng
```

(Không thể lọc `WHERE rn <= 2` ngay trong cùng `SELECT` vì window function tính sau `WHERE`.)

## Hàm tổng hợp dạng cửa sổ

```sql
SELECT name, salary,
  SUM(salary) OVER ()                               AS total_payroll,
  salary * 100.0 / SUM(salary) OVER ()              AS pct_of_total,
  AVG(salary) OVER (PARTITION BY department_id)     AS dept_avg
FROM employees;
```

`OVER ()` rỗng nghĩa là cửa sổ là **toàn bộ bảng**.

**Tổng tích luỹ** (running total):

```sql
SELECT id, salary,
  SUM(salary) OVER (ORDER BY id) AS running_total
FROM employees;
```

## Nhìn dòng trước/sau: LAG và LEAD

```sql
SELECT id, name, hire_date,
  LAG(name)  OVER (ORDER BY hire_date) AS hired_before_me,
  LEAD(name) OVER (ORDER BY hire_date) AS hired_after_me
FROM employees;
```

Rất hữu ích để so sánh với **kỳ trước** (tăng trưởng theo tháng): `doanh_thu - LAG(doanh_thu) OVER (ORDER BY thang)`.

## Tóm tắt

| | `GROUP BY` | Window function |
|---|---|---|
| Số dòng kết quả | Một dòng mỗi nhóm | **Giữ nguyên** số dòng |
| Dùng khi | Báo cáo tổng hợp | Xếp hạng, tỷ lệ, tích luỹ, so kỳ trước |
