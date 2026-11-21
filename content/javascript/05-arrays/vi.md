# Mảng (Array)

**Mảng** là danh sách có thứ tự các giá trị. Chỉ số (index) **bắt đầu từ 0**.

```javascript
const fruits = ["táo", "cam", "xoài"];
fruits[0];            // "táo"
fruits.length;        // 3
fruits[fruits.length - 1];   // "xoài" (phần tử cuối)
fruits.at(-1);        // "xoài" (cách viết gọn)
```

## Thêm, bớt phần tử

| Phương thức | Tác dụng | Đổi mảng gốc? |
|---|---|---|
| `push(x)` / `pop()` | Thêm / bỏ ở **cuối** | Có |
| `unshift(x)` / `shift()` | Thêm / bỏ ở **đầu** | Có |
| `splice(i, n)` | Xoá `n` phần tử từ vị trí `i` | Có |
| `slice(a, b)` | Lấy bản sao từ `a` đến trước `b` | **Không** |
| `concat`, `[...a, ...b]` | Nối mảng | Không |

## Tìm kiếm

```javascript
nums.includes(3);              // true/false
nums.indexOf(3);               // vị trí, hoặc -1 nếu không có
nums.find(n => n > 6);         // phần tử đầu tiên thoả điều kiện (hoặc undefined)
nums.findIndex(n => n > 6);    // vị trí của nó
nums.some(n => n > 6);         // có ít nhất một phần tử thoả?
nums.every(n => n > 0);        // mọi phần tử đều thoả?
```

## Ba hàm "biến đổi" quan trọng nhất

Cả ba **không sửa mảng gốc**, trả về kết quả mới.

```javascript
const nums = [1, 2, 3, 4];

nums.map(n => n * 2);              // [2, 4, 6, 8]    biến đổi từng phần tử
nums.filter(n => n % 2 === 0);     // [2, 4]          giữ lại phần tử thoả
nums.reduce((tong, n) => tong + n, 0);  // 10          gộp cả mảng thành MỘT giá trị
```

`reduce(hàm, giá trị đầu)`: ở mỗi bước, `tong` là kết quả tích luỹ đến lúc đó. Tính tổng: $0+1=1,\ 1+2=3,\ 3+3=6,\ 6+4=10$.

Các hàm này **nối chuỗi** được:

```javascript
nums.filter(n => n % 2 === 0).map(n => n * n);   // [4, 16]
```

## Sắp xếp

```javascript
const a = [10, 9, 1];
a.sort();                       // [1, 10, 9] ← SAI! mặc định so sánh như chuỗi
a.sort((x, y) => x - y);        // [1, 9, 10] tăng dần
a.sort((x, y) => y - x);        // giảm dần
```

`sort` **thay đổi mảng gốc**. Để giữ nguyên bản gốc, sao chép trước: `[...a].sort(...)` hoặc `a.toSorted(...)`.

## Duyệt mảng

```javascript
for (const item of fruits) console.log(item);
fruits.forEach((item, i) => console.log(i, item));
```

## Sao chép và "tham chiếu"

```javascript
const a = [1, 2];
const b = a;          // b và a là CÙNG một mảng
b.push(3);            // a cũng thành [1, 2, 3]!
const c = [...a];     // c là bản sao độc lập
```
