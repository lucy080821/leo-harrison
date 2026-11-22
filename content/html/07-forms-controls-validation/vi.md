# Biểu mẫu (2): lựa chọn và kiểm tra dữ liệu

## Danh sách thả xuống

```html
<label for="city">Thành phố</label>
<select id="city" name="city">
  <option value="">-- Chọn --</option>
  <option value="hn">Hà Nội</option>
  <option value="sg" selected>TP.HCM</option>
</select>
```

- `value` của `<option>` là dữ liệu được gửi đi; chữ bên trong là phần người dùng thấy.
- `selected` chọn sẵn một mục.

![Các điều khiển biểu mẫu và thuộc tính kiểm tra hợp lệ](/lessons/html/07-forms-controls-validation-fig-vi.svg)
*Các điều khiển biểu mẫu và thuộc tính kiểm tra hợp lệ*

## Radio: chọn một

Các radio thuộc cùng một nhóm khi có **cùng `name`**. Trong nhóm chỉ chọn được một.

```html
<label><input type="radio" name="level" value="easy" /> Dễ</label>
<label><input type="radio" name="level" value="hard" /> Khó</label>
```

## Checkbox: chọn nhiều

```html
<label><input type="checkbox" name="agree" /> Tôi đồng ý</label>
```

Mỗi checkbox độc lập; thêm `checked` để tick sẵn.

## Nhiều dòng

```html
<textarea name="msg" rows="4" cols="40"></textarea>
```

## Gom nhóm

```html
<fieldset>
  <legend>Thông tin liên hệ</legend>
  ...
</fieldset>
```

## Kiểm tra dữ liệu có sẵn của HTML5

Trình duyệt tự chặn form không hợp lệ và hiện thông báo nếu bạn dùng các thuộc tính sau:

| Thuộc tính | Ý nghĩa |
|---|---|
| `required` | Bắt buộc nhập |
| `minlength`, `maxlength` | Độ dài chữ tối thiểu, tối đa |
| `min`, `max` | Giá trị nhỏ nhất, lớn nhất (`number`, `date`) |
| `pattern` | Biểu thức chính quy; ví dụ `pattern="[0-9]{10}"` cho 10 chữ số |
| `type="email"` | Phải đúng dạng email |

```html
<input type="text" name="phone" pattern="[0-9]{10}" required />
```

> Kiểm tra ở trình duyệt chỉ để tiện cho người dùng. Server **luôn phải kiểm tra lại**, vì ai cũng có thể bỏ qua kiểm tra phía trình duyệt.
