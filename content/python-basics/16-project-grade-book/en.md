# Project: a grade book

The final project of the Python Basics course. You'll build a **student grade management** program: computing averages, assigning letter grades, ranking and printing a neat report. It uses almost everything you've learned.

## The data

A natural structure: a **dictionary** keyed by student name, with a **list** of scores as the value.

```python
students = {
    "An":   [8, 9, 7],
    "Binh": [6, 5, 7],
    "Chi":  [10, 9, 10],
}
```

## Split the work into small functions

Each function does **one thing** and can be tested alone:

```python
def average(scores):
    return sum(scores) / len(scores)

def letter(avg):
    if avg >= 9:
        return "A"
    elif avg >= 8:
        return "B"
    elif avg >= 6.5:
        return "C"
    return "D"
```

The mean of $n$ scores: $\bar{x} = \dfrac{1}{n}\sum_{i=1}^{n} x_i$.

## A neat report with f-strings

```python
for name, scores in students.items():
    avg = average(scores)
    print(f"{name:<6} {avg:5.2f}  {letter(avg)}")
```

`{name:<6}` left-aligns in a width of 6; `{avg:5.2f}` is width 5 with 2 decimals.

```text
An      8.00  B
Binh    6.00  D
Chi     9.67  A
```

## Ranking with sorted and key

```python
ranking = sorted(students, key=lambda n: average(students[n]), reverse=True)
```

`key` tells `sorted` **which criterion to sort by**.

## Step-by-step plan (a good approach for any project)

1. **Data first:** choose a sensible structure (dict/list).
2. **Write small functions**, trying each with a few examples.
3. **Assemble** them with a loop to print the report.
4. **Add** features gradually.

## Ideas to extend (do them yourself)

- Add functions `add_score(name, score)` and `add_student(name)`.
- Find the student with the **lowest score**, or the class's **highest score**.
- Statistics: the class average, how many students per grade A/B/C/D (use `collections.Counter`).
- Save/load the grade book as **JSON** (the Files, JSON and CSV lesson).
- Turn it into a **class** `GradeBook` with methods, or a `Student` with `.average()`.
- Catch scores outside 0-10 with `raise ValueError`.

## Congratulations!

You've finished the Python Basics course: variables, data types, conditions, loops, list/tuple/set/dict, functions, comprehensions, modules, files, exceptions and classes. Next come **Python for Data Analysts** (numpy, pandas, charts) and then **Machine Learning**.
