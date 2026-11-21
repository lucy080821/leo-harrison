# Thuộc tính, id/class và block/inline

## Thuộc tính toàn cục

Một số thuộc tính dùng được trên **mọi** thẻ:

| Thuộc tính | Tác dụng |
|---|---|
| `id` | Định danh **duy nhất** của phần tử trong trang |
| `class` | Nhóm phần tử để tạo kiểu; một phần tử có thể có nhiều class |
| `title` | Gợi ý hiện khi rê chuột |
| `hidden` | Ẩn phần tử |
| `lang` | Ngôn ngữ của phần tử |
| `data-*` | Dữ liệu riêng của bạn, ví dụ `data-id="42"` |

```html
<div id="intro" class="box highlight" title="Phần giới thiệu"></div>
```

`id` dùng làm đích của liên kết (`<a href="#intro">`) và để JavaScript tìm phần tử. `class` dùng để CSS nhắm vào nhiều phần tử cùng lúc.

## Thuộc tính `data-*`

Cho phép gắn dữ liệu tuỳ ý vào thẻ, JavaScript đọc được qua `element.dataset`:

```html
<button data-action="save" data-id="42">Lưu</button>
```

```javascript
button.dataset.action; // "save"
button.dataset.id;     // "42"
```

## Block và inline

- **Block**: chiếm cả chiều rộng, luôn bắt đầu dòng mới. Ví dụ `<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`.
- **Inline**: chỉ rộng bằng nội dung, nằm trong dòng chữ. Ví dụ `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`.

`<div>` là hộp chung kiểu block, `<span>` là hộp chung kiểu inline. Cả hai không có ý nghĩa riêng, chỉ để gom nhóm và tạo kiểu.

```html
<p>Từ <span class="hot">quan trọng</span> được tô sáng.</p>
```

> Quy tắc lồng thẻ: phần tử inline thường chứa chữ hoặc inline khác; **không** đặt block (`<div>`) vào trong `<p>`.
