# Danh sách (list)

**Danh sách** là tập hợp **có thứ tự** và **có thể thay đổi** các phần tử, có thể thuộc nhiều kiểu khác nhau. Đây là cấu trúc dữ liệu bạn dùng nhiều nhất.

```python
nums = [5, 3, 8, 1]
mixed = [1, "hai", 3.0, True]
empty = []
```

## Chỉ số và cắt lát

Giống chuỗi: chỉ số từ **0**, số âm đếm từ cuối, cắt lát `[a:b:bước]`.

```python
nums = [5, 3, 8, 1]
nums[0]        # 5
nums[-1]       # 1
nums[1:3]      # [3, 8]
nums[::-1]     # [1, 8, 3, 5]
len(nums)      # 4
```

Khác chuỗi, danh sách **sửa được**: `nums[0] = 99`.

![Danh sách: chỉ số và cắt lát](/lessons/python-basics/07-lists-fig-vi.svg)
*Danh sách: chỉ số và cắt lát*

## Thêm, bớt phần tử

| Phương thức | Tác dụng |
|---|---|
| `append(x)` | Thêm `x` vào **cuối** |
| `insert(i, x)` | Chèn `x` vào vị trí `i` |
| `extend(list2)` | Nối thêm cả danh sách khác |
| `remove(x)` | Xoá phần tử **đầu tiên** bằng `x` |
| `pop()` / `pop(i)` | Lấy ra và xoá phần tử cuối / ở vị trí `i` |
| `del nums[i]` | Xoá theo chỉ số |
| `clear()` | Xoá hết |

```python
nums.append(10)
nums.extend([7, 7])
nums.remove(7)
last = nums.pop()
```

## Tìm kiếm và đếm

```python
3 in nums           # True/False
nums.index(8)       # vị trí của 8 (lỗi nếu không có)
nums.count(7)       # đếm số lần xuất hiện
min(nums), max(nums), sum(nums)
```

## Sắp xếp

```python
nums.sort()                      # sắp TẠI CHỖ, trả về None (!)
nums.sort(reverse=True)          # giảm dần
sorted(nums)                     # trả về BẢN SAO đã sắp, giữ nguyên nums
sorted(words, key=len)           # sắp theo độ dài
```

> Bẫy kinh điển: `nums = nums.sort()` làm `nums` thành `None`, vì `sort()` sửa tại chỗ và không trả về gì.

## Danh sách là đối tượng "tham chiếu"

```python
a = [1, 2]
b = a             # b và a là CÙNG một danh sách
b.append(3)
print(a)          # [1, 2, 3] ← a cũng đổi!

c = a.copy()      # hoặc a[:] hoặc list(a): bản sao độc lập
c.append(4)
print(a)          # [1, 2, 3] không đổi
```

Danh sách lồng nhau cần sao chép sâu: `import copy; copy.deepcopy(x)`.

## Danh sách lồng nhau (ma trận)

```python
grid = [[1, 2, 3],
        [4, 5, 6]]
print(grid[1][2])        # 6
for row in grid:
    print(row)
```

## Một số mẫu hay dùng

```python
total = sum(nums)
average = sum(nums) / len(nums)
top3 = sorted(nums, reverse=True)[:3]
" ".join(["a", "b", "c"])        # 'a b c'
list("abc")                      # ['a', 'b', 'c']
"a,b,c".split(",")               # ['a', 'b', 'c']
```
