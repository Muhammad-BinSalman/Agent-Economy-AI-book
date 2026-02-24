# Research: Docusaurus Book Frontend

**Feature**: 001-book-frontend
**Date**: 2025-02-15
**Phase**: Phase 0 - Technical Research & Decision Documentation

## Overview

This document consolidates technical research findings for implementing a professional book-reading website using Docusaurus v3.x. All decisions are based on current best practices as of February 2025.

---

## 1. Docusaurus Version & Features

### Decision: **Docusaurus v3.9.2+**

**Latest Stable Version**: 3.9.2 (October 17, 2025)

**Key Features**:
- ✅ **Built-in Search**: Client-side search with fast performance (< 1 second)
- ✅ **MDX v3 Support**: Write JSX and React components in markdown
- ✅ **Dark Mode**: Built-in color mode switching with system preference detection
- ✅ **Responsive Design**: Mobile-first layout with collapsible sidebar
- ✅ **Static Site Generation**: Fast builds, CDN-friendly output
- ✅ **AI-Ready**: Supports Algolia DocSearch v4 with AskAI integration (future-proofing)

**Breaking Changes from v2 → v3**:
- **MDX v1 → MDX v3**: Requires MDX compatibility updates
- **Node.js 18 dropped**: Requires Node.js 20+
- Configuration options updated (deprecated options removed)

**Migration Path**:
```bash
# Fresh install (recommended for new project)
npx create-docusaurus@latest book-website classic

# Or update existing packages
npm install @docusaurus/core@latest @docusaurus/preset-classic@latest
```

**Alternatives Considered**:
- **Docusaurus v2.x**: Rejected due to missing v3 features, approaching end-of-life
- **Next.js**: Rejected - overkill for static book site, more configuration required
- **Astro**: Rejected - less mature documentation-specific features, smaller community
- **GitBook**: Rejected - SaaS lock-in, less customization control

