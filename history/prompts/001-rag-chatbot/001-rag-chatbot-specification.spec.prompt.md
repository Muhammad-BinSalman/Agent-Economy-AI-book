---
id: 001
title: RAG Chatbot Specification
stage: spec
date: 2026-02-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-rag-chatbot
branch: 001-rag-chatbot
user: PC
command: /sp.specify
labels: ["rag","chatbot","specification","cohere","agents"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-rag-chatbot/spec.md
 - specs/001-rag-chatbot/checklists/requirements.md
tests:
 - N/A (specification phase, no tests yet)
---

## Prompt

/sp.specify Integrated RAG Chatbot for Published Book

Target audience:
- Readers of the published digital book (web, EPUB viewer, Next.js site, etc.)
- Authors/publishers who want to embed an interactive, zero-hallucination chatbot directly into their book

Focus:
Build a complete, production-ready, embeddable RAG chatbot backend that:
- Uses only the book's content as knowledge source
- Supports two modes: (1) full-book RAG, (2) selected-text mode (user highlights/pastes a passage → chatbot answers using ONLY that passage + retrieved chunks)
- Powered exclusively by Cohere models (command-r-plus + embed-english-v3.0) through OpenAI Agents SDK via Cohere's official OpenAI-compatible endpoint
- Uses the exact stack: FastAPI + Neon Serverless Postgres + Qdrant Cloud Free Tier

Success criteria (must all be met):
- Ingestion script that processes a folder of markdown/text files (or PDF) → chunks → stores in Qdrant + Neon
- FastAPI backend with these endpoints:
  - POST /ingest (triggers chunking + vector + metadata storage)
  - POST /chat (normal RAG mode)
  - POST /chat/selected (selected-text mode – accepts selected_text field)
- Uses OpenAI Agents SDK (openai-agents package) with Cohere client:
  base_url = "https://api.cohere.ai/compatibility/v1"
  api_key = COHERE_API_KEY
- Router agent decides mode automatically or via explicit flag
- Every response is strictly grounded (no hallucination on book questions)
- Minimal embeddable frontend widget (chat-widget.js + HTML example) that can be dropped into any book page via <script> tag or iframe
- Full project runs with docker-compose or single command, using ONLY these environment variables:
  - NEON_DATABASE_URL
  - QDRANT_CLUSTER_ID
  - QDRANT_API_ENDPOINT
  - QDRANT_API_KEY
  - COHERE_API_KEY
- Clear README with setup, ingestion command, widget embedding instructions, and example curl calls

Constraints:
- No OpenAI API keys, base URLs, or models allowed anywhere
- Stay inside free-tier limits (Qdrant ≤ 1 GB, Neon free compute, Cohere free tier)
- Use Pydantic v2, async FastAPI, qdrant-client, psycopg2 or asyncpg
- Code must be fully typed, documented, and follow clean architecture
- All secrets loaded from .env only
- No additional paid services

Not building:
- A full frontend SPA or dashboard
- Support for non-Cohere models
- Real-time streaming (simple JSON responses are fine)
- User authentication / multi-user sessions
- Advanced features like memory, tools beyond retrieval, or voice
- PDF parsing library (assume pre-converted markdown/text is provided)

Deliverables Claude must generate step-by-step:
1. Project structure + pyproject.toml / requirements
2. .env.example with all five variables
3. Ingestion pipeline (chunking + Qdrant + Neon)
4. FastAPI app with agents + tools
5. Selected-text mode implementation
6. chat-widget.js + embedding example
7. README.md with full instructions
8. docker-compose.yml (optional but recommended)

This /sp.specify is the single source of truth for the entire generation process.

## Response snapshot

Created comprehensive feature specification for Integrated RAG Chatbot with complete user stories, functional requirements, and success criteria.

**Specification Structure**:

1. **User Scenarios (4 prioritized stories)**:
   - P1: Ingest Book Content (foundational capability)
   - P2: Ask Book Questions via Full-Book RAG (core value)
   - P3: Ask Questions About Selected Text (key differentiator)
   - P4: Embed Chat Widget in Book Pages (distribution mechanism)

2. **Functional Requirements (48 total)**:
   - Content Ingestion (7): FR-001 to FR-007
   - Chat - Full-Book RAG (7): FR-008 to FR-014
   - Chat - Selected-Text Mode (5): FR-015 to FR-019
   - Agent System (4): FR-020 to FR-023
   - API & Integration (7): FR-024 to FR-030
   - Frontend Widget (7): FR-031 to FR-037
   - Configuration & Deployment (5): FR-038 to FR-042
   - Data & Constraints (6): FR-043 to FR-048

3. **Key Entities (5 defined)**:
   - Book Content, Content Chunk, Chat Query, Book Metadata, Chat Session (optional)

4. **Success Criteria (24 measurable outcomes)** across:
   - Content Ingestion (4)
   - Chat Quality & Accuracy (4)
   - Selected-Text Mode (2)
   - Performance & Reliability (4)
   - Usability & Integration (4)
   - Free-Tier Compliance (2)
   - Code Quality & Maintainability (4)

5. **Edge Cases (16 identified)** across 4 categories:
   - Content & Retrieval (5)
   - Performance & Reliability (4)
   - Security & Boundaries (3)
   - User Experience (4)

6. **Assumptions (10 documented)** covering format, language, free-tier compliance, etc.

7. **Out of Scope (15 exclusions)** explicitly listed to prevent scope creep

**Quality Validation**:
- All checklist items PASS
- No implementation details in requirements/acceptance criteria
- All requirements testable and unambiguous
- All success criteria measurable and technology-agnostic
- Comprehensive edge case coverage
- Clear scope boundaries

## Outcome

- ✅ Impact: Foundation established for production RAG chatbot system
- 🧪 Tests: N/A (specification phase - tests will be defined in tasks.md)
- 📁 Files: 2 files created
  - `specs/001-rag-chatbot/spec.md` (270 lines, comprehensive specification)
  - `specs/001-rag-chatbot/checklists/requirements.md` (validation checklist, all PASS)
- 🔁 Next prompts: Proceed to `/sp.plan` for architecture design or `/sp.clarify` if refinements needed
- 🧠 Reflection: Specification is well-structured with clear prioritization. The four user stories are independently testable and can be developed incrementally. Selected-text mode is appropriately scoped as a differentiator. Edge case coverage is thorough, especially around security (prompt injection) and performance (rate limits, service unavailability).

## Evaluation notes (flywheel)

- Failure modes observed: None - specification created successfully on first attempt
- Graders run and results (PASS/FAIL): Specification quality checklist: ALL PASS (14/14 items)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to planning phase (`/sp.plan`) to design technical architecture, or consider running `/sp.clarify` if any aspects need refinement before planning
