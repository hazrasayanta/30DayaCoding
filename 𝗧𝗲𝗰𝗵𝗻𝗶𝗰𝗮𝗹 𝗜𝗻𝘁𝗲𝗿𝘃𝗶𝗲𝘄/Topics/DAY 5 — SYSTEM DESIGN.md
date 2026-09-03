# ⚡ DAY 5 — SYSTEM DESIGN

This is where everything from **Python → OOP → SQL → APIs → Async** starts coming together.

At a senior backend level, System Design is not about memorizing Redis, Kafka, or load balancers.

The real skill is:

> **Given a problem, how do you design a system that is scalable, reliable, fast, maintainable, and reasonably cost-effective?**

---

# 🧠 0. BIG SYSTEM DESIGN MENTAL MODEL

A typical backend system eventually looks something like:

```text
                         ┌───────────────┐
                         │    CLIENT     │
                         │ Web / Mobile  │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │ DNS / CDN     │
                         └───────┬───────┘
                                 │
                                 ▼
                       ┌───────────────────┐
                       │  LOAD BALANCER    │
                       └─────────┬─────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
               ┌────────┐   ┌────────┐   ┌────────┐
               │FastAPI │   │FastAPI │   │FastAPI │
               │Server 1│   │Server 2│   │Server 3│
               └───┬────┘   └───┬────┘   └───┬────┘
                   │            │            │
                   └────────────┼────────────┘
                                │
                     ┌──────────┴──────────┐
                     │                     │
                     ▼                     ▼
               ┌───────────┐        ┌─────────────┐
               │   Redis   │        │   Database  │
               │   Cache   │        │   Primary   │
               └───────────┘        └──────┬──────┘
                                            │
                                   ┌────────┴────────┐
                                   ▼                 ▼
                             ┌───────────┐     ┌───────────┐
                             │ Read      │     │ Read      │
                             │ Replica 1 │     │ Replica 2 │
                             └───────────┘     └───────────┘

                                Async Work
                                     │
                                     ▼
                              ┌────────────┐
                              │   Queue    │
                              └─────┬──────┘
                                    │
                         ┌──────────┼──────────┐
                         ▼          ▼          ▼
                      Worker 1   Worker 2   Worker 3
```

Think of the system as several layers:

```text
Traffic
   ↓
Load Balancing
   ↓
Application Scaling
   ↓
Caching
   ↓
Database Scaling
   ↓
Async Processing
   ↓
Reliability / Consistency
```

---

# 1️⃣ CACHING

## What is a cache?

A cache stores **frequently accessed data in a faster storage layer**.

Instead of:

```text
Client
  ↓
FastAPI
  ↓
Database
  ↓
Response
```

we try:

```text
Client
  ↓
FastAPI
  ↓
Cache
  ↓
Response
```

Database is contacted only when necessary.

---

## 🧠 Simple analogy

Imagine a library.

Without cache:

```text
You ask librarian
      ↓
Librarian goes to warehouse
      ↓
Finds book
      ↓
Returns book
```

With cache:

```text
You ask librarian
      ↓
Book is already on desk
      ↓
Instantly returned
```

---

# Cache-aside pattern

This is one of the most important caching patterns.

```text
             Request
                │
                ▼
          ┌───────────┐
          │   Cache   │
          └─────┬─────┘
                │
          ┌─────┴─────┐
          │           │
        HIT          MISS
          │           │
          ▼           ▼
       Return      Database
                      │
                      ▼
                   Cache
                      │
                      ▼
                   Return
```

Example:

```python
def get_user(user_id):
    key = f"user:{user_id}"

    user = redis.get(key)

    if user:
        return user

    user = db.get_user(user_id)

    redis.set(key, user, ex=300)

    return user
```

Flow:

```text
GET /users/10

Redis:
user:10 ?

YES → return

NO → PostgreSQL
       ↓
     user data
       ↓
     Redis
       ↓
     return
```

---

# Cache Hit vs Cache Miss

### Cache hit

Data exists:

```text
Request
  ↓
Redis
  ↓
FOUND
  ↓
Response
```

Very fast.

### Cache miss

Data isn't available:

```text
Request
  ↓
Redis
  ↓
NOT FOUND
  ↓
Database
  ↓
Redis
  ↓
Response
```

---

# Why use caching?

### 1. Lower latency

Database:

```text
~milliseconds
```

Memory/cache:

```text
~sub-millisecond to low milliseconds
```

Actual numbers depend heavily on deployment/network/load, but the principle is what matters.

### 2. Reduce database load

Suppose:

```text
1,000,000 requests
```

If 90% are cache hits:

```text
Cache → 900,000
DB    → 100,000
```

Huge reduction in DB traffic.

### 3. Increase throughput

Your application can serve significantly more read traffic without scaling the DB as aggressively.

---

# Cache invalidation

One of the famous engineering problems:

> **There are only two hard things in Computer Science: cache invalidation and naming things.**

Suppose:

