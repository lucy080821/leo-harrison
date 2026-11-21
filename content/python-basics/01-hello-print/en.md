# Your first Python program

**Python** is a readable, easy-to-learn and hugely popular programming language: data analysis, artificial intelligence, automation, web, science... You'll start from zero, **no prior knowledge needed**.

> The panel on the right runs **real Python** (via WebAssembly) in your browser. The first load takes a few seconds, then results update as you type.

## The print function

`print()` writes to the screen. It's how you "talk" to your program and see results.

```python
print("Hello, Lexi!")        # print a string of text
print("2 + 3 =", 2 + 3)      # print several values, separated by spaces
```

- Text (a string) goes inside **quotes**: `"..."` or `'...'`.
- Numbers and calculations need **no** quotes: `2 + 3` is evaluated to `5` before printing.
- Each `print` **ends with a new line** by default.

## Two handy arguments: sep and end

```python
print("Python", "is", "fun", sep="-")     # Python-is-fun   (sep: what separates the values)
print("No newline", end=" ... ")           # end: what is printed at the end (default: a newline)
print("continues on the same line")
```

## Comments

Everything after a `#` on a line is a **comment**: Python ignores it, it's for humans.

```python
# This line is a comment
print("Hello")   # a trailing comment is fine too
```

## Python cares about indentation

Unlike many languages that use `{ }`, Python uses **indentation** (4 spaces) to group code. Don't indent arbitrarily:

```python
print("fine")
    print("error!")     # IndentationError: unexpected indent
```

## Reading error messages

When code is wrong, Python reports an error with the **line number**. For example a missing closing quote:

```python
print("Hello)
```

```text
SyntaxError: unterminated string literal (detected at line 1)
```

Read the **last line** of the message: it names the **kind of error** and the cause. The result panel shows errors in red so you can fix them right away.

## Naming and style

- Python is **case-sensitive**: `print` is right, `Print` is wrong.
- The community style guide is called **PEP 8**: 4-space indentation, lowercase `snake_case` variable names.
- Type `import this` to see the "Zen of Python", the language's design principles.

> **About `input()`:** in real programs you use `input("Your name? ")` to read what the user types. This in-browser practice panel has no keyboard for `input`, so exercises assign values to variables instead.
