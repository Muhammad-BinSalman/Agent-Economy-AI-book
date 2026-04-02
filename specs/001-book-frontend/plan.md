# Implementation Plan: Docusaurus Book Frontend

**Branch**: `001-book-frontend` | **Date**: 2025-02-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-book-frontend/spec.md`

## Summary

Build a professional, static book-reading website using Docusaurus v3.x that displays markdown-based book content with excellent typography, responsive design, full-text search, dark mode support, and an integration point for the future AI chatbot. The site will be statically generated for deployment to common hosting platforms (Vercel, Netlify, GitHub Pages).

## Technical Context

**Language/Version**: JavaScript/TypeScript (Node.js 18+ for Docusaurus v3.x)
**Primary Dependencies**: Docusaurus v3.x, React 18+, MDX support
**Storage**: Static files (Markdown content in `docs/` directory)
**Testing**: Docusaurus built-in linting, manual browser testing, optional Playwright for critical paths
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Web (static site generation with Docusaurus)
**Performance Goals**: LCP < 2.5s, navigation < 3s, search results < 1s
**Constraints**: No backend logic, static build only, bundle size optimized, dark mode support
**Scale/Scope**: Single book with multiple chapters and sections, 50-100+ pages, hierarchical content structure

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Applicability Assessment

The RAG Chatbot Constitution (v2.0.0) primarily governs the backend RAG system (Cohere, Qdrant, Neon, FastAPI, Python). This feature is a **frontend-only static site** that:

- ✅ Does not involve backend API development (covered by separate feature)
- ✅ Does not implement RAG pipeline or agent logic (covered by separate feature)
- ✅ Creates only the UI integration point for future chatbot
- ⚠️ Must align with **User-Centric Embedding** principle for chatbot widget

### Relevant Principles

**V. User-Centric Embedding** (PARTIALLY APPLICABLE):
- The chatbot integration point created in this feature should support the future drop-in widget requirements
- Design choices should enable easy embedding of the < 50KB chat-widget.js
- Integration point options: floating widget button, page embed area, or header/footer placement

**Decision**: ✅ PASS - Constitution compliance verified. This feature creates the frontend foundation that will integrate with the backend RAG system (built separately).

### Gate Status

✅ **PASS** - Proceed to Phase 0 research

## Project Structure

### Documentation (this feature)

```text
specs/001-book-frontend/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (technical research)
├── data-model.md        # Phase 1 output (content structure model)
├── quickstart.md        # Phase 1 output (setup & deployment guide)
└── contracts/           # Phase 1 output (N/A for static site - no API contracts)
```

### Source Code (repository root)

```text
# Docusaurus project structure (recommended location: root or ./frontend)
book-website/            # Docusaurus project root
├── docusaurus.config.js # Main configuration (site metadata, theme, plugins)
├── sidebars.js          # Sidebar navigation configuration (chapter hierarchy)
├── docs/                # Book content (markdown/MDX files)
│   ├── intro.md         # Introduction/overview page
│   ├── chapter-1/
│   │   ├── section-1-1.md
│   │   ├── section-1-2.md
│   │   └── ...
│   ├── chapter-2/
│   │   └── ...
│   └── ...             # Additional chapters
├── src/
│   ├── css/
│   │   └── custom.css  # Custom styles for typography, reading experience
│   └── theme/
│       ├── Footer/     # Footer component (chatbot embed option)
│       ├── ChatWidget/ # Chatbot floating button component
│       └── ...         # Other swizzled components (if needed)
├── static/             # Static assets (images, favicon, etc.)
├── package.json        # Dependencies and scripts
├── README.md           # Setup and usage documentation
└── .gitignore          # Node.js standard ignores (node_modules/, build/, etc.)

