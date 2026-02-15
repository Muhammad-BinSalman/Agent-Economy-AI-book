# Research: AI-Native Book Website

**Feature**: AI-Native Book Website
**Date**: 2026-02-01
**Purpose**: Resolve technical decisions and document best practices for Next.js 15 + MDX + Tailwind architecture

## Overview

This document consolidates research findings for implementing a premium book website using Next.js 15 App Router, MDX for content management, and Tailwind CSS for styling. All decisions align with the project constitution principles.

---

## Decision 1: Next.js App Router vs Pages Router

### Decision
**Use Next.js 15 App Router**

### Rationale
- **Future-forward**: App Router is the recommended approach for Next.js 15, with all new features and optimizations targeted at this architecture
- **React Server Components**: Built-in support for RSCs, improving performance by reducing client-side JavaScript
- **Simplified data fetching**: No need for `getStaticProps`/`getServerSideProps`; async components handle data fetching natively
- **Better streaming**: Automatic support for React Suspense and streaming UI
- **Improved layouts**: Nested layouts without prop drilling
- **MDX integration**: `@next/mdx` has first-class support for App Router via `.mdx` files or `next-mdx-remote`

### Alternatives Considered
1. **Pages Router** (legacy)
   - Rejected: No longer receiving major feature updates; doesn't leverage Next.js 15 improvements
   - Would require `getStaticProps` for MDX content, more boilerplate

2. **Static Site Generator (Astro, Gatsby)**
   - Rejected: Overkill for 4-page site; adds build complexity
   - Constitution requires zero external UI libraries - most SSGs have opinionated component ecosystems

### Implementation Notes
- Use `app/` directory for all routes
- Leverage `layout.tsx` for shared layout (theme provider, navigation)
- Use `page.tsx` files for route components (Home, Book, About, Contact)
- MDX files processed via `@next/mdx` loader in `next.config.mjs`

---

## Decision 2: MDX Processing Approach

### Decision
**Use `@next/mdx` with custom components for MDX content**

### Rationale
- **Native Next.js integration**: `@next/mdx` is the official Next.js MDX loader
- **Zero build config**: Works seamlessly with Next.js 15 App Router
- **Component isolation**: Custom components for MDX elements (code blocks, callouts) maintain design consistency
- **TypeScript support**: Full type safety for frontmatter and component props
- **Performance**: MDX files compiled at build time, no runtime parsing overhead

### Alternatives Considered
1. **`next-mdx-remote`** (runtime MDX parsing)
   - Rejected: Adds client-side bundle size (~20KB)
   - Constitution requires <150KB bundle; every KB matters
   - Runtime parsing unnecessary for static content

2. **Plain Markdown (`.md` files)**
   - Rejected: Cannot embed React components for interactive examples
   - Constitution Principle III explicitly requires MDX

3. **CMS-based (Strapi, Contentful)**
   - Rejected: Constitution explicitly excludes backend services
   - Overkill for 5 chapters of content
   - Violates simplicity principle

### Implementation Strategy
```javascript
// next.config.mjs
import createMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
```

**MDX File Structure**:
```yaml
---
title: "Chapter 1: Introduction to AI-Native Development"
description: "Learn the fundamentals of building AI-native applications"
order: 1
---

# Topic 1.1: What is AI-Native Development?

AI-native development represents a paradigm shift...
```

**Component Mapping**:
- `<h1>` → `<ChapterHeading>`
- `<h2>` → `<TopicHeading>`
- `<pre>` → `<CodeBlock>` (with syntax highlighting)
- Custom components: `<Note>`, `<Warning>`, `<Tip>`

---

## Decision 3: Theme Provider Pattern

### Decision
**Use `next-themes` library for theme management**

### Rationale
- **Zero flash of unstyled content**: Handles SSR/hydration mismatch automatically
- **System preference detection**: Respects `prefers-color-scheme` media query on first visit
- **localStorage persistence**: Built-in storage without manual implementation
- **Tiny footprint**: ~2KB gzipped, within budget
- **TypeScript support**: Fully typed

### Alternatives Considered
1. **Custom theme provider**
   - Rejected: Reinventing the wheel; SSR handling is error-prone
   - `next-themes` is battle-tested by thousands of Next.js apps

2. **CSS-only dark mode (Tailwind `dark:` prefix)**
   - Rejected: No persistence across sessions
   - Cannot detect system preference without JavaScript
   - Constitution requires localStorage persistence

