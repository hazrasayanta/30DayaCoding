# **RAG Interview Preparation – Questions & Answers**

Here are **35 interview questions with answers**, organised around the five important concepts from your RAG implementation. The answers are written in a natural, interview-friendly way, with practical examples and senior-level follow-up points.

# **1. Retriever – Vector Search, Top-K, Similarity and Metadata Filters**

### **Q1. What is a retriever in RAG?**

**Answer:**

A retriever is a component responsible for finding relevant document chunks from a knowledge base based on a user's query.

In RAG, documents are converted into embeddings and stored in a vector database. When a user asks a question, the query is also converted into an embedding. The retriever searches for similar vectors and returns the most relevant document chunks.

In our implementation:

```
retriever = vector_stores[0].as_retriever()
```

LangChain converts the vector store into a retriever interface.

### **Q2. What is vector search?**

**Answer:**

Vector search is a search technique that finds information based on semantic similarity rather than exact keyword matching.

For example:

- Query: "How much money did the company make?"
- Document: "The company's annual revenue was ₹500 crore."

A keyword search might not find a strong match because the words are different. Vector search can identify that both sentences have similar meanings.

The process is:

1. Convert the query into an embedding.
2. Compare it with stored document embeddings.
3. Calculate similarity or distance.
4. Return the closest document vectors.

### **Q3. What is Top-K retrieval?**

**Answer:**

Top-K retrieval means returning the K most relevant document chunks for a given query.

For example, if K = 5, the retriever returns the five most relevant chunks.

Example:

```
retriever = vector_store.as_retriever(    search_kwargs={"k": 5})
```

**Why is it important?**

- Small K may miss important information.
- Large K may introduce irrelevant context.
- Large K also increases token consumption and LLM cost.

I would tune K based on retrieval evaluation rather than choosing an arbitrary value.

### **Q4. What is cosine similarity?**

**Answer:**

Cosine similarity measures the similarity between two vectors by calculating the cosine of the angle between them.

Formula:

\\[ \text{Cosine Similarity} = \frac{A \cdot B}{\\|A\\|\\|B\\|} \\]

Interpretation:

| Value       | Meaning                  |
| ----------- | ------------------------ |
| Close to 1  | Similar direction        |
| Close to 0  | Approximately orthogonal |
| Close to -1 | Opposite direction       |

For example, embeddings of "car" and "automobile" may have high cosine similarity because they have similar semantic meanings.

The actual similarity score depends on the embedding model and should be evaluated rather than treated as a universal relevance threshold.

### **Q5. What is the difference between vector search and keyword search?**

**Answer:**

Keyword search looks for matching words, whereas vector search looks for semantic similarity.

| Keyword search                          | Vector search                       |
| --------------------------------------- | ----------------------------------- |
| Matches exact terms                     | Matches meaning                     |
| Often based on BM25 or inverted indexes | Uses embeddings                     |
| Good for IDs and exact phrases          | Good for natural-language questions |
| May miss synonyms                       | Can identify related concepts       |

In production, I prefer hybrid search because it combines the advantages of both approaches.

### **Q6. What are metadata filters in vector search?**

**Answer:**

Metadata filters restrict retrieval based on document attributes.

For example, each vector can contain metadata:

```
{    "company_id": "company_101",    "knowledge_base_id": 10,    "document_id": 500,    "page_number": 5}
```

We can filter retrieval to search only within a particular knowledge base or company.

Example:

```
retriever = vector_store.as_retriever(    search_kwargs={        "k": 5,        "filter": {            "knowledge_base_id": 10        }    })
```

The exact filter syntax depends on the vector-store integration.

**Senior-level point:** Metadata filters are also important for security. A user should never retrieve documents belonging to another company.

### **Q7. What is the difference between a vector store and a retriever?**

**Answer:**

A vector store is responsible for storing and searching embeddings. A retriever provides a standardized interface for retrieving relevant documents.

Think of it this way:

- Vector store = storage and search engine.
- Retriever = retrieval interface used by the application.

