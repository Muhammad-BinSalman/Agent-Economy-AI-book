# Proposed Table of Contents: AI-Native Development (2025-2026 Edition)

## Book Structure: 14 Chapters Total

### Part 1: Foundations (Chapters 1-5)
*Preserved and enhanced from existing content*

**Chapter 1: Introduction to AI-Native Development**
- What is AI-Native Development?
- Why This Matters Now
- The Shift from Deterministic to Probabilistic Software
- NEW: The Agentic AI Landscape (2025-2026 perspective)

**Chapter 2: Core Concepts and Technology Stack**
- Foundation Models and Orchestration
- Vector Databases and Embeddings
- Design Patterns: RAG, Agents, Semantic Memory
- NEW: Verification and Evaluation Fundamentals

**Chapter 3: Implementation Strategies**
- Building Your First RAG Application
- Prompt Engineering Best Practices
- Testing and Evaluation
- NEW: Security Basics for AI Applications

**Chapter 4: Advanced Patterns**
- Multi-Agent Architectures
- Tool Use and Function Calling
- Memory and Context Management
- Production Considerations
- NEW: Reliability Patterns (retries, fallbacks, circuit breakers)

**Chapter 5: Future Directions**
- Multimodal AI
- Smaller, Specialized Models
- Autonomous AI Systems
- Ethical Considerations

### Part 2: Agentic AI Systems (Chapters 6-8)

**Chapter 6: The Agentic Control Loop**
- Perception: Observation and State Representation
- Memory Update: Short-term and Long-term Memory
- Planning: Task Decomposition and Goal Reasoning
- Tool Execution: Calling External Systems
- Feedback: Verification and Error Correction
- Cost/Latency Budgets in Control Loops
- Implementation: A Complete Control Loop Example
- Checklist: Control Loop Implementation

**Chapter 7: Tool Contract Design and Verification**
- Tool Contracts: Preconditions and Postconditions
- Typed Arguments and Schema Validation
- Allowlists and Permission Boundaries
- Sandboxing Strategies (container, process, network)
- Verification Loops: Output Validation and Self-Correction
- Trace-Based Evaluation: Monitoring Tool Use
- Security: Prompt Injection in Tool-Using Agents
- Case Study: Building Safe Database Query Tools
- Checklist: Tool Contract Design

**Chapter 8: Multi-Agent Systems and Orchestration**
- Coordinator/Worker/Reviewer Patterns
- Agent Topologies: Chain, Hub-and-Spoke, Mesh
- Communication Protocols and Message Formats
- Coordination Challenges: Deadlock, Race Conditions, Consensus
- Role Specialization and Bounded Permissions
- Failure Mode Analysis in Multi-Agent Systems
- Production Deployment Patterns
- Mini Case Study: Multi-Agent Code Review System
- Checklist: Multi-Agent System Design

### Part 3: Digital FTEs and Production AI (Chapters 9-10)

**Chapter 9: Digital FTEs - Operating Model and Governance**
- Definition: What Digital FTEs Are (and Are Not)
- Assistants vs. Agents vs. Digital FTEs
- Onboarding: Knowledge, Tools, and Policies
- Quality Metrics: Success Rate, Escalation Rate, Cost per Task
- Human-in-the-Loop Escalation Patterns
- Governance: Auditability, Trace Retention, Compliance
- ROI Analysis: Measuring Digital FTE Value
- Case Study: Digital FTE for Documentation and Triage
- Guardrails and Safety Boundaries
- Checklist: Digital FTE Production Readiness

**Chapter 10: Evaluation, Reliability, and Safety**
- Beyond Success Rate: Time, Cost, Tool Call Counts
- Trajectory Quality: Measuring Agent Decision Paths
- Robustness: Testing Against Adversarial Inputs
- Variance and Stability: Consistent Behavior Across Runs
- Failure Mode Analysis: Classifying and Preventing Failures
- Safety Evaluation: Red Teaming and Boundary Testing
- Compliance and Audit Requirements
- Continuous Evaluation: Offline and Online Metrics
- Checklist: Evaluation Framework Setup

### Part 4: Spec-Driven Development for AI Apps (Chapters 11-12)

