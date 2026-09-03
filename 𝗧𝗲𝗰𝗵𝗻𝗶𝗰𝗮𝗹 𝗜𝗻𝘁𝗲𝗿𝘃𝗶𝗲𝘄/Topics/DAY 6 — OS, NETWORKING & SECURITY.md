# 🌐 DAY 6 — OS, NETWORKING & SECURITY

This day is **extremely important for a senior backend engineer** because now we're going below FastAPI and SQL.

You already learned:

```text
Python
 ↓
OOP
 ↓
Python Internals
 ↓
Async
 ↓
DSA
 ↓
SQL / DB
 ↓
APIs
 ↓
System Design
```

Now we're adding:

```text
             BACKEND APPLICATION
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
      OS          NETWORK        SECURITY
       │             │             │
 Processes       HTTP/TCP        CORS
 Threads         DNS             SQL Injection
 Memory          UDP             Hashing
 Concurrency     HTTPS           Encryption
 Deadlocks       Cookies         Sessions
```

The goal is to understand **what actually happens underneath a backend request**.

---

# 🧠 0. THE BIG MENTAL MODEL

When a client calls:

```http
GET https://api.example.com/users/123
```

a lot happens:

```text
┌──────────────┐
│    Client    │
└──────┬───────┘
       │
       │ DNS
       ▼
┌──────────────┐
│ IP Address   │
└──────┬───────┘
       │
       │ TCP
       ▼
┌──────────────┐
│ TLS / HTTPS  │
└──────┬───────┘
       │
       │ HTTP
       ▼
┌──────────────┐
│ Load Balancer│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ FastAPI      │
│ Process      │
└──────┬───────┘
       │
       ├──────► Threads / Async Tasks
       │
       ▼
┌──────────────┐
│ Database     │
└──────────────┘
```

And security is present throughout:

```text
Authentication
Authorization
TLS
CORS
Input validation
SQL injection prevention
Password hashing
Session security
```

---

# 1️⃣ PROCESSES vs THREADS

This is an OS-level concept.

## What is a process?

A **process** is a running instance of a program with its own address space and OS-managed resources.

For example:

```bash
python app.py
```

creates a Python process.

Conceptually:

```text
┌───────────────────────────┐
│        PROCESS             │
│                            │
│  Code                      │
│  Heap                      │
│  Runtime state             │
│  File descriptors         │
│                            │
│  ┌────────┐ ┌────────┐    │
│  │Thread 1│ │Thread 2│    │
│  └────────┘ └────────┘    │
└───────────────────────────┘
```

A process can contain multiple threads.

---

# What is a thread?

A thread is an execution path within a process.

Example:

```text
Process
   │
   ├── Thread 1
   ├── Thread 2
   └── Thread 3
```

Threads in the same process generally share process memory/resources.

---

# Process vs Thread

| Feature           | Process           | Thread                   |
| ----------------- | ----------------- | ------------------------ |
| Memory space      | Separate          | Shared within process    |
| Creation          | More expensive    | Usually cheaper          |
| Communication     | IPC required      | Shared memory possible   |
| Failure isolation | Better            | Weaker                   |
| Context switching | Generally heavier | Generally lighter        |
| Shared state      | Harder            | Easier, but dangerous    |
| Crash impact      | Usually isolated  | Can affect whole process |

---

# 🧠 Example

Imagine:

```text
Browser
```

might have multiple processes/threads internally.

Backend:

```text
FastAPI deployment
        │
        ├── Process 1
        │      ├── Thread
        │      └── Thread
        │
        ├── Process 2
        │      ├── Thread
        │      └── Thread
        │
        └── Process 3
```

This connects directly to **Day 5 horizontal scaling**.

---

# Process isolation

Suppose:

```text
Process A
memory:
x = 10
```

and:

```text
Process B
memory:
x = 20
```

These are separate memory spaces.

A normal Python assignment in Process A doesn't simply change Process B's variable.

For communication, processes can use mechanisms such as:

```text
Pipes
Queues
Sockets
Shared memory
Files
Databases
```

---

# Threads share memory

```python
counter = 0
```

Two threads can potentially access the same `counter`.

That gives performance opportunities but introduces:

```text
Race conditions
Deadlocks
Data corruption
Synchronization problems
```

And this brings us to concurrency.

---

# 2️⃣ CONCURRENCY

This is one of the most important concepts.

## Concurrency ≠ Parallelism

### Concurrency

Multiple tasks are **in progress during overlapping periods**.

