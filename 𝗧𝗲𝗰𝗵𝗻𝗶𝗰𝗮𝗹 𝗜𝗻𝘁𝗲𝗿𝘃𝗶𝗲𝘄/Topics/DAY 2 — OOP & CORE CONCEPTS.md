# ☕ DAY 2 — OOP & CORE CONCEPTS

This day is **extremely important for senior Python interviews** because interviewers usually don't just ask *"What is inheritance?"*.

They ask:

> **"How would you design this?"**
> **"Why composition instead of inheritance?"**
> **"How do SOLID principles apply to your FastAPI code?"**
> **"How do you handle failures cleanly?"**

So let's learn these as **design principles**, not just definitions.

---

# 🧠 MASTER MENTAL MODEL

Think of OOP as a way to organize **state + behavior**.

```text
                         OOP
                          │
          ┌───────────────┼───────────────┐
          ↓               ↓               ↓
   Encapsulation      Inheritance    Polymorphism
          │               │               │
          ↓               ↓               ↓
   Protect state     Reuse/extend     Same interface
          │               │               │
          └───────────────┼───────────────┘
                          ↓
                     Abstraction
                          │
                          ↓
                Hide implementation
                          │
                          ↓
                       SOLID
                          │
                          ↓
                Maintainable Design
                          │
                          ↓
                Exception Handling
                          │
                          ↓
                 Reliable Software
```

---

# 1️⃣ ENCAPSULATION ⭐⭐⭐⭐⭐

## 🧠 Core idea

Encapsulation means:

> **Keep an object's data and the operations that manage that data together, while controlling how that state is accessed or modified.**

Example:

```python
class BankAccount:

    def __init__(self, balance):
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self._balance += amount

    def get_balance(self):
        return self._balance
```

Usage:

```python
account = BankAccount(1000)

account.deposit(500)

print(account.get_balance())
```

Instead of allowing arbitrary changes:

```python
account._balance = -999999
```

the class provides controlled operations.

---

## Python's "private" behavior

Python doesn't enforce private fields like Java/C++.

Convention:

```python
self._balance
```

means:

> "Internal implementation; don't access directly."

Double underscore:

```python
self.__balance
```

invokes **name mangling**, making accidental access from subclasses/external code harder.

It is **not true security/privacy**.

---

# Real Backend Example

Imagine a database connection.

Bad:

```python
connection.status = "closed"
connection.pool_size = -10
```

Better:

```python
class DatabaseConnection:

    def close(self):
        ...

    def execute(self, query):
        ...
```

The object controls how its internal state changes.

---

# 🔥 Interview Answer

> Encapsulation combines state and behavior and exposes a controlled interface, preventing callers from depending unnecessarily on internal implementation details.

---

# 2️⃣ INHERITANCE ⭐⭐⭐⭐

Inheritance means:

> **A child class derives behavior/state from a parent class.**

```python
class Animal:

    def speak(self):
        print("Some sound")


class Dog(Animal):

    def speak(self):
        print("Woof")
```

Now:

```python
dog = Dog()

dog.speak()
```

Output:

```text
Woof
```

Visual:

```text
        Animal
           │
     ┌─────┴─────┐
     ↓           ↓
    Dog         Cat
     │           │
   speak       speak
```

---

# Why inheritance?

It can provide:

* code reuse
* specialization
* common interfaces
* polymorphism

But don't automatically use inheritance whenever classes have something in common.

---

# 🚨 Composition vs Inheritance

Senior interviewers love this.

### Inheritance

```text
Dog IS-A Animal
```

### Composition

```text
Car HAS-A Engine
```

Example:

```python
class Car:

    def __init__(self, engine):
        self.engine = engine
```

You generally want inheritance when the subtype genuinely satisfies the parent abstraction.

For many designs:

> **Composition is more flexible than deep inheritance hierarchies.**

---

# 3️⃣ POLYMORPHISM ⭐⭐⭐⭐⭐

Poly = many
Morph = forms

Meaning:

> **The same interface can work with different implementations.**

Example:

```python
class Dog:
    def speak(self):
        return "Woof"


class Cat:
    def speak(self):
        return "Meow"
```

Now:

```python
def make_sound(animal):
    print(animal.speak())
```

Both work:

```python
make_sound(Dog())
make_sound(Cat())
```

