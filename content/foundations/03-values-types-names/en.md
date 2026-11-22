# Values, types and names

## Objects, values and types

The Python Language Reference (*Data model*) says: **objects** are Python's abstraction for data; all data in a Python program is represented by objects. Each object has three attributes:

1. **Identity**: never changes during the object's life (in CPython, `id(x)` is its memory address).
2. **Type**: determines the allowed operations and possible values. The type does not change either.
3. **Value**: may or may not change depending on the type.

An object whose value **cannot change** is **immutable**: numbers, strings, `tuple`. One that can change is **mutable**: `list`, `dict`, `set`.

## A variable is really a name

In Python the statement `x = 5` does not "put 5 in a box called x". It **binds the name `x` to the object 5** (*name binding*). Several names can refer to the same object:

```python
a = [1, 2, 3]
b = a        # no copy, just another name
b.append(4)  # a sees the 4 too: a and b are ONE object
```

This is a classic beginner's bug. For an independent copy, create a new object: `a.copy()` or `list(a)`.

## Types and conversion

Python is **dynamically typed**: the type belongs to the *object* at run time, not to the name. It is also **strongly typed**: `"5" + 5` raises an error instead of guessing. To convert, be explicit: `int("5") + 5`.

## Try it

Run the example and watch `a is b`. Then do the copy exercise.

## References

- Python Software Foundation. *The Python Language Reference*, §3 "Data model" and §4 "Execution model" (naming and binding), docs.python.org.
- MIT 6.0001, lectures 2–3: variables, types, conversion.
- Ned Batchelder, *Facts and myths about Python names and values* (PyCon 2015), a talk and article describing the "names → objects" model.
