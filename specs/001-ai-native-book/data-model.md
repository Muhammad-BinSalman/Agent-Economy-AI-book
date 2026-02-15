# Data Model: AI-Native Book Website

**Feature**: AI-Native Book Website
**Date**: 2026-02-01
**Purpose**: Define data structures, TypeScript interfaces, and validation rules for the application

## Overview

This document describes the data entities used in the AI-Native Book Website. Since this is a frontend-only application with no backend, data is stored in MDX files (content) and localStorage (user preferences).

---

## Entity 1: Chapter

**Description**: Represents a single chapter of the book, stored as an MDX file in `/content/chapters/`

### TypeScript Interface

```typescript
// types/chapter.ts

export interface ChapterMetadata {
  /** Chapter title displayed in heading and navigation */
  title: string

  /** Short description for chapter cards and SEO meta tags */
  description: string

  /** Chapter order for sorting (1-5) */
  order: number

  /** Optional: Estimated reading time in minutes */
  readTime?: number

  /** Optional: Chapter tags for filtering (future feature) */
  tags?: string[]
}

export interface Chapter {
  /** Unique identifier derived from filename (e.g., "chapter-1") */
  id: string

  /** Metadata from frontmatter */
  meta: ChapterMetadata

  /** MDX content (not included in type, handled by MDX processor) */
  content: unknown // MDX content processed by @next/mdx
}
```

### MDX File Structure

```yaml
---
title: "Chapter 1: Introduction to AI-Native Development"
description: "Learn the fundamentals of building AI-native applications"
order: 1
readTime: 8
tags: ["fundamentals", "ai"]
---

# Topic 1.1: What is AI-Native Development?

AI-native development represents a paradigm shift...

## Topic 1.2: Why This Matters Now

The convergence of LLMs and modern frameworks...
```

### Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| `title` | Required, min 10 chars | "Chapter title must be at least 10 characters" |
| `description` | Required, min 20 chars | "Description must be at least 20 characters" |
| `order` | Required, 1-5 | "Chapter order must be between 1 and 5" |
| `readTime` | Optional, positive integer | "Reading time must be a positive number" |

### Relationships

- **Has many** Topic (embedded in MDX content as H2 headings)
- **Belongs to** Book (implicit - all chapters part of the book)

### Storage Location

```
content/chapters/
├── chapter-1.mdx
├── chapter-2.mdx
├── chapter-3.mdx
├── chapter-4.mdx
└── chapter-5.mdx
```

### Access Pattern

```typescript
// lib/mdx.ts
export async function getAllChapters(): Promise<Chapter[]> {
  const files = import.meta.glob('/content/chapters/*.mdx', { eager: true })
  return Object.values(files)
    .map((mod) => ({
      id: extractId(mod.filename),
      meta: mod.frontmatter as ChapterMetadata,
      content: mod.default,
    }))
    .sort((a, b) => a.meta.order - b.meta.order)
}

export async function getChapterById(id: string): Promise<Chapter | null> {
  const chapters = await getAllChapters()
  return chapters.find((ch) => ch.id === id) || null
}
```

---

## Entity 2: Topic

**Description**: Represents a sub-section within a chapter, defined by H2 headings in MDX content

### TypeScript Interface

```typescript
// types/chapter.ts (continued)

export interface Topic {
  /** Topic heading text (extracted from H2) */
  title: string

  /** Topic identifier for anchor links (slugified title) */
  id: string

  /** Parent chapter identifier */
  chapterId: string

  /** Order within chapter (1 or 2) */
  order: number
}
```

### Structure

Topics are **not** stored separately - they are extracted from MDX content during build time:

```markdown
# Chapter Title (H1)

## Topic 1.1: First Topic (H2)
Content...

## Topic 1.2: Second Topic (H2)
Content...
```

### Validation Rules

| Rule | Description |
|------|-------------|
| Required topics | Each chapter MUST have exactly 2 topics (H2 headings) |
| Topic naming | Topics MUST follow pattern "Topic X.Y: [Name]" for consistency |

### Extraction Logic

```typescript
// lib/mdx.ts
export function extractTopics(chapter: Chapter): Topic[] {
  const headings = chapter.content.match(/^##\s+(.+)$/gm) || []
  return headings.map((heading, index) => ({
    title: heading.replace('## ', ''),
    id: slugify(heading),
    chapterId: chapter.id,
    order: index + 1,
  }))
}
```

---

## Entity 3: Theme Preference

**Description**: User's selected theme (light/dark) stored in localStorage

### TypeScript Interface

```typescript
// types/theme.ts

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemePreference {
  /** Selected theme mode */
  mode: ThemeMode

  /** Timestamp of last update */
  updatedAt: number
}
```

### Storage Schema

**Key**: `theme-preference`

**Value**:
```json
{
  "mode": "dark",
  "updatedAt": 1706770800000
}
```

### Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| `mode` | Must be 'light', 'dark', or 'system' | "Invalid theme mode" |
| `updatedAt` | Required, positive number | "Invalid timestamp" |

### Default Value

When no preference exists:
```typescript
const defaultPreference: ThemePreference = {
  mode: 'system', // Respect user's system preference
  updatedAt: Date.now(),
}
```

### Storage Operations

```typescript
// lib/storage.ts

const THEME_KEY = 'theme-preference'

export const themeStorage = {
  get(): ThemePreference {
    if (typeof window === 'undefined') return defaultPreference

    try {
      const data = localStorage.getItem(THEME_KEY)
      return data ? JSON.parse(data) : defaultPreference
    } catch {
      return defaultPreference
    }
  },

  set(mode: ThemeMode): void {
    if (typeof window === 'undefined') return

    try {
      const preference: ThemePreference = {
        mode,
        updatedAt: Date.now(),
      }
      localStorage.setItem(THEME_KEY, JSON.stringify(preference))
    } catch (error) {
      console.error('Failed to save theme preference:', error)
    }
  },
}
```