In our implementation, `as_retriever()` converts the vector store into a retriever.

### **Q8. What is reranking in RAG?**

**Answer:**

Reranking is a second-stage ranking process that improves the relevance of initially retrieved documents.

The typical flow is:

1. Vector search retrieves 20 candidate chunks.
2. A reranker evaluates the query against those chunks.
3. It ranks the candidates by relevance.
4. The top 5 chunks are passed to the LLM.

Vector search is generally efficient at finding candidates, while reranking can provide more precise relevance ordering.

# **2. History-Aware Retrieval – Query Rewriting and Chat History**

### **Q9. What is history-aware retrieval?**

**Answer:**

History-aware retrieval uses previous conversation messages to understand the context of the latest user question.

For example:

User: "What is Apple's revenue?"

Assistant: "Apple's revenue is..."

User: "What about its profit?"

The latest question does not mention Apple, but the previous conversation provides that context.

History-aware retrieval rewrites the latest question into a standalone question:

"What is Apple's profit?"

In our implementation, we use:

```
history_aware_retriever = create_history_aware_retriever(    llm,    retriever,    contextualize_q_prompt)
```

### **Q10. Why do we need query rewriting?**

**Answer:**

Vector search works better when it receives a meaningful, self-contained query.

Follow-up questions often contain references such as:

- It
- They
- That company
- What about the previous year?
- Compare it with the previous one.

Query rewriting resolves these references using chat history.

For example:

Original query: "What about 2024?"

Rewritten query: "What was Tesla's revenue in 2024?"

This helps the retriever find more relevant documents.

### **Q11. How does&#x20;**`create_history_aware_retriever()`**&#x20;work?**

**Answer:**

It connects three components:

1. LLM.
2. Retriever.
3. Contextualization prompt.

The execution logic is:

- If chat history exists, the LLM uses the history and latest query to create a standalone question.
- The standalone question is passed to the retriever.
- If chat history is empty, the original question goes directly to the retriever.

It does not generate the final answer. Its responsibility is to improve the retrieval query.

### **Q12. How do you convert chat history into LangChain messages?**

**Answer:**

In our implementation, we convert previous messages into LangChain's `HumanMessage` and `AIMessage` objects.

```
chat_history = []for message in messages["messages"]:    if message["role"] == "user":        chat_history.append(            HumanMessage(content=message["content"])        )    elif message["role"] == "assistant":        chat_history.append(            AIMessage(content=message["content"])        )
```

These messages are passed to the RAG chain:

```
rag_chain.astream({    "input": query,    "chat_history": chat_history})
```

This allows the chain to understand the conversation context.

### **Q13. What happens if the conversation history becomes very large?**

**Answer:**

A large conversation history increases token consumption, latency and LLM costs. It can also exceed the model's context window.

I would handle this using:

- Recent message windows.
- Conversation summarization.
- Token-based history limits.
- Relevant-history retrieval.

For example, instead of passing 100 messages, we could pass a summary of older conversations and the latest 10 messages.

### **Q14. Does history-aware retrieval always improve retrieval accuracy?**

**Answer:**

No. Query rewriting can sometimes remove important information or introduce incorrect assumptions.

For example, the LLM might incorrectly associate "its profit" with a different company mentioned earlier.

To improve reliability, I would:

- Preserve important entities and dates.
- Evaluate rewritten queries.
- Compare retrieval quality with and without rewriting.
- Keep the original query available for debugging.

### **Q15. What is the difference between chat memory and history-aware retrieval?**

**Answer:**

Chat history stores or provides previous conversation context.

History-aware retrieval uses that context to improve the search query.

In simple terms:

- Chat history = remembers what was discussed.
- History-aware retrieval = uses that information to search more accurately.

# **3. Stuff Documents Chain – Context Construction and Token Limitations**

### **Q16. What is Stuff Documents Chain?**

**Answer:**

Stuff Documents Chain combines multiple retrieved document chunks into one context and passes that context to the LLM.

In our implementation:

```
question_answer_chain = create_stuff_documents_chain(    llm,    qa_prompt,    document_variable_name="context",    document_prompt=document_prompt)
```

It receives retrieved documents, formats their contents, combines them and inserts the result into the `{context}` variable in the prompt.

### **Q17. Why is it called Stuff Documents Chain?**

**Answer:**

It is called Stuff because it stuffs all retrieved documents into one prompt.

For example, suppose retrieval returns five chunks. The chain combines their contents and sends them together to the LLM.

It is simple and effective when the retrieved context is relatively small.

### **Q18. What is the role of&#x20;**`document_prompt`**?**

**Answer:**

The document prompt defines how each retrieved document is formatted before being combined.

In our implementation:

```
document_prompt = PromptTemplate.from_template(    "\n\n- {page_content}\n\n")
```

This formats each document's content as a bullet-style text block.

For better source attribution, I would also include metadata such as filename, page number and document ID.

### **Q19. What is the difference between&#x20;**`document_prompt`**&#x20;and&#x20;**`qa_prompt`**?**

**Answer:**

They serve different purposes.

- `document_prompt` formats individual retrieved documents.
- `qa_prompt` defines the instructions and conversation structure sent to the LLM.

For example:

Document prompt:

```
Source: annual_report.pdf
Page: 10
Content: Revenue increased by 15%.
```

QA prompt:

```
Answer the user's question using the supplied context.
If information is missing, say so.
```

### **Q20. What is a context window?**

**Answer:**

A context window is the maximum amount of tokens a language model can process in a single interaction.

It includes:

- System prompt.
- User question.
- Conversation history.
- Retrieved document chunks.
- Other prompt instructions.

If the combined context exceeds the model's limit, the request may fail or require truncation.

### **Q21. What happens when too many documents are passed to Stuff Documents Chain?**

**Answer:**

Passing too many documents can cause:

- Context-window overflow.
- Increased token consumption.
- Higher API costs.
- Increased response latency.
- More irrelevant information reaching the LLM.

I would solve this by using Top-K tuning, reranking, context compression and token-budget management.

### **Q22. What are the alternatives to Stuff Documents Chain?**

**Answer:**

There are several approaches:

| Approach          | Explanation                                                 |
| ----------------- | ----------------------------------------------------------- |
| Stuff             | Combines all documents into one prompt                      |
| Map Reduce        | Processes documents individually and combines their outputs |
| Refine            | Iteratively updates an answer using additional documents    |
| Reranking + Stuff | Selects the best documents before combining them            |

I would choose the approach based on the number of retrieved chunks, context-window constraints, latency and cost.

### **Q23. How do you prevent hallucinations in a Stuff Documents Chain?**

**Answer:**

I would use a strong system prompt instructing the LLM to answer only from the supplied context.

For example:

```
Answer only using the provided context.

If the answer is not available,
clearly state that the information is missing.

Do not invent facts.
```

I would also include source metadata, validate citations and evaluate answer faithfulness.

A prompt alone cannot guarantee that hallucinations will never happen.

# **4. RAG Chain – Complete Architecture**

### **Q24. What is a RAG chain?**

**Answer:**

A RAG chain connects document retrieval and LLM answer generation.

It follows this process:

1. Receive the user's question.
2. Use conversation history to contextualize the question.
3. Retrieve relevant document chunks.
4. Combine the retrieved context.
5. Pass the context and question to the LLM.
6. Generate the final answer.

In our implementation:

```
rag_chain = create_retrieval_chain(    history_aware_retriever,    question_answer_chain)
```

This connects the history-aware retriever with the question-answering document chain.

### **Q25. Explain the complete RAG architecture in your project.**

**Answer:**

"Our application has two major workflows: document ingestion and query-time generation.

During ingestion, users upload documents through FastAPI. We store the original documents in Google Cloud Storage, extract their content using LangChain document loaders, split the content into chunks, generate embeddings and store the vectors in MongoDB.

During query time, we receive the user's question and conversation history. We initialize the embedding model and vector store, create a retriever and use a history-aware retriever to contextualize follow-up questions.

