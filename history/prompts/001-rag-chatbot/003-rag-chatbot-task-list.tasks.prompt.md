---
id: 003
title: RAG Chatbot Task List
stage: tasks
date: 2026-02-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-rag-chatbot
branch: 001-rag-chatbot
user: PC
command: /sp.tasks
labels: ["rag","chatbot","tasks","implementation","backend"]
links:
  spec: ./spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-rag-chatbot/tasks.md
tests:
 - N/A (task generation phase, tests will be created during implementation)
---

## Prompt

[Empty user input - ran /sp.tasks command directly]

## Response snapshot

Generated comprehensive task list for RAG Chatbot Backend with 80 actionable tasks organized by user story priority (P1→P2→P3), enabling independent implementation and testing.

**Task Organization**:

1. **Phase 1: Setup** (8 tasks) - Project initialization
   - T001-T008: Directory structure, pyproject.toml, .env.example, .gitignore, docker-compose, README, Dockerfile

2. **Phase 2: Foundational** (11 tasks) - BLOCKING prerequisites for all user stories
   - T009-T019: Config/settings, DB connections, migrations, service clients (Qdrant, Neon, Cohere), Pydantic models, pytest setup

3. **Phase 3: User Story 1 (P1)** - Ingest Book Content 🎯 MVP
   - T020-T030: CLI ingestion script, chunking, embeddings, metadata storage, idempotency, error handling, /ingest endpoint
   - Independent Test: Run ingestion on sample book, verify chunks in Qdrant + Neon

4. **Phase 4: User Story 2 (P2)** - Full-Book RAG
   - T031-T045: RetrieverAgent, RouterAgent, RAG agent with Cohere client, system prompt, citation extraction, /chat endpoint
   - Independent Test: Ingest book, send queries, verify grounded responses with citations

5. **Phase 5: User Story 3 (P3)** - Selected-Text Mode
   - T046-T055: SelectedTextAgent, prioritization logic, conditional retrieval, prompt injection protection, /chat/selected endpoint
   - Independent Test: Send queries with selected_text, verify prioritization and citation distinction

6. **Phase 6: Health Check** (4 tasks)
   - T056-T059: /health endpoint, service health checks, /chunks debugging endpoint

7. **Phase 7: FastAPI Integration** (6 tasks)
   - T060-T065: Main app, lifespan, route registration, CORS, error handling, logging

8. **Phase 8: Testing** (5 tasks)
   - T066-T070: Unit tests (chunking, services), integration tests (full RAG flow, selected-text flow)

9. **Phase 9: Polish** (10 tasks)
   - T071-T080: Complete README, API docs, deployment notes, type hints, linting, storage monitoring, constitution compliance

**Task Format Compliance**:
✅ All 80 tasks follow required format: `- [ ] [ID] [P?] [Story?] Description with file path`
✅ Checkbox on every task
✅ Sequential Task IDs (T001-T080)
✅ [P] marker for 35 parallelizable tasks
✅ [Story] labels (US1, US2, US3) for user story phases
✅ File paths in all implementation tasks
✅ No tasks in Setup/Foundational/Polish phases (story labels only for user stories)

**Dependency Mapping**:
- User Story 1: Independent after Foundational (T020-T030)
- User Story 2: Independent after Foundational (T031-T045)
- User Story 3: Depends on US1+US2 (T046-T055)
- Phases 1-2 block all user stories (T001-T019 must complete first)

**Parallel Execution**:
- 35 tasks marked [P] can run in parallel
- Example: All config/service setup (T012-T014) can run together
- Example: After Foundational, US1 and US2 can proceed in parallel
- Example: Within US2, all agents (T031, T033, T035) can run together

**MVP Strategy**:
- MVP Scope: Phases 1-3 (T001-T030) = 30 tasks for ingestion-only functionality
- Full Backend: All phases (T001-T080) = 80 tasks for complete RAG chatbot
- Incremental: Each user story delivers independently testable value

**User Story 4 (Widget)**: DEFERRED - not included in task list (backend-only scope per plan.md)

## Outcome

- ✅ Impact: Ready-to-execute task breakdown with clear dependencies and parallel opportunities
- 🧪 Tests: N/A (task generation - tests defined as tasks T066-T070 in Phase 8)
- 📁 Files: 1 file created
  - `specs/001-rag-chatbot/tasks.md` (80 tasks, 9 phases, organized by user story)
- 🔁 Next prompts: Begin implementation with Phase 1 (Setup T001-T008) or proceed directly to MVP (Phases 1-3)
- 🧠 Reflection: Task list comprehensively maps spec requirements (48 FRs) and plan architecture to actionable implementation steps. User story organization enables independent testing and incremental delivery. 35 parallelizable tasks identified for team efficiency. MVP scope clearly defined (30 tasks for ingestion). Constitution compliance embedded in tasks (T080 verifies Cohere-only, type hints, free-tier). Ready for parallel team execution or sequential development.

## Evaluation notes (flywheel)

- Failure modes observed: None - task list generated successfully
- Graders run and results (PASS/FAIL): Format validation: ALL PASS (80/80 tasks follow required checklist format)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin Phase 1 Setup tasks (T001-T008) or proceed directly to MVP implementation (Phases 1-3, T001-T030)
