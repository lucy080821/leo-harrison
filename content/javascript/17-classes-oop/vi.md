# Lớp (Class) và lập trình hướng đối tượng

**Lớp** là "khuôn" để tạo nhiều **đối tượng** cùng cấu trúc và hành vi. Ví dụ lớp `User` tạo ra hàng nghìn người dùng, mỗi người có tên riêng nhưng cùng biết `login()`.

## Khai báo lớp

```javascript
class Animal {
  constructor(name) {          // chạy khi gọi new
    this.name = name;          // thuộc tính của từng đối tượng
  }
  speak() {                    // phương thức (dùng chung cho mọi đối tượng)
    return `${this.name} makes a sound`;
  }
}

const cat = new Animal("Cat");   // tạo một "thể hiện" (instance)
cat.speak();                     // "Cat makes a sound"
```

- `constructor` khởi tạo đối tượng; `this` là đối tượng đang được tạo/đang gọi.
- Phải dùng `new` để tạo đối tượng.

![Lớp là bản thiết kế, đối tượng là thực thể tạo từ lớp](/lessons/javascript/17-classes-oop-fig-vi.svg)
*Lớp là bản thiết kế, đối tượng là thực thể tạo từ lớp*

## Kế thừa với extends và super

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name);                 // BẮT BUỘC gọi trước khi dùng this: chạy constructor của lớp cha
    this.breed = breed;
  }
  speak() {                      // ghi đè (override)
    return `${this.name} barks`;
  }
  describe() {
    return `${super.speak()} - but actually it barks`;   // gọi phương thức của cha
  }
}

const rex = new Dog("Rex", "Husky");
rex instanceof Dog;      // true
rex instanceof Animal;   // true
```

`Dog` **thừa hưởng** mọi thứ của `Animal` và thêm hoặc thay đổi những gì cần.

## Getter, setter và static

```javascript
class Circle {
  static PI = 3.14159;             // thuộc về LỚP, không phải đối tượng
  constructor(r) { this.r = r; }

  get area() {                     // đọc như thuộc tính: circle.area
    return Circle.PI * this.r ** 2;
  }
  static unit() { return new Circle(1); }   // gọi: Circle.unit()
}
```

Diện tích tính bằng $A = \pi r^2$.

## Thuộc tính riêng tư

Thêm `#` trước tên để chỉ dùng được bên trong lớp:

```javascript
class Account {
  #balance = 0;
  deposit(n) { this.#balance += n; }
  get balance() { return this.#balance; }
}
```

## `this` và arrow function

`this` phụ thuộc **cách gọi hàm**. Tách một phương thức ra khỏi đối tượng sẽ làm mất `this`:

```javascript
const speak = cat.speak;
speak();                // lỗi: this là undefined
```

Cách xử lý: `btn.addEventListener("click", () => cat.speak())` (arrow giữ `this` của nơi viết) hoặc `cat.speak.bind(cat)`.

## Khi nào dùng class?

Class hợp khi bạn có **nhiều đối tượng cùng loại** mang cả **dữ liệu lẫn hành vi**. Không phải lúc nào cũng cần: hàm và đối tượng thường đã đủ cho nhiều bài toán. React hiện đại cũng ưu tiên hàm hơn lớp.

> `class` thực chất là cú pháp gọn trên **prototype**, cơ chế kế thừa gốc của JavaScript. Hiểu được prototype sẽ giúp bạn gỡ lỗi sâu hơn sau này.
