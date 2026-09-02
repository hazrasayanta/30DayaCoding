# 🐍 PART 3 — Functions

This is a **very important jump** in Python.

Part 1 taught you **objects/data**.
Part 2 taught you **control flow**.
Part 3 teaches you how to **package, reuse, pass around, and control logic**.

![Image](https://images.openai.com/static-rsc-4/fs6Bvoe0Kktsv-U34Ge7Xq_W5QKTwZd9ErfJbaSFJlEX7hCR38ptitGxIvkothKw_T1Z16c1pZP9yAaQlRVcY86FSti0K4CLon2LeZXNNf5zqUNbx7PS0EFQmBoXyrsiA9OpbNIMLfYATpMzvfmPpV_LnzH0_wFx52z3CErf9CUGflUBYYwQ2jrYrVKIOe7_?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/gzSRO0IcjcFLkDpZLACECppQto6a7D52g0Hf7eW8UpUXXfhYOlQn12s6Rax5DfwP49TkQc7tlgwSKwjeeZW6SNdFziulphzDL02VI6aIxwlWTiDHk_ySQMFAqYCbG9kKWINSxcXlAqrCZikQdaPkRmKF-7GMHNqABJ2FjmliT9OiFKB9GCmvPLgjD78-A90U?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/F_lbA02BAwBuU3t8aPd-0ZYd8Lv1j3YrKwNHL_jsLIjfxLM5TGMwKqwHThAQ844QUcO9N_80cMPSfF03tt8G0BBTJHikoS-fOzIpgzCaFRbsWZQTpBwg9he0QYpRLk0aIl1O_fsNFIv2nOOmUBrYqPyVbTTNlVIR9z8ia-dE06vTPVYb_1yyu8wVEMAuFsci?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/iJl710nNaiLw5Zz7DOSIhGMiYHRONcO5rYuebtTZo1979ZCft7GwOh-8SO1CZtnXFyMQKtZAACewdMKR8nL-FyqIrEysaAnz195M_Bjhp3qGF9zj6aTGXlio5zcg-MqxiPlp5JWQRyLSW4yWKJtB65TKgOHwePbHCU2X2R_aUgqgH21bhQeDst_wUaB5B4eb?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/Hbe2O5v41wmUbhJ-TppvLknH8-eqqbfHqfMPr8FekeaObAHQ-HN1dxwc3DbEV4mms1i-ur1XHqU0R37nSUk4GJjsUYpYBNv76VTwR4VGhdexMNQzND7IwhJpHPs1H6UZaC9kZ0dwKwoZWUPZWAD3v-MLzWhru8KfK0YM1urudgAr1OyBU8PBfdw3-7A4QIV0?purpose=fullsize)

## 🧠 THE MASTER MAP

```text id="4tqz1x"
                         FUNCTIONS
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
        DEFINE / CALL                  FUNCTION DATA
             │                             │
     ┌───────┼────────┐              ┌─────┴─────┐
     ▼       ▼        ▼              ▼           ▼
 parameters arguments return       lambda    first-class
     │
     ├── default arguments
     ├── keyword arguments
     ├── *args
     └── **kwargs

                    FUNCTION SCOPE
                         │
                         ▼
                       LEGB
                         │
                ┌────────┼────────┐
                ▼        ▼        ▼
              local  enclosing  global
                                      │
                                   built-in

                         │
                    global/nonlocal
```

---

# 1. Functions

A function is a **reusable block of code**.

```python
def greet(name):
    return f"Hello, {name}"
```

Then call it:

```python
message = greet("Alice")
print(message)
```

Visual:

```text
                greet("Alice")
                      │
                      ▼
              ┌──────────────┐
              │ greet(name)  │
              │              │
              │ name=Alice   │
              │              │
              │ return ...   │
              └──────┬───────┘
                     │
                     ▼
              "Hello, Alice"
```

### Function lifecycle

```text
def function()
      │
      ▼
CREATE function object
      │
      ▼
call function()
      │
      ▼
execute body
      │
      ▼
return result
```

Important:

```python
def hello():
    print("Hello")
```

**doesn't execute `hello()` yet.**

It only defines the function.

Execution happens when:

```python
hello()
```

---

# 2. Parameters vs Arguments

This distinction is extremely important.

```python
def add(a, b):
    return a + b
```

Here:

```text
a, b → PARAMETERS
```

When you call:

```python
add(10, 20)
```

then:

```text
10, 20 → ARGUMENTS
```

Visual:

```text
DEFINITION

def add(a, b):
          ↑  ↑
       parameters


CALL

add(10, 20)
    ↑   ↑
  arguments
```

### Easy memory trick

> **Parameters = placeholders**
> **Arguments = actual values**

---

# 3. `*args`

Suppose you don't know how many positional arguments you'll receive.

```python
def total(*args):
    print(args)
```

Call:

```python
total(10, 20, 30)
```

Inside the function:

```python
args
```

is a **tuple**:

```text
(10, 20, 30)
```

Visual:

```text
total(10, 20, 30)
       │   │   │
       └───┼───┘
           ▼
        *args
           │
           ▼
      ┌───────────┐
      │ 10 20 30  │
      └───────────┘
          tuple
```

Example:

```python
def total(*args):
    return sum(args)

print(total(1, 2, 3))
```

Result:

```text
6
```

### ⭐ Remember

```text
*args → extra positional arguments → tuple
```

---

# 4. `**kwargs`

`kwargs` handles extra **keyword arguments**.

```python
def show_info(**kwargs):
    print(kwargs)
```

Call:

```python
show_info(
    name="Alice",
    age=25,
    city="Kolkata"
)
```

Inside:

```python
kwargs
```

becomes:

```python
{
    "name": "Alice",
    "age": 25,
    "city": "Kolkata"
}
```

Visual:

```text
show_info(
    name="Alice",
    age=25,
    city="Kolkata"
)

             │
             ▼
          **kwargs
             │
             ▼
       ┌──────────────┐
       │ name → Alice │
       │ age  → 25    │
       │ city → ...   │
       └──────────────┘
              dict
```

### ⭐ Remember

```text
*args   → positional → tuple
**kwargs → keyword   → dict
```

---

# 5. Default Arguments

You can provide a default value.

```python
def greet(name, message="Hello"):
    return f"{message}, {name}"
```

Now:

```python
greet("Alice")
```

uses:

```text
message = "Hello"
```

But:

```python
greet("Alice", "Welcome")
```

uses:

```text
message = "Welcome"
```

Visual:

```text
                greet(name, message="Hello")
                              │
                    ┌─────────┴─────────┐
                    │                   │
                argument             default
                  given               used
                    │                   │
                    ▼                   ▼
              "Welcome"             "Hello"
```

### Important rule

Non-default parameters must come before default parameters:

```python
def greet(name, message="Hello"):
    ...
```

Good.

But:

```python
def greet(message="Hello", name):
    ...
```

❌ Invalid.

---

# 6. Keyword Arguments

You can pass arguments by parameter name.

```python
def user(name, age, city):
    ...
```

Positional:

```python
user("Alice", 25, "Kolkata")
```

Keyword:

```python
user(
    name="Alice",
    age=25,
    city="Kolkata"
)
```

You can also change the order:

```python
user(
    city="Kolkata",
    name="Alice",
    age=25
)
```

Visual:

```text
POSITIONAL

user("Alice", 25, "Kolkata")
       │       │       │
       ▼       ▼       ▼
      name    age     city


KEYWORD

user(
    city="Kolkata",
    name="Alice",
    age=25
)

     ↓ explicit mapping ↓

city → "Kolkata"
name → "Alice"
age  → 25
```

### Mental model

```text
positional → position matters
keyword    → name matters
```

---

# 7. Scope

Scope answers:

> **Where can I access this variable?**

Example:

```python
x = 10

def test():
    y = 20
    print(x)
    print(y)
```

Visual:

```text
GLOBAL SCOPE
┌──────────────────────────┐
│ x = 10                   │
│                          │
│   FUNCTION test()        │
│   ┌──────────────────┐   │
│   │ y = 20           │   │
│   │                  │   │
│   │ can access x     │   │
│   │ can access y     │   │
│   └──────────────────┘   │
└──────────────────────────┘
```

`y` is local to `test()`.

Outside:

```python
print(y)
```

❌ `NameError`

---

# 8. LEGB

This is **critical**.

When Python sees:

```python
print(x)
```

it searches for `x` using:

```text
L → E → G → B
```

Meaning:

```text
L = Local
E = Enclosing
G = Global
B = Built-in
```

Visual:

```text
                x ?
                 │
                 ▼
           ┌───────────┐
           │  LOCAL    │
           └─────┬─────┘
                 │ not found
                 ▼
           ┌───────────┐
           │ ENCLOSING │
           └─────┬─────┘
                 │ not found
                 ▼
           ┌───────────┐
           │  GLOBAL   │
           └─────┬─────┘
                 │ not found
                 ▼
           ┌───────────┐
           │ BUILT-IN  │
           └───────────┘
```

Example:

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)

    inner()

