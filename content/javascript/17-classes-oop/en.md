# Classes and object-oriented programming

A **class** is a "mould" for creating many **objects** with the same structure and behaviour. For example a `User` class creates thousands of users, each with their own name but all knowing how to `login()`.

## Declaring a class

```javascript
class Animal {
  constructor(name) {          // runs when you call new
    this.name = name;          // a property of each object
  }
  speak() {                    // a method (shared by all objects)
    return `${this.name} makes a sound`;
  }
}

const cat = new Animal("Cat");   // create an "instance"
cat.speak();                     // "Cat makes a sound"
```

- `constructor` initialises the object; `this` is the object being created/called on.
- You must use `new` to create objects.

![A class is a blueprint, objects are instances built from it](/lessons/javascript/17-classes-oop-fig-en.svg)
*A class is a blueprint, objects are instances built from it*

## Inheritance with extends and super

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name);                 // REQUIRED before using this: runs the parent's constructor
    this.breed = breed;
  }
  speak() {                      // override
    return `${this.name} barks`;
  }
  describe() {
    return `${super.speak()} - but actually it barks`;   // call the parent's method
  }
}

const rex = new Dog("Rex", "Husky");
rex instanceof Dog;      // true
rex instanceof Animal;   // true
```

`Dog` **inherits** everything from `Animal` and adds or changes what it needs.

## Getters, setters and static

```javascript
class Circle {
  static PI = 3.14159;             // belongs to the CLASS, not to objects
  constructor(r) { this.r = r; }

  get area() {                     // read like a property: circle.area
    return Circle.PI * this.r ** 2;
  }
  static unit() { return new Circle(1); }   // call: Circle.unit()
}
```

The area is computed as $A = \pi r^2$.

## Private fields

Add `#` before the name so it's usable only inside the class:

```javascript
class Account {
  #balance = 0;
  deposit(n) { this.#balance += n; }
  get balance() { return this.#balance; }
}
```

## `this` and arrow functions

`this` depends on **how a function is called**. Detaching a method from its object loses `this`:

```javascript
const speak = cat.speak;
speak();                // error: this is undefined
```

Fixes: `btn.addEventListener("click", () => cat.speak())` (an arrow keeps the `this` of where it's written) or `cat.speak.bind(cat)`.

## When to use classes?

Classes fit when you have **many objects of the same kind** carrying both **data and behaviour**. They aren't always needed: functions and plain objects solve many problems. Modern React also prefers functions over classes.

> `class` is really neat syntax over **prototypes**, JavaScript's original inheritance mechanism. Understanding prototypes will help you debug deeper later.
