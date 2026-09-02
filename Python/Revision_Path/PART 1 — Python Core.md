# 🐍 PART 1 — Python Core

This is the **foundation layer**. If you truly understand these 13 topics, later topics like OOP, iterators, generators, decorators, async programming, and frameworks become much easier.

![Image](https://images.openai.com/static-rsc-4/OGnNOKEuMVKqOhNIUzomP1TDyYg-yEueYG0qUcdT-BP-SKUnyg57TrataW1oQ8mNCCcAGgdGQ4At-_6XZ8ERHO17iQU-VnPqfpFlvxmsWkZtLhbZXTuY1ALUBnlJXDY3bx3Lp5DIy027zTS2_khxfU_DSbq0_SxTJeXr410c_UyQX284GTlXr-m6K114eas_?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/dhYsYnRHNxPZh1_2b9bEwEnQeuW-gnpSuva8LHeMZHBDm-fEhRPjNgZDw7KdOEaUBukzY3TkIg7RQ06N04nEuHSDCCl0XUQLZHsDUmFyZjovPv5tW8JrsZl3suM6pHKL-31hBCFlLE7oPxXBpF_fEQ8X7mhdN3M7C1uaHWi6bg5xj4pGY4qTQYLbniH75Bq8?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/_5tGTssr5YvL4hKy7p9SfOJZ8QAFhSGLaNN0OFx-KsloSBTqwP_rIPkwAfH4vw8Sns4N7oUcsxPjRQ4IQosqN3d7ma7LTajWPsEBNF3sQIGURTELfiTt9nuGRhhjye0eaRSORi8D8C8xra513_hv14VYpKfsZc_QIesvgMaZZwtcClobJFquWvDoeiSPQpyz?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/FpaLdUVyx4G4C9yymC3d2Xej6FKWfahSXvP6jIQ3A8RSkm-9-LCWlllxY0v4LLYNFPM--8pak3Y0HfMRZoBkPIz2uszpUfc6vkp6Jm6ipHnm0HNRodVIuL3Wmckf2-FjVn_-GNQQHvqUz6tefSUJdYHPEVfjt-OMoVtvnW3rQbC4CRcajWI6djjKD6ThaSq2?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/TeC4ysRRlVKU8p_xqo58HRRVPXtawsxPD2xBlHhH22u5CEuGxtZlzDq4jNCgk2PsvQT8rMqArvm24tSaQL90jIjwPghiJIBl1sjvmqadRiTVeaO82dTzK4yU74wTO6ohMSsdC4H7b5inanqgSNWhfzouM9vyoX5vAk-gqQhjGjOOUfbDU3whouEH6fC8Iegr?purpose=fullsize)

## 🧠 First: the BIG mental model

```text
                         PYTHON
                           │
                           ▼
                     EVERYTHING
                      IS AN OBJECT
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
          Numbers       Strings       Collections
                                        │
                         ┌──────────────┼──────────────┐
                         ▼              ▼              ▼
                       List           Tuple           Set
                                                        │
                                                        ▼
                                                     Dict
```

And variables:

```text
x = [10, 20]

        x
        │
        │ reference
        ▼
   ┌────────────┐
   │ [10, 20]   │  ← OBJECT
   └────────────┘
```

**Very important:** `x` is not the object itself.
`x` is a **name/reference pointing to an object**.

---

# 01. Python Execution Model

When you write:

```python
x = 10
print(x)
```

Think:

```text
.py source code
      │
      ▼
 Python interpreter
      │
      ▼
 bytecode
      │
      ▼
 Python Virtual Machine
      │
      ▼
 execute instructions
```

Conceptually:

```text
SOURCE
  │
  ▼
Parsing / compilation
  │
  ▼
BYTECODE
  │
  ▼
Python VM
  │
  ▼
Execution
```

You can inspect bytecode:

```python
import dis

def add(a, b):
    return a + b

dis.dis(add)
```

### 🎯 Mental model

Don't think:

> Python directly executes my `.py` file.

Think:

> **Python turns source code into instructions that the Python runtime executes.**

---

# 02. Variables & Objects

This is probably the **single most important foundation concept**.

```python
x = 10
```

Think:

```text
             x
             │
             ▼
       ┌──────────┐
       │    10    │
       │  object  │
       └──────────┘
```

Now:

```python
y = x
```

becomes:

```text
       x ───────┐
                ▼
             ┌────┐
             │ 10 │
             └────┘
                ▲
       y ───────┘
```

There is **one object** and two references.

Now:

```python
x = 20
```

```text
       x ─────────► 20

       y ─────────► 10
```

Assignment changes the **reference**, not the original object.

### 🔥 Remember

```text
variable = reference/name
object   = actual value/data
```

---

# 03. Data Types

Python has many built-in types.

### Numbers

```python
int
float
complex
```

### Text

```python
str
```

### Collections

```python
list
tuple
set
dict
```

### Other important types

```python
bool
NoneType
bytes
bytearray
range
```

Visual:

```text
                  DATA TYPES
                      │
        ┌─────────────┼──────────────┐
        │             │              │
      Numeric        Text         Collection
        │             │              │
   int float       str       ┌───────┼────────┐
   complex                    │       │        │
                             list   tuple     set
                                     
                                      dict
```

You can inspect a type:

```python
x = 100

print(type(x))
```

Output:

```text
<class 'int'>
```

---

# 04. Mutable vs Immutable

This is **extremely important** for interviews and real Python debugging.

## Mutable

Can change after creation.

```python
list
dict
set
bytearray
```

Example:

```python
x = [1, 2, 3]

x.append(4)
```

Same list object changed.

```text
BEFORE                 AFTER

[1,2,3]       ───►     [1,2,3,4]
 SAME OBJECT
```

---

## Immutable

Cannot change after creation.

Examples:

```python
int
float
bool
str
tuple
frozenset
bytes
```

Example:

```python
x = 10

x = 20
```

It may look like `10` changed into `20`.

But conceptually:

```text
x ───► 10

        ↓ assignment

x ───► 20
```

The `10` object wasn't modified.

### ⭐ Golden rule

> **Mutable = object can change.**
> **Immutable = object cannot change.**

---

# 05. `==` vs `is`

One of the most frequently tested Python concepts.

## `==`

Checks:

> **Do these objects have equal values?**

```python
a = [1, 2]
b = [1, 2]

print(a == b)
```

```text
True
```

Because:

```text
[1,2]
[1,2]

same CONTENT
```

---

## `is`

Checks:

> **Are these the exact same object?**

```python
print(a is b)
```

```text
False
```

Because:

```text
a ─────► [1,2]

b ─────► [1,2]
```

Two separate objects.

### Visual

```text
==

a ───► [1,2]
b ───► [1,2]

       CONTENT
       SAME
       ↓
      True


is

a ───► [1,2]

b ───► [1,2]

   DIFFERENT OBJECTS
       ↓
      False
```

### Best practice

For `None`:

```python
if x is None:
    ...
```

Prefer this over:

```python
if x == None:
    ...
```

---

# 06. Numbers

Python supports:

```python
int
float
complex
```

## Integer

```python
x = 100
```

Python integers can grow very large.

```python
x = 999999999999999999999999999
```

---

## Float

```python
x = 3.14
```

Be aware:

```python
0.1 + 0.2
```

may produce:

```text
0.30000000000000004
```

because floating-point numbers are represented approximately in binary.

---

## Complex

```python
z = 2 + 3j
```

```python
z.real   # 2.0
z.imag   # 3.0
```

### Operators

```python
+    addition
-    subtraction
*    multiplication
/    division
//   floor division
%    modulo
**   exponentiation
```

Example:

```python
10 / 3
# 3.333...

10 // 3
# 3

10 % 3
# 1
```

---

# 07. Strings

A string is an **immutable sequence of characters**.

```python
name = "Python"
```

Think:

```text
 P   y   t   h   o   n
 0   1   2   3   4   5
```

Therefore:

```python
name[0]
```

→ `"P"`

And:

```python
name[-1]
```

→ `"n"`

Strings support:

```text
indexing
slicing
iteration
concatenation
many methods
```

Example:

```python
name = "Python"

print(name.upper())
print(name.lower())
print(name[0:3])
```

Output:

```text
PYTHON
python
Pyt
```

But:

```python
name[0] = "J"
```

❌ Error — strings are immutable.

---

# 08. Lists

List = **ordered + mutable + allows duplicates**.

```python
numbers = [10, 20, 30]
```

Visual:

```text
index:    0    1    2
          ↓    ↓    ↓
list →  [10,  20,  30]
```

You can modify:

```python
numbers.append(40)
numbers[0] = 99
numbers.pop()
```

Lists can contain different types:

```python
data = [
    10,
    "hello",
    3.14,
    True,
    [1, 2]
]
```

### Mental model

```text
LIST
 │
 ├── ordered
 ├── mutable
 ├── indexed
 ├── duplicates allowed
 └── can contain anything
```

---

# 09. Tuples

Tuple = **ordered + immutable**.

```python
point = (10, 20)
```

Visual:

```text
index:    0    1
          ↓    ↓
tuple →  (10,  20)
```

You can read:

```python
point[0]
```

But:

```python
point[0] = 99
```

❌ Error.

### Why use tuples?

Useful for data that shouldn't be modified.

```python
coordinates = (22.57, 88.36)
```

Also tuples can be dictionary keys if their contents are hashable:

```python
locations = {
    (22, 88): "Kolkata"
}
```

---

# 10. Sets

Set = **collection of unique elements**.

```python
numbers = {1, 2, 3, 3, 3}

print(numbers)
```

Result:

```text
{1, 2, 3}
```

Duplicates disappear.

```text
{1, 2, 2, 3, 3, 3}
          │
          ▼
       {1,2,3}
```

Useful operations:

```python
a = {1, 2, 3}
b = {3, 4, 5}
```

Union:

```python
a | b
```

```text
{1,2,3,4,5}
```

Intersection:

```python
a & b
```

```text
{3}
```

Difference:

```python
a - b
```

```text
{1,2}
```

### Mental model

> **Set = uniqueness + fast membership operations.**

---

# 11. Dictionaries

Dictionary stores:

```text
KEY → VALUE
```

Example:

```python
user = {
    "name": "Alice",
    "age": 25
}
```

Visual:

```text
       DICTIONARY

"name" ─────► "Alice"

"age"  ─────► 25
```

Access:

```python
user["name"]
```

Add:

```python
user["city"] = "Kolkata"
```

Update:

```python
user["age"] = 26
```

Delete:

```python
del user["age"]
```

Important:

```text
keys → unique + hashable
values → can be almost anything
```

Modern Python dictionaries preserve **insertion order**.

---

# 12. Slicing

Slicing is:

```python
sequence[start : stop : step]
```

The most important rule:

> **start is included, stop is excluded.**

Example:

```python
text = "Python"
```

```text
 P   y   t   h   o   n
 0   1   2   3   4   5
```

```python
text[1:4]
```

gives:

```text
 y   t   h
```

→ `"yth"`

Visual:

```text
text[start : stop : step]
       │       │      │
       │       │      └── jump
       │       └───────── excluded
       └───────────────── included
```

Examples:

```python
text[:3]      # Pyt
text[3:]      # hon
text[::2]     # Pto
text[::-1]    # nohtyP
```

### 🔥 Remember

```text
[start : stop)

START → included
STOP  → excluded
```

This same concept applies to:

```python
list
tuple
string
range
```

and other slice-supporting objects.

---

# 13. Operators

Think of operators as Python's **action symbols**.

## Arithmetic

```python
+
-
*
/
//
%
**
```

## Comparison

```python
==
!=
>
<
>=
<=
```

## Logical

```python
and
or
not
```

Example:

```python
age = 25

age >= 18 and age < 60
```

---

## Assignment

```python
=
+=
-=
*=
/=
```

Example:

```python
x = 10
x += 5
```

Equivalent conceptually to:

```python
x = x + 5
```

---

## Membership

```python
in
not in
```

```python
"Py" in "Python"
```

→ `True`

```python
5 in [1, 2, 3]
```

→ `False`

---

## Identity

```python
is
is not
```

Remember:

```text
== → same VALUE?

is → same OBJECT?
```

---

## Bitwise

```python
&
|
^
~
<<
>>
```

Example:

```python
5 & 3
```

Binary:

```text
5 = 101
3 = 011

    101
AND 011
    ---
    001

= 1
```

---

# 🧠 FINAL MASTER MAP

If you want to **actually master Part 1**, memorize this structure:

```text
                         PYTHON
                           │
                    EVERYTHING IS
                       AN OBJECT
                           │
             ┌─────────────┴─────────────┐
             │                           │
        VARIABLE                      OBJECT
             │                           │
        points to                  has a TYPE
             │                           │
             ▼                           ▼
             x                        int/list/str/...
             │
             ▼
         reference
```

Then:

```text
OBJECT
  │
  ├── Mutable
  │      ├── list
  │      ├── dict
  │      └── set
  │
  └── Immutable
         ├── int
         ├── float
         ├── str
         ├── tuple
         └── bool
```

Collections:

```text
              COLLECTIONS
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
     LIST        TUPLE        SET
   ordered      ordered      unique
   mutable     immutable
       │           │
       └───────────┴──────────────► DICT
                                    key → value
```

Comparison:

```text
             COMPARISON
                 │
        ┌────────┴────────┐
        ▼                 ▼
       ==                 is
    same value?        same object?
```

Slicing:

```text
sequence[start : stop : step]
             │       │
          include   exclude
```

And execution:

```text
.py
 │
 ▼
Python runtime
 │
 ▼
bytecode
 │
 ▼
Python VM
 │
 ▼
execution
```

## 🔥 The 10 things I would make sure you can explain without looking

1. **Why is a variable not the object?**
2. **What actually happens when `x = y`?**
3. **What does mutable mean?**
4. **Why does `a == b` sometimes differ from `a is b`?**
5. **Why are strings immutable?**
6. **List vs tuple vs set vs dictionary?**
7. **Why does `a[1:5]` not include index `5`?**
8. **What is the difference between `/`, `//`, and `%`?**
9. **What does `in` actually test?**
10. **What happens conceptually when Python executes a `.py` file?**

If you can answer those **from memory and write small examples**, your Python foundation is becoming solid.