```text
Task A: ████      ███
Task B:    ████      ███
Task C:       ███
```

The system switches/progresses between tasks.

---

### Parallelism

Multiple tasks literally execute at the same time on different execution resources/cores.

```text
CPU Core 1 → Task A ███████
CPU Core 2 → Task B ███████
```

---

# Simple analogy

### Concurrency

One chef:

```text
Start cooking A
 ↓
A needs 10 minutes
 ↓
Start B
 ↓
B needs 5 minutes
 ↓
Check A
 ↓
Continue B
```

The chef overlaps the work.

### Parallelism

Two chefs:

```text
Chef 1 → A
Chef 2 → B
```

Both can execute simultaneously.

---

# Why backend systems need concurrency

Suppose:

```text
Request A → waiting for database
Request B → waiting for HTTP API
Request C → waiting for disk
```

You don't want the CPU to sit idle while everything waits.

Async/concurrent systems can make progress on other work.

This connects directly to **Day 7 — Async Python** that you already studied.

---

# CPU-bound vs I/O-bound

## I/O-bound

Program spends much of its time waiting for:

```text
Database
Network
Disk
External API
```

Concurrency is often very useful.

Example:

```python
async def get_data():
    result = await database_call()
    return result
```

While waiting:

```text
Task A
   ↓
await DB
   ↓
Event loop handles Task B
```

---

# CPU-bound

Program spends time doing computation:

```text
Image processing
Video encoding
Large numerical calculations
Compression
Cryptography
```

Concurrency doesn't automatically make CPU work faster.

Parallel execution across cores is often what you need.

This is where:

```text
Multiple processes
Native parallelism
Multiprocessing
Specialized compute systems
```

can become relevant.

---

# 🔥 Senior interview answer

If asked:

> "Does async make CPU-heavy Python code faster?"

Answer:

> **Not necessarily. Async primarily helps with I/O concurrency. CPU-bound work generally requires parallel execution or moving the computation to suitable workers/processes/native code.**

Excellent interview distinction.

---

# 3️⃣ DEADLOCKS

A deadlock occurs when multiple execution units wait forever for resources held by each other.

Classic example:

```text
Thread A owns Lock 1
Thread B owns Lock 2

Thread A → waiting for Lock 2
Thread B → waiting for Lock 1
```

Nobody can continue.

```text
       ┌──────────────┐
       │   Thread A   │
       └──────┬───────┘
              │
        owns Lock 1
              │
              ▼
        wants Lock 2
              ▲
              │
        owns Lock 2
              │
       ┌──────┴───────┐
       │   Thread B   │
       └──────────────┘
```

---

# Example

```python
lock_a = Lock()
lock_b = Lock()
```

Thread A:

```python
with lock_a:
    with lock_b:
        do_work()
```

Thread B:

```python
with lock_b:
    with lock_a:
        do_work()
```

Potential deadlock:

```text
A:
Lock A ✅
Lock B ❌

B:
Lock B ✅
Lock A ❌
```

Forever waiting.

---

# Four conditions for deadlock

The classic Coffman conditions are:

### 1. Mutual exclusion

A resource can only be held by one execution unit at a time.

### 2. Hold and wait

A process/thread holds one resource while waiting for another.

### 3. No preemption

The resource can't simply be forcibly taken away.

### 4. Circular wait

```text
A waits for B
B waits for C
C waits for A
```

Cycle.

All four together create the classic deadlock conditions.

---

# How to prevent deadlocks?

## 1. Consistent lock ordering

Always acquire:

```text
Lock A
 ↓
Lock B
```

Never:

```text
Sometimes A → B
Sometimes B → A
```

---

## 2. Timeout

```python
lock.acquire(timeout=5)
```

If resource isn't available, stop waiting forever.

---

## 3. Reduce lock scope

Bad:

```python
lock.acquire()

do_10_minutes_of_work()

lock.release()
```

Better:

```python
lock.acquire()

update_shared_state()

lock.release()

do_expensive_work()
```

---

## 4. Avoid unnecessary locks

Sometimes the best lock is:

> **No lock.**

Use immutable data, queues, actor-like patterns, database transactions, or better ownership models where appropriate.

---

# Deadlock vs Race Condition

Very important.

### Race condition

Two execution paths access shared state and result depends on timing.

```text
A reads 10
B reads 10

A writes 11
B writes 11

Expected = 12
Actual = 11
```

---

### Deadlock

Both are stuck:

```text
A waits for B
B waits for A
```

