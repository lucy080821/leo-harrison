# Star schemas and analytic data warehouses

A sales system (OLTP) is **normalised** for fast, correct writes. But a report like "revenue by month × product category × region" across a dozen joined tables is slow and hard to write. A **data warehouse** reorganises data for **analysis**.

## The star schema

Ralph Kimball (1996) popularised this layout:

- A **fact table** in the middle: each row is **one measured event** (one sold line item), holding **measures** (quantity, revenue) and **foreign keys** to the dimensions.
- **Dimension tables** around it: describe the **context** (date, product, customer, store), with many descriptive columns, deliberately **denormalised**.

![A fact table in the middle, dimension tables around it](/lessons/sql/34-star-schema-fig-en.svg)
*A fact table in the middle, dimension tables around it*

## Grain

The **grain** is "what one row of the fact table represents" (an order line? an order?). **Choose and state the grain first**; every measure and dimension must fit it. Mixed grains cause double counting.

## Typical queries

Every report has the shape: **join the fact to a few dimensions, filter, group by dimension attributes, sum the measures**. A date dimension (`dim_date`: year, quarter, month, weekday, holiday) lets you group by time without date functions.

## Slowly changing dimensions (SCD)

If a customer moves city, which city does past revenue belong to? **SCD type 1**: overwrite (history lost). **Type 2**: add a new row with validity dates (history kept). Decide by analytical need.

## Modern tooling

dbt (SQL-based transformation), BigQuery, Snowflake, Redshift; the **ELT** model (load raw data, then transform with SQL inside the warehouse).

## References

- Kimball, R. & Ross, M. *The Data Warehouse Toolkit* (3rd ed., Wiley).
- Inmon, W. H. *Building the Data Warehouse*.
- dbt Labs documentation, "How we structure our dbt projects".

> **Data:** this lesson uses the sample data built into the editor (SQLite running in your browser). The syntax here is SQLite's; differences from PostgreSQL, MySQL and BigQuery are covered in the dialects lesson.
