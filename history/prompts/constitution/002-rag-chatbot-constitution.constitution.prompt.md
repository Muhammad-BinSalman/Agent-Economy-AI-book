---
id: 002
title: RAG Chatbot Constitution
stage: constitution
date: 2026-02-03
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-ai-native-book
user: PC
command: /sp.constitution
labels: ["constitution","rag","chatbot","cohere","agents"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - N/A (constitution update, no code tests)
---

## Prompt

/sp.constitution
Project: Integrated RAG Chatbot for Published Book

Description:
Build and embed a fully functional Retrieval-Augmented Generation (RAG) chatbot directly into a published digital book. The chatbot must:
- Answer questions exclusively based on the book's content
- Support a "selected-text mode" where the user highlights/pastes a passage and the bot answers only using that passage + retrieved chunks
- Use OpenAI Agents SDK (the official lightweight agent framework) but powered exclusively by Cohere models via Cohere's Compatibility API (base_url = "https://api.cohere.ai/compatibility/v1")

Core principles:
- Strict grounding: Every response must cite or be derived from retrieved book chunks or the user-selected text. Zero hallucination tolerance.
- Cohere-first: All LLM calls and embeddings must go through Cohere's OpenAI-compatible endpoint. Never use OpenAI API keys, models, or endpoints.
- User-centric embedding: The chatbot must be embeddable as a lightweight JS widget (iframe, web component, or script tag) into any modern web-based book (HTML/EPUB viewer, Next.js site, etc.).
- Production-grade serverless stack: FastAPI + Neon Serverless Postgres + Qdrant Cloud Free Tier.

Key standards:
- Backend: FastAPI (Python) with async endpoints
- Vector store: Qdrant Cloud Free Tier (use official qdrant-client, one collection, hybrid search if possible)
- Metadata store: Neon Serverless Postgres (store book metadata, chunk mappings, user sessions if needed)
- LLM & Embeddings:
  - Chat model: command-r-plus (or command-a-03-2025 if available)
  - Embedding model: embed-english-v3.0 (or embed-english-light-v3.0 for cost/size)
  - Client setup: openai.OpenAI(base_url="https://api.cohere.ai/compatibility/v1", api_key=COHERE_API_KEY)
- Agents: Use official OpenAI Agents SDK (openai-agents package) with Cohere-compatible client. Implement at least:
  - Retriever agent/tool (Qdrant search)
  - Selected-text agent/tool (injects user highlight as forced context)
  - Router/guard agent that decides whether to use selected-text mode or full-book RAG
- Chunking & ingestion: Simple but effective (semantic + fixed-size overlap). Provide an ingestion script that can process a directory of markdown/text files or a single PDF.
- Selected-text mode: Accept a `selected_text` field in the chat payload; if present, embed it and force it into the top context (or use it as a separate query).

Constraints:
- No OpenAI API usage whatsoever (no openai.com base URLs, no gpt-* models)
- Stay within free-tier limits (Qdrant ≤ 1 GB / 1 collection, Neon free compute, Cohere free tier rate limits)
- All secrets via environment variables only (.env + docker-compose example)
- Code must be clean, typed (pydantic), fully documented, and runnable with `uv` or `pip install -e .`
- Frontend embedding: Provide a minimal `chat-widget.js` + HTML example that can be dropped into any book page
- No external paid services beyond the ones explicitly listed

Success criteria:
- The chatbot correctly answers book-specific questions using only retrieved content
- Selected-text mode works: when a passage is provided, the bot ignores the rest of the book unless explicitly needed
- Full end-to-end flow works: ingest → embed → chat (normal + selected-text)
- OpenAI Agents SDK is used with Cohere Compatibility API (verifiable by inspecting client.base_url)
- Project is deployable to a free-tier environment (Railway, Fly.io, Render free, etc.) with one-click docker-compose
- Clear README with:
  - Setup instructions (Cohere key, Neon, Qdrant)
  - Ingestion command
  - How to embed the widget in a book
  - Example curl / Postman calls
- Zero hallucinations on test questions from the actual book content

This constitution is the single source of truth for every code-generation step in speckitplus/Claude Code.

## Response snapshot

Created a comprehensive RAG Chatbot Constitution (v2.0.0) that completely replaces the previous MDX-focused book website constitution (v1.0.0). This is a MAJOR version change representing a complete shift in project scope from a static website to an intelligent RAG system.

Key updates:

1. **Six Core Principles Established**:
   - Strict Grounding: Zero hallucination tolerance with mandatory citations
   - Cohere-First LLM Integration: All models via Cohere's OpenAI Compatibility API
   - Free-Tier Architecture: Qdrant + Neon + Cohere all on free tiers
   - OpenAI Agents SDK: Official agent framework configured for Cohere
   - User-Centric Embedding: Lightweight JS widget for any platform
   - Type Safety & Validation: Pydantic models and type hints throughout

2. **Scope Constraints Defined**:
   - Backend Stack: FastAPI + Qdrant + Neon + OpenAI SDK with Cohere
   - RAG Pipeline: 6-step architecture from query to citation
   - Selected-Text Mode: Specialized agent for highlighted passages
   - Chunking & Ingestion: Support for MD, TXT, and PDF with semantic chunking
   - API Contract: 4 core endpoints with defined schemas

3. **Development Standards Specified**:
   - Clear code organization with agents/, api/, models/, services/, ingestion/
   - Python naming conventions (snake_case for files/functions, PascalCase for classes)
   - Environment variable requirements with .env.example template
   - Git workflow with conventional commits

4. **Governance Framework**:
   - Amendment process with semantic versioning
   - Compliance verification through code reviews and testing
   - Complexity justification requirements for deviations
   - 7-point success criteria checklist

The Sync Impact Report documents all changes, confirming template compatibility and requiring no manual follow-ups.

## Outcome

- ✅ Impact: Transformational - Complete project scope change from static website to intelligent RAG chatbot system
- 🧪 Tests: N/A (constitution governance document, not executable code)
- 📁 Files: 1 file modified - `.specify/memory/constitution.md` (complete rewrite v1.0.0 → v2.0.0)
- 🔁 Next prompts: Consider running `/sp.specify` to define first feature (e.g., "Book Content Ingestion" or "Chat API Endpoint")
- 🧠 Reflection: This constitution establishes a strong technical foundation. The free-tier constraint will drive architectural decisions throughout development. The selected-text mode requirement is a key differentiator from generic RAG systems.

## Evaluation notes (flywheel)

- Failure modes observed: None - constitution created successfully
- Graders run and results (PASS/FAIL): N/A - no automated graders for constitution
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation by creating the first feature specification for ingestion pipeline or basic chat endpoint
