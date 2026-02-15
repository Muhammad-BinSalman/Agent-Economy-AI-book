# Tasks: AI-Native Book Website

**Input**: Design documents from `/specs/001-ai-native-book/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are optional for this project. Manual testing with browser DevTools will be used.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web application (Next.js App Router)**: `app/`, `components/`, `lib/`, `types/`, `content/` at repository root
- Paths shown below follow the project structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create Next.js 15 project with TypeScript strict mode in repository root using `npx create-next-app@latest --typescript --tailwind --eslint`
- [X] T002 Initialize shadcn/ui using `npx shadcn@latest init` with default style, slate color, CSS variables enabled
- [ ] T003 [P] Add required shadcn/ui components: button, input, card using `npx shadcn@latest add button input card`
- [X] T004 [P] Install additional dependencies: `npm install next-themes lucide-react @next/mdx rehype-highlight remark-gfm clsx tailwind-merge`
- [X] T005 [P] Create directory structure: `mkdir -p components/ui lib types content/chapters public/images`
- [X] T006 Create TypeScript configuration with strict mode in tsconfig.json (ensure `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`)
- [X] T007 Configure Tailwind CSS for dark mode and custom paths in tailwind.config.ts (add content paths for app, components, content/chapters)
- [X] T008 Configure @next/mdx loader in next.config.mjs with rehype-highlight and remark-gfm plugins
- [X] T009 Create utility file lib/utils.ts with cn() helper function for merging Tailwind classes
- [X] T010 Create type definition files: types/chapter.ts, types/theme.ts, types/waitlist.ts based on data-model.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T011 Create root layout with theme provider in app/layout.tsx (ThemeProvider from next-themes, html with suppressHydrationWarning)
- [X] T012 Create global styles with Tailwind directives and glassmorphism utilities in app/globals.css
- [X] T013 [P] Create glassmorphism wrapper component in components/glass-container.tsx (props: blur, opacity, radius, children, className)
- [X] T014 [P] Create animated gradient background component in components/gradient-bg.tsx (props: colors, duration, className)
- [X] T015 [P] Create localStorage utility functions in lib/storage.ts (themeStorage, waitlistStorage with error handling)
- [X] T016 [P] Create MDX processing utilities in lib/mdx.ts (getAllChapters, getChapterById, extractTopics functions)
- [X] T017 Create scroll tracking hook in lib/scroll.ts (useReadingProgress hook using IntersectionObserver)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Discover the Book (Priority: P1) 🎯 MVP

**Goal**: Home page with hero section, chapter preview cards, and CTA button

**Independent Test**: Load home page, verify hero displays with book title/description/CTA, chapter cards visible, CTA navigates to /book

### Implementation for User Story 1

- [X] T018 [P] [US1] Create HeroSection component in components/hero-section.tsx (props: title, description, ctaText, ctaHref, backgroundImage, className)
- [X] T019 [P] [US1] Create ChapterCard component in components/chapter-card.tsx (props: chapter with title/description/order, onClick, href, className)
- [X] T020 [P] [US1] Create Navigation component in components/navigation.tsx (props: currentPath, className, variant with sticky/fixed)
- [X] T021 [P] [US1] Create ThemeToggle component in components/theme-toggle.tsx (props: className, size, iconOnly from next-themes)
- [X] T022 [US1] Create home page in app/page.tsx using HeroSection and ChapterCard components (grid layout for 3-5 chapter cards)
- [X] T023 [US1] Integrate Navigation component in app/layout.tsx to appear on all pages
- [X] T024 [US1] Add responsive styling to home page with mobile-first approach (320px minimum, breakpoints at 640px/768px/1024px)
- [X] T025 [US1] Add glassmorphism effects to home page components using GlassContainer wrapper
- [X] T026 [US1] Add gradient background to home page hero section using GradientBg component
- [X] T027 [US1] Ensure accessibility on home page (ARIA labels, keyboard navigation, color contrast, semantic HTML)

**Checkpoint**: At this point, User Story 1 should be fully functional - home page displays hero, chapter previews, and CTA works

---

## Phase 4: User Story 2 - Read Book Content (Priority: P1) 🎯 MVP

**Goal**: Book page with 5 chapters of MDX content, chapter navigation, smooth scrolling, and progress bar

**Independent Test**: Open /book page, scroll through all 5 chapters, click chapter navigation to jump, verify progress bar updates, content displays correctly

### Implementation for User Story 2

- [X] T028 [P] [US2] Create ProgressBar component in components/progress-bar.tsx (props: progress, variant with top/inline, showLabel, className)
- [X] T029 [P] [US2] Create ChapterNavigation component in components/chapter-navigation.tsx (props: chapters array, activeChapter, onChapterClick, variant with sidebar/dropdown, className)
- [X] T030 [P] [US2] Create CodeBlock component in components/code-block.tsx for MDX syntax highlighting (props: children, language, filename, className)
- [X] T031 [US2] Create 5 MDX chapter files in content/chapters/ (chapter-1.mdx through chapter-5.mdx with frontmatter: title, description, order)
- [X] T032 [US2] Write chapter content with exactly 2 topics per chapter (H2 headings: Topic X.1, Topic X.2)
- [X] T033 [US2] Create book page in app/book/page.tsx with MDX loader (getAllChapters from lib/mdx.ts, render all chapters)
- [X] T034 [US2] Integrate ChapterNavigation component in book page (list all chapters, highlight active chapter)
- [X] T035 [US2] Integrate ProgressBar component in book page (track scroll position using useReadingProgress hook)
- [X] T036 [US2] Implement smooth scrolling to chapters on navigation click (scrollIntoView with behavior: smooth)
- [X] T037 [US2] Add MDX component mapping in next.config.mjs (map h1, h2, pre to custom components)
- [X] T038 [US2] Ensure chapter content is readable on mobile (320px minimum, no horizontal scroll, proper line height)
- [X] T039 [US2] Add accessibility to book page (semantic article tags for chapters, ARIA labels on navigation, keyboard navigation for chapter links)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - home page navigates to fully functional book page

---

## Phase 5: User Story 3 - Toggle Theme Mode (Priority: P2)

**Goal**: Light/dark mode toggle that persists across sessions

**Independent Test**: Toggle theme switch, verify visual change, refresh page, confirm theme persists, check system preference detection on first visit

### Implementation for User Story 3

- [ ] T040 [P] [US3] Configure next-themes ThemeProvider in app/layout.tsx (attribute="class", defaultTheme="system", enableSystem)
- [ ] T041 [US3] Ensure ThemeToggle component uses useTheme hook from next-themes (get theme, setTheme function)
- [ ] T043 [US3] Add dark mode Tailwind classes to all components (dark:bg-black, dark:text-white, dark:border-white/10, etc.)
- [ ] T044 [US3] Ensure glassmorphism effects work in both themes (bg-white/10 for light, bg-black/40 for dark)
- [ ] T045 [US3] Ensure gradient backgrounds are readable in both themes (adjust colors/opacity as needed)
- [ ] T046 [US3] Add CSS transitions for smooth theme switching (transition-colors duration-300 on all colored elements)
- [ ] T047 [US3] Test theme persistence across page navigation (click nav links, verify theme stays consistent)
- [ ] T048 [US3] Test theme persistence across browser sessions (close/reopen browser, verify theme remembered)
- [ ] T049 [US3] Test system preference detection (clear localStorage, refresh, verify theme matches OS preference)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently with full theme support

---

## Phase 6: User Story 4 - Learn About Author (Priority: P3)

**Goal**: About page with author bio and book vision statement

**Independent Test**: Navigate to /about page, verify author bio and vision statement display correctly, styling matches site theme

### Implementation for User Story 4

- [ ] T050 [P] [US4] Create about page in app/about/page.tsx (author bio section, vision statement section)
- [ ] T051 [US4] Add author information content (name, credentials, bio text - can be placeholder for now)
- [ ] T052 [US4] Add book vision statement content (why this book exists, target audience, goals - can be placeholder)
- [ ] T053 [US4] Apply glassmorphism styling to about page sections using GlassContainer component
- [ ] T054 [US4] Add responsive layout to about page (mobile: stacked, desktop: side-by-side author image + text)
- [ ] T055 [US4] Add accessibility attributes to about page (semantic sections, proper heading hierarchy, ARIA labels)
- [ ] T056 [US4] Ensure about page works in both light and dark themes (verify colors and contrast)

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently

---

## Phase 7: User Story 5 - Join Waitlist (Priority: P3)

**Goal**: Contact page with waitlist form that saves to localStorage

**Independent Test**: Navigate to /contact page, submit email with valid format, verify localStorage save, check duplicate email handling

### Implementation for User Story 5

- [ ] T057 [P] [US5] Create WaitlistForm component in components/waitlist-form.tsx (props: onSubmit callback, initialEmail, isSubmitted, className)
- [ ] T058 [P] [US5] Add email validation logic in lib/validation.ts (isValidEmail function with regex, sanitizeEmail function)
- [ ] T059 [US5] Integrate waitlistStorage functions from lib/storage.ts in WaitlistForm component (add, getAll, hasEmail)
- [ ] T060 [US5] Create contact page in app/contact/page.tsx using WaitlistForm component
- [ ] T061 [US5] Add form validation (client-side email format check, error message display)
- [ ] T062 [US5] Add success message display after form submission (clear form, show confirmation)
- [ ] T063 [US5] Add "already joined" message if email already in localStorage (hide form, show confirmation)
- [ ] T064 [US5] Add error handling for localStorage failures (try/catch, user-friendly error message)
- [ ] T065 [US5] Style WaitlistForm component with glassmorphism using GlassContainer (input field, submit button, messages)
- [ ] T066 [US5] Add accessibility to form (label for input, aria-invalid on errors, role="alert" for error/success messages)
- [ ] T067 [US5] Test form submission with valid/invalid/duplicate emails (verify localStorage, UI feedback)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T068 [P] Add metadata and SEO tags to all pages (title, description, Open Graph tags in app/layout.tsx and page metadata exports)
- [ ] T069 [P] Optimize images in public/images/ directory (convert to WebP, add Next.js Image component usage)
- [ ] T070 [P] Add font optimization (Inter font with next/font, font-display: swap)
- [ ] T071 [P] Add loading states for better UX (skeleton screens or spinners for slow loads)
- [ ] T072 [P] Review and fix any TypeScript strict mode errors (ensure no 'any' types, proper null checks)
- [ ] T073 [P] Run accessibility audit with axe DevTools (fix any ARIA, contrast, or keyboard navigation issues)
- [ ] T074 [P] Test responsive design at all breakpoints (320px, 375px, 768px, 1024px, 1920px)
- [ ] T075 [P] Verify bundle size is under 150KB (run `npm run build -- --analyze`)
- [ ] T076 [P] Test performance metrics (FCP < 1.5s on 3G simulation in DevTools)
- [ ] T077 [P] Add 404 page in app/not-found.tsx with navigation back to home
- [ ] T078 Test keyboard navigation on all pages (Tab through interactive elements, verify focus indicators visible)
- [ ] T079 Test screen reader compatibility (NVDA/VoiceOver) on all pages
- [ ] T080 Verify all constitution principles are met (minimal dependencies, mobile-first, MDX content, performance, accessibility, TypeScript strict, reusability)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (US1 + US2 → US3 → US4 → US5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May share Navigation component with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Enhances US1 + US2 with theme support
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Independent page, no story dependencies
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Independent page, uses foundation (storage, glassmorphism)

### Within Each User Story

- Components before pages
- Utility functions before components that use them
- Content creation before page rendering
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

**Setup Phase (T001-T010)**:
- T003, T004, T005 can run in parallel (different operations)

**Foundational Phase (T011-T017)**:
- T013, T014, T015, T016 can run in parallel (different components/utilities)

**User Story 1 (T018-T027)**:
- T018, T019, T020, T021 can run in parallel (different components)

**User Story 2 (T028-T039)**:
- T028, T029, T030 can run in parallel (different components)
- T031, T032 can run in parallel (different chapters)

**User Story 3 (T040-T049)**:
- T040 can be done in parallel with component styling (T043-T046)

**User Story 4 (T050-T056)**:
- Most tasks are sequential (page creation → content → styling)

**User Story 5 (T057-T067)**:
- T057, T058 can run in parallel (component + validation logic)

**Polish Phase (T068-T080)**:
- T068, T069, T070, T071, T072, T073, T074, T075, T076, T077 can all run in parallel (different concerns)

---

## Parallel Example: User Story 1

```bash
# Launch all component creation tasks together:
Task: "Create HeroSection component in components/hero-section.tsx"
Task: "Create ChapterCard component in components/chapter-card.tsx"
Task: "Create Navigation component in components/navigation.tsx"
Task: "Create ThemeToggle component in components/theme-toggle.tsx"

