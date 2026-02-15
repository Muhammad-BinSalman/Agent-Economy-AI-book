# Tasks: Integrated RAG Chatbot Backend for Published Books

**Input**: Design documents from `/specs/001-rag-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Note**: User Story 4 (Embed Chat Widget) is DEFERRED to future work per plan.md. Backend-only scope focuses on User Stories 1-3.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend project**: `backend/src/` at repository root
- Paths shown below follow the structure defined in plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend/ directory structure per implementation plan (app/, scripts/, tests/)
- [X] T002 Generate pyproject.toml with FastAPI, qdrant-client, asyncpg, openai, openai-agents, pydantic v2, pytest dependencies
- [X] T003 [P] Create requirements.txt as fallback for pip install
- [X] T004 [P] Create .env.example with 5 required variables (NEON_DATABASE_URL, QDRANT_CLUSTER_ID, QDRANT_API_ENDPOINT, QDRANT_API_KEY, COHERE_API_KEY)
- [X] T005 [P] Create .gitignore for Python (__pycache__, .venv, .env, *.pyc, .mypy_cache)
- [X] T006 [P] Create docker-compose.yml for local development (FastAPI service, optional Neon + Qdrant)
- [X] T007 [P] Create README.md skeleton with project overview and setup instructions
- [X] T008 [P] Create Dockerfile for FastAPI container deployment

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 Create app/config/settings.py with Pydantic BaseSettings for all environment variables
- [X] T010 [P] Create app/db/connection.py with async connection pool management for Neon Postgres
- [X] T011 [P] Create app/db/migrations.py with schema creation for chunks_metadata table (book_id, chunk_id, source_file, chapter, section, position)
- [X] T012 [P] Create app/services/qdrant_service.py with Qdrant client initialization and collection management
- [X] T013 [P] Create app/services/cohere_service.py with Cohere embedding client (via OpenAI SDK with base_url override)
- [X] T014 [P] Create app/services/chunking.py with fixed-size chunking + overlap logic (default 500 tokens, 50 overlap)
- [X] T015 Create app/models/ingest.py with IngestRequest, IngestResponse, ChunkMetadata Pydantic schemas
- [X] T016 Create app/models/chat.py with ChatRequest, ChatResponse, Citation Pydantic schemas
- [X] T017 Create app/models/health.py with HealthResponse Pydantic schema
- [X] T018 Configure pytest in pyproject.toml with pytest-asyncio plugin and test discovery
- [X] T019 Create tests/conftest.py with fixtures for test client, mock Qdrant/Neon services, and sample book data

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Ingest Book Content (Priority: P1) 🎯 MVP

**Goal**: Enable authors to process book content (markdown/text) into searchable chunks with embeddings, stored in Qdrant + Neon

**Independent Test**: Run ingestion script on sample book directory and verify (a) chunks created, (b) vectors in Qdrant, (c) metadata in Neon. Can be tested independently without chat functionality.

### Implementation for User Story 1

- [X] T020 [P] [US1] Create scripts/ingest_book.py CLI script with argparse for --path argument
- [X] T021 [US1] Implement ingestion orchestrator in scripts/ingest_book.py that calls chunking, embedding, and storage services
- [X] T022 [P] [US1] Implement file discovery logic in scripts/ingest_book.py (recursive directory scan for .md and .txt files)
- [X] T023 [US1] Implement idempotent ingestion logic in scripts/ingest_book.py (compute chunk hash, upsert by source_file + position)
- [X] T024 [US1] Implement error handling in scripts/ingest_book.py with per-file error reporting (continue on failure, report summary)
- [X] T025 [P] [US1] Add batch embedding generation in app/services/cohere_service.py with rate limit handling (10 chunks per batch)
- [X] T026 [US1] Implement metadata persistence in app/services/neon_service.py with async upsert to chunks_metadata table
- [X] T027 [US1] Implement vector upsert in app/services/qdrant_service.py with payload metadata (chunk_id, source_file, chapter, section)
- [X] T028 [P] [US1] Create app/api/ingest.py with POST /api/v1/ingest endpoint (triggers ingestion via background task)
- [X] T029 [US1] Add progress logging in scripts/ingest_book.py (files processed, chunks created, embeddings generated)
- [X] T030 [US1] Implement chapter/section extraction in app/services/chunking.py (parse markdown headers # ## for metadata)

**Checkpoint**: At this point, User Story 1 should be fully functional. Ingestion script processes books and stores chunks with metadata.

---

## Phase 4: User Story 2 - Ask Book Questions via Full-Book RAG (Priority: P2)

**Goal**: Enable readers to ask natural language questions and receive accurate, citation-backed answers based on retrieved book passages

**Independent Test**: Ingest sample book, send chat queries via API, verify (a) responses grounded in content, (b) citations included, (c) fallback for off-topic queries. Works independently without selected-text mode.

### Implementation for User Story 2

- [X] T031 [P] [US2] Create app/agents/retriever.py with RetrieverAgent class (Qdrant vector search tool)
- [X] T032 [US2] Implement vector search logic in app/agents/retriever.py with top-k retrieval (default k=5)
- [X] T033 [P] [US2] Create app/agents/router.py with RouterAgent class (detects full-book vs selected-text mode)
- [X] T034 [US2] Implement mode detection logic in app/agents/router.py (checks for selected_text field in request)
- [X] T035 [P] [US2] Create app/agents/rag_agent.py with main RAG agent using openai-agents SDK
- [X] T036 [US2] Initialize Cohere-compatible OpenAI client in app/agents/rag_agent.py (base_url="https://api.cohere.ai/compatibility/v1")
- [X] T037 [US2] Create system prompt in app/agents/rag_agent.py enforcing strict grounding (only use retrieved chunks, cite sources, fallback when no relevant content)
- [X] T038 [US2] Attach RetrieverAgent tool to main RAG agent in app/agents/rag_agent.py
- [X] T039 [P] [US2] Implement query embedding in app/services/cohere_service.py for semantic search
- [X] T040 [US2] Implement citation extraction in app/agents/rag_agent.py (parse agent response for chunk references)
- [X] T041 [US2] Implement fallback response in app/agents/rag_agent.py ("I cannot answer this from the book content provided")
- [X] T042 [P] [US2] Create app/api/chat.py with POST /api/v1/chat endpoint (full-book RAG mode)
- [X] T043 [US2] Implement request validation in app/api/chat.py using Pydantic models (query required, book_id optional)
- [X] T044 [US2] Implement response formatting in app/api/chat.py with answer + citations + mode fields
- [X] T045 [US2] Add error handling in app/api/chat.py for Qdrant/Neon/Cohere failures (descriptive messages, proper HTTP status)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Readers can ingest books and ask questions with citation-backed answers.

---

## Phase 5: User Story 3 - Ask Questions About Selected Text (Priority: P3)

**Goal**: Enable readers to highlight specific passages and receive focused Q&A using selected text as primary context

**Independent Test**: Send chat requests with selected_text field containing book passage, verify (a) response prioritizes selected text, (b) citations distinguish selected vs retrieved, (c) accurate passage-specific answers. Works independently building on US1+US2 foundation.

### Implementation for User Story 3

- [X] T046 [P] [US3] Create app/agents/selected_text.py with SelectedTextAgent class
- [X] T047 [US3] Implement selected-text prioritization in app/agents/selected_text.py (force-inject as highest-relevance chunk)
- [X] T048 [US3] Implement conditional retrieval logic in app/agents/selected_text.py (retrieve additional chunks only if selected text insufficient)
- [X] T049 [US3] Implement citation distinction in app/agents/selected_text.py (mark selected text vs retrieved chunks)
- [X] T050 [P] [US3] Add SelectedTextAgent tool to main RAG agent in app/agents/rag_agent.py
- [X] T051 [US3] Update RouterAgent in app/agents/router.py to route selected_text requests to SelectedTextAgent
- [X] T052 [P] [US3] Create POST /api/v1/chat/selected endpoint in app/api/chat.py
- [X] T053 [US3] Implement request validation in app/api/chat.py for selected-text mode (selected_text optional, strip whitespace, treat empty as full-book mode)
- [X] T054 [US3] Add prompt injection protection in app/agents/selected_text.py (sanitize selected text, max length 5000 chars)
- [X] T055 [US3] Implement selected-text embedding in app/services/cohere_service.py (for similarity-based retrieval)

**Checkpoint**: All three user stories should now be independently functional. US3 adds selected-text mode on top of US1+US2 foundation.

---

## Phase 6: Health Check & Diagnostics (Cross-Cutting)

**Purpose**: Add observability and debugging endpoints

- [X] T056 [P] Create app/api/health.py with GET /api/v1/health endpoint
- [X] T057 Implement service health checks in app/api/health.py (Qdrant connection, Neon connection, Cohere API)
- [X] T058 [P] Add GET /api/v1/chunks endpoint in app/api/ingest.py for debugging (list chunks filtered by book/chapter)
- [X] T059 Implement chunk listing logic in app/api/ingest.py with pagination (chunk_id, source_file, position)

---

## Phase 7: FastAPI Application Integration

**Purpose**: Wire all components together into main FastAPI application

- [X] T060 Create app/main.py FastAPI application instance
- [X] T061 Implement async lifespan in app/main.py (initialize Neon connection pool, Qdrant client on startup)
- [X] T062 [P] Register API routes in app/main.py (include routers from chat.py, ingest.py, health.py)
- [X] T063 Configure CORS middleware in app/main.py for frontend widget future integration
- [X] T064 [P] Add global exception handler in app/main.py for consistent error responses
- [X] T065 Configure logging in app/main.py (structured JSON logs, log levels, request tracking)

---

## Phase 8: Testing (Basic Coverage)

**Purpose**: Verify core functionality with essential tests

- [X] T066 [P] Create tests/unit/test_chunking.py with test_fixed_size_chunking and test_chunk_overlap
- [X] T067 [P] Create tests/unit/test_services.py with test_qdrant_client_init and test_neon_connection_pool
- [X] T068 [P] Create tests/integration/test_full_rag_flow.py with test_ingest_to_chat_end_to_end
- [X] T069 Create tests/integration/test_selected_text_flow.py with test_selected_text_priority
- [X] T070 Add test fixtures in tests/conftest.py for sample book content and mock embeddings

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T071 [P] Complete README.md with setup instructions, environment variables, ingestion command, server start
- [X] T072 [P] Add API documentation section in README.md with curl examples for all endpoints
- [X] T073 [P] Add deployment notes in README.md (Railway/Fly.io/Render free tier setup)
- [X] T074 Add type hint validation in pyproject.toml (mypy strict mode configuration)
- [X] T075 [P] Add linting configuration in pyproject.toml (ruff for formatting and import sorting)
- [X] T076 Run mypy and ruff on all code and fix type hints and formatting issues
- [X] T077 [P] Add .env.example documentation with detailed comments for each variable
- [X] T078 Add idempotency test in tests/integration/test_full_rag_flow.py (re-run ingestion, verify no duplicates)
- [X] T079 Add free-tier storage monitoring in scripts/ing_book.py (warn if approaching 1GB Qdrant limit)
- [X] T080 Verify all constitution constraints (Cohere-only, type hints, free-tier compliance) and fix violations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-5)**: All depend on Foundational phase completion
  - User Story 1 (Ingestion): Can start after Foundational - No dependencies on other stories
  - User Story 2 (Full-Book RAG): Can start after Foundational - May integrate with US1 for testing
  - User Story 3 (Selected-Text): Depends on US1 (for ingestion) and US2 (for RAG foundation) - Extends chat functionality
- **Health Check (Phase 6)**: Depends on Foundational - Can run in parallel with user stories
- **FastAPI Integration (Phase 7)**: Depends on Phases 2-6 completion (wires everything together)
- **Testing (Phase 8)**: Depends on Phases 3-5 implementation (tests the working features)
- **Polish (Phase 9)**: Depends on all previous phases (cross-cutting improvements)

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 but independently testable with mock data
- **User Story 3 (P3)**: Depends on US1 (for content ingestion) and US2 (for RAG agent foundation) - Builds on top of existing chat functionality

### Within Each Phase

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel
- Once Foundational phase completes, User Stories 1 and 2 can start in parallel (if team capacity allows)
- Within User Story 3, tasks marked [P] can run in parallel
- All tests can be written in parallel (marked [P])

### Parallel Opportunities

**Phase 1 (Setup)**: All tasks can run in parallel (T003-T008)
```bash
Task: "Create requirements.txt"
Task: "Create .env.example"
Task: "Create .gitignore"
Task: "Create docker-compose.yml"
Task: "Create README.md skeleton"
Task: "Create Dockerfile"
```

**Phase 2 (Foundational)**: Tasks T012-T014 can run in parallel
```bash
Task: "Create qdrant_service.py"
Task: "Create cohere_service.py"
Task: "Create chunking.py"
```

**After Foundational**: User Stories 1 and 2 can proceed in parallel
```bash
# US1 Track:
Task: "Create ingest_book.py CLI"
Task: "Implement ingestion orchestrator"

