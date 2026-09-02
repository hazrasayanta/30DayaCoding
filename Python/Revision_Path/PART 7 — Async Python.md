# PART 7 — Async Python ⚡

### Especially important for FastAPI and high-concurrency backend systems

The **single most important mental model** is:

> **Async Python is about efficiently handling waiting, not making Python code magically faster.**

![Image](https://images.openai.com/static-rsc-4/Y784OaxxZr8hB_cQJ9AQk-2EYkyAVUpVQK_OkTWOMmW38PDta7Y481Q1YqMzwowa0jqxWPOIVxAg68GhxtXVgwhxhblxumixxbBEMRLr70uutrYYQUwH9z2gqtAX1kcxMpJNfyqrInZdnUb7ZDu-BGdg_2-OiKDIlNv7CxHRWCMzToXvVvg2BQAAFWp6pc1f?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/gRn7JbYe32wfRjBQTA0M9xcMyW9EZI6SrZ6bGLpMyxV5nr9guqlrisxnWUjnk5y86RDfHE9KDguwVAtRGQ75Os2w8txXnBNGSRRq4UjqBi_jhnA0xBsXFjtrGjbvzuoVj5lPYLmbN5AbPOrZjXGmkflvvOWMY4lOxOAf2ftJX8CmkNhpSp3eMVOiEHYMgUBF?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/89WHDmGpjiOB4EudqVL-ETXQV_TY0tLBONBYaGeTJrVy3PVm_wcGUFtAljAqPBNdHgsVijtvRphgBhVXcFLXs_kNEvUcAeZRVlgOK3NGU84uty7GqD5gaB1Vr3NV4loxDlO86pYPMn7LBZHfXSficKLsqqnS5jilqd9UKE0aG70SljBjYTm17DcLJ_XJelBG?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/VKOpDGMxfo9kdRoKjAg8lQiQhCXh81KYg_U5_1sppc86m2ZsA5asdYYKoGM8nu02vw8rB5kmf0ywGiPvyYpq8m0cPxPwKZiZ4zw4WPQzZp661Ilu8ff6mmoFyy7fnKZIDYGJkILzohCDAt72mOwhC8wW6ooamG3WiqftFCVsk3Gdt6HxqMBTgZSfRC7sfn6T?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/1MPob-xtqQdsWeqW1cO1TkbR5jIZ4OZPHRFJJ1rcyQaNSbJgAoKdOTLP15swL2ybry9lvxpeO_byUFts95iZ2ZUmmh5VJ9RM9yibwTqya96Uonon4-it-AZFhnFMRMazGWxrIfibuqdZg-Sk-uRKBb9f4JhK2iARILBbirccN09LOMCiybvNZUIuJsfYVx87?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/d2PP2S_1Dlc1Qdus3v7S6pw8ACSL9kfRs3ii-cmSqSy2LLLzXn1UD8DrZvMy0Wb0JqgH_FfKzDkQoadRw6817NZCpM93-8Ryac-re3818yXd2Rbq6q2PAtnVGCjgXqEg5Z2LIno9faO0JdSJZouXN5Dhj9ucU__01JmcZul5ZFKkRgDVfs_MjytCSOz4YcI7?purpose=fullsize)

---

# 🧠 MASTER MENTAL MODEL

Think about a restaurant:

### Synchronous

```text
Customer A
   ↓
Order
   ↓
Wait for food 🍕
   ↓
Food arrives
   ↓
Customer B
   ↓
Order
   ↓
Wait...
```

The waiter is **stuck waiting**.

### Asynchronous

```text
Customer A
   ↓
Order
   ↓
Kitchen preparing 🍕
   ↓
        ↘
         Customer B
              ↓
           Order
              ↓
        Customer C
              ↓
           Order
              ↓
       ← Food A ready
```

The waiter doesn't sit idle while food is being prepared.

That's essentially what an **event loop** does.

---

# 1. Synchronous vs Asynchronous

## Synchronous

One operation completes before the next starts.

```python
def get_user():
    user = fetch_user()
    orders = fetch_orders()
    return user, orders
```

Conceptually:

```text
fetch_user
████████████

fetch_orders
            ████████████

Total:
████████████████████████
```

---

## Asynchronous

While one operation is waiting, another can make progress.

```python
async def get_data():
    user = await fetch_user()
    orders = await fetch_orders()
    return user, orders
```

If operations are independent:

```python
async def get_data():
    user, orders = await asyncio.gather(
        fetch_user(),
        fetch_orders()
    )
```

Now:

```text
fetch_user
████████████

fetch_orders
████████████

Total ≈ max(user, orders)
```

`asyncio` is specifically designed for concurrent asynchronous I/O and is commonly used underneath high-performance network and web frameworks. ([Python documentation][1])

---

# 2. Blocking vs Non-blocking

This distinction is **extremely important**.

## Blocking

The current execution cannot make progress until the operation finishes.

```python
import time

time.sleep(5)
```

Conceptually:

```text
Event Loop
    │
    ├── Task A
    │     ↓
    │   sleep(5)
    │     ↓
    │   BLOCKED ❌
    │
    └── Other tasks cannot run
```

---

## Non-blocking

The operation says:

> "I'm waiting. You can work on something else."

```python
await asyncio.sleep(5)
```

```text
Event Loop
    │
    ├── Task A
    │     ↓
    │   await I/O
    │     ↓
    │   suspended
    │
    ├── Task B → runs
    │
    ├── Task C → runs
    │
    └── Task D → runs
    │
    ↓
Task A ready
    ↓
continues
```

This is the heart of async programming.

---

# 🚨 FastAPI Connection

Consider:

```python
@app.get("/users")
async def users():
    data = await database.fetch(...)
    return data
```

While the database is responding:

```text
Request A
   ↓
await database
   ↓
waiting...
   
        Event Loop
            ↓
Request B ──────────→ executes
Request C ──────────→ executes
Request D ──────────→ executes

Database response
   ↓
Request A resumes
```

That's why async endpoints are powerful for **I/O-bound workloads**.

---

# 3. Coroutine

A coroutine is code that can **pause and resume**.

```python
async def hello():
    await asyncio.sleep(1)
    return "Hello"
```

Calling it:

```python
result = hello()
```

does **not** immediately execute the body.

You get a coroutine object.

```text
async def hello()
       ↓
hello()
       ↓
Coroutine Object
       ↓
await / schedule
       ↓
actually runs
```

Python's docs distinguish between a **coroutine function** (`async def`) and the **coroutine object** produced when you call it. ([Python documentation][2])

---

# 4. `async`

`async` defines asynchronous code.

```python
async def fetch_user():
    ...
```

It means:

> "This function is a coroutine function and can use `await`."

Compare:

```python
def normal():
    return 10
```

vs

```python
async def async_func():
    return 10
```

Calling:

```python
normal()
```

returns:

```text
10
```

Calling:

```python
async_func()
```

returns:

```text
Coroutine object
```

---

# 5. `await`

`await` means:

> **Pause this coroutine until this awaitable is ready, while allowing the event loop to run other work.**

Example:

```python
async def get_user():
    user = await database.fetch_user()
    return user
```

Mental model:

```text
Task
 ↓
await database
 ↓
PAUSE
 ↓
Event Loop runs another task
 ↓
database ready
 ↓
RESUME
 ↓
return user
```

Important:

```python
await
```

does **not** mean:

> "Stop the entire Python application."

It means:

> "Suspend this coroutine."

---

# 6. `asyncio`

`asyncio` is Python's standard asynchronous programming library.

```python
import asyncio
```

It provides:

* event loops
* coroutines
* Tasks
* Futures
* synchronization
* networking
* subprocess support
* queues
* timeouts
* cancellation

([Python documentation][1])

Typical program:

```python
import asyncio

async def main():
    print("Hello")
    await asyncio.sleep(1)
    print("World")

asyncio.run(main())
```

---

# 7. Event Loop ⭐⭐⭐

This is the **heart of asyncio**.

Think:

```text
             EVENT LOOP
                 │
       ┌─────────┼─────────┐
       ↓         ↓         ↓
     Task A    Task B    Task C
       │         │         │
     await     await      CPU
       │         │
       ↓         ↓
      I/O       I/O
       │         │
       └────┬────┘
            ↓
       Ready again
            ↓
       Resume task
```

The event loop repeatedly asks:

> "Which task is ready to run?"

A simplified lifecycle:

```text
Coroutine
    ↓
Task
    ↓
Event Loop
    ↓
Run coroutine
    ↓
await something
    ↓
Coroutine suspended
    ↓
Event Loop runs another task
    ↓
I/O completes
    ↓
Task becomes runnable
    ↓
Coroutine resumes
```

Asyncio uses **cooperative scheduling**: the event loop runs one task at a time, and when that task awaits an incomplete operation, another task can run. ([Python documentation][2])

---

# 8. Task ⭐⭐⭐

A **Task** is essentially a coroutine that has been scheduled to run by the event loop.

```python
async def work():
    await asyncio.sleep(2)
    return "done"
```

Coroutine:

```python
coro = work()
```

Task:

```python
task = asyncio.create_task(work())
```

Mental model:

```text
Coroutine
    │
    │ create_task()
    ↓
  Task
    │
    ↓
Event Loop
    │
    ↓
execution
```

A Task lets the coroutine run concurrently with other Tasks. ([Python documentation][2])

---

# 9. Future

A `Future` represents:

> **A result that will be available later.**

Think:

```text
Future
 ┌─────────────────────┐
 │ PENDING              │
 └──────────┬──────────┘
            │
         operation
            │
            ↓
 ┌─────────────────────┐
 │ DONE                 │
 │ result = 42          │
 └─────────────────────┘
```

Example conceptually:

```python
future = loop.create_future()

# Later:
future.set_result(42)

result = await future
```

### Coroutine vs Task vs Future

| Concept   | Meaning                          |
| --------- | -------------------------------- |
| Coroutine | Async code that can pause/resume |
| Task      | Scheduled coroutine              |
| Future    | Placeholder for eventual result  |

All three are **awaitable** in asyncio. ([Python documentation][2])

### Senior interview point

You normally **don't create Futures yourself** in application code. They are primarily a lower-level mechanism used to connect callback-based or event-loop APIs with async/await. ([Python documentation][2])

---

# 10. `gather()`

`asyncio.gather()` runs multiple awaitables concurrently and collects their results.

```python
results = await asyncio.gather(
    fetch_user(),
    fetch_orders(),
    fetch_profile()
)
```

Think:

```text
             gather()
                │
      ┌─────────┼─────────┐
      ↓         ↓         ↓
  user API  orders API  profile API
      │         │         │
      └─────────┼─────────┘
                ↓
        [user, orders, profile]
```

If:

```text
user     = 2 sec
orders   = 3 sec
profile  = 1 sec
```

Sequential:

```text
2 + 3 + 1 = 6 sec
```

Concurrent:

```text
max(2, 3, 1) ≈ 3 sec
```

`gather()` preserves the order of the supplied awaitables in its result list. By default, an exception is propagated, while other awaitables aren't automatically cancelled merely because one raises. ([Python documentation][2])

---

# 11. `create_task()`

`create_task()` schedules a coroutine immediately for concurrent execution.

```python
task1 = asyncio.create_task(fetch_user())
task2 = asyncio.create_task(fetch_orders())

user = await task1
orders = await task2
```

Compare:

### Sequential

```python
user = await fetch_user()
orders = await fetch_orders()
```

### Concurrent

```python
task1 = asyncio.create_task(fetch_user())
task2 = asyncio.create_task(fetch_orders())

user = await task1
orders = await task2
```

Visual:

```text
create_task(fetch_user())
        ↓
      Task A ────────→

create_task(fetch_orders())
        ↓
      Task B ─────────────→

             EVENT LOOP
                 ↓
          A and B progress
```

Python's current docs also recommend keeping a strong reference to tasks; for structured concurrency, `TaskGroup` is generally the more robust modern alternative. ([Python documentation][2])

---

# `gather()` vs `create_task()`

This is a **very common interview question**.

### `create_task()`

You want to **schedule a coroutine as a Task**.

```python
task = asyncio.create_task(work())
```

### `gather()`

You want to **run multiple awaitables concurrently and collect their results**.

```python
results = await asyncio.gather(
    work1(),
    work2(),
    work3()
)
```

Think:

```text
create_task()
     ↓
Schedule one coroutine
     ↓
      Task


gather()
     ↓
Multiple awaitables
     ↓
Concurrent execution
     ↓
Results list
```

---

# ⭐ Modern Python: `TaskGroup`

For senior-level Python, know this too.

```python
async with asyncio.TaskGroup() as tg:
    task1 = tg.create_task(fetch_user())
    task2 = tg.create_task(fetch_orders())
```

When the context exits, the tasks are awaited.

`TaskGroup` provides stronger structured-concurrency behavior than `gather()`, particularly around failures and cancellation. ([Python documentation][2])

---

# 12. Async Context Manager

Normal context manager:

```python
with resource():
    ...
```

Async context manager:

```python
async with resource():
    ...
```

It uses:

```python
__aenter__()
__aexit__()
```

Example:

```python
class Connection:
    async def __aenter__(self):
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc, tb):
        await self.close()
```

Usage:

```python
async with Connection() as conn:
    await conn.query()
```

Mental model:

```text
async with
    ↓
__aenter__()
    ↓
resource acquired
    ↓
use resource
    ↓
__aexit__()
    ↓
resource released
```

This is particularly useful for:

* async database connections
* HTTP clients
* locks
* transactions
* streams

---

# 13. Async Generator

A normal generator:

```python
def numbers():
    yield 1
    yield 2
    yield 3
```

Async generator:

```python
async def numbers():
    yield 1
    await asyncio.sleep(1)
    yield 2
    await asyncio.sleep(1)
    yield 3
```

Consume it with:

```python
async for number in numbers():
    print(number)
```

Mental model:

```text
Async Generator
      │
      ↓
   yield 1
      │
      ↓
   await I/O
      │
      ↓
   yield 2
      │
      ↓
   await I/O
      │
      ↓
   yield 3
```

Very useful for:

* streaming responses
* database cursors
* paginated APIs
* large datasets
* WebSockets
* Server-Sent Events

---

# 14. Async Iterator

An object is an async iterator if it supports asynchronous iteration.

Conceptually:

```python
class AsyncCounter:
    def __aiter__(self):
        return self

    async def __anext__(self):
        ...
```

Then:

```python
async for value in AsyncCounter():
    print(value)
```

The protocol is:

```text
async for
   ↓
__aiter__()
   ↓
__anext__()
   ↓
await result
   ↓
value
   ↓
repeat
   ↓
StopAsyncIteration
```

Compare:

| Normal          | Async                |
| --------------- | -------------------- |
| `for`           | `async for`          |
| `__iter__()`    | `__aiter__()`        |
| `__next__()`    | `__anext__()`        |
| `StopIteration` | `StopAsyncIteration` |
| synchronous     | can await            |

---

# 🔥 The Complete Async Architecture

This is the diagram I want you to remember for FastAPI:

```text
                     FASTAPI REQUEST
                           │
                           ↓
                  async def endpoint()
                           │
                           ↓
                     COROUTINE
                           │
                           ↓
                    CREATE / SCHEDULE
                           │
                           ↓
                         TASK
                           │
                           ↓
                    ┌──────────────┐
                    │ EVENT LOOP   │
                    └──────┬───────┘
                           │
                 ┌─────────┼─────────┐
                 ↓         ↓         ↓
              Task A    Task B    Task C
                 │         │         │
               await     await      CPU
                 │         │
              DB I/O    HTTP I/O
                 │         │
                 ↓         ↓
             suspended  suspended
                 │         │
                 └────┬────┘
                      ↓
                 I/O completes
                      ↓
                Task becomes ready
                      ↓
                 EVENT LOOP
                      ↓
                  RESUMES TASK
                      ↓
                   RESPONSE
```

---

# 🚨 The Biggest Async Mistake

This:

```python
async def endpoint():
    time.sleep(5)
    return {"ok": True}
```

is **bad**.

Why?

Because `time.sleep()` blocks the thread/event loop.

Better:

```python
async def endpoint():
    await asyncio.sleep(5)
    return {"ok": True}
```

The second version allows other tasks to run while waiting.

---

# 🚨 Another Critical Mistake

Don't assume:

```python
async def
```

automatically makes everything asynchronous.

This is still blocking:

```python
async def endpoint():
    result = some_blocking_function()
    return result
```

If `some_blocking_function()` performs blocking I/O or heavy synchronous work, it can block the event-loop thread.

The important question isn't:

> "Is this function declared `async`?"

It's:

> **"Does the operation yield control while waiting?"**

---

# ⚡ CPU-Bound vs I/O-Bound

This is critical for FastAPI interviews.

### I/O-bound

Examples:

```text
Database
HTTP API
Redis
File/network I/O
Waiting for external service
```

Async is often excellent here:

```text
Task A → await DB
Task B → await HTTP
Task C → await Redis
```

### CPU-bound

Examples:

```text
Image processing
Huge calculations
ML computation
Compression
Video processing
```

Async doesn't magically make CPU work parallel.

```text
Task A
████████████████████
         ↓
Event loop can't do useful work
```

For CPU-heavy workloads, consider:

* multiprocessing
* process pools
* native extensions
* external workers
* specialized compute services

---

# 🎯 FastAPI Mental Model

When you write:

```python
@app.get("/users")
async def get_users():
    users = await db.fetch_users()
    return users
```

Think:

```text
HTTP Request
     ↓
FastAPI
     ↓
async endpoint
     ↓
Coroutine
     ↓
Task
     ↓
Event Loop
     ↓
await DB
     ↓
Task pauses
     ↓
Other requests execute
     ↓
DB response arrives
     ↓
Task resumes
     ↓
HTTP Response
```

That's the architecture you should be able to explain in a **senior FastAPI interview**.

---

# 🧠 One-Line Definitions — Interview Cheat Sheet

| Topic                 | Remember                                                        |
| --------------------- | --------------------------------------------------------------- |
| Synchronous           | One operation waits for the previous one                        |
| Asynchronous          | Waiting work can yield so other work progresses                 |
| Blocking              | Prevents current execution from progressing                     |
| Non-blocking          | Allows other work while waiting                                 |
| Coroutine             | Async computation that can suspend/resume                       |
| `async`               | Defines coroutine function                                      |
| `await`               | Suspends current coroutine until awaitable progresses/completes |
| `asyncio`             | Python's async/concurrency framework                            |
| Event Loop            | Schedules and runs async tasks                                  |
| Task                  | Scheduled coroutine                                             |
| Future                | Placeholder for eventual result                                 |
| `gather()`            | Run multiple awaitables concurrently + collect results          |
| `create_task()`       | Schedule coroutine as a Task                                    |
| Async Context Manager | `async with`, using `__aenter__` / `__aexit__`                  |
| Async Generator       | Async function using `yield`                                    |
| Async Iterator        | Implements `__aiter__` / `__anext__`                            |

---

# 🏆 Senior Interview Questions You Should Be Able to Answer

### Basic

1. What is the difference between synchronous and asynchronous programming?
2. What is a coroutine?
3. What does `await` actually do?
4. What is an event loop?
5. What is a Task?
6. What is a Future?

### Intermediate

7. Difference between coroutine and Task?
8. Difference between `gather()` and `create_task()`?
9. Why does `time.sleep()` block an async application?
10. Why is `asyncio.sleep()` different?
11. When should you use async?
12. When should you **not** use async?
13. What happens when an exception occurs inside `gather()`?
14. What is an async context manager?
15. What is an async generator?

### Senior / FastAPI

16. How does FastAPI execute `async def` endpoints?
17. What happens to the event loop when your endpoint performs blocking I/O?
18. Why can one blocking operation affect many concurrent requests?
19. How do you handle a synchronous library inside an async endpoint?
20. Difference between I/O-bound and CPU-bound workloads?
21. `gather()` vs `TaskGroup`?
22. How does cancellation propagate through async Tasks?
23. How would you prevent a slow external API from blocking your application?
24. How would you stream a large response asynchronously?

---

# 🔥 Final Mental Map

```text
                    ASYNC PYTHON
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
       async / await              asyncio
             │                       │
             ↓                       ↓
         Coroutine              Event Loop
                                     │
                              ┌──────┼──────┐
                              ↓      ↓      ↓
                           Task A  Task B  Task C
                              │      │      │
                            await  await    CPU
                              │      │
                             I/O    I/O
                              │      │
                              ↓      ↓
                         suspended / resumed
                                     │
                                     ↓
                               Concurrent I/O
                                     │
             ┌───────────────────────┼────────────────┐
             ↓                       ↓                ↓
         gather()              create_task()      TaskGroup
             │                       │
             └──────────────┬────────┘
                            ↓
                    Async Applications
                            │
                            ↓
                         FastAPI
                            │
                            ↓
                 High Concurrent I/O
```

### The 5 things to remember most

> **1. `async def` → coroutine**
> **2. `await` → give control back while waiting**
> **3. Event loop → schedules/resumes tasks**
> **4. Task → scheduled coroutine**
> **5. Async shines primarily for I/O-bound concurrency**

The current Python documentation describes coroutines, Tasks, and Futures as the three major awaitable types, and notes that the event loop uses cooperative scheduling. ([Python documentation][2])

**One senior-level correction to keep in your head:** async does **not** mean “parallel.” It is primarily **concurrency through cooperative scheduling**; parallel CPU execution is a separate concern.

[1]: https://docs.python.org/it/3/library/asyncio.html?utm_source=chatgpt.com "asyncio — Asynchronous I/O — Documentazione Python 3.14.7"
[2]: https://docs.python.org/3/library/asyncio-task.html?utm_source=chatgpt.com "Coroutines and tasks — Python 3.14.7 documentation"