The function doesn't care whether it receives a Dog or Cat.

---

# Python's Duck Typing

Python often uses:

> **If it behaves like the required object, use it.**

Example:

```python
def save(repository):
    repository.save()
```

It doesn't necessarily care about the concrete class.

```text
                 save()
                   ↑
          ┌────────┼────────┐
          │        │        │
      UserRepo  FileRepo  MockRepo
```

All can work if they provide the expected behavior.

This becomes very useful for:

* dependency injection
* testing
* repositories
* service abstractions
* plugins

---

# 4️⃣ ABSTRACTION ⭐⭐⭐⭐⭐

Abstraction means:

> **Expose what something does while hiding how it does it.**

Imagine:

```python
payment.process()
```

The caller doesn't need to know:

```text
API authentication
HTTP request
retry logic
database transaction
payment gateway protocol
```

They only need:

```text
process()
```

---

# Abstract Base Class

Python provides `abc`.

```python
from abc import ABC, abstractmethod


class PaymentProcessor(ABC):

    @abstractmethod
    def process(self, amount):
        pass
```

Implementation:

```python
class StripeProcessor(PaymentProcessor):

    def process(self, amount):
        print(f"Processing {amount}")
```

Another:

```python
class PaypalProcessor(PaymentProcessor):

    def process(self, amount):
        print(f"Processing {amount}")
```

Now:

```text
          PaymentProcessor
                  │
        ┌─────────┴─────────┐
        ↓                   ↓
 StripeProcessor      PaypalProcessor
        │                   │
     process()           process()
```

The abstraction defines the **contract**.

---

# Abstraction vs Encapsulation

Very common interview question.

### Encapsulation

> **How do I control access to internal state/behavior?**

### Abstraction

> **What complexity can I hide behind a simpler interface?**

Think:

```text
Encapsulation
    ↓
Protect/manage internals


Abstraction
    ↓
Hide unnecessary complexity
```

---

# 5️⃣ SOLID PRINCIPLES ⭐⭐⭐⭐⭐

SOLID is a set of five design principles for maintainable object-oriented software.

```text
S → Single Responsibility
O → Open/Closed
L → Liskov Substitution
I → Interface Segregation
D → Dependency Inversion
```

---

# S — Single Responsibility Principle

> **A class should have one reason to change.**

Bad:

```python
class User:

    def validate(self):
        ...

    def save_to_database(self):
        ...

    def send_email(self):
        ...

    def generate_pdf(self):
        ...
```

This class has too many responsibilities.

Better:

```text
User
 ↓
UserValidator

UserRepository
 ↓
Database

EmailService
 ↓
Email

PdfService
 ↓
PDF
```

In FastAPI:

```text
Router
 ↓
HTTP concerns

Service
 ↓
Business logic

Repository
 ↓
Database access
```

Each layer has a clearer responsibility.

---

# O — Open/Closed Principle

> **Software should be open for extension but closed for modification.**

Suppose:

```python
class Discount:

    def calculate(self, customer):
        if customer.type == "regular":
            ...
        elif customer.type == "premium":
            ...
        elif customer.type == "vip":
            ...
```

Every new customer type requires modifying the existing class.

Could instead use strategies:

```python
class DiscountStrategy:
    def calculate(self, amount):
        raise NotImplementedError


class RegularDiscount(DiscountStrategy):
    def calculate(self, amount):
        return amount


class PremiumDiscount(DiscountStrategy):
    def calculate(self, amount):
        return amount * 0.9
```

Now add:

```python
class VIPDiscount(DiscountStrategy):
    ...
```

without changing the existing strategies.

---

# L — Liskov Substitution Principle ⭐⭐⭐⭐⭐

This one is often misunderstood.

> **A subtype should be usable wherever its base type is expected without breaking the expected behavior.**

Classic example:

```text
Animal
  │
  └── Bird
```

Suppose:

```python
class Bird:
    def fly(self):
        ...
```

Then:

```python
class Penguin(Bird):
    def fly(self):
        raise Exception("I can't fly")
```

Problem:

```text
Code expects Bird
        ↓
calls fly()
        ↓
Penguin breaks assumption
```

The inheritance model is wrong.

The deeper lesson:

> **Don't force a subtype into an abstraction whose behavioral contract it cannot satisfy.**

---

# I — Interface Segregation Principle

> **Don't force clients to depend on methods they don't need.**

