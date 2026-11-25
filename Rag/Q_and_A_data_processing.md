Let's prepare these questions **one by one, in depth**, as if you're preparing for a Senior Backend / AI Engineer interview.


## Architecture

1. Explain the complete document ingestion architecture.
2. Why do we use GCS?
3. Why do we use LangChain?
4. What is the role of EmbeddingsFactory?
5. What is the role of VectorStoreFactory?
6. Why separate SQL and vector databases?

For every question, we'll cover:

1. **Interview-ready answer** – how to explain it confidently.
2. **Architecture breakdown** – how each component works.
3. **Technical deep dive** – implementation details and reasoning.
4. **Code references** – how it relates to your actual implementation.
5. **Follow-up interview questions** – what the interviewer might ask next.
6. **Practical scenarios** – how to answer real-world questions.

# **Question 1: Explain the complete document ingestion architecture.**

## **1. Interview-ready answer**

"In our application, we have built a document ingestion pipeline that takes documents uploaded by users, extracts their content, converts the content into smaller chunks, generates embeddings, and stores those embeddings in a vector database so that the documents can later be used for semantic search and RAG-based question answering.

The architecture consists of several stages:

1. **Document upload:** The user uploads a PDF, DOCX, Markdown, or TXT file through our FastAPI backend.
2. **Cloud storage:** We calculate the file's SHA-256 hash, sanitize its filename, and upload the original file to Google Cloud Storage.
3. **Document extraction:** We download the document from GCS and use the appropriate LangChain document loader to extract its content.
4. **Text chunking:** We use `RecursiveCharacterTextSplitter` to divide the extracted content into smaller chunks, with a configurable chunk size and overlap.
5. **Embedding generation:** We pass the chunks to our embedding model through `EmbeddingsFactory`.
6. **Vector storage:** We use `VectorStoreFactory` to initialize the configured vector database and store the chunk content along with its embeddings and metadata.
7. **Duplicate detection:** We calculate SHA-256 hashes for individual chunks and compare them with existing records to avoid unnecessary reprocessing.
8. **Metadata and processing tracking:** We maintain document, chunk, and processing information in the database.

This architecture separates original document storage, document processing, embedding generation, and vector search. It makes the ingestion pipeline easier to maintain and allows us to process documents incrementally."

This explanation is grounded in the uploaded implementation.&#x20;

Pasted text(20261125-081813).txt



## **2. Understand the complete architecture**

## **Document ingestion pipeline**

**User uploads document**

PDF · DOCX · TXT · Markdown

**FastAPI Upload API**

Read file · Sanitize filename · Calculate SHA-256

**Google Cloud Storage**

Stores original document

**Document extraction — LangChain**

PDF / DOCX / Markdown / TXT loaders

**Text chunking**

RecursiveCharacterTextSplitter · Size 1000 · Overlap 200

**SHA-256 chunk comparison**

Identify existing, new, and removed chunks

**EmbeddingsFactory**

Converts text into numerical vectors

**VectorStoreFactory**

Stores vectors and searchable documents

**Persisted knowledge base**

Document chunks · Embeddings · Metadata · Processing records

*Important:* The diagram represents the logical pipeline. Your uploaded source contains two processing implementations, and their exact storage behavior differs. We'll discuss that distinction below.

## **3. Technical deep dive — stage by stage**

### **Stage 1: Document upload**

Your implementation:

```
async def upload_document(file: UploadFile, kb_id: int):    content = await file.read()    file_size = len(content)    file_hash = hashlib.sha256(content).hexdigest()    file_name = "".join(        c for c in file.filename        if c.isalnum() or c in ('-', '_', '.')    ).strip()    object_path = f"kb_{kb_id}/{file_name}"
```

What happens here?

- FastAPI receives the uploaded file.
- The file is read into memory.
- Its size is calculated.
- A SHA-256 hash is generated for file-level identification.
- The filename is sanitized.
- A knowledge-base-specific GCS object path is created.

For example:

```
Original file: annual_report.pdf
Knowledge Base ID: 101

GCS object path:
kb_101/annual_report.pdf
```

**Why calculate a file hash?**

A hash provides a fingerprint of the file content. If the file content changes, its SHA-256 hash will normally change too.

This can help identify duplicate uploads or detect changed documents.

Note that the shown upload function calculates and returns the hash; it does not itself implement a duplicate-upload rejection check.

### **Stage 2: Store the original document in GCS**

Your implementation uploads the original file:

```
gcs_client.bucket(bucket_name) \    .blob(object_path) \    .upload_from_file(        BytesIO(content),        content_type=content_type    )
```

We store the original document separately from the vector representation.

Why?

Because the vector database is not intended to be our primary file storage system. We need the original document for:

- Reprocessing when chunking logic changes.
- Recreating embeddings if the embedding model changes.
- Allowing users to access or download the original file.
- Maintaining a source of truth for the document.

We'll go deeper into GCS in Question 2.

### **Stage 3: Extract document content**

Your code chooses a loader based on the file extension:

```
if ext == ".pdf":    loader = PyPDFLoader(temp_path)elif ext == ".docx":    loader = Docx2txtLoader(temp_path)elif ext == ".md":    loader = UnstructuredMarkdownLoader(temp_path)else:    loader = TextLoader(temp_path)documents = loader.load()
```

Each loader converts a different file format into LangChain `Document` objects.

A LangChain document generally contains:

```
Document(    page_content="Extracted document text...",    metadata={        "source": "annual_report.pdf",        "page": 1    })
```

The important distinction:

- `page_content` contains the extracted text.
- `metadata` contains information about its origin and context.

For a PDF, metadata can include page information, which is useful when tracing search results back to the original document.

### **Stage 4: Split content into chunks**

Your implementation:

```
text_splitter = RecursiveCharacterTextSplitter(    chunk_size=chunk_size,    chunk_overlap=chunk_overlap)chunks = text_splitter.split_documents(documents)
```

Your defaults are:

```
chunk_size = 1000chunk_overlap = 200
```

Why do we chunk?

Imagine a 100-page annual report. Sending the entire report to an embedding model or LLM is inefficient and can exceed context limits.

Instead, we divide it into smaller, searchable sections.

**Example: Chunking with overlap**

Illustrative example, not an exact character-level output.

**Chunk 1**

Characters 1–1000

200 characters shared

**Chunk 2**

Characters 801–1800

200 characters shared

**Chunk 3**

Characters 1601–2600

Overlap helps preserve context when a sentence or topic boundary falls near the end of a chunk.

### **Stage 5: Generate embeddings**

After chunking, we need to convert each chunk into a numerical representation.

Example:

```
"Company revenue increased by 20%."
```

Conceptually becomes:

```
[0.124, -0.542, 0.891, 0.231, ...]
```

This is called an embedding vector.

Semantically similar text should generally have vectors that are close to one another in the embedding space.

Your implementation initializes the embedding provider using:

```
embeddings = EmbeddingsFactory.create()
```

This keeps embedding initialization separate from document-processing logic.

We'll examine the factory in Question 4.

### **Stage 6: Store vectors**

Your implementation:

```
vector_store = VectorStoreFactory.create(    store_type=settings.VECTOR_STORE_TYPE,    collection_name=f"kb_{kb_id}",    embedding_function=embeddings,)
```

Then:

```
vector_store.add_documents(documents_to_update)
```

The vector store receives document content and metadata. The embedding integration generates vectors as part of the storage operation, depending on the configured implementation.

The stored records logically contain:

```
{    "id": "unique_chunk_id",    "content": "Company revenue increased by 20%.",    "embedding": [0.124, -0.542, 0.891, ...],    "metadata": {        "kb_id": 101,        "document_id": 501,        "file_name": "annual_report.pdf"    }}
```

This is a conceptual representation, not a literal record schema from your source.

### **Stage 7: Incremental processing**

This is an important feature in your implementation.

You calculate a hash for each chunk:

```
chunk_hash = hashlib.sha256(    (chunk.content + str(chunk.metadata)).encode()).hexdigest()
```

Then compare it with existing hashes:

```
if chunk_hash in existing_hashes:    continue
```

This means unchanged chunks can be skipped rather than embedded and stored again.

You also identify removed chunks:

```
chunks_to_delete = chunk_manager.get_deleted_chunks(    current_hashes,    file_name)
```

Then remove their records and vectors.

**Why is this useful?**

Imagine a 100-page document where a user changes only one section.

Without incremental processing, we might reprocess every chunk.

With incremental processing, unchanged chunks can be skipped and changed or removed chunks can be handled separately.

One implementation detail to remember: this hash-based flow is in `process_document()`. The separate `process_document_background()` function uses a different chunk-ID strategy and does not show the same `ChunkRecord` comparison flow.

Pasted text(20261125-081813).txt

## **4. Important: Your source has two processing paths**

This is something an interviewer may notice if they inspect your code.

| Feature                | `process_document()`                    | `process_document_background()` |
| ---------------------- | --------------------------------------- | ------------------------------- |
| Document extraction    | Via `preview_document()`                | Direct loader                   |
| Embeddings             | `EmbeddingsFactory`                     | `EmbeddingsFactory`             |
| Vector store           | Configured `settings.VECTOR_STORE_TYPE` | Hardcoded `"mongo"`             |
| Collection             | `kb_{kb_id}`                            | `kb_{CIN}`                      |
| Chunk tracking         | `ChunkRecord`                           | `DocumentChunk` SQL model       |
| Incremental comparison | Yes                                     | Not shown                       |
| Task status tracking   | Not shown in this function              | Yes                             |

The background path also creates a SQL `Document` record, saves `DocumentChunk` records, and adds chunks to the vector store. These are not identical implementations.&#x20;

Pasted text(20261125-081813).txt



If asked whether the architecture is fully unified, be honest:

"We have the same overall ingestion concept, but there are currently two processing paths with different storage conventions. I would consolidate them behind a shared processing service so that chunking, embedding configuration, metadata, and vector-store selection remain consistent."

## **5. Follow-up questions an interviewer may ask**

**Q: Why don't we store the entire document directly in the vector database?**

Because vector databases are optimized for similarity search, not as the primary store for original files. Chunk-level indexing allows more precise retrieval and keeps original document storage separate.

**Q: Why do we store metadata with every chunk?**

Metadata helps us identify the source document, knowledge base, page, and document ID. It also allows filtering search results by document or knowledge base.

**Q: What happens if the embedding generation fails?**

The ingestion operation should be marked as failed and retried safely. The background function in your source updates the processing task to `failed` and records the error message. Production-grade retries and recovery policies would need to be added separately.

**Q: What happens if the document changes?**

The `process_document()` path calculates chunk hashes, skips unchanged chunks, adds new chunks, and removes obsolete chunks.

**Q: Is the retrieval pipeline implemented in this file?**

No. This source covers ingestion and storage. It does not show the query-time retrieval, similarity search, context assembly, or LLM response generation.

## **6. A strong 60-second interview explanation**

Practise saying this naturally:

> "Our document ingestion architecture is a multi-stage pipeline built using FastAPI, Google Cloud Storage, LangChain, and a vector database.
>
> First, the user uploads a document through FastAPI. We calculate its SHA-256 hash, sanitize the filename, and store the original file in GCS.
>
> Next, we download the file and use the appropriate LangChain loader based on its format. We extract the text and split it into smaller chunks using RecursiveCharacterTextSplitter, with a default chunk size of 1000 and overlap of 200.
>
> Then we initialize our embedding provider through EmbeddingsFactory and our vector database through VectorStoreFactory. We convert the chunks into embeddings and store them with metadata.
>
> We also have a hash-based incremental processing mechanism to avoid reprocessing unchanged chunks.
>
> We keep the original files in GCS, structured document and processing information in SQL, and vector representations in the vector database. This separates storage responsibilities and supports semantic search and RAG."

## **7. Test yourself — interviewer-style question**

Before moving to Question 2, try answering this:

**Scenario**

A user uploads a 100-page PDF. Later, they update only two pages and upload the document again.

**How would your ingestion architecture process this updated document?**

Review my answer

**Next: Question 2 — Why do we use Google Cloud Storage (GCS)?**

We'll cover GCS vs local storage vs database vs vector database, scalability, durability, cost, security, and how to explain the design decision in an interview.


## RAG and AI

7. What is RAG?
8. What is an embedding?
9. What is cosine similarity?
10. Why do we need chunking?
11. What is chunk overlap?
12. What is semantic search?
13. How does vector retrieval work?
14. How do you improve retrieval accuracy?


# **RAG and AI — Interview Preparation (Questions 7–14)**

These eight questions are closely connected. Instead of memorising eight independent definitions, understand how they work together in a real RAG pipeline.

We'll cover each question with:

- Interview-ready answer
- Technical explanation
- Practical example
- Implementation perspective
- Follow-up questions

# **First, understand the complete RAG flow**

## **RAG architecture — end to end**

**User asks a question**

"What was the company's revenue in 2025?"

**Query embedding**

Convert question into a numerical vector

**Vector similarity search**

Find semantically relevant document chunks

**Retrieved context**

Top relevant chunks + metadata

**LLM + prompt**

Question + retrieved context + instructions

**Final answer**

Grounded response with source references

Remember: your uploaded Python file covers the ingestion side—loading, chunking, embedding integration, and vector storage. The query-time retrieval and LLM generation stages are the broader RAG architecture, not demonstrated in that file.

# **7. What is RAG?**

Very important interview question

## **Interview-ready answer**

"RAG stands for Retrieval-Augmented Generation. It is an architecture that combines information retrieval with Large Language Models.

Instead of asking an LLM to answer a question only using its pre-trained knowledge, we first retrieve relevant information from an external knowledge source, such as documents stored in a vector database.

We then pass the retrieved information along with the user's question to the LLM. The LLM uses that context to generate a more relevant and grounded answer.

RAG is particularly useful when we need to work with private company documents, frequently updated information, internal knowledge bases, or domain-specific data without retraining the LLM."

## **Why do we need RAG?**

Consider a company with 500 documents containing:

- Annual reports
- Financial statements
- Business strategies
- Employee policies
- Internal documentation

Now a user asks:

"What was our company's revenue in FY2025?"

A general-purpose LLM may not know this information.

We need a way to give the LLM access to our private documents.

That's where RAG comes in.

## **How RAG works**

There are two major phases.

**Phase 1: Indexing / ingestion**

**Original documents**

Extract text and split into chunks

Generate embeddings

Store vectors in vector database

**Phase 2: Retrieval and generation**

User question

Generate query embedding

Retrieve relevant chunks

Build prompt with retrieved context

LLM generates answer

## **RAG vs Fine-tuning**

| RAG                                            | Fine-tuning                                              |
| ---------------------------------------------- | -------------------------------------------------------- |
| Retrieves external information                 | Updates model behaviour through training                 |
| Knowledge can be updated by changing documents | Requires additional training to update learned behaviour |
| Can provide source references                  | Does not inherently provide source references            |
| Useful for private, changing knowledge         | Useful for adapting style, format, or task behaviour     |
| Does not require retraining the LLM            | Requires training on examples                            |

**Interview follow-up: Does RAG eliminate hallucinations?**

No. RAG can reduce hallucinations by providing relevant context, but it cannot guarantee factual answers. Retrieval can return irrelevant or incomplete information, and the LLM can still misinterpret its context.

# **8. What is an embedding?**

## **Interview-ready answer**