outer()
```

Output:

```text
local
```

Because Python finds the local `x` first.

---

# 9. `global` / `nonlocal`

These become easy once LEGB is understood.

## `global`

Means:

> "I want to modify the variable from the global scope."

```python
x = 10

def change():
    global x
    x = 20

change()

print(x)
```

Result:

```text
20
```

Without `global`:

```python
x = 10

def change():
    x = 20
```

Python treats `x` as a **local variable** inside the function.

---

## `nonlocal`

Used with nested functions.

```python
def outer():
    x = 10

    def inner():
        nonlocal x
        x += 1

    inner()
    print(x)

outer()
```

Output:

```text
11
```

Visual:

```text
GLOBAL
  │
  ▼
outer()
  │
  ├── x = 10
  │
  └── inner()
        │
        │ nonlocal x
        ▼
      modifies outer x
```

### Remember

```text
global   → module/global scope
nonlocal → nearest enclosing function scope
```

---

# 10. Lambda

A lambda is a small anonymous function.

Normal function:

```python
def square(x):
    return x * x
```

Lambda:

```python
square = lambda x: x * x
```

Visual:

```text
lambda x: x * x
   │      │
   │      └── expression
   └───────── parameter
```

Example:

```python
add = lambda a, b: a + b

print(add(3, 4))
```

Result:

```text
7
```

Common usage:

```python
numbers = [1, 2, 3, 4]

