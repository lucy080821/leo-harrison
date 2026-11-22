# Tạo và thay đổi phần tử DOM

Bài trước bạn chọn và sửa phần tử **có sẵn**. Bài này bạn **tạo phần tử mới** và thay đổi cấu trúc trang.

## Tạo và gắn phần tử

```javascript
const li = document.createElement("li");   // 1. tạo (chưa hiện trên trang)
li.textContent = "Bình";                    // 2. cấu hình
list.appendChild(li);                       // 3. gắn vào cây DOM → hiện ra
```

| Phương thức | Tác dụng |
|---|---|
| `parent.appendChild(el)` / `parent.append(el)` | Thêm vào **cuối** cha |
| `parent.prepend(el)` | Thêm vào **đầu** cha |
| `ref.before(el)` / `ref.after(el)` | Chèn trước / sau phần tử khác |
| `el.remove()` | Xoá khỏi trang |
| `el.cloneNode(true)` | Sao chép (kèm con) |
| `parent.replaceChildren()` | Xoá mọi con |

![Cây DOM và thao tác tạo, thêm phần tử](/lessons/javascript/09-dom-manipulation-fig-vi.svg)
*Cây DOM và thao tác tạo, thêm phần tử*

## classList: làm việc với class

```javascript
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");       // có thì bỏ, chưa có thì thêm
el.classList.contains("active");     // true/false
```

Cách làm đúng: **JavaScript chỉ bật/tắt class, CSS lo hình thức**. Ví dụ `body.dark { ... }` trong CSS, còn JS gọi `classList.toggle("dark")`.

## Style, thuộc tính và dataset

```javascript
el.style.backgroundColor = "tomato";   // thuộc tính CSS viết camelCase
el.setAttribute("aria-pressed", "true");
el.dataset.id = "42";                   // → thuộc tính data-id="42"
el.hidden = true;                       // ẩn phần tử
```

## Dựng danh sách từ dữ liệu

Mẫu cực kỳ phổ biến: có **mảng dữ liệu** → tạo **phần tử cho mỗi mục**:

```javascript
function render(items) {
  list.replaceChildren();              // xoá cũ
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
}
```

## Cẩn thận với `innerHTML`

```javascript
list.innerHTML = names.map(n => `<li>${n}</li>`).join("");   // ngắn nhưng...
```

Cách này gọn nhưng nếu `n` chứa `<script>` hoặc `<img onerror=...>` từ người dùng thì thành lỗ hổng **XSS**. Với dữ liệu không tin cậy, hãy dùng `createElement` + `textContent`.

## Hiệu năng

Mỗi lần thao tác DOM tốn kém. Khi thêm hàng trăm phần tử, hãy dựng hết rồi gắn **một lần** (ví dụ dùng `DocumentFragment` hoặc `append(...nhiều)`).
