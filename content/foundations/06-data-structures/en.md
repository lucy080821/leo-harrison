# Data structures

## Abstract data types

Liskov and Zilles (1974) introduced the **abstract data type (ADT)**: a type defined by its *operations*, not by how it is stored inside. One ADT can be implemented by several different **data structures**.

## Basic structures in Python

| Structure | Features | Use when |
|---|---|---|
| `list` | ordered, mutable | you need order and index access |
| `tuple` | ordered, immutable | a fixed group of values |
| `dict` | key → value mapping | lookup by name/ID |
| `set` | unique elements | membership tests, de-duplication |

## Stacks and queues

- **Stack**: last in, first out (LIFO). Examples: the Undo button, the function call stack.
- **Queue**: first in, first out (FIFO). Example: a print queue.

## Hash tables

Python's `dict` and `set` are built on **hash tables**: a **hash function** turns a key into an index so lookup is almost immediate, on average **O(1)** (constant time), instead of scanning a whole list (O(n)). That is why `dict` keys must be **hashable**, i.e. immutable (numbers, strings, tuples).

## Choosing a structure is choosing performance

"`x in a_list`" costs O(n); "`x in a_set`" is O(1) on average. For large data the difference is huge. Niklaus Wirth (1976) summarised it: *Algorithms + Data Structures = Programs*.

## References

- Liskov, B. & Zilles, S. (1974). Programming with abstract data types. *ACM SIGPLAN Notices* 9(4).
- Wirth, N. (1976). *Algorithms + Data Structures = Programs*. Prentice-Hall.
- Python Software Foundation. *The Python Tutorial*, §5 "Data Structures", and the `collections.deque` docs.
- ACM/IEEE-CS/AAAI (2023). *Computer Science Curricula 2023*, knowledge areas SDF (Software Development Fundamentals) and AL.
