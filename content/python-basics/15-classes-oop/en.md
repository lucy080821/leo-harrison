# Classes and object-oriented programming

A **class** is a "mould" for creating many **objects** with the same structure and behaviour. A class bundles related **data** (attributes) and **actions** (methods) together.

## Defining a class

```python
class Rectangle:
    def __init__(self, width, height):     # the initializer, runs when creating an object
        self.width = width                  # an attribute of EACH object
        self.height = height

    def area(self):                         # a method
        return self.width * self.height

r = Rectangle(3, 4)       # create an object (an instance)
print(r.width)            # 3
print(r.area())           # 12
```

- **`__init__`** initializes the object; calling `Rectangle(3, 4)` runs it automatically.
- **`self`** is the very object being operated on, **always the first parameter** of a method. When you call `r.area()`, Python passes `r` into `self`.
- Class names conventionally use `PascalCase`.

## Objects are independent

```python
a = Rectangle(3, 4)
b = Rectangle(10, 2)
a.width = 99             # affects only a
print(b.width)           # still 10
```

## "Magic" (dunder) methods

Names shaped like `__xxx__` let objects blend into Python syntax:

```python
class Rectangle:
    ...
    def __str__(self):                      # for print() and str()
        return f"Rectangle({self.width}x{self.height})"
    def __eq__(self, other):                # enables ==
        return (self.width, self.height) == (other.width, other.height)
    def __lt__(self, other):                # enables comparison and sorting
        return self.area() < other.area()

print(Rectangle(3, 4))        # Rectangle(3x4)
```

## Inheritance

A subclass **inherits** everything from its parent and may **add or override**:

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)               # call the parent's __init__
        self.breed = breed
    def speak(self):                         # override
        return f"{self.name} barks"

d = Dog("Rex", "Husky")
print(d.speak())                 # Rex barks
isinstance(d, Animal)            # True
```

Inheritance is exactly why `Square(Rectangle)` reuses `Rectangle`'s `area()`.

## Computed attributes with @property

```python
class Circle:
    def __init__(self, r):
        self.r = r
    @property
    def area(self):                  # used like an attribute: c.area (no parentheses)
        return 3.14159 * self.r ** 2
```

## Class attributes and static methods

```python
class Counter:
    total = 0                        # an attribute of the CLASS, shared by all objects
    def __init__(self):
        Counter.total += 1
    @staticmethod
    def describe():
        return "Counts the objects"
    @classmethod
    def create(cls):
        return cls()
```

## "Private" convention

Python has no real `private`; the convention is an underscore: `_balance` means "internal, don't touch from outside".

## When to use a class?

When you have **many objects of the same kind** carrying both **data and behaviour** (accounts, users, products, games...). For simple jobs, **functions + dicts** suffice. For "data only", use `@dataclass`:

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

print(Point(1, 2))        # Point(x=1, y=2): gets __init__, __repr__, __eq__ for free
```