```text
Race condition → wrong result
Deadlock       → no progress
```

---

# 4️⃣ MEMORY MANAGEMENT

This connects directly to your earlier **Python Internals** topic.

At the OS level, processes have virtual address spaces.

Conceptually:

```text
┌──────────────────────────────┐
│ Process Virtual Memory       │
├──────────────────────────────┤
│ Code / Text                  │
├──────────────────────────────┤
│ Data                         │
├──────────────────────────────┤
│ Heap                         │
│                              │
│        ↓ grows               │
│                              │
├──────────────────────────────┤
│                              │
│        Free space            │
│                              │
├──────────────────────────────┤
│ Stack                        │
│        ↑ grows               │
└──────────────────────────────┘
```

This is a conceptual model; actual layouts depend on OS, architecture, runtime, and protections.

---

# Stack

Used for execution state such as:

```text
Function calls
Local execution state
Return information
```

Example:

```python
def add(a, b):
    result = a + b
    return result
```

During execution, the function has associated call-frame state.

---

# Heap

Used for dynamically allocated objects/data.

In Python:

```python
users = []
```

the list object is managed in Python's object heap.

Remember from Day 6 Internals:

> Don't oversimplify Python as "locals are on the stack and objects are on the heap."

Python execution frames and object allocation are more nuanced.

---

# Virtual memory

The OS gives processes a **virtual address space**.

```text
Process A
Virtual addresses
       ↓
┌─────────────┐
│ Page        │
├─────────────┤
│ Page        │
├─────────────┤
│ Page        │
└─────────────┘
       ↓
   MMU / OS
       ↓
Physical memory
```

This provides:

* isolation
* memory protection
* efficient allocation
* virtual addressing
* paging

---

# Memory leak

A memory leak occurs when memory that is no longer useful remains allocated/referenced so it cannot be reclaimed as intended.

In Python, a common cause can be accidentally retaining references:

```python
cache = []

while True:
    cache.append(huge_object())
```

The list keeps references alive.

Memory keeps growing.

---

# Garbage collection

Python uses:

```text
Reference counting
        +
Cyclic garbage collection
```

Reference count conceptually:

```text
object
  ↑
ref1
ref2
ref3
```

When references disappear, the object may become reclaimable.

Cyclic GC handles certain reference cycles that simple reference counting cannot reclaim.

---

# Backend memory problem

Imagine your FastAPI service:

```text
Request
   ↓
Load 500 MB file
   ↓
Create several copies
   ↓
Process
```

100 simultaneous requests could potentially create huge memory pressure.

Senior engineer asks:

```text
Can we stream?
Can we process in chunks?
Can we avoid copies?
Can we limit concurrency?
Can we move processing to workers?
```

---

# 5️⃣ HTTP vs HTTPS

## HTTP

HTTP is an application-layer protocol for transferring web resources/messages.

Example:

```http
GET /users/123 HTTP/1.1
Host: api.example.com
```

HTTP itself does **not** provide confidentiality.

---

# HTTPS

HTTPS is HTTP carried over a secure TLS connection.

Conceptually:

```text
HTTP
  ↓
TLS
  ↓
TCP
  ↓
IP
```

Modern HTTP can also run over other transports, such as HTTP/3 over QUIC, but the key security idea remains:

> HTTPS = HTTP protected by TLS.

---

# What does TLS provide?

Primarily:

```text
Confidentiality
Integrity
Authentication of the server
```

---

# HTTP

```text
Client
   │
   │  GET /login
   │  password=123
   ▼
 Network
   │
   ▼
Server
```

Without transport encryption, an attacker positioned to observe traffic could potentially read sensitive information.

---

# HTTPS

```text
Client
   │
   │ encrypted TLS connection
   ▼
 Network
   │
   │ 🔒
   ▼
Server
```

---

# TLS certificate

When connecting to:

```text
https://example.com
```

the server presents a certificate containing identity information and a public key.

The client uses the certificate chain and TLS protocol to authenticate the server and establish secure session keys.

---

# Encryption in HTTPS

TLS uses asymmetric cryptography during authentication/key establishment and symmetric cryptography for efficient bulk data protection.

Conceptually:

```text
Handshake
   ↓
Authenticate server
   ↓
Establish session keys
   ↓
Symmetric encryption
   ↓
Fast secure communication
```

---

# Important interview question

### Is HTTPS encryption?

Yes, HTTPS provides encrypted transport through TLS.

But:

> **HTTPS does not mean the data is encrypted everywhere.**