Bad:

```python
class Worker:

    def work(self):
        ...

    def eat(self):
        ...

    def sleep(self):
        ...
```

Now imagine a robot worker.

Does it need:

```python
eat()
```

Probably not.

Better to split interfaces/contracts:

```text
Workable
   ↓
work()

Eatable
   ↓
eat()

Sleepable
   ↓
sleep()
```

Python often expresses this using:

* small ABCs
* Protocols
* duck typing

---

# D — Dependency Inversion Principle ⭐⭐⭐⭐⭐

This is **very important for backend architecture**.

> **High-level code should depend on abstractions rather than concrete implementations.**

Bad:

```python
class UserService:

    def __init__(self):
        self.repository = PostgresUserRepository()
```

Now the service is tightly coupled to PostgreSQL implementation.

Better:

```python
class UserService:

    def __init__(self, repository):
        self.repository = repository
```

Then:

```text
                    UserService
                         │
                         ↓
                 UserRepository
                  abstraction
                    /      \
                   /        \
                  ↓          ↓
          PostgresRepo    MockRepo
```

Production:

```text
UserService
     ↓
PostgresRepository
```

Testing:

```text
UserService
     ↓
MockRepository
```

This is where **Dependency Injection** and SOLID connect.

---

# 🔥 SOLID Master Diagram

```text
                         SOLID
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
       SRP                OCP                LSP
        │                  │                  │
   One responsibility   Extend without    Subtypes must
   per component       changing existing   honor contract
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                     ┌─────┴─────┐
                     ↓           ↓
                    ISP         DIP
                     │           │
              Small interfaces  Depend on
              / contracts       abstractions
                     │           │
                     └─────┬─────┘
                           ↓
                  Maintainable Design
```

---

# 6️⃣ EXCEPTION HANDLING ⭐⭐⭐⭐⭐

Exception handling is how you deal with **unexpected or invalid situations without crashing the entire application unpredictably**.

Basic:

```python
try:
    result = 10 / 0

except ZeroDivisionError:
    print("Cannot divide by zero")
```

---

# The Structure

```python
try:
    # risky operation

except SomeError:
    # handle error

else:
    # runs if no exception

finally:
    # cleanup
```

Example:

```python
try:
    file = open("data.txt")

except FileNotFoundError:
    print("File doesn't exist")

else:
    print("File opened successfully")

finally:
    print("Cleanup")
```

---

# `raise`

You can deliberately raise an exception.

```python
def withdraw(balance, amount):

    if amount > balance:
        raise ValueError("Insufficient balance")

    return balance - amount
```

Mental model:

```text
Invalid condition
      ↓
   raise
      ↓
 Exception
      ↓
 nearest matching except
```

---

# Custom Exceptions ⭐⭐⭐⭐⭐

For production applications, custom exceptions are useful.

```python
class UserNotFoundError(Exception):
    pass
```

Then:

```python
def get_user(user_id):

    user = repository.get(user_id)

    if user is None:
        raise UserNotFoundError(
            f"User {user_id} not found"
        )

    return user
```

Now your service layer communicates a meaningful domain failure.

---

# FastAPI Exception Handling

You might have:

```python
from fastapi import HTTPException

raise HTTPException(
    status_code=404,
    detail="User not found"
)
```

But don't blindly put `HTTPException` everywhere.

A cleaner architecture can be:

```text
Repository
    ↓
returns / raises domain-level failure
    ↓
Service
    ↓
domain exception
    ↓
API exception handler
    ↓
HTTP 404
```

For example:

```text
UserNotFoundError
        ↓
FastAPI exception handler
        ↓
HTTP 404
```

This separates **business logic from HTTP concerns**.

---

# Exception Hierarchy

Python exceptions form a hierarchy.

```text
BaseException
    │
    ├── KeyboardInterrupt
    ├── SystemExit
    │
    └── Exception
          │
          ├── ValueError
          ├── TypeError
          ├── KeyError
          ├── IndexError
          ├── RuntimeError
          └── ...
```

Most application exceptions should derive from:

```python
Exception
```

not:

```python
BaseException
```

---

# 🚨 Don't Do This

Avoid:

```python
try:
    do_something()

except Exception:
    pass
```

This is dangerous.

You've just hidden the failure.

Also avoid unnecessarily broad exception handling:

```python
except Exception as e:
    print(e)
```

without deciding what recovery/action should happen.

---

# Good Exception Handling

```python
try:
    user = repository.get(user_id)

except DatabaseError:
    logger.exception(
        "Database failure while retrieving user",
        extra={"user_id": user_id},
    )
    raise
```

Notice:

```text
catch
 ↓
log context
 ↓
raise again
```

You're not silently hiding the error.

---

# `finally` and Cleanup

`finally` is useful when cleanup must happen regardless of success/failure.

```python
resource = acquire()

try:
    use(resource)

finally:
    resource.close()
```

But Python context managers are usually cleaner:

```python
with resource():
    use(resource)
```

This connects directly to the **Context Managers** topic from your earlier Python curriculum.

---

# 🚨 `except` Ordering

This is wrong:

```python
try:
    ...
except Exception:
    ...
except ValueError:
    ...
```

Because:

```text
ValueError
   ↓
Exception
```

the first handler catches it.

Correct:

```python
try:
    ...
except ValueError:
    ...
except Exception:
    ...
```

Specific → general.

---

# 🔥 OOP + Exception Handling in Backend Architecture

Now combine everything:

```text
                        API REQUEST
                             │
                             ↓
                         FastAPI
                             │
                             ↓
                          Router
                             │
                             ↓
                      UserService
                             │
                    ┌────────┴────────┐
                    ↓                 ↓
             Encapsulation      Abstraction
                    │                 │
                    └────────┬────────┘
                             ↓
                       Repository
                             │
                             ↓
                         Database
                             │
                       error occurs
                             ↓
                    Custom Exception
                             │
                             ↓
                     Exception Handler
                             │
                             ↓
                       HTTP Response
```

---

# 🏆 How SOLID Appears in Your FastAPI Code

This is where you should connect theory to real work.

### SRP

```text
Router
Service
Repository
Schema
```

Each has a focused responsibility.

---

### OCP

You can add:

```text
New payment provider
New notification provider
New storage provider
```

without rewriting the whole service.

---

### LSP

Different implementations should honor the same contract:

```text
PaymentProcessor
      │
 ┌────┴─────┐
 ↓          ↓
Stripe    Razorpay
```

Both should behave correctly wherever `PaymentProcessor` is expected.

---

### ISP

Prefer:

```text
Small focused interfaces
```

over:

```text
One giant interface
```

---

### DIP

Instead of:

```python
service → PostgreSQL implementation
```

use:

```text
service
   ↓
repository abstraction
   ↓
implementation
```

And FastAPI's Dependency Injection system can provide the concrete implementation.

---

# 🧠 Encapsulation vs Abstraction vs Inheritance vs Polymorphism

This is worth memorizing.

| Concept       | Question it answers                                 |
| ------------- | --------------------------------------------------- |
| Encapsulation | **How do I protect/manage internals?**              |
| Abstraction   | **What complexity can I hide?**                     |
| Inheritance   | **What behavior can I reuse/extend?**               |
| Polymorphism  | **Can different objects share the same interface?** |

Example:

```text
             PaymentProcessor
                    │
             abstraction
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
       Stripe              PayPal
          │                   │
          └──── process() ────┘
                    │
              polymorphism
```

Each implementation encapsulates its own gateway details.

---

# 🧠 Composition vs Inheritance

For senior interviews, remember:

```text
Inheritance:
IS-A

Dog IS-A Animal


Composition:
HAS-A

Car HAS-A Engine
```

Prefer composition when you want behavior to be replaceable:

```python
class NotificationService:

    def __init__(self, sender):
        self.sender = sender
```

Now:

```python
NotificationService(EmailSender())
NotificationService(SMSSender())
NotificationService(MockSender())
```

This is powerful for testing and extensibility.

---

# 🔥 One Realistic FastAPI Design

Imagine you're building:

```text
POST /users
```

A clean architecture could be:

```text
                    HTTP Request
                         │
                         ↓
                      Router
                         │
                         ↓
                 Pydantic Schema
                         │
                         ↓
                    UserService
                         │
                    Dependency
                         │
                         ↓
                 UserRepository
                         │
                         ↓
                    SQLAlchemy
                         │
                         ↓
                     Database
```

Failures:

```text
DatabaseError
     ↓
Repository
     ↓
Service
     ↓
UserNotFoundError / DomainError
     ↓
FastAPI Exception Handler
     ↓
HTTP response
```