"An embedding is a numerical representation of text, images, or other data in a high-dimensional vector space.

In RAG systems, we use embedding models to convert document chunks and user queries into vectors. These vectors capture semantic information, meaning that text with similar meanings should generally have similar vector representations.

We store document embeddings in a vector database and use the embedding of the user's query to find semantically relevant documents."

## **Understand with an example**

Consider these three sentences:

1. "The company increased its revenue."
2. "The organisation reported higher sales."
3. "The weather is very cold today."

The first two sentences have different words but similar meanings.

An embedding model attempts to represent their semantic relationship.

**Illustrative semantic representation**

**Sentence A**

Company revenue increased

Similar meaning

**Sentence B**

Organisation sales grew

Similar meaning

**Sentence C**

The weather is cold today

Different meaning

Conceptual illustration, not actual model-generated coordinates.

An embedding could look like:

```
[    0.123,    -0.452,    0.891,    0.234,    -0.781,    ...]
```

This is a vector containing floating-point numbers.

The number of dimensions depends on the embedding model.

For example, an embedding model might generate 768-dimensional or 1536-dimensional vectors.

## **How does this fit into your implementation?**

Your code:

```
embeddings = EmbeddingsFactory.create()
```

Then:

```
vector_store = VectorStoreFactory.create(    store_type=settings.VECTOR_STORE_TYPE,    collection_name=f"kb_{kb_id}",    embedding_function=embeddings,)
```

The embedding integration is passed to the vector store. When documents are added, the integration can generate their embeddings.

At query time, the same compatible embedding model must also embed the user's question.

**Important interview point:** Document and query embeddings must use compatible embedding spaces. You generally cannot generate document vectors with one unrelated model and query vectors with another.

## **Follow-up questions**

**Q: Are embeddings the same as tokens?**

No.

- Tokens are units used by language models to process text.
- Embeddings are numerical vector representations of data.

**Q: Are embeddings generated by an LLM?**

Not necessarily. They are generated by an embedding model, which may be a separate model from the LLM used to generate answers.

**Q: Why are embeddings useful?**

They allow us to search by meaning rather than requiring exact keyword matches.

# **9. What is cosine similarity?**

Important mathematical concept

## **Interview-ready answer**

"Cosine similarity is a metric used to measure how similar two vectors are based on the angle between them.

In RAG systems, we use it to compare the embedding of a user's query with the embeddings of stored document chunks.

A higher cosine similarity generally indicates that the vectors point in a more similar direction, suggesting greater semantic similarity."

## **Formula**

\\[ \text{Cosine Similarity}(A,B)= \frac{A\cdot B}{\\|A\\|\\|B\\|} \\]

Where:

- \\(A \cdot B\\) = dot product of two vectors.
- \\(\\|A\\|\\) = magnitude of vector A.
- \\(\\|B\\|\\) = magnitude of vector B.

## **Understand the intuition**

