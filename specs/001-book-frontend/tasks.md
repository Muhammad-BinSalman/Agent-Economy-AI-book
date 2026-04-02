# Tasks: Docusaurus Book Frontend

**Input**: Design documents from `/specs/001-book-frontend/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Tests are OPTIONAL for this frontend feature. Manual browser testing is the primary validation method.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Docusaurus Project**: `book-website/` at repository root
- **Content**: `book-website/docs/`
- **Custom Code**: `book-website/src/`
- **Config**: `book-website/docusaurus.config.js`, `book-website/sidebars.js`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Docusaurus project and basic structure

- [ ] T001 Create book-website directory and initialize Docusaurus v3.x project using `npx create-docusaurus@latest book-website classic`
- [ ] T002 Navigate to book-website/ and install dependencies with `npm install`
- [ ] T003 Verify Node.js 20+ is installed with `node --version` (upgrade if needed)
- [ ] T004 [P] Create .gitignore file with Node.js standard patterns (node_modules/, build/, .env*, .DS_Store)
- [ ] T005 [P] Create initial docs/ directory structure with intro.md placeholder
- [ ] T006 Test local development server with `npm start` and verify http://localhost:3000 loads

**Checkpoint**: Docusaurus project initialized and running locally

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Configure docusaurus.config.js with site metadata (title, tagline, url, baseUrl, favicon)
- [ ] T008 [P] Configure docs routing in docusaurus.config.js (routeBasePath: '/', sidebarPath, editUrl: null)
- [ ] T009 [P] Configure theme settings in docusaurus.config.js (navbar, colorMode, prism languages)
- [ ] T010 [P] Create custom CSS file in src/css/custom.css with typography variables (font-size, line-height, spacing)
- [ ] T011 Create sidebars.js file with basic structure (empty categories for chapters)
- [ ] T012 [P] Create src/theme/Root.js wrapper component for future ChatWidget integration
- [ ] T013 [P] Add sample chapter structure in docs/ (chapter-1/index.md, chapter-1/section-1-1.md)
- [ ] T014 Test build with `npm run build` and verify no errors

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Read Book Content (Priority: P1) 🎯 MVP

**Goal**: Readers can browse and read the complete book content in an organized, easy-to-navigate format with excellent readability

**Independent Test**: Navigate to the site, browse the table of contents, click through chapters, and read content. Verify responsive layout on mobile, tablet, and desktop.

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create frontmatter pages: docs/intro.md (Introduction), docs/about.md (About)
- [ ] T016 [P] [US1] Create chapter-1 directory structure with index.md and 2-3 section markdown files
- [ ] T017 [P] [US1] Create chapter-2 directory structure with index.md and 2-3 section markdown files
- [ ] T018 [P] [US1] Add frontmatter to all markdown files (title, sidebar_label, description, slug)
- [ ] T019 [US1] Update sidebars.js with complete chapter hierarchy (categories, collapsible settings, items)
- [ ] T020 [US1] Implement reading-optimized typography in src/css/custom.css (max-width 42rem, line-height 1.7, heading spacing)
- [ ] T021 [US1] Configure responsive content layout in src/css/custom.css (mobile breakpoints, padding adjustments)
- [ ] T022 [US1] Add code block horizontal scroll in src/css/custom.css (overflow-x: auto, white-space: pre)
- [ ] T023 [US1] Test navigation flow: Click sidebar links, verify page transitions, test browser back/forward
- [ ] T024 [US1] Test responsive design: Resize browser window, test on mobile viewport (375px), tablet (768px), desktop (1920px)
- [ ] T025 [US1] Verify content rendering: Check headings, lists, code blocks, images, tables display correctly

**Checkpoint**: At this point, User Story 1 (P1 - MVP) should be fully functional. Users can read the book content with excellent readability and responsive design.

---

## Phase 4: User Story 2 - Search and Find Content (Priority: P2)

**Goal**: Readers can use full-text search to locate relevant chapters and sections quickly

**Independent Test**: Enter search terms in the search box and verify that relevant chapters/sections appear in results with context. Click results and verify navigation.

### Implementation for User Story 2

- [ ] T026 [P] [US2] Install search plugin: `npm install @easyops-cn/docusaurus-search-local`
- [ ] T027 [US2] Configure search plugin in docusaurus.config.js (hashed: true, indexDocs: true, searchResultLimits: 8)
- [ ] T028 [US2] Test search functionality: Run `npm start`, search for common terms, verify results appear
- [ ] T029 [US2] Verify search performance: Measure search response time (should be < 1 second for typical queries)
- [ ] T030 [US2] Test search result navigation: Click search results and verify correct page/section loads
- [ ] T031 [US2] Configure search context length in docusaurus.config.js (searchResultContextMaxLength: 50)

**Checkpoint**: User Stories 1 AND 2 should both work independently. Readers can browse content and search for specific topics.

---

## Phase 5: User Story 4 - Access AI Chat Assistant (Priority: P2)

**Goal**: Readers can access an AI chatbot assistant to ask questions about the book content (UI integration point only)

**Independent Test**: Locate the chat widget (floating button), verify it's visible from any page, click it and verify the placeholder appears.

### Implementation for User Story 4

- [ ] T032 [P] [US4] Create src/theme/ChatWidget/index.js component with floating button (position: fixed, bottom: 20px, right: 20px)
- [ ] T033 [US4] Style chat button in src/theme/ChatWidget/index.js (60px circular button, emoji or icon, hover effects)
- [ ] T034 [US4] Add onClick handler in src/theme/ChatWidget/index.js (alert or placeholder message)
- [ ] T035 [US4] Integrate ChatWidget into src/theme/Root.js (import and render component)
- [ ] T036 [US4] Add chat widget placeholder styles in src/css/custom.css (z-index: 1000, responsive adjustments)
- [ ] T037 [US4] Test chat widget visibility: Verify button appears on all pages (intro, chapters, sections)
- [ ] T038 [US4] Test mobile responsiveness: Verify widget doesn't interfere with content on mobile screens
- [ ] T039 [US4] Add accessibility attributes: aria-label, role="button", keyboard navigation support

**Checkpoint**: User Stories 1, 2, AND 4 should all work independently. Readers can read content, search, and access the chatbot placeholder.

---

## Phase 6: User Story 3 - Customize Reading Experience (Priority: P3)

**Goal**: Readers can toggle between light and dark modes to suit their reading preference

**Independent Test**: Toggle the theme switch button and verify the entire site switches between light and dark color schemes. Navigate between pages and verify theme persists.

### Implementation for User Story 3

- [ ] T040 [P] [US3] Configure colorMode in docusaurus.config.js (defaultMode: 'system', disableSwitch: false, respectPrefersColorScheme: true)
- [ ] T041 [US3] Verify theme toggle button appears in navbar (Docusaurus provides this automatically)
- [ ] T042 [US3] Test theme switching: Click toggle, verify instant switch (< 200ms)
- [ ] T043 [US3] Test theme persistence: Select theme, navigate to different pages, verify preference maintained
- [ ] T044 [US3] Test system preference mode: Change OS dark/light setting, verify site respects system preference
- [ ] T045 [US3] Verify custom CSS works in both modes: Check typography, spacing, content width in light and dark themes
- [ ] T046 [US3] Test chat widget in both themes: Verify widget styling works in light and dark modes

**Checkpoint**: All user stories should now be independently functional. Full reading experience with search, chat access, and theme customization.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and deployment preparation

- [ ] T047 [P] Add static assets: Create static/img/ directory, add favicon.ico, logo.svg (if needed)
- [ ] T048 [P] Create README.md in book-website/ with setup instructions (reference quickstart.md)
- [ ] T049 Optimize images: Convert to WebP format if needed, add lazy loading attributes
- [ ] T050 [P] Add meta tags for SEO: Configure additional metadata in docusaurus.config.js (keywords, author)
- [ ] T051 [P] Test all navigation paths: Verify all sidebar links work, check for broken links
- [ ] T052 Run full accessibility audit: Use Lighthouse accessibility checker, verify ARIA labels, keyboard navigation
- [ ] T053 Run performance audit: Use Lighthouse, verify LCP < 2.5s, navigation < 3s
- [ ] T054 Test cross-browser compatibility: Verify site works in Chrome, Firefox, Safari, Edge
- [ ] T055 Create production build: Run `npm run build`, verify build/ directory generated successfully
- [ ] T056 Test production build locally: Run `npm run serve`, verify built site works correctly
- [ ] T057 [P] Prepare Vercel deployment: Create vercel.json if needed (buildCommand, outputDirectory)
- [ ] T058 [P] Prepare Netlify deployment: Create netlify.toml if needed (build command, publish directory)
- [ ] T059 [P] Prepare GitHub Pages deployment: Update docusaurus.config.js with GitHub Pages settings (if using)
- [ ] T060 Run quickstart.md validation: Follow setup guide from scratch, verify all steps work

**Checkpoint**: Project is production-ready and can be deployed to Vercel/Netlify/GitHub Pages

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 (P1) → US2 (P2) → US4 (P2) → US3 (P3) in priority order
  - Or: All user stories can proceed in parallel after Foundational (if team capacity allows)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - MVP)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1, but uses same content
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Independent, adds floating widget
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent, uses Docusaurus built-in theming

### Within Each User Story

- Content creation (markdown files) can be done in parallel
- Configuration tasks marked [P] can run in parallel
- Integration tasks depend on component creation
- Testing tasks depend on implementation completion

### Parallel Opportunities

- **Setup (Phase 1)**: T004, T005 can run in parallel
- **Foundational (Phase 2)**: T008, T009, T010, T012, T013 can run in parallel
- **US1 (Phase 3)**: T015, T016, T017, T018 can run in parallel (different files)
- **US2 (Phase 4)**: T026 (install) can run while T027-T031 are sequential
- **US4 (Phase 5)**: T032, T033 can run in parallel (component + styles)
- **US3 (Phase 6)**: Mostly sequential (config → test → verify)
- **Polish (Phase 7)**: T047, T048, T050, T057, T058, T059 can run in parallel
- **After Foundational**: All 4 user stories (US1, US2, US3, US4) can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (P1 - MVP)

```bash
# Launch all content creation tasks together:
Task T015: "Create frontmatter pages: docs/intro.md, docs/about.md"
Task T016: "Create chapter-1 directory structure with index.md and sections"
Task T017: "Create chapter-2 directory structure with index.md and sections"
Task T018: "Add frontmatter to all markdown files"