The retrieved documents are passed to the Stuff Documents Chain, which combines the document context and sends it to the LLM. Finally, we stream the generated response back to the frontend and save the assistant response in SQL."

### **Q26. What is the difference between RAG and fine-tuning?**

**Answer:**

RAG retrieves external knowledge at query time, whereas fine-tuning modifies a model's learned parameters through additional training.

| RAG                                            | Fine-tuning                                                     |
| ---------------------------------------------- | --------------------------------------------------------------- |
| Retrieves external documents                   | Trains model parameters                                         |
| Knowledge can be updated by updating the index | Knowledge changes require further training or another mechanism |
| Provides source context                        | Does not inherently provide source citations                    |
| Useful for private and changing information    | Useful for adapting model behaviour and task patterns           |

For enterprise knowledge-base applications, RAG is often a practical choice because documents can be updated without retraining the model.

### **Q27. What happens if the retriever returns no relevant documents?**

**Answer:**

The application should avoid generating an answer based on unsupported assumptions.

I would:

1. Check whether retrieval returned any results.
2. Apply a relevance threshold if supported.
3. Return a message that the information is unavailable.
4. Optionally ask the user to clarify the question.

Our current QA prompt instructs the model to say when information is missing, but explicit relevance validation would make the system more reliable.

### **Q28. How would you support multiple knowledge bases in a single RAG request?**

**Answer:**

There are two common approaches.

**Approach 1: Shared vector collection**

Use one collection with metadata filters for the selected knowledge-base IDs.

**Approach 2: Multiple retrievers**

Create separate retrievers for each knowledge base, execute searches and merge the results. Then deduplicate and rerank the combined results.

In our current code, we create multiple vector-store objects but use only:

```
retriever = vector_stores[0].as_retriever()
```

So the implementation does not actually retrieve from all selected knowledge bases. I would fix that before claiming multi-KB retrieval is fully supported.

### **Q29. How would you prevent cross-tenant data leakage?**

**Answer:**

I would implement tenant isolation at multiple levels:

- Validate user access to selected knowledge bases.
- Derive tenant identity from authenticated server-side context.
- Apply mandatory tenant metadata filters during retrieval.
- Validate ownership of retrieved documents.
- Restrict GCS access through appropriate permissions.
- Add automated tests for cross-tenant access.

I would never rely on the frontend to supply a trustworthy tenant ID.

### **Q30. How would you evaluate RAG quality?**

**Answer:**

I would evaluate retrieval and generation separately.

**Retrieval metrics:**

- Precision\@K
- Recall\@K
- Mean Reciprocal Rank (MRR)
- NDCG

**Answer-generation metrics:**

- Faithfulness.
- Answer relevance.
- Context relevance.
- Citation correctness.

I would also maintain a test dataset of representative questions and expected source documents.

# **5. Streaming – Async Generators, astream() and Frontend Delivery**

### **Q31. What is streaming in an LLM application?**

**Answer:**

Streaming means delivering the LLM response incrementally instead of waiting for the complete response.

For example, instead of waiting three seconds for a complete answer, the frontend starts displaying generated text as soon as the first chunks arrive.

It improves perceived responsiveness.

### **Q32. What is an async generator in Python?**

**Answer:**

An async generator is a function that uses `async def` and `yield` to produce values incrementally.

Example:

```
async def generate_numbers():    for number in range(3):        yield number
```

We consume it using:

```
async for number in generate_numbers():    print(number)
```

Unlike a normal function that returns one final result, an async generator can produce multiple values over time.

### **Q33. What is the difference between&#x20;**`return`**&#x20;and&#x20;**`yield`**?**

**Answer:**

`return` terminates the function and returns a final result.

`yield` produces a value while preserving the generator's execution state so it can continue later.

| return                   | yield                       |
| ------------------------ | --------------------------- |
| Returns a final value    | Produces incremental values |
| Function execution ends  | Generator can resume        |
| Used in normal functions | Used in generators          |