[X](https://images.openai.com/static-rsc-4/LRZROMolyR79Om5txHScfM0djJuSeI0HZ1lRRE5pVOrK-NoZroyQZNs6YAfUVMERCR7spklOqtqcxeHbvlY6SlhF9V13y9OQhGgvnUL61NBd_2GbY00gR9d7v7bvx8N56I-C2kUOIz71_Tl8J4ohF4roxbitW0Qss00lDLuaDHI?purpose=inline)

[x.com](https://x.com/dan2642b81/status/2024226591405191512?utm_source=chatgpt.com)

For normalized, non-zero vectors, the typical interpretation is:

| Similarity | Interpretation     |
| ---------- | ------------------ |
| 1          | Same direction     |
| 0          | Perpendicular      |
| -1         | Opposite direction |

Actual similarity thresholds depend on the embedding model and dataset. Don't assume that 0.8 is always a good match.

## **Python example**

```
import numpy as npa = np.array([1, 2, 3])b = np.array([1, 2, 3])similarity = np.dot(a, b) / (    np.linalg.norm(a) * np.linalg.norm(b))print(similarity)
```

Output:

```
1.0
```

Both vectors point in the same direction.

## **Interview follow-up: Cosine similarity vs Euclidean distance**

| Cosine similarity               | Euclidean distance               |
| ------------------------------- | -------------------------------- |
| Measures directional similarity | Measures straight-line distance  |
| Higher is more similar          | Lower is more similar            |
| Focuses on vector angle         | Considers coordinate differences |
| Common in semantic search       | Also used in vector search       |

**Remember:** A vector database may use cosine similarity, dot product, or Euclidean distance. The exact metric depends on its index and configuration. Your uploaded file does not establish which metric is configured.

# **10. Why do we need chunking?**

## **Interview-ready answer**

"We use chunking to divide large documents into smaller, manageable pieces of text before generating embeddings.

Embedding an entire large document as one vector can lose important local details and make retrieval less precise. It can also exceed model input limits.

By dividing documents into smaller chunks, we can retrieve only the relevant sections instead of passing the entire document to the LLM.

Chunking improves retrieval granularity, reduces unnecessary context, and helps control token usage."

## **Example**

Suppose we have a 100-page annual report.

It contains:

- Company overview
- Financial statements
- Revenue details
- Risk factors
- Future strategy

Without chunking:

```
100-page document
       |
       v
One large embedding
```

Problem: A question about revenue may retrieve the entire document as one large unit.

With chunking:

```
100-page document
       |
       v
   Chunking
       |
       +---- Chunk 1: Company overview
       |
       +---- Chunk 2: Revenue
       |
       +---- Chunk 3: Expenses
       |
       +---- Chunk 4: Risk factors
       |
       +---- Chunk 5: Future strategy
```

Now a question about revenue can retrieve the relevant financial chunk.

## **Your implementation**

```
text_splitter = RecursiveCharacterTextSplitter(    chunk_size=1000,    chunk_overlap=200)chunks = text_splitter.split_documents(documents)
```

`RecursiveCharacterTextSplitter` attempts to split text using a hierarchy of separators, generally preferring larger structural boundaries before falling back to smaller ones.

For example, it tries to preserve paragraphs or sentences where possible rather than blindly cutting at every 1000 characters.

## **Different chunking strategies**

| Strategy           | Explanation                                            |
| ------------------ | ------------------------------------------------------ |
| Fixed-size         | Split by a fixed character or token count              |
| Recursive          | Split using a hierarchy of separators                  |
| Semantic           | Split when the meaning or topic changes                |
| Document structure | Split based on headings, pages, or sections            |
| Parent-child       | Retrieve small chunks but retain larger parent context |

**Interview follow-up: What happens if chunk size is too small?**

- Context may become fragmented.
- Important relationships may be lost.
- More chunks and embeddings are generated.
- Retrieval may return incomplete information.

**What happens if chunk size is too large?**

- Retrieval becomes less precise.
- Irrelevant information may be included.
- More context tokens may be consumed.
- Embedding model input limits may be exceeded.

There is no universally optimal chunk size. It depends on document type, embedding model, query patterns, and retrieval strategy.

# **11. What is chunk overlap?**

## **Interview-ready answer**

"Chunk overlap means keeping a portion of the previous chunk's text in the next chunk.

We use overlap to preserve context when a sentence, paragraph, or important concept is split across chunk boundaries.

Without overlap, the first chunk might contain the beginning of an explanation and the next chunk might contain its conclusion. Retrieving only one of them could result in incomplete context."

## **Example**

Suppose:

```
Chunk size: 1000 characters
Overlap: 200 characters
```

**Chunk overlap visualisation**

**Chunk 1**

Characters 1–800

Characters 801–1000

This section is repeated in Chunk 2

**Chunk 2**

Characters 801–1000

Shared overlap

Characters 1001–1800

## **Your code**

```
RecursiveCharacterTextSplitter(    chunk_size=1000,    chunk_overlap=200)
```

This means the intended overlap is 200 characters, not 200 tokens.

The approximate next-chunk start position is 800 characters after the previous start when the chunks reach the configured size. Actual boundaries can vary because the recursive splitter tries to respect separators.

## **Follow-up: Can too much overlap be a problem?**

Yes.

- Increases the number of chunks.
- Increases embedding generation cost.
- Consumes more vector database storage.
- Can produce duplicate or highly similar retrieval results.

The objective is to preserve useful context without creating excessive duplication.

# **12. What is semantic search?**

## **Interview-ready answer**

"Semantic search is a search technique that finds information based on meaning and context rather than exact keyword matching.

It uses embeddings to represent queries and documents in a vector space. When a user submits a query, we generate its embedding and compare it with stored document embeddings to identify semantically similar chunks.

This allows us to retrieve relevant information even when the user's wording is different from the wording in the original document."

## **Keyword search vs semantic search**

Imagine the document says:

"The organisation reported a 20% increase in annual revenue."

The user searches:

"How much did the company's sales grow?"

**Keyword search**

May miss the result

Looks for matching terms such as "sales" and "grow". The document uses "revenue" and "increase".

**Semantic search**

Can find the result

Understands that "sales growth" and "revenue increase" have related meanings.

## **How semantic search works**

1. Generate an embedding for the user's question.
2. Search the vector database.
3. Compare the query vector with document vectors.
4. Rank the closest matches.
5. Return the most relevant chunks.

**Follow-up: Is semantic search always better than keyword search?**

No. Semantic search is good for meaning and paraphrases, but keyword search is valuable for exact terms such as:

- CIN numbers
- Account numbers
- Dates
- Legal clause IDs
- Product codes

For many enterprise RAG systems, hybrid search combines both.

# **13. How does vector retrieval work?**

## **Interview-ready answer**

"Vector retrieval works by converting the user's query into an embedding and searching for stored document vectors that are closest to that query vector.

The vector database calculates similarity or distance between the query vector and stored vectors, ranks the results, and returns the top matching document chunks along with their metadata.

These retrieved chunks are then passed as context to the LLM for answer generation."

## **Example**

Suppose our vector database contains:

| Chunk | Content                            |
| ----- | ---------------------------------- |
| C1    | Company revenue increased by 20%   |
| C2    | Employee count increased by 10%    |
| C3    | Company opened two new offices     |
| C4    | Operating expenses decreased by 5% |

User asks:

"What was the revenue growth?"

The query is converted into an embedding.

The vector database compares it with the stored embeddings.

**Illustrative retrieval ranking**

**C1 — Revenue**

Top result

Illustrative similarity: 0.95

**C4 — Operating expenses**

Illustrative similarity: 0.70

**C2 — Employee count**

Illustrative similarity: 0.43

Scores are hypothetical examples, not actual outputs from your vector database.

The vector database might return the top 3 chunks, depending on the requested `top_k`.

## **What is top_k?**

`top_k` controls how many matching results are returned.

For example:

```
results = vector_store.similarity_search(    query="What was the revenue growth?",    k=5)
```

This requests five matching documents.

A larger `k` gives more context, but it can also introduce irrelevant chunks and increase LLM token usage.

## **What is metadata filtering?**

Suppose our knowledge base contains documents from 100 companies.

A user asks about company A.

We should filter results by the relevant company or knowledge base before or during vector retrieval.

Conceptually:

```
results = vector_store.similarity_search(    query="What was the revenue growth?",    k=5,    filter={        "kb_id": 101    })
```

This is illustrative; the exact filter syntax depends on the vector store.

Metadata filtering is important for multi-tenant systems because it helps prevent results from unrelated knowledge bases from entering the answer context. It must be combined with proper authorization checks.

## **What is ANN?**

ANN stands for Approximate Nearest Neighbour.

A naive vector search compares the query against every stored vector. This can become expensive with millions of vectors.

ANN indexes help find close vectors efficiently without necessarily checking every vector.

Examples of index/search approaches include:

- HNSW
- IVF
- Product quantization

The trade-off is generally search speed versus retrieval accuracy and memory usage.

# **14. How do you improve retrieval accuracy?**

High-value senior-level question

## **Interview-ready answer**

"Retrieval accuracy can be improved at multiple stages of the RAG pipeline.

First, we should improve document preprocessing and chunking so that chunks preserve meaningful context.

Second, we should choose an embedding model suitable for our domain and evaluate its performance.

Third, we can use hybrid search, combining vector similarity with keyword-based search.

Fourth, we can apply metadata filtering to restrict retrieval to the relevant knowledge base or document.

Fifth, we can retrieve more candidates and use a reranking model to reorder them based on relevance to the query.

Finally, we should evaluate retrieval quality using a representative dataset of questions and expected relevant documents, rather than relying only on subjective testing."

## **10 practical techniques**

| Technique                 | How it helps                                       |
| ------------------------- | -------------------------------------------------- |
| 1. Better chunking        | Preserves context and meaningful sections          |
| 2. Chunk overlap          | Prevents context loss at boundaries                |
| 3. Better embeddings      | Improves semantic representation                   |
| 4. Hybrid search          | Combines semantic and exact keyword matching       |
| 5. Metadata filtering     | Limits results to relevant documents               |
| 6. Query rewriting        | Improves ambiguous or poorly phrased questions     |
| 7. Reranking              | Reorders candidates using deeper relevance scoring |
| 8. Parent-child retrieval | Retrieves precise chunks with broader context      |
| 9. Deduplication          | Removes repeated or redundant results              |
| 10. Retrieval evaluation  | Measures quality and identifies weaknesses         |

## **Understand hybrid search**

Hybrid search combines:

- Vector search — semantic relevance.
- Keyword search — exact term relevance.

Example:

User asks:

"What was the revenue of CIN U12345?"

Vector search understands the revenue context.

Keyword search identifies the exact CIN.

Combining both can produce more reliable retrieval than relying on either alone.

## **Understand reranking**

This is an especially important interview topic.

A typical retrieval pipeline:

**User query**

**Vector search**

Retrieve 20 candidate chunks

**Reranking model**

Score query against each candidate chunk

**Select top 5 relevant chunks**

**Pass context to LLM**

A reranker can improve relevance by evaluating the query and each candidate together rather than relying only on the original vector similarity score.

The trade-off is additional computation and latency.

## **How do you measure retrieval accuracy?**

This is where you can demonstrate senior-level understanding.

| Metric       | What it measures                                     |
| ------------ | ---------------------------------------------------- |
| Precision\@K | How many retrieved chunks are relevant               |
| Recall\@K    | How many relevant chunks were successfully retrieved |
| MRR          | How highly the first relevant result is ranked       |
| NDCG\@K      | Quality of ranking, considering graded relevance     |

Example:

If there are 10 retrieved chunks and 8 are relevant:

\\[ Precision\@10 = \frac{8}{10} = 0.8 \\]

That means precision is 80%.

If five chunks are actually relevant in the entire dataset and retrieval finds four:

\\[ Recall\@10 = \frac{4}{5} = 0.8 \\]

That means recall is 80%.

**Important distinction:** Retrieval quality and answer quality are different. You can retrieve excellent chunks and still get a poor answer if the LLM misunderstands them. Evaluate retrieval and generation separately.

# **Quick revision sheet**

| Question                      | One-line answer                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| 7. What is RAG?               | Retrieval-Augmented Generation combines external knowledge retrieval with LLM generation. |
| 8. What is an embedding?      | A numerical vector representation of data that captures semantic information.             |
| 9. What is cosine similarity? | Measures similarity based on the angle between two vectors.                               |
| 10. Why chunking?             | Divides large documents into manageable, searchable pieces.                               |
| 11. What is overlap?          | Repeats part of one chunk in the next to preserve context.                                |
| 12. Semantic search?          | Searches by meaning rather than exact keywords.                                           |
| 13. Vector retrieval?         | Finds and ranks document vectors closest to the query vector.                             |
| 14. Improve retrieval?        | Better chunking, embeddings, hybrid search, filtering, reranking, and evaluation.         |

# **Interview practice — let's test your understanding**

We'll go one question at a time. Try answering naturally, as if you're speaking to the interviewer. I'll review your answer, point out missing technical details, and give you a stronger version.

**RAG interview mock**

Question 1 of 6

## **What is RAG, and why would you use it instead of relying only on an LLM?**

Hint: Explain retrieval, external knowledge, context, and generation.

PreviousEvaluate answer

Skip to next question

My recommendation: pay special attention to **embeddings, cosine similarity, chunking, hybrid search, and reranking**. These are common areas where interviewers move from basic definitions into practical RAG system design.


## Database

15. How does SHA-256 help in deduplication?
16. What is a deterministic ID?
17. How do you handle document updates?
18. How do you prevent duplicate embeddings?
19. How do you maintain consistency across SQL and MongoDB?
20. How would you implement document versioning?


# **Database – Interview Preparation (Q15–Q20)**

These questions are particularly important because your document-ingestion implementation uses **SHA-256 hashing, deterministic chunk IDs, SQL metadata, MongoDB/vector storage, and incremental chunk processing**.

I'll explain each question in three parts:

1. Concept – what it means.
2. Your implementation – what your code actually does.
3. Interview-ready answer – how to explain it confidently.

## **15. How does SHA-256 help in deduplication?**

### **Concept**

SHA-256 is a cryptographic hash function that converts input data into a fixed-length, 256-bit hash.

It produces a 64-character hexadecimal string.

For example:

```
import hashlibcontent = "Hello World"hash_value = hashlib.sha256(    content.encode()).hexdigest()print(hash_value)
```

The important characteristics are:

- Same input produces the same hash.
- Different input normally produces a different hash.
- Even a small change in input produces a significantly different hash.
- It is computationally infeasible to reverse the hash to recover the original input.

### **How does it help with deduplication?**

Imagine a document contains 100 chunks.

You process it today and store all 100 chunks.

Tomorrow, someone uploads the same document again.

Without deduplication, you might generate embeddings and store another 100 chunks.

With SHA-256:

1. Generate a hash for each chunk.
2. Compare it with existing chunk hashes.
3. If the hash already exists, skip that chunk.
4. If the hash is new, generate its embedding and store it.

```
import hashlibdef generate_chunk_hash(content, metadata):    raw_content = content + str(metadata)    return hashlib.sha256(        raw_content.encode("utf-8")    ).hexdigest()existing_hashes = {    "abc123..."}chunk_hash = generate_chunk_hash(    "Revenue increased by 20%",    {"page": 1})if chunk_hash in existing_hashes:    print("Duplicate chunk. Skip processing.")else:    print("New chunk. Generate embedding.")
```

### **What happens in your implementation?**

Your `process_document()` function calculates:

```
chunk_hash = hashlib.sha256(    (chunk.content + str(chunk.metadata)).encode()).hexdigest()
```

Then it compares the hash with existing hashes:

```
if chunk_hash in existing_hashes:    continue
```

This avoids processing unchanged chunks.

Your upload function also calculates a SHA-256 hash of the original file:

```
file_hash = hashlib.sha256(content).hexdigest()
```

So your implementation has two different hash levels:

| Hash       | Purpose                                  |
| ---------- | ---------------------------------------- |
| File hash  | Identify identical original file content |
| Chunk hash | Identify unchanged document chunks       |

One important distinction: your upload function calculates the file hash, but the shown code does not use it to reject duplicate uploads automatically.&#x20;

Pasted text(20261125-081813).txt



### **Interview-ready answer**

"SHA-256 helps us identify duplicate content without comparing the entire content repeatedly. In my document-ingestion pipeline, I calculate a hash for every chunk using its content and metadata. Before generating embeddings, I compare that hash against existing records. If the hash already exists, I skip that chunk. This reduces unnecessary embedding API calls, storage usage, and processing time."

## **16. What is a deterministic ID?**

### **Concept**

A deterministic ID is an identifier generated from predictable input data.

The same input always produces the same ID.

For example:

```
import hashlibdef generate_chunk_id(kb_id, file_name, chunk_hash):    unique_string = f"{kb_id}:{file_name}:{chunk_hash}"    return hashlib.sha256(        unique_string.encode()    ).hexdigest()
```

If you call this function multiple times with identical inputs, you get the same ID.

```
id1 = generate_chunk_id(    10, "report.pdf", "abc123")id2 = generate_chunk_id(    10, "report.pdf", "abc123")print(id1 == id2)  # True
```

### **Deterministic ID vs UUID**

| Deterministic ID                 | UUID                                         |
| -------------------------------- | -------------------------------------------- |
| Generated from input data        | Usually generated randomly                   |
| Same input gives same ID         | Each generation usually gives a different ID |
| Useful for idempotency           | Useful for unique entity identification      |
| Can help avoid duplicate records | Requires separate duplicate detection        |

### **What happens in your implementation?**

Your code generates chunk IDs like this:

```
chunk_id = hashlib.sha256(    f"{kb_id}:{file_name}:{chunk_hash}".encode()).hexdigest()
```

This means the same knowledge base, filename, and chunk hash produce the same chunk ID.

Pasted text(20261125-081813).txt

### **Why is this useful?**

Suppose a background job runs twice because of a retry.

Without deterministic IDs:

- First execution creates chunk A.
- Second execution creates another chunk A with a different ID.

With deterministic IDs:

- Both executions generate the same chunk ID.
- You can use that ID with database uniqueness or upsert operations to prevent duplicate records.

**Important:** Deterministic IDs alone do not prevent duplicates. Your database and vector store must enforce uniqueness or use upsert semantics.

### **Interview-ready answer**

"A deterministic ID is generated from predictable input data rather than randomly. In my implementation, I generate a chunk ID using the knowledge base ID, filename, and chunk hash. This ensures that the same chunk within the same knowledge base and file gets the same identifier. It is useful for idempotency, retries, and avoiding duplicate chunk records."

## **17. How do you handle document updates?**

### **Concept**

Suppose a company uploads a document:

`financial_report.pdf`

Initially:

- Chunk A
- Chunk B
- Chunk C

After one week, the document is updated:

- Chunk A – unchanged
- Chunk B – modified
- Chunk D – newly added

We should not regenerate embeddings for everything.

Instead, we perform **incremental document processing**.

[The Missing Piece in Vibe Coding: How CocoIndex + VeloDB Give AI the Context It Needs](https://images.openai.com/static-rsc-4/xPU9ipH3UIVDhBnb06ilSCIM7Ml0l9KglqlnpLmD1Y_2HpmGWAfiot7DlZN8nwsiW-cjCsAhU2jMQCzwGqW3wrHF44YJpPUVI6H7yMlIPGjyyAO76IuCcnh2j0mYHcbuesHf7ggjtMywyC4q55E1o34f6xkAfqmMKirs7GaONKU?purpose=inline)

[velodb.io](https://www.velodb.io/blog/vibe-coding-how-cocoindex-velodb-give-ai-the-context-it-needs?utm_source=chatgpt.com)

### **Recommended update workflow**

1. Upload the new document to GCS.
2. Calculate the new file hash.
3. Extract text and split it into chunks.
4. Calculate hashes for all new chunks.
5. Compare new hashes with existing hashes.
6. Skip unchanged chunks.
7. Generate embeddings for new or modified chunks.
8. Remove chunks that no longer exist.
9. Update document metadata and processing status.

### **What does your code implement?**

Your `process_document()` function follows this incremental approach.

It maintains:

```
existing_hashes = chunk_manager.list_chunks(file_name)
```

It calculates current hashes:

```
current_hashes = set()
```

It skips unchanged chunks:

```
if chunk_hash in existing_hashes:    continue
```

It prepares new chunks and adds them to the vector store.

Finally, it identifies removed chunks:

```
chunks_to_delete = chunk_manager.get_deleted_chunks(    current_hashes,    file_name)
```

And deletes them:

```
chunk_manager.delete_chunks(chunks_to_delete)vector_store.delete(chunks_to_delete)
```

Pasted text(20261125-081813).txt

### **Important interview follow-up: What if only one paragraph changes?**

Suppose a document has 100 chunks and only one chunk changes.

Ideally:

- 99 chunks are reused.
- 1 chunk gets a new hash.
- Only 1 new embedding is generated.
- The outdated chunk is removed.

This saves embedding costs and processing time.

### **Interview-ready answer**

"I handle document updates through hash-based incremental processing. Whenever a document is updated, I extract and split it again, calculate hashes for the new chunks, and compare them with existing chunk hashes. Unchanged chunks are skipped, new or modified chunks are embedded and stored, and removed chunks are deleted from the vector store. This avoids reprocessing the entire document unnecessarily."

## **18. How do you prevent duplicate embeddings?**

### **First, understand the distinction**

A duplicate embedding means storing the same logical chunk multiple times in the vector database.

For example:

| Chunk           | Embedding generated | Stored      |
| --------------- | ------------------- | ----------- |
| A               | Yes                 | Yes         |
| A (re-uploaded) | Should skip         | Should skip |
| B               | Yes                 | Yes         |
| B (re-uploaded) | Should skip         | Should skip |

### **Recommended approach**

Use three levels of protection.

**Level 1: Content hashing**

Calculate SHA-256 for every chunk.

```
chunk_hash = hashlib.sha256(    chunk_content.encode("utf-8")).hexdigest()
```

**Level 2: Deterministic IDs**

Generate the same ID for the same logical chunk.

```
chunk_id = hashlib.sha256(    f"{kb_id}:{file_name}:{chunk_hash}".encode()).hexdigest()
```

**Level 3: Database uniqueness / upsert**

Use the chunk ID as a unique key.

For example, with MongoDB:

```
collection.update_one(    {"_id": chunk_id},    {        "$set": {            "content": chunk_content,            "embedding": embedding,            "metadata": metadata        }    },    upsert=True)
```

An upsert updates an existing record or inserts it if it doesn't exist.

### **What happens in your implementation?**

Your `process_document()` function:

- Calculates chunk hashes.
- Checks existing hashes.
- Skips unchanged chunks.
- Generates deterministic chunk IDs.
- Adds new chunks to the vector store.

Pasted text(20261125-081813).txt

However, your background-processing function uses a different approach. It creates chunk IDs from `CIN`, filename, and chunk content, and adds documents to the vector store separately.

Therefore, I would not claim that both processing paths provide the same duplicate-prevention guarantees.

Pasted text(20261125-081813).txt

### **Interview-ready answer**

"I prevent duplicate embeddings using content hashing and deterministic chunk IDs. Before embedding a chunk, I check whether its hash already exists. If it exists, I skip embedding generation. For stronger protection, I would also enforce unique IDs in the database and use upsert operations, so retries or concurrent processing cannot create duplicate records."

## **19. How do you maintain consistency across SQL and MongoDB?**

This is one of the most important system-design questions.

### **First, understand the problem**

Your architecture uses:

- **SQL:** Document metadata, processing tasks, and document chunk records.
- **MongoDB/vector store:** Chunk content and vector embeddings.
- **GCS:** Original uploaded documents.

These are separate storage systems.

Consider this situation:

1. You create a document record in SQL.
2. You insert 100 chunk records in SQL.
3. You insert embeddings into MongoDB.
4. MongoDB fails after inserting 50 chunks.

Now your data is inconsistent.

[Saga vs Outbox vs 2PC: How to Choose the Right Distributed Transaction Pattern | Medium](https://images.openai.com/static-rsc-4/9G3lgZ8fTeIp_LMMBjXFYGhnyLPca8QYSpxq_R_QMcmaOERGU1zFYHUsMa2pKAfSAHmFlP9FejFNAD-AmMkQM7sRrymfcrrRFP2juD45zXW1fEVCs7PZu5-ImMXOgG9_wmiMWTHrcK4x3CdpFf5gP6fJFUllZdo2aPnYocx79uI?purpose=inline)

[medium.com](https://medium.com/%40the_atomic_architect/saga-vs-outbox-vs-2pc-when-each-is-the-least-bad-option-c13caa8017db?utm_source=chatgpt.com)

### **Why can't we use a normal SQL transaction?**

A SQL transaction controls operations within its own transactional database.

It cannot automatically roll back a successful MongoDB operation.

For example:

```
db.add(document)db.commit()vector_store.add_documents(chunks)  # Fails
```

The SQL document record remains committed even though vector insertion failed.

### **Recommended solution: Saga pattern**

A Saga coordinates operations across multiple independent systems using steps and compensating actions.

Example:

\#chatgpt-mermaid-\_r_39q\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_39q\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_39q\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_39q\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_39q\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_39q\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_39q\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_39q\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_39q\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_39q\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_39q\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_39q\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_39q\_ p{margin:0;}#chatgpt-mermaid-\_r_39q\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_39q\_ .label text,#chatgpt-mermaid-\_r_39q\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ .node rect,#chatgpt-mermaid-\_r_39q\_ .node circle,#chatgpt-mermaid-\_r_39q\_ .node ellipse,#chatgpt-mermaid-\_r_39q\_ .node polygon,#chatgpt-mermaid-\_r_39q\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ .rough-node .label text,#chatgpt-mermaid-\_r_39q\_ .node .label text,#chatgpt-mermaid-\_r_39q\_ .image-shape .label,#chatgpt-mermaid-\_r_39q\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_39q\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ .rough-node .label,#chatgpt-mermaid-\_r_39q\_ .node .label,#chatgpt-mermaid-\_r_39q\_ .image-shape .label,#chatgpt-mermaid-\_r_39q\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_39q\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_39q\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_39q\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_39q\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_39q\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_39q\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_39q\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_39q\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_39q\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_39q\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_39q\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_39q\_ .icon-shape,#chatgpt-mermaid-\_r_39q\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_39q\_ .icon-shape p,#chatgpt-mermaid-\_r_39q\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_39q\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_39q\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_39q\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_39q\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_39q\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_39q\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_39q\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_39q\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_39q\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_39q\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_39q\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_39q\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_39q\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_39q\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_39q\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_39q\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ .node rect,#chatgpt-mermaid-\_r_39q\_ .node circle,#chatgpt-mermaid-\_r_39q\_ .node ellipse,#chatgpt-mermaid-\_r_39q\_ .node polygon,#chatgpt-mermaid-\_r_39q\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_39q\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_39q\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_39q\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_39q\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_39q\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Create SQL document recordSave chunk metadataInsert vectors into MongoDBAll operations successful?Mark document completedMark document failedRetry failed operationsYesNo

A practical implementation:

- Create a document record with `PROCESSING` status.
- Store the processing task.
- Process chunks.
- Insert chunk metadata and vectors.
- Mark the document `COMPLETED` only after all required operations succeed.
- If something fails, mark it `FAILED` and retain enough information to retry.
- Make each operation idempotent.

### **Another important pattern: Transactional Outbox**

The Outbox pattern is useful when a SQL database is your source of truth.

Instead of directly depending on MongoDB insertion inside the SQL transaction:

1. Save document/chunk metadata in SQL.
2. Save an outbox event in the same SQL transaction.
3. A background worker reads pending outbox events.
4. The worker writes embeddings to MongoDB.
5. After success, it marks the event as processed.

This avoids losing the instruction to update MongoDB if the application crashes after committing SQL.

### **What happens in your implementation?**

Your background-processing code:

- Creates a SQL `Document` record.
- Adds `DocumentChunk` records.
- Adds documents to the vector store.
- Updates the processing task status.

It does not demonstrate a distributed transaction, transactional outbox, or automatic compensation mechanism.

Pasted text(20261125-081813).txt

There is also a potential consistency issue because SQL chunk records are committed in batches, while vector insertion happens separately.

### **Interview-ready answer**

"In my architecture, SQL stores document metadata and chunk tracking information, while MongoDB stores the vector representations. Since these are separate databases, I cannot rely on a single ACID transaction across both. I would maintain consistency using idempotent processing, processing statuses, retries, and a Saga or transactional outbox pattern. The document should only be marked completed when all required storage operations have succeeded."

## **20. How would you implement document versioning?**

### **Concept**

Document versioning means maintaining multiple versions of the same logical document instead of overwriting the previous version.

Example:

**Financial Report.pdf**

1. **Version 1**

   Uploaded: 1 November

   Original document

   Archived
2. **Version 2**

   Uploaded: 10 November

   Updated financial figures

   Archived
3. **Version 3**

   Uploaded: 20 November

   Latest financial report

   Current version

### **Recommended database design**

I would introduce two entities:

**1. Documents table**

Stores the logical document.

| Column             | Purpose             |
| ------------------ | ------------------- |
| id                 | Logical document ID |
| file_name          | Document name       |
| knowledge_base_id  | Knowledge base      |
| current_version_id | Active version      |
| created_at         | Creation timestamp  |

**2. DocumentVersions table**

Stores each uploaded version.

| Column         | Purpose               |
| -------------- | --------------------- |
| id             | Version ID            |
| document_id    | Parent document       |
| version_number | 1, 2, 3...            |
| file_hash      | Original file SHA-256 |
| file_path      | GCS location          |
| status         | Processing status     |
| created_at     | Upload timestamp      |

**3. DocumentChunks table**

Stores version-specific chunks.

| Column              | Purpose            |
| ------------------- | ------------------ |
| id                  | Chunk ID           |
| document_version_id | Version reference  |
| chunk_hash          | Content hash       |
| content             | Chunk content      |
| metadata            | Page, source, etc. |

### **Architecture**

\#chatgpt-mermaid-\_r_3a7\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3a7\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3a7\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3a7\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3a7\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3a7\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3a7\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3a7\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3a7\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3a7\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3a7\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3a7\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3a7\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3a7\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3a7\_ p{margin:0;}#chatgpt-mermaid-\_r_3a7\_ .entityBox{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3a7\_ .relationshipLabelBox{fill:rgb(243, 243, 243);opacity:0.7;background-color:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3a7\_ .relationshipLabelBox rect{opacity:0.5;}#chatgpt-mermaid-\_r_3a7\_ .labelBkg{background-color:rgba(243, 243, 243, 0.5);}#chatgpt-mermaid-\_r_3a7\_ .edgeLabel{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3a7\_ .edgeLabel .label rect{fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3a7\_ .edgeLabel .label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3a7\_ .edgeLabel .label{fill:rgb(83, 154, 248);font-size:14px;}#chatgpt-mermaid-\_r_3a7\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3a7\_ .edge-pattern-dashed{stroke-dasharray:8,8;}#chatgpt-mermaid-\_r_3a7\_ .node rect,#chatgpt-mermaid-\_r_3a7\_ .node circle,#chatgpt-mermaid-\_r_3a7\_ .node ellipse,#chatgpt-mermaid-\_r_3a7\_ .node polygon{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3a7\_ .relationshipLine{stroke:rgb(143, 143, 143);stroke-width:1px;fill:none;}#chatgpt-mermaid-\_r_3a7\_ .marker{fill:none!important;stroke:rgb(143, 143, 143)!important;stroke-width:1;}#chatgpt-mermaid-\_r_3a7\_ [data-look=neo].labelBkg{background-color:rgba(243, 243, 243, 0.5);}#chatgpt-mermaid-\_r_3a7\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3a7\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3a7\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3a7\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3a7\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3a7\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3a7\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3a7\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}DOCUMENTSstringidPKstringfile_namestringcurrent_version_idDOCUMENT_VERSIONSstringidPKstringdocument_idFKintversion_numberstringfile_hashstringfile_pathstringstatusDOCUMENT_CHUNKSstringidPKstringdocument_version_idFKstringchunk_hashtextcontentKNOWLEDGE_BASEShascontainsbelongs_to

### **How the update process would work**

Suppose Version 1 is currently active.

A user uploads an updated document.

1. Calculate the new file hash.
2. Compare it with the current version's hash.
3. If identical, avoid creating a redundant version.
4. Otherwise, create Version 2.
5. Process Version 2 and generate its chunks.
6. Store the new embeddings with version-specific metadata.
7. Verify processing completed successfully.
8. Update `current_version_id` to Version 2.
9. Keep Version 1 available for rollback or auditing.

### **Important: What happens to old embeddings?**

There are two common approaches.

**Approach A – Replace old embeddings**

Delete Version 1 chunks after Version 2 becomes active.

- Less storage usage.
- Simpler retrieval.
- Historical retrieval becomes difficult.

**Approach B – Keep all versions**

Store embeddings for every version and filter retrieval using:

```
{    "document_id": document_id,    "version_id": current_version_id}
```

- Supports historical queries.
- Allows rollback.
- Requires version-aware metadata filtering.

I would generally prefer Approach B if auditability and historical document access are important.

### **Interview-ready answer**

"I would separate the logical document from its individual versions. The Documents table would represent the document itself, while DocumentVersions would store each uploaded version with its file hash, version number, GCS path, and processing status. Each chunk would reference a specific version. When a new version is uploaded, I would process it independently and switch the current version only after successful ingestion. This gives us rollback, auditability, and prevents incomplete versions from becoming active."

# **Quick revision – Q15 to Q20**

| Question                        | Key concept to remember            |
| ------------------------------- | ---------------------------------- |
| 15. SHA-256 deduplication       | Content fingerprint                |
| 16. Deterministic ID            | Same input = same ID               |
| 17. Document updates            | Incremental processing             |
| 18. Duplicate embeddings        | Hash + unique ID + upsert          |
| 19. SQL and MongoDB consistency | Saga / Outbox / retries            |
| 20. Document versioning         | Logical document + version records |

## **Important interview distinction**

Implemented in your code

- Original file SHA-256 calculation.
- Chunk hash calculation.
- Deterministic chunk IDs in the incremental processing path.
- Skipping unchanged chunks.
- Identifying and deleting removed chunks.

Recommended improvements, not demonstrated in the supplied code

- Database-level unique constraints and guaranteed upserts.
- Transactional Outbox or Saga.
- Robust retry and reconciliation workflows.
- Complete document versioning.
- Atomic switching between active document versions.

# **Let's practise – Database interview**

I'll ask one question at a time, just like a real technical interview. Answer in your own words, and I'll evaluate your technical accuracy, clarity, and confidence.

**Mock interview**

Question 1 of 6

## **How does SHA-256 help in deduplication?**

Hint: Think about file hashes, chunk hashes, and avoiding unnecessary embedding generation.

Submit answer for evaluationPreviousNext


## Python and Backend

21. Why use FastAPI async functions?
22. What is the difference between synchronous and asynchronous execution?
23. What is a factory design pattern?
24. What is dependency injection?
25. Why use temporary files?
26. Why is the finally block important?
27. How do you handle exceptions in background processing?


# **Python and Backend – Interview Preparation (Q21–Q27)**

These questions connect directly to your Python document-ingestion code, especially FastAPI, asynchronous functions, LangChain loaders, GCS, temporary files, and background processing.

I'll explain the concepts, show how they relate to your implementation, and give you interview-ready answers.

## **21. Why use FastAPI async functions?**

### **Concept**

In FastAPI, we use `async def` when a function performs operations that can wait for external resources without blocking the execution thread.

Typical examples:

- Reading uploaded files.
- Calling external APIs.
- Making asynchronous database queries.
- Communicating with cloud storage using an async client.
- Waiting for other services.

Consider this example:

```
@app.get("/users")async def get_users():    users = await fetch_users_from_api()    return users
```

While the API request is waiting, the event loop can execute other requests.

### **What is an event loop?**

Think of the event loop as a task coordinator.

[The Heart of High-Performance Python: Understanding Asyncio Architecture](https://images.openai.com/static-rsc-4/pQvzKzwTjiAktp_oGLV4ZmN8TKWHN-9wHerhIqf1fvymUfoUDFVdfSHaweVQRe3ztXVvuXsiaiKLbFZdf-1-NoH7JcMj3PdZx8FTXhC2IN-7O5_Q53cmxSpBuztYwqVzDQxOp8auOLpmhNn4WfWnknLsZ10fqWA1-dWh9ZTm2BE?purpose=inline)

[linkedin.com](https://www.linkedin.com/pulse/heart-high-performance-python-understanding-asyncio-akash-gupta-ohdsf?utm_source=chatgpt.com)

It manages multiple coroutines and switches between them when they reach an `await` point and are waiting for an operation to complete.

### **What happens in your implementation?**

Your code uses asynchronous functions:

```
async def upload_document(file: UploadFile, kb_id: int):    content = await file.read()
```

And:

```
async def preview_document(file_path: str):    ...
```

The `await file.read()` is an asynchronous operation.

However, there is an important observation about your implementation.

Several operations inside these async functions are synchronous:

```
blob.download_to_filename(temp_file.name)documents = loader.load()embeddings = EmbeddingsFactory.create()vector_store.add_documents(documents)
```

These operations can block the event loop while they execute.

**Important interview point:** Declaring a function `async` does not automatically make all operations inside it asynchronous.

### **How would you improve it?**

For blocking operations, you can use a thread pool:

```
from starlette.concurrency import run_in_threadpooldocuments = await run_in_threadpool(    loader.load)
```

Or use native asynchronous clients wherever available.

### **Interview-ready answer**

"I use async functions in FastAPI to handle I/O-bound operations efficiently. When a coroutine awaits an external operation, the event loop can execute other requests instead of blocking. In my document-ingestion code, I use async functions for file uploads and document processing. However, I also have some synchronous operations, such as document loading and vector-store insertion. For production, I would move those blocking operations to a thread pool or use asynchronous clients."

## **22. What is the difference between synchronous and asynchronous execution?**

### **Synchronous execution**

Tasks execute one after another.

If Task A takes five seconds, Task B must wait until Task A completes.

```
import timedef task_a():    time.sleep(5)    print("Task A completed")def task_b():    print("Task B completed")task_a()task_b()
```

Execution:

```
Start Task A
Wait 5 seconds
Task A completed
Task B completed
```

### **Asynchronous execution**

Tasks can make progress while other tasks are waiting for I/O.

```
import asyncioasync def task_a():    await asyncio.sleep(5)    print("Task A completed")async def task_b():    print("Task B completed")async def main():    await asyncio.gather(        task_a(),        task_b()    )asyncio.run(main())
```

Execution:

```
Start Task A
Start Task B
Task B completed
Wait for Task A
Task A completed
```

### **Comparison**

| Feature          | Synchronous             | Asynchronous                   |
| ---------------- | ----------------------- | ------------------------------ |
| Execution        | Sequential              | Cooperative concurrency        |
| Waiting          | Blocks execution thread | Can yield control              |
| I/O operations   | Can block               | Can be non-blocking            |
| CPU-heavy work   | Usually blocks          | Still blocks unless offloaded  |
| Complexity       | Simpler                 | Requires async-compatible code |
| Python mechanism | Normal functions        | Coroutines and event loop      |

### **Concurrency vs Parallelism**

This is a common follow-up.

- **Concurrency:** Multiple tasks make progress during overlapping periods.
- **Parallelism:** Multiple tasks execute simultaneously, generally using multiple CPU cores.

Asyncio provides concurrency, not automatic CPU parallelism.

### **Interview-ready answer**

"In synchronous execution, one operation must finish before the next operation proceeds. In asynchronous execution, a task can yield control while waiting for I/O, allowing other tasks to make progress. This is particularly useful for APIs handling multiple network or database requests. However, asynchronous execution does not automatically make CPU-intensive operations faster."

## **23. What is a factory design pattern?**

### **Concept**

The Factory Design Pattern is a creational design pattern that centralizes object creation.

Instead of creating objects directly throughout your application, you delegate object creation to a factory.

Imagine your application supports three vector databases:

- MongoDB
- ChromaDB
- Pinecone

Without a factory, you might have database-specific initialization logic everywhere.

With a factory, the application requests a vector store without worrying about its internal construction.

### **Without Factory**

```
if store_type == "mongo":    vector_store = MongoVectorStore()elif store_type == "chroma":    vector_store = ChromaVectorStore()elif store_type == "pinecone":    vector_store = PineconeVectorStore()
```

You might repeat this logic across multiple services.

### **With Factory**

```
class VectorStoreFactory:    @staticmethod    def create(store_type, collection_name, embedding_function):        if store_type == "mongo":            return MongoVectorStore(                collection_name=collection_name,                embedding_function=embedding_function            )        elif store_type == "chroma":            return ChromaVectorStore(                collection_name=collection_name,                embedding_function=embedding_function            )        raise ValueError("Unsupported vector store")
```

Usage:

```
vector_store = VectorStoreFactory.create(    store_type="mongo",    collection_name="kb_123",    embedding_function=embeddings)
```

### **What happens in your implementation?**

Your code uses two factories:

**1. EmbeddingsFactory**

```
embeddings = EmbeddingsFactory.create()
```

Responsible for creating the embedding model.

**2. VectorStoreFactory**

```
vector_store = VectorStoreFactory.create(    store_type=settings.VECTOR_STORE_TYPE,    collection_name=f"kb_{kb_id}",    embedding_function=embeddings)
```

Responsible for creating the configured vector store.

Pasted text(20261125-081813).txt

### **Why is this useful?**

- Centralized object creation.
- Less coupling between application services and implementations.
- Easier to switch providers.
- Easier testing and mocking.
- Easier extension when adding new implementations.

### **Factory vs Dependency Injection**

| Factory                      | Dependency Injection                   |
| ---------------------------- | -------------------------------------- |
| Creates objects              | Supplies dependencies to components    |
| Controls object construction | Controls how dependencies are provided |
| Example: VectorStoreFactory  | Example: FastAPI Depends               |

### **Interview-ready answer**

"The Factory Design Pattern centralizes object creation. In my document-ingestion system, I use EmbeddingsFactory and VectorStoreFactory to create embedding models and vector stores. The service does not need to know the internal initialization details of each provider. This reduces coupling and makes it easier to switch between implementations."

## **24. What is dependency injection?**

### **Concept**

Dependency Injection, or DI, is a design technique where a class or function receives the objects it needs instead of creating them internally.

Consider this example.

### **Without Dependency Injection**

```
class DocumentService:    def __init__(self):        self.db = DatabaseConnection()        self.storage = GCSManager()
```

Problems:

- The service creates its own dependencies.
- Testing becomes harder.
- Replacing the database or storage implementation requires modifying the service.

### **With Dependency Injection**

```
class DocumentService:    def __init__(self, db, storage):        self.db = db        self.storage = storage
```

Now we can inject dependencies:

```
db = DatabaseConnection()storage = GCSManager()service = DocumentService(    db=db,    storage=storage)
```

### **FastAPI Dependency Injection**

FastAPI provides `Depends()`.

```
from fastapi import Depends, FastAPIapp = FastAPI()def get_database():    db = SessionLocal()    try:        yield db    finally:        db.close()@app.get("/documents")def get_documents(db=Depends(get_database)):    return db.query(Document).all()
```

Here:

- `get_database()` creates the database session.
- `Depends()` injects it into the endpoint.
- The session is closed after the request lifecycle.

### **What happens in your implementation?**

Your document-processing functions receive the SQLAlchemy session as an argument in the background processor:

```
async def process_document_background(    temp_path,    file_name,    kb_id,    task_id,    db: Session,    ...):
```

This is an example of dependency passing.

However, the supplied file does not show a FastAPI `Depends()` declaration for this function, so I would not claim that this specific code demonstrates FastAPI's DI mechanism.

### **Interview-ready answer**

"Dependency Injection means providing dependencies to a component from outside rather than creating them internally. It reduces coupling and improves testability. FastAPI supports dependency injection through Depends(). For example, we can inject a SQLAlchemy session into an API endpoint. In my document-processing code, the database session is also passed into the background processing function."

## **25. Why use temporary files?**

### **Concept**

A temporary file is a file created for short-term processing and removed after its purpose is complete.

In document ingestion, uploaded files are often stored in cloud storage, but many document-processing libraries expect a local filesystem path.

For example:

- `PyPDFLoader`
- `Docx2txtLoader`
- `UnstructuredMarkdownLoader`
- `TextLoader`

These loaders in your implementation receive local file paths.

### **Typical workflow**

\#chatgpt-mermaid-\_r_3fi\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3fi\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3fi\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3fi\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3fi\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3fi\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3fi\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3fi\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3fi\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3fi\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3fi\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3fi\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3fi\_ p{margin:0;}#chatgpt-mermaid-\_r_3fi\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3fi\_ .label text,#chatgpt-mermaid-\_r_3fi\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ .node rect,#chatgpt-mermaid-\_r_3fi\_ .node circle,#chatgpt-mermaid-\_r_3fi\_ .node ellipse,#chatgpt-mermaid-\_r_3fi\_ .node polygon,#chatgpt-mermaid-\_r_3fi\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ .rough-node .label text,#chatgpt-mermaid-\_r_3fi\_ .node .label text,#chatgpt-mermaid-\_r_3fi\_ .image-shape .label,#chatgpt-mermaid-\_r_3fi\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3fi\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ .rough-node .label,#chatgpt-mermaid-\_r_3fi\_ .node .label,#chatgpt-mermaid-\_r_3fi\_ .image-shape .label,#chatgpt-mermaid-\_r_3fi\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3fi\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3fi\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3fi\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3fi\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3fi\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3fi\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3fi\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3fi\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3fi\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3fi\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3fi\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3fi\_ .icon-shape,#chatgpt-mermaid-\_r_3fi\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3fi\_ .icon-shape p,#chatgpt-mermaid-\_r_3fi\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3fi\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3fi\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3fi\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3fi\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3fi\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3fi\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3fi\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3fi\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3fi\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3fi\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3fi\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3fi\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3fi\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3fi\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3fi\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3fi\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ .node rect,#chatgpt-mermaid-\_r_3fi\_ .node circle,#chatgpt-mermaid-\_r_3fi\_ .node ellipse,#chatgpt-mermaid-\_r_3fi\_ .node polygon,#chatgpt-mermaid-\_r_3fi\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3fi\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3fi\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3fi\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3fi\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3fi\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Document in GCSDownload to temporary fileLoad documentExtract textSplit into chunksProcess chunksDelete temporary file

### **What happens in your implementation?**

Your `preview_document()` function:

```
with tempfile.NamedTemporaryFile(    delete=False,    suffix=".tmp") as temp_file:    blob.download_to_filename(temp_file.name)    temp_path = temp_file.name
```

Then it passes the local path to the loader:

```
loader = PyPDFLoader(temp_path)documents = loader.load()
```

Pasted text(20261125-081813).txt

### **Why&#x20;**`delete=False`**?**

Normally, Python can automatically delete a temporary file when its file object is closed.

But some libraries need to open the file again using its path.

Using `delete=False` allows the file to remain available after the temporary file object is closed.

You must then remove it explicitly.

### **Advantages**

- Compatible with libraries requiring local file paths.
- Avoids keeping the entire processing workflow in memory.
- Useful for large documents.
- Separates cloud storage from local document parsing.

### **Important production considerations**

- Always delete temporary files.
- Use secure temporary directories.
- Avoid predictable filenames.
- Restrict file access.
- Monitor temporary disk usage.
- Consider file size limits.

### **Interview-ready answer**

"I use temporary files because document-processing libraries often require a local file path. In my implementation, I download the original document from GCS into a temporary file, pass that path to the appropriate LangChain loader, extract and split the content, and then remove the temporary file. This avoids keeping the entire processing workflow dependent on in-memory file handling."

## **26. Why is the finally block important?**

### **Concept**

Python exception handling has three main blocks:

- `try`: Code that may raise an exception.
- `except`: Handles an exception.
- `finally`: Executes cleanup code whether an exception occurs or not, including when the function returns normally.

Example:

```
try:    file = open("document.txt", "r")    content = file.read()except Exception as e:    print(f"Error: {e}")finally:    print("Cleanup operation")
```

The `finally` block is useful for resource cleanup.

### **Why is it important in document processing?**

Imagine:

1. Download a PDF from GCS.
2. Create a temporary file.
3. Load the PDF.
4. An exception occurs during text extraction.

Without cleanup, temporary files may remain on disk.

Over time, this can consume significant disk space.

### **What happens in your implementation?**

Your `preview_document()` function uses:

```
try:    # Load document    # Split into chunks    # Return previewfinally:    os.unlink(temp_path)
```

This ensures the temporary file is removed even if document loading or splitting fails.&#x20;

Pasted text(20261125-081813).txt



Your background processor also uses `finally` to clean up its local temporary file.

### **Important bug to identify in your code**

In `process_document_background()`, `local_temp_path` is assigned after the GCS path parsing and temporary-file creation.

But the `finally` block references it:

```
finally:    if os.path.exists(local_temp_path):        os.remove(local_temp_path)
```

If an exception occurs before `local_temp_path` is assigned, this can raise an `UnboundLocalError`.

### **How would you fix it?**

Initialize the variable before entering the `try` block:

```
async def process_document_background(...):    local_temp_path = None    try:        # Download file        # Process document        pass    except Exception as e:        logger.exception("Document processing failed")    finally:        if local_temp_path and os.path.exists(local_temp_path):            os.remove(local_temp_path)
```

For production, I would also consider `contextlib.suppress(FileNotFoundError)` to make cleanup safe if the file has already been removed.

### **Interview-ready answer**

"The finally block is important for resource cleanup. It executes whether the operation succeeds or fails, so it is useful for deleting temporary files, closing file handles, and releasing resources. In my implementation, I use finally to remove temporary files after document processing. I would also initialize the temporary file path to None before the try block to avoid an unbound-variable error during cleanup."

## **27. How do you handle exceptions in background processing?**

### **Concept**

Background processing is useful when a task takes too long to execute during a normal API request.

For example, document ingestion may involve:

1. Downloading files.
2. Extracting text.
3. Splitting documents.
4. Generating embeddings.
5. Storing vectors.
6. Updating database records.

If this takes several seconds or minutes, we don't want the user to wait for the entire process inside the upload request.

Instead, we can accept the upload, create a processing task, and execute ingestion separately.

### **Recommended processing lifecycle**

\#chatgpt-mermaid-\_r_3h1\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3h1\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3h1\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3h1\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3h1\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3h1\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3h1\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3h1\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3h1\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3h1\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3h1\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3h1\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3h1\_ p{margin:0;}#chatgpt-mermaid-\_r_3h1\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3h1\_ .label text,#chatgpt-mermaid-\_r_3h1\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ .node rect,#chatgpt-mermaid-\_r_3h1\_ .node circle,#chatgpt-mermaid-\_r_3h1\_ .node ellipse,#chatgpt-mermaid-\_r_3h1\_ .node polygon,#chatgpt-mermaid-\_r_3h1\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ .rough-node .label text,#chatgpt-mermaid-\_r_3h1\_ .node .label text,#chatgpt-mermaid-\_r_3h1\_ .image-shape .label,#chatgpt-mermaid-\_r_3h1\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3h1\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ .rough-node .label,#chatgpt-mermaid-\_r_3h1\_ .node .label,#chatgpt-mermaid-\_r_3h1\_ .image-shape .label,#chatgpt-mermaid-\_r_3h1\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3h1\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3h1\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3h1\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3h1\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3h1\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3h1\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3h1\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3h1\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3h1\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3h1\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3h1\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3h1\_ .icon-shape,#chatgpt-mermaid-\_r_3h1\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3h1\_ .icon-shape p,#chatgpt-mermaid-\_r_3h1\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3h1\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3h1\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3h1\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3h1\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3h1\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3h1\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3h1\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3h1\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3h1\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3h1\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3h1\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3h1\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3h1\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3h1\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3h1\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3h1\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ .node rect,#chatgpt-mermaid-\_r_3h1\_ .node circle,#chatgpt-mermaid-\_r_3h1\_ .node ellipse,#chatgpt-mermaid-\_r_3h1\_ .node polygon,#chatgpt-mermaid-\_r_3h1\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3h1\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3h1\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3h1\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3h1\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3h1\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Upload documentCreate ProcessingTaskStatus: PENDINGWorker startsStatus: PROCESSINGDownload and parseChunk and generateembeddingsStore SQL and vectorsSuccess?Status: COMPLETEDStatus: FAILEDLog error and retain detailsRetry if eligibleYesNo

### **What happens in your implementation?**

Your `process_document_background()` function follows this pattern.

**Step 1: Retrieve processing task**

```
task = db.query(ProcessingTask).get(task_id)if not task:    logger.error(f"Task {task_id} not found")    return
```

**Step 2: Mark it as processing**

```
task.status = "processing"db.commit()
```

**Step 3: Execute document processing**

It downloads the file, loads it, splits it into chunks, generates embeddings, and stores the information.

**Step 4: Mark it completed**

```
task.status = "completed"task.document_id = document.iddb.commit()
```

**Step 5: Handle exceptions**

Your code uses:

```
except Exception as e:    logger.error(        f"Task {task_id}: Error processing document: {str(e)}"    )    logger.error(        f"Task {task_id}: Stack trace: {traceback.format_exc()}"    )    task.status = "failed"    task.error_message = str(e)    db.commit()
```

**Step 6: Clean up**

Finally, it attempts to remove the local temporary file.

Pasted text(20261125-081813).txt

### **How would you improve this for production?**

I would introduce the following safeguards:

| Improvement          | Why it matters                          |
| -------------------- | --------------------------------------- |
| Structured logging   | Easier debugging                        |
| Task status tracking | Know the processing state               |
| Retry mechanism      | Recover from temporary failures         |
| Retry limits         | Avoid infinite retries                  |
| Idempotency          | Prevent duplicate chunks                |
| Error categorization | Separate transient and permanent errors |
| Dead-letter queue    | Store repeatedly failing tasks          |
| Resource cleanup     | Avoid temporary file leaks              |
| Monitoring           | Track failures and processing duration  |

### **Important follow-up: What if the worker crashes?**

For a production application, I would use a durable task queue such as Celery with Redis or RabbitMQ, or a managed cloud task service.

I would not rely solely on an in-process background task for long-running, critical document ingestion.

A durable queue helps ensure tasks can be retried or recovered even if the application process restarts.

### **Interview-ready answer**

"In my document-ingestion pipeline, I handle background-processing exceptions using try-except-finally. I first mark the task as processing. If ingestion succeeds, I mark it completed. If an exception occurs, I log the error and stack trace, update the task status to failed, and save the error message. Finally, I clean up temporary files. For production, I would add retry handling, idempotency, monitoring, and a durable task queue so that worker crashes do not result in lost processing tasks."

# **Quick revision – Q21 to Q27**

| Question                  | Key concept                                         |
| ------------------------- | --------------------------------------------------- |
| 21. Why async?            | Non-blocking I/O and concurrency                    |
| 22. Sync vs async         | Blocking vs cooperative execution                   |
| 23. Factory pattern       | Centralized object creation                         |
| 24. Dependency injection  | Provide dependencies externally                     |
| 25. Temporary files       | Local processing and resource management            |
| 26. Finally block         | Guaranteed cleanup during normal exception handling |
| 27. Background exceptions | Logging, status tracking, retries and cleanup       |

## **Important code-review points to remember**

These are particularly useful if the interviewer asks you to review your own implementation.

1

**Async functions contain blocking operations**

GCS downloads, LangChain loaders, vector-store calls and synchronous SQL operations can block the event loop. Consider async clients or thread-pool execution.

2

**Temporary-file cleanup edge case**

Initialize `local_temp_path = None` before the `try` block to avoid an unbound-variable error in `finally`.

3

**Background task reliability**

For important long-running ingestion jobs, use a durable queue with retries and task monitoring.

4

**Factory pattern already used**

`EmbeddingsFactory` and `VectorStoreFactory` are concrete examples from your implementation.

# **Mock interview – Python and Backend**

Let's practise these questions one by one. I'll evaluate your answer as an interviewer and give you a score out of 10, corrections, and a stronger answer.

**Backend mock interview**

Question 1 of 7

## **Why do we use async functions in FastAPI, and does async automatically make every operation non-blocking?**

Hint: Think about event loops, await, I/O-bound operations, and synchronous libraries.

Submit answerPreviousNext


## System Design

28. Design a scalable document ingestion system.
29. How would you process 10,000 documents simultaneously?
30. How would you handle failed embedding requests?
31. How would you implement retry mechanisms?
32. How would you design a multi-tenant RAG platform?
33. How would you prevent cross-company data leakage?
34. How would you monitor embedding costs?
35. How would you handle millions of vector records?


# **System Design – Interview Preparation (Q28–Q35)**

These are high-value system-design questions for an AI Integration Engineer, Backend Engineer, or RAG Engineer interview.

We'll use your existing document-ingestion architecture as the starting point:

- **FastAPI:** Document upload and processing APIs.
- **Google Cloud Storage (GCS):** Original document storage.
- **LangChain:** Document loaders and chunking.
- **EmbeddingsFactory:** Embedding generation.
- **VectorStoreFactory:** Vector database abstraction.
- **SQL:** Document metadata, processing tasks, and chunk tracking.
- **MongoDB:** Vector storage.

Your code already demonstrates several ingestion steps, but the scalable architecture below includes additional production design recommendations. I'll distinguish the two.

## **28. Design a scalable document ingestion system.**

This is the most important question in this section.

### **1. Understand the requirements**

Imagine we're building a multi-tenant RAG platform.

Companies upload documents such as:

- PDF
- DOCX
- TXT
- Markdown

The system must:

1. Accept document uploads.
2. Store original documents.
3. Extract text.
4. Split documents into chunks.
5. Generate embeddings.
6. Store vectors.
7. Track processing status.
8. Support retries and document updates.
9. Prevent data leakage between companies.

### **2. High-level architecture**

[Production RAG: Learning from Scratch Done Right - by Priya](https://images.openai.com/static-rsc-4/1u-ggmINkvIWVrVCvVtCKMnj4N5-hFVcQQEYYYFvTL2wXerQutWZvHQ0E6VF-KMTccprEm2tByTYOrRbRAZrXjtM2-eh5CYx94iun2Kl6c7oLKH6YOp30ZN4cjRvuYkziA1Cv-Ts_uTacWb3YDNTyIwOg5Pu3RkU1gGnN9n4aSQ?purpose=inline)

[decodingai.com](https://www.decodingai.com/p/production-rag-from-scratch-senior-architect-guide?action=share\&utm_source=chatgpt.com)

Here is how I would design it:

\#chatgpt-mermaid-\_r_3jk\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3jk\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3jk\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3jk\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3jk\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3jk\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3jk\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3jk\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3jk\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3jk\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3jk\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3jk\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3jk\_ p{margin:0;}#chatgpt-mermaid-\_r_3jk\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3jk\_ .label text,#chatgpt-mermaid-\_r_3jk\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ .node rect,#chatgpt-mermaid-\_r_3jk\_ .node circle,#chatgpt-mermaid-\_r_3jk\_ .node ellipse,#chatgpt-mermaid-\_r_3jk\_ .node polygon,#chatgpt-mermaid-\_r_3jk\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ .rough-node .label text,#chatgpt-mermaid-\_r_3jk\_ .node .label text,#chatgpt-mermaid-\_r_3jk\_ .image-shape .label,#chatgpt-mermaid-\_r_3jk\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3jk\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ .rough-node .label,#chatgpt-mermaid-\_r_3jk\_ .node .label,#chatgpt-mermaid-\_r_3jk\_ .image-shape .label,#chatgpt-mermaid-\_r_3jk\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3jk\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3jk\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3jk\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3jk\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3jk\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3jk\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3jk\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3jk\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3jk\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3jk\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3jk\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3jk\_ .icon-shape,#chatgpt-mermaid-\_r_3jk\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3jk\_ .icon-shape p,#chatgpt-mermaid-\_r_3jk\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3jk\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3jk\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3jk\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3jk\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3jk\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3jk\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3jk\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3jk\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3jk\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3jk\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3jk\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3jk\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3jk\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3jk\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3jk\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3jk\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ .node rect,#chatgpt-mermaid-\_r_3jk\_ .node circle,#chatgpt-mermaid-\_r_3jk\_ .node ellipse,#chatgpt-mermaid-\_r_3jk\_ .node polygon,#chatgpt-mermaid-\_r_3jk\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3jk\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3jk\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3jk\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3jk\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3jk\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Client / FrontendFastAPI APIAuthentication and TenantValidationUpload ValidationGoogle Cloud StorageSQL Database: Document +TaskMessage QueueIngestion WorkersDocument ParserText ChunkingEmbedding ServiceVector DatabaseRAG Retrieval ServiceLLMResponse

### **3. Explain each component**

| Component         | Responsibility                    |
| ----------------- | --------------------------------- |
| FastAPI           | Receive upload requests           |
| Authentication    | Identify company and user         |
| GCS               | Store original files              |
| SQL               | Store metadata and task status    |
| Queue             | Decouple upload from processing   |
| Workers           | Process documents asynchronously  |
| Parser            | Extract document text             |
| Chunker           | Split text into manageable pieces |
| Embedding service | Convert chunks into vectors       |
| MongoDB/vector DB | Store vectors and metadata        |

### **4. End-to-end workflow**

**Step 1 – Upload**

Client sends a document to FastAPI.

The API validates:

- File type
- File size
- User permissions
- Tenant ownership

**Step 2 – Store original file**

Upload the document to GCS.

Example:

```
gs://company-documents/
    tenant_101/
        kb_1001/
            report.pdf
```

**Step 3 – Create processing task**

Save document metadata and a processing task in SQL.

```
document_id: 123
tenant_id: 101
status: PENDING
file_path: tenant_101/kb_1001/report.pdf
```

**Step 4 – Publish queue message**

```
{
  "task_id": 5001,
  "document_id": 123,
  "tenant_id": 101,
  "file_path": "tenant_101/kb_1001/report.pdf"
}
```

**Step 5 – Worker processing**

The worker:

1. Downloads the document.
2. Extracts text.
3. Splits it into chunks.
4. Generates embeddings.
5. Stores vectors and metadata.
6. Updates task status.

**Step 6 – Mark completed**

Once all required operations succeed, update the document status to `COMPLETED`.

### **5. How does your existing code compare?**

Your code already implements:

- GCS upload.
- PDF, DOCX, Markdown, and text loading.
- Recursive character chunking.
- Embedding initialization.
- Vector store initialization.
- SQL document and task tracking.
- Hash-based incremental processing in one processing path.



Pasted text(20261125-081813).txt

Pasted text(20261125-081813).txt

Pasted text(20261125-081813).txt



The production architecture adds a durable message queue, independent worker scaling, stronger tenant isolation, and reliable retries. These are design recommendations, not features demonstrated by the supplied source.

### **Interview-ready answer**

"I would design the system using an asynchronous, event-driven architecture. FastAPI would handle authentication, validation, and uploading documents to GCS. I would save document metadata and processing status in SQL, then publish a task to a durable message queue. Independent workers would download the document, extract text, split it into chunks, generate embeddings in batches, and store vectors in MongoDB. Finally, the worker would update the task status. This architecture separates API traffic from heavy processing and allows us to scale workers independently."

## **29. How would you process 10,000 documents simultaneously?**

First, understand that we should not process 10,000 documents directly inside FastAPI request handlers.

That can exhaust:

- CPU
- Memory
- Database connections
- Embedding API rate limits
- Network bandwidth

We need controlled concurrency.

### **Recommended architecture**

\#chatgpt-mermaid-\_r_3rg\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3rg\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3rg\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3rg\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3rg\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3rg\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3rg\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3rg\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3rg\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3rg\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3rg\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3rg\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3rg\_ p{margin:0;}#chatgpt-mermaid-\_r_3rg\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3rg\_ .label text,#chatgpt-mermaid-\_r_3rg\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ .node rect,#chatgpt-mermaid-\_r_3rg\_ .node circle,#chatgpt-mermaid-\_r_3rg\_ .node ellipse,#chatgpt-mermaid-\_r_3rg\_ .node polygon,#chatgpt-mermaid-\_r_3rg\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ .rough-node .label text,#chatgpt-mermaid-\_r_3rg\_ .node .label text,#chatgpt-mermaid-\_r_3rg\_ .image-shape .label,#chatgpt-mermaid-\_r_3rg\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3rg\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ .rough-node .label,#chatgpt-mermaid-\_r_3rg\_ .node .label,#chatgpt-mermaid-\_r_3rg\_ .image-shape .label,#chatgpt-mermaid-\_r_3rg\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3rg\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3rg\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3rg\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3rg\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3rg\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3rg\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3rg\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3rg\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3rg\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3rg\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3rg\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3rg\_ .icon-shape,#chatgpt-mermaid-\_r_3rg\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3rg\_ .icon-shape p,#chatgpt-mermaid-\_r_3rg\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3rg\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3rg\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3rg\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3rg\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3rg\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3rg\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3rg\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3rg\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3rg\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3rg\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3rg\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3rg\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3rg\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3rg\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3rg\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3rg\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ .node rect,#chatgpt-mermaid-\_r_3rg\_ .node circle,#chatgpt-mermaid-\_r_3rg\_ .node ellipse,#chatgpt-mermaid-\_r_3rg\_ .node polygon,#chatgpt-mermaid-\_r_3rg\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3rg\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3rg\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3rg\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3rg\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3rg\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}10,000 Upload RequestsFastAPIGCS + SQLMessage QueueWorker PoolParser WorkersChunk Batch QueueEmbedding WorkersVector DatabaseUpdate Processing Status

### **Step 1 – Use a message queue**

Instead of immediately processing every document, publish 10,000 tasks.

Possible technologies:

- Google Cloud Tasks
- Google Pub/Sub
- Celery with Redis
- RabbitMQ

For a GCP-based architecture, Pub/Sub or Cloud Tasks would be natural choices.

### **Step 2 – Use multiple workers**

For example:

```
Total documents = 10,000

Worker 1 -> Documents 1–100
Worker 2 -> Documents 101–200
Worker 3 -> Documents 201–300
...
```

The exact distribution is handled by the queue and worker system.

### **Step 3 – Batch embedding requests**

Suppose each document contains 100 chunks.

10,000 documents mean:

\\[ 10,000 \times 100 = 1,000,000 \text{ chunks} \\]

Instead of making one API request per chunk, send multiple chunks per embedding request, subject to the provider's limits.

```
def create_embedding_batches(chunks, batch_size=100):    for i in range(0, len(chunks), batch_size):        yield chunks[i:i + batch_size]
```

### **Step 4 – Apply rate limiting**

If the embedding provider permits only a certain number of requests or tokens per minute, workers must respect those limits.

Use:

- Token bucket or leaky bucket rate limiting.
- Concurrency limits.
- Exponential backoff.
- Batch sizing.

### **Step 5 – Autoscale workers**

Scale worker count based on:

- Queue depth.
- Queue message age.
- Processing latency.
- CPU and memory utilization.
- Embedding API throughput.

### **Step 6 – Make processing idempotent**

If a task runs twice, it should not create duplicate embeddings.

Use deterministic chunk IDs, content hashes, and unique constraints/upserts.

### **Important interview follow-up: Should we start 10,000 workers?**

No.

We should control concurrency based on downstream capacity.

For example, 10,000 simultaneous embedding requests could trigger rate limits and increase failures.

### **Interview-ready answer**

"I would use a message queue to decouple uploads from processing. The API would store documents in GCS and publish processing tasks. A horizontally scalable worker pool would consume these tasks. I would batch chunks before embedding, enforce provider rate limits, and autoscale workers based on queue depth and processing latency. I would also make processing idempotent so retries do not generate duplicate vectors."

## **30. How would you handle failed embedding requests?**

Embedding failures can happen for several reasons:

| Failure        | Example                   |
| -------------- | ------------------------- |
| Rate limit     | HTTP 429                  |
| Network issue  | Connection timeout        |
| Authentication | Invalid API key           |
| Server error   | HTTP 500 or 503           |
| Invalid input  | Unsupported or empty text |
| Token limit    | Input exceeds model limit |

### **Recommended approach**

First, classify failures into two categories.

**Transient failures**

These might succeed if retried:

- Timeout
- Network failure
- HTTP 429
- HTTP 500
- HTTP 503

**Permanent failures**

These usually require correction:

- Invalid API key
- Unsupported input
- Invalid request format
- Malformed document

### **Example implementation**

```
import asyncioimport randomasync def generate_embeddings_with_retry(    embedding_client,    texts,    max_retries=5):    for attempt in range(max_retries):        try:            return await embedding_client.aembed_documents(texts)        except Exception as exc:            if attempt == max_retries - 1:                raise            delay = min(2 ** attempt, 30)            delay += random.uniform(0, 1)            await asyncio.sleep(delay)
```

This is an illustrative retry pattern. A production implementation should inspect the provider's error code and retry only appropriate failures.

### **What if one chunk fails?**

Suppose you have 100 chunks.

- 95 embeddings succeed.
- 5 fail.

You should avoid regenerating all 100 embeddings.

Instead:

1. Record successful chunk IDs.
2. Identify failed chunk IDs.
3. Retry only failed chunks.
4. Mark the document complete only when all required chunks are stored.

### **Interview-ready answer**

"I would classify embedding failures into transient and permanent failures. For transient errors such as timeouts, rate limits, and server errors, I would implement exponential backoff with jitter and a retry limit. Permanent errors would be logged and marked for investigation rather than retried indefinitely. I would also track successful chunk IDs so that only failed chunks are retried, avoiding unnecessary embedding costs."

## **31. How would you implement retry mechanisms?**

This question is closely related to the previous one, but the interviewer wants to understand the architecture of retries.

### **1. Exponential backoff**

Instead of retrying immediately, gradually increase the waiting time.

For example:

| Attempt | Delay      |
| ------- | ---------- |
| 1       | 1 second   |
| 2       | 2 seconds  |
| 3       | 4 seconds  |
| 4       | 8 seconds  |
| 5       | 16 seconds |

Formula:

\\[ Delay = \min(InitialDelay \times 2^{attempt}, MaxDelay) \\]

### **2. Add jitter**

If 1,000 workers fail simultaneously and retry after exactly 2 seconds, they may overload the service again.

Jitter introduces randomness:

```
import randomdelay = min(2 ** attempt, 30)delay += random.uniform(0, 1)
```

### **3. Retry only retryable errors**

Example:

```
RETRYABLE_STATUS_CODES = {    429,    500,    502,    503,    504}
```

Do not retry every exception indiscriminately.

### **4. Dead-letter queue**

If a task fails repeatedly, move it to a dead-letter queue (DLQ).

\#chatgpt-mermaid-\_r_3sj\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3sj\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3sj\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3sj\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3sj\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3sj\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3sj\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3sj\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3sj\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3sj\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3sj\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3sj\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3sj\_ p{margin:0;}#chatgpt-mermaid-\_r_3sj\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3sj\_ .label text,#chatgpt-mermaid-\_r_3sj\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ .node rect,#chatgpt-mermaid-\_r_3sj\_ .node circle,#chatgpt-mermaid-\_r_3sj\_ .node ellipse,#chatgpt-mermaid-\_r_3sj\_ .node polygon,#chatgpt-mermaid-\_r_3sj\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ .rough-node .label text,#chatgpt-mermaid-\_r_3sj\_ .node .label text,#chatgpt-mermaid-\_r_3sj\_ .image-shape .label,#chatgpt-mermaid-\_r_3sj\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3sj\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ .rough-node .label,#chatgpt-mermaid-\_r_3sj\_ .node .label,#chatgpt-mermaid-\_r_3sj\_ .image-shape .label,#chatgpt-mermaid-\_r_3sj\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3sj\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3sj\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3sj\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3sj\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3sj\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3sj\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3sj\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3sj\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3sj\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3sj\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3sj\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3sj\_ .icon-shape,#chatgpt-mermaid-\_r_3sj\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3sj\_ .icon-shape p,#chatgpt-mermaid-\_r_3sj\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3sj\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3sj\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3sj\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3sj\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3sj\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3sj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3sj\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3sj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3sj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3sj\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3sj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3sj\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3sj\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3sj\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3sj\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3sj\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ .node rect,#chatgpt-mermaid-\_r_3sj\_ .node circle,#chatgpt-mermaid-\_r_3sj\_ .node ellipse,#chatgpt-mermaid-\_r_3sj\_ .node polygon,#chatgpt-mermaid-\_r_3sj\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3sj\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3sj\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3sj\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3sj\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3sj\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}QueueWorkerProcessing successful?Mark CompletedRetryable error?Dead Letter QueueRetry limit reached?Backoff and RetryYesNoNoYesNoYes

### **5. Track retry information**

Your task table could include:

| Field         | Purpose                                |
| ------------- | -------------------------------------- |
| status        | PENDING, PROCESSING, COMPLETED, FAILED |
| retry_count   | Number of attempts                     |
| max_retries   | Maximum attempts                       |
| last_error    | Most recent error                      |
| next_retry_at | Scheduled retry time                   |
| started_at    | Processing start                       |
| completed_at  | Processing completion                  |

### **6. Prevent duplicate processing**

Retrying a task must not create duplicate chunks.

Use:

- Deterministic IDs.
- Unique database constraints.
- Idempotent upserts.
- Task leases or processing locks.

### **Interview-ready answer**

"I would implement retries using exponential backoff with jitter. I would retry transient errors such as network failures, timeouts, and rate limits, but not permanent validation or authentication failures. I would maintain retry counts and task status in SQL or the queue, and move repeatedly failing tasks to a dead-letter queue. All processing operations would be idempotent so retries do not create duplicate embeddings."

## **32. How would you design a multi-tenant RAG platform?**

### **What is multi-tenancy?**

Multi-tenancy means one application serves multiple companies while ensuring that each company's data remains isolated.

For example:

- Company A uploads financial reports.
- Company B uploads HR documents.
- Company C uploads legal documents.

All companies use the same platform, but they must not access one another's data.

### **Recommended architecture**

[Top 10 LLM + RAG Architectures for FinTech Operations](https://images.openai.com/static-rsc-4/bqQ8oiXnILbZ7wQeV09kUu4MoCKSMNPKVAJi1HFlFfMYd3xj7B8px5C0c1Sf_9bfGqMyJe7BmmJciKva2c3S-89rZh0ekWW-bPNuOb9N6CJK4h6w0gJzJMOkrQTqtahRWSWvgOawtJfVU5OIpiCGBxjjq-LGnOeF9nLyJobp97M?purpose=inline)

[tericsoft.com](https://www.tericsoft.com/blogs/top-10-llm-rag-architectures-for-fintech-operations?utm_source=chatgpt.com)

### **1. Tenant-aware database design**

Every relevant entity should have a tenant identifier.

Example:

**Documents**

| id  | tenant_id | file_name  |
| --- | --------- | ---------- |
| 101 | Company A | report.pdf |
| 102 | Company B | policy.pdf |

**Chunks**

| chunk_id | tenant_id | document_id |
| -------- | --------- | ----------- |
| c1       | Company A | 101         |
| c2       | Company A | 101         |
| c3       | Company B | 102         |

### **2. Tenant-aware GCS structure**

```
documents/
    tenant_101/
        kb_1001/
            report.pdf

    tenant_102/
        kb_2001/
            policy.pdf
```

### **3. Vector database isolation**

There are three common strategies:

| Strategy                  | Description                                       | Best suited for             |
| ------------------------- | ------------------------------------------------- | --------------------------- |
| Shared collection         | All tenants in one collection, filtered by tenant | Many tenants                |
| Separate collection       | One collection per tenant                         | Stronger logical separation |
| Separate database/cluster | Dedicated infrastructure                          | High-security tenants       |

The choice depends on scale, cost, compliance, and isolation requirements.

### **4. Tenant-aware retrieval**

Every retrieval query must include the authenticated tenant identifier.

Example:

```
tenant_id = current_user.tenant_idresults = vector_store.similarity_search(    query,    k=5,    filter={        "tenant_id": tenant_id    })
```

Never trust a tenant ID supplied directly by the frontend without validating it against the authenticated user's permissions.

### **5. Tenant-aware processing**

When a worker receives a task, it must verify:

- The document belongs to the tenant.
- The knowledge base belongs to the tenant.
- The storage path belongs to the tenant.
- Vector metadata contains the correct tenant ID.

### **Interview-ready answer**

"I would design the platform with tenant-aware data isolation across SQL, GCS, and the vector database. Every document, knowledge base, processing task, and chunk would be associated with a tenant ID. During retrieval, the tenant ID would come from the authenticated user's context, not from an untrusted frontend parameter. Depending on security and scale requirements, I would use shared collections with mandatory metadata filtering or dedicated collections for stronger isolation."

## **33. How would you prevent cross-company data leakage?**

This is a critical security question.

Imagine:

- Company A asks: "What is our annual revenue?"
- Company B has a document containing its annual revenue.

Company A must never retrieve Company B's chunks.

### **Five layers of protection**

\#chatgpt-mermaid-\_r_3ta\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3ta\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3ta\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3ta\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3ta\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3ta\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3ta\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3ta\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3ta\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3ta\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3ta\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3ta\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3ta\_ p{margin:0;}#chatgpt-mermaid-\_r_3ta\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3ta\_ .label text,#chatgpt-mermaid-\_r_3ta\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ .node rect,#chatgpt-mermaid-\_r_3ta\_ .node circle,#chatgpt-mermaid-\_r_3ta\_ .node ellipse,#chatgpt-mermaid-\_r_3ta\_ .node polygon,#chatgpt-mermaid-\_r_3ta\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ .rough-node .label text,#chatgpt-mermaid-\_r_3ta\_ .node .label text,#chatgpt-mermaid-\_r_3ta\_ .image-shape .label,#chatgpt-mermaid-\_r_3ta\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3ta\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ .rough-node .label,#chatgpt-mermaid-\_r_3ta\_ .node .label,#chatgpt-mermaid-\_r_3ta\_ .image-shape .label,#chatgpt-mermaid-\_r_3ta\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3ta\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3ta\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3ta\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3ta\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3ta\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3ta\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3ta\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3ta\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3ta\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3ta\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3ta\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3ta\_ .icon-shape,#chatgpt-mermaid-\_r_3ta\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3ta\_ .icon-shape p,#chatgpt-mermaid-\_r_3ta\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3ta\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3ta\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3ta\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3ta\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3ta\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3ta\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3ta\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3ta\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3ta\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3ta\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3ta\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3ta\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3ta\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3ta\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3ta\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3ta\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ .node rect,#chatgpt-mermaid-\_r_3ta\_ .node circle,#chatgpt-mermaid-\_r_3ta\_ .node ellipse,#chatgpt-mermaid-\_r_3ta\_ .node polygon,#chatgpt-mermaid-\_r_3ta\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3ta\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3ta\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3ta\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3ta\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3ta\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Authenticated RequestResolve Tenant IdentityValidate Resource OwnershipApply Tenant FilterVector RetrievalVerify Retrieved MetadataLLM Context AssemblyReturn Response

**Layer 1 – Authentication**

Identify the user and their authorized company using a trusted identity source.

**Layer 2 – SQL ownership validation**

Before processing or retrieving a document, verify that it belongs to the authenticated tenant.

**Layer 3 – GCS isolation**

Use tenant-specific object paths and IAM policies where appropriate.

**Layer 4 – Vector metadata filtering**

Always filter vector searches by tenant ID.

```
filter = {    "tenant_id": authenticated_tenant_id,    "kb_id": authorized_kb_id}
```

**Layer 5 – Validate retrieved results**

Before passing retrieved chunks to the LLM, verify their tenant and knowledge-base ownership.

### **What if a developer forgets the filter?**

A dangerous design is allowing individual services to decide whether to include the tenant filter.

A better design is to enforce tenant scoping centrally in a retrieval service or repository layer, and test that unscoped retrieval cannot be invoked in production.

Additional controls:

- Database row-level security where supported.
- Separate credentials or namespaces for sensitive tenants.
- Audit logs.
- Automated cross-tenant security tests.
- No tenant-controlled access to arbitrary collection names.

### **Interview-ready answer**

"I would implement defense in depth. Tenant identity would come from the authenticated session or token. I would validate resource ownership in SQL, enforce tenant-specific GCS access, and apply mandatory tenant and knowledge-base filters to every vector query. Before sending retrieved chunks to the LLM, I would validate their ownership again. I would also add automated tests that attempt cross-tenant access to ensure data isolation."

## **34. How would you monitor embedding costs?**

Embedding cost can become significant when processing thousands or millions of chunks.

### **First, understand what drives the cost**

The main factors are:

1. Total input tokens.
2. Embedding model pricing.
3. Number of documents.
4. Average chunks per document.
5. Reprocessing frequency.
6. Duplicate embedding generation.

### **Cost calculation**

A simplified formula:

\\[ TotalCost = \frac{TotalTokens}{1,000,000} \times PricePerMillionTokens \\]

For example, suppose:

- 10 million input tokens.
- Model price: $0.02 per million tokens.

Then:

\\[ Cost = 10 \times 0.02 = \\$0.20 \\]

This is only an illustrative calculation, not a current provider price.

### **What metrics would I track?**

| Metric                      | Why monitor it?                |
| --------------------------- | ------------------------------ |
| Total embedding tokens      | Measure consumption            |
| Embedding API requests      | Track request volume           |
| Cost per document           | Understand document-level cost |
| Cost per tenant             | Support chargeback             |
| Average chunks per document | Identify unusual documents     |
| Cache hit rate              | Measure duplicate work avoided |
| Retry count                 | Identify wasted API calls      |
| Failed embedding rate       | Monitor reliability            |
| Embedding latency           | Monitor performance            |

### **Architecture**

\#chatgpt-mermaid-\_r_3tn\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3tn\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3tn\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3tn\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3tn\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3tn\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3tn\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3tn\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3tn\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3tn\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3tn\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3tn\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3tn\_ p{margin:0;}#chatgpt-mermaid-\_r_3tn\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3tn\_ .label text,#chatgpt-mermaid-\_r_3tn\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ .node rect,#chatgpt-mermaid-\_r_3tn\_ .node circle,#chatgpt-mermaid-\_r_3tn\_ .node ellipse,#chatgpt-mermaid-\_r_3tn\_ .node polygon,#chatgpt-mermaid-\_r_3tn\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ .rough-node .label text,#chatgpt-mermaid-\_r_3tn\_ .node .label text,#chatgpt-mermaid-\_r_3tn\_ .image-shape .label,#chatgpt-mermaid-\_r_3tn\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3tn\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ .rough-node .label,#chatgpt-mermaid-\_r_3tn\_ .node .label,#chatgpt-mermaid-\_r_3tn\_ .image-shape .label,#chatgpt-mermaid-\_r_3tn\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3tn\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3tn\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3tn\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3tn\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3tn\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3tn\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3tn\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3tn\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3tn\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3tn\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3tn\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3tn\_ .icon-shape,#chatgpt-mermaid-\_r_3tn\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3tn\_ .icon-shape p,#chatgpt-mermaid-\_r_3tn\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3tn\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3tn\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3tn\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3tn\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3tn\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3tn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3tn\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3tn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3tn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3tn\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3tn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3tn\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3tn\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3tn\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3tn\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3tn\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ .node rect,#chatgpt-mermaid-\_r_3tn\_ .node circle,#chatgpt-mermaid-\_r_3tn\_ .node ellipse,#chatgpt-mermaid-\_r_3tn\_ .node polygon,#chatgpt-mermaid-\_r_3tn\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3tn\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3tn\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3tn\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3tn\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3tn\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Document ProcessingWorkerToken CounterEmbedding APIUsage and Cost RecordsMetrics DatabaseMonitoring DashboardAlerts and Budget Limits

### **Practical optimizations**

**1. Hash-based deduplication**

Skip unchanged chunks before embedding.

Your existing incremental processing function already follows this approach.

**2. Batch requests**

Reduce request overhead while respecting provider limits.

**3. Embedding cache**

Cache embeddings using a key such as:

```
cache_key = hash(    embedding_model_version + chunk_hash)
```

The model version is important: embeddings from different models or incompatible configurations should not be mixed.

**4. Avoid unnecessary reprocessing**

Only re-embed new or modified chunks.

**5. Tenant-level budgets**

Set limits for each company and alert when consumption crosses a threshold.

### **Interview-ready answer**

"I would track embedding usage at the tenant, document, and processing-task levels. I would record token consumption, API requests, latency, failures, retries, and estimated cost. To reduce costs, I would use hash-based deduplication, batch embedding requests, cache reusable embeddings, and avoid unnecessary reprocessing. I would also introduce tenant-level budgets and alerts."

## **35. How would you handle millions of vector records?**

This question tests whether you understand vector database scalability.

Imagine:

- 100,000 documents.
- 100 chunks per document.
- 10 million vector records.

A simple vector search that scans every vector becomes expensive as the dataset grows.

### **1. Use Approximate Nearest Neighbor (ANN)**

Instead of calculating exact distances against every vector, use ANN indexes.

Popular indexing approaches:

| Index  | Concept                                    |
| ------ | ------------------------------------------ |
| HNSW   | Graph-based nearest-neighbor search        |
| IVF    | Clusters vectors into partitions           |
| IVF-PQ | Combines clustering and vector compression |

**HNSW** is a particularly useful concept to understand for interviews.

[��������� ��������� ���� ������ �� ���� ������� ���������](https://images.openai.com/static-rsc-4/wrpHaoGEIL23ueB6sT-0LdC1wh88-1NSJXNlKxPXoCHA-3NNIvOwXEUT9tuYyzyc51OVcqOSGZ5_u7gLH2XKxHmfFwDqBH2H9K8nYxyGaggIZlhjSmx3XbdraAO6u82EeRSg8iZph1K5MVohHWJViM_EpiurjN2oP86l24NQ1e0?purpose=inline)

[ai-news.ru](https://ai-news.ru/2026/04/obyasnyaem_vektornye_bazy_dannyh_na_treh_urovnyah_slozhnosti.html?utm_source=chatgpt.com)

It organizes vectors into graph layers.

The search navigates the graph to find likely nearest neighbors without comparing every vector.

Trade-off: ANN may sacrifice some recall for faster search.

### **2. Partition the data**

Partition by:

- Tenant ID.
- Knowledge base ID.
- Region.
- Business domain.

This reduces the amount of data each search needs to consider, provided the vector database supports the relevant partitioning and filtering efficiently.

### **3. Use metadata filtering**

Example:

```
results = vector_store.similarity_search(    query,    k=10,    filter={        "tenant_id": tenant_id,        "kb_id": kb_id    })
```

### **4. Use batch insertion**

Do not insert millions of vectors one at a time.

Use batches.

```
BATCH_SIZE = 500for i in range(0, len(chunks), BATCH_SIZE):    batch = chunks[i:i + BATCH_SIZE]    vector_store.add_documents(batch)
```

The actual batch size should be benchmarked based on vector dimensions, provider limits, payload size, and memory.

### **5. Control memory usage**

Avoid loading all documents and embeddings into application memory.

Use streaming or batch-based processing:

```
Read 500 chunks
    ↓
Generate embeddings
    ↓
Insert vectors
    ↓
Release memory
    ↓
Read next 500 chunks
```

### **6. Optimize storage**

Vector records can consume substantial storage.

For example:

A 1,536-dimensional float32 vector uses:

\\[ 1536 \times 4 = 6144 \text{ bytes} \\]

That is approximately 6 KB per vector, excluding metadata and database/index overhead.

For 10 million vectors:

\\[ 10,000,000 \times 6 \text{ KB} \approx 60 \text{ GB} \\]

This is raw vector storage only.

### **7. Monitor performance**

Important metrics:

- Vector count.
- Index size.
- Search latency.
- Recall\@K.
- Insertion throughput.
- Memory utilization.
- CPU utilization.
- Query timeout rate.

### **Interview-ready answer**

"For millions of vector records, I would use a vector database that supports approximate nearest-neighbor indexing, such as HNSW or IVF. I would partition or filter data using tenant and knowledge-base metadata, batch vector insertions, and avoid loading all chunks into memory. I would also monitor index size, insertion throughput, search latency, and retrieval recall. The choice of index and partitioning strategy would depend on the dataset size, query pattern, and latency requirements."

# **Quick revision – Q28 to Q35**

| Question                | Key concept                              |
| ----------------------- | ---------------------------------------- |
| 28. Scalable ingestion  | Event-driven architecture                |
| 29. 10,000 documents    | Queue + worker pool + autoscaling        |
| 30. Failed embeddings   | Error classification + retries           |
| 31. Retry mechanism     | Exponential backoff + jitter + DLQ       |
| 32. Multi-tenant RAG    | Tenant-aware storage and retrieval       |
| 33. Data leakage        | Defense in depth + mandatory filtering   |
| 34. Embedding costs     | Token tracking + deduplication + budgets |
| 35. Millions of vectors | ANN + partitioning + batching            |

## **Architecture you should be able to draw in an interview**

## **Production RAG ingestion architecture**

**FastAPI + Authentication**

Upload, validation, tenant resolution

**GCS**

Original files

**SQL**

Metadata and task status

**Durable Message Queue**

Task distribution, retries, dead-letter queue

**Horizontally Scalable Workers**

Parse → Chunk → Deduplicate → Embed

**Vector Database**

ANN index + tenant metadata + embeddings

**RAG Retrieval → LLM → Response**

Tenant-scoped retrieval and answer generation

# **Mock interview – System Design**

For this section, I recommend practising with verbal explanations rather than memorizing definitions. Interviewers often ask follow-up questions to test your architectural decisions.

**System design mock interview**

Question 1 of 6

## **Design a scalable document ingestion system. Explain the complete flow from upload to vector storage.**

Hint: Cover API, GCS, SQL, queue, workers, chunking, embeddings, and vector storage.

Submit for evaluationPreviousNext

**My recommendation:** Spend extra time on Q28, Q29, Q32, and Q33. These four questions can easily turn into a 20–30 minute system-design discussion.



### The five concepts you should be able to explain on a whiteboard

1. How a document travels from FastAPI to GCS.
2. How document loaders extract text and chunking divides it.
3. How embeddings convert text into vectors.
4. How SQL and vector databases work together.
5. How RAG retrieves relevant information and generates an answer.

These are the **five most important concepts to explain confidently in your RAG/document-ingestion interview**. I'll walk through each as if you were standing in front of an interviewer drawing the architecture on a whiteboard.

I'll connect each explanation to your uploaded Python implementation and clearly distinguish between **what your code implements** and **what you should explain as the complete RAG architecture**.

# **1. How a document travels from FastAPI to GCS**

Implemented in your code

### **Whiteboard diagram**

**Client / Frontend**

Uploads PDF, DOCX, TXT or Markdown

**FastAPI Upload Endpoint**

Receives UploadFile and kb_id

**upload_document()**

1. Reads file content
2. Calculates file size
3. Generates SHA-256 hash
4. Sanitizes filename
5. Determines content type

**Google Cloud Storage (GCS)**

Stores original document

kb_123/annual_report.pdf

**UploadResult**

file_path, file_name, file_size, content_type, file_hash

### **Understand the code**

Your implementation:

```
async def upload_document(    file: UploadFile,    kb_id: int) -> UploadResult:    content = await file.read()    file_size = len(content)    file_hash = hashlib.sha256(content).hexdigest()    file_name = "".join(        c for c in file.filename        if c.isalnum() or c in ('-', '_', '.')    ).strip()    object_path = f"kb_{kb_id}/{file_name}"    gcs_client = GCSManager()    bucket_name = settings.GCS_BUCKET_NAME    gcs_client.bucket(bucket_name).blob(        object_path    ).upload_from_file(        BytesIO(content),        content_type=content_type    )
```

### **What should you explain?**

- `UploadFile` receives the uploaded file through FastAPI.
- `await file.read()` reads the file content.
- SHA-256 generates a fingerprint of the original file.
- The filename is sanitized before constructing the storage path.
- `GCSManager` provides access to the Google Cloud Storage bucket.
- The file is uploaded as a GCS blob.
- The function returns metadata about the uploaded file.

**Important interview point:** GCS stores the original document, not the embeddings. Embeddings and searchable chunks are created during the subsequent processing stage.

### **Interview question**

**Why do you store the original document in GCS instead of directly storing it in SQL?**

Good answer:

"Documents can be large binary objects. GCS is designed for scalable object storage, while SQL is better suited for structured metadata, relationships, and processing status. I store the original document in GCS and maintain its file path, hash, size, and associated metadata in the database."

**One improvement:** Your current implementation reads the entire file into memory. For large documents, I would consider streaming uploads and enforcing file-size limits.

# **2. How document loaders extract text and chunking divides it**

Implemented in your code

### **Whiteboard diagram**

**Original document in GCS**

**Download to temporary file**

**Document loader selection**

**PDF**

PyPDFLoader

**DOCX**

Docx2txtLoader

**Markdown**

UnstructuredMarkdownLoader

**TXT**

TextLoader

**Extracted LangChain Documents**

page_content + metadata

**RecursiveCharacterTextSplitter**

chunk_size = 1000, overlap = 200

**Multiple text chunks**

Chunk 1 · Chunk 2 · Chunk 3 · Chunk 4

### **What is a document loader?**

A document loader extracts readable content from different file formats.

For example:

- PDF loader extracts text from PDF pages.
- DOCX loader extracts text from Word documents.
- Markdown loader extracts Markdown content.
- Text loader reads plain-text files.

Your code selects the loader using the file extension:

```
if ext == ".pdf":    loader = PyPDFLoader(temp_path)elif ext == ".docx":    loader = Docx2txtLoader(temp_path)elif ext == ".md":    loader = UnstructuredMarkdownLoader(temp_path)else:    loader = TextLoader(temp_path)documents = loader.load()
```

The output is a list of LangChain `Document` objects.

Each document contains:

```
Document(    page_content="Extracted document text...",    metadata={        "source": "annual_report.pdf",        "page": 1    })
```

Metadata can help identify the source and page when retrieving information later.

### **What is chunking?**

Chunking means splitting a large document into smaller pieces so that each piece can be independently embedded and searched.

For example, imagine this document:

```
Company Annual Report

Section 1: Company Overview
Section 2: Financial Performance
Section 3: Revenue Growth
Section 4: Future Strategy
```

Instead of embedding the entire document as one large piece, we divide it:

**Illustration of chunk overlap**

Chunk 1

Company overview and business operations...

Chunk 2

Overlapping context from previous chunk

Company overview and business operations...

Financial performance and revenue...

Chunk 3

Overlapping context from previous chunk

Financial performance and revenue...

Future strategy and business expansion...

Conceptual illustration, not an exact character-by-character split.

Your code:

```
text_splitter = RecursiveCharacterTextSplitter(    chunk_size=1000,    chunk_overlap=200)chunks = text_splitter.split_documents(documents)
```

**What do these parameters mean?**

| Parameter           | Meaning                                 |
| ------------------- | --------------------------------------- |
| `chunk_size=1000`   | Target maximum chunk size in characters |
| `chunk_overlap=200` | Shared text between consecutive chunks  |

Why overlap?

Imagine a sentence is split between two chunks. Without overlap, the second chunk might lose important context. Overlap helps preserve continuity.

### **Interview question**

**Why don't you embed the entire document at once?**

"Because large documents may exceed the embedding model's input limits, and retrieving an entire document is less precise. Chunking allows us to search smaller, more relevant sections. We also use overlap to preserve context between adjacent chunks."

# **3. How embeddings convert text into vectors**

Embedding factory implemented; embedding execution is delegated to the vector-store integration

### **Whiteboard diagram**

**Text Chunk**

"Company revenue increased by 20%."

**Embedding Model**

EmbeddingsFactory.create()

**Numerical Vector**

## **[0.12, -0.45, 0.78, 0.21, ...]**

Illustrative values, not actual model output

**Vector Database**

Stores vector + chunk content + metadata

### **What is an embedding?**

An embedding is a numerical representation of text.

An embedding model converts text into a vector — a list of floating-point numbers.

For example:

```
"Revenue increased by 20%"
```

Might become:

```
[0.12, -0.45, 0.78, 0.21, ...]
```

The actual vector dimension depends on the embedding model.

The important idea is that semantically similar text should generally have vectors that are close in the embedding space.

For example:

- "Revenue increased by 20%."
- "The company's sales grew by 20%."

These sentences use different words but express similar meanings.

### **How does your code create embeddings?**

```
embeddings = EmbeddingsFactory.create()vector_store = VectorStoreFactory.create(    store_type=settings.VECTOR_STORE_TYPE,    collection_name=f"kb_{kb_id}",    embedding_function=embeddings)
```

Your code creates an embedding implementation through `EmbeddingsFactory` and passes it to the vector store.

Later:

```
vector_store.add_documents(documents_to_update)
```

The vector-store integration uses the configured embedding function to embed the document content when adding documents, assuming the factory's implementation follows the standard LangChain vector-store interface.

**Important:** Your code does not explicitly call `embed_documents()` in this function. Do not claim that it does.

### **What is cosine similarity?**

Cosine similarity measures the angle between two vectors.

\\[ \text{similarity}(A,B)= \frac{A\cdot B}{\\|A\\|\\|B\\|} \\]

In simple terms:

- Similar direction → more similar meaning.
- Different direction → less similar meaning.

This is one common way to compare embeddings. The actual distance or scoring method depends on the vector database configuration.

### **Interview question**

**Why do we use embeddings instead of normal keyword search?**

"Keyword search looks for matching words, whereas embeddings represent semantic meaning. For example, if a user searches for 'company sales growth', embeddings can help retrieve a passage mentioning 'revenue increased' even though the exact words are different."

# **4. How SQL and vector databases work together**

Both storage paths are represented in your code

This is particularly important because interviewers often ask why an application needs two databases.

### **Whiteboard diagram**

**Document ingestion**

**Application processing**

**SQL Database**

Structured records

Documents

Knowledge bases

Processing tasks

**Vector Database**

Semantic search data

Embeddings

Chunk content

Metadata

**RAG retrieval**

Find relevant chunks and their source information

### **SQL database: What does it store?**

SQL is suitable for structured application information.

For example:

| Table              | Information                               |
| ------------------ | ----------------------------------------- |
| `knowledge_bases`  | Knowledge base details                    |
| `documents`        | File name, path, size, hash               |
| `processing_tasks` | Processing status and errors              |
| `document_chunks`  | Chunk identifiers and associated metadata |

Your code creates a `Document` record and `DocumentChunk` records using SQLAlchemy models. It also tracks task status through `ProcessingTask`.

### **Vector database: What does it store?**

The vector store is designed for similarity-based retrieval.

A record conceptually looks like this:

```
{    "id": "chunk_123",    "text": "Company revenue increased by 20%.",    "embedding": [0.12, -0.45, 0.78],    "metadata": {        "kb_id": 123,        "document_id": 456,        "file_name": "annual_report.pdf"    }}
```

Your background-processing path initializes a Mongo-backed vector store and adds the processed chunks.

### **Why do we need both?**

| SQL                | Vector database          |
| ------------------ | ------------------------ |
| Structured queries | Similarity search        |
| Relationships      | Embedding storage        |
| Transactions       | Vector indexing          |
| Task status        | Semantic retrieval       |
| Document ownership | Relevant chunk discovery |

**A useful interview answer:**

"I use SQL as the application metadata and workflow layer. It tracks documents, knowledge bases, processing tasks, and relationships. The vector database stores embeddings and associated chunk data so we can retrieve semantically relevant content. SQL answers questions about the application records; the vector database answers questions about the meaning of the document content."

### **Important consistency issue**

SQL and the vector database generally do not share one atomic transaction.

Imagine:

1. SQL successfully stores a chunk.
2. Vector database insertion fails.
3. The SQL record exists, but the chunk cannot be retrieved through vector search.

In production, I would handle this with:

- Processing states.
- Idempotent writes.
- Retry mechanisms.
- Reconciliation jobs.
- Transactional outbox where appropriate.

Your implementation has SQL and vector-store writes, but does not demonstrate a distributed transaction or transactional outbox.

# **5. How RAG retrieves relevant information and generates an answer**

Conceptual query-time architecture — not implemented in the uploaded source

This is the most important concept to explain because it connects all the previous four concepts.

### **Whiteboard diagram**

**User asks a question**

"How much did revenue increase?"

**Query Embedding**

Convert question into a vector

**Vector Similarity Search**

Find the closest matching document chunks

**Top-K Relevant Chunks**

For example, the 5 most relevant chunks

**Prompt Construction**

System instructions + context + user question

**LLM Generation**

Generate an answer using retrieved context

**Final Answer**

"Revenue increased by 20%, according to the annual report."

### **Understand the complete process**

**Step 1: User asks a question**

```
What was the company's revenue growth?
```

**Step 2: Convert the question into an embedding**

Use the same compatible embedding model that was used during document ingestion.

```
query_vector = embeddings.embed_query(    "What was the company's revenue growth?")
```

**Step 3: Search the vector database**

Find chunks whose vectors are most similar to the query vector.

Conceptually:

```
results = vector_store.similarity_search(    query="What was the company's revenue growth?",    k=5)
```

Here, `k=5` means retrieving up to five relevant chunks.

**Step 4: Build the prompt**

Combine the retrieved chunks with the user's question.

```
prompt = f"""Answer the question using only the provided context.Context:{retrieved_context}Question:{user_question}If the answer is not available in the context,say that you don't have enough information."""
```

**Step 5: Send the prompt to the LLM**

The LLM uses the retrieved information to generate a natural-language response.

**Step 6: Return the answer**

Return the response to the user, ideally with source references such as the document name and page number.

### **Why is this called RAG?**

RAG stands for **Retrieval-Augmented Generation**.

- Retrieval: Find relevant information from external documents.
- Augmented: Add that information to the LLM's context.
- Generation: Ask the LLM to generate an answer using that context.

The benefit is that the LLM can answer using your private or updated documents rather than relying only on its training data.

**Important distinction:** Your uploaded code implements the document ingestion side: loading, chunking, embedding integration, and storage. It does not show query embedding, similarity retrieval, prompt construction, or LLM generation. Explain the last diagram as the complete RAG design, not as functionality proven by that file.

# **How all five concepts connect**

This is the one diagram I would practise drawing from memory before your interview.

## **Complete RAG architecture**

**1. FastAPI receives document**

**2. Original document stored in GCS**

**3. Loaders extract text and chunk it**

**4. Embedding model converts chunks to vectors**

**SQL**

Document metadata and tasks

**Vector DB**

Embeddings and searchable chunks

**5. User query → retrieval → relevant context**

**LLM generates final answer**

# **Test yourself: Whiteboard mock interview**

Let's practise as if this were a real interview. I'll ask one question at a time. You explain it in your own words, and I'll evaluate your answer out of 10.

**Whiteboard interview**

Question 1 of 5

## **Explain how a document travels from FastAPI to Google Cloud Storage in your implementation.**

**Points to cover**

Mention UploadFile, file.read(), SHA-256, filename sanitization, GCS bucket/blob and UploadResult.

Previous

Submit answerNext

**My recommendation:** Practise drawing the complete architecture in under 3 minutes, then spend another 2 minutes explaining the difference between ingestion and retrieval. That distinction will make your answers much stronger.