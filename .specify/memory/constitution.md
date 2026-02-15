<!--
  SYNC IMPACT REPORT
  ==================
  Version change: 1.0.0 → 2.0.0
  Modified principles:
    - Minimal Dependency Philosophy → Cohere-First LLM Integration
    - Mobile-First Responsive Design → Strict Grounding (Zero Hallucination)
    - MDX-First Content Management → Free-Tier Architecture
    - Performance Excellence → OpenAI Agents SDK with Cohere Compatibility
    - Universal Accessibility → User-Centric Embedding
    - TypeScript Strict Mode → Type Safety & Validation
    - Component Reusability → Removed (not applicable to backend focus)
  Added sections:
    - RAG Pipeline Architecture
    - Vector Store Requirements (Qdrant)
    - Metadata Store Requirements (Neon Postgres)
    - Agent System Requirements
    - Selected-Text Mode Specifications
    - Chunking & Ingestion Standards
  Removed sections:
    - Page Limit (4-page website structure)
    - Content Structure (5 chapters, 2 topics each)
    - Theme Support (dark/light mode)
    - Deployment Target (Vercel-specific)
  Templates requiring updates:
    ✅ plan-template.md - Compatible (generic structure)
    ✅ spec-template.md - Compatible (generic structure)
    ✅ tasks-template.md - Compatible (generic structure)
  Follow-up TODOs: None
-->

# RAG Chatbot Constitution

## Core Principles

### I. Strict Grounding (NON-NEGOTIABLE)

The chatbot MUST answer questions exclusively based on retrieved book content. Zero hallucination tolerance enforced through:

- ALL responses MUST be derived from retrieved chunks or user-selected text
- EVERY answer MUST include citations to specific book passages
- NO knowledge outside the book content may be used in responses
- Fall-back response: "I cannot answer this from the book content provided" when relevant chunks are not found

**Rationale**: The chatbot's value proposition is accurate, book-specific answers. Hallucinations destroy user trust and undermine the educational purpose of a book companion.

### II. Cohere-First LLM Integration (NON-NEGOTIABLE)

All LLM and embedding operations MUST use Cohere models via Cohere's OpenAI Compatibility API. Requirements:

- Base URL MUST be: `https://api.cohere.ai/compatibility/v1`
- Chat model: `command-r-plus` or `command-a-03-2025` (if available)
- Embedding model: `embed-english-v3.0` or `embed-english-light-v3.0` (for cost/size optimization)
- Client initialization: `openai.OpenAI(base_url="https://api.cohere.ai/compatibility/v1", api_key=COHERE_API_KEY)`
- NO direct OpenAI API usage (no `api.openai.com` base URLs, no `gpt-*` models)

**Rationale**: Cohere provides production-grade models with a compatibility layer that allows using the OpenAI Agents SDK while maintaining a single model provider for cost efficiency and simplified billing.

### III. Free-Tier Architecture (NON-NEGOTIABLE)

The entire system MUST operate within free-tier limits of all services. Stack constraints:

- **Qdrant Cloud Free Tier**: Maximum 1 GB storage, single collection
- **Neon Serverless Postgres**: Free tier compute and storage limits
- **Cohere Free Tier**: Respect rate limits (requests per minute/day)
- **Deployment**: Must be deployable to free hosting (Railway, Fly.io, Render free tier)
- NO external paid services beyond the three explicitly listed

**Rationale**: Free-tier deployment ensures the project is accessible to individual authors and small publishers without ongoing operational costs. It also forces efficient resource usage.

### IV. OpenAI Agents SDK with Cohere Compatibility (NON-NEGOTIABLE)

The system MUST use the official OpenAI Agents SDK (`openai-agents` package) configured for Cohere. Minimum agent requirements:

- **Retriever Agent/Tool**: Performs Qdrant vector search with hybrid capabilities (dense + sparse if available)
- **Selected-Text Agent/Tool**: Injects user-highlighted passages as forced context with highest priority
- **Router/Guard Agent**: Decides whether to use selected-text mode or full-book RAG based on user input
- All agents MUST use the Cohere-compatible OpenAI client (base_url verified)