# Then sequential tasks:
Task T019: "Update sidebars.js with complete chapter hierarchy"
Task T020: "Implement reading-optimized typography"
# ... rest of US1 tasks
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

**Fastest Path to Value**:

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T014) - **CRITICAL BLOCKER**
3. Complete Phase 3: User Story 1 (T015-T025)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Navigate site
   - Read content
   - Test responsive design
   - Verify typography
5. **MVP COMPLETE**: Deploy/demo if ready

**Result**: A fully functional book website with excellent reading experience and responsive design. No search, no chat, no theme toggle yet.

---

### Incremental Delivery (Recommended)

**Add Value Step-by-Step**:

1. **Increment 1 - MVP**: Setup + Foundational + US1 (P1)
   - Users can read the book content
   - Deploy to production
   - Gather feedback

2. **Increment 2 - Search**: Add US2 (P2)
   - Users can now search for specific topics
   - Deploy to production
   - Measure search usage

3. **Increment 3 - Chat Access**: Add US4 (P2)
   - Users see chat widget placeholder
   - Prepare for backend integration
   - Deploy to production

4. **Increment 4 - Theme Toggle**: Add US3 (P3)
   - Users can customize reading experience
   - Final polish and deployment

5. **Polish**: Phase 7 improvements
   - Optimize performance
   - Deploy to final hosting