For example:

```text
Client
 🔒
 ↓
HTTPS
 ↓
Server
 ↓
Database
```

Your application/database architecture still needs its own security controls.

---

# 6️⃣ DNS

DNS = **Domain Name System**.

Its main job is to map names to network addresses and other DNS records.

Example:

```text
api.example.com
       ↓
DNS
       ↓
203.0.113.10
```

---

# Why DNS?

Humans prefer:

```text
google.com
```

Machines communicate using network addresses.

DNS provides the naming system that lets clients discover where services are reachable.

---

# DNS resolution

When you request:

```text
https://api.example.com
```

conceptually:

```text
Browser
   ↓
DNS cache?
   ↓
OS cache?
   ↓
Recursive resolver
   ↓
Root
   ↓
TLD
   ↓
Authoritative DNS
   ↓
IP address
```

In practice, caching often means many lookups don't traverse the entire hierarchy.

---

# DNS hierarchy

```text
                    Root
                     │
              ┌──────┴──────┐
              ▼             ▼
             .com          .org
              │
              ▼
         example.com
              │
              ▼
       api.example.com
```

---

# Important DNS records

### A

Maps hostname → IPv4 address.

```text
example.com → 192.0.2.10
```

### AAAA

Maps hostname → IPv6 address.

### CNAME

Alias from one hostname to another hostname.

### MX

Mail exchange servers.

### TXT

Arbitrary text used for various purposes such as domain verification and email security policies.

### NS

Name servers authoritative for a zone.

---

# DNS TTL

DNS records can have a TTL:

```text
TTL = 300 seconds
```

Resolvers can cache the answer for the specified period.

This is important in system design because changing DNS does not necessarily mean every client immediately sees the new destination.

---

# DNS and load balancing

DNS can participate in traffic distribution:

```text
api.example.com
       ↓
DNS
       ↓
Load Balancer
       ↓
Server cluster
```

DNS itself is not the same thing as an application load balancer.

---

# 7️⃣ TCP vs UDP

This is one of the most important networking topics.

genui{"learning_viz":{"type_id":"TCP_VS_UDP"}}

---

# TCP

TCP is connection-oriented and provides a reliable, ordered byte stream.

Conceptually:

```text
Client
  │
  │ SYN
  ▼
Server
  │
  │ SYN-ACK
  ▼
Client
  │
  │ ACK
  ▼
Connection established
```

Then data can flow.

---

# TCP provides

```text
Connection-oriented communication
Reliable delivery
Ordered byte stream
Retransmission
Flow control
Congestion control
```

---

# Example

Suppose packets:

```text
1
2
3
4
5
```

Packet 3 is lost.

TCP can detect the missing data and retransmit it.

The application gets an ordered byte stream rather than manually dealing with packet loss.

---

# UDP

UDP is connectionless and does not provide TCP's reliable ordered delivery guarantees.

```text
Client
  │
  ├── Packet 1 ──→
  ├── Packet 2 ──→
  ├── Packet 3 ──X
  ├── Packet 4 ──→
  └── Packet 5 ──→
```

No built-in TCP-style retransmission mechanism.

---

# Why use UDP?

Because sometimes you prioritize:

```text
Low overhead
Low latency
Application-controlled delivery
```

Examples include:

```text
DNS
Real-time media
Online gaming
Certain telemetry
QUIC transport
```

Important nuance:

> Modern protocols can build reliability and other features above UDP. QUIC, for example, does this.

---

# TCP vs UDP

| Feature            | TCP                              | UDP                           |
| ------------------ | -------------------------------- | ----------------------------- |
| Connection         | Connection-oriented              | Connectionless                |
| Reliability        | Yes                              | No built-in reliable delivery |
| Ordering           | Yes                              | No                            |
| Retransmission     | Yes                              | No built-in                   |
| Flow control       | Yes                              | No TCP-style mechanism        |
| Congestion control | Yes                              | No TCP-style mechanism        |
| Overhead           | Higher                           | Lower                         |
| Typical use        | HTTP/1.1, HTTP/2, DB connections | DNS, real-time traffic, QUIC  |

---

# HTTP versions connection

A useful interview detail:

```text
HTTP/1.1 → commonly TCP
HTTP/2   → commonly TCP
HTTP/3   → QUIC over UDP
```

So don't say:

> "HTTP always uses TCP."

HTTP/3 is the important exception.

---

# 8️⃣ COOKIES vs SESSIONS

This is extremely important for web backend development.

---

# Cookie