```text
DB:
User name = Sayanta

Redis:
User name = Sayanta
```

User changes name:

```text
DB:
Sayanta → Rahul

Redis:
Sayanta ❌
```

Now the cache is stale.

Possible solutions:

### TTL

```text
Cache value
   ↓
expires after 5 minutes
```

### Delete cache on update

```python
update_user()

db.update()

redis.delete(f"user:{user_id}")
```

### Write-through

```text
Application
    ↓
Cache
    ↓
Database
```

Both are updated as part of the write path.

---

# Cache stampede

Imagine:

```text
Cache expires
     ↓
10,000 requests arrive
     ↓
All miss cache
     ↓
10,000 DB queries
```

Your cache just caused a database disaster.

Possible solutions:

* locking
* request coalescing
* randomized TTL/jitter
* background refresh
* stale-while-revalidate

---

# Cache penetration

Suppose attackers repeatedly request:

```text
/user/999999999
```

which doesn't exist.

Every request:

```text
Redis MISS
   ↓
DB
   ↓
NOT FOUND
```

Solutions include:

* negative caching
* validation
* rate limiting
* Bloom filters in some architectures

---

# Common cache technologies

Typical examples:

* Redis
* Memcached
* CDN/edge caches

Redis is especially common when you need:

```text
key/value
TTL
counters
sets
lists
streams
distributed locks
etc.
```

### Senior interview question

**Should cache be the source of truth?**

Usually:

> No. Cache is generally an optimization over the durable source of truth.

But specialized architectures can intentionally make in-memory systems part of the authoritative data path. The important thing is to explicitly define durability and recovery guarantees.

---

# 2️⃣ LOAD BALANCING

Suppose you have one FastAPI server:

```text
100,000 requests
       ↓
   FastAPI
```

Problem:

```text
Server overloaded
```

Instead:

```text
                Client
                  │
                  ▼
          ┌───────────────┐
          │Load Balancer  │
          └───────┬───────┘
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
     Server 1  Server 2  Server 3
```

The load balancer distributes traffic.

---

# Why load balancing?

### 1. Scalability

```text
1 server
   ↓
3 servers
   ↓
10 servers
   ↓
100 servers
```

### 2. Availability

If:

```text
Server 2 ❌
```

the load balancer can stop sending traffic there.

```text
              Load Balancer
              /           \
             ↓             ↓
        Server 1       Server 3
```

### 3. Health checks

The load balancer periodically checks:

```text
GET /health
```

If server doesn't respond correctly:

```text
REMOVE FROM POOL
```

---

# Load-balancing algorithms

## Round Robin

```text
Request 1 → Server 1
Request 2 → Server 2
Request 3 → Server 3
Request 4 → Server 1
```

Simple.

---

## Weighted Round Robin

Suppose:

```text
Server 1 → powerful
Server 2 → medium
Server 3 → weak
```

Then:

```text
Server 1 → 50%
Server 2 → 30%
Server 3 → 20%
```

---

## Least Connections

Send traffic to the server currently handling the fewest active connections.

Useful when requests have different processing times.

---

## IP Hash

Same client IP tends to go to same server.

Can be useful for session affinity, but it can create uneven distribution.

---

# L4 vs L7 Load Balancer

### Layer 4

Works around:

```text
TCP
UDP
IP
```

It generally doesn't need to understand HTTP semantics.

### Layer 7

Understands:

```text
HTTP
URL
Headers
Cookies
Methods
```

Can route:

```text
/api/users → User service

/api/orders → Order service
```

---

# Stateless application servers

This is extremely important.

Prefer:

```text
Server 1
Server 2
Server 3
```

to be interchangeable.

Bad design:

```text
User session stored only on Server 1
```

Then:

```text
Request 1 → Server 1
Request 2 → Server 2
```

Server 2 doesn't know the session.

Better:

```text
FastAPI servers
      ↓
Shared session store / token
```

or use stateless authentication where appropriate.

---

# 3️⃣ DATABASE SCALING

Eventually:

```text
Database
   ↓
CPU high
RAM high
Disk I/O high
connections high
```

You need to scale it.

There are several different problems:

```text
Too many reads?
Too many writes?
Too much data?
Too many connections?
Need higher availability?
```

Don't jump directly to sharding.

---

# Vertical database scaling

Make the database machine stronger.

```text
BEFORE

CPU: 8
RAM: 32 GB
Disk: normal

       ↓

AFTER

CPU: 32
RAM: 128 GB
Disk: faster
```

### Advantages

* simple
* fewer architectural changes
* easier operationally

### Disadvantages

* hardware ceiling
* expensive at high scale
* still one main machine unless HA is added

---

# Horizontal database scaling

Add more database nodes.

Common approaches:

```text
Replication
Sharding
Partitioning
```

---

# Read replicas

Suppose:

```text
10% writes
90% reads
```

One DB:

```text
              DB
        ┌──────┴──────┐
      READ          WRITE
```

Instead:

```text
                 Primary
                /       \
               /         \
              ▼           ▼
         Replica 1     Replica 2
```

Writes:

```text
Application
     ↓
Primary
```

Reads:

```text
Application
     ↓
Replica 1 / Replica 2
```

This can dramatically increase read capacity.

---

# But there's a problem: replication lag

Suppose:

```text
Primary:
balance = 1000
```

User updates:

```text
balance = 500
```

Primary has:

```text
500
```

Replica hasn't caught up:

```text
1000
```

Application reads replica:

```text
1000 ❌
```

This is **replication lag**.

---

# Sharding

Instead of keeping all data on one DB:

```text
              Database
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
    Shard 1    Shard 2    Shard 3
```

Example by user ID:

```text
user_id 1-1M      → Shard 1
user_id 1M-2M     → Shard 2
user_id 2M-3M     → Shard 3
```

Or hash:

```text
shard = hash(user_id) % N
```

---

# Sharding problem

The biggest question:

> **What should the shard key be?**

Bad shard key can create:

```text
Shard 1 → 90% traffic
Shard 2 → 5%
Shard 3 → 5%
```

This is called a **hot shard / hot partition**.

Good shard keys try to distribute:

```text
data
traffic
storage
```

reasonably evenly while still supporting important query patterns.

---

# Partitioning vs Sharding

Don't confuse them.

### Partitioning

Splitting data logically within a database system.

Example:

```text
orders_2025
orders_2026
```

### Sharding

Distributing data across multiple database nodes.

```text
DB Node 1
DB Node 2
DB Node 3
```

---

# 4️⃣ DATABASE REPLICATION

Replication means:

> Keeping copies of data on multiple database nodes.

Typical architecture:

```text
                  PRIMARY
                     │
             ┌───────┴───────┐
             │               │
             ▼               ▼
        REPLICA 1        REPLICA 2
```

---

# Why replication?

## Read scaling

```text
10,000 reads/sec

Primary only
     ↓
Problem
```

With replicas:

```text
Primary
  ↓
Replica 1
Replica 2
Replica 3
```

Reads can be distributed.

---

# High availability

Suppose:

```text
Primary ❌
```

A replica can potentially be promoted:

```text
Replica 1
    ↓
NEW PRIMARY
```

This is a failover mechanism.

---

# Synchronous replication

Conceptually:

```text
Write
 ↓
Primary
 ↓
Replica confirms
 ↓
Success
```

Advantages:

* stronger durability/consistency guarantees

Disadvantages:

* higher write latency
* network dependency

---

# Asynchronous replication

```text
Write
 ↓
Primary
 ↓
Success
 ↓
Replica catches up later
```

Advantages:

* lower write latency
* good performance

Disadvantages:

* replication lag
* possible data loss depending on failure timing and configuration

---

# Important distinction

### Replication ≠ backup

Replication:

```text
Primary
  ↓
Replica
```

If application accidentally executes:

```sql
DELETE FROM users;
```

the deletion may replicate.

Backup gives you another recovery mechanism.

You generally want:

```text
Replication → availability
Backup      → recovery
```

---

# 5️⃣ QUEUES

Now imagine:

```text
POST /send-report
```

Generating the report takes:

```text
30 seconds
```

You don't want the HTTP request waiting 30 seconds.

Instead:

```text
Client
  ↓
FastAPI
  ↓
Queue
  ↓
202 Accepted
```

Then:

```text
Queue
  ↓
Worker
  ↓
Generate report
  ↓
Store result
```

---

# Queue mental model

```text
             PRODUCER
                 │
                 ▼
          ┌─────────────┐
          │    QUEUE    │
          └──────┬──────┘
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
    Worker 1  Worker 2  Worker 3
```

---

# Why queues?

## 1. Async processing

Examples:

```text
Send email
Generate PDF
Resize image
Process video
Send webhook
Generate analytics
```

---

## 2. Absorb traffic spikes

Suppose normal traffic:

```text
100 jobs/sec
```

Suddenly:

```text
10,000 jobs/sec
```

Without queue:

```text
Workers overloaded
```

With queue:

```text
10,000 jobs
     ↓
   Queue
     ↓
Workers process gradually
```

The queue acts as a buffer.

---

# Queue provides decoupling

Without queue:

```text
API
 ↓
Email Service
 ↓
Notification Service
 ↓
Analytics
```

If notification service is down:

```text
API request may fail
```

With queue:

```text
API
 ↓
Queue
 ↓
Workers
```

Services are less tightly coupled.

---

# Message delivery semantics

Very important for senior interviews.

## At-most-once

Message may be processed:

```text
0 or 1 time
```

No duplicate processing guarantee.

---

## At-least-once

Message may be processed:

```text
1 or more times
```

Duplicates are possible.

This is extremely common.

Therefore:

> **Consumers should be idempotent.**

Example:

```text
Payment job ID = 123
```

Worker receives it twice.

Bad:

```text
charge_card()
charge_card()
```

Customer gets charged twice.

Better:

```text
if already_processed(job_id):
    return

charge_card()

mark_processed(job_id)
```

---

# Exactly-once

Be careful when someone says:

> "Kafka gives exactly once."

Exactly-once is nuanced and usually refers to guarantees within a defined processing/transactional boundary.

End-to-end exactly-once effects across external systems are much harder.

Senior answer:

> "I would design consumers to be idempotent even when the messaging system provides stronger delivery guarantees."

---

# Retries

Suppose:

```text
Worker
  ↓
External API
  ↓
500 error
```

Retry:

```text
1st attempt ❌
2nd attempt ❌
3rd attempt ✅
```

Common technique:

```text
Exponential backoff
```

Example:

```text
1 sec
2 sec
4 sec
8 sec
16 sec
```

with jitter to reduce synchronized retry storms.

---

# Dead Letter Queue

Suppose:

```text
Job
 ↓
retry
 ↓
retry
 ↓
retry
 ↓
still fails
```

Don't retry forever.

Move it:

```text
             Queue
               │
               ▼
            Worker
               │
          repeated failure
               │
               ▼
              DLQ
```

DLQ = Dead Letter Queue.

Then engineers can investigate/reprocess the failed message.

---

# Backpressure

Suppose:

```text
Producer = 10,000 jobs/sec
Worker   = 1,000 jobs/sec
```

Queue grows:

```text
10K
20K
30K
40K
...
```

Eventually:

```text
Memory/storage exhausted
```

This is a **backpressure** problem.

Solutions can include:

* increase consumers
* rate-limit producers
* batch processing
* shed non-critical work
* autoscaling
* bounded queues
* prioritize workloads

---

# Queue technologies

Examples:

* RabbitMQ
* Apache Kafka
* Amazon SQS
* Redis Streams

But don't say:

> "Kafka and RabbitMQ are basically the same."

They have different models and strengths.

Kafka is commonly used for:

```text
event streams
high-throughput logs
durable event replay
consumer groups
```

RabbitMQ is commonly used for:

```text
message brokering
routing
work queues
acknowledgment-oriented workflows
```

SQS provides managed queueing.

---

# 6️⃣ HORIZONTAL VS VERTICAL SCALING

This is a classic interview question.

---

## Vertical scaling

> Make one machine bigger.

```text
       BEFORE

     ┌──────────┐
     │ Server   │
     │ 4 CPU    │
     │ 16 GB    │
     └──────────┘

           ↓

       AFTER

     ┌──────────┐
     │ Server   │
     │ 32 CPU   │
     │ 128 GB   │
     └──────────┘
```

### Pros

* simple
* less application complexity
* easy initially

### Cons

* hardware limit
* expensive
* potentially large single failure domain

---

# Horizontal scaling

> Add more machines.

```text
              Load Balancer
              /     |     \
             ▼      ▼      ▼
          Server  Server  Server
             1      2      3
```

### Pros

* scalable
* fault tolerant
* elastic
* ideal for stateless applications

### Cons

* more complexity
* distributed state
* networking
* deployment/orchestration
* consistency issues

---

# Real-world answer

Don't say:

> "Horizontal scaling is always better."

Instead:

> "Most large systems use a combination. Stateless application tiers commonly scale horizontally, while some stateful components may use vertical scaling, replication, partitioning, or sharding depending on the workload."

That's a much stronger senior answer.

---

# 7️⃣ CAP THEOREM

This is one of the most misunderstood topics.

CAP means:

```text
C = Consistency
A = Availability
P = Partition Tolerance
```

---

# Consistency

Every successful read sees the appropriate latest value according to the system's consistency model.

Simplified interview example:

```text
Write:

balance = 500

Immediately read:

balance = 500
```

rather than seeing an older value.

---

# Availability

The system continues responding to requests.

```text
Request
  ↓
Response
```

even when parts of the distributed system have problems.

---

# Partition tolerance

The system continues operating despite communication failure between distributed nodes.

Imagine:

```text
Server A
   X
Server B
```

Network partition:

```text
A ←──── NETWORK FAILURE ────→ B
```

They cannot communicate.

---

# The key CAP statement

The correct explanation is:

> **When a network partition occurs, a distributed system cannot simultaneously guarantee both strong consistency and availability.**

This is better than saying:

> "You can pick any two of C, A and P."

That common explanation is too simplistic.

---

# CP system

During partition:

```text
Consistency > Availability
```

The system may reject/block some requests rather than return potentially conflicting/stale results.

```text
Partition
    ↓
Can't guarantee consistency
    ↓
Reject / wait
```

---

# AP system

During partition:

```text
Availability > immediate strong consistency
```

The system continues responding, potentially with temporarily divergent/stale data.

```text
Partition
    ↓
Continue serving
    ↓
Reconcile later
```

---

# Important CAP interview trap

Don't say:

> "MongoDB is always CP."

or:

> "Cassandra is always AP."

Real systems have nuanced consistency/availability behavior and configuration options.

A better answer:

> "CAP describes the trade-off under partition. Specific databases expose different consistency and availability guarantees, so I would evaluate the actual configuration and workload rather than labeling an entire database simplistically."

---

# PACELC — bonus senior concept

CAP only talks about:

```text
WHEN PARTITION HAPPENS
```

PACELC asks:

```text
If Partition:
    Availability vs Consistency

Else:
    Latency vs Consistency
```

Very useful when you start going deeper into distributed systems.

---

# 8️⃣ DESIGN ONE COMPLETE SYSTEM

Let's design something simple but powerful:

# 🔗 URL SHORTENER

Think:

```text
https://example.com/very/long/path/article/12345
```

becomes:

```text
https://sho.rt/a8K92x
```

---

# Step 1 — Requirements

## Functional

User can:

### Create short URL

```http
POST /shorten
```

Request:

```json
{
    "url": "https://example.com/very/long/url"
}
```

Response:

```json
{
    "short_url": "https://sho.rt/a8K92x"
}
```

---

### Redirect

```http
GET /a8K92x
```

Response:

```text
Redirect → original URL
```

---

### Optional

We could also support:

```text
Expiration
Analytics
Custom aliases
Authentication
Rate limiting
```

---

# Step 2 — Non-functional requirements

We want:

```text
Low latency
High availability
High read throughput
Durability
Scalability
```

Important observation:

URL shorteners are generally:

```text
WRITE → relatively low
READ  → extremely high
```

So our architecture should optimize for reads.

---

# Step 3 — High-level architecture

```text
                         Client
                           │
                           ▼
                    ┌────────────┐
                    │ DNS / CDN  │
                    └─────┬──────┘
                          │
                          ▼
                    ┌────────────┐
                    │LoadBalancer│
                    └─────┬──────┘
                          │
               ┌──────────┼──────────┐
               ▼          ▼          ▼
          ┌────────┐ ┌────────┐ ┌────────┐
          │FastAPI │ │FastAPI │ │FastAPI │
          │   1    │ │   2    │ │   3    │
          └───┬────┘ └───┬────┘ └───┬────┘
              │          │          │
              └──────────┼──────────┘
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
           ┌──────────┐      ┌──────────┐
           │  Redis   │      │ Database │
           │  Cache   │      │ Primary  │
           └──────────┘      └────┬─────┘
                                  │
                           ┌──────┴──────┐
                           ▼             ▼
                       Replica 1     Replica 2

Redirect Events
       │
       ▼
   ┌─────────┐
   │  Queue  │
   └────┬────┘
        │
        ▼
    Analytics
     Workers
```

Now let's understand every component.

---

# Step 4 — Create URL flow

User sends:

```http
POST /shorten
```

Architecture:

```text
Client
  ↓
Load Balancer
  ↓
FastAPI
  ↓
Generate short code
  ↓
Database
  ↓
Redis
  ↓
Response
```

Example:

```text
Long URL:
https://example.com/products/123

Generated code:
xY72ab
```

Database:

```text
short_code | original_url
-----------|------------------------------
xY72ab     | https://example.com/products/123
```

---

# Step 5 — Redirect flow

User requests:

```http
GET /xY72ab
```

FastAPI:

```text
Redis
   │
   ├── HIT ──→ original URL → redirect
   │
   └── MISS
         ↓
      Database
         ↓
       Redis
         ↓
      redirect
```

This is extremely efficient for a read-heavy system.

---

# Step 6 — Why Redis?

Suppose:

```text
100 million redirects/day
```

You don't want every request hitting PostgreSQL.

Instead:

```text
100M requests
      │
      ▼
    Redis
      │
   most hits
      │
      ▼
Only smaller percentage
      │
      ▼
  Database
```

Database load is dramatically reduced.

---

# Step 7 — Horizontal scaling

Suppose traffic increases:

```text
1M requests/day
       ↓
100M requests/day
       ↓
1B requests/day
```

We add FastAPI instances:

```text
             Load Balancer
          /      |       \
         ▼       ▼        ▼
      API 1    API 2     API 3
                            ...
```

No session is stored locally.

Therefore application servers remain stateless.

---

# Step 8 — Database scaling

Initially:

```text
FastAPI
   ↓
PostgreSQL
```

Later:

```text
             Primary
             /     \
            ▼       ▼
       Replica 1  Replica 2
```

For suitable read operations:

```text
FastAPI → Read Replica
```

Writes:

```text
FastAPI → Primary
```

---

# Step 9 — What about analytics?

Suppose every redirect needs:

```text
IP
timestamp
country
device
browser
referrer
```

Don't make the redirect request wait for analytics processing.

Bad:

```text
GET /xY72ab
    ↓
lookup URL
    ↓
write analytics
    ↓
return redirect
```

Better:

```text
GET /xY72ab
    ↓
lookup URL
    ↓
push event to queue
    ↓
return redirect
```

Then:

```text
Queue
  ↓
Analytics Worker
  ↓
Analytics DB
```