**Rationale**: The OpenAI Agents SDK provides a lightweight, official framework for building agentic RAG systems. Using it with Cohere's compatibility API demonstrates how to leverage agent frameworks while maintaining cost control.

### V. User-Centric Embedding (NON-NEGOTIABLE)

The chatbot MUST be embeddable as a lightweight JavaScript widget into any web-based book platform. Embedding requirements:

- Provide `chat-widget.js` that can be dropped into any HTML/EPUB viewer, Next.js site, or static page
- Support multiple integration methods: iframe, web component, or script tag
- Widget MUST be lightweight (< 50KB minified + gzipped)
- styling MUST be customizable via CSS variables or configuration object
- NO build step required for end users (drop-in script tag)

**Rationale**: Authors use diverse publishing platforms. A drop-in widget ensures maximum adoption without requiring platform-specific implementations.

### VI. Type Safety & Validation (MANDATORY)

All code MUST maintain strong typing and validation standards:

- Python: ALL functions MUST use type hints (no untyped functions)
- Pydantic models MUST define all API schemas, database models, and configuration
- Request validation MUST happen at the API boundary (FastAPI Pydantic models)
- Environment variables MUST be loaded via `pydantic-settings` with validation
- NO `Any` types except in genuinely generic contexts

**Rationale**: Type safety prevents runtime errors, improves IDE support, and serves as inline documentation. Pydantic provides both validation and serialization in one package.

## Scope Constraints

### Backend Stack (NON-NEGOTIABLE)

The backend MUST use:

- **Framework**: FastAPI (Python 3.11+) with async endpoints
- **Vector Store**: Qdrant Cloud (official `qdrant-client` Python package)
- **Metadata Store**: Neon Serverless Postgres (async `asyncpg` driver)
- **LLM Client**: OpenAI Python SDK with Cohere base URL
- **Agents SDK**: `openai-agents` package (official lightweight framework)

**Rationale**: This stack is serverless-friendly, has excellent free-tier support, and provides async performance for concurrent chat requests.

### RAG Pipeline Architecture (NON-NEGOTIABLE)

The retrieval-augmented generation pipeline MUST implement:

1. **Query Understanding**: Extract user intent and detect selected-text mode
2. **Retrieval**: Vector search in Qdrant (top-k chunks, configurable)
3. **Reranking (Optional)**: Re-rank retrieved chunks if within free-tier limits
4. **Context Assembly**: Combine retrieved chunks with system prompt
5. **Generation**: Stream response via Cohere chat model
6. **Citation**: Include chunk references in response

**Rationale**: A clear pipeline ensures each step is testable and debuggable. Streaming responses improve perceived latency and user experience.

### Selected-Text Mode (NON-NEGOTIABLE)

The system MUST support a "selected-text mode" where users highlight passages. Requirements:

- Accept `selected_text` field in chat API payload
- When present, embed selected text and force it into top context (highest priority)
- Router agent MUST detect selected-text presence and route to specialized agent
- Selected-text agent MAY still retrieve additional chunks from the book if needed for context
- Response MUST clearly distinguish between selected-text citations and retrieved chunks

**Rationale**: Selected-text mode enables focused Q&A on specific passages, which is the primary use case for study helpers and exam preparation.

### Chunking & Ingestion (NON-NEGOTIABLE)

Content ingestion MUST support:

- Input formats: Directory of Markdown files, directory of text files, or single PDF
- Chunking strategy: Semantic chunking with fixed-size overlap (e.g., 500 tokens with 50-token overlap)
- Metadata storage: Store chunk-to-source mapping in Neon Postgres (chapter, page/section, position)
- Embedding generation: Use Cohere `embed-english-v3.0` for all chunks
- Qdrant indexing: Single collection with payload filtering by book ID/chapter
- Idempotency: Re-running ingestion MUST update existing chunks without duplicates

**Rationale**: Flexible ingestion supports diverse author workflows. Idempotent ingestion enables easy content updates.

### API Contract (NON-NEGOTIABLE)

The backend MUST expose these core endpoints:

```
POST /api/v1/chat          - Main chat endpoint (accepts query + optional selected_text)
POST /api/v1/ingest        - Ingest book content (file paths or PDF)
GET  /api/v1/health        - Health check endpoint
GET  /api/v1/chunks        - List chunks (for debugging, filtered by book/chapter)
```

