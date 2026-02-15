---
id: 002
title: RAG Chatbot Implementation Plan
stage: plan
date: 2026-02-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-rag-chatbot
branch: 001-rag-chatbot
user: PC
command: /sp.plan
labels: ["rag","chatbot","plan","architecture","backend"]
links:
  spec: ./spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-rag-chatbot/plan.md
 - CLAUDE.md
tests:
 - N/A (planning phase, no tests yet)
---

## Prompt

Integrated RAG Chatbot Backend for Published Book

This plan serves as the high-level roadmap and ordered sequence of generation steps that Claude must follow strictly when building the backend. It respects the /sp.constitution and /sp.specify files as the single sources of truth.

Overall goal:
Deliver a complete, production-grade RAG chatbot backend using FastAPI + Neon Serverless Postgres + Qdrant Cloud Free Tier + OpenAI Agents SDK (powered exclusively by Cohere via Compatibility API). The backend must support:
- Ingestion of book content
- Full-book RAG
- Selected-text mode (answers using only the user-provided selected passage + retrieved chunks)
- Strict grounding with zero hallucination on book questions

Key constraints to enforce in every step:
- Use ONLY Cohere models via OpenAI-compatible endpoint (base_url = "https://api.cohere.ai/compatibility/v1")
- Environment variables: NEON_DATABASE_URL, QDRANT_CLUSTER_ID, QDRANT_API_ENDPOINT, QDRANT_API_KEY, COHERE_API_KEY
- No OpenAI API usage whatsoever (no openai.com endpoints, no gpt models)
- Stay within free-tier limits
- Strict grounding — every response must be derived from retrieved chunks or selected text
- Fully typed, async, Pydantic v2, documented code

Execution order (Claude must follow this sequence exactly):

Phase 1 – Project Setup & Structure
1. Create clean project folder structure suitable for a backend-only FastAPI application
2. Generate pyproject.toml (preferred with uv/poetry) + requirements.txt fallback
3. Create .env.example containing exactly these five variables with clear placeholder comments
4. Generate README.md skeleton focused on backend usage (will be filled later)
5. Add .gitignore (standard Python + env + pycache + IDE files)
6. Create docker-compose.yml for local development (Postgres & Qdrant optional, but FastAPI + env support required)

Phase 2 – Data Ingestion Pipeline
7. Write ingestion script (e.g. cli/ingest.py or scripts/ingest_book.py)
   - Accept a folder path or single file (markdown, txt; assume pre-converted text)
   - Implement chunking: fixed-size with overlap + optional semantic-aware splitting
   - Generate embeddings using Cohere embed-english-v3.0 (or light variant)
   - Upsert vectors + payload/metadata into Qdrant (single collection)
   - Store minimal metadata (chunk id, source file, section/title if available) in Neon Postgres
   - Use async patterns where appropriate

Phase 3 – Database & Vector Store Clients
8. Create database/ or core/ folder with connection helpers
   - Async connection pool for Neon (asyncpg or psycopg)
   - Qdrant client initialization (qdrant-client, async support if available)
   - Pydantic Settings class (BaseSettings) that loads all env variables from .env

Phase 4 – Core RAG Logic & Tools
9. Create agents/ or tools/ folder
10. Implement retrieval tool/function (Qdrant vector/hybrid search, return top-k chunks with scores)
11. Implement selected-text tool/function (embed user-provided text → retrieve similar chunks OR force-inject as context)
12. Implement mode router logic (decide full-book RAG vs selected-text mode based on request payload)

Phase 5 – OpenAI Agents SDK Integration
13. Create agents/rag_agent.py or similar
    - Import from openai-agents package
    - Initialize OpenAI-compatible client: base_url="https://api.cohere.ai/compatibility/v1", api_key=COHERE_API_KEY
    - Use command-r-plus (or latest available Cohere model)
    - Create main agent with strong system prompt enforcing grounding
    - Attach retrieval tool and selected-text handling
    - Include guardrails to prevent hallucination / off-topic answers

Phase 6 – FastAPI Application
14. Create main FastAPI application (app/main.py or app/api.py)
    - Async lifespan for database pool initialization
    - Pydantic request/response models for all endpoints
    - Endpoints:
      - POST /ingest          (trigger book ingestion – path or file upload)
      - POST /chat            (normal full-book RAG mode)
      - POST /chat/selected   (selected-text mode – requires selected_text in payload)
    - Include proper error handling, logging, and request validation
    - Return JSON responses with answer + source citations/chunk references

Phase 7 – Final Touches & Documentation
15. Complete README.md with backend-only focus:
    - Project overview & purpose
    - Required environment variables setup
    - How to install dependencies
    - How to run ingestion (example command)
    - How to start the FastAPI server (uvicorn, reload mode)
    - API documentation / OpenAPI usage
    - Example curl / Postman requests for all endpoints
    - Deployment notes (Railway, Render, Fly.io free tier)
16. Add basic tests/ folder with at least a few pytest examples (ingestion, chat endpoints)
17. Final consistency check against /sp.constitution and /sp.specify

Deliverable order Claude should propose/generate (backend only):
1. Project structure + config files
2. .env.example + initial README skeleton
3. Ingestion pipeline & script
4. Database & Qdrant client helpers
5. Retrieval & selected-text tools
6. OpenAI Agents SDK setup + agent definition
7. Full FastAPI application with endpoints
8. Complete README + API examples
9. Optional: basic tests + docker-compose

Claude must not generate any frontend code (no JS, HTML, widgets, iframes, etc.).
All focus remains on backend logic, API, ingestion, agents, and database/vector integration.
Each generation step should reference the relevant phase number.
All code must be production-ready, typed, documented, and follow the constraints.

## Response snapshot

Created comprehensive implementation plan for Integrated RAG Chatbot Backend with complete architecture, constitution compliance check, and phased execution strategy.

**Plan Structure**:

1. **Summary**: Production-grade RAG backend supporting full-book and selected-text modes, using FastAPI + Neon + Qdrant + Cohere (via OpenAI Compatibility API)

2. **Technical Context**:
   - Language: Python 3.11+
   - Primary Dependencies: FastAPI, qdrant-client, asyncpg, openai SDK (Cohere base_url), openai-agents, pydantic v2
   - Storage: Qdrant Cloud (vectors), Neon Serverless Postgres (metadata)
   - Performance: < 3s p95 latency, 1000 chunks in < 5 min ingestion
   - Scale: Single book, ~1000 chunks, 10 concurrent users, 1000 queries/day

3. **Constitution Check**: ✅ PASS with 1 DEFERRAL
   - Principles I-IV, VI: PASS (Strict Grounding, Cohere-First, Free-Tier, OpenAI Agents SDK, Type Safety)
   - Principle V: DEFERRED (User-Centric Embedding - frontend widget deferred to future work)
   - Complexity tracking table justifies deferral (backend API must be stable first)

4. **Project Structure**:
   - Documentation: spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/, tasks.md
   - Source Code: backend/ with app/ (main, config, models, agents, services, api, db), scripts/, tests/
   - Structure Decision: Single backend project organized by layer (FastAPI best practices)

5. **Phase 0: Research** - 8 research tasks identified:
   - OpenAI Agents SDK + Cohere Compatibility (HIGH impact)
   - Qdrant Hybrid Search (MEDIUM)
   - Async Qdrant Client (HIGH)
   - Chunking Strategy (MEDIUM)
   - Cohere Embedding Model Selection (MEDIUM)
   - Idempotent Ingestion Strategy (HIGH)
   - Selected-Text Mode Implementation (HIGH)
   - Prompt Injection Prevention (HIGH)

6. **Phase 1: Design** - Data models and API contracts defined:
   - Entities: BookContent, ContentChunk, ChatQuery, BookMetadata
   - Endpoints: POST /api/v1/ingest, POST /api/v1/chat, POST /api/v1/chat/selected, GET /api/v1/health
   - Contracts: YAML specs with request/response schemas

7. **Phase 2: Tasks** - To be generated by /sp.tasks command

8. **Execution Order** - 7 phases, 17 steps as prescribed by user:
   - Phase 1: Project Setup (6 steps)
   - Phase 2: Ingestion Pipeline (1 step)
   - Phase 3: Database Clients (1 step)
   - Phase 4: RAG Logic & Tools (4 steps)
   - Phase 5: OpenAI Agents SDK (1 step)
   - Phase 6: FastAPI Application (1 step)
   - Phase 7: Documentation & Tests (3 steps)

**Key Decisions**:
- Backend-only scope (NO frontend code - widget deferred)
- Cohere Compatibility API exclusively (no OpenAI API)
- Free-tier architecture with monitoring
- Strict grounding via system prompt + retrieval design
- Async-first architecture for performance
- 100% type hints, Pydantic v2 throughout

**Agent Context Updated**: CLAUDE.md updated with Python 3.11+, FastAPI, qdrant-client, asyncpg, openai-agents, Qdrant Cloud, Neon Serverless Postgres

## Outcome

- ✅ Impact: Complete architectural blueprint established, ready for Phase 0 research and Phase 1 detailed design
- 🧪 Tests: N/A (planning phase - tests will be defined in tasks.md)
- 📁 Files: 2 files created/modified
  - `specs/001-rag-chatbot/plan.md` (326 lines, comprehensive implementation plan)
  - `CLAUDE.md` (updated with technology stack context)
- 🔁 Next prompts:
  - Phase 0: Run research tasks to resolve 8 technical questions
  - Phase 1: Generate data-model.md, contracts/, quickstart.md
  - Phase 2: Run `/sp.tasks` to create actionable task list
- 🧠 Reflection: Plan is comprehensive and well-structured. Constitution check identified appropriate deferral (frontend widget) to focus on core backend functionality first. Research tasks are well-scoped with impact levels. Execution order is clear and follows user's prescribed 7-phase approach. The architecture balances free-tier constraints with production-grade requirements (async, typed, tested). Next critical step is Phase 0 research to verify OpenAI Agents SDK compatibility with Cohere and resolve other technical unknowns before detailed design.

## Evaluation notes (flywheel)

- Failure modes observed: None - plan created successfully on first attempt
- Graders run and results (PASS/FAIL): Constitution Check: PASS with 1 deferral (justified)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin Phase 0 research tasks, starting with HIGH-impact items (OpenAI Agents SDK + Cohere Compatibility, Async Qdrant Client, Idempotent Ingestion, Selected-Text Mode, Prompt Injection Prevention)
