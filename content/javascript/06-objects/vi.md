# Đối tượng (Object)

**Đối tượng** là tập hợp các cặp **khoá: giá trị**, dùng để mô tả một "thực thể": người dùng, sản phẩm, cấu hình...

```javascript
const person = {
  name: "Lexi",
  age: 20,
  skills: ["HTML", "CSS"],          // giá trị có thể là mảng, đối tượng khác
  address: { city: "Hà Nội" },
  greet() {                         // hàm trong đối tượng gọi là PHƯƠNG THỨC
    return `Xin chào, tôi là ${this.name}`;
  },
};
```

## Truy cập và sửa

```javascript
person.name;               // "Lexi"       dấu chấm
person["name"];            // "Lexi"       ngoặc vuông (khoá động, khoá có dấu cách)
person.address.city;       // "Hà Nội"
person.age = 21;           // sửa
person.email = "a@b.c";    // thêm
delete person.email;       // xoá
"age" in person;           // true        kiểm tra có khoá
```

> `const` chỉ cấm **gán lại biến**, không cấm sửa **bên trong** đối tượng.

## `this` trong phương thức

Khi gọi `person.greet()`, `this` là `person`. Vì vậy `this.name` là `"Lexi"`. Hãy dùng cú pháp phương thức `greet() {}`, **không** dùng arrow function cho phương thức vì arrow không có `this` riêng.

## Duyệt đối tượng

```javascript
Object.keys(person);      // ["name", "age", ...]     mảng khoá
Object.values(person);    // mảng giá trị
Object.entries(person);   // [["name","Lexi"], ...]   mảng cặp [khoá, giá trị]

for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}
```

## Destructuring và spread

```javascript
const { name, age } = person;             // lấy thuộc tính ra biến
const { name: fullName } = person;        // đổi tên biến
const { city = "Không rõ" } = person;     // giá trị mặc định

const copy = { ...person };                // sao chép nông (shallow)
const merged = { ...user, ...updates };    // gộp; bên PHẢI ghi đè bên trái
```

## Tham chiếu và sao chép

Đối tượng được **truyền theo tham chiếu**: `const b = a` làm `a` và `b` trỏ vào **cùng** một đối tượng. Spread chỉ sao chép **tầng ngoài**; đối tượng lồng bên trong vẫn dùng chung. Để sao chép sâu dùng `structuredClone(obj)`.

## Optional chaining

```javascript
person.address?.city;        // nếu address không tồn tại → undefined thay vì lỗi
person.getAge?.();           // chỉ gọi nếu hàm tồn tại
```
