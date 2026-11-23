# Database normalisation: 1NF, 2NF, 3NF

A flat table "customer name, city, product" repeating customer information on every row causes three **anomalies**:

- **Update**: changing one customer's city means editing many rows; miss one and the data contradicts itself.
- **Insert**: you cannot record a new customer until they have an order.
- **Delete**: deleting the last order also loses the customer's information.

**Normalisation** (Edgar Codd, 1970–1972) is the process of splitting tables so **each fact is stored once**.

## Functional dependencies

`A → B` means the value of A uniquely determines B (e.g. `customer_id → city`). Normalisation rests on analysing these dependencies.

## The first three normal forms

1. **1NF**: each cell holds a **single atomic value** (no "a,b,c" lists in one cell), and each row is identifiable by a key.
2. **2NF**: 1NF **and** every non-key column depends on the **whole key** (not just part of a composite key).
3. **3NF**: 2NF **and** no **transitive dependencies** (a non-key column must not depend on another non-key column). E.g. `order → customer_id → city` so `city` belongs in the customer table.

A mnemonic: *every non-key column must depend on the key, the whole key, and nothing but the key* (Bill Kent).

![Normalising from 1NF to 3NF](/lessons/sql/33-normalization-fig-en.svg)
*Normalising from 1NF to 3NF*

## When to denormalise

Normalisation reduces redundancy and errors but needs more **JOINs**. In analytic warehouses (the star-schema lesson) we **deliberately denormalise** for fast reads. Rule of thumb: **transactional systems (OLTP) normalise; analytic systems (OLAP) usually denormalise in a controlled way.**

## References

- Codd, E. F. (1972). Further normalization of the data base relational model.
- Kent, W. (1983). A simple guide to five normal forms in relational database theory. *CACM* 26(2).
- Date, C. J. *An Introduction to Database Systems*.

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