Chat request schema:
```json
{
  "query": "string (required)",
  "selected_text": "string (optional)",
  "book_id": "string (optional, default to primary book)",
  "stream": "boolean (default false)"
}
```

**Rationale**: A minimal API surface reduces attack surface and simplifies integration. Streaming support enables better UX for long responses.

## Development Standards

### Code Organization

```
backend/
├── src/
│   ├── agents/           # Agent definitions (retriever, selected-text, router)
│   ├── api/              # FastAPI routes and middleware
│   ├── models/           # Pydantic models (requests, responses, DB schemas)
│   ├── services/         # Business logic (Qdrant, Neon, Cohere clients)
│   ├── ingestion/        # Content processing and chunking
│   └── config/           # Environment configuration (pydantic-settings)
├── tests/
│   ├── contract/         # API contract tests
│   ├── integration/      # End-to-end workflow tests
│   └── unit/             # Unit tests for services/agents
├── scripts/
│   └── ingest.py         # CLI script for content ingestion
└── frontend/
    └── chat-widget.js    # Drop-in chat widget
```

### Naming Conventions

- Files: `snake_case` (e.g., `retriever_agent.py`, `chat_service.py`)
- Classes: `PascalCase` (e.g., `RetrieverAgent`, `ChatService`)
- Functions/variables: `snake_case` (e.g., `embed_chunks`, `vector_search`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `QDRANT_COLLECTION_NAME`, `MAX_TOKENS`)

### Environment Variables

ALL secrets and configuration MUST use environment variables:

```bash
# Required
COHERE_API_KEY=sk-...
NEON_DATABASE_URL=postgresql://...
QDRANT_URL=https://...
QDRANT_API_KEY=...

# Optional (with sensible defaults)
QDRANT_COLLECTION_NAME=book_chunks
EMBEDDING_MODEL=embed-english-v3.0
CHAT_MODEL=command-r-plus
MAX_RETRIEVED_CHUNKS=5
CHUNK_SIZE=500
CHUNK_OVERLAP=50
```

### Git Workflow

- Commit messages MUST follow conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`)
- Main branch MUST always be deployable
- Feature branches SHOULD be named `feature/description`
- Pull requests MUST pass all checks before merge
- Environment variables MUST be documented in `.env.example` (never commit `.env`)

## Governance

### Amendment Process

Constitution amendments MUST:

1. Be proposed via GitHub issue with rationale and impact analysis
2. Receive approval from project lead
3. Include migration plan for existing code/data
4. Update version according to semantic versioning:
   - MAJOR: Backward-incompatible changes (e.g., switching from Cohere to different provider)
   - MINOR: New principle or section added (e.g., adding caching requirements)
   - PATCH: Clarifications, wording improvements, non-semantic changes

### Compliance Verification

- All pull requests MUST verify constitution compliance
- Code reviews MUST check principles (I-VI)
- Linting rules MUST enforce type hints (mypy with strict mode)
- Integration tests MUST verify RAG pipeline (ingestion → retrieval → generation)
- Manual testing MUST verify zero hallucinations on sample book questions

### Complexity Justification

Any deviation from core principles MUST be documented in `plan.md` with:

- Specific principle being relaxed or violated
- Why the deviation is necessary (e.g., "Premium Cohere model required for domain-specific terminology")
- Simpler alternatives considered and rejected
- Plan to return to compliance when feasible (e.g., "Wait for Cohere to add feature in next release")

### Success Criteria

The project is considered complete when:

1. ✅ Chatbot answers book-specific questions using only retrieved content (verifiable via citations)
2. ✅ Selected-text mode works (highlighted passage takes priority in context)
3. ✅ End-to-end flow works (ingest → embed → chat for both modes)
4. ✅ OpenAI Agents SDK is used with Cohere Compatibility API (verifiable via `client.base_url`)
5. ✅ Deployable to free-tier environment with one-click `docker-compose up`
6. ✅ Clear README with setup, ingestion, widget embedding, and API examples
7. ✅ Zero hallucinations on test questions from actual book content

**Version**: 2.0.0 | **Ratified**: 2026-02-03 | **Last Amended**: 2026-02-03
