Absolutely. From now on, I’ll keep the same format: **visual/infographic + detailed explanation + practical examples + interview perspective + cheat sheet + master map**.

# 🗄️ DAY 3 — SQL & DATABASES

This is a **very important day for backend/FastAPI development**.

You should not learn SQL as just syntax. For senior backend interviews, you need to understand:

> **How data is combined → grouped → searched → locked → updated → analyzed → optimized.**

---

# 🧠 MASTER MENTAL MODEL

Imagine we have these tables:

### `users`

```text
┌────┬─────────┬───────┐
│ id │ name    │ city  │
├────┼─────────┼───────┤
│ 1  │ Sayanta │ Delhi │
│ 2  │ Rahul   │ Pune  │
│ 3  │ Amit    │ Delhi │
└────┴─────────┴───────┘
```

### `orders`

```text
┌────┬─────────┬────────┬────────────┐
│ id │ user_id │ amount │ created_at │
├────┼─────────┼────────┼────────────┤
│ 1  │ 1       │ 500    │ ...        │
│ 2  │ 1       │ 800    │ ...        │
│ 3  │ 2       │ 300    │ ...        │
│ 4  │ 3       │ 900    │ ...        │
└────┴─────────┴────────┴────────────┘
```

Now:

```text
                     DATABASE
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
      JOIN           GROUP BY          SUBQUERY
        │                │                │
   combine data     aggregate data     query inside
        │                │                │
        └────────────────┼────────────────┘
                         ↓
                     RESULT SET
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
         INDEXING                TRANSACTION
             │                       │
       find faster             safe changes
             │                       │
             └───────────┬───────────┘
                         ↓
                 WINDOW FUNCTIONS
                         │
                  analytics over rows
                         │
                         ↓
                 QUERY OPTIMIZATION
                         │
                         ↓
                    FAST DATABASE
```

---

# 1️⃣ JOINs ⭐⭐⭐⭐⭐

## 🧠 Core idea

A JOIN combines rows from multiple tables using a relationship.

Usually:

```text
users.id
   ↕
orders.user_id
```

Example:

```sql
SELECT
    users.name,
    orders.amount
FROM users
JOIN orders
    ON users.id = orders.user_id;
```

Result:

```text
┌─────────┬────────┐
│ name    │ amount │
├─────────┼────────┤
│ Sayanta │ 500    │
│ Sayanta │ 800    │
│ Rahul   │ 300    │
│ Amit    │ 900    │
└─────────┴────────┘
```

---

# INNER JOIN

Returns only matching rows.

```sql
SELECT *
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id;
```

Mental model:

```text
Users             Orders
┌─────┐           ┌─────┐
│  A  │───────────│  A  │
│  B  │───────────│  B  │
│  C  │───────────│  C  │
│  D  │            │     │
└─────┘           └─────┘

        ↓

Only matching
```

Think:

> **INNER JOIN = intersection/matching rows**

---

# LEFT JOIN ⭐⭐⭐⭐⭐

Returns **every row from the left table**, plus matching rows from the right.

```sql
SELECT
    u.name,
    o.amount
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id;
```

Suppose Amit has no order:

```text
Sayanta → 500
Sayanta → 800
Rahul   → 300
Amit    → NULL
```

Visual:

```text
LEFT TABLE                RIGHT TABLE

A ─────────────────────── A
B ─────────────────────── B
C ─────────────────────── C
D ────────────────X

         ↓

A
B
C
D ← still included
```

### Interview trigger

> "Find users who have never placed an order."

```sql
SELECT u.*
FROM users u
LEFT JOIN orders o
    ON u.id = o.user_id
WHERE o.id IS NULL;
```

This is a **classic SQL interview question**.

---

# RIGHT JOIN

Opposite of LEFT JOIN.

```sql
SELECT *
FROM users u
RIGHT JOIN orders o
    ON u.id = o.user_id;
```

Keeps all rows from the right table.

In practice, many teams prefer rewriting RIGHT JOIN as a LEFT JOIN by swapping table order because LEFT JOIN is often easier to read consistently.

---

# FULL OUTER JOIN

Returns rows when there's a match on either side.

Conceptually:

```text
A only
+
A ∩ B
+
B only
```

Not every database supports `FULL OUTER JOIN` identically, so know your database engine.

---

# JOIN Cheat Sheet