A cookie is data that a server asks the browser to store and send with applicable subsequent requests.

Example:

```http
Set-Cookie: session_id=abc123
```

Browser stores it.

Then:

```http
Cookie: session_id=abc123
```

gets sent on matching requests.

---

# Session

A session is **server-side state associated with a client/user**, commonly identified by a session ID stored in a cookie.

Example:

```text
Browser
   │
   │ session_id=abc123
   ▼
FastAPI
   │
   ▼
Session Store
   │
   └── abc123 → user_id=42
```

---

# Cookie vs Session

| Cookie                                       | Session                                       |
| -------------------------------------------- | --------------------------------------------- |
| Client-side browser storage mechanism        | Server-side state concept                     |
| Sent with requests based on cookie rules     | Identified through cookie/token               |
| Can store small pieces of data               | Can store larger server-side state            |
| User can potentially inspect it              | Server controls the session state             |
| Protected with appropriate cookie attributes | Requires server-side/session-store management |

---

# Secure cookie settings

For sensitive session cookies, important attributes include:

```text
Secure
HttpOnly
SameSite
```

### Secure

Cookie is sent only over HTTPS.

### HttpOnly

JavaScript cannot access it through normal browser APIs such as `document.cookie`.

This helps reduce some XSS-based cookie theft.

### SameSite

Controls when cookies are sent in cross-site contexts and is an important CSRF defense mechanism.

---

# Session architecture at scale

One server:

```text
Browser
  ↓
Server
  ↓
Local session
```

But with multiple servers:

```text
                Load Balancer
              /      |      \
             ▼       ▼       ▼
          Server 1 Server 2 Server 3
             \       |       /
              \      |      /
                Session Store
```

Could use:

```text
Redis
Database
Other shared session store
```

Alternatively, stateless authentication tokens can avoid server-side session state, with their own trade-offs.

---

# Cookie vs JWT

Another common interview trap:

> Cookies and JWTs aren't opposites.

A JWT can be stored in:

```text
Cookie
```

or:

```text
Authorization: Bearer <token>
```

A cookie is a **transport/storage mechanism in the browser**.

JWT is a **token format**.

---

# 9️⃣ CORS

CORS = **Cross-Origin Resource Sharing**.

This is a browser security mechanism.

---

# What is an origin?

Origin is:

```text
scheme + host + port
```

For example:

```text
https://example.com
```

and:

```text
https://api.example.com
```

are different origins because the hosts differ.

Likewise:

```text
http://example.com
https://example.com
```

are different origins because schemes differ.

---

# Example

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8000
```

Different ports → different origins.

Browser JavaScript:

```javascript
fetch("http://localhost:8000/users")
```

The browser applies same-origin policy and CORS rules.

---

# CORS flow

Server can respond:

```http
Access-Control-Allow-Origin: http://localhost:3000
```

This tells the browser that the specified origin is allowed to access the response under CORS.

---

# FastAPI example

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://frontend.example.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)
```

---

# Don't do this blindly

```python
allow_origins=["*"]
```

especially for credentialed browser requests.

You should define allowed origins according to your application.

---

# Preflight request

Some cross-origin requests trigger:

```http
OPTIONS /users
```

The browser asks:

```text
"Are you allowing this origin/method/headers?"
```

Server responds with appropriate CORS headers.

Then browser sends the actual request if permitted.

---

# CORS is NOT authentication

This is a critical interview question.

CORS controls:

> **Which browser origins are allowed to read/use cross-origin responses under browser rules.**

It does **not** replace:

```text
Authentication
Authorization
API security
Input validation
```

Also, CORS is primarily a browser enforcement mechanism; non-browser clients aren't generally constrained by it in the same way.

---

# 🔟 SQL INJECTION

SQL injection happens when untrusted input changes the structure/meaning of a SQL query.

---

# Dangerous example

Imagine:

```python
username = input()

query = f"""
SELECT *
FROM users
WHERE username = '{username}'
"""
```

The application is combining:

```text
SQL code + user input
```

directly.

That's dangerous.

---

# Why?

SQL expects:

```sql
WHERE username = 'sayanta'
```

But malicious input can potentially alter the SQL syntax/logic.

Conceptually:

```text
Expected:

SQL + DATA

Bad:

SQL + DATA that becomes SQL
```

---

# Correct approach: parameterized queries

Instead:

```python
query = """
SELECT *
FROM users
WHERE username = :username
"""
```

Then pass:

```python
{"username": username}
```