This keeps the critical path fast.

---

# Step 10 — Failure scenarios

A senior engineer should always ask:

> "What happens when something fails?"

---

## Redis goes down

Current:

```text
FastAPI
  ↓
Redis ❌
```

Fallback:

```text
FastAPI
  ↓
Database
```

System becomes slower but can remain functional.

This is called graceful degradation.

---

## API server goes down

```text
API 1 ❌
```

Load balancer detects failure:

```text
             LB
            /  \
           ▼    ▼
        API 2  API 3
```

Traffic continues.

---

## Replica goes down

```text
Replica 1 ❌
```

Reads can move to:

```text
Replica 2
```

or primary, depending on architecture.

---

## Primary database goes down

Need:

```text
Failover
```

Potentially:

```text
Primary ❌
   ↓
Replica promoted
   ↓
New Primary
```

The exact mechanism depends on the database and HA architecture.

---

## Queue goes down

This is interesting.

We don't necessarily want URL redirects to fail just because analytics is unavailable.

We can design:

```text
Redirect path
     ↓
must work

Analytics
     ↓
can be temporarily degraded
```

That is an example of prioritizing critical functionality.

---

# Step 11 — Rate limiting

URL shorteners can be abused.

Example:

```text
POST /shorten
```

attacker sends:

```text
1M requests/sec
```

We can use:

```text
Client
  ↓
Rate Limiter
  ↓
FastAPI
```

Redis is often useful for distributed rate-limiting state.

Example conceptual policy:

```text
100 requests / minute / user
```

Excess:

```http
429 Too Many Requests
```

---

# Step 12 — Cache stampede protection

Suppose a very popular URL:

```text
xY72ab
```

has expired from cache.

Suddenly:

```text
50,000 requests
```

all miss Redis.

Without protection:

```text
50,000
    ↓
Database
```

Bad.

We could use:

```text
Request coalescing
Distributed lock
Jittered TTL
Background refresh
```

so only one request repopulates the cache.

---

# Step 13 — Hot keys

Suppose:

```text
xY72ab
```

is the URL for a viral video.

Millions of users request:

```text
GET /xY72ab
```

One cache key becomes extremely hot.

Possible strategies:

* local in-process caching where appropriate
* replicated/distributed cache strategy
* CDN/edge caching when semantics permit
* partitioning/routing strategies
* careful cache architecture

---

# Step 14 — Data model

A simple schema:

```sql
CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,
    short_code VARCHAR(20) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    user_id BIGINT,
    created_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP
);
```

Index:

```sql
CREATE UNIQUE INDEX idx_urls_short_code
ON urls(short_code);
```

Why?

Because our critical query is:

```sql
SELECT original_url
FROM urls
WHERE short_code = 'xY72ab';
```

The index makes lookup efficient.

---

# Step 15 — Short-code generation

Potential approaches:

### Random string

```text
a8K92x
```

Need to handle collisions.

---

### Base62 encoding

Characters:

```text
a-z
A-Z
0-9
```

Generate numeric ID:

```text
1234567
```

Convert to Base62:

```text
abcD92
```

This gives compact codes.

---

# Step 16 — CAP in our system

Suppose:

```text
Primary DB
      X
Replica
```

Network partition occurs.

Now we have a choice.

For a critical operation, we may prefer:

```text
Consistency
```

and temporarily reject some requests.

For analytics:

```text
Availability
```

may be more important.

Analytics can tolerate:

```text
eventual consistency
```

This demonstrates an important real-world principle:

> **Different parts of the same system can have different consistency requirements.**

---

# 🧩 COMPLETE REQUEST FLOW

Let's put everything together.

## Write

```text
POST /shorten
       │
       ▼
Load Balancer
       │
       ▼
FastAPI
       │
       ├── Authentication
       │
       ├── Rate Limiting
       │
       ├── Generate Code
       │
       ▼
   PostgreSQL
       │
       ▼
     Redis
       │
       ▼
    Response
```

---

## Read

```text
GET /abc123
       │
       ▼
Load Balancer
       │
       ▼
FastAPI
       │
       ▼
     Redis
      / \
   HIT   MISS
   │       │
   │       ▼
   │    PostgreSQL
   │       │
   │       ▼
   │     Redis
   │       │
   └───┬───┘
       ▼
    Redirect
```

---

## Analytics

```text
Redirect
   │
   ▼
 Queue
   │
   ▼
 Worker
   │
   ▼
Analytics DB
```

This architecture now uses almost everything from today's lesson.

---

# 🔥 HOW ALL DAY 5 CONCEPTS CONNECT

```text
                    SYSTEM DESIGN
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
    Scalability       Performance        Reliability
        │                 │                  │
        │                 ▼                  │
        │              CACHE                 │
        │                 │                  │
        ▼                 ▼                  ▼
  LOAD BALANCER      Redis/CDN          REPLICATION
        │                                    │
        ▼                                    ▼
 HORIZONTAL SCALE                       HA / Failover
        │
        ▼
 DATABASE SCALING
    │          │
    ▼          ▼
READ REPLICAS SHARDING
    │
    └──────────────┐
                   ▼
                QUEUES
                   │
                   ▼
             ASYNC WORKERS
                   │
                   ▼
              BACKPRESSURE
                   │
                   ▼
             CAP / CONSISTENCY
```

