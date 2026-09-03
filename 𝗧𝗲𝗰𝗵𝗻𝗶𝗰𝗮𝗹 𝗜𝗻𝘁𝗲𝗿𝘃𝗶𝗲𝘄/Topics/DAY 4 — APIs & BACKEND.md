Absolutely. Let’s continue with the **same detailed senior-backend/interview style**.

# 🔧 DAY 4 — APIs & BACKEND

This is one of the **most important sections for your FastAPI work**.

The goal isn't just to know:

> "`GET` means fetch."

You should understand the complete lifecycle:

```text
                         CLIENT
                            │
                            │ HTTP Request
                            ↓
                       ┌──────────┐
                       │ FastAPI  │
                       └────┬─────┘
                            │
              ┌─────────────┼─────────────┐
              ↓             ↓             ↓
        Authentication  Authorization   Validation
              │             │             │
              └─────────────┼─────────────┘
                            ↓
                       Business Logic
                            │
                            ↓
                         Database
                            │
                            ↓
                     HTTP Response
                            │
              ┌─────────────┼─────────────┐
              ↓             ↓             ↓
           Status        Headers         Body
            Code
```

And around all of this:

```text
        ┌────────────────────────────────────┐
        │ Rate Limiting / Logging / Errors  │
        └────────────────────────────────────┘
```

---

# 1️⃣ REST APIs ⭐⭐⭐⭐⭐

## What is an API?

API = **Application Programming Interface**

An API allows one system to communicate with another.

Example:

```text
Frontend
   │
   │ GET /users/123
   ↓
FastAPI
   │
   ↓
Database
   │
   ↓
User data
   │
   ↓
JSON Response
```

---

# What is REST?

REST = **Representational State Transfer**

It's an architectural style for designing network APIs.

The key idea is:

> **Treat things as resources and use HTTP semantics to operate on those resources.**

For example:

```text
/users
/users/123
/orders
/orders/456
/products
/products/10
```

These represent resources.

---

# REST Resource Model

Think:

```text
/users
    ↓
collection

/users/123
    ↓
specific resource
```

Then HTTP methods describe the operation.

```text
GET     /users
        ↓
        Get users


GET     /users/123
        ↓
        Get user 123


POST    /users
        ↓
        Create user


PUT     /users/123
        ↓
        Replace user


PATCH   /users/123
        ↓
        Partially update user


DELETE  /users/123
        ↓
        Delete user
```

---

# REST Principles

Common REST characteristics include:

### Stateless

Each request contains the information needed to process it.

```text
Request 1
Request 2
Request 3
```

The server doesn't rely on hidden conversational state stored between requests.

### Client-Server

Client and server have separate responsibilities.

```text
Client
  ↓
API
  ↓
Server
```

### Cacheable

Responses can be cacheable where appropriate.

### Uniform interface

Use consistent resource URLs and HTTP semantics.

---

# 🚨 Bad API Design

Something like:

```text
GET /getUsers
GET /createUser
GET /deleteUser
```

is usually poor REST-style design.

Better:

```text
GET    /users
POST   /users
DELETE /users/123
```

The **HTTP method communicates the operation**.

---

# 2️⃣ HTTP METHODS ⭐⭐⭐⭐⭐

The most important methods:

```text
GET
POST
PUT
PATCH
DELETE
```

---

# GET

Retrieve data.

```http
GET /users/123
```

Should not modify server state.

Example:

```python
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    ...
```

---

# POST

Create a resource or trigger an operation where POST semantics are appropriate.

```http
POST /users
```

Body:

```json
{
    "name": "Sayanta",
    "email": "sayanta@example.com"
}
```

Usually **not idempotent**.

Calling it twice may create two resources.

---

# PUT

Typically means:

> **Replace the representation of a resource.**

```http
PUT /users/123
```

For example:

```json
{
    "name": "Sayanta",
    "email": "new@example.com"
}
```

PUT is generally considered **idempotent**.

---

# PATCH

Partial modification.

```http
PATCH /users/123
```

Body:

```json
{
    "email": "new@example.com"
}
```

Only the specified fields change.

PATCH is not inherently guaranteed to be idempotent; it depends on the operation.

---

# DELETE

Delete a resource.

```http
DELETE /users/123
```

Generally considered idempotent in HTTP semantics: repeating the request should result in the same intended resource state, even if the response can differ.