SOLID:

```text
Router       → SRP
Service      → SRP
Repository   → SRP

Repository abstraction → DIP

Multiple repository implementations → Polymorphism

Pydantic/API interfaces → Abstraction

Dependency Injection → DIP
```

That's the level at which these concepts become useful.

---

# 🚨 Common Interview Traps

### ❌ "Encapsulation means private variables."

Not exactly.

Encapsulation is broader: **bundling state/behavior and controlling access to implementation details**.

---

### ❌ "Inheritance is always better than composition."

No.

Deep inheritance can create tight coupling.

> **Favor composition when inheritance doesn't represent a strong behavioral subtype relationship.**

---

### ❌ "Polymorphism requires inheritance."

Not in Python.

Duck typing allows polymorphism without a shared base class.

---

### ❌ "Abstraction means abstract classes only."

No.

Abstraction can be achieved through:

* functions
* classes
* interfaces/contracts
* ABCs
* Protocols
* modules

---

### ❌ "SOLID means every class needs an interface."

No.

SOLID is a set of design guidelines, not a requirement to create dozens of abstractions.

---

### ❌ "Catch every exception."

No.

Catch exceptions when you can:

```text
recover
transform
add useful context
translate to appropriate boundary
```

Otherwise allow them to propagate.

---

# 🎯 Senior Interview Questions

You should be able to answer these naturally:

### OOP

1. What is encapsulation?
2. Abstraction vs encapsulation?
3. Inheritance vs composition?
4. What is polymorphism in Python?
5. Does Python support method overloading?
6. What is duck typing?
7. When would you avoid inheritance?
8. What is MRO?
9. What is `super()`?

### SOLID

10. Explain all five SOLID principles.
11. Give a real example of SRP in FastAPI.
12. How does Dependency Injection relate to DIP?
13. Explain Liskov Substitution with a real example.
14. When can SOLID become over-engineering?
15. How would you refactor a large FastAPI endpoint using SOLID?

### Exceptions

16. Difference between `raise` and `return`?
17. `Exception` vs `BaseException`?
18. When should you create custom exceptions?
19. Why is `except Exception: pass` dangerous?
20. When would you use `finally`?
21. How would you design exception handling in FastAPI?
22. Where should HTTP-specific exceptions be created?

---

# 🧠 DAY 2 — FINAL CHEAT SHEET

```text
ENCAPSULATION
    ↓
Control access to state/implementation


INHERITANCE
    ↓
IS-A relationship
Reuse/extend behavior


POLYMORPHISM
    ↓
Same interface
Different implementations


ABSTRACTION
    ↓
Hide complexity
Expose essential behavior


SOLID
    ↓
S → One responsibility
O → Extend without modifying
L → Subtypes honor contracts
I → Small focused interfaces
D → Depend on abstractions


EXCEPTION HANDLING
    ↓
try
except
else
finally
raise
custom exceptions
```

---

# 🚀 THE BIG PICTURE

```text
                     OBJECT-ORIENTED DESIGN
                              │
          ┌───────────────────┼───────────────────┐
          ↓                   ↓                   ↓
   Encapsulation         Abstraction         Inheritance
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ↓
                       Polymorphism
                              │
                              ↓
                       SOLID Principles
                              │
               ┌──────────────┼──────────────┐
               ↓              ↓              ↓
              SRP            DIP            OCP
               │              │              │
               └──────────────┼──────────────┘
                              ↓
                    Maintainable Backend
                              │
                              ↓
                    Dependency Injection
                              │
                              ↓
                       FastAPI Services
                              │
                              ↓
                    Repository / Database
                              │
                              ↓
                    Exception Handling
                              │
                              ↓
                     Reliable API
```

### 🔥 The one mental model I want you to retain

> **OOP gives you the building blocks. SOLID tells you how to arrange those blocks. Dependency Injection makes those blocks replaceable. Exception handling makes the system resilient.**

And for your **Python + FastAPI senior-interview path**, the most important connection is:

```text
OOP
 ↓
Abstraction
 ↓
Polymorphism
 ↓
SOLID
 ↓
Dependency Injection
 ↓
FastAPI Architecture
 ↓
Testability + Maintainability
```

That connection is far more valuable than memorizing the definitions individually.