### **Q34. What is the difference between&#x20;**`invoke()`**&#x20;and&#x20;**`astream()`**&#x20;in LangChain?**

**Answer:**

`invoke()` executes a chain and returns its result.

`astream()` executes a chain asynchronously and yields intermediate outputs as they become available.

Example:

```
# Complete resultresult = rag_chain.invoke({    "input": query,    "chat_history": chat_history})
```

Streaming:

```
async for chunk in rag_chain.astream({    "input": query,    "chat_history": chat_history}):    print(chunk)
```

`astream()` is useful when the frontend needs incremental output.

One important detail: `astream()` does not automatically guarantee that every internal component streams token-by-token. Streaming behaviour depends on the chain and model implementation.

### **Q35. How does streaming work in your implementation?**

**Answer:**

"In our implementation, `generate_response()` is an asynchronous generator.

We call `rag_chain.astream()` and iterate over the returned chunks using `async for`.

When a chunk contains retrieved context, we serialize the document content and metadata, encode it using Base64 and yield a context event.

When a chunk contains answer content, we append it to the full response and yield the answer fragment to the frontend.

Once generation is complete, we save the accumulated response in the assistant message record in SQL."

### **Q36. Why do you use Base64 encoding in streaming?**

**Answer:**

We use Base64 to encode serialized context data before placing it inside our custom streaming event format.

The process is:

1. Convert document content and metadata into JSON.
2. Convert JSON into bytes.
3. Encode bytes using Base64.
4. Send the encoded string to the frontend.

Base64 is useful for representation and transport compatibility, but it is not encryption or security.

### **Q37. What happens if the frontend disconnects during streaming?**

**Answer:**

I would handle client disconnection and cancellation explicitly.

The application should:

- Stop unnecessary LLM generation where possible.
- Cancel outstanding retrieval or generation tasks.
- Release resources.
- Decide whether to persist the partial response.
- Record the message status as cancelled or interrupted.

This is an important production consideration because continuing generation after a client disconnect can waste API costs.

### **Q38. How would you improve streaming architecture for production?**

**Answer:**

I would improve it in several ways:

1. Use a clearly defined SSE or WebSocket protocol.
2. Separate context events, answer events, errors and completion events.
3. Handle client disconnects and cancellation.
4. Add heartbeat events where appropriate.
5. Track time-to-first-token and total response time.
6. Persist partial responses safely.
7. Avoid exposing internal exception details to users.

# **6. Quick Revision – Important LangChain Functions**

| Function                           | Purpose                                     |
| ---------------------------------- | ------------------------------------------- |
| `as_retriever()`                   | Converts vector store into a retriever      |
| `invoke()`                         | Executes synchronously and returns a result |
| `create_history_aware_retriever()` | Uses chat history to contextualize queries  |
| `ChatPromptTemplate`               | Creates structured chat prompts             |
| `MessagesPlaceholder`              | Inserts conversation messages into prompts  |
| `create_stuff_documents_chain()`   | Combines retrieved documents into context   |
| `create_retrieval_chain()`         | Connects retrieval and answer generation    |
| `astream()`                        | Asynchronously streams chain outputs        |

# **7. Final senior-level interview checklist**

**Revision progress**

# **0/14**

Explain vector search and embedding similarity.

Explain Top-K and how you choose K.

Explain metadata filtering and tenant isolation.

Explain history-aware query rewriting.

Explain how chat history is converted into LangChain messages.

Explain Stuff Documents Chain and context windows.

Compare Stuff, Map Reduce and Refine.

Draw the complete RAG architecture.

Explain multiple knowledge-base retrieval.

Explain invoke() versus astream().

Explain async generators and yield.

Explain how context and answer chunks reach the frontend.

Explain client disconnection and cancellation.

Explain RAG evaluation metrics.

Reset revision checklist

**My recommendation:** Focus particularly on Q6, Q9, Q16, Q21, Q25, Q28, Q29, Q34 and Q37. These questions test whether you understand not just LangChain APIs, but also retrieval quality, architecture, security, scalability and production reliability.