---

# 🧠 Idempotency

Very important for senior interviews.

An operation is idempotent if:

```text
Do it once
   +
Do it again
   ↓
Same intended server state
```

Examples:

```text
GET     → Yes
PUT     → Yes
DELETE  → Yes
POST    → Usually No
PATCH   → Depends on implementation
```

---

# 3️⃣ HTTP STATUS CODES ⭐⭐⭐⭐⭐

Status codes tell the client what happened.

Think:

```text
1xx → Informational
2xx → Success
3xx → Redirection
4xx → Client-side request problem
5xx → Server-side failure
```

---

# 2xx — SUCCESS

### 200 OK

Successful request.

```http
GET /users/123
→ 200
```

### 201 Created

Resource created.

```http
POST /users
→ 201
```

### 202 Accepted

Request accepted for processing, often when work is asynchronous.

### 204 No Content

Successful request with no response body.

Common:

```http
DELETE /users/123
→ 204
```

---

# 4xx — CLIENT/REQUEST ERRORS

### 400 Bad Request

Request is invalid/malformed in a general sense.

### 401 Unauthorized

Means:

> **Authentication is required or failed.**

Think:

```text
Who are you?
```

### 403 Forbidden

Means:

> **You are authenticated, but aren't allowed to perform this action.**

Think:

```text
I know who you are.
You don't have permission.
```

### 404 Not Found

Resource doesn't exist.

### 409 Conflict

Request conflicts with current resource state.

Example:

```text
Trying to create username
"sayanta"

but it already exists.
```

### 422 Unprocessable Content

Request structure may be understood, but the supplied data fails validation/semantic requirements. Frameworks such as FastAPI commonly use 422 for validation errors.

---

# 5xx — SERVER ERRORS

### 500

Unexpected server-side failure.

### 502

Bad gateway / invalid response from an upstream service.

### 503

Service unavailable.

---

# 🔥 401 vs 403

Memorize this:

```text
401
 ↓
Authentication problem
"Who are you?"


403
 ↓
Authorization problem
"I know who you are,
but you can't do this."
```

---

# 4️⃣ AUTHENTICATION vs AUTHORIZATION ⭐⭐⭐⭐⭐

This is one of the most frequently asked backend questions.

## Authentication

> **Who are you?**

Examples:

```text
Username/password
JWT
OAuth login
API key
Session
```

---

## Authorization

> **What are you allowed to do?**

Example:

```text
User
 ↓
authenticated
 ↓
Role = viewer
 ↓
Can READ
 ↓
Cannot DELETE
```

---

# Mental Model

```text
                    REQUEST
                       │
                       ↓
                 AUTHENTICATION
                       │
                  Who are you?
                       │
                       ↓
                Identity established
                       │
                       ↓
                 AUTHORIZATION
                       │
                What can you do?
                       │
                       ↓
                 Allow / Deny
```

---

# RBAC

RBAC = **Role-Based Access Control**

Example:

```text
Admin
 ├── Create
 ├── Read
 ├── Update
 └── Delete

Editor
 ├── Create
 ├── Read
 └── Update

Viewer
 └── Read
```

In FastAPI, this can be implemented through dependencies/policies.

Conceptually:

```python
def require_admin(user):
    if user.role != "admin":
        raise HTTPException(status_code=403)
```

---

# 5️⃣ JWT ⭐⭐⭐⭐⭐

JWT = **JSON Web Token**

A JWT is commonly used to carry signed claims between parties.

Structure:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example conceptually:

```text
xxxxx.yyyyy.zzzzz
```

---

# JWT Structure

### Header

Contains metadata such as algorithm/type.

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### Payload

Contains claims.

```json
{
    "sub": "123",
    "role": "admin",
    "exp": 1790000000
}
```

### Signature

Used to verify integrity/authenticity.

Conceptually:

```text
signature =
sign(
    base64url(header) + "." + base64url(payload),
    secret/private key
)
```

---

# 🚨 JWT Payload Is NOT Encrypted

This is an important interview point.

JWT payloads are typically **encoded, not encrypted**.

Therefore don't put:

```text
password
credit card
secret information
```

inside the payload.

The signature protects against unauthorized modification, but doesn't make the payload confidential.

---

# JWT Request Flow