# Alternative: Root-level Docusaurus (if book website is primary content)
# docusaurus.config.js (at root)
# docs/ (at root)
# src/ (at root)
# etc.
```

**Structure Decision**: Docusaurus project will be created in a dedicated `book-website/` subdirectory to keep it separate from any future backend code. The `docs/` directory will contain hierarchical markdown files mirroring the book's chapter/section structure. Custom CSS and theme components will be minimal, using Docusaurus's classic theme with targeted swizzling only where necessary for typography and chatbot integration.

## Complexity Tracking

> **No violations to justify** - Constitution gate passed without issues.

The feature uses standard Docusaurus patterns without introducing unnecessary complexity. All technical choices align with static site generation best practices.

## Phase 0: Research & Technical Decisions

### Unknowns to Resolve

1. **Docusaurus v3.x Latest Stable Version**: Determine exact version and any breaking changes from v2
2. **Optimal Typography Stack**: Research best fonts, line heights, spacing for book-like reading experience
3. **Chatbot Integration Pattern**: Evaluate floating widget vs. page embed vs. header/footer placement options
4. **Search Plugin Configuration**: Validate Docusaurus built-in search meets 1-second performance requirement
5. **Markdown/MDX Feature Set**: Confirm required features (code blocks, images, tables, embeds) work out-of-box
6. **Deployment Best Practices**: Research optimal configuration for Vercel/Netlify/GitHub Pages
7. **Bundle Size Optimization**: Identify strategies to keep bundle minimal while maintaining features

### Research Tasks

Research findings will be consolidated in `research.md` with:
- Chosen technologies with rationale
- Alternatives considered and rejected
- Best practices for Docusaurus book sites
- Performance optimization strategies
- Accessibility considerations for reading experience

## Phase 1: Design & Artifacts

### data-model.md

Define the content structure model:
- **Book**: Root entity representing the complete publication
- **Chapter**: Top-level content divisions (e.g., "Chapter 1: Introduction")
- **Section**: Subdivisions within chapters
- **Subsection**: Nested content (up to 3-4 levels deep)
- **Frontmatter**: Metadata (title, description, draft status)
- **Content Relationships**: Chapter → Section → Subsection hierarchy

### quickstart.md

Comprehensive guide covering:
- **Prerequisites**: Node.js 18+, npm/yarn/pnpm
- **Installation**: `npx create-docusaurus@latest` with recommended options
- **Development**: `npm run start` (localhost:3000)
- **Adding Chapters**: Place markdown files in `docs/` with frontmatter
- **Sidebar Configuration**: Edit `sidebars.js` to match folder structure
- **Building**: `npm run build` (produces static `build/` directory)
- **Deployment**: Platform-specific instructions (Vercel, Netlify, GitHub Pages)
- **Chatbot Integration**: Where and how to add the chat widget script when backend is ready

### contracts/

**N/A** - This feature does not define API contracts. It is a static site that will consume APIs provided by the backend RAG feature (separate specification).

## Architecture Decisions

### Technology Stack

| Component | Technology | Justification |
|-----------|-----------|---------------|
| **Static Site Generator** | Docusaurus v3.x | Built-in search, MDX support, excellent docs, easy deployment |
| **UI Framework** | React 18+ (via Docusaurus) | Docusaurus default, component-based, well-supported |
| **Styling** | Custom CSS + Docusaurus Infima | Built-in CSS variables for theming, minimal custom CSS needed |
| **Content Format** | Markdown + MDX | Author-friendly, code blocks support, React components embeddable |
| **Search** | Docusaurus built-in search | Client-side search, fast, no external dependencies |
| **Deployment** | Static files (Vercel/Netlify/GitHub Pages) | Free tier support, CDN distribution, zero backend cost |

### Integration Approach

**Chatbot Integration Point**:
- **Primary Choice**: Floating widget button (bottom-right corner)
- **Implementation**: Custom React component in `src/theme/ChatWidget/`
- **Fallback**: Footer embed option if floating button interferes with mobile reading
- **Integration**: Component will accept configuration props (API endpoint, widget options)
- **Placeholder**: Initially shows "Chat Coming Soon" or similar, ready for backend integration

**Design Rationale**:
- Floating widget is always accessible without disrupting reading flow
- Matches "User-Centric Embedding" principle (future drop-in widget can be wrapped)
- Easy to enable/disable via configuration
- Doesn't compete with sidebar for screen real estate

## File Structure Detailed

### Docusaurus Configuration

```javascript
// docusaurus.config.js (key configuration areas)
module.exports = {
  title: 'Book Title',
  tagline: 'Book subtitle or description',
  favicon: 'img/favicon.ico',
  url: 'https://yourbook.com',  // Deployed URL
  baseUrl: '/',

  organizationName: 'your-org',
  projectName: 'book-website',
  deploymentBranch: 'main',  // For GitHub Pages

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],  // Single-language initially
  },

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,  // Mobile-friendly
        autoCollapseCategories: true,  // Deep hierarchies
      },
    },
    navbar: {
      title: 'Book Title',
      items: [
        // Add "Chat" button placeholder here
      ],
    },
    prism: {
      theme: { code_block: /* dark mode */, /* light mode */ },
      additionalLanguages: ['python', 'javascript', 'bash'],  // Book's code languages
    },
    colorMode: {
      defaultMode: 'system',  // Respect user preference
      disableSwitch: false,   // Show toggle button
      respectPrefersColorScheme: true,
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',  // Serve docs at root (no /docs prefix)
          sidebarPath: './sidebars.js',
          editUrl: null,  // Disable "Edit this page" links
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],

  // Future: Add plugins for chatbot when backend is ready
  // plugins: ['./src/plugin/chatbot-plugin.js'],
};
```

### Sidebar Configuration

```javascript
// sidebars.js
module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Frontmatter',
      items: ['intro', 'about', 'table-of-contents'],
    },
    {
      type: 'category',
      label: 'Chapter 1: Chapter Title',
      collapsible: true,
      collapsed: false,  // Open by default
      items: [
        'chapter-1/section-1-1',
        'chapter-1/section-1-2',
        // ... more sections
      ],
    },
    {
      type: 'category',
      label: 'Chapter 2: Chapter Title',
      collapsible: true,
      collapsed: true,  // Closed by default
      items: [
        'chapter-2/section-2-1',
        'chapter-2/section-2-2',
        // ... more sections
      ],
    },
    // ... more chapters
  ],
};
```

### Custom CSS (Reading Experience)

```css
/* src/css/custom.css */