# US2 Track (parallel):
Task: "Create retriever.py"
Task: "Create router.py"
Task: "Create rag_agent.py"
```

**Within US1**: Tasks T020, T022, T025, T028 can run in parallel
**Within US2**: Tasks T031, T033, T035, T039, T042 can run in parallel
**Within US3**: Tasks T046, T050, T052 can run in parallel

---

## Parallel Example: User Story 2

```bash
# Launch all agents for User Story 2 together:
Task: "Create app/agents/retriever.py with RetrieverAgent class"
Task: "Create app/agents/router.py with RouterAgent class"
Task: "Create app/agents/rag_agent.py with main RAG agent"
Task: "Implement query embedding in app/services/cohere_service.py"
Task: "Create app/api/chat.py with POST /api/v1/chat endpoint"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T019)
3. Complete Phase 3: User Story 1 (T020-T030)
4. **STOP and VALIDATE**: Test ingestion independently with sample book
5. Verify chunks stored in Qdrant + Neon
6. Demo/Deploy if ingestion-only MVP is valuable

### Incremental Delivery (Recommended)

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Ingestion MVP works!
3. Add User Story 2 → Test independently → Chat MVP works!
4. Add User Story 3 → Test independently → Selected-text mode works!
5. Add Health Check + FastAPI Integration → Complete backend API
6. Add Tests + Polish → Production-ready backend

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - **Developer A**: User Story 1 (T020-T030)
   - **Developer B**: User Story 2 (T031-T045)