result = list(map(lambda x: x * 2, numbers))
```

### Important

Lambda is intended for **small expressions**.

```python
lambda x: x * 2
```

Good.

For complicated multi-step logic, use `def`.

---

# 11. First-Class Functions

This is a **big Python concept**.

In Python, functions are objects.

Therefore you can:

```text
store them
pass them
return them
put them in collections
```

Example:

```python
def greet(name):
    return f"Hello {name}"
```

Store function:

```python
f = greet
```

Now:

```python
f("Alice")
```

works.

Visual:

```text
             greet
               │
               ▼
        ┌──────────────┐
        │ FUNCTION     │
        │ OBJECT       │
        └──────────────┘
          ▲     ▲    ▲
          │     │    │
        store  pass return
```

Function in list:

```python
functions = [greet, print, len]
```

This works because functions are **first-class objects**.

---

# 12. Higher-Order Functions

A higher-order function is a function that:

> **takes another function as an argument OR returns a function.**

Example 1:

```python
def apply(func, value):
    return func(value)
```

Then:

```python
def square(x):
    return x * x

print(apply(square, 5))
```

Result:

```text
25
```

Visual:

```text
        square
           │
           │ function
           ▼
      ┌──────────┐
      │  apply   │
      │          │
      │ func(5)  │
      └────┬─────┘
           │
           ▼
          25
```

---

## Higher-order function can return a function

```python
def multiplier(factor):

    def multiply(number):
        return number * factor

    return multiply
```

Then:

```python
double = multiplier(2)

print(double(10))
```

Result:

```text
20
```

This connects directly to **closures** from your earlier topic.

```text
Higher-order function
        │
        ▼
 returns inner function
        │
        ▼
     Closure
        │
        ▼
 remembers factor
```

---

# 🔥 `*args` + `**kwargs` together

You will see this constantly in professional Python.

```python
def func(*args, **kwargs):
    print(args)
    print(kwargs)
```

Call:

```python
func(1, 2, 3, name="Alice", age=25)
```

Result conceptually:

```text
args
 ↓
(1, 2, 3)

kwargs
 ↓
{
    "name": "Alice",
    "age": 25
}
```

Visual:

```text
                    func(...)
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
          *args               **kwargs
             │                   │
             ▼                   ▼
          tuple                 dict
             │                   │
        1, 2, 3            name → Alice
                           age  → 25
```

---

# 🧠 THE COMPLETE FUNCTION MAP

```text
                         FUNCTION
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
               PARAMETERS         ARGUMENTS
                   │                 │
       ┌───────────┼───────────┐     │
       ▼           ▼           ▼     │
    default      *args       **kwargs │
       │           │           │      │
       │         tuple        dict    │
       │                              │
       └────────── keyword arguments ─┘


                         FUNCTION
                            │
                            ▼
                         SCOPE
                            │
                            ▼
                           LEGB
                            │
                 ┌──────────┼──────────┐
                 ▼          ▼          ▼
               Local    Enclosing    Global
                                         │
                                         ▼
                                      Built-in

                     global / nonlocal
                            │
                            ▼
                      control lookup/
                      modification


                         FUNCTION
                            │
               ┌────────────┼────────────┐
               ▼            ▼            ▼
             lambda    first-class   higher-order
                            │            │
                            │       takes/returns
                            │       functions
                            │
                            ▼
                       function
                         object
```

# ⭐ MASTER CHEAT SHEET

| Topic                 | Remember                              |
| --------------------- | ------------------------------------- |
| Function              | Reusable block of code                |
| Parameter             | Placeholder in definition             |
| Argument              | Actual value passed                   |
| `*args`               | Extra positional → tuple              |
| `**kwargs`            | Extra keyword → dict                  |
| Default argument      | Used when argument isn't supplied     |
| Keyword argument      | Passed using parameter name           |
| Scope                 | Where a name is accessible            |
| LEGB                  | Local → Enclosing → Global → Built-in |
| `global`              | Refer to/modify global variable       |
| `nonlocal`            | Refer to/modify enclosing variable    |
| Lambda                | Small anonymous function              |
| First-class function  | Function is an object                 |
| Higher-order function | Takes/returns a function              |

## 🚨 The 5 concepts that unlock the rest

If you really want to **master Python**, pay special attention to:

```text
              FUNCTIONS
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
     SCOPE     FIRST-CLASS   CLOSURES
       │          │           │
      LEGB        │           │
       │          ▼           ▼
       │      HIGHER-ORDER  remembers
       │       FUNCTIONS    variables
       │          │
       └──────────┼───────────┘
                  ▼
              DECORATORS
```

Once **scope → LEGB → closures → first-class functions → higher-order functions** clicks, decorators will stop feeling like Python magic. They become a logical combination of these concepts.
