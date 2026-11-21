# Map, Set và cấu trúc dữ liệu

Ngoài mảng và đối tượng, JavaScript có `Set` và `Map` cho những bài toán mà mảng/đối tượng làm vụng về.

## Set: tập hợp không trùng

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
set.size;          // 3
set.has(2);        // true   (kiểm tra nhanh)
set.add(4);
set.delete(1);
[...set];          // [2, 3, 4]
```

- Mỗi giá trị chỉ xuất hiện **một lần**, tự bỏ trùng.
- Giữ **thứ tự thêm vào**.
- Mẹo loại trùng khỏi mảng: `[...new Set(arr)]`.
- Phép toán tập hợp: giao `[...a].filter(x => b.has(x))`, hợp `new Set([...a, ...b])`.

## Map: cặp khoá-giá trị với khoá bất kỳ

```javascript
const map = new Map();
map.set("a", 1).set("b", 2);
map.get("a");      // 1
map.has("c");      // false
map.delete("b");
map.size;          // 1

for (const [key, value] of map) console.log(key, value);
```

### Map khác Object ở đâu?

| | `Object` | `Map` |
|---|---|---|
| Khoá | Chuỗi hoặc Symbol | **Mọi kiểu** (đối tượng, hàm, số...) |
| Thứ tự duyệt | Phức tạp với khoá số | Luôn theo thứ tự thêm |
| Số phần tử | Phải `Object.keys(o).length` | `map.size` |
| Hiệu năng khi thêm/xoá nhiều | Kém hơn | Tốt hơn |
| Có khoá sẵn kế thừa (`toString`...) | Có thể gây nhầm | Không |

Dùng **Object** cho bản ghi có hình dạng cố định (như `{ name, age }`); dùng **Map** cho **từ điển** động, nhất là khi khoá không phải chuỗi.

## Đếm tần suất: mẫu rất hay gặp

```javascript
const words = "the cat and the dog".split(" ");
const freq = new Map();
for (const w of words) {
  freq.set(w, (freq.get(w) ?? 0) + 1);
}
// the → 2, cat → 1, and → 1, dog → 1
```

## Chuyển đổi qua lại

```javascript
Object.fromEntries(map);        // Map → Object
new Map(Object.entries(obj));   // Object → Map
Array.from(map.values());       // lấy giá trị thành mảng
```

## WeakMap và WeakSet

Giữ **tham chiếu yếu** tới đối tượng: khi đối tượng không còn ai dùng, nó được dọn khỏi bộ nhớ. Hay dùng để gắn dữ liệu phụ vào đối tượng mà không gây rò rỉ bộ nhớ.

## Chọn cấu trúc nào?

| Cần | Dùng |
|---|---|
| Danh sách có thứ tự, truy cập theo vị trí | **Array** |
| Bản ghi mô tả một thứ (tên, tuổi...) | **Object** |
| Tập giá trị **không trùng**, kiểm tra "có không?" nhanh | **Set** |
| Từ điển động, khoá bất kỳ, đếm | **Map** |

> Độ phức tạp: `set.has(x)` và `map.get(k)` gần như $O(1)$ (không phụ thuộc số phần tử), còn `array.includes(x)` là $O(n)$. Với dữ liệu lớn, đổi sang Set/Map giúp nhanh hơn rất nhiều.