```text
LOGIN
  │
  ↓
Credentials verified
  │
  ↓
Server issues JWT
  │
  ↓
Client stores token
  │
  ↓
Request
Authorization: Bearer <token>
  │
  ↓
Server verifies token
  │
  ↓
Identity / claims
  │
  ↓
Authorization
  │
  ↓
Resource
```

---

# JWT Expiration

A token may include:

```json
{
    "sub": "123",
    "exp": 1790000000
}
```

After expiration:

```text
Token
 ↓
expired
 ↓
reject
 ↓
401
```

---

# Access Token vs Refresh Token

A common architecture:

```text
Short-lived Access Token
        ↓
Used for API requests


Longer-lived Refresh Token
        ↓
Used to obtain new access token
```

Conceptually:

```text
Login
  ↓
Access Token + Refresh Token
  │
  ├──── API calls
  │
  └──── refresh when access expires
```

Security design matters greatly here, especially around storage, rotation, revocation, and theft.

---

# OAuth 2.0 ⭐⭐⭐⭐⭐

OAuth is primarily an **authorization/delegation framework**.

Example:

```text
"Allow this application to access my Google data."
```

Instead of giving your Google password to the application.

---

# OAuth Mental Model

```text
                 User
                  │
                  ↓
              Client App
                  │
                  │ Authorization
                  ↓
          Authorization Server
                  │
                  ↓
             Access Token
                  │
                  ↓
             Resource API
```

OAuth is about delegated access.

### Important distinction

```text
JWT
 ↓
Token format


OAuth 2.0
 ↓
Authorization framework/protocol
```

They are **not the same thing**.

OAuth access tokens can use formats other than JWT.

---

# 6️⃣ PAGINATION ⭐⭐⭐⭐⭐

Imagine:

```text
10 million users
```

You should not return:

```http
GET /users
```

with all 10 million.

Instead:

```text
GET /users?page=1&limit=20
```

---

# Offset Pagination

Example:

```http
GET /users?page=3&limit=20
```

Conceptually:

```text
page 1 → rows 1-20
page 2 → rows 21-40
page 3 → rows 41-60
```

SQL often resembles:

```sql
SELECT *
FROM users
ORDER BY id
LIMIT 20 OFFSET 40;
```

Simple and useful.

---

# Cursor / Keyset Pagination ⭐⭐⭐⭐⭐

For large datasets, cursor/keyset pagination is often preferable.

Example:

```http
GET /users?cursor=eyJpZCI6NTAwfQ&limit=20
```

Conceptually:

```text
Current position
       ↓
      id=500
       ↓
next request
       ↓
WHERE id > 500
       ↓
LIMIT 20
```

SQL:

```sql
SELECT *
FROM users
WHERE id > 500
ORDER BY id
LIMIT 20;
```

---

# Offset vs Cursor

| Offset                         | Cursor                             |
| ------------------------------ | ---------------------------------- |
| Simple                         | More complex                       |
| Easy page numbers              | Usually next/previous navigation   |
| Can degrade with large offsets | Good for large datasets            |
| Can shift when data changes    | More stable when designed well     |
| Good for many simple APIs      | Excellent for feeds/large datasets |

---

# FastAPI Pagination

Conceptually:

```python
@app.get("/users")
async def get_users(
    limit: int = 20,
    cursor: int | None = None,
):
    ...
```

Response:

```json
{
    "data": [
        ...
    ],
    "pagination": {
        "next_cursor": "500",
        "limit": 20
    }
}
```

---

# 7️⃣ RATE LIMITING ⭐⭐⭐⭐⭐

Rate limiting controls:

> **How many requests a client can make within a period.**

Example:

```text
100 requests / minute
```

If client exceeds:

```text
100
101
102
...
```

API returns:

```http
429 Too Many Requests
```

---

# Why Rate Limit?

Protect against:

```text
abuse
brute force
accidental traffic spikes
resource exhaustion
DoS-like request floods
unfair resource usage
```

---

# Rate Limiting Architecture

```text
                    REQUEST
                       │
                       ↓
                 Rate Limiter
                       │
                 ┌─────┴─────┐
                 ↓           ↓
               Allowed     Exceeded
                 │             │
                 ↓             ↓
              FastAPI         429
                 │
                 ↓
             Application
```

---

# Common Algorithms

## Fixed Window

```text
10:00–10:01
     ↓
100 requests
```