```text
INNER JOIN
    ↓
Only matching


LEFT JOIN
    ↓
Everything from LEFT
+ matching RIGHT


RIGHT JOIN
    ↓
Everything from RIGHT
+ matching LEFT


FULL OUTER JOIN
    ↓
Everything from both sides
```

---

# 🔥 JOIN Interview Question

### Find customers with total order amount > 1000

```sql
SELECT
    u.id,
    u.name,
    SUM(o.amount) AS total_amount
FROM users u
JOIN orders o
    ON u.id = o.user_id
GROUP BY
    u.id,
    u.name
HAVING SUM(o.amount) > 1000;
```

Notice that we just combined:

```text
JOIN
 ↓
GROUP BY
 ↓
SUM
 ↓
HAVING
```

That's how real SQL problems work.

---

# 2️⃣ GROUP BY & HAVING ⭐⭐⭐⭐⭐

## GROUP BY

`GROUP BY` turns individual rows into groups.

Suppose:

```text
orders

user_id    amount
1          500
1          800
2          300
2          700
3          900
```

Run:

```sql
SELECT
    user_id,
    SUM(amount)
FROM orders
GROUP BY user_id;
```

Result:

```text
user_id    SUM
1          1300
2          1000
3          900
```

Mental model:

```text
Rows
 ↓
GROUP BY
 ↓
Groups
 ↓
Aggregate
 ↓
One result per group
```

---

# Common Aggregate Functions

```sql
COUNT()
SUM()
AVG()
MIN()
MAX()
```

Example:

```sql
SELECT
    user_id,
    COUNT(*) AS order_count,
    SUM(amount) AS total,
    AVG(amount) AS average,
    MAX(amount) AS largest
FROM orders
GROUP BY user_id;
```

---

# WHERE vs HAVING ⭐⭐⭐⭐⭐

This is a **must-know interview question**.

### WHERE

Filters **rows before grouping**.

```sql
SELECT *
FROM orders
WHERE amount > 500;
```

Mental model:

```text
Rows
 ↓
WHERE
 ↓
GROUP BY
```

---

### HAVING

Filters **groups after aggregation**.

```sql
SELECT
    user_id,
    SUM(amount) AS total
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 1000;
```

Mental model:

```text
Rows
 ↓
GROUP BY
 ↓
SUM()
 ↓
HAVING
 ↓
Groups remaining
```

### Remember:

> **WHERE → rows**
> **HAVING → groups**

---

# 3️⃣ SUBQUERIES ⭐⭐⭐⭐

A subquery is:

> **A query inside another query.**

Example:

```sql
SELECT *
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
);
```

Mental model:

```text
Outer Query
     │
     ↓
WHERE
     │
     ↓
 ┌──────────────┐
 │ Subquery     │
 │              │
 │ SELECT ...   │
 └──────────────┘
```

---

# Subquery in WHERE

Find users who have placed orders:

```sql
SELECT *
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
);
```

---

# Subquery in FROM

A subquery can create a temporary result set.

```sql
SELECT *
FROM (
    SELECT
        user_id,
        SUM(amount) AS total
    FROM orders
    GROUP BY user_id
) totals
WHERE total > 1000;
```

Think:

```text
orders
 ↓
GROUP BY
 ↓
temporary result
 ↓
outer query
```

---

# Correlated Subquery ⭐⭐⭐⭐⭐

A correlated subquery depends on the current row of the outer query.

Example:

> Find orders greater than that user's average order.

```sql
SELECT o1.*
FROM orders o1
WHERE o1.amount > (
    SELECT AVG(o2.amount)
    FROM orders o2
    WHERE o2.user_id = o1.user_id
);
```

Mental model:

```text
Outer row
   ↓
run inner query using outer row
   ↓
compare
   ↓
next outer row
```

This can be powerful but potentially expensive, depending on the database and execution plan.

---

# EXISTS ⭐⭐⭐⭐⭐

`EXISTS` asks:

> **Does at least one matching row exist?**

Example:

```sql
SELECT *
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
);
```

Conceptually:

```text
User
 ↓
Does an order exist?
 ↓
YES → include user
NO  → skip
```

For existence checks, `EXISTS` is often clearer than constructing a list with `IN`, especially when the relationship is naturally expressed as existence.

---

# JOIN vs Subquery

Think:

```text
JOIN
 ↓
Combine related datasets


Subquery
 ↓
Use result of another query
```

Don't blindly assume one is always faster.

The database optimizer may transform different SQL formulations into similar execution plans.

---

# 4️⃣ INDEXING ⭐⭐⭐⭐⭐

This is one of the **most important database performance concepts**.

## 🧠 What is an index?

Think of a book.

Without an index:

```text
Page 1
Page 2
Page 3
...
Page 1000
```

You search every page.

With an index:

```text
"SQLAlchemy"
    ↓
Page 742
```

Database index:

```text
Without index
→ scan many/all rows


With index
→ navigate index
→ find relevant rows
```

---

# Example

Suppose:

```text
users
10 million rows
```

Query:

```sql
SELECT *
FROM users
WHERE email = 'abc@example.com';
```

Without an appropriate index:

```text
Table Scan
 ↓
row 1
row 2
row 3
...
row 10,000,000
```

With:

```sql
CREATE INDEX idx_users_email
ON users(email);
```

the database can use the index to locate matching rows much more efficiently.

---

# What should you index?

Common candidates:

```text
WHERE columns
JOIN columns
ORDER BY columns
sometimes GROUP BY columns
unique lookup columns
```

Examples:

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

and:

```sql
CREATE INDEX idx_users_email
ON users(email);
```

---

# 🚨 Indexes Are NOT Free

This is a senior-level point.

Indexes improve reads, but they also have costs:

```text
INSERT
UPDATE
DELETE
   ↓
Index must also be maintained
```

And indexes consume storage.

Therefore:

> **Don't index every column.**

---

# Composite Index

Suppose:

```sql
SELECT *
FROM orders
WHERE user_id = 10
  AND status = 'completed';
```

Potentially:

```sql
CREATE INDEX idx_orders_user_status
ON orders(user_id, status);
```

The order of columns matters.

Think:

```text
(user_id, status)
     ↓
left-to-right index structure
```

Understanding **column order and query patterns** is essential when designing composite indexes.

---

# 5️⃣ TRANSACTIONS ⭐⭐⭐⭐⭐

A transaction is:

> **A group of database operations treated as one logical unit.**

Classic example:

```text
Transfer ₹100
```

From:

```text
Account A = ₹1000
Account B = ₹500
```

We need:

```text
A -= 100
B += 100
```

What if the first succeeds but second fails?

Bad:

```text
A = ₹900
B = ₹500
```

Money disappeared.

Transaction:

```text
BEGIN
   │
   ├── A -= 100
   │
   ├── B += 100
   │
   ↓
COMMIT
```

If something fails:

```text
ROLLBACK
```

---

# ACID ⭐⭐⭐⭐⭐

You absolutely need to know this.

```text
A → Atomicity
C → Consistency
I → Isolation
D → Durability
```

---

## Atomicity

> All operations happen or none happen.

```text
A -= 100
B += 100

Both succeed
      OR
both rolled back
```

---

## Consistency

Transaction moves the database from one valid state to another valid state, respecting defined constraints/rules.

```text
Before → valid
After  → valid
```

---

## Isolation

Concurrent transactions shouldn't incorrectly interfere with each other's intermediate state.

```text
Transaction A
       ↕
Transaction B
```

The database's isolation level controls what one transaction can observe from another.

---

## Durability

After a successful commit:

```text
COMMIT
  ↓
data is persisted
```

and should survive failures according to the database's durability guarantees.

---

# Transaction Flow

```text
              BEGIN
                │
                ↓
            Operation 1
                │
                ↓
            Operation 2
                │
                ↓
          Everything OK?
           /          \
         YES           NO
          ↓             ↓
       COMMIT        ROLLBACK
          │             │
          ↓             ↓
       Persist       Undo changes
```

---

# FastAPI + SQLAlchemy Connection

This is directly relevant to your backend work:

```python
async with session.begin():
    user.balance -= 100
    another.balance += 100
```

Conceptually:

```text
FastAPI request
      ↓
Service
      ↓
Transaction
      ↓
multiple DB operations
      ↓
COMMIT / ROLLBACK
```

---

# 6️⃣ WINDOW FUNCTIONS ⭐⭐⭐⭐⭐

This is one of the most important advanced SQL concepts.

A window function lets you:

> **Calculate something across related rows without collapsing those rows into one row.**

This is the key difference from `GROUP BY`.

---

# GROUP BY vs Window Function

Suppose:

```text
orders

user_id    amount
1          500
1          800
2          300
2          700
```

### GROUP BY

```sql
SELECT
    user_id,
    SUM(amount)
FROM orders
GROUP BY user_id;
```

Result:

```text
1 → 1300
2 → 1000
```

Rows were **collapsed**.

---

### Window Function

```sql
SELECT
    user_id,
    amount,
    SUM(amount) OVER (
        PARTITION BY user_id
    ) AS total
FROM orders;
```

Result:

```text
user_id   amount   total
1         500      1300
1         800      1300
2         300      1000
2         700      1000
```

The original rows remain.

---

# 🧠 Window Function Mental Model

```text
                 ALL ROWS
                    │
                    ↓
              PARTITION BY
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
      User 1      User 2      User 3
        │           │           │
        ↓           ↓           ↓
    calculation calculation calculation
        │           │           │
        └───────────┼───────────┘
                    ↓
             original rows
             still remain
```

---

# `ROW_NUMBER()`

Extremely common.

```sql
SELECT
    user_id,
    amount,
    ROW_NUMBER() OVER (
        PARTITION BY user_id
        ORDER BY amount DESC
    ) AS rn
FROM orders;
```

Result:

```text
user_id  amount  rn
1        800     1
1        500     2
2        700     1
2        300     2
```

This lets you find:

> **The highest order per user.**

For example:

```sql
SELECT *
FROM (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY amount DESC
        ) AS rn
    FROM orders o
) ranked
WHERE rn = 1;
```

🔥 This is a **very common senior SQL interview pattern**.

---

# `RANK()` vs `DENSE_RANK()` vs `ROW_NUMBER()`

Suppose:

```text
scores

100
100
90
80
```

### ROW_NUMBER

```text
100 → 1
100 → 2
90  → 3
80  → 4
```

### RANK

```text
100 → 1
100 → 1
90  → 3
80  → 4
```

### DENSE_RANK

```text
100 → 1
100 → 1
90  → 2
80  → 3
```

Remember:

```text
ROW_NUMBER
→ always unique numbering


RANK
→ ties create gaps


DENSE_RANK
→ ties don't create gaps
```

---

# Running Total

Another extremely common problem.

```sql
SELECT
    user_id,
    created_at,
    amount,
    SUM(amount) OVER (
        PARTITION BY user_id
        ORDER BY created_at
    ) AS running_total
FROM orders;
```

Result:

```text
user   amount   running_total
1      500      500
1      800      1300
1      200      1500
```

---

# `LAG()` and `LEAD()`

These allow you to look at neighboring rows.

### LAG

Previous row.

```sql
SELECT
    created_at,
    amount,
    LAG(amount) OVER (
        ORDER BY created_at
    ) AS previous_amount
FROM orders;
```

### LEAD

Next row.

```sql
LEAD(amount) OVER (...)
```

Useful for:

```text
growth
comparison
previous transaction
next event
time-series analysis
```

---

# 7️⃣ QUERY OPTIMIZATION ⭐⭐⭐⭐⭐

This is where SQL knowledge becomes **senior backend engineering**.

The goal isn't:

> "Write complicated SQL."

The goal is:

> **Get the database to do the minimum necessary work.**

---

# First Rule: Measure Before Optimizing

Don't assume a query is slow.

Use:

```sql
EXPLAIN
```

or:

```sql
EXPLAIN ANALYZE
```

depending on your database.

Mental model:

```text
SQL Query
   ↓
EXPLAIN
   ↓
Query Plan
   ↓
Understand bottleneck
   ↓
Optimize
   ↓
Measure again
```

---

# Query Plan

The database may choose things like:

```text
Seq Scan
Index Scan
Index Only Scan
Nested Loop
Hash Join
Merge Join
Sort
Aggregate
```

You need to learn to **read execution plans**, not just create indexes blindly.

---

# 🚨 Avoid `SELECT *`

Instead of:

```sql
SELECT *
FROM users;
```

prefer:

```sql
SELECT
    id,
    name,
    email
FROM users;
```

Why?

Because you may:

* transfer unnecessary data
* read unnecessary columns
* increase memory/network usage
* make covering/index-only strategies less useful
* couple code to unnecessary schema

---

# Index the Right Columns

Query:

```sql
SELECT *
FROM orders
WHERE user_id = 100;
```

Potential index:

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

But don't blindly index every WHERE column.

Use query plans and workload patterns.

---

# Avoid Functions on Indexed Columns

Suppose:

```sql
WHERE DATE(created_at) = '2026-09-03'
```

Depending on the database, applying a function to the indexed column can prevent efficient use of a normal index.

A range predicate is often better:

```sql
WHERE created_at >= '2026-09-03'
  AND created_at <  '2026-09-04'
```

The exact optimization depends on the database and indexes, but the principle is:

> **Keep indexed columns searchable in a way the optimizer can exploit.**

---

# N+1 Query Problem ⭐⭐⭐⭐⭐

Very important for SQLAlchemy/FastAPI.

Suppose:

```text
Get 100 users
```

Then:

```text
Query 1 → get users

Query 2 → get orders for user 1
Query 3 → get orders for user 2
Query 4 → get orders for user 3
...
Query 101
```

That's:

```text
1 + N queries
```

🔥 **N+1 problem**

Better:

```text
Query users
     +
JOIN / eager loading / batch query
     ↓
Get related data efficiently
```

This is one of the most useful SQL + SQLAlchemy concepts to master.

---

# Pagination

Bad for huge datasets:

```sql
SELECT *
FROM orders
ORDER BY id
LIMIT 50 OFFSET 500000;
```

Large offsets can become increasingly expensive depending on the database and query plan.

For large datasets, consider **keyset/cursor pagination**:

```sql
SELECT *
FROM orders
WHERE id > 500000
ORDER BY id
LIMIT 50;
```

Conceptually:

```text
OFFSET pagination
→ skip many rows


Keyset pagination
→ continue from known position
```

---

# Query Optimization Master Flow

```text
              SLOW QUERY
                  │
                  ↓
              EXPLAIN
                  │
                  ↓
            Query Plan
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
     Scan       Join        Sort
       │          │          │
       ↓          ↓          ↓
    Index?    Join keys?   Reduce data?
       │          │          │
       └──────────┼──────────┘
                  ↓
             Optimize
                  ↓
          EXPLAIN ANALYZE
                  ↓
            Compare again
```

---

# 🔥 SQL Query Logical Execution Order

This is **very important**.

When you write:

```sql
SELECT ...
FROM ...
JOIN ...
WHERE ...
GROUP BY ...
HAVING ...
ORDER BY ...
LIMIT ...
```

A simplified logical processing order is:

```text
FROM
  ↓
JOIN
  ↓
WHERE
  ↓
GROUP BY
  ↓
HAVING
  ↓
SELECT
  ↓
ORDER BY
  ↓
LIMIT
```

This explains things such as:

> Why can't I generally use a SELECT alias in WHERE?

Because logically:

```text
WHERE
```

happens before:

```text
SELECT
```

---

# 🧠 JOIN + GROUP BY + HAVING + WINDOW

Now let's solve a more realistic problem.

### Requirement

> Find each user's orders, total spending, and rank their orders by amount.

```sql
SELECT
    u.name,
    o.amount,

    SUM(o.amount) OVER (
        PARTITION BY o.user_id
    ) AS total_spent,

    ROW_NUMBER() OVER (
        PARTITION BY o.user_id
        ORDER BY o.amount DESC
    ) AS order_rank

FROM users u

JOIN orders o
    ON u.id = o.user_id;
```

Result:

```text
name      amount   total_spent   order_rank
Sayanta   800      1300          1
Sayanta   500      1300          2
Rahul     700      1000          1
Rahul     300      1000          2
```

This single query combines:

```text
JOIN
 +
Window Function
 +
PARTITION BY
 +
ROW_NUMBER
```

---

# 🏆 SQL Pattern Recognition

When you see:

### "Combine users and orders"

Think:

```text
JOIN
```

### "Total orders per user"

Think:

```text
GROUP BY
SUM()
```

### "Only users whose total exceeds 1000"

Think:

```text
GROUP BY
+
HAVING
```

### "Users who have orders"

Think:

```text
EXISTS
```

### "Highest order per user"

Think:

```text
ROW_NUMBER()
OVER(PARTITION BY ...)
```

### "Previous order"

Think:

```text
LAG()
```

### "Running total"

Think:

```text
SUM() OVER(...)
```

### "Query is slow"

Think:

```text
EXPLAIN / EXPLAIN ANALYZE
```

### "Millions of rows searched by email"

Think:

```text
INDEX
```

### "Multiple updates must succeed together"

Think:

```text
TRANSACTION
```

---

# ⚠️ Common SQL Interview Traps

## Trap 1 — `WHERE` vs `HAVING`

```text
WHERE  → filters rows
HAVING → filters groups
```

---

## Trap 2 — `JOIN` vs `GROUP BY`

```text
JOIN
→ combines tables


GROUP BY
→ combines rows into groups for aggregation
```

---

## Trap 3 — `GROUP BY` vs Window Function

```text
GROUP BY
→ reduces/collapses rows


Window Function
→ keeps rows and adds calculations
```

This distinction is **extremely important**.

---

## Trap 4 — Index everything

Wrong.

Indexes:

```text
+ faster reads
- extra storage
- slower writes
- maintenance cost
```

---

## Trap 5 — "Index always makes query faster"

Not necessarily.

The optimizer may decide:

```text
Table scan
```

is cheaper than:

```text
Index lookup + table access
```

especially when a large percentage of rows are needed.

---

## Trap 6 — Transactions only mean COMMIT

No.

Transactions involve:

```text
BEGIN
 ↓
operations
 ↓
COMMIT

or

ROLLBACK
```

and involve important concepts such as isolation and concurrency.

---

# 🧩 SQL + SQLAlchemy Connection

Since you're working with FastAPI, connect today's concepts to SQLAlchemy.

SQL:

```sql
SELECT
    user_id,
    SUM(amount)
FROM orders
GROUP BY user_id;
```

SQLAlchemy:

```python
stmt = (
    select(
        Order.user_id,
        func.sum(Order.amount)
    )
    .group_by(Order.user_id)
)
```

Then:

```python
result = await session.execute(stmt)
```

So your architecture becomes:

```text
FastAPI
   ↓
Service
   ↓
SQLAlchemy
   ↓
SQL
   ↓
Query Planner
   ↓
Index / Join / Scan
   ↓
Database
```

The SQLAlchemy abstraction does **not** remove the need to understand SQL.

A senior backend engineer should understand what SQL the ORM is producing and what the database is likely to do with it.

---

# 🧠 DAY 3 — COMPLETE CHEAT SHEET

| Concept           | Remember                                      |
| ----------------- | --------------------------------------------- |
| INNER JOIN        | Matching rows                                 |
| LEFT JOIN         | All left + matching right                     |
| RIGHT JOIN        | All right + matching left                     |
| FULL JOIN         | All rows from both sides                      |
| GROUP BY          | Create groups                                 |
| `COUNT()`         | Count                                         |
| `SUM()`           | Total                                         |
| `AVG()`           | Average                                       |
| `MIN()`           | Minimum                                       |
| `MAX()`           | Maximum                                       |
| WHERE             | Filter rows                                   |
| HAVING            | Filter groups                                 |
| Subquery          | Query inside query                            |
| EXISTS            | Check whether matching row exists             |
| Index             | Faster lookup/search                          |
| Composite Index   | Index across multiple columns                 |
| Transaction       | Atomic unit of DB work                        |
| ACID              | Atomicity, Consistency, Isolation, Durability |
| Window Function   | Calculate across rows without collapsing them |
| `ROW_NUMBER()`    | Unique ranking                                |
| `RANK()`          | Ranking with gaps                             |
| `DENSE_RANK()`    | Ranking without gaps                          |
| `LAG()`           | Previous row                                  |
| `LEAD()`          | Next row                                      |
| `EXPLAIN`         | Show query plan                               |
| `EXPLAIN ANALYZE` | Execute + inspect actual plan/statistics      |
| N+1               | Excessive related queries                     |
| Keyset Pagination | Efficient large-data pagination               |

---

# 🔥 Complexity / Performance Mental Model

Unlike DSA, database performance isn't usually summarized by a single Big-O number.

Think:

```text
Query Performance
       │
       ├── Number of rows
       ├── Selectivity
       ├── Indexes
       ├── Join strategy
       ├── Sorting
       ├── Aggregation
       ├── Disk I/O
       ├── Memory
       ├── Cache
       ├── Network
       └── Query plan
```

Therefore:

> **Don't optimize SQL based only on what looks theoretically faster. Inspect the execution plan and measure.**

---

# 🏆 SENIOR SQL INTERVIEW QUESTIONS

You should eventually be able to answer all of these.

### JOINs

1. INNER JOIN vs LEFT JOIN?
2. How do you find users without orders?
3. What happens if a JOIN condition isn't selective?
4. What causes duplicate rows after a JOIN?
5. How would you debug unexpected JOIN results?

### GROUP BY

6. WHERE vs HAVING?
7. Why must non-aggregated selected columns generally appear in GROUP BY?
8. How do you find the top customer by total spending?

### Subqueries

9. JOIN vs subquery?
10. Correlated vs non-correlated subquery?
11. `EXISTS` vs `IN`?
12. When can a correlated subquery become expensive?

### Indexes

13. What is an index?
14. How does an index improve lookup?
15. Why not index every column?
16. What is a composite index?
17. Why does column order matter?
18. What is a covering/index-only scan?
19. How do you determine whether an index is actually being used?

### Transactions

20. What is a transaction?
21. Explain ACID.
22. What is isolation?
23. What problems can occur with concurrent transactions?
24. What is a deadlock?
25. What happens during rollback?

### Window Functions

26. GROUP BY vs window function?
27. `ROW_NUMBER` vs `RANK` vs `DENSE_RANK`?
28. Find highest salary per department.
29. Find the second-highest salary per department.
30. Calculate a running total.
31. Find the previous transaction for each user.

### Optimization

32. How do you debug a slow query?
33. What is `EXPLAIN`?
34. What is `EXPLAIN ANALYZE`?
35. What is an N+1 query?
36. OFFSET vs keyset pagination?
37. When might an index hurt performance?
38. How do you optimize a query involving multiple JOINs?

---

# 🚀 MASTER MAP — DAY 3

```text
                         SQL
                          │
             ┌────────────┼────────────┐
             ↓            ↓            ↓
           JOIN        GROUP BY      SUBQUERY
             │            │            │
        combine data   aggregate    nested logic
             │            │            │
             └────────────┼────────────┘
                          ↓
                     RESULT SET
                          │
              ┌───────────┴───────────┐
              ↓                       ↓
          INDEXING                TRANSACTIONS
              │                       │
         faster reads             safe writes
              │                       │
              │                  ┌────┴────┐
              │                  ↓         ↓
              │               COMMIT    ROLLBACK
              │
              └──────────────┐
                             ↓
                     WINDOW FUNCTIONS
                             │
                calculations without
                   collapsing rows
                             │
                    ┌────────┼────────┐
                    ↓        ↓        ↓
               ROW_NUMBER  RANK     LAG
                    │        │        │
                    └────────┼────────┘
                             ↓
                     QUERY OPTIMIZATION
                             │
             ┌───────────────┼───────────────┐
             ↓               ↓               ↓
           INDEX          EXPLAIN           JOIN
             │               │               │
             └───────────────┼───────────────┘
                             ↓
                       FAST QUERIES
```

# 🎯 The Most Important 7 Things

If you remember only one thing from each topic:

```text
1. JOIN
   → Combine related tables.

2. GROUP BY
   → Turn rows into groups for aggregation.

3. HAVING
   → Filter aggregated groups.

4. INDEX
   → Trade storage/write overhead for faster reads.

5. TRANSACTION
   → Make related DB changes behave as one logical unit.

6. WINDOW FUNCTION
   → Calculate across related rows without losing the original rows.

7. QUERY OPTIMIZATION
   → Measure with execution plans, identify the bottleneck,
     optimize, and measure again.
```

### 🔥 And the senior-backend connection

```text
             FASTAPI
                ↓
             SERVICE
                ↓
           SQLAlchemy
                ↓
               SQL
                ↓
       ┌────────┼─────────┐
       ↓        ↓         ↓
      JOIN    INDEX    TRANSACTION
       │        │         │
       └────────┼─────────┘
                ↓
          DATABASE ENGINE
                ↓
          QUERY PLANNER
                ↓
          EXECUTION PLAN
                ↓
             RESULTS
```

**This is the level to aim for:** don't just know how to write `SELECT`. Be able to look at a slow API endpoint and reason from **FastAPI → SQLAlchemy → generated SQL → indexes → execution plan → database behavior**.
