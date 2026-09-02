# 🐍 PART 6 — Python Internals

**This is the senior-interview layer.**

At this point, don't memorize isolated definitions. Build one mental model:

> **Python code → CPython compiler → bytecode → interpreter → objects in memory → references → reference counting + cyclic GC → CPU execution.**

One important modern update: **the classic GIL story is no longer the whole story.** CPython has supported optional free-threaded builds since Python 3.13, so in a senior interview in 2026 you should know both the traditional GIL model and the newer free-threaded model. ([Python documentation][1])

![Image](https://images.openai.com/static-rsc-4/oOBy8wDyFORLDNCH6XPFBrHY-By5J6lwHc_0tf2kZYNk6YSA7jIPYKsJltt9W1R1picoW8Ayy4ySecczOoa0ox5cQWhPjRLsW6fyZWTKjCaK7pOxpnGXOOAwm3KLZOLqfdIugMPV0WJRYM7GHjLTjUdWwAY-3fjx3mDe9UacIIwpFlEYEDv9SX8BCHHD6trd?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/qgvXYstqG-h-gSBZLz8-TPqCjbloRd2T2znRJJiuFd5S2mRgYT0mM5ChI2dMV8tLuRu5OqO-ayRBhT0wOgP-7coCU48F1IGU2zn1gi149YuN5t2HlmnNRsjhYf5dgTDKODgLNL0I27ktKvTck3lUmhXBpNBTajLjUmLw4dXTFyvBs-jMA00jk-A2iA6n149v?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/c6DAFgVGFCO80oy-ODsDYlRwmwvKalVNPemNuIknUEq6IlVncmUqPxOnBaAup1pQy2YOxkhf-cdwq8wYvar9qlhMLJPC83RA5xrp7YZVaCjkeHemRCmGh1TRgSyNqrw_gaCXphJbmhV807vLmOHmpF9olk6o4NiePleQrFZWbg7ympnoP9D47NKNjwI9SRrB?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/6DpbWcStM-ZaOt73ncnYfrfWAH6HgSca7M_zncCucDqfq6hcCvI2IvoPQrI7uSrzeebPzTla7QtZUxUTexFSMnzax1pse6wHPa5ntd7LOAYO8eS2xE5UnDudSrhtxHdeDrwsInRco48J_9d7W_1JtMvsSvatXvITe4PsNnxtXahpOVeIkQbaeJIdvkkZOxzt?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/OcvxsuALTlSzgnU9GnLK4obOXr_Ps7WJB8sI8k6XdU18Uvvk_MUmAy5UHnih5KzekBhgHlxeEyJgv1J0K9ZrEiEeAKJj5vpB-PcJksuagu1nYIImcZHSIXCuIVfVY9FvZ_t6JhS-DwNU1oXTRcCPkabugmw9eGi8fahfXeOT0DztxzBlSRKssj1u1S-xscHz?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/Khycc1Fw0_ohwWuBFe8AHbTYYY5uUEnGG1PPYzNe2159MSxUI5KfrPGvfB7yn6nrmp8oYlc9X260GIlKFesHbp9ro-mxrKuJYuy-fU2mSbYDOJeY-idWLx12ymshKZ0L5SJlkJsgd3noANMBGpLjjBLa5WQ6oAVZ4R3w2dlBrger7aI8dOePdm-bszaYPUzQ?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/5TglgequNKUYd6ysUn2beTAHR4DJhDge7SKqYWOi4zoF1YDL6J261T_QNrQ3hv9GDgpzOOrlfs4dYW9dpG_PTfzIGSEBpWGiKIFFaaRnm5xXn8iNTC808sC2NIHsm7iO5B9NEVdalrz-ZnGjeaW3at1ga7PFIKbCJqkcbNvyyJq8tJovFLZYVUM86jXml3qc?purpose=fullsize)

---

# 🧠 THE MASTER PICTURE

Before going topic by topic, memorize this:

```text
                    YOUR .py FILE
                         │
                         ▼
                    CPython
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
          COMPILER              RUNTIME
              │                     │
              ▼                     │
          BYTECODE                  │
              │                     │
              └──────────┬──────────┘
                         ▼
                  Python Interpreter
                         │
                         ▼
                    PYTHON OBJECTS
                         │
                  ┌──────┴──────┐
                  ▼             ▼
                STACK          HEAP
                  │             │
                  │       objects live here
                  │             │
                  └──────┬──────┘
                         ▼
                  Memory Manager
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
       Reference Counting       Cyclic GC
             │                       │
             └───────────┬───────────┘
                         ▼
                    Memory freed
```

And threads:

```text
              CPython
                 │
         ┌───────┴────────┐
         ▼                ▼
   GIL-enabled       Free-threaded
      build               build
         │                │
   one thread        multiple threads
   executes Python   can execute Python
   bytecode at once  bytecode concurrently
```

---

# 1. Python Memory Management

Python manages memory for you.

You don't normally write:

```c
malloc(...)
free(...)
```

Instead:

```python
x = [1, 2, 3]
```

Python creates and manages the object.

Conceptually:

```text
x = [1,2,3]

      x
      │
      ▼
 ┌──────────────┐
 │ List object  │
 │              │
 │ 1 → 2 → 3    │
 └──────────────┘
       HEAP
```

CPython maintains a **private heap containing Python objects and data structures**, managed by the Python memory manager. CPython also has specialized allocators; for example, the traditional GIL-enabled build uses `pymalloc` by default for relevant allocation domains, while free-threaded builds use `mimalloc` by default. ([Python documentation][2])

### Mental model

```text
Python program
     │
     ▼
Python Memory Manager
     │
     ├── allocate
     ├── track
     ├── reuse
     └── release
```

### Senior interview point

Don't say:

> "Python puts everything on the heap."

That's an oversimplification.

Better:

> **Python objects are managed in the interpreter's private heap, while execution also uses stack-like execution state.**

---

# 2. Reference Counting

This is one of the most important CPython internals.

Imagine:

```python
a = [1, 2, 3]
```

Conceptually:

```text
             a
             │
             ▼
        ┌───────────┐
        │ [1,2,3]   │
        │ refcount 1│
        └───────────┘
```

Now:

```python
b = a
```

```text
       a ─────┐
              ▼
         ┌───────────┐
         │ [1,2,3]   │
         │ refcount 2│
         └───────────┘
              ▲
       b ─────┘
```

Now:

```python
del a
```

Conceptually:

```text
       b ─────────► [1,2,3]
                     refcount 1
```

Then:

```python
del b
```

No references remain:

```text
                     [1,2,3]
                     refcount 0
                         │
                         ▼
                       DEALLOCATE
```

CPython's C API exposes operations such as `Py_INCREF()` and `Py_DECREF()` for managing strong references. When the last strong reference is released and the reference count reaches zero, the object's deallocation function is invoked. ([Python documentation][3])

### 🔥 Mental model

```text
NEW REFERENCE
     ↓
 refcount + 1

REFERENCE RELEASED
     ↓
 refcount - 1

refcount == 0
     ↓
object can be deallocated
```

### Important modern caveat

In current CPython, don't assume every observed reference count is a simple literal count. Some objects can be **immortal**, and `sys.getrefcount()` has caveats. ([Python documentation][4])

---

# 3. Garbage Collection

Reference counting has a problem.

### Circular references.

```python
a = []
b = []

a.append(b)
b.append(a)
```

Visual:

```text
       a
       │
       ▼
    ┌──────┐
    │      │
    │  []  │
    │      │
    └──┬───┘
       │
       ▼
    ┌──────┐
    │  []  │
    └──┬───┘
       │
       └──────────► a
```

Even if your program no longer has external references to these objects, they can reference each other.

So:

```text
reference counting
       +
cyclic garbage collector
       ↓
better memory reclamation
```

CPython's cyclic garbage collector **supplements reference counting** and is specifically useful for unreachable reference cycles. ([Python documentation][5])

You can interact with it:

```python
import gc

gc.collect()
```

You can inspect:

```python
gc.isenabled()
```

and:

```python
gc.disable()
```

### 🔥 Senior answer

If interviewer asks:

> "Does Python use garbage collection?"

Don't simply say:

> "Yes."

Say:

> **CPython primarily uses reference counting for immediate reclamation, supplemented by a cyclic garbage collector to detect unreachable reference cycles.**

That's a much stronger answer.

---

# 4. GIL

GIL = **Global Interpreter Lock**.

Traditional CPython:

```text
              Python process
                    │
                   GIL
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     Thread 1    Thread 2    Thread 3
        │           │           │
        └────── only one ───────┘
              executes
         Python bytecode at once
```

So:

```python
Thread 1 → Python code
Thread 2 → waiting
Thread 3 → waiting
```

Then the lock can move between threads.

The GIL historically simplifies CPython's object model and means that, in a normal GIL-enabled build, only one thread executes Python bytecode at a time. It can be released around blocking I/O and by some native extensions doing intensive work. ([Python documentation][1])

---

## ⚠️ But this changed

Starting with **Python 3.13**, CPython supports a **free-threaded build** where the GIL can be disabled. Multiple threads can then execute Python code concurrently on different CPU cores. ([Python documentation][6])

So don't give this outdated interview answer:

> "Python cannot run multiple threads in parallel."

Better:

> **Traditional GIL-enabled CPython allows only one thread to execute Python bytecode at a time, but modern CPython also supports optional free-threaded builds where the GIL is disabled and Python threads can execute concurrently.**

This distinction is **very senior-level**.

---

# 5. Stack vs Heap

This concept is often oversimplified.

## Stack

Think:

```text
CALL FUNCTION
      │
      ▼
┌───────────────┐
│ function frame│
│ local state   │
└───────────────┘
```

Nested calls:

```text
┌───────────────┐
│ function C    │
├───────────────┤
│ function B    │
├───────────────┤
│ function A    │
└───────────────┘
```

When functions return, their execution state is unwound.

---

## Heap

Objects are managed in Python's private heap:

```text
HEAP
┌────────────────────────────┐
│ [1,2,3]                    │
│ "hello"                    │
│ dict object                │
│ class instance             │
│ function object            │
└────────────────────────────┘
```

Example:

```python
def test():
    x = [1, 2, 3]
```

Mental model:

```text
execution state
     │
     ▼
  stack/frame
     │
     │ reference
     ▼
  heap object
 [1,2,3]
```

### ⚠️ Senior-level nuance

Avoid saying:

> "All local variables are on the stack and all objects are on the heap."

Python's actual execution architecture is more nuanced than that simplified C/C++ model. CPython uses interpreter frames and object references, while object memory is managed through Python's memory-management system.

---

# 6. Object Interning

This is where `is` can surprise you.

Python may **reuse certain immutable objects**.

Example:

```python
a = 10
b = 10

print(a is b)
```

You may get:

```text
True
```

because CPython can reuse an existing integer object.

Visual:

```text
        a ─────┐
               ▼
             ┌────┐
             │ 10 │
             └────┘
               ▲
        b ─────┘
```

Instead of:

```text
a → 10

b → 10
```

two separate objects.

Strings can also be interned in certain circumstances.

### 🚨 Critical interview point

Never write code relying on:

```python
a is b
```

to test value equality.

Use:

```python
a == b
```

`is` means:

```text
same object?
```

`==` means:

```text
equal value?
```

Interning is an **implementation optimization**, not something you should rely on for general identity behavior.

---

# 7. Python Bytecode

Python source:

```python
def add(a, b):
    return a + b
```

is compiled into bytecode instructions that CPython's interpreter executes.

Visual:

```text
SOURCE
  │
  ▼
def add(a,b):
    return a+b
  │
  ▼
COMPILER
  │
  ▼
BYTECODE
  │
  ▼
CPython interpreter
```

You can inspect it:

```python
import dis

def add(a, b):
    return a + b

dis.dis(add)
```

You'll see instructions such as:

```text
LOAD_FAST
BINARY_OP
RETURN_VALUE
```

The exact instructions vary between Python versions.

The official documentation explicitly describes bytecode as a **CPython implementation detail** and warns that it can change between Python releases and isn't guaranteed to be portable across Python VMs. ([Python documentation][7])

### 🔥 Important

Don't memorize:

```text
LOAD_FAST
BINARY_OP
...
```

Instead understand:

```text
Python source
     ↓
compiler
     ↓
bytecode
     ↓
interpreter
```

---

# 8. CPython

This distinction is extremely important.

**Python** is a language.

**CPython** is one implementation of that language.

Think:

```text
                    PYTHON LANGUAGE
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
       CPython          PyPy          other VMs/
                                     implementations
```

CPython is the implementation most people mean when discussing Python's traditional reference-counting memory model, GIL, bytecode interpreter, and C API.

### Why "CPython" matters

When someone says:

> "Python has a GIL."

A senior engineer should mentally ask:

> **Which Python implementation/build?**

Because the GIL is specifically a CPython runtime concept, and current CPython also has free-threaded builds. ([Python documentation][1])

---

# 9. `__name__ == "__main__"`

This looks simple but is very important for understanding modules.

Suppose:

```python
# app.py

print(__name__)
```

If you execute:

```bash
python app.py
```

Python sets:

```python
__name__ = "__main__"
```

So:

```text
python app.py
      │
      ▼
__name__ = "__main__"
```

But if another file does:

```python
import app
```

then:

```text
import app
     │
     ▼
__name__ = "app"
```

Therefore:

```python
if __name__ == "__main__":
    main()
```

means:

> **Run this block only when this file is executed directly, not when it is imported.**

The official Python tutorial confirms that running a module as a script sets its `__name__` to `"__main__"`, while importing it gives it its module name. ([Python documentation][8])

---

# 🧠 Visualizing it

### Direct execution

```text
             python app.py
                    │
                    ▼
                  app.py
                    │
                    ▼
             __name__ = "__main__"
                    │
                    ▼
        if condition → TRUE
                    │
                    ▼
                main()
```

### Import

```text
             import app
                 │
                 ▼
               app.py
                 │
                 ▼
           __name__ = "app"
                 │
                 ▼
        if condition → FALSE
                 │
                 ▼
       main() does NOT run
```

---

# 🔥 THE COMPLETE INTERNALS MAP

Now put everything together:

```text
                         .py FILE
                            │
                            ▼
                         CPython
                            │
                            ▼
                       COMPILATION
                            │
                            ▼
                         BYTECODE
                            │
                            ▼
                  CPython INTERPRETER
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
             EXECUTION              OBJECTS
                 │                     │
                 ▼                     ▼
          interpreter frames        PRIVATE HEAP
                 │                     │
                 │                ┌────┴────┐
                 │                ▼         ▼
                 │           immutable   mutable
                 │             objects     objects
                 │
                 ▼
              THREADS
                 │
        ┌────────┴────────┐
        ▼                 ▼
   GIL enabled       free-threaded
        │                 │
   one thread        multiple threads
   runs Python       can run Python
   bytecode at once  concurrently
                           
OBJECT LIFETIME
      │
      ▼
 references
      │
      ▼
Reference Counting
      │
      ├──── refcount → 0 ───► deallocation
      │
      ▼
cycles remain?
      │
      ▼
Cyclic Garbage Collector
      │
      ▼
memory reclaimed
```

---

# 🎯 SENIOR INTERVIEW CHEAT SHEET

| Topic                 | Strong mental model                                                                 |
| --------------------- | ----------------------------------------------------------------------------------- |
| Memory Management     | Python runtime manages a private heap of objects                                    |
| Reference Counting    | Track strong references to objects                                                  |
| Garbage Collection    | Supplements refcounting, especially for cycles                                      |
| GIL                   | Traditional CPython lock limiting Python bytecode execution to one thread at a time |
| Free-threaded CPython | Optional modern CPython build where GIL can be disabled                             |
| Stack                 | Execution/frame state                                                               |
| Heap                  | Python objects and managed memory                                                   |
| Interning             | Reuse of certain immutable objects                                                  |
| Bytecode              | Intermediate CPython instructions                                                   |
| CPython               | A Python implementation                                                             |
| `__name__`            | Module's execution/import identity                                                  |
| `__main__`            | Indicates the module is being run as the main script                                |

---

# 🔥 7 QUESTIONS YOU SHOULD BE ABLE TO ANSWER

If you're preparing for a **senior Python interview**, these are the questions I'd drill:

### 1. Why does Python need garbage collection if it has reference counting?

```text
Reference counting
       ↓
great for immediate cleanup
       ↓
BUT
       ↓
cannot by itself resolve cycles
       ↓
cyclic GC
```

---

### 2. What exactly does the GIL protect?

Not simply "your variables."

The traditional GIL protects CPython's runtime while a thread is executing Python/C API operations that require it, helping make the object model manageable. ([Python documentation][9])

---

### 3. Does the GIL mean Python threads are useless?

**No.**

I/O-bound workloads can benefit from threads because the GIL is released around blocking I/O. Native extensions may also release it. And modern free-threaded CPython can run Python code concurrently across threads. ([Python documentation][1])

---

### 4. Why can this happen?

```python
a = 10
b = 10

a is b
```

Potentially:

```text
True
```

because of object reuse/interning.

But:

```python
a == b
```

is the correct value comparison.

---

### 5. Is bytecode the same as machine code?

```text
Python source
      ↓
Python bytecode
      ↓
CPython interpreter/runtime
      ↓
native machine execution
```

**Bytecode is not the same thing as CPU machine code.**

---

### 6. What is CPython?

> **CPython is the primary implementation of Python, implemented largely in C, with its own compiler, interpreter/runtime, object model, memory manager, and C API.**

---

### 7. Explain this line:

```python
if __name__ == "__main__":
```

Best senior-level answer:

> **Every module has a `__name__`. When the file is executed directly, its `__name__` is set to `"__main__"`. When imported, it normally gets its module name. Therefore the condition lets us separate reusable module code from direct-script entry-point code.** ([Python documentation][8])

---

# 🧠 FINAL MEMORY PALACE

Memorize this picture:

```text
                     PYTHON
                       │
                       ▼
                    CPython
                       │
                       ▼
                  SOURCE CODE
                       │
                       ▼
                    BYTECODE
                       │
                       ▼
                  INTERPRETER
                       │
              ┌────────┴────────┐
              ▼                 ▼
           THREADS            OBJECTS
              │                 │
              ▼                 ▼
             GIL              HEAP
              │                 │
       ┌──────┴──────┐          │
       ▼             ▼          ▼
 GIL-enabled    free-threaded REFERENCES
       │             │          │
 one-at-a-time   concurrent      ▼
                           REFERENCE COUNT
                                  │
                           ┌──────┴──────┐
                           ▼             ▼
                         ZERO          CYCLE
                           │             │
                           ▼             ▼
                       DEALLOCATE     CYCLIC GC
```

And one final connection to your previous parts:

```text
PART 1
Objects + references
       ↓
PART 3
Functions + scope
       ↓
PART 5
Objects + classes
       ↓
PART 6
How CPython actually manages those objects
       ↓
PART 7
Exceptions / files / modules / imports
       ↓
PART 8
Iterators / generators / decorators / context managers
```

**If you truly understand Part 6, you stop thinking of Python as "magic." You start seeing it as a runtime managing objects, references, frames, bytecode, threads, and memory.** That is exactly the mental shift that helps in senior-level Python interviews.

[1]: https://docs.python.org/3/glossary.html?utm_source=chatgpt.com "Glossary — Python 3.14.7 documentation"
[2]: https://docs.python.org/3/c-api/memory.html?utm_source=chatgpt.com "Memory Management — Python 3.14.7 documentation"
[3]: https://docs.python.org/3/c-api/refcounting.html?utm_source=chatgpt.com "Reference Counting — Python 3.14.7 documentation"
[4]: https://docs.python.org/3/library/sys.html?utm_source=chatgpt.com "sys — System-specific parameters and functions — Python 3.14.7 documentation"
[5]: https://docs.python.org/3/library/gc.html?utm_source=chatgpt.com "gc — Garbage Collector interface — Python 3.14.7 documentation"
[6]: https://docs.python.org/3/howto/free-threading-python.html?utm_source=chatgpt.com "Python support for free threading — Python 3.14.7 documentation"
[7]: https://docs.python.org/3/library/dis.html?utm_source=chatgpt.com "dis — Disassembler for Python bytecode — Python 3.14.7 documentation"
[8]: https://docs.python.org/3/tutorial/modules.html?utm_source=chatgpt.com "6. Modules — Python 3.14.7 documentation"
[9]: https://docs.python.org/3/c-api/threads.html?utm_source=chatgpt.com "Thread states and the global interpreter lock — Python 3.14.7 documentation"
