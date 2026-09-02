# 🐍 PART 5 — OOP (Object-Oriented Programming)

OOP becomes much easier if you stop thinking of it as **17 separate topics**.

Think:

> **Class = blueprint → Object = actual thing → Methods = behavior → Variables = state → Inheritance = reuse → MRO/super = control inheritance behavior → Abstract classes/Protocols = contracts → Dunder methods = Python integration.**

![Image](https://images.openai.com/static-rsc-4/l60gpTTfq8ClxvLdULYFfAtsc0G2SX-U9fAk7GJgxo6kHfCpUfy83SXPbfcMD7_o91hJXjul_Cuwa_miS8582hNSjLfhunjjAuaDXrmNjfT712GUVwSn3Kgb_Zch9_ZDOiMbaMd6zm67uX5-Jdx7d8Nc3MyT-t_H-TTuNhMkG1dCGeISwcpfcQwFd9hQHiAz?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/CAdP2nyHTjsrjV2f_oap0nruNgNgOBA1E6AVKBfs5RdGu0HtV06WnhaZ59lrgItG0w7onPzM1kqNOneSfKyHR2-3mEQo-ZBrJEPAcd6QIyJXjBKBTle7QFiZ2L3LklJ3dvj6AR1Bjk1olITT4Uq2z2ANGXcTGUDAbgTis2v86CyfxrUaw7yZvHfizkcBXuF6?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/GqKRyDQ-FsqghfNiw7o0dU6ZQZHRdVFEwG-Kr80wv2BUHfgDug-1tMI_3Awetf70Rz-bGEvRAdoCBdqDtvwbopfGChRotbce9iLX-xX-LMtg3mPcEoTkbzVEEDSo9b7fIQ5cYmSRmG47R30COqnMr6EYAApVqcqXLkJxd1uzQVQSFZWjQnPBsS_U8ixUD6YV?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/qD_kFpV79B4SyUn7zQhHYIwuj1Iuox6D519CLSpge6JB71eeTpIzfUYoPHdflNrTW1NJfNS7VeV_45jHsN-gEuwrr2buGPGSxsMyBtrwuZ61nzPlkENSb3g1ZuIC4bRNzjCE0ib_gILRJc-m2mYl3s0XMZQU0LHxifz0wGvuglHrGenGKl8a6sFnS_PnZXOP?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/28_lZLjVNMy98gFoLd_jjYWk_fGwE7Z6idIuLdPRaDz1fBSUSHyCz_9u06VePkOYth69x6bU0QDhXQCzsfmvms0ZUYJv6jIdYCDRdZ0PiujDVWPCNr7O7Awy-SC9ZCc9zEVz7E4tcfwR6IrXbDjTBq3wdOX7HXb30ZBDNiUH9fVGsymqHUtDdc1StF57EvQi?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/VXQQ4vV9VtrmZnxY8x6aCuQfWZyt-bnnt2UbrpfsSXhZqoCFzl03lYediu0MAddhe2JNhr5ryO8AvXhgBjlejsyz1fptlPELyczoAjXJk-RRwZyUPbS8rA1Q8Zh-D3Jl-aAu5rxNVi_3wCAjzHn-C-OOmePNJg5XAOdyO8fdup55osx4egfrMRFgaEgKMPqt?purpose=fullsize)

# 🧠 THE BIG OOP MAP

```text id="7r9k2a"
                         OOP
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
         CLASS / OBJECT             METHODS
             │                         │
       ┌─────┼─────┐             ┌─────┼──────┐
       ▼     ▼     ▼             ▼     ▼      ▼
     init   self  variables    instance class static
                     │                    │
              ┌──────┴──────┐            │
              ▼             ▼            ▼
          instance        class      property
          variables      variables
              
                         INHERITANCE
                              │
               ┌──────────────┼──────────────┐
               ▼              ▼              ▼
          overriding      multiple          MRO
                                            │
                                            ▼
                                         super()

                         CONTRACTS
                            │
                    ┌───────┴───────┐
                    ▼               ▼
              Abstract Class     Protocol

                         PYTHON MAGIC
                              │
                              ▼
                       __dunder__ methods
```

---

# 1. Class & Object

### Class = blueprint

```python id="d7qf6j"
class Dog:
    pass
```

### Object = instance created from the class

```python id="h0x2l9"
dog1 = Dog()
dog2 = Dog()
```

Visual:

```text id="3ks8c8"
                 CLASS
              ┌───────────┐
              │    Dog    │
              │           │
              │ blueprint │
              └─────┬─────┘
                    │
             creates objects
              ┌─────┴─────┐
              ▼           ▼
          dog1 object   dog2 object
```

Think:

```text id="8od8h8"
Class  = blueprint
Object = actual thing
```

Like:

```text id="a1v7e6"
Class → Car blueprint
Object → my_car
Object → your_car
```

---

# 2. `__init__`

`__init__` initializes a newly created object's state.

```python id="82r3dx"
class Dog:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Now:

```python id="g8w6xv"
dog = Dog("Tom", 3)
```

Conceptually:

```text id="f8y1ef"
Dog("Tom", 3)
      │
      ▼
create object
      │
      ▼
__init__(self, "Tom", 3)
      │
      ▼
self.name = "Tom"
self.age  = 3
```

### ⚠️ Important

Strictly speaking, `__init__` **initializes** the object; object creation itself is associated with `__new__`.

For normal Python OOP, however, you usually focus on:

```text id="4v0fkl"
object created
     ↓
__init__ initializes it
```

---

# 3. `self`

`self` means:

> **the current object/instance**

```python id="4dj2nb"
class Dog:

    def set_name(self, name):
        self.name = name

    def show(self):
        print(self.name)
```

```python id="b0b4ml"
dog = Dog()

dog.set_name("Tom")
dog.show()
```

Visual:

```text id="qv2cyn"
dog
 │
 │ self
 ▼
┌──────────────┐
│ Dog object   │
│              │
│ name = Tom   │
└──────────────┘
```

When you write:

```python id="g9sl10"
dog.show()
```

Python conceptually passes the object:

```python id="c3mm4t"
Dog.show(dog)
```

That's why the method has:

```python id="8d6e0f"
self
```

as its first parameter.

---

# 4. Instance Variables

These belong to **one particular object**.

```python id="kzqz1m"
class Car:

    def __init__(self, brand, color):
        self.brand = brand
        self.color = color
```

```python id="y0jzj9"
car1 = Car("Toyota", "Red")
car2 = Car("Honda", "Blue")
```

Visual:

```text id="s9q5y8"
car1                       car2
 │                          │
 ▼                          ▼
┌──────────────┐       ┌──────────────┐
│ brand Toyota │       │ brand Honda  │
│ color Red    │       │ color Blue   │
└──────────────┘       └──────────────┘
```

Each object has its own state.

### Mental model

```text id="m1g3dc"
self.x → instance variable
```

---

# 5. Class Variables

Class variables belong to the **class** and are generally shared.

```python id="v5l3po"
class Car:
    wheels = 4
```

Now:

```python id="7r7q6a"
car1 = Car()
car2 = Car()
```

Both can access:

```python id="1u2zqg"
car1.wheels
car2.wheels
```

Visual:

```text id="9l5k8c"
             Car CLASS
          ┌────────────┐
          │ wheels = 4 │
          └─────┬──────┘
                │
          ┌─────┴─────┐
          ▼           ▼
        car1         car2
```

### Difference

```text id="v7jqg6"
Instance variable
     ↓
belongs to each object

Class variable
     ↓
belongs to the class / shared class-level state
```

---

# 6. Instance Methods

Normal methods operating on an object's data.

```python id="p5d3z8"
class Car:

    def __init__(self, brand):
        self.brand = brand

    def start(self):
        return f"{self.brand} started"
```

```python id="c7c2w1"
car = Car("Toyota")

car.start()
```

Visual:

```text id="jv7l8d"
Car object
    │
    ├── brand = Toyota
    │
    └── start()
          │
          ▼
     uses self.brand
```

First parameter:

```python id="4q6v6f"
self
```

---

# 7. `@classmethod`

A class method receives the **class** as its first argument.

Convention:

```python id="n3f4l5"
cls
```

Example:

```python id="r0t6p5"
class Car:

    wheels = 4

    @classmethod
    def set_wheels(cls, number):
        cls.wheels = number
```

Call:

```python id="3l7g1m"
Car.set_wheels(6)
```

Visual:

```text id="z4h2rm"
          Car CLASS
             │
             │ cls
             ▼
       set_wheels()
             │
             ▼
         wheels = 6
```

### Common use

Alternative constructors:

```python id="3p3h0m"
class User:

    def __init__(self, name):
        self.name = name

    @classmethod
    def from_string(cls, text):
        return cls(text.strip())
```

Then:

```python id="1j5f1u"
user = User.from_string(" Alice ")
```

### Remember

```text id="6q8qyl"
instance method → self
class method    → cls
```

---

# 8. `@staticmethod`

A static method doesn't automatically receive:

```text id="xq3q7r"
self
```

or:

```text id="a8k2fs"
cls
```

Example:

```python id="5m5w4n"
class Math:

    @staticmethod
    def add(a, b):
        return a + b
```

Call:

```python id="pp6a6d"
Math.add(2, 3)
```

It is basically a function logically grouped inside the class.

### Mental model

```text id="i7r4dj"
instance method → needs object
classmethod     → needs class
staticmethod    → needs neither automatically
```

---

# 9. `@property`

This lets you expose method logic like an attribute.

Instead of:

```python id="a8q3gd"
circle.get_radius()
```

you can write:

```python id="xw8l9n"
circle.radius
```

Example:

```python id="9ojy0u"
class Circle:

    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius
```

Now:

```python id="f5s1jb"
c = Circle(5)

print(c.radius)
```

Visual:

```text id="6z2b0j"
c.radius
   │
   ▼
@property
   │
   ▼
radius()
   │
   ▼
self._radius
```

You can also provide a setter:

```python id="6z5m1r"
@radius.setter
def radius(self, value):
    if value < 0:
        raise ValueError("Invalid radius")
    self._radius = value
```

Now:

```python id="qf4h8j"
c.radius = 10
```

can perform validation.

### Mental model

> `property` gives you **attribute syntax with method behavior**.

---

# 10. Inheritance

Inheritance means:

> A child class gets behavior from a parent class.

```python id="0e4kha"
class Animal:

    def speak(self):
        print("Some sound")


class Dog(Animal):
    pass
```

Now:

```python id="y8n7wv"
dog = Dog()

dog.speak()
```

works.

Visual:

```text id="x9l0q4"
             Animal
          ┌──────────┐
          │ speak()  │
          └────┬─────┘
               │
           inherits
               ▼
             Dog
          ┌──────────┐
          │ speak()  │
          └──────────┘
```

### Mental model

```text id="2f1jbi"
Parent
  ↓
Child
  ↓
inherits behavior
```

---

# 11. Method Overriding

A child can replace a parent's implementation.

```python id="84a4z8"
class Animal:

    def speak(self):
        return "Some sound"


class Dog(Animal):

    def speak(self):
        return "Bark"
```

Now:

```python id="d2h0l5"
dog = Dog()

print(dog.speak())
```

Output:

```text id="f0w4b6"
Bark
```

Visual:

```text id="e6x8p1"
Animal.speak()
     │
     │ overridden
     ▼
Dog.speak()
     │
     ▼
"Bark"
```

This is **polymorphic behavior**.

---

# 12. Multiple Inheritance

A class can inherit from more than one parent.

```python id="f4q5x2"
class A:
    def hello(self):
        print("A")


class B:
    def hello(self):
        print("B")


class C(A, B):
    pass
```

Now:

```python id="r7y8v1"
c = C()

c.hello()
```

Which `hello()`?

Python needs an order.

That's where **MRO** comes in.

Visual:

```text id="3s7g8n"
       A       B
        \     /
         \   /
           C
```

---

# 13. MRO

MRO = **Method Resolution Order**.

It answers:

> **When I call a method, where does Python look first?**

For:

```python id="3d7g5z"
class C(A, B):
    pass
```

you can inspect:

```python id="6k8z6q"
C.mro()
```

Conceptually:

```text id="e2z8wx"
C
↓
A
↓
B
↓
object
```

Python searches in that order.

For more complex inheritance, Python uses the **C3 linearization** algorithm to construct the MRO.

### 🔥 Remember

```text id="6g3b3s"
MRO = "Where will Python search?"
```

---

# 14. `super()`

`super()` lets you access behavior from the next class in the MRO.

Example:

```python id="1w9r1p"
class Animal:

    def speak(self):
        return "Some sound"


class Dog(Animal):

    def speak(self):
        parent = super().speak()
        return parent + " + Bark"
```

Then:

```python id="t3l0g7"
dog.speak()
```

Result:

```text id="n2o6za"
Some sound + Bark
```

Visual:

```text id="x4s7k9"
Dog.speak()
     │
     ▼
 super().speak()
     │
     ▼
Animal.speak()
     │
     ▼
"Some sound"
     │
     ▼
Dog adds " + Bark"
```

### Very important

Don't think:

> `super()` always means "my parent".

Better:

> **`super()` follows the MRO to access the next implementation.**

This distinction becomes important with multiple inheritance.

---

# 15. Abstract Classes

An abstract class defines a **contract** for subclasses.

Python provides this through `abc`.

```python id="r6t8y1"
from abc import ABC, abstractmethod

class Shape(ABC):

    @abstractmethod
    def area(self):
        pass
```

Now:

```python id="j2m5k0"
class Circle(Shape):

    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2
```

You cannot normally instantiate `Shape` directly because it has an unimplemented abstract method.

Visual:

```text id="g6d9q0"
              Shape
        ┌────────────────┐
        │ abstract area() │
        └───────┬────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
     Circle           Rectangle
       │                  │
       └── implements ────┘
             area()
```

### Mental model

> Abstract class = **"You MUST provide this behavior."**

---

# 16. Protocols

Protocols provide **structural typing**.

This is a very powerful modern Python concept.

Instead of asking:

> "Does this class inherit from `Shape`?"

a Protocol can say:

> "Does this object have the required behavior?"

Example:

```python id="0c4n2s"
from typing import Protocol

class HasArea(Protocol):

    def area(self) -> float:
        ...
```

Now:

```python id="u2z5r7"
class Circle:

    def area(self) -> float:
        return 10.5
```

`Circle` doesn't have to inherit from `HasArea`.

It simply satisfies the structure.

Visual:

```text id="1d8m0j"
              Protocol
            HasArea
               │
        requires area()
               │
        ┌──────┴──────┐
        ▼             ▼
     Circle       Rectangle
        │             │
     area()          area()
        │             │
        └──────┬──────┘
               ▼
          satisfies
           protocol
```

### Abstract class vs Protocol

```text id="o5w0yu"
ABC
 │
 └── "You belong to my inheritance hierarchy."

Protocol
 │
 └── "You behave according to my interface."
```

This is essentially:

```text id="5o0q0s"
ABC      → nominal / inheritance-oriented
Protocol → structural / behavior-oriented
```

---

# 17. Magic / Dunder Methods

"Dunder" means:

```text
double underscore
```

Examples:

```python id="c4t5s9"
__init__
__str__
__repr__
__len__
__eq__
__add__
__call__
```

These allow your objects to interact naturally with Python.

---

## `__str__`

Controls human-readable representation.

```python id="g0v9s4"
class User:

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name
```

Then:

```python id="9p7r4w"
print(User("Alice"))
```

Python calls:

```python id="p6z8v0"
__str__()
```

---

## `__len__`

Allows:

```python id="5t6v9r"
len(obj)
```

to work.

```python id="7j3m2s"
def __len__(self):
    return 10
```

---

## `__eq__`

Controls:

```python id="1z7f5q"
a == b
```

---

## `__add__`

Controls:

```python id="3g9n2k"
a + b
```

---

## `__call__`

Makes an object callable:

```python id="x4k9r2"
obj()
```

Example:

```python id="4z2p7w"
class Greeter:

    def __call__(self, name):
        return f"Hello {name}"

g = Greeter()

print(g("Alice"))
```

Visual:

```text id="8n2j7s"
                 OBJECT
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
       __str__   __len__  __call__
          │        │        │
          ▼        ▼        ▼
       print()   len()     obj()
```

### 🔥 Mental model

> Dunder methods are Python's **protocol hooks** that let your objects participate in built-in syntax and operations.

---

# 🧠 THE COMPLETE OOP CONNECTION

Now connect everything:

```text id="h8k3z1"
                         CLASS
                           │
                    creates object
                           │
                           ▼
                        OBJECT
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
          STATE         BEHAVIOR      IDENTITY
             │             │
       ┌─────┴─────┐       │
       ▼           ▼       ▼
    instance      class   methods
    variables    variables
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           instance   class      static
            method    method      method
              │
              ▼
             self
```

Then:

```text id="d9r7k2"
                       INHERITANCE
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
          overriding    multiple         reuse
                            │
                            ▼
                           MRO
                            │
                            ▼
                         super()
```

And contracts:

```text id="3k5n9b"
                     INTERFACE / CONTRACT
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
                 ABC              Protocol
                    │                 │
             inheritance         behavior
              required?           required?
```

And Python integration:

```text id="0u8d2e"
                       YOUR OBJECT
                           │
                           ▼
                    DUNDER METHODS
                           │
       ┌──────────┬────────┼─────────┬─────────┐
       ▼          ▼        ▼         ▼         ▼
    __str__    __len__   __eq__   __add__   __call__
       │          │        │         │         │
     print()    len()     ==        +        obj()
```

---

# 🔥 The OOP cheat sheet

| Concept              | Mental model                         |
| -------------------- | ------------------------------------ |
| Class                | Blueprint                            |
| Object               | Instance                             |
| `__init__`           | Initialize object                    |
| `self`               | Current instance                     |
| Instance variable    | Per-object state                     |
| Class variable       | Class-level/shared state             |
| Instance method      | Works with instance                  |
| `@classmethod`       | Works with class                     |
| `@staticmethod`      | Independent utility grouped in class |
| `@property`          | Attribute syntax + method logic      |
| Inheritance          | Reuse parent behavior                |
| Overriding           | Child replaces behavior              |
| Multiple inheritance | Multiple parents                     |
| MRO                  | Search order for methods             |
| `super()`            | Next implementation in MRO           |
| Abstract class       | Enforced interface/contract          |
| Protocol             | Structural interface                 |
| Dunder methods       | Python behavior hooks                |

# 🎯 The 7 concepts to MASTER first

Don't give all 17 equal weight.

Focus heavily on:

```text id="k5m8x2"
             CLASS
               │
               ▼
             OBJECT
               │
        ┌──────┴──────┐
        ▼             ▼
      self          STATE
        │             │
        ▼             ▼
     methods      variables
        │
        ▼
   INHERITANCE
        │
   ┌────┴────┐
   ▼         ▼
  MRO      super()
```

Then add:

```text id="v7n2p4"
ABC
 │
 ▼
Protocol
 │
 ▼
Dunder methods
```

### ⭐ One sentence for each

```text id="p0h3d1"
Class       → blueprint
Object      → actual instance
self        → current object
__init__    → initialize state
Inheritance → reuse behavior
MRO         → decide where method is found
super()     → continue along MRO
ABC         → enforce implementation
Protocol    → require behavior, not inheritance
Dunder      → connect objects to Python syntax
```

**The deepest OOP idea is this:** don't memorize `self`, `super()`, MRO, `classmethod`, etc. independently. Understand that **Python objects have state + behavior, classes organize that state/behavior, inheritance creates relationships, MRO determines lookup, and dunder methods define how your objects participate in Python's language protocols.** Once that picture is clear, the individual features become much easier.
