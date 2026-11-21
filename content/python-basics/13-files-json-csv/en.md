# Files, JSON and CSV

Real programs need to **save and read data**. This lesson covers three things: text files, JSON and CSV.

> In the practice panel, a "file" lives in the browser's **temporary virtual filesystem** (lost on reload). On your own machine the code is identical but files are saved to disk.

## Opening files with `with`

```python
with open("notes.txt", "w", encoding="utf-8") as f:    # "w": write (erases old content)
    f.write("line 1\n")
    f.write("line 2\n")

with open("notes.txt", encoding="utf-8") as f:         # default "r": read
    content = f.read()
```

- **`with`** automatically **closes the file** on leaving the block, even if an error occurs. Always use it.
- Always specify `encoding="utf-8"` so accented text doesn't break.

| Mode | Meaning |
|---|---|
| `"r"` | Read (default); error if the file doesn't exist |
| `"w"` | Write, **erasing** old content |
| `"a"` | **Append** to the end |
| `"x"` | Create new, error if it exists |

## Ways to read

```python
with open("notes.txt", encoding="utf-8") as f:
    text = f.read()               # everything as ONE string
with open("notes.txt", encoding="utf-8") as f:
    lines = f.read().splitlines() # a list of lines (\n removed)
with open("notes.txt", encoding="utf-8") as f:
    for line in f:                # one line at a time: memory-friendly for big files
        print(line.strip())
```

## Paths with pathlib

```python
from pathlib import Path
p = Path("data") / "notes.txt"        # joins paths correctly on every OS
p.exists(); p.read_text(encoding="utf-8"); p.write_text("hello", encoding="utf-8")
```

## JSON

**JSON** is a text format for exchanging data (web APIs, configuration). Python ↔ JSON:

| Python | JSON |
|---|---|
| `dict` | object `{}` |
| `list`, `tuple` | array `[]` |
| `str`, `int`, `float` | string, number |
| `True`, `False`, `None` | `true`, `false`, `null` |

```python
import json

text = json.dumps({"name": "An", "scores": [8, 9]}, ensure_ascii=False, indent=2)  # dict -> string
data = json.loads(text)                                                            # string -> dict

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)       # write straight to a file
with open("data.json", encoding="utf-8") as f:
    data = json.load(f)                          # read straight from a file
```

Remember: `dumps`/`loads` work with **strings** (s = string), `dump`/`load` with **files**.

## CSV

**CSV** is a text table: one record per line, columns separated by commas.

```python
import csv

with open("scores.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):          # each line becomes a dict keyed by column name
        print(row["name"], int(row["score"]))   # REMEMBER: every value read is a STRING

with open("out.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "score"])
    writer.writerow(["An", 8])
```

> For large tables and statistical analysis people use **pandas** (`pd.read_csv`), covered in the "Python for Data Analysts" course.

## Catching file errors

```python
try:
    with open("missing.txt", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("File doesn't exist")
```

More on `try/except` in the next lesson.