3. After US1 and US2 complete:
   - **Developer C**: User Story 3 (T046-T055)
4. Stories integrate and test together

---

## Notes

- **[P] tasks**: Different files, no dependencies on incomplete tasks
- **[Story] label**: Maps task to specific user story for traceability (US1, US2, US3)
- **User Story 4 (Widget)**: DEFERRED - not in scope for this implementation
- **Backend-only**: No frontend code (JS, HTML, CSS) in these tasks
- **Testing**: Basic test coverage included (Phase 8) - not comprehensive TDD approach
- **Cohere-only**: Verify no OpenAI API usage in code reviews
- **Free-tier**: Monitor storage usage, implement rate limits
- **Type safety**: 100% type hints enforced via mypy
- **Async-first**: All I/O operations use async/await
- **Commit strategy**: Commit after each task or logical group
- **Stop at checkpoints**: Validate each story independently before proceeding

**Total Task Count**: 80 tasks
- Phase 1 (Setup): 8 tasks
- Phase 2 (Foundational): 11 tasks
- Phase 3 (US1): 11 tasks
- Phase 4 (US2): 15 tasks
- Phase 5 (US3): 10 tasks
- Phase 6 (Health): 4 tasks
- Phase 7 (FastAPI): 6 tasks
- Phase 8 (Tests): 5 tasks
- Phase 9 (Polish): 10 tasks

**Parallel Opportunities**: 35 tasks marked [P] can run in parallel with appropriate dependencies

**MVP Scope**: Phases 1-3 (T001-T030) = 30 tasks for ingestion-only MVP
**Full Backend**: All phases (T001-T080) = 80 tasks for complete RAG chatbot backend