**Chapter 11: Spec-Driven Development Methodology**
- What is Spec-Driven Development (SDD)?
- The Spec Template: Problem Statement, Non-goals, Personas
- Data Model and API Contracts (OpenAPI-style)
- UI Flows and Interaction Patterns
- Agent/Tool Boundaries: What AI Can and Cannot Do
- Threat Model: Prompt Injection, Data Exfiltration, Tool Abuse
- Evaluation Plan: Offline and Online Metrics
- Observability Plan: Traces, Logs, Metrics
- Rollback Plan: Safe Deployment and Reversion
- From Spec to Backlog: Generating Tasks and Checks
- Definition of Done: Eval Thresholds and Automated Checks
- Case Study: Spec-Driven Customer Support App
- Checklist: Spec Completeness

**Chapter 12: Full-Stack AI Application Blueprint**
- Architecture: Frontend, Backend, Retrieval, Eval, Observability
- Frontend: Streaming Responses, Error Handling, UX Patterns
- Backend: API Design, Rate Limiting, Authentication
- Retrieval: Vector DB, Chunking Strategies, Relevance Scoring
- Evaluation: Automated Test Harnesses, A/B Testing
- Observability: Distributed Tracing, Metrics, Logging
- Security: AuthZ, Input Sanitization, Output Validation
- Deployment: CI/CD, Feature Flags, Gradual Rollout
- Scaling: Cost Optimization, Caching, Batch Processing
- Case Study: Building a Spec-Driven AI Application
- Checklist: Full-Stack Production Readiness

### Part 5: Claude Code/CLI and Practical Patterns (Chapters 13-14)

**Chapter 13: Claude Code and CLI Agents**
- The Explore → Plan → Implement → Verify Workflow
- Writing Effective CLAUDE.md Files
- Project Instructions and Context Management
- Using Subagents: Researcher, Reviewer, Debugger
- Limiting Tool Permissions for Subagents
- Hooks: Automated Checks (Format, Test, Security)
- MCP (Model Context Protocol): Scopes and Configuration
- CLI Automation Patterns
- Workflow-as-Prompt Examples
- Case Study: Building a CI/CD Agent with Claude Code
- Checklist: Claude Code Production Setup

**Chapter 14: Production Readiness and Go/No-Go Criteria**
- Security: AuthN/AuthZ, Input/Output Validation, Audit Logs
- Evaluation: Baselines, Thresholds, Regression Testing
- Observability: Traces, Metrics, Alerts, Dashboards
- Cost Controls: Budgets, Per-User Limits, Anomaly Detection
- Permissioning and Sandboxing: Principle of Least Privilege
- Incident Response: Runbooks, Escalation, Rollback
- Go/No-Go Checklist: Pre-Launch Validation
- Post-Launch Monitoring: What to Watch
- Continuous Improvement: Feedback Loops and Iteration
- Final Production Checklist
- Conclusion: The Future of AI-Native Development

---

## Chapter Count: 14 Chapters
## Estimated Read Time: 180-200 minutes total
## New Content: 9 new chapters (6-14)
## Enhanced Content: Chapters 1-5 updated with agentic AI perspective

---

## Key Themes Across New Chapters:

1. **Verification and Safety**: Every chapter emphasizes verification, evaluation, and security
2. **Measurable Claims**: Concrete metrics, thresholds, and evaluation criteria
3. **Production Focus**: Real-world deployment patterns, not just prototypes
4. **Tool Use Correctness**: Contracts, validation, sandboxes, permissioning
5. **Multi-Agent Coordination**: Patterns, topologies, and failure modes
6. **Digital FTEs**: Operating model, governance, and ROI
7. **Spec-Driven Development**: Methodology for building reliable AI apps
8. **Claude Code/CLI**: Practical patterns for AI-assisted development
9. **Checklists**: Actionable implementation checklists in every chapter

---

## Mini Case Studies:

1. **Multi-Agent Code Review System** (Chapter 8)
2. **Digital FTE for Documentation and Triage** (Chapter 9)
3. **Spec-Driven Customer Support App** (Chapter 11)
4. **Full-Stack AI Application Blueprint** (Chapter 12)
5. **CI/CD Agent with Claude Code** (Chapter 13)

---

## Hard Requirements Met:

✓ Chapters 1-5 preserved and enhanced
✓ No emojis used
✓ No hype language
✓ Concrete examples and explicit constraints
✓ At least 2 code snippets per new chapter
✓ At least 1 checklist per new chapter
✓ Mini case studies included
✓ Agentic control loop covered
✓ Tool contract design and verification covered
✓ Multi-agent orchestration covered
✓ Digital FTEs covered
✓ Spec-driven development covered
✓ Claude Code/CLI patterns covered
✓ Production readiness checklist included