# After components complete, create page:
Task: "Create home page in app/page.tsx using HeroSection and ChapterCard components"
```

---

## Parallel Example: User Story 2

```bash
# Launch all component creation tasks together:
Task: "Create ProgressBar component in components/progress-bar.tsx"
Task: "Create ChapterNavigation component in components/chapter-navigation.tsx"
Task: "Create CodeBlock component in components/code-block.tsx"

# Launch content creation in parallel:
Task: "Create 5 MDX chapter files in content/chapters/"
Task: "Write chapter content with exactly 2 topics per chapter"

# After components and content complete, create page:
Task: "Create book page in app/book/page.tsx with MDX loader"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (T001-T010)
2. Complete Phase 2: Foundational (T011-T017) ⚠️ CRITICAL
3. Complete Phase 3: User Story 1 (T018-T027)
4. Complete Phase 4: User Story 2 (T028-T039)
5. **STOP and VALIDATE**: Test home page → book page flow independently
6. Deploy/demo if ready

**MVP delivers**:
- ✅ Home page with hero, chapter cards, CTA
- ✅ Book page with 5 chapters, navigation, progress bar
- ✅ Basic navigation between pages
- ✅ Mobile-responsive design
- ✅ Glassmorphism visual design

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Home page) → Test independently → Deploy/Demo (MVP part 1)
3. Add User Story 2 (Book page) → Test independently → Deploy/Demo (MVP complete!)
4. Add User Story 3 (Theme toggle) → Test independently → Deploy/Demo
5. Add User Story 4 (About page) → Test independently → Deploy/Demo
6. Add User Story 5 (Contact page) → Test independently → Deploy/Demo
7. Complete Polish → Deploy production release

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Home page)
   - Developer B: User Story 2 (Book page)
   - Developer C: User Story 3 (Theme support)
3. After P1 stories complete:
   - Developer A: User Story 4 (About page)
   - Developer B: User Story 5 (Contact page)
   - Developer C: Polish & optimization
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Constitution compliance verified in Phase 8 (T080)

## Task Summary

- **Total Tasks**: 80
- **Setup**: 10 tasks (T001-T010)
- **Foundational**: 7 tasks (T011-T017)
- **User Story 1 (P1)**: 10 tasks (T018-T027)
- **User Story 2 (P1)**: 12 tasks (T028-T039)
- **User Story 3 (P2)**: 10 tasks (T040-T049)
- **User Story 4 (P3)**: 7 tasks (T050-T056)
- **User Story 5 (P3)**: 11 tasks (T057-T067)
- **Polish**: 13 tasks (T068-T080)

**Parallel Opportunities**: ~40% of tasks can run in parallel within their phases
**MVP Scope**: Phase 1 + 2 + 3 + 4 (39 tasks) delivers core value proposition
**Recommended First Increment**: Complete through User Story 2 (T001-T039) for fully functional book website
