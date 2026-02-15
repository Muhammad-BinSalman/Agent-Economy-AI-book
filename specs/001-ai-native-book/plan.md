# Implementation Plan: AI-Native Book Website

**Branch**: `001-ai-native-book` | **Date**: 2026-02-01 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-ai-native-book/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a premium, mobile-first book website presenting "AI-Native Driven Development" across 5 chapters with glassmorphism design, dark/light mode, and MDX-based content management. The site comprises 4 pages (Home, Book, About, Contact) with zero backend dependencies, using Next.js 15 App Router, Tailwind CSS, shadcn/ui components, and localStorage for data persistence. Performance target: <1.5s FCP with <150KB bundle size.

## Technical Context

**Language/Version**: TypeScript 5.7+ (strict mode), Next.js 15.1+ (App Router)
**Primary Dependencies**: React 19.1+, Next.js 15.1+, Tailwind CSS 3.4+, @next/mdx 15.1+, shadcn/ui (components only), lucide-react (icons)
**Storage**: localStorage for theme preference and waitlist entries; MDX files for book content
**Testing**: Manual testing with browser DevTools; automated accessibility testing via axe-core (optional)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions; responsive from 320px to 1920px+
**Project Type**: Web application (Next.js frontend-only, no backend)
**Performance Goals**: <1.5s First Contentful Paint (FCP) on 3G; <150KB total bundle (excluding images); 60fps smooth scrolling
**Constraints**: Zero external UI libraries beyond shadcn/ui + Tailwind; 4 pages max; 5 chapters × 2 topics; Vercel free tier deployment
**Scale/Scope**: 4 pages, 5 chapters, ~10 reusable components, static content, ~1000 unique visitors/day target

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Assessment

✅ **I. Minimal Dependency Philosophy** - PASS
- Only shadcn/ui + Tailwind CSS permitted
- No additional UI libraries (Material-UI, Chakra, etc.)
- Custom components for glassmorphism effects

✅ **II. Mobile-First Responsive Design** - PASS
- 320px minimum width requirement
- Responsive breakpoints: 640px, 768px, 1024px, 1280px
- Touch targets ≥44×44px

✅ **III. MDX-First Content Management** - PASS
- All content in `/content/chapters/` as MDX
- 5 chapters × 2 topics structure
- Content-code separation maintained

✅ **IV. Performance Excellence** - PASS
- <1.5s FCP target
- <150KB bundle limit
- Code splitting, lazy loading, optimization

✅ **V. Universal Accessibility** - PASS
- WCAG 2.1 AA compliance
- Full keyboard navigation
- ARIA labels on all interactive elements

✅ **VI. TypeScript Strict Mode** - PASS
- `strict: true` in tsconfig.json
- All components typed
- No `any` types permitted

✅ **VII. Component Reusability** - PASS
- All components accept props
- Atomic design pattern
- No hardcoded values

### Post-Design Assessment (After Phase 1)

*Will be re-evaluated after technical design is complete*

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-native-book/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Option 2: Web application (Next.js App Router)

app/                          # Next.js 15 App Router
├── layout.tsx               # Root layout with theme provider
├── page.tsx                 # Home page
├── book/
│   └── page.tsx            # Book page with MDX content
├── about/
│   └── page.tsx            # About page
├── contact/
│   └── page.tsx            # Contact page
└── globals.css             # Global styles + Tailwind directives

components/                   # Reusable UI components
├── ui/                      # shadcn/ui base components
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
├── navigation.tsx           # Site navigation header
├── theme-toggle.tsx         # Light/dark mode switch
├── progress-bar.tsx         # Reading progress indicator
├── chapter-card.tsx         # Chapter preview card (home page)
├── chapter-navigation.tsx   # Table of contents (book page)
├── hero-section.tsx         # Hero component (home page)
├── glass-container.tsx      # Glassmorphism wrapper
└── gradient-bg.tsx          # Animated gradient background

lib/                         # Utility functions
├── utils.ts                 # General helpers (cn, clsx, etc.)
├── storage.ts               # localStorage wrappers
├── mdx.ts                   # MDX processing utilities
└── scroll.ts                # Scroll tracking helpers

types/                       # TypeScript definitions
├── chapter.ts               # Chapter content types
├── theme.ts                 # Theme types
└── waitlist.ts              # Waitlist entry types

content/chapters/            # MDX book content
├── chapter-1.mdx            # Chapter 1: Introduction (2 topics)
├── chapter-2.mdx            # Chapter 2: Core Concepts (2 topics)
├── chapter-3.mdx            # Chapter 3: Implementation (2 topics)
├── chapter-4.mdx            # Chapter 4: Advanced Patterns (2 topics)
└── chapter-5.mdx            # Chapter 5: Future Directions (2 topics)

public/                      # Static assets
├── images/                  # Optimized images (WebP + fallbacks)
│   ├── hero.webp
│   ├── author.webp
│   └── chapters/
└── fonts/                   # Custom fonts (if any)

next.config.mjs             # Next.js configuration
tailwind.config.ts          # Tailwind CSS configuration
tsconfig.json               # TypeScript strict mode config
package.json                # Dependencies
```

**Structure Decision**: Next.js 15 App Router (single frontend project) - optimal for static site with MDX content, no backend required, perfect for Vercel deployment. The structure follows Next.js conventions while maintaining constitution compliance (component reusability, TypeScript strict mode).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All constitution principles satisfied without complexity.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
