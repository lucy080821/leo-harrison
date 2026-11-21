# Plotting with matplotlib

Numbers are hard to read, **charts** are easy. Visualization lets you **see** trends, outliers and relationships that tables of numbers hide.

> In the practice panel, charts appear as **images** right below when you call `plt.show()`.

## Your first chart

```python
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr"]
revenue = [120, 150, 90, 200]

plt.plot(months, revenue, marker="o")
plt.title("Revenue by month")
plt.xlabel("Month")
plt.ylabel("Revenue (millions)")
plt.grid(True)
plt.show()
```

Every good chart needs a **title**, **axis labels** (with units), and to be easy to read.

## Choosing a chart type

| To show | Chart | Function |
|---|---|---|
| A trend over time | **Line** | `plt.plot(x, y)` |
| Comparison across groups | **Bar** | `plt.bar(names, values)` |
| The distribution of a numeric variable | **Histogram** | `plt.hist(data, bins=10)` |
| The relationship between two numeric variables | **Scatter** | `plt.scatter(x, y)` |
| Parts of a whole (few groups) | Pie | `plt.pie(values, labels=...)` |
| Distribution & outliers | **Box** | `plt.boxplot(data)` |

```python
plt.bar(["A", "B", "C"], [3, 7, 5], color="#0b6fd6")      # bars
plt.barh(["A", "B", "C"], [3, 7, 5])                       # horizontal bars (use for long names)
plt.hist(scores, bins=8, edgecolor="white")                # histogram
plt.scatter(heights, weights, alpha=0.6)                   # alpha: transparency
```

## Customizing

```python
plt.plot(x, y, color="tomato", linestyle="--", marker="o", linewidth=2, label="This year")
plt.plot(x, y2, color="gray", label="Last year")
plt.legend()                       # show the legend for the labels
plt.xlim(0, 10); plt.ylim(0, 100)  # axis limits
plt.xticks(rotation=45)            # rotate x tick labels
plt.tight_layout()                 # avoid clipped labels
```

## Two styles: pyplot and object-oriented

The `plt.xxx` style above is quick. When you need **several charts** or fine control, use `Figure` and `Axes`:

```python
fig, ax = plt.subplots(figsize=(6, 4))      # figsize: (width, height) in inches
ax.plot(x, y)
ax.set_title("Title")                       # with ax: set_title, set_xlabel, set_ylabel
ax.set_xlabel("x")
ax.set_ylabel("y")
plt.show()
```

Two words to remember: the **Figure** is the sheet of paper; an **Axes** is one chart drawn on that sheet (a Figure can hold many Axes).

## Several charts side by side

```python
fig, axes = plt.subplots(1, 2, figsize=(10, 4))     # 1 row, 2 columns
axes[0].plot(x, y);  axes[0].set_title("Line")
axes[1].bar(names, values); axes[1].set_title("Bar")
plt.tight_layout()
plt.show()
```

## Saving to a file

```python
plt.savefig("chart.png", dpi=150, bbox_inches="tight")
```

## Principles of good visualization

1. **One chart, one clear message.**
2. Bar/histogram axes should **start at 0** (to avoid misleading).
3. Go easy on colors, and don't use a pie chart with more than 5 groups.
4. **Sort** bars by value for easy comparison.
5. Always have a **title** and **axis labels with units**.