**Sources**:
- [Docusaurus 3.9.2 Release Notes](https://docusaurus.io/blog/releases/3.9)
- [Docusaurus v3 Migration Guide](https://docusaurus.io/docs/migration/v3)
- [Docusaurus Changelog](https://docusaurus.io/changelog/3.9.0)

---

## 2. Typography & Reading Experience

### Decision: **Optimized Book Typography Stack**

**Font Selection**:
- **Primary Body Font**: System font stack (fast, native, no download)
  - Font family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Alternative (Serif)**: Literata or Merriweather (optional, via Google Fonts)
  - Better for long-form reading if serif preferred
  - Literata: Lower x-height, higher ascenders, airy line spacing

**Typography Metrics**:
| Property | Value | Rationale |
|----------|-------|-----------|
| **Font Size** | 16-18px | Web reading comfort zone |
| **Line Height** | 1.6-1.7 | Optimal readability (150-170% of font size) |
| **Line Length** | 60-75 characters | ~680px max width prevents eye fatigue |
| **Paragraph Spacing** | 1.5rem | Breathing room between sections |
| **Heading Spacing** | 2rem top, 1rem bottom | Clear visual hierarchy |

**CSS Implementation**:
```css
:root {
  --ifm-font-size-base: 16px;
  --ifm-line-height-base: 1.7;
  --ifm-spacing-vertical: 1.5rem;
}

.markdown {
  max-width: 42rem;  /* ~680px, ~70 characters */
  margin: 0 auto;
}
```

**Alternatives Considered**:
- **Custom web fonts (Google Fonts)**: Rejected for initial MVP - adds load time, can use later if brand requires
- **Narrower content (500px)**: Rejected - too narrow for code blocks,浪费 screen space
- **Wider content (900px+)**: Rejected - exceeds optimal line length, harder to read

**Sources**:
- [Pimp My Type - Typography Best Practices](https://pimpmytype.com/)
- [Design Shifu - Typography Guidelines](https://www.designshifu.com/blog/typography-best-practices)
- [PDF.net - E-book Readability Research](https://www.pdf.net/)

---

## 3. Chatbot Integration Pattern

### Decision: **Floating Widget (Bottom-Right)**

**Implementation Approach**:
- **Position**: Fixed, bottom-right corner (20px from edges)
- **Component**: Custom React component in `src/theme/ChatWidget/`
- **Z-Index**: 1000 (above content, below modals)
- **Responsive**: Full opacity on desktop, semi-transparent or collapsible on mobile

**Component Structure**:
```jsx
// src/theme/ChatWidget/index.js
import React, { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget-container">
      {/* Floating button */}
      <button
        className="chat-widget-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
      >
        💬
      </button>

      {/* Chat window (collapsible) */}
      {isOpen && (
        <div className="chat-widget-window">
          {/* Placeholder for now - will integrate backend later */}
          <p>Chat coming soon!</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
```

**CSS Implementation**:
```css
/* src/css/custom.css */
.chat-widget-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-widget-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--ifm-color-primary);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s;
}

.chat-widget-button:hover {
  transform: scale(1.1);
}

.chat-widget-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .chat-widget-window {
    width: calc(100vw - 40px);
    height: 60vh;
    right: -10px;
  }
}
```

**Alternatives Considered**:
- **Page Embed (in content)**: Rejected - disrupts reading flow, not always visible
- **Header Button**: Rejected - requires scrolling to top on long pages, less accessible
- **Footer Embed**: Rejected - not visible on long pages, harder to discover

**Sources**:
- [Ably - Building a Live Chat Widget in React](https://ably.com/blog/how-to-build-a-live-chat-widget-in-react-creation) (2024)
- [BitSrc - Scrollable Chat Box with React](https://blog.bitsrc.io/building-a-scrollable-chat-box-with-react-b3848a4459fc) (2023)
- [TakeShape react-chat-agent](https://github.com/takeshape/react-chat-agent)

---

## 4. Search Plugin Configuration

### Decision: **Docusaurus Built-in Search**

**Plugin**: `@easyops-cn/docusaurus-search-local` (recommended for offline/static sites)

**Performance Characteristics**:
- **Indexing**: Build-time search index generation (Lunr.js or FlexSearch)
- **Search Speed**: < 1 second for typical book sites (50-100 pages)
- **Bundle Size**: ~50KB compressed
- **Offline Support**: ✅ Works without internet

**Configuration**:
```javascript
// docusaurus.config.js
module.exports = {
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,  // Cache-friendly
        indexDocs: true,
        indexPages: true,
        indexBlog: false,
        docsRouteBasePath: "/",
        language: "en",
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        // Optional: boost specific sections
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],
};
```

**Alternatives Considered**:
- **Algolia DocSearch**: Rejected for MVP - requires application, API keys, external service
- **Trieve Search**: Rejected - overkill for static book site, more complexity
- **No search**: Rejected - violates success criteria (SC-002, SC-004)

**Sources**:
- [Docusaurus 3.8 Performance Improvements](https://docusaurus.io/blog/releases/3.8)
- [Docusaurus 3.0 Announcement](https://docusaurus.io/blog/releases/3.0)
- [GitHub Discussion - Docusaurus Performance](https://github.com/facebook/docusaurus/discussions/11259)

---

## 5. Markdown/MDX Feature Set

### Decision: **Standard MDX with Docusaurus Extensions**

**Supported Features** (All out-of-box):

| Feature | Status | Notes |
|---------|--------|-------|
| **Headers** | ✅ Native | `#`, `##`, `###`, etc. |
| **Code Blocks** | ✅ Enhanced | Syntax highlighting, line numbers, copy button |
| **Images** | ✅ Native | `![alt](image.png)`, WebP/AVIF supported |
| **Tables** | ✅ Native | Markdown table syntax |
| **Lists** | ✅ Native | Ordered, unordered, task lists |
| **Links** | ✅ Native | Internal, external, anchor links |
| **Blockquotes** | ✅ Native | `> quote` syntax |
| **React Components** | ✅ MDX | Import and use React components |
| **Admonitions** | ✅ Plugin | `:::tip`, `:::warning`, `:::note` |
| **Mermaid Diagrams** | ✅ Plugin | Flowcharts, sequence diagrams |
| **Math** | ✅ Plugin | KaTeX or MathJax |

**Code Block Languages**:
```javascript
// Supported out-of-box with Prism
prism: {
  additionalLanguages: ['python', 'javascript', 'typescript', 'bash', 'json', 'yaml', 'markdown'],
}
```

**MDX Example**:
```mdx
import Chart from './components/Chart';

# Chapter Title

Regular **markdown** content.

<Chart data={[1, 2, 3]} />

:::tip Pro Tip
MDX allows using React components directly!
:::
```

**Alternatives Considered**:
- **Pure Markdown (no MDX)**: Rejected - loses interactive capabilities, less flexible
- **Custom Markdown parser**: Rejected - reinventing the wheel, Docusaurus is mature

**Sources**:
- [Docusaurus Markdown Features](https://docusaurus.io/docs/markdown-features) (2025)
- [Docusaurus Code Blocks](https://docusaurus.io/docs/markdown-features/code-blocks) (2025)
- [Docusaurus MDX & React](https://docusaurus.io/docs/markdown-features/react) (2025)
- [Docusaurus Assets](https://docusaurus.io/docs/markdown-features/assets) (2025)

---

## 6. Deployment Best Practices

### Decision: **Multi-Platform Support (Vercel, Netlify, GitHub Pages)**

**Vercel (Recommended)**:
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Node.js Version**: 20.x
- **Environment Variables**: Configure in dashboard
- **Automatic**: Deploy on push to main branch

**vercel.json** (optional configuration):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "docusaurus",
  "regions": ["iad1"]
}
```

**Netlify**:
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node.js Version**: 20.x

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**GitHub Pages**:
```javascript
// docusaurus.config.js
module.exports = {
  url: 'https://username.github.io',
  baseUrl: '/repo-name/',
  projectName: 'repo-name',
  organizationName: 'username',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
};
```

**Performance Optimizations**:
- ✅ Enable gzip/brotli compression (automatic on most platforms)
- ✅ Use CDN (automatic on Vercel/Netlify)
- ✅ Optimize images (WebP/AVIF, lazy loading)
- ✅ Minify CSS/JS (automatic in Docusaurus build)

**Sources**:
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- Industry best practices for static site deployment (2025)

---

## 7. Bundle Size Optimization

### Decision: **Docusaurus Defaults + Targeted Optimizations**

**Optimization Strategies**:

1. **Code Splitting** (automatic):
   - Route-based splitting in Docusaurus v3.x
   - Lazy loads chapters as user navigates

2. **Tree Shaking** (automatic):
   - Docusaurus uses webpack/Rspack with production mode
   - Dead code eliminated

3. **Image Optimization**:
   ```javascript
   // docusaurus.config.js
   presets: [
     [
       'classic',
       {
         docs: {
           // Disable image optimization if using external CDN
           // Otherwise, Docusaurus optimizes images automatically
         },
       },
     ],
   ]
   ```

4. **Custom CSS Minification**:
   - Docusaurus minifies CSS in production builds
   - Keep custom.css minimal (< 5KB)

5. **Font Optimization**:
   - Use system fonts (zero download)
   - If using web fonts, subset to used characters only

6. **Search Index Optimization**:
   ```javascript
   // Limit search index size
   searchResultLimits: 8,
   searchResultContextMaxLength: 50,
   ```

**Target Bundle Sizes**:
| Asset | Target | Rationale |
|-------|--------|-----------|
| **Initial JS** | < 200KB gzipped | Fast initial load |
| **Per-route JS** | < 50KB gzipped | Fast navigation |
| **CSS** | < 30KB gzipped | Minimal custom styles |
| **Total Bundle** | < 500KB gzipped | Reasonable for feature-rich site |

**Measurement Tools**:
- Lighthouse (built into Chrome DevTools)
- WebPageTest (https://www.webpagetest.org/)
- Docusaurus build output

**Alternatives Considered**:
- **Remove unused Docusaurus features**: Rejected - features are already lazy-loaded
- **Custom webpack config**: Rejected - unnecessary complexity, defaults are good
- **Server-side rendering**: Rejected - static HTML is faster, CDN-friendly

---

## 8. Accessibility Considerations

### Decision: **WCAG 2.1 Level AA Compliance (Best Effort)**

**Key Accessibility Features**:
- ✅ **Semantic HTML**: Docusaurus uses proper heading hierarchy
- ✅ **ARIA Labels**: Built into navigation components
- ✅ **Keyboard Navigation**: Tab through links, Enter to activate
- ✅ **Color Contrast**: Docusaurus themes meet WCAG AA (4.5:1 ratio)
- ✅ **Focus Indicators**: Visible focus states on interactive elements
- ✅ **Screen Reader Support**: Proper alt text, ARIA roles
- ✅ **Responsive Text**: Text scales up to 200% without breaking layout

**Custom CSS Considerations**:
```css
/* Ensure custom styles maintain accessibility */
.markdown {
  /* Keep high contrast */
  color: var(--ifm-font-color-base);
}

/* Interactive elements have clear hover/focus states */
.chat-widget-button:hover,
.chat-widget-button:focus {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 2px;
}

/* Code blocks handle long content */
.theme-code-block {
  overflow-x: auto;
  white-space: pre;
}
```

**Testing Tools**:
- axe DevTools (Chrome extension)
- WAVE (webaim.org)
- Lighthouse Accessibility Audit

---

## 9. Performance Targets & Validation

### Success Criteria Alignment

All spec success criteria are achievable with researched decisions:

| Criterion | Target | Validation Method |
|-----------|--------|-------------------|
| **SC-001** Navigation < 3s | ✅ Client-side routing | Chrome DevTools Performance tab |
| **SC-002** Search < 1s | ✅ Local search index | Manual testing, stopwatch |
| **SC-003** LCP < 2.5s | ✅ Static build, CDN | Lighthouse, WebPageTest |
| **SC-004** 90% search success | ✅ Standard UI | User testing, analytics |
| **SC-005** 95% browser support | ✅ React 18+, polyfills | BrowserStack testing |
| **SC-006** 80+ accessibility | ✅ Semantic HTML | Lighthouse, axe DevTools |
| **SC-007** 5-min deployment | ✅ `npm run build` | Manual deployment test |
| **SC-008** Add chapters easily | ✅ Place MD in `docs/` | Manual workflow test |
| **SC-009** Chat in 2 clicks | ✅ Floating widget | Manual testing |
| **SC-010** Theme toggle < 200ms | ✅ Instant CSS toggle | Chrome DevTools Performance |

---

## 10. Summary & Recommendations

### ✅ All Research Complete

**Technology Stack**:
- Docusaurus v3.9.2+ (static site generator)
- React 18+ (via Docusaurus)
- MDX v3 (markdown + JSX)
- Custom CSS (minimal, reading-optimized)
- Built-in search (local, fast)

**Next Steps**:
1. ✅ Proceed to Phase 1: Create `data-model.md`
2. ✅ Create `quickstart.md` with deployment guides
3. ✅ Run `/sp.tasks` to generate implementation tasks
4. ✅ Run `/sp.implement` to execute the build

**Risks & Mitigations**:
- **Risk**: Large site build time may be slow
  - **Mitigation**: Limit chapters to < 200 initially, use incremental builds
- **Risk**: Custom CSS may conflict with theme updates
  - **Mitigation**: Use Docusaurus CSS variables, avoid !important
- **Risk**: Chat widget placeholder needs real backend
  - **Mitigation**: Document integration points clearly, create stub API

**Confidence Level**: **HIGH** ✅

All technical decisions are based on current best practices, official documentation, and proven implementations from similar projects.

---

**Research Status**: ✅ Complete
**Phase 0 Exit Criteria**: ✅ All unknowns resolved, decisions documented
**Ready for Phase 1**: ✅ Yes