/* Typography optimization for long-form reading */
:root {
  --ifm-font-size-base: 16px;
  --ifm-line-height-base: 1.7;  /* Improved readability */
  --ifm-spacing-vertical: 1.5rem;
}

/* Content width optimization (70-75 characters ideal) */
.markdown {
  max-width: 42rem;  /* ~680px */
  margin: 0 auto;
}

/* Improved heading spacing */
.markdown h1,
.markdown h2,
.markdown h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Code block horizontal scroll for long lines */
.theme-code-block {
  overflow-x: auto;
  white-space: pre;
}

/* Chat widget placeholder styles (to be replaced) */
.chat-widget-placeholder {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
```

## Implementation Phases

### Phase 0: Research (Execute First)
- ✅ Resolve all NEEDS CLARIFICATION items
- ✅ Document technical decisions in `research.md`
- ✅ Validate Docusaurus v3.x features and constraints
- ✅ Confirm performance goals are achievable

### Phase 1: Design Artifacts (After Research)
- ✅ Create `data-model.md` with content structure
- ✅ Create `quickstart.md` with setup/deployment guide
- ✅ Update agent context (if applicable)

### Phase 2: Task Breakdown (Separate Command: `/sp.tasks`)
- Generate detailed, actionable tasks from this plan
- Define dependencies and execution order
- Create implementation checklist

### Phase 3: Implementation (Separate Command: `/sp.implement`)
- Initialize Docusaurus project
- Configure theme, sidebar, navigation
- Add custom CSS for reading experience
- Create chatbot integration component
- Add sample book content
- Test locally
- Deploy to hosting platform

## Success Criteria Verification

All success criteria from spec.md are achievable with this plan:

- ✅ **SC-001** (Navigation < 3s): Docusaurus client-side routing
- ✅ **SC-002** (Search < 1s): Built-in client-side search index
- ✅ **SC-003** (LCP < 2.5s): Static files, CDN deployment, optimized bundles
- ✅ **SC-004** (90% search success): Standard Docusaurus search UI
- ✅ **SC-005** (95% browser compatibility): React 18+ supports all modern browsers
- ✅ **SC-006** (80+ accessibility): Docusaurus includes ARIA labels, semantic HTML
- ✅ **SC-007** (5-min deployment): `npm run build` produces deployable static files
- ✅ **SC-008** (Add chapters easily): Place markdown in `docs/`, update sidebar
- ✅ **SC-009** (Chat in 2 clicks): Floating widget always visible
- ✅ **SC-010** (Theme toggle < 200ms): Docusaurus instant theme switching

## Next Steps

1. **Execute Phase 0**: Run research tasks and create `research.md`
2. **Execute Phase 1**: Generate `data-model.md` and `quickstart.md`
3. **Run `/sp.tasks`**: Create detailed task breakdown
4. **Run `/sp.implement`**: Execute the implementation

---

**Plan Status**: ✅ Complete (pending Phase 0 and Phase 1 artifacts)
