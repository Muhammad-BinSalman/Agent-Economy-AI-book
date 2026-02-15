# Feature Specification: Integrated RAG Chatbot for Published Books

**Feature Branch**: `001-rag-chatbot`
**Created**: 2026-02-04
**Status**: Draft
**Input**: User description: Build a complete, production-ready, embeddable RAG chatbot backend that uses only the book's content as knowledge source, supports two modes (full-book RAG and selected-text mode), powered exclusively by Cohere models through OpenAI Agents SDK via Cohere's official OpenAI-compatible endpoint

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ingest Book Content (Priority: P1)

An author or publisher has a digital book (markdown, text files, or PDF) that they want to make queryable through an AI assistant. They need to process the book content so it can be searched and referenced by the chatbot.

**Why this priority**: This is the foundational capability. Without ingested content, the chatbot has no knowledge base to operate on. This enables all other user stories.

**Independent Test**: Can be fully tested by running the ingestion script on a sample book directory and verifying that (a) chunks are created, (b) vectors are stored in the vector database, and (c) metadata is recorded in the metadata store. Delivers the core value of making book content searchable.

**Acceptance Scenarios**:

1. **Given** a directory containing markdown/text book files, **When** the ingestion script is executed, **Then** the system splits content into chunks, generates embeddings, stores vectors in the vector database, and records metadata
2. **Given** a previously ingested book, **When** the ingestion script is run again, **Then** the system updates existing chunks without creating duplicates (idempotent behavior)
3. **Given** a book with chapters and sections, **When** content is ingested, **Then** each chunk retains metadata about its source (chapter, section, position) for accurate citations
4. **Given** ingestion fails mid-process, **When** the error occurs, **Then** the system reports the specific file and error, leaving already-processed chunks intact

---

### User Story 2 - Ask Book Questions via Full-Book RAG (Priority: P2)

A reader is studying a book and wants to ask questions about concepts, explanations, or examples from anywhere in the book. They type a natural language query and receive an accurate answer based on relevant passages from the book, with proper citations.

**Why this priority**: This is the primary value proposition - readers can get instant, contextually relevant answers from the book. It delivers the core "AI study assistant" value.

**Independent Test**: Can be fully tested by ingesting a sample book, sending chat queries via API endpoint, and verifying that (a) responses are accurate and grounded in book content, (b) responses include citations to specific passages, and (c) the system declines to answer questions outside the book's scope. Delivers the core interactive Q&A experience.

**Acceptance Scenarios**:

1. **Given** an ingested book, **When** a reader asks a question about book content, **Then** the system retrieves relevant passages, generates an answer based ONLY on those passages, and includes citations
2. **Given** a reader asks a multi-part question, **When** the query is processed, **Then** the system synthesizes information from multiple relevant chunks into a coherent response
3. **Given** a reader asks a question unrelated to the book content, **When** no relevant chunks are found, **Then** the system responds with a fallback message stating it cannot answer from the provided book content
4. **Given** a reader asks an ambiguous question, **When** multiple interpretations exist, **Then** the system provides an answer based on the most likely interpretation using book context, or asks for clarification if truly ambiguous
5. **Given** concurrent chat requests from multiple readers, **When** requests are processed simultaneously, **Then** all requests receive accurate responses without performance degradation

---

### User Story 3 - Ask Questions About Selected Text (Priority: P3)

A reader highlights a specific passage in the digital book (e.g., a complex paragraph or code example) and wants to ask focused questions about that specific text. The system should prioritize the selected passage in its response while still retrieving additional context from the book if needed.

**Why this priority**: This is a key differentiator from generic chatbots. Selected-text mode enables deep, focused learning on specific passages, which is critical for exam preparation and concept mastery. It enhances the study experience beyond general Q&A.

**Independent Test**: Can be fully tested by sending chat requests with a `selected_text` field containing a book passage and a query about that passage, verifying that (a) the response prioritizes the selected text, (b) the response includes citations to both selected text and any additional retrieved chunks, and (c) the system accurately answers questions that require understanding the specific selected passage. Delivers focused, passage-specific Q&A capability.

**Acceptance Scenarios**:

1. **Given** a reader has selected a passage from the book, **When** they ask a question about that passage via the selected-text endpoint, **Then** the system uses the selected text as the primary context and retrieves additional relevant chunks only if needed for completeness
2. **Given** a selected text passage and a question, **When** the passage contains sufficient information, **Then** the system answers using ONLY the selected text without retrieving additional chunks
3. **Given** a selected text passage and a question requiring broader context, **When** the selected text alone is insufficient, **Then** the system retrieves and integrates relevant book chunks beyond the selected passage
4. **Given** a selected text passage, **When** the system generates a response, **Then** citations clearly distinguish between the selected text and any retrieved chunks
5. **Given** an empty or whitespace-only selected text value, **When** the request is processed, **Then** the system treats it as a full-book RAG query (same behavior as User Story 2)

---

### User Story 4 - Embed Chat Widget in Book Pages (Priority: P4)

An author or publisher wants to add the chatbot to their book's website, EPUB viewer, or digital reading platform. They need a simple, drop-in widget that requires no complex build process or platform-specific customization.

**Why this priority**: This enables distribution and adoption. Without easy embedding, authors cannot integrate the chatbot into their published works. This is the "delivery mechanism" for the chatbot functionality.

**Independent Test**: Can be fully tested by adding the widget script tag to a sample HTML page and verifying that (a) the chat interface renders correctly, (b) it can send queries to the backend, (c) it displays responses with proper formatting, and (d) it supports both normal and selected-text modes. Delivers the embeddable chat interface.

**Acceptance Scenarios**:

1. **Given** a web-based book page, **When** the author adds the chat widget script tag, **Then** a chat interface appears on the page without requiring any build step or framework-specific setup
2. **Given** the chat widget is loaded, **When** a reader types a question and submits, **Then** the widget sends the query to the backend API and displays the response
3. **Given** the chat widget, **When** a reader selects text in the book and uses the widget's "ask about selection" feature, **Then** the selected text is included in the API request and the response reflects selection-specific context
4. **Given** different website themes (light/dark), **When** the widget loads, **Then** it adapts to the page's styling or uses CSS variables for customization
5. **Given** the widget on a mobile device, **When** displayed, **Then** the chat interface remains usable and readable on small screens

---

### Edge Cases

**Content & Retrieval**:
- What happens when the book content is extremely large (exceeds free-tier storage limits)?
- How does the system handle books with code blocks, mathematical formulas, or special formatting?
- What happens when a query matches no relevant chunks (zero search results)?
- How does the system handle queries that match chunks with conflicting information?
- What happens when selected text contains only whitespace or is empty?

**Performance & Reliability**:
- How does the system behave when the vector database or metadata store is temporarily unavailable?
- What happens when an embedding generation request fails due to API rate limits?
- How does the system handle malformed or corrupted markdown/text files during ingestion?
- What happens when multiple concurrent ingestion requests are triggered?

**Security & Boundaries**:
- How does the system prevent prompt injection attacks through selected text?
- What happens if a user attempts to query content from a different book (not ingested)?
- How does the system handle queries that attempt to extract the system prompt or internal instructions?

**User Experience**:
- What happens when a reader asks a question in a language different from the book's primary language?
- How does the system handle queries that are too vague or too broad?
- What feedback does the system provide when ingestion is in progress for large books?

## Requirements *(mandatory)*

### Functional Requirements

**Content Ingestion**:
- **FR-001**: System MUST accept a directory path containing markdown/text files or a single PDF file as input for ingestion
- **FR-002**: System MUST split book content into chunks with configurable size and overlap (default: 500 tokens, 50-token overlap)
- **FR-003**: System MUST generate vector embeddings for each chunk using the configured embedding model
- **FR-004**: System MUST store chunk vectors in a vector database with metadata (source file, chapter, section, position, text)
- **FR-005**: System MUST record chunk metadata in a metadata store for efficient retrieval and filtering
- **FR-006**: System MUST support idempotent ingestion (re-running updates existing chunks without duplicates)
- **FR-007**: System MUST provide clear error reporting when ingestion fails, indicating the specific file and reason

**Chat - Full-Book RAG Mode**:
- **FR-008**: System MUST accept natural language queries via a chat endpoint
- **FR-009**: System MUST retrieve relevant chunks from the vector database based on semantic similarity to the query
- **FR-010**: System MUST generate responses using ONLY the retrieved chunks and the system prompt
- **FR-011**: System MUST include citations in responses, referencing specific book passages
- **FR-012**: System MUST respond with a fallback message when no relevant chunks are found for a query
- **FR-013**: System MUST refuse to answer questions that cannot be addressed using the book content
- **FR-014**: System MUST handle concurrent chat requests from multiple users without data leakage