At 10:01 the counter resets.

Simple, but can have boundary bursts.

---

## Sliding Window

Tracks requests over a moving time interval.

More accurate but potentially more expensive.

---

## Token Bucket ⭐⭐⭐⭐⭐

Imagine a bucket:

```text
      ┌──────────────┐
      │ 🪙 🪙 🪙 🪙 │
      │ 🪙 🪙       │
      └──────────────┘
           tokens
```

Each request consumes a token.

Tokens refill over time.

```text
Request
   ↓
Token available?
 ├── YES → consume → process
 └── NO  → 429
```

---

## Rate Limit By What?

Could be:

```text
IP address
User ID
API key
Tenant
Endpoint
Combination of these
```

For authenticated APIs, user/API-key/tenant limits can be more meaningful than IP-only limits.

---

# Distributed Rate Limiting

This matters for production.

Suppose you have:

```text
             Load Balancer
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Server 1   Server 2   Server 3
```

If every server keeps its own counter:

```text
Server 1 → 50
Server 2 → 50
Server 3 → 50
```

your actual global limit may be wrong.

You typically need shared state, commonly something like:

```text
             Redis
               ↑
       ┌───────┼───────┐
       ↑       ↑       ↑
      API     API     API
```

The exact design depends on consistency, latency, failure handling, and whether limits are global or per tenant/user.

---

# 8️⃣ API ERROR HANDLING ⭐⭐⭐⭐⭐

A good API doesn't just say:

```json
{
    "error": "something went wrong"
}
```

It should provide a **consistent error contract**.

For example:

```json
{
    "error": {
        "code": "USER_NOT_FOUND",
        "message": "User not found",
        "details": []
    }
}
```

---

# Error Handling Architecture

```text
                 Application
                      │
                exception occurs
                      │
                      ↓
              Exception Handler
                      │
             ┌────────┴────────┐
             ↓                 ↓
       Expected error     Unexpected error
             │                 │
             ↓                 ↓
       Structured 4xx      Log + 500
             │                 │
             └────────┬────────┘
                      ↓
                 JSON Response
```

---

# Domain Exceptions

Instead of putting HTTP logic everywhere:

```python
raise HTTPException(
    status_code=404,
    detail="User not found"
)
```

you can have:

```python
class UserNotFoundError(Exception):
    pass
```

Service:

```python
def get_user(user_id):
    user = repository.get(user_id)

    if user is None:
        raise UserNotFoundError()

    return user
```

Then your API boundary translates it:

```text
UserNotFoundError
       ↓
Exception Handler
       ↓
HTTP 404
```

This gives better separation:

```text
Business logic
      ≠
HTTP transport logic
```

---

# Validation Errors

Suppose API expects:

```json
{
    "email": "invalid"
}
```

Pydantic/FastAPI can validate it.

Conceptually:

```text
Request
  ↓
Pydantic validation
  ↓
Invalid
  ↓
4xx validation response
```

---

# Never Leak Internal Errors

Bad:

```json
{
    "error": "psycopg2.errors.UniqueViolation: relation users..."
}
```

This may expose:

* database details
* SQL structure
* internal implementation
* sensitive information

Better:

```json
{
    "error": {
        "code": "EMAIL_ALREADY_EXISTS",
        "message": "Email is already registered"
    }
}
```

Log the technical details internally.

---

# Logging vs Response

This distinction is very important.

Client:

```json
{
    "error": {
        "code": "DATABASE_ERROR",
        "message": "Unable to process request"
    }
}
```

Server logs:

```text
ERROR Database failure
user_id=123
request_id=abc-xyz
exception=...
stack_trace=...
```

So:

```text
Client
 ↓
Safe / useful information


Server logs
 ↓
Technical debugging information
```

---

# 🔥 API Error Categories

A useful mental model:

```text
4xx
 ↓
Client/request/problem
 ↓
Usually don't retry blindly


5xx
 ↓
Server/upstream problem
 ↓
May be retryable depending on error
```

But don't assume every 5xx is automatically safe to retry. Retry behavior depends on idempotency and the operation.

---

# 🔥 PUT vs PATCH

Very common interview question.

### PUT

```text
Replace resource
```

Example:

```json
{
    "name": "Sayanta",
    "email": "x@example.com",
    "city": "Delhi"
}
```

### PATCH