### Implementation Notes
```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Theme Toggle Component**:
```tsx
// components/theme-toggle.tsx
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
```

---

## Decision 4: Glassmorphism Implementation

### Decision
**Custom CSS with Tailwind utilities for glassmorphism effects**

### Rationale
- **No external dependencies**: Glassmorphism achieved via `backdrop-filter`, `background-color`, and `border`
- **Tailwind-first**: Uses Tailwind's arbitrary values (`backdrop-blur-xl`, `bg-white/10`)
- **Performance**: GPU-accelerated `backdrop-filter` is performant on modern browsers
- **Constitution compliance**: Zero UI libraries beyond shadcn/ui

### Alternatives Considered
1. **UI library with glass components (e.g., React Glassmorphism)**
   - Rejected: Constitution Principle I forbids external UI libraries
   - Adds unnecessary bundle size

2. **CSS-in-JS (styled-components, emotion)**
   - Rejected: Increases bundle size (~15KB)
   - Tailwind sufficient for all styling needs

### Implementation Pattern
```tsx
// components/glass-container.tsx
export function GlassContainer({ children, className = '' }) {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-white/10 border border-white/20',
        'shadow-xl rounded-2xl',
        'dark:bg-black/40 dark:border-white/10',
        className
      )}
    >
      {children}
    </div>
  )
}
```

**Fallback for browsers without `backdrop-filter` support**:
```css
@supports not (backdrop-filter: blur(10px)) {
  .glass-fallback {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

---

## Decision 5: Scroll Progress Tracking

### Decision
**Custom React hook using `IntersectionObserver` API**

### Rationale
- **Performance**: `IntersectionObserver` is more efficient than scroll event listeners
- **No dependencies**: Zero external libraries required
- **Accessibility**: Works with screen readers and keyboard navigation
- **Precision**: Tracks which chapters are in view, not just scroll percentage

### Alternatives Considered
1. **Scroll event listener with `window.scrollY`**
   - Rejected: Main thread blocking; causes jank on scroll
   - Less accurate for chapter-level tracking

2. **Library (react-scroll-parallax, etc.)**
   - Rejected: Unnecessary dependency for simple progress tracking
   - Constitution prefers minimal dependencies

### Implementation Pattern
```tsx
// lib/scroll.ts
export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calculate progress based on chapter index
          }
        })
      },
      { threshold: 0.5 }
    )

    // Observe chapter sections
    document.querySelectorAll('article[id^="chapter-"]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return progress
}
```

---

## Decision 6: localStorage for Waitlist

### Decision
**Custom `localStorage` wrapper with error handling**

### Rationale
- **Constitution compliance**: No backend permitted (FR-044)
- **Simplicity**: Direct localStorage API sufficient for MVP
- **Error handling**: Graceful degradation when localStorage is unavailable
- **TypeScript**: Fully typed storage operations

### Alternatives Considered
1. **IndexedDB**
   - Rejected: Overkill for single email storage
   - More complex API than needed

2. **Session-only storage**
   - Rejected: Constitution requires persistence across sessions (FR-019)

### Implementation Pattern
```typescript
// lib/storage.ts
export const waitlistStorage = {
  save(email: string): boolean {
    try {
      const entries = this.getAll()
      entries.push({ email, timestamp: Date.now() })
      localStorage.setItem('waitlist', JSON.stringify(entries))
      return true
    } catch (error) {
      console.error('localStorage unavailable:', error)
      return false
    }
  },

  getAll(): WaitlistEntry[] {
    try {
      const data = localStorage.getItem('waitlist')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  hasEmail(email: string): boolean {
    return this.getAll().some((entry) => entry.email === email)
  },
}
```

**Error Handling**:
- Try/catch blocks around all localStorage operations
- Graceful UI feedback when storage fails
- Feature detection: `typeof localStorage !== 'undefined'`

---

## Decision 7: Image Optimization

### Decision
**Next.js `Image` component with WebP format + lazy loading**

### Rationale
- **Automatic optimization**: Next.js Image component handles WebP conversion, lazy loading, and responsive sizes
- **Performance**: WebP reduces image size by 25-35% vs JPEG
- **Constitution compliance**: FR-031 requires optimized images
- **Zero-config**: Works out of the box with Next.js

### Alternatives Considered
1. **Manual `<img>` tags**
   - Rejected: No automatic optimization or lazy loading
   - Violates performance requirements (<1.5s FCP)

2. **Third-party CDN (Cloudinary, ImageKit)**
   - Rejected: Adds external dependency and cost
   - Constitution prefers simplicity

### Implementation Pattern
```tsx
import Image from 'next/image'

<Image
  src="/images/hero.webp"
  alt="AI-Native Development Book"
  width={1200}
  height={630}
  priority // Above-the-fold images
  placeholder="blur" // Blur-up effect
/>
```

**Image Requirements**:
- Hero images: WebP format, 1200×630px (OG size)
- Chapter thumbnails: WebP, 400×300px
- Author photo: WebP, 400×400px (square)
- Fallback: JPEG/PNG for browsers without WebP support

---

## Decision 8: Accessibility Implementation

### Decision
**ARIA attributes + semantic HTML + keyboard navigation**

### Rationale
- **Constitution compliance**: Principle V requires WCAG 2.1 AA
- **Testing**: axe DevTools for automated testing
- **Progressive enhancement**: Base functionality works without JavaScript

### Key Requirements

1. **Semantic HTML**:
   ```tsx
   <nav aria-label="Main navigation">
   <main id="main-content">
   <article aria-labelledby="chapter-1-title">
   ```

2. **ARIA Labels**:
   ```tsx
   <button aria-label="Toggle dark mode" aria-pressed={isDark}>
   <a aria-current="page"> // Current page in nav
   ```

3. **Keyboard Navigation**:
   - Tab order follows visual layout
   - Focus indicators visible (`focus-visible` Tailwind plugin)
   - Skip to main content link

4. **Color Contrast**:
   - Use Tailwind's accessible color palette
   - Test contrast with `chrome://accessibility` or axe DevTools

---

## Decision 9: Bundle Size Optimization

### Decision
**Code splitting + tree shaking + dynamic imports**

### Rationale
- **Constitution compliance**: FR-030 requires <150KB bundle
- **Route-based splitting**: Each page loads only its dependencies
- **Component lazy loading**: Non-critical components loaded on demand

### Implementation Strategy

1. **Dynamic Imports for Components**:
   ```tsx
   // Lazy load heavy components
   const ChapterNavigation = dynamic(
     () => import('@/components/chapter-navigation'),
     { ssr: true }
   )
   ```

2. **Tree Shaking**:
   - Import specific icons: `import { Sun } from 'lucide-react'`
   - Avoid `import * as Icons from 'lucide-react'`

3. **Analyze Bundle**:
   ```bash
   npm run build -- --analyze
   ```

4. **Target Bundle Breakdown**:
   - Next.js runtime: ~60KB
   - React: ~45KB
   - Tailwind CSS: ~15KB (purged)
   - shadcn/ui components: ~10KB (tree-shaken)
   - Application code: ~20KB
   - **Total**: ~150KB

---

## Decision 10: Deployment Strategy

### Decision
**Vercel free tier with automatic deployments**

### Rationale
- **Constitution requirement**: FR-043 mandates Vercel deployment
- **Zero config**: Connect GitHub repo → auto-deploy on push
- **Edge Network**: Global CDN for fast FCP worldwide
- **Free tier generous**: 100GB bandwidth/month, sufficient for MVP

### Deployment Pipeline
1. Push to `main` branch
2. Vercel auto-triggers build
3. Next.js generates static site (`output: 'export'`)
4. Deployed to Vercel Edge Network
5. HTTPS, CDN, and caching handled automatically

### Environment Variables
```bash
# Vercel dashboard → Environment Variables
NEXT_PUBLIC_SITE_URL=https://your-book.vercel.app
```

### Custom Domain (Optional)
- Purchase domain via registrar
- Add domain in Vercel dashboard
- Configure DNS records (CNAME)

---

## Best Practices Summary

### Next.js 15 + App Router
- Use async components for data fetching
- Leverage Server Components by default (opt-in to Client Components with `'use client'`)
- Implement nested layouts for shared UI
- Use `Link` component for internal navigation (prefetching)

### MDX Content Management
- Frontmatter for chapter metadata (title, order, description)
- Custom component mapping for design consistency
- Syntax highlighting via `rehype-highlight`
- GFM support for tables/strikethrough via `remark-gfm`

### Tailwind CSS
- Mobile-first responsive classes (`min-width:` not `max-width:`)
- Arbitrary values for precise styling (`bg-white/10`)
- CSS variables for theme tokens (`--glass-opacity`)
- Custom plugins: `tailwindcss-animate`, `@tailwindcss/typography`

### TypeScript Strict Mode
- No `any` types
- All components typed with interfaces
- Strict null checks enabled
- `paths` alias for clean imports (`@/components`)

### Performance
- Lazy load below-the-fold images
- Preload critical fonts (`font-display: swap`)
- Minimize client-side JavaScript
- Use `loading="lazy"` for non-critical iframes

### Accessibility
- Test with keyboard only
- Verify with screen reader (NVDA/VoiceOver)
- Check color contrast (4.5:1 minimum)
- Ensure focus indicators visible

---

## Open Questions Resolved

All technical questions from the plan have been answered through this research. No NEEDS CLARIFICATION items remain.

## Next Steps

Proceed to **Phase 1: Design & Contracts** to generate:
1. `data-model.md` - Entity definitions and TypeScript interfaces
2. `contracts/` - Component contracts and API boundaries (if applicable)
3. `quickstart.md` - Developer onboarding guide
