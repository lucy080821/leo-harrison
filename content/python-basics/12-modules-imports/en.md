# Modules and the standard library

A **module** is a Python file containing functions, classes and variables for you to reuse. Python has an extremely rich **standard library** ("batteries included"): maths, dates, files, networking, JSON...

## How to import

```python
import math                       # use: math.sqrt(16)
from math import sqrt, pi         # use directly: sqrt(16)
import math as m                  # alias: m.sqrt(16)
from datetime import date, timedelta
```

- `import name` keeps the module name as a prefix, the **clearest** option.
- Avoid `from module import *` since it muddles names.
- Type `dir(math)` to list contents, `help(math.sqrt)` for guidance.

## math: mathematics

```python
import math
math.sqrt(144)        # 12.0
math.pi               # 3.141592653589793
math.floor(4.7)       # 4    round down
math.ceil(4.2)        # 5    round up
math.log(100, 10)     # 2.0
math.sin(math.pi / 2) # 1.0
math.isclose(0.1 + 0.2, 0.3)   # True (the right way to compare floats)
```

## random: randomness

```python
import random
random.random()                  # a float in [0, 1)
random.randint(1, 6)             # an integer from 1 to 6 (both ends included)
random.choice(["a", "b", "c"])   # pick one element
random.shuffle(items)            # shuffle IN PLACE
random.sample(range(100), 5)     # 5 distinct numbers
random.seed(42)                  # set the seed: repeatable results (useful for experiments)
```

## datetime: dates and times

```python
from datetime import date, datetime, timedelta

d1 = date(2024, 2, 1)
d2 = date(2024, 3, 1)
(d2 - d1).days                       # 29
d1 + timedelta(days=30)              # add 30 days
d1.strftime("%d/%m/%Y")              # '01/02/2024' (format to a string)
datetime.strptime("21/11/2026", "%d/%m/%Y")   # string -> date
date.today(); datetime.now()
d1.weekday()                         # 0 = Monday ... 6 = Sunday
```

The main format codes: `%Y` 4-digit year, `%m` month, `%d` day, `%H:%M:%S` time.

## collections: advanced data structures

```python
from collections import Counter, defaultdict

Counter("banana")                              # Counter({'a': 3, 'n': 2, 'b': 1})
Counter(words).most_common(2)                  # the 2 most common elements

groups = defaultdict(list)                     # a missing key automatically gets an empty list
for name, city in [("An", "HN"), ("Binh", "HN"), ("Chi", "SG")]:
    groups[city].append(name)
# {'HN': ['An', 'Binh'], 'SG': ['Chi']}
```

## Some other useful modules

| Module | Does |
|---|---|
| `json` | Read/write JSON |
| `csv` | Read/write CSV files |
| `os`, `pathlib` | Work with files and folders |
| `re` | Regular expressions |
| `statistics` | `mean`, `median`, `stdev` |
| `itertools` | Advanced iteration tools |
| `time` | Measure running time |

## Third-party packages

Beyond the standard library, hundreds of thousands of packages on **PyPI** install with `pip install name`, such as `numpy`, `pandas`, `requests`. In this practice panel, popular libraries like numpy and pandas are loaded automatically when you `import` them (the Python for Data Analysts course).

## Writing your own module

If the file `helpers.py` has `def double(x): ...`, another file writes `import helpers` and calls `helpers.double(2)`. Every Python file is naturally a module.