**Chat - Selected-Text Mode**:
- **FR-015**: System MUST accept a `selected_text` field in chat requests (optional)
- **FR-016**: When `selected_text` is provided, system MUST prioritize it as the highest-priority context
- **FR-017**: System MUST retrieve additional chunks from the book only when selected text is insufficient for a complete answer
- **FR-018**: System MUST clearly distinguish between citations from selected text vs. retrieved chunks in responses
- **FR-019**: When `selected_text` is empty or whitespace-only, system MUST treat the request as full-book RAG mode

**Agent System**:
- **FR-020**: System MUST implement a retriever agent/tool that performs vector search in the database
- **FR-021**: System MUST implement a selected-text agent/tool that injects user-highlighted passages as forced context
- **FR-022**: System MUST implement a router/guard agent that determines whether to use selected-text mode or full-book RAG
- **FR-023**: All agents MUST use the configured Cohere-compatible client for LLM operations

**API & Integration**:
- **FR-024**: System MUST expose a POST /ingest endpoint to trigger content ingestion
- **FR-025**: System MUST expose a POST /chat endpoint for full-book RAG queries
- **FR-026**: System MUST expose a POST /chat/selected endpoint (or unified endpoint with mode detection) for selected-text queries
- **FR-027**: System MUST expose a GET /health endpoint for service health checks
- **FR-028**: System MUST expose a GET /chunks endpoint to list chunks (for debugging, filtered by book/chapter)
- **FR-029**: All API responses MUST use JSON format with consistent structure
- **FR-030**: API error responses MUST include descriptive error messages and appropriate HTTP status codes

**Frontend Widget**:
- **FR-031**: System MUST provide a JavaScript file (chat-widget.js) that can be embedded via script tag
- **FR-032**: Widget MUST be lightweight (< 50KB minified + gzipped)
- **FR-033**: Widget MUST support both iframe and web component integration methods
- **FR-034**: Widget MUST allow customization via CSS variables or configuration object
- **FR-035**: Widget MUST support sending both normal queries and selected-text queries to the backend
- **FR-036**: Widget MUST render responses with proper formatting (markdown, code blocks, citations)
- **FR-037**: Widget MUST be responsive and functional on mobile devices

**Configuration & Deployment**:
- **FR-038**: System MUST load all configuration from environment variables (no hardcoded secrets)
- **FR-039**: System MUST require exactly these environment variables: NEON_DATABASE_URL, QDRANT_CLUSTER_ID, QDRANT_API_ENDPOINT, QDRANT_API_KEY, COHERE_API_KEY
- **FR-040**: System MUST provide a .env.example file documenting all required and optional variables
- **FR-041**: System MUST be runnable via docker-compose or a single command (e.g., `uv run` or `pip install -e .`)
- **FR-042**: System MUST include comprehensive README with setup, ingestion, widget embedding, and API usage instructions

**Data & Constraints**:
- **FR-043**: System MUST operate within free-tier limits of all services (Qdrant ≤ 1GB, Neon free compute, Cohere free tier)
- **FR-044**: System MUST use only Cohere models via the OpenAI-compatible endpoint (no direct OpenAI API usage)
- **FR-045**: System MUST use Pydantic v2 for all data validation and schema definitions
- **FR-046**: System MUST use async FastAPI for all endpoints
- **FR-047**: System MUST include type hints for all Python functions
- **FR-048**: System MUST document all public functions and classes with docstrings

### Key Entities

**Book Content**:
- Represents the source material (markdown files, text files, or PDF)
- Attributes: title, author, format (md/txt/pdf), file path, ingestion timestamp, total chunks

**Content Chunk**:
- Represents a semantic segment of book content (e.g., a paragraph, section, or topic boundary)
- Attributes: chunk ID, text content, source file, chapter/section, position/index, embedding vector, metadata (creation timestamp, word/token count)

**Chat Query**:
- Represents a user question in either full-book or selected-text mode
- Attributes: query ID, query text, selected text (optional), mode (full-book vs selected-text), timestamp, retrieved chunk IDs, response text, citations

**Book Metadata**:
- Represents structured information about the book's organization
- Attributes: book ID, title, chapter list (with positions), section mappings, total chunk count, last updated timestamp

**Chat Session** (optional, not in MVP scope):
- Represents a conversation between a reader and the chatbot
- Attributes: session ID, message history, context window, created timestamp, last activity timestamp

## Assumptions