```text
Modify selected fields
```

```json
{
    "city": "Kolkata"
}
```

Think:

```text
PUT
 ↓
"What should the resource look like?"


PATCH
 ↓
"What should change?"
```

---

# 🔥 Authentication Flow in FastAPI

A realistic backend might look like:

```text
                 HTTP REQUEST
                      │
                      ↓
               Authentication
                      │
                JWT/API Key
                      │
                      ↓
                 Current User
                      │
                      ↓
               Authorization
                      │
                 Role/Scopes
                      │
                ┌─────┴─────┐
                ↓           ↓
             Allowed      Denied
                │           │
                ↓           ↓
             Service       403
                │
                ↓
            Repository
                │
                ↓
             Database
```

---

# 🧠 Complete API Request Lifecycle

This is the mental model I want you to remember.

```text
                         CLIENT
                            │
                            │ HTTP
                            ↓
                    ┌──────────────┐
                    │   API Gateway│
                    │ / Load Bal.  │
                    └──────┬───────┘
                           │
                           ↓
                    RATE LIMITING
                           │
                           ↓
                     FASTAPI ROUTER
                           │
                           ↓
                      VALIDATION
                           │
                           ↓
                   AUTHENTICATION
                           │
                           ↓
                    AUTHORIZATION
                           │
                           ↓
                      SERVICE
                           │
                           ↓
                    REPOSITORY
                           │
                           ↓
                       DATABASE
                           │
                           ↓
                    SERVICE RESULT
                           │
                           ↓
                   RESPONSE MODEL
                           │
                           ↓
                    STATUS + JSON
                           │
                           ↓
                        CLIENT
```

Errors can enter at almost any stage:

```text
Rate limit → 429
Validation → 4xx
Authentication → 401
Authorization → 403
Not found → 404
Conflict → 409
Server failure → 500
Upstream failure → 502/503/504
```

---

# 🚨 SENIOR-LEVEL API DESIGN

When designing an API, think about:

```text
1. Resource naming
2. HTTP methods
3. Status codes
4. Authentication
5. Authorization
6. Validation
7. Pagination
8. Rate limiting
9. Error contract
10. Idempotency
11. Versioning
12. Caching
13. Observability
14. Security
15. Backward compatibility
```

---

# API Versioning

You may see:

```text
/api/v1/users
/api/v2/users
```

or versioning through headers/media types.

Why?

Because changing an API contract can break existing clients.

Think:

```text
Old Clients
    ↓
v1


New Clients
    ↓
v2
```

Don't introduce a new version for every tiny change; prefer backward-compatible evolution where practical.

---

# Idempotency Keys ⭐⭐⭐⭐⭐

Extremely important for payment/order APIs.

Imagine:

```text
POST /payments
```

Client sends request.

Network fails.

Client doesn't know whether payment succeeded.

It retries.

Without protection:

```text
Request 1 → ₹100 charged
Request 2 → ₹100 charged again
```

Bad.

Use an idempotency key:

```http
Idempotency-Key: abc123
```

Server stores the result associated with that key.

```text
Request
   │
   ↓
Idempotency Key
   │
   ↓
Already processed?
 ┌─┴───────────────┐
YES               NO
 │                 │
 ↓                 ↓
return stored    process
result            │
                  ↓
               store result
```

This is a **very strong senior backend interview topic**.

---

# 🔥 API Security Checklist

For production APIs:

```text
HTTPS
 ↓
Authentication
 ↓
Authorization
 ↓
Input validation
 ↓
Rate limiting
 ↓
Secure token handling
 ↓
Least privilege
 ↓
Safe error responses
 ↓
Logging / monitoring
 ↓
Audit where required
```

And never:

```text
❌ log passwords
❌ log raw access/refresh tokens
❌ return stack traces to clients
❌ trust client-provided roles
❌ put secrets in JWT payloads
❌ use authentication as authorization
```

---

# 🧠 DAY 4 — PATTERN RECOGNITION

When someone asks:

### "How should I fetch users?"

```text
GET /users
```

### "Create user?"

```text
POST /users
```

### "Change one field?"

```text
PATCH /users/{id}
```

### "Replace resource?"

```text
PUT /users/{id}
```

### "Delete?"

```text
DELETE /users/{id}
```

---

### "Who are you?"

```text
Authentication
```

### "Are you allowed?"

```text
Authorization
```

### "Token format?"

```text
JWT
```

### "Delegated access?"

```text
OAuth 2.0
```

### "Large dataset?"

```text
Pagination
```

### "Millions of rows?"

```text
Cursor/keyset pagination
```

### "Too many requests?"

```text
Rate limiting
→ 429
```

### "Something went wrong?"

```text
Structured error response
```

---

# 🏆 DAY 4 CHEAT SHEET

| Topic             | Key idea                           |
| ----------------- | ---------------------------------- |
| REST              | Resources + HTTP semantics         |
| GET               | Retrieve                           |
| POST              | Create/trigger operation           |
| PUT               | Replace                            |
| PATCH             | Partial modification               |
| DELETE            | Delete                             |
| 200               | Success                            |
| 201               | Created                            |
| 204               | Success, no body                   |
| 400               | Bad request                        |
| 401               | Authentication required/failed     |
| 403               | Not allowed                        |
| 404               | Not found                          |
| 409               | Conflict                           |
| 422               | Validation/semantic request error  |
| 429               | Rate limited                       |
| 500               | Internal server error              |
| 502               | Bad gateway                        |
| 503               | Service unavailable                |
| Authentication    | Who are you?                       |
| Authorization     | What can you do?                   |
| JWT               | Signed token format                |
| OAuth 2.0         | Authorization/delegation framework |
| Pagination        | Limit returned dataset             |
| Cursor            | Efficient large-data pagination    |
| Rate Limiting     | Control request frequency          |
| Exception Handler | Consistent API errors              |
| Idempotency       | Safe retry behavior                |

---

# 🎯 DAY 4 — QUESTIONS YOU SHOULD MASTER

For a **senior FastAPI/backend interview**, be ready for:

1. What makes an API RESTful?
2. GET vs POST?
3. PUT vs PATCH?
4. What is idempotency?
5. Why is POST generally non-idempotent?
6. 401 vs 403?
7. 400 vs 422?
8. When would you return 201 vs 200?
9. When would you return 204?
10. Authentication vs authorization?
11. How does JWT work?
12. Is JWT encrypted?
13. JWT vs OAuth?
14. Access token vs refresh token?
15. How do you revoke JWTs?
16. Offset vs cursor pagination?
17. Why is offset pagination problematic at scale?
18. How would you implement rate limiting?
19. How would rate limiting work across multiple API servers?
20. What should a good API error response contain?
21. How do you prevent sensitive information leaking through errors?
22. Where should exception translation happen?
23. What is an idempotency key?
24. How would you design a payment API safely?
25. How would you version an API?

---

# 🚀 THE MASTER CONNECTION

This is the architecture you should eventually be able to explain in an interview:

```text
                         CLIENT
                            │
                         HTTPS
                            │
                            ↓
                     ┌────────────┐
                     │ API Gateway│
                     └─────┬──────┘
                           │
                    Rate Limiting
                           │
                           ↓
                     ┌───────────┐
                     │  FastAPI  │
                     └─────┬─────┘
                           │
                    ┌──────┴──────┐
                    ↓             ↓
              Authentication   Validation
                    │             │
                    └──────┬──────┘
                           ↓
                    Authorization
                           │
                           ↓
                       ROUTER
                           │
                           ↓
                       SERVICE
                           │
                   Dependency Injection
                           │
                           ↓
                     REPOSITORY
                           │
                           ↓
                       DATABASE
                           │
                           ↓
                      RESPONSE
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
          Status Code    Headers       JSON
              │
              ↓
            CLIENT
```

And surrounding the entire system:

```text
       ┌──────────────────────────────────────┐
       │ Logging │ Metrics │ Tracing │ Errors │
       └──────────────────────────────────────┘
```

### 🔥 The senior-level mental model

> **A good API isn't just an endpoint that returns JSON. It's a contract between clients and servers.**

That contract defines:

```text
WHO     → Authentication
CAN DO  → Authorization
WHAT    → Resource + HTTP method
INPUT   → Validation
RESULT  → Status code + response schema
SCALE   → Pagination + rate limiting
FAILURE → Consistent error contract
RETRY   → Idempotency
SECURITY→ HTTPS + token/security controls
```

If you can reason through an API using that model, you're moving from **"I know FastAPI"** toward **"I can design backend systems."**