---

# 🧠 SENIOR SYSTEM DESIGN FRAMEWORK

In an interview, **don't immediately start drawing boxes**.

Use this sequence:

```text
1. Requirements
       ↓
2. Scale estimation
       ↓
3. API design
       ↓
4. Data model
       ↓
5. High-level architecture
       ↓
6. Read/write flows
       ↓
7. Bottlenecks
       ↓
8. Scaling
       ↓
9. Consistency
       ↓
10. Failure handling
       ↓
11. Security
       ↓
12. Observability
       ↓
13. Trade-offs
```

---

# 1. Clarify requirements

Ask:

```text
Who are the users?
What operations exist?
Read-heavy or write-heavy?
How much traffic?
How much data?
Latency requirements?
Availability requirements?
Consistency requirements?
```

---

# 2. Estimate scale

Suppose:

```text
10 million users
1 million requests/day
```

Estimate:

```text
average QPS
peak QPS
storage
bandwidth
```

You don't need perfect numbers.

The goal is to justify architecture.

---

# 3. API design

Example:

```http
POST /urls
GET /urls/{code}
DELETE /urls/{code}
```

Think about:

* authentication
* idempotency
* pagination
* status codes
* rate limiting

This directly connects to **Day 4 — APIs**.

---

# 4. Data model

Think:

```text
entities
relationships
indexes
constraints
query patterns
```

This connects directly to:

**Day 3 — SQL & Databases**

---

# 5. Architecture

Choose:

```text
Load balancer
App servers
Cache
Database
Queue
Workers
Object storage
```

depending on actual requirements.

---

# 6. Identify bottlenecks

Ask:

```text
CPU?
Memory?
Database?
Network?
Cache?
Disk?
Queue?
External API?
```

Then scale the actual bottleneck.

---

# 7. Failure handling

Ask:

```text
What if Redis dies?

What if DB dies?

What if one API server dies?

What if queue dies?

What if network partition happens?

What if external service times out?
```

This is what separates basic system design from senior system design.

---

# 🔥 DAY 5 + PREVIOUS DAYS CONNECTION

This is extremely important for your backend career.

```text
PART 1
Python Core
   │
   ▼
PART 3
Functions
   │
   ▼
PART 5
OOP
   │
   ▼
PART 6
Python Internals
   │
   ▼
PART 7
Async Python
   │
   ▼
DAY 1
DSA
   │
   ▼
DAY 2
OOP + SOLID + Exceptions
   │
   ▼
DAY 3
SQL + Databases
   │
   ▼
DAY 4
APIs + Authentication
   │
   ▼
DAY 5
SYSTEM DESIGN
   │
   ▼
Senior Backend Engineer
```

And specifically:

```text
FastAPI
   │
   ▼
Router
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
SQLAlchemy
   │
   ▼
PostgreSQL
```

At scale:

```text
                    ┌── Redis
                    │
FastAPI → LB → Apps ├── PostgreSQL
                    │       ├── Primary
                    │       └── Replicas
                    │
                    └── Queue
                          │
                          └── Workers
```

---

# 🎯 SENIOR INTERVIEW QUESTIONS

## Caching

### Q1. What is cache-aside?

**Answer:**

Application first checks cache. On miss, it reads from the database, populates the cache, and returns the result.

---

### Q2. What happens when cache is stale?

Possible approaches:

```text
TTL
Explicit invalidation
Write-through
Versioned keys
Background refresh
```

---

### Q3. What is cache stampede?

Many requests simultaneously miss an expired cache entry and overload the database.

---

# Load Balancer

### Q4. Why use a load balancer?

```text
Traffic distribution
High availability
Health checks
Horizontal scaling
TLS termination
Routing
```

---

### Q5. Why are stateless servers preferred?

Because any server can handle any request.

```text
Request 1 → Server A
Request 2 → Server C
Request 3 → Server B
```

No dependency on local session state.

---

# Database

### Q6. Read replica vs sharding?

**Read replica:**

```text
Copies entire dataset
→ primarily scales reads
```

**Sharding:**

```text
Splits dataset
→ scales storage/read/write capacity
```

They solve different problems and can be combined.

---

### Q7. What is replication lag?

Delay between data being committed on the primary and becoming visible on a replica.

---

### Q8. Why can't replication replace backups?

Because corrupted/deleted data can propagate to replicas.

---

# Queue

### Q9. Why use a queue?

```text
Async processing
Decoupling
Spike absorption
Retries
Backpressure
```

---

### Q10. How do you handle duplicate messages?

Make consumers **idempotent**.

For example:

```text
event_id = abc123
```