1. **Book Content Format**: Books are primarily in markdown or plain text format. PDF support is a stretch goal and may require additional libraries or pre-processing.
2. **Single Book Instance**: The system is optimized for ingesting and querying one primary book. Multi-book support is not in scope.
3. **No User Authentication**: The chatbot is a public-facing assistant with no user accounts, sessions, or personalization.
4. **Language**: The book and queries are assumed to be in English. Multi-language support is not in scope.
5. **Free Tier Compliance**: All design decisions assume staying within free-tier limits. Performance optimizations prioritize cost efficiency over speed.
6. **Cohere Availability**: The Cohere API and OpenAI compatibility endpoint are assumed to be stable and available. Fallback to other providers is not in scope.
7. **Chunking Strategy**: Semantic chunking with fixed-size overlap is sufficient. Advanced techniques like recursive character splitting or document-specific heuristics are not required.
8. **Widget Environment**: The widget assumes modern browser support (ES6+, fetch API). Legacy browser support (IE11) is not required.
9. **Streaming**: Real-time streaming responses are not required. Simple JSON request/response is acceptable.
10. **PDF Parsing**: If PDF support is implemented, it's assumed a library like pypdf or pdfplumber will be used, with reasonable handling of text extraction (preserving paragraphs, handling multi-column layouts may be imperfect).

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Content Ingestion**:
- **SC-001**: Ingestion script processes a 200-page book (1000 chunks) in under 5 minutes
- **SC-002**: Ingestion completes without errors for well-formed markdown/text files
- **SC-003**: Re-running ingestion on the same book updates chunks without creating duplicates (verified by chunk count)
- **SC-004**: Ingestion failure rate is under 1% for valid file formats (excluding corrupted/malformed files)

**Chat Quality & Accuracy**:
- **SC-005**: 95% of responses to book-specific questions are factually accurate based on the book content (verified by human evaluation on 100 test questions)
- **SC-006**: 100% of responses include citations to specific book passages
- **SC-007**: 100% of responses to questions outside the book scope return the fallback message (no hallucinations)
- **SC-008**: 90% of users (in a usability test) can successfully get accurate answers to their questions on the first try

**Selected-Text Mode**:
- **SC-009**: When selected text is provided, 100% of responses explicitly reference the selected passage
- **SC-010**: Selected-text mode accurately answers 95% of passage-specific questions (verified by human evaluation)

**Performance & Reliability**:
- **SC-011**: Chat API responds to queries in under 3 seconds (p95 latency, including retrieval and generation)
- **SC-012**: System handles 10 concurrent chat requests without performance degradation or errors
- **SC-013**: System uptime is 99% (excluding planned maintenance and external service outages)
- **SC-014**: API error responses include descriptive messages in 100% of error cases

**Usability & Integration**:
- **SC-015**: Widget can be embedded in a new book page in under 5 minutes (copy script tag, add to HTML, verify it works)
- **SC-016**: Widget renders correctly on desktop and mobile browsers (Chrome, Firefox, Safari, Edge on latest two versions)
- **SC-017**: Widget file size is under 50KB minified + gzipped
- **SC-018**: First-time users can successfully set up the system (create accounts, get API keys, run ingestion, test chat) in under 30 minutes using the README

**Free-Tier Compliance**:
- **SC-019**: Total storage used in Qdrant is under 1 GB for a typical 300-page book
- **SC-020**: Monthly API costs stay within free-tier limits (Cohere free tier, Neon free tier, Qdrant free tier) for typical usage (1000 queries/day)

**Code Quality & Maintainability**:
- **SC-021**: 100% of Python functions have type hints
- **SC-022**: 100% of public API endpoints have Pydantic v2 schemas for request/response validation
- **SC-023**: Code passes all linter checks (mypy strict mode, black/ruff formatting) without warnings
- **SC-024**: README instructions are complete and accurate (verified by a fresh user following the guide end-to-end)

## Out of Scope

The following explicitly fall outside the scope of this feature:

- User authentication, accounts, or multi-user sessions
- Multi-book support (querying across multiple books simultaneously)
- Real-time streaming responses (Server-Sent Events or WebSocket streaming)
- Voice input/output or speech-to-text
- Advanced RAG features like query rewriting, decomposition, or multi-hop reasoning
- Conversation memory or context beyond a single query
- Analytics, logging, or monitoring dashboards
- Rate limiting or abuse prevention (beyond what external services provide)
- Advanced PDF parsing (preserving complex layouts, images, tables)
- Multi-language support or translation
- Webhook integrations or external API calls beyond the three specified services
- Custom fine-tuning of models
- A/B testing or experimentation framework
- Admin UI or content management interface
- Versioning of book content (ingestion updates entire book)