**Result**: Each increment adds measurable value without breaking previous functionality.

---

### Parallel Team Strategy

**With Multiple Developers**:

1. **Team Completes Setup + Foundational Together** (T001-T014)
   - Everyone aligns on project structure
   - Configuration is standardized

2. **Once Foundational is Done, Split**:
   - **Developer A**: User Story 1 (P1 - MVP) - Content, sidebar, typography (T015-T025)
   - **Developer B**: User Story 2 (P2 - Search) - Search plugin, configuration (T026-T031)
   - **Developer C**: User Story 4 (P2 - Chat) - Chat widget component (T032-T039)

3. **Integrate and Test**:
   - Merge all stories
   - Cross-story testing
   - Deploy together

4. **Final Polish**:
   - **Developer A**: User Story 3 (P3 - Theme) + Performance (T040-T046, T049, T053)
   - **Developer B**: Deployment prep + documentation (T047, T048, T050, T057-T060)
   - **Developer C**: Testing + accessibility (T051, T052, T054, T056)

**Result**: Faster delivery with parallel work, minimal merge conflicts (different files).

---

## Notes

- **[P] tasks** = Different files, no dependencies, can run in parallel
- **[Story] label** = Maps task to specific user story for traceability (US1, US2, US3, US4)
- **Each user story** = Independently completable and testable
- **MVP = US1 only**: Setup → Foundational → US1 → Deploy
- **Manual testing** = Primary validation (Lighthouse, browser testing, responsive checks)
- **Commit frequently** = After each task or logical group
- **Checkpoints** = Stop and validate story independently before proceeding
- **Avoid**: Vague tasks, working on same file in parallel, skipping foundational phase

---

## Task Summary

| Phase | Tasks | Priority | Status |
|-------|-------|----------|--------|
| **Phase 1: Setup** | 6 tasks | Critical | Not started |
| **Phase 2: Foundational** | 8 tasks | Critical | Not started |
| **Phase 3: US1 (Read Content)** | 11 tasks | P1 - MVP | Not started |
| **Phase 4: US2 (Search)** | 6 tasks | P2 | Not started |
| **Phase 5: US4 (Chat Access)** | 8 tasks | P2 | Not started |
| **Phase 6: US3 (Theme Toggle)** | 7 tasks | P3 | Not started |
| **Phase 7: Polish** | 14 tasks | Final | Not started |
| **TOTAL** | **60 tasks** | - | **Ready to start** |

**Parallel Opportunities**: 25+ tasks marked [P] can be parallelized

**MVP Scope**: 25 tasks (Setup 6 + Foundational 8 + US1 11) = **42% of total effort**

**Estimated Timeline**:
- **Solo developer**: 3-5 days for MVP, 7-10 days for full project
- **2-3 developers**: 2-3 days for MVP, 4-6 days for full project (with parallelization)

---

**Tasks Status**: ✅ Generated and ready for execution