The database driver/ORM handles parameter binding rather than treating the value as SQL syntax.

---

# SQLAlchemy

With SQLAlchemy, prefer its parameterized expression/query APIs.

Example:

```python
stmt = select(User).where(
    User.username == username
)
```

The value is bound as data.

---

# Important

ORMs reduce SQL injection risk when used correctly.

But ORM does **not** mean:

> "SQL injection is impossible."

You can still introduce vulnerabilities with:

```text
Raw SQL
String concatenation
Unsafe dynamic SQL
Improper query construction
```

---

# SQL injection prevention checklist

```text
✅ Parameterized queries
✅ ORM query APIs
✅ Input validation
✅ Least-privilege DB user
✅ Avoid string-built SQL
✅ Security testing
```

---

# 1️⃣1️⃣ ENCRYPTION vs HASHING

This is one of the most common security interview questions.

The key difference:

```text
Encryption → reversible
Hashing    → designed as one-way
```

---

# Encryption

Encryption converts plaintext into ciphertext using a key.

```text
Plaintext
   │
   │ Encrypt + Key
   ▼
Ciphertext
```

To recover:

```text
Ciphertext
   │
   │ Decrypt + Key
   ▼
Plaintext
```

---

# Example

```text
"Hello"
   ↓
Encryption
   ↓
"8f92a...."
```

Later:

```text
"8f92a...."
   ↓
Decryption
   ↓
"Hello"
```

---

# Where do we use encryption?

Examples:

```text
HTTPS/TLS
Encrypted databases/disks
Encrypted backups
Encrypted files
Secrets protection
```

---

# Symmetric encryption

Same secret key is used for encryption/decryption.

```text
          SAME KEY
             │
Plaintext → Encrypt → Ciphertext
                         │
                         ▼
                      Decrypt
                         │
                         ▼
                      Plaintext
```

Example family:

```text
AES
```

---

# Asymmetric cryptography

Uses:

```text
Public key
Private key
```

Conceptually:

```text
Public Key  → can be shared
Private Key → kept secret
```

Used in areas such as:

```text
TLS
Digital signatures
Key exchange
```

---

# Hashing

Hashing transforms data into a fixed-size digest.

```text
Input
  ↓
Hash function
  ↓
Digest
```

Example:

```text
"hello"
   ↓
SHA-256
   ↓
digest
```

You don't decrypt a hash.

---

# Why passwords should be hashed

Suppose user password:

```text
MyPassword123
```

Don't store:

```text
password = "MyPassword123"
```

Instead use a password-hashing algorithm.

```text
Password
   ↓
Password Hashing
   ↓
Stored Password Hash
```

During login:

```text
User enters password
        ↓
Password verifier
        ↓
Compare against stored hash
        ↓
Valid / Invalid
```

---

# Don't use plain SHA-256 for password storage

This is an important senior-security point.

Passwords should use a **password hashing / KDF algorithm designed to be expensive and salted**, such as:

```text
Argon2id
bcrypt
scrypt
```

rather than simply:

```text
SHA256(password)
```

The goal is to make large-scale password guessing more expensive.

---

# Salt

A salt is a unique random value associated with a password hash.

Conceptually:

```text
password + random salt
          ↓
   password KDF
          ↓
      hash
```

Different users with the same password should not end up with the same stored hash when properly salted.

Modern password-hashing libraries generally manage salts as part of the password hash representation.

---

# Encryption vs Hashing

| Feature          | Encryption      | Hashing                                          |
| ---------------- | --------------- | ------------------------------------------------ |
| Reversible       | Yes             | No                                               |
| Uses key         | Usually         | Hashing itself doesn't use an encryption key     |
| Main purpose     | Confidentiality | Integrity / fingerprints / password verification |
| Recover original | Yes, with key   | No                                               |
| Example          | AES             | SHA-256                                          |
| Password storage | ❌ Usually not   | ✅ Password KDF                                   |

---

# 🔥 Encryption vs Encoding vs Hashing

Another interview favorite.

### Encoding

Changes representation.

```text
"hello"
 ↓
Base64
 ↓
"aGVsbG8="
```

Not security.

Anyone can decode it.

---

### Encryption

```text
Plaintext
 ↓
Key
 ↓
Ciphertext
```

Reversible with appropriate key.

---

### Hashing

```text
Input
 ↓
Hash
 ↓
Digest
```

Designed to be one-way.

---

# 🧠 MASTER SECURITY MAP