**Note**: In production, `next-themes` library handles this automatically. This schema is for reference.

---

## Entity 4: Waitlist Entry

**Description**: User email address collected from contact form, stored in localStorage

### TypeScript Interface

```typescript
// types/waitlist.ts

export interface WaitlistEntry {
  /** User's email address */
  email: string

  /** Unix timestamp of submission */
  timestamp: number
}
```

### Storage Schema

**Key**: `waitlist`

**Value** (array):
```json
[
  {
    "email": "user@example.com",
    "timestamp": 1706770800000
  }
]
```

### Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| `email` | Required, valid email format | "Please enter a valid email address" |
| `timestamp` | Required, positive number | (Auto-generated, no validation) |

### Email Validation

```typescript
// lib/validation.ts

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}
```

### Storage Operations

```typescript
// lib/storage.ts

const WAITLIST_KEY = 'waitlist'

export const waitlistStorage = {
  getAll(): WaitlistEntry[] {
    if (typeof window === 'undefined') return []

    try {
      const data = localStorage.getItem(WAITLIST_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  add(email: string): { success: boolean; error?: string } {
    if (typeof window === 'undefined') {
      return { success: false, error: 'localStorage unavailable' }
    }

    try {
      const entries = this.getAll()
      const sanitized = sanitizeEmail(email)

      // Check for duplicates
      if (entries.some((e) => e.email === sanitized)) {
        return { success: false, error: 'Email already registered' }
      }

      // Validate email format
      if (!isValidEmail(sanitized)) {
        return { success: false, error: 'Invalid email format' }
      }

      // Add new entry
      entries.push({
        email: sanitized,
        timestamp: Date.now(),
      })

      localStorage.setItem(WAITLIST_KEY, JSON.stringify(entries))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to save email' }
    }
  },

  hasEmail(email: string): boolean {
    const entries = this.getAll()
    return entries.some((e) => e.email === sanitizeEmail(email))
  },
}
```

### Error Handling

| Error Scenario | User Message | Fallback Behavior |
|----------------|--------------|-------------------|
| localStorage disabled | "Unable to save email. Please check browser settings." | Display message, don't crash |
| localStorage quota full | "Storage full. Please clear browser data." | Display message |
| Invalid email format | "Please enter a valid email address." | Show validation error |
| Duplicate email | "You're already on the waitlist!" | Show confirmation message |

---

## Entity 5: Reading Progress

**Description**: Tracks user's current reading position in the book (optional feature for future enhancement)

### TypeScript Interface

```typescript
// types/progress.ts

export interface ReadingProgress {
  /** Current chapter ID user is reading */
  currentChapter: string | null

  /** Scroll position within chapter (0-100) */
  scrollPercent: number

  /** Last updated timestamp */
  lastReadAt: number
}
```

### Storage Schema

**Key**: `reading-progress`

**Value**:
```json
{
  "currentChapter": "chapter-1",
  "scrollPercent": 45,
  "lastReadAt": 1706770800000
}
```

**Note**: This entity is **optional** for MVP. Constitution requires progress bar (FR-006) but does not require persisting reading position.

---

## Data Flow Diagrams

### Content Loading Flow

```
User visits /book page
    ↓
Next.js App Router loads book/page.tsx
    ↓
getStaticProps (or async component) calls getAllChapters()
    ↓
@next/mdx processes .mdx files from /content/chapters/
    ↓
Chapter components rendered with MDX content
    ↓
Chapter navigation generated from chapter metadata
```

### Theme Switching Flow

```
User clicks theme toggle button
    ↓
ThemeToggle component calls setTheme('dark' | 'light')
    ↓
next-themes updates:
  - DOM class (html.dark or html.light)
  - localStorage preference
    ↓
Tailwind dark: prefix applies dark mode styles
    ↓
Glassmorphism effects adapt to new theme
```

### Waitlist Submission Flow

```
User enters email in contact form
    ↓
Form validation (client-side)
    ↓
waitlistStorage.add(email) called
    ↓
Check for duplicate email
    ↓
Validate email format
    ↓
Save to localStorage
    ↓
Show success message
```

---

## Type Safety Guarantees

### TypeScript Strict Mode Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type Exports

All types are exported from `types/index.ts`:

```typescript
// types/index.ts
export * from './chapter'
export * from './theme'
export * from './waitlist'
export * from './progress'
```

### Generic Props Pattern

Components use generic props for reusability:

```typescript
// components/glass-container.tsx
interface GlassContainerProps {
  children: React.ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  opacity?: number
}

export function GlassContainer({
  children,
  className,
  blur = 'xl',
  opacity = 0.1,
}: GlassContainerProps) {
  // ...
}
```

---

## Validation Summary

| Entity | Validation Method | Error Handling |
|--------|------------------|----------------|
| Chapter | Build-time (frontmatter schema) | Build fails if invalid |
| Topic | Build-time (H2 count) | Build fails if ≠ 2 topics |
| Theme Preference | Runtime (type guard) | Fallback to 'system' |
| Waitlist Entry | Runtime (email regex) | User-facing error message |

---

## Next Steps

With data models defined, proceed to:
1. **Component Contracts** (contracts/) - Define props for each component
2. **Quickstart Guide** (quickstart.md) - Developer onboarding documentation
