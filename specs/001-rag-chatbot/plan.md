# Implementation Plan: Integrated RAG Chatbot Backend for Published Books

**Branch**: `001-rag-chatbot` | **Date**: 2026-02-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-rag-chatbot/spec.md`

## Summary

Build a production-grade RAG chatbot backend that enables readers to ask questions about published books and receive accurate, citation-backed answers. The system supports two modes: (1) full-book RAG for general questions, and (2) selected-text mode for focused Q&A on specific passages. The backend uses FastAPI with Neon Postgres (metadata), Qdrant Cloud (vectors), and Cohere models (exclusively via OpenAI Compatibility API), implementing OpenAI Agents SDK with retriever, selected-text, and router agents. All responses are strictly grounded in retrieved content with zero hallucination tolerance.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI, qdrant-client, asyncpg, openai (SDK with Cohere base_url), openai-agents, pydantic (v2), pydantic-settings
**Storage**: Qdrant Cloud (vector DB), Neon Serverless Postgres (metadata)
**Testing**: pytest + pytest-asyncio for async endpoint testing
**Target Platform**: Containerized backend deployable to Railway/Fly.io/Render free tier
**Project Type**: backend (API service with CLI ingestion script)
**Performance Goals**: < 3s p95 latency for chat endpoints, ingestion of 1000 chunks in < 5 minutes
**Constraints**: < 1GB Qdrant storage, free-tier compute limits, 100% type hints, async I/O throughout, strict grounding (no external knowledge)
**Scale/Scope**: Single book instance, ~1000 chunks per book, 10 concurrent users, 1000 queries/day

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Strict Grounding ✅ PASS
- **Requirement**: ALL responses derived from retrieved chunks or selected text, fallback when no relevant content
- **Design**: System prompt enforces grounding, retrieval tools return top-k chunks with scores, selected-text mode prioritizes user passages, citation metadata tracked in all responses
- **Verification**: Integration tests verify fallback behavior, citation inclusion, and rejection of off-topic queries

### Principle II: Cohere-First LLM Integration ✅ PASS
- **Requirement**: Use ONLY Cohere models via OpenAI Compatibility API, base_url="https://api.cohere.ai/compatibility/v1"
- **Design**: OpenAI client initialized with Cohere base_url in agents/rag_agent.py, chat model=command-r-plus, embedding model=embed-english-v3.0, environment variable COHERE_API_KEY
- **Verification**: Unit tests verify client.base_url matches Cohere endpoint, no api.openai.com calls in codebase

### Principle III: Free-Tier Architecture ✅ PASS
- **Requirement**: Operate within Qdrant ≤ 1GB, Neon free compute, Cohere free tier, deployable to free hosting
- **Design**: Single Qdrant collection, async connection pooling for Neon, batch embedding generation with rate limit handling, docker-compose for local dev, Railway/Fly.io deployment configs
- **Verification**: Storage monitoring in ingestion, rate limit retry logic, deployment tested on free-tier platforms

### Principle IV: OpenAI Agents SDK with Cohere Compatibility ✅ PASS
- **Requirement**: Use openai-agents package with Cohere-compatible client, implement retriever/selected-text/router agents
- **Design**: agents/rag_agent.py defines RetrieverAgent (Qdrant search), SelectedTextAgent (passage injection), RouterAgent (mode detection), all use Cohere client
- **Verification**: Agent unit tests verify client base_url, tool integration, and routing logic

### Principle V: User-Centric Embedding ⚠️ DEFERRED
- **Requirement**: Provide embeddable chat-widget.js (< 50KB), drop-in script tag
- **Design**: **DEFERRED TO FUTURE WORK** - Current plan focuses on backend API only. Frontend widget (User Story 4) will be implemented in separate phase after backend is production-ready
- **Justification**: Backend must be fully functional and tested before building frontend integration. API endpoints (POST /chat, POST /chat/selected) provide all necessary interfaces for future widget development
- **Complexity Tracking**: See table below

### Principle VI: Type Safety & Validation ✅ PASS
- **Requirement**: 100% type hints, Pydantic v2 for all schemas, pydantic-settings for env vars
- **Design**: All functions typed, models/ for Pydantic schemas (requests, responses, DB models), config/settings.py uses BaseSettings, mypy strict mode in pyproject.toml
- **Verification**: Linting pipeline (mypy, ruff), type hints coverage in CI

**Constitution Check Result**: ✅ **PASS with 1 DEFERRAL** - Proceed to Phase 0 research

## Project Structure

### Documentation (this feature)

```text
specs/001-rag-chatbot/
├── spec.md              # Feature specification (user stories, requirements, success criteria)
├── plan.md              # This file (implementation plan, architecture, research)
├── research.md          # Phase 0: Technology research and decision log
├── data-model.md        # Phase 1: Entity definitions, relationships, validation rules
├── quickstart.md        # Phase 1: Developer quickstart guide
├── contracts/           # Phase 1: API contracts (OpenAPI specs, request/response schemas)
│   ├── chat.yaml        # Chat endpoint contract
│   ├── ingest.yaml      # Ingestion endpoint contract
│   └── health.yaml      # Health check contract
└── tasks.md             # Phase 2: Actionable task list (created by /sp.tasks)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entrypoint, lifespan, route registration
│   ├── config/
│   │   ├── __init__.py
│   │   └── settings.py         # Pydantic BaseSettings for env vars (5 required vars)
│   ├── models/
│   │   ├── __init__.py
│   │   ├── chat.py             # ChatRequest, ChatResponse, Citation schemas
│   │   ├── ingest.py           # IngestRequest, IngestResponse, ChunkMetadata schemas
│   │   └── health.py           # HealthResponse schema
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── rag_agent.py        # Main RAG agent with Cohere client, system prompt
│   │   ├── retriever.py        # Retriever agent/tool (Qdrant vector search)
│   │   ├── selected_text.py    # Selected-text agent/tool (passage injection)
│   │   └── router.py           # Router agent (mode detection: full-book vs selected-text)
│   ├── services/
│   │   ├── __init__.py
│   │   ├── qdrant_service.py   # Qdrant client wrapper, collection management, search
│   │   ├── neon_service.py     # Neon Postgres async pool, metadata CRUD
│   │   ├── cohere_service.py   # Cohere embedding client (via OpenAI SDK)
│   │   └── chunking.py         # Text chunking logic (fixed-size + overlap)
│   ├── api/
│   │   ├── __init__.py
│   │   ├── chat.py             # POST /chat, POST /chat/selected endpoints
│   │   ├── ingest.py           # POST /ingest endpoint
│   │   └── health.py           # GET /health endpoint
│   └── db/
│       ├── __init__.py
│       ├── migrations.py       # Neon Postgres schema creation (chunks_metadata table)
│       └── connection.py       # Async connection pool management
├── scripts/
│   ├── ingest_book.py          # CLI script for book ingestion (accepts folder/file path)
│   └── __init__.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # Pytest fixtures (test DB, test client, mock services)
│   ├── contract/
│   │   ├── test_chat.py        # Contract tests for chat endpoints
│   │   └── test_ingest.py      # Contract tests for ingestion endpoint
│   ├── integration/
│   │   ├── test_full_rag_flow.py   # End-to-end: ingest → retrieve → generate
│   │   └── test_selected_text_flow.py  # End-to-end: selected-text mode
│   └── unit/
│       ├── test_agents.py      # Unit tests for agents (retriever, router, selected-text)
│       ├── test_chunking.py    # Unit tests for chunking logic
│       └── test_services.py    # Unit tests for Qdrant/Neon/Cohere services
├── pyproject.toml              # uv/poetry config, dependencies, tooling (mypy, pytest, ruff)
├── requirements.txt            # Fallback for pip install
├── .env.example                # Template for 5 required env vars with comments
├── .gitignore                  # Python ignores: __pycache__, .venv, .env, *.pyc
├── README.md                   # Setup, ingestion, server start, API docs, deployment
├── Dockerfile                  # Multi-stage build for FastAPI backend
└── docker-compose.yml          # Local dev: FastAPI + Neon + Qdrant (optional services)
```

**Structure Decision**: **Single backend project** (Option 1 modified for FastAPI). The `backend/` directory contains all Python code organized by layer (models, agents, services, API). This aligns with FastAPI best practices and keeps the codebase modular for future frontend widget development (User Story 4). The structure separates concerns: config/ for settings, models/ for Pydantic schemas, agents/ for OpenAI Agents SDK integration, services/ for external service clients, api/ for FastAPI routes, and db/ for database logic. Tests are organized by type (contract, integration, unit) for clear testing strategy.

## Complexity Tracking

> **Justification for deferring Principle V (User-Centric Embedding)**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Frontend chat widget (User Story 4) | Backend API must be production-ready, fully tested, and stable before building frontend integration. API endpoints are the critical path for delivering value (User Stories 1-3). | Building widget simultaneously would slow backend development and require frequent API contract changes. Widget can consume stable API contracts later without affecting backend logic. |
| JavaScript chat-widget.js, HTML examples, CSS styling | Backend provides all necessary interfaces (POST /chat, POST /chat/selected) for any frontend integration. Frontend is presentation layer that doesn't affect core RAG functionality. | Hardcoding frontend now would couple backend implementation to specific UI patterns, making API less flexible for future integrations (EPUB viewers, Next.js sites, etc.). |

**Plan**: Implement User Stories 1-3 (ingestion, full-book RAG, selected-text mode) in this plan. User Story 4 (widget) will be a separate feature with its own spec/plan/tasks after backend is production-ready and deployed.

## Phase 0: Research & Technology Decisions

### Research Tasks

1. **OpenAI Agents SDK + Cohere Compatibility**
   - **Question**: Does the official `openai-agents` package support custom base_url for Cohere's OpenAI Compatibility API?
   - **Decision REQUIRED**: Verify if agents SDK allows `base_url` override in client initialization
   - **Impact**: HIGH - Core architecture depends on this capability
   - **Investigation**: Check openai-agents documentation, test `openai.OpenAI(base_url="https://api.cohere.ai/compatibility/v1")` with agents

2. **Qdrant Hybrid Search**
   - **Question**: Does qdrant-client Python support hybrid search (dense + sparse vectors) on free tier?
   - **Decision REQUIRED**: Determine if hybrid search improves retrieval quality for book chunks
   - **Impact**: MEDIUM - Affects retrieval quality but not core functionality
   - **Investigation**: Review Qdrant docs for hybrid search API, compare dense-only vs hybrid performance

3. **Async Qdrant Client**
   - **Question**: Does qdrant-client provide async methods for Python?
   - **Decision REQUIRED**: Async client required for FastAPI performance
   - **Impact**: HIGH - Affects overall system performance and architecture
   - **Investigation**: Check qdrant-client documentation for async/await patterns

4. **Chunking Strategy for Books**
   - **Question**: What's the optimal chunk size and overlap for book content (markdown/text)?
   - **Decision REQUIRED**: Balance retrieval quality vs storage (free tier limit)
   - **Impact**: MEDIUM - Affects citation quality and storage usage
   - **Investigation**: Research RAG best practices for documents, test 300-800 token chunks with 10-20% overlap

5. **Cohere Embedding Model Selection**
   - **Question**: embed-english-v3.0 vs embed-english-light-v3.0 for book content?
   - **Decision REQUIRED**: Trade-off between quality and cost/rate limits
   - **Impact**: MEDIUM - Affects retrieval accuracy and API usage
   - **Investigation**: Compare model specs, test on sample book passages, evaluate retrieval quality

6. **Idempotent Ingestion Strategy**
   - **Question**: How to implement idempotent ingestion (update existing chunks without duplicates)?
   - **Decision REQUIRED**: Balance simplicity vs robustness
   - **Impact**: HIGH - Critical for user experience (re-running ingestion should be safe)
   - **Investigation**: Evaluate options: (a) delete-all + re-insert, (b) upsert by chunk_id hash, (c) versioning with timestamps

7. **Selected-Text Mode Implementation**
   - **Question**: How to force selected text into context while maintaining grounding?
   - **Decision REQUIRED**: Ensure selected text is prioritized but doesn't bypass retrieval entirely
   - **Impact**: HIGH - Core differentiator feature
   - **Investigation**: Design options: (a) prepend to system prompt, (b) add as highest-relevance chunk, (c) hybrid approach with selective retrieval

8. **Prompt Injection Prevention**
   - **Question**: How to prevent prompt injection through selected_text field?
   - **Decision REQUIRED**: Security requirement from spec (Edge Case: "How does the system prevent prompt injection attacks through selected text?")
   - **Impact**: HIGH - Security vulnerability if not addressed
   - **Investigation**: Research best practices for sanitizing user text, evaluate options: (a) text length limits, (b) escape sequences, (c) LLM guardrails

### Research Output

All research tasks will be documented in `research.md` with:
- Decision made (technology choice, pattern, or approach)
- Rationale (why this choice fits constraints and requirements)
- Alternatives considered (what else was evaluated)
- Implementation notes (gotchas, configuration, code patterns)

**Gates**: Phase 0 research must resolve all "NEEDS CLARIFICATION" items in Technical Context before proceeding to Phase 1.

## Phase 1: Design & Contracts

### Data Model (data-model.md)

Extract entities from feature spec and define:

**BookContent**:
- Fields: `book_id: UUID`, `title: str`, `author: str`, `format: Literal['md', 'txt', 'pdf']`, `file_path: str`, `ingested_at: datetime`, `total_chunks: int`
- Relationships: Has-many ContentChunk
- Validation: Non-empty title, valid file path, format enum

**ContentChunk**:
- Fields: `chunk_id: UUID`, `book_id: UUID (FK)`, `text: str`, `source_file: str`, `chapter: Optional[str]`, `section: Optional[str]`, `position: int`, `embedding: List[float]`, `created_at: datetime`, `token_count: int`
- Relationships: Belongs-to BookContent
- Validation: Text length 1-4000 chars, position non-negative, embedding vector size matches model (1024 for embed-english-v3.0)
- Indexes: chunk_id (PK), book_id (FK), source_file + position (composite for uniqueness)

**ChatQuery**:
- Fields: `query_id: UUID`, `query_text: str`, `selected_text: Optional[str]`, `mode: Literal['full_book', 'selected_text']`, `timestamp: datetime`, `retrieved_chunk_ids: List[UUID]`, `response_text: str`, `citations: List[Dict]`, `latency_ms: int`
- Relationships: Many-to-many with ContentChunk (retrieved_chunk_ids)
- Validation: Query text non-empty, selected text max 5000 chars, mode enum

**BookMetadata** (denormalized for performance):
- Fields: `book_id: UUID`, `title: str`, `chapter_list: List[Dict]`, `total_chunks: int`, `last_updated: datetime`
- Validation: Synchronized with BookContent via triggers

### API Contracts (contracts/)

**POST /api/v1/ingest** (contracts/ingest.yaml):
- Request: `{"book_path": "/path/to/book/folder", "format": "md"}`
- Response: `{"book_id": "uuid", "chunks_created": 1000, "status": "success", "message": "Ingestion complete"}`
- Error: 400 (invalid path), 500 (ingestion failure)

**POST /api/v1/chat** (contracts/chat.yaml):
- Request: `{"query": "What is RAG?", "book_id": "uuid" (optional)}`
- Response: `{"answer": "RAG is...", "citations": [{"chunk_id": "uuid", "text": "excerpt", "source": "chapter-1.md"}], "mode": "full_book"}`

**POST /api/v1/chat/selected** (contracts/chat.yaml):
- Request: `{"query": "Explain this passage", "selected_text": "RAG stands for...", "book_id": "uuid"}`
- Response: `{"answer": "The passage explains...", "citations": [{"chunk_id": "selected", "text": "..."}, ...], "mode": "selected_text"}`

**GET /api/v1/health** (contracts/health.yaml):
- Response: `{"status": "healthy", "qdrant_connected": true, "neon_connected": true, "cohere_connected": true}`

### Quickstart Guide (quickstart.md)

Developer onboarding steps:
1. Clone repo, install dependencies (`uv pip install -e .`)
2. Set up external services (Neon, Qdrant Cloud, Cohere API key)
3. Configure environment (copy .env.example, fill in values)
4. Run migrations (`python -m app.db.migrations`)
5. Ingest sample book (`python scripts/ingest_book.py --path ./sample_book`)
6. Start server (`uvicorn app.main:app --reload`)
7. Test endpoints (curl examples or OpenAPI docs at http://localhost:8000/docs)

## Phase 2: Task Generation

**NOT CREATED BY /sp.plan** - Run `/sp.tasks` after Phase 1 artifacts (data-model.md, contracts/, quickstart.md) are complete.

/tasks.md will contain:
- Ordered task list by user story priority (P1 → P2 → P3)
- Each task tagged with user story (US1, US2, US3)
- File paths for implementation
- Dependencies between tasks
- Parallel execution opportunities
- Testing tasks (if requested in spec)

## Execution Order (Prescribed by User)

Phase 1 – Project Setup & Structure:
1. Create backend/ folder structure
2. Generate pyproject.toml + requirements.txt
3. Create .env.example (5 required vars)
4. Generate README.md skeleton
5. Add .gitignore
6. Create docker-compose.yml

Phase 2 – Data Ingestion Pipeline:
7. Write scripts/ingest_book.py (chunking, embeddings, Qdrant upsert, Neon metadata)

Phase 3 – Database & Vector Store Clients:
8. Create app/db/connection.py, app/services/qdrant_service.py, app/services/neon_service.py, app/config/settings.py

Phase 4 – Core RAG Logic & Tools:
9. Create agents/ folder
10. Implement agents/retriever.py (Qdrant search)
11. Implement agents/selected_text.py (passage injection)
12. Implement agents/router.py (mode detection)

Phase 5 – OpenAI Agents SDK Integration:
13. Create agents/rag_agent.py (Cohere client, system prompt, tools)

Phase 6 – FastAPI Application:
14. Create app/main.py (async lifespan, endpoints POST /ingest, POST /chat, POST /chat/selected, GET /health)

Phase 7 – Final Touches & Documentation:
15. Complete README.md
16. Add tests/ folder with pytest examples
17. Consistency check against constitution and spec

**NO FRONTEND CODE** - JavaScript widget, HTML, iframes are explicitly out of scope for this plan. Focus exclusively on backend API, ingestion pipeline, agents, and database/vector integration.

## Notes

- All code must be production-ready: type hints, docstrings, error handling, logging
- Strict grounding enforced via system prompt and retrieval tool design
- Cohere-only: verify no OpenAI API usage in code reviews
- Free-tier compliance: monitor storage usage, implement rate limit handling
- Async-first: all I/O operations use async/await
- Testing: contract tests for API endpoints, integration tests for RAG flow, unit tests for agents/services
- Deployment: Dockerfile for containerization, Railway/Fly.io deployment guides in README

**Version**: 1.0.0 | **Plan Created**: 2026-02-04
