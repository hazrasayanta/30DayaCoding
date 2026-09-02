# 🐍 PART 2 — Control Flow

The easiest way to understand Control Flow is:

> **Control flow = deciding WHERE the program goes and HOW MANY TIMES it executes something.**

![Image](https://images.openai.com/static-rsc-4/YQ_r47gvspbwa8qnLGkGszK3wa-rbHljCiKYjV8tXx4FCMruhLtloZ2QYUQDGfDLXcy-7eG-VE4KnL23DOcDITeBcWIdHx_v31xG4cQIqMNDtMi_CnrXQMcoF73DFJRf-Uxx_VZjubN2VoqTuFrqUrdrhdtp55cSkAqCgpCtrgs7myfiBlwTLAxB2YtIs5Sv?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/1S3GZUb8I3wtzWqDfxK32GaMhpC159Otk3-NnveieP-tD9SQR3AKUkp-1dpkqS0f-TliLcd6gYqMnvJnkUscv90wBnh1LDK4GdTi2DqN1OzBZF2rQbYd9juuk1ZjXE03cd9l-RbNr8na8SyeCBd_cCwubKH21bYWDczE6uCLoqaHil4e1tb7KaiNUYl7nGvD?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/SpGD8pSg8urpbemCiUpMmlnTN7Fduo4FG3Wa4xn2rok1phfitFR_gZQ_WWqZkfvF5G-8U6j4iYlmEjdPtEFtsbFKJdEWPIj969x7q8fAK3IPOJ4nGzLLpRyOmN710f95YkgUL4EE6hQRRv6p_fpKYyFOB1QrHDfy_lMpn4ha6fhnLdoYunU2KlPuL-ynVWbJ?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/OTNCd-0WivfvBNze34xFHP8ixiIrMsN6iSwJdkMu3BglIUkmTXJ3Uz1oFjNsrnzQs1Gwb7k3M-4w67r8gvSxyq-EewVvYgFp32wA1oCiHp--U-DisKFele8bgY9I8yJOKvUX7-ZcEgNtDFSxMO2jw685M34mI4xHoiPx5S7uhx0ZfGcjbphaj_XxDK8AFKky?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/wxSYnB_plVIvYEjdjAdp5jee7PL9YYPZpzfKlhbIj57FdXKqQpcwRajs59eTno1Aus1FtwUQbGXmRAz9qqqVxKUGJToyj4nE-6KQXGGo2agxUeNbxGTvHgmg0AXDoohClgMazMoI5zC4EcYoLjgUKq2ogrOzsJPDgtsbWsgD0pLg0w5mTAJQAByXQdVOt0lo?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/tm-U9I3hGhEhIB5x4-Zfnype2A6nI17oWFXq8TC3jM3kxvUTIA87JaCa6eu6z3UBy6Fg9MUE6-xPUN7ozpayZ8ZCc2s36IiXrUKWbC2RZNh6xFCyyD9HWbBf6GMk3O3rv6GuUzyQSbawKUg1VVySN2RR8PBZYXWmGAO_W01LRsnVuxXXtIF09ezvTdYlSRwu?purpose=fullsize)

## 🧠 THE MASTER MAP

```text
                    CONTROL FLOW
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       DECISION       REPETITION      PATTERN
          │              │              │
    if / elif / else   for / while   match / case
                         │
                ┌────────┼────────┐
                ▼        ▼        ▼
              break   continue   pass
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
            range    enumerate     zip
```

---

# 1. `if / elif / else`

Used when your program needs to **make a decision**.

```python
age = 25

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")
```

Think:

```text
                  age >= 18?
                   /     \
                YES       NO
                 │         │
              Adult    age >= 13?
                         /    \
                       YES     NO
                        │       │
                      Teen    Child
```

### Important

Python checks conditions **from top to bottom**.

```python
if condition1:
    ...
elif condition2:
    ...
elif condition3:
    ...
else:
    ...
```

Once one condition is `True`, the remaining branches are skipped.

### 🔥 Mental model

```text
if       → first possibility
elif     → another possibility
else     → everything remaining
```

---

# 2. `for` loops

A `for` loop means:

> **Take items one by one from an iterable.**

```python
numbers = [10, 20, 30]

for number in numbers:
    print(number)
```

Visual:

```text
[10, 20, 30]
     │
     ▼
 ┌─────────┐
 │   10    │ ──► print
 └─────────┘
     │
     ▼
 ┌─────────┐
 │   20    │ ──► print
 └─────────┘
     │
     ▼
 ┌─────────┐
 │   30    │ ──► print
 └─────────┘
     │
     ▼
    END
```

A `for` loop works with **iterables**:

```python
list
tuple
string
set
dict
range
generator
file
...
```

Example:

```python
for char in "Python":
    print(char)
```

---

# 3. `while` loops

A `while` loop means:

> **Keep executing while the condition is True.**

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

Visual:

```text
             ┌──────────────┐
             │ count <= 5 ? │
             └──────┬───────┘
                  YES│
                     ▼
               ┌─────────┐
               │  print  │
               └────┬────┘
                    ▼
             count = count + 1
                    │
                    └──────────┐
                               │
                               ▼
                        condition again
                               │
                         NO ────┘
                               ▼
                              END
```

### ⚠️ Infinite loop

```python
count = 1

while count <= 5:
    print(count)
```

Problem:

```text
count never changes
       ↓
condition stays True
       ↓
FOREVER ♾️
```

### Mental model

```text
for   → iterate over something
while → repeat while condition is true
```

---

# 4. `break / continue / pass`

These are **flow-control tools**.

## `break`

> **Immediately leave the loop.**

```python
for i in range(10):
    if i == 5:
        break
    print(i)
```

Output:

```text
0
1
2
3
4
```

Visual:

```text
0 → 1 → 2 → 3 → 4 → 5
                      │
                    break
                      │
                      ▼
                     END
```

---

## `continue`

> **Skip this iteration and move to the next one.**

```python
for i in range(5):
    if i == 2:
        continue
    print(i)
```

Output:

```text
0
1
3
4
```

Visual:

```text
0 → print
1 → print
2 → SKIP ──► next iteration
3 → print
4 → print
```

---

## `pass`

> **Do nothing.**

```python
for i in range(5):
    if i == 2:
        pass
    print(i)
```

`pass` does **not** skip the iteration.

It literally means:

```text
"There's nothing to do here."
```

Useful when writing incomplete code:

```python
def future_function():
    pass
```

### ⭐ Remember

```text
break    → EXIT
continue → SKIP
pass     → DO NOTHING
```

---

# 5. `range()`

`range()` generates a sequence of numbers.

### One argument

```python
range(5)
```

means:

```text
0 1 2 3 4
```

Not `0 → 5`.

### Two arguments

```python
range(2, 6)
```

means:

```text
2 3 4 5
```

### Three arguments

```python
range(1, 10, 2)
```

means:

```text
1 3 5 7 9
```

Visual:

```text
range(start, stop, step)
       │       │     │
       │       │     └── jump
       │       └──────── excluded
       └──────────────── included
```

### Reverse

```python
range(5, 0, -1)
```

```text
5 → 4 → 3 → 2 → 1
```

### 🔥 Important

In Python 3:

```python
range(1000000000)
```

doesn't create a billion integers as a list in memory.

It represents the sequence efficiently.

---

# 6. `enumerate()`

Suppose:

```python
names = ["Alice", "Bob", "Charlie"]
```

You want both:

```text
index + value
```

Without `enumerate()`:

```python
for i in range(len(names)):
    print(i, names[i])
```

With `enumerate()`:

```python
for i, name in enumerate(names):
    print(i, name)
```

Visual:

```text
names
  │
  ▼
┌─────┬─────────┐
│  0  │ Alice   │
│  1  │ Bob     │
│  2  │ Charlie │
└─────┴─────────┘
```

Output:

```text
0 Alice
1 Bob
2 Charlie
```

You can choose the starting index:

```python
for i, name in enumerate(names, start=1):
    print(i, name)
```

Output:

```text
1 Alice
2 Bob
3 Charlie
```

### Mental model

```text
enumerate()
     ↓
(index, value)
```

---

# 7. `zip()`

`zip()` lets you iterate through multiple iterables **in parallel**.

```python
names = ["Alice", "Bob", "Charlie"]
scores = [90, 85, 88]

for name, score in zip(names, scores):
    print(name, score)
```

Visual:

```text
names                 scores

Alice   ─────────────► 90
Bob     ─────────────► 85
Charlie ─────────────► 88
```

Output:

```text
Alice 90
Bob 85
Charlie 88
```

### ⚠️ Important

`zip()` stops at the **shortest iterable**.

```python
names  = ["Alice", "Bob", "Charlie"]
scores = [90, 85]
```

Then:

```python
list(zip(names, scores))
```

gives:

```text
[
    ("Alice", 90),
    ("Bob", 85)
]
```

Charlie is not included.

### Mental model

```text
zip(A, B)

A1 ───── B1
A2 ───── B2
A3 ───── B3
```

---

# 8. `match / case`

`match/case` is Python's pattern-matching syntax.

It is useful when you have multiple possible patterns/values.

```python
status = "shipped"

match status:
    case "pending":
        print("Waiting")
    case "shipped":
        print("On the way")
    case "delivered":
        print("Delivered")
    case _:
        print("Unknown")
```

Visual:

```text
                 status
                    │
                    ▼
              ┌───────────┐
              │   match   │
              └─────┬─────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   "pending"    "shipped"   "delivered"
       │            │            │
     Waiting      On way      Delivered

                    │
                    ▼
                   case _
                (default)
```

The `_` acts as a catch-all pattern.

### `if/elif` vs `match/case`

```text
if / elif / else
      ↓
general conditions

match / case
      ↓
patterns / structured matching
```

For simple value comparisons, both can sometimes work.

---

# 🧠 The most important comparison

## `for` vs `while`

```text
FOR
 │
 └── "Give me each item"
 
WHILE
 │
 └── "Keep going while this is true"
```

Example:

```python
for x in [1, 2, 3]:
    print(x)
```

You already have something to iterate over.

Whereas:

```python
x = 1

while x <= 3:
    print(x)
    x += 1
```

You control the condition.

---

# 🧠 `range`, `enumerate`, `zip`

These three are worth learning together:

```text
             LOOP HELPERS
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
    range()   enumerate()   zip()
       │          │          │
       ▼          ▼          ▼
   numbers    index+value  parallel
```

### Example

```python
names = ["A", "B", "C"]
scores = [90, 80, 70]

for i, (name, score) in enumerate(zip(names, scores), start=1):
    print(i, name, score)
```

Output:

```text
1 A 90
2 B 80
3 C 70
```

This single example combines:

```text
enumerate
   +
zip
   +
for
```

---

# 🔥 MASTER CONTROL-FLOW MAP

```text
                         PROGRAM
                            │
                            ▼
                     CONTROL FLOW
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
       DECIDE             REPEAT           MATCH
          │                 │                 │
    if/elif/else        ┌────┴────┐       match/case
                        │         │
                       for      while
                        │         │
              ┌─────────┼─────────┤
              │         │         │
            break    continue    pass
              
                        │
                 LOOP HELPERS
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
           range    enumerate      zip
```

## ⭐ Memorize this cheat sheet

| Concept       | Mental model                |
| ------------- | --------------------------- |
| `if`          | Make a decision             |
| `elif`        | Try another condition       |
| `else`        | Everything remaining        |
| `for`         | Iterate over items          |
| `while`       | Repeat while True           |
| `break`       | Exit loop                   |
| `continue`    | Skip iteration              |
| `pass`        | Do nothing                  |
| `range()`     | Generate number sequence    |
| `enumerate()` | Index + value               |
| `zip()`       | Multiple iterables together |
| `match/case`  | Pattern matching            |

### 🎯 One final mental picture

```text
                  "What should my program do?"
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
        MAKE A DECISION                   REPEAT WORK
             │                                 │
       if / elif / else                   for / while
             │                                 │
             │                    ┌────────────┼───────────┐
             │                    ▼            ▼           ▼
             │                  break      continue       pass
             │
             ▼
        match / case

                         LOOP TOOLS
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
               range      enumerate       zip
```

**The key idea:** Part 1 taught you **what data is**. Part 2 teaches you **what your program does with that data**.

Next, the natural progression is **PART 3 — Functions**: function definition, parameters, arguments, return, scope, `*args`, `**kwargs`, lambda, recursion, first-class functions, and then the decorators/closures from your earlier list.
