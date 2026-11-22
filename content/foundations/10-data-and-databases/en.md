# Data and databases

## Tabular data

Most real-world data is a **table**: each **row** is a record (a person, an order), each **column** an attribute (name, city). Hadley Wickham (2014) calls a well-formed table **tidy data**, with three rules:

1. Each **variable** is a column.
2. Each **observation** is a row.
3. Each **type of observational unit** is a table.

Data that follows these rules is easier to filter, group and plot.

## The relational model

In 1970 Edgar F. Codd (IBM) proposed the **relational model** in *A Relational Model of Data for Large Shared Data Banks*: data are **relations** (tables) linked by *values*, not physical pointers. So users say **what** they want and the database system decides **how**.

Two central ideas:

- **Primary key**: a column (or set of columns) that uniquely identifies each row, e.g. `id`.
- **Foreign key**: a column referencing another table's primary key, creating a link (e.g. `orders.customer_id → customers.id`).

## SQL: a declarative language

**SQL** is a *declarative* language: you describe the result you want, not loops:

```sql
SELECT city, COUNT(*) FROM people GROUP BY city;
```

Three core relational-algebra operations: **selection** filters rows, **projection** picks columns, **join** combines two tables by a key.

## Why split tables?

Repeating a customer's name in every order causes **redundancy** and **inconsistency** when edited. **Normalization** splits data into small tables linked by keys so each fact is stored once. You will practise it in the SQL course.

## References

- Codd, E. F. (1970). A Relational Model of Data for Large Shared Data Banks. *CACM* 13(6).
- Wickham, H. (2014). Tidy Data. *Journal of Statistical Software* 59(10).
- Date, C. J. *An Introduction to Database Systems*.
- ISO/IEC 9075 (the SQL standard).