Store processed IDs or use an idempotency mechanism appropriate to the workflow.

---

### Q11. What is a DLQ?

A Dead Letter Queue stores messages that repeatedly fail processing so they can be inspected/reprocessed separately.

---

# Scaling

### Q12. Horizontal vs vertical?

```text
Vertical = bigger machine

Horizontal = more machines
```

Large systems commonly use both.

---

# CAP

### Q13. Explain CAP correctly.

Strong answer:

> "CAP says that when a distributed system experiences a network partition, it cannot simultaneously guarantee both strong consistency and availability. Partition tolerance matters because network partitions are a reality in distributed systems, so the practical trade-off during a partition is generally between consistency and availability."

🔥 That's an interview-quality answer.

---

# Q14. What is eventual consistency?

Different replicas may temporarily disagree, but if updates stop and the system continues operating normally, they eventually converge.

---

# 🚨 COMMON INTERVIEW TRAPS

### ❌ "CAP means choose any two."

Better:

> CAP is specifically about guarantees during a partition.

---

### ❌ "Replication is backup."

Wrong.

```text
Replication → availability / scaling
Backup → recovery
```

---

### ❌ "Horizontal scaling means sharding."

Not necessarily.

Horizontal scaling can mean:

```text
multiple application servers
read replicas
sharded databases
multiple workers
distributed caches
```

---

### ❌ "Queue guarantees exactly once."

Don't assume that.

Design for:

```text
at-least-once
+
idempotent consumers
```

unless you have a very specific stronger guarantee.

---

### ❌ "Caching always improves performance."

Not automatically.

Cache introduces:

```text
stale data
invalidation
memory cost
stampedes
hot keys
operational complexity
```

---

### ❌ "Just add Redis."

A senior engineer asks:

```text
What are we caching?
Why?
What is the TTL?
What is the invalidation strategy?
What happens when Redis is unavailable?
What is the memory requirement?
```

---

# 📌 DAY 5 CHEAT SHEET

```text
┌─────────────────────────────────────────────┐
│              SYSTEM DESIGN                  │
├─────────────────────────────────────────────┤
│ CACHE                                       │
│ → Faster reads                              │
│ → Lower DB load                             │
│ → TTL / invalidation                        │
│                                             │
│ LOAD BALANCER                               │
│ → Distribute traffic                        │
│ → Health checks                             │
│ → High availability                         │
│                                             │
│ VERTICAL SCALING                            │
│ → Bigger machine                            │
│                                             │
│ HORIZONTAL SCALING                          │
│ → More machines                             │
│                                             │
│ REPLICATION                                 │
│ → Copies of data                            │
│ → Read scaling / HA                         │
│ → Replication lag possible                  │
│                                             │
│ READ REPLICA                                │
│ → Scale reads                               │
│                                             │
│ SHARDING                                    │
│ → Split data across nodes                   │
│                                             │
│ QUEUE                                       │
│ → Async work                                │
│ → Decoupling                                │
│ → Spike absorption                          │
│                                             │
│ DLQ                                         │
│ → Failed messages                           │
│                                             │
│ IDEMPOTENCY                                  │
│ → Safe duplicate processing                 │
│                                             │
│ CAP                                         │
│ → During partition: C vs A trade-off        │
│                                             │
│ SYSTEM DESIGN                               │
│ → Requirements                              │
│ → Scale                                     │
│ → Architecture                              │
│ → Bottlenecks                               │
│ → Failures                                  │
│ → Trade-offs                                │
└─────────────────────────────────────────────┘
```

---

# 🏆 FINAL MASTER MAP

You should now be able to see backend architecture as one connected picture:

```text
                         CLIENT
                           │
                           ▼
                      DNS / CDN
                           │
                           ▼
                    LOAD BALANCER
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
         FastAPI         FastAPI        FastAPI
            │              │              │
            └──────────────┼──────────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
              REDIS              DATABASE
              CACHE                │
                                   │
                         ┌─────────┴─────────┐
                         ▼                   ▼
                      PRIMARY             REPLICAS
                         │
                         ▼
                       QUEUE
                         │
               ┌─────────┼─────────┐
               ▼         ▼         ▼
            Worker     Worker     Worker
               │
               ▼
        Analytics / Email /
        Reports / Processing
```

And underneath it:

```text
Python
 ↓
OOP / SOLID
 ↓
Async
 ↓
FastAPI
 ↓
SQLAlchemy
 ↓
PostgreSQL
 ↓
Redis
 ↓
Queues
 ↓
Load Balancing
 ↓
Replication
 ↓
Horizontal Scaling
 ↓
Distributed Systems
 ↓
CAP / Consistency
 ↓
SYSTEM DESIGN
```

## 🔥 The most important mindset

When you're asked:

> **"Design X."**

Don't think:

> "Which technologies should I use?"

Think:

> **"What are the requirements, where is the bottleneck, what happens when something fails, and what trade-off am I making?"**

That's the transition from **backend developer → senior backend engineer**.
