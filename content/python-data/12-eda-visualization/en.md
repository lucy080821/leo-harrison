# Exploring data with charts (EDA)

**EDA** (Exploratory Data Analysis) is the step of **looking at the data before drawing conclusions**: how is it distributed, are there outliers, which variables are related? Charts are the central tool.

> This lesson uses `students.csv`: 30 students, with `math`, `physics`, `literature` scores and class `class` (A, B, C).

## A suggested EDA workflow

1. **One variable at a time:** each column's distribution (histogram, boxplot, counts).
2. **Two variables:** relationships (scatter, comparing across groups).
3. **Many variables:** a correlation matrix, group comparisons.
4. **Write down findings** and new questions.

![Three basic EDA plots: histogram, scatter, box](/lessons/python-data/12-eda-visualization-fig-en.svg)
*Three basic EDA plots: histogram, scatter, box*

## Charts straight from pandas

pandas wraps matplotlib so you can plot quickly from a DataFrame:

```python
df["math"].plot(kind="hist", bins=8)
df.groupby("class")["math"].mean().plot(kind="bar")
df.plot(kind="scatter", x="math", y="physics")
df["literature"].plot(kind="box")
```

It's the **fastest** way to explore. For nicer presentation, switch to `plt` and `ax` as in the previous lesson.

## One variable's distribution: histogram and boxplot

```python
plt.hist(df["math"], bins=8, edgecolor="white")
plt.title("Distribution of Math scores")
```

- A **histogram** splits the value range into **bins** and counts the samples in each. The bin count affects the shape: try a few values.
- Read it: where is the data concentrated? **symmetric** or **skewed**? **multiple peaks**? any **odd values** far from the main group?

A **boxplot** summarizes the distribution with 5 numbers:

```text
   ┌─────┬─────┐
├──┤  Q1 │ Q3  ├──┤     ○ outliers
   └─────┴─────┘
   min  median  max (within the allowed range)
```

The box runs from Q1 to Q3 (50% of the data), the middle line is the median, stray dots are outliers.

```python
df.boxplot(column="math", by="class")     # compare distributions across groups
```

## Two variables' relationship: scatter

```python
plt.scatter(df["math"], df["physics"], alpha=0.7)
plt.xlabel("math"); plt.ylabel("physics")
```

Look at the points: **rising** (positive correlation), **falling** (negative), or **scattered** (nearly unrelated)? Any "stray" point?

Coloring by group:

```python
for c, g in df.groupby("class"):
    plt.scatter(g["math"], g["physics"], label=f"Class {c}")
plt.legend()
```

## Comparing across groups

```python
df.groupby("class")[["math", "physics", "literature"]].mean().plot(kind="bar")
```

## Several charts in one figure: subplots

```python
fig, axes = plt.subplots(1, 3, figsize=(13, 4))
axes[0].hist(df["math"], bins=8)
axes[1].scatter(df["math"], df["physics"])
df.boxplot(column="math", by="class", ax=axes[2])
plt.tight_layout()
plt.show()
```

Pass `ax=axes[i]` to draw into the right cell.

## Cautions when reading charts

- **Correlation is not causation:** two variables rising together doesn't mean one causes the other.
- With little data, shapes can **deceive**.
- Different bin counts or axis scales can make the **same data look very different**.