```text
                    SECURITY
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
   NETWORK           DATA           APPLICATION
       │               │                │
       ▼               ▼                ▼
     HTTPS          Encryption       CORS
       │            Hashing           Auth
       │               │             Authorization
       ▼               ▼                │
      TLS         Password KDF          ▼
                                  Input Validation
                                       │
                                       ▼
                                  SQL Injection
```

---

# 🔥 HOW A SECURE API REQUEST WORKS

Let's combine everything.

User opens:

```text
https://api.example.com/users
```

### Step 1 — DNS

```text
api.example.com
       ↓
DNS
       ↓
IP
```

---

### Step 2 — TCP / QUIC

Depending on protocol/version:

```text
TCP connection
```

or HTTP/3:

```text
QUIC over UDP
```

---

### Step 3 — TLS

```text
Client
  ↓
TLS handshake
  ↓
Secure connection
```

---

### Step 4 — HTTP

```http
GET /users
Authorization: Bearer ...
Cookie: ...
```

---

### Step 5 — Load balancer

```text
Load Balancer
      ↓
FastAPI Server 2
```

---

### Step 6 — Process

The OS runs the application process.

Inside it:

```text
Process
 ├── Threads
 └── Async tasks
```

---

### Step 7 — Authentication

Server determines:

```text
Who are you?
```

---

### Step 8 — Authorization

Then:

```text
Are you allowed to access this?
```

---

### Step 9 — Database

FastAPI executes parameterized SQL.

```text
FastAPI
   ↓
SQLAlchemy
   ↓
Parameterized SQL
   ↓
PostgreSQL
```

This prevents SQL input from being interpreted as SQL syntax when correctly parameterized.

---

### Step 10 — Response

```text
PostgreSQL
   ↓
FastAPI
   ↓
HTTPS
   ↓
Browser
```

---

# 🚨 COMMON INTERVIEW TRAPS

## ❌ "Thread = lightweight process"

Too simplistic.

Better:

> A thread is an execution unit within a process and generally shares the process's address space/resources, while processes have separate address spaces.

---

## ❌ "Concurrency means things happen simultaneously"

Not necessarily.

```text
Concurrency → overlapping progress
Parallelism → simultaneous execution
```

---

## ❌ "Async solves CPU-heavy problems"

No.

Async primarily helps with I/O concurrency.

---

## ❌ "Deadlock and race condition are the same"

No.

```text
Race condition → timing-dependent incorrect behavior

Deadlock → circular waiting / no progress
```

---

## ❌ "HTTPS means the server is secure"

No.

HTTPS secures transport.

Your application can still have:

```text
SQL injection
Broken authorization
Weak passwords
XSS
CSRF
Bad secrets management
```

---

## ❌ "DNS gives you the server"

DNS resolves names to DNS records such as addresses/aliases; the actual request may then pass through load balancers, CDNs, proxies, etc.

---

## ❌ "UDP is faster than TCP"

Too simplistic.

UDP has less protocol overhead and different semantics, but application performance depends on the entire protocol/design/network.

---

## ❌ "CORS protects the API"

CORS primarily controls browser cross-origin behavior.

It is **not authentication or authorization**.

---

## ❌ "JWT is a replacement for cookies"

Wrong category.

```text
Cookie → browser storage/transport mechanism
JWT    → token format
```

---

## ❌ "Hashing encrypts passwords"

Wrong terminology.

Passwords should be processed with a password hashing/KDF algorithm.

---

## ❌ "Base64 is encryption"

Absolutely not.

```text
Base64 = encoding
```

Anyone can decode it.

---

# 🎯 SENIOR INTERVIEW QUESTIONS

### OS

1. Process vs thread?
2. What memory is shared between threads?
3. Why are processes more isolated?
4. What is context switching?
5. What is virtual memory?
6. What is a memory leak?
7. Stack vs heap?
8. What causes deadlocks?
9. Deadlock vs race condition?
10. How can deadlocks be prevented?

---

### Concurrency

11. Concurrency vs parallelism?
12. CPU-bound vs I/O-bound?
13. Why is async useful for APIs?
14. Does async make CPU work faster?
15. Threads vs processes for CPU-heavy Python workloads?
16. What is a race condition?

---

### Networking

17. What happens when you type a URL into a browser?
18. What does DNS do?
19. What is DNS caching?
20. TCP vs UDP?
21. What happens during a TCP connection establishment?
22. What does HTTPS add to HTTP?
23. What does TLS provide?
24. HTTP/1.1 vs HTTP/2 vs HTTP/3?
25. Why does HTTP/3 use QUIC?

---

### Web security

26. Cookie vs session?
27. Cookie vs JWT?
28. What does HttpOnly do?
29. What does Secure do?
30. What does SameSite do?
31. What is CORS?
32. Is CORS a security mechanism for authentication?
33. What is SQL injection?
34. How do parameterized queries prevent SQL injection?
35. Encryption vs hashing?
36. Why shouldn't passwords be encrypted/stored plaintext?
37. Why isn't SHA-256 alone ideal for password storage?
38. What is salting?
39. What is symmetric vs asymmetric cryptography?

---

# 🏆 DAY 6 CHEAT SHEET

```text
┌───────────────────────────────────────────────┐
│          OS, NETWORKING & SECURITY             │
├───────────────────────────────────────────────┤
│ PROCESS                                       │
│ → Independent execution environment           │
│                                               │
│ THREAD                                        │
│ → Execution unit inside process               │
│ → Shares process resources                    │
│                                               │
│ CONCURRENCY                                   │
│ → Multiple tasks making progress              │
│                                               │
│ PARALLELISM                                   │
│ → Actual simultaneous execution               │
│                                               │
│ DEADLOCK                                      │
│ → Circular waiting                            │
│                                               │
│ RACE CONDITION                                │
│ → Timing-dependent incorrect result           │
│                                               │
│ MEMORY                                        │
│ → Virtual memory / heap / stack / pages       │
│                                               │
│ HTTP                                          │
│ → Application protocol                        │
│                                               │
│ HTTPS                                         │
│ → HTTP over TLS                               │
│                                               │
│ DNS                                           │
│ → Name → DNS records/address information      │
│                                               │
│ TCP                                           │
│ → Reliable ordered byte stream                │
│                                               │
│ UDP                                           │
│ → Connectionless datagrams                    │
│                                               │
│ COOKIE                                        │
│ → Browser-managed data                        │
│                                               │
│ SESSION                                       │
│ → Server-side client state                    │
│                                               │
│ CORS                                          │
│ → Browser cross-origin policy mechanism       │
│                                               │
│ SQL INJECTION                                 │
│ → Untrusted input changes SQL meaning         │
│ → Prevent with parameterized queries          │
│                                               │
│ ENCRYPTION                                    │
│ → Reversible with appropriate key             │
│                                               │
│ HASHING                                       │
│ → One-way transformation                      │
│                                               │
│ PASSWORDS                                     │
│ → Use Argon2id / bcrypt / scrypt              │
└───────────────────────────────────────────────┘
```

# 🚀 FINAL MASTER MAP — DAY 6

```text
                         USER
                           │
                           ▼
                    ┌─────────────┐
                    │    DNS      │
                    └──────┬──────┘
                           │
                           ▼
                  TCP / QUIC / UDP
                           │
                           ▼
                       TLS 🔒
                           │
                           ▼
                       HTTPS
                           │
                           ▼
                   LOAD BALANCER
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
           Process      Process      Process
              │
        ┌─────┴─────┐
        ▼           ▼
     Threads     Async Tasks
        │           │
        └─────┬─────┘
              ▼
          FastAPI
              │
       ┌──────┼──────────┐
       ▼      ▼          ▼
      Auth   CORS     Validation
                       │
                       ▼
                  SQLAlchemy
                       │
                       ▼
              Parameterized SQL
                       │
                       ▼
                   Database
```

And security sits across the entire system:

```text
        🔒 TLS
          │
          ▼
   ┌─────────────────┐
   │   Secure API    │
   └─────────────────┘
      │     │     │
      ▼     ▼     ▼
    Auth   CORS  Validation
                   │
                   ▼
             SQL Injection
             Prevention
                   │
                   ▼
          Password Hashing
```

## 🔥 The senior-level connection

You now have the foundations to understand **what happens from browser → network → OS → FastAPI → database**:

```text
DAY 1–4
Python + DSA + SQL + APIs
          │
          ▼
DAY 5
System Design
          │
          ▼
DAY 6
OS + Networking + Security
          │
          ▼
DAY 7+
Distributed Systems
Cloud
Docker
Kubernetes
Observability
Advanced FastAPI
Database Internals
```

The most important mental model to retain is:

> **A backend request is not just a Python function call. It travels through DNS, networking, TLS, HTTP, load balancing, an OS process/thread/task model, application code, databases, and multiple security boundaries.**

Once you understand that entire path, senior backend/system-design questions become much easier.
