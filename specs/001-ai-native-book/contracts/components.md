# Component Contracts: AI-Native Book Website

**Feature**: AI-Native Book Website
**Date**: 2026-02-01
**Purpose**: Define component interfaces, props, and behavior contracts

## Overview

This document specifies the contract for each reusable component in the application. Components follow the constitution's reusability principle (VII): all accept props for customization, with no hardcoded values.

---

## Contract 1: Navigation Component

**File**: `components/navigation.tsx`

### Purpose

Site-wide navigation header with links to all pages and theme toggle button.

### Props Interface

```typescript
interface NavigationProps {
  /** Current page path for active link highlighting */
  currentPath: string

  /** CSS class name for styling override */
  className?: string

  /** Position variant (sticky or fixed) */
  variant?: 'sticky' | 'fixed'
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| `currentPath = '/book'` | Highlights "Book" link as active |
| User clicks navigation link | Navigates to target page via Next.js `<Link>` |
| User hovers link | Shows underline + color transition |
| Theme toggle clicked | Toggles light/dark mode |

### Accessibility Requirements

- `role="navigation"` on nav element
- `aria-label="Main navigation"`
- Active link has `aria-current="page"`
- All links keyboard accessible (Tab, Enter)

### Styling Contract

- Glassmorphism container (`backdrop-blur`, semi-transparent bg)
- Responsive: hamburger menu on mobile (<768px)
- Sticky on scroll (or fixed if `variant="fixed"`)
- Dark mode: adapts colors

---

## Contract 2: Theme Toggle Component

**File**: `components/theme-toggle.tsx`

### Purpose

Button to toggle between light and dark mode, integrated with `next-themes`.

### Props Interface

```typescript
interface ThemeToggleProps {
  /** CSS class name for styling override */
  className?: string

  /** Icon size in pixels (default: 24) */
  size?: number

  /** Show icon only (no label) */
  iconOnly?: boolean
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| User clicks button | Toggles between light/dark mode |
| Theme is 'light' | Shows moon icon |
| Theme is 'dark' | Shows sun icon |
| Theme is 'system' | Shows icon matching system pref |

### Accessibility Requirements

- `aria-label="Toggle theme"` or `"Toggle dark mode"` / `"Toggle light mode"`
- `aria-pressed={theme === 'dark'}`
- Keyboard accessible (Tab, Enter, Space)
- Focus visible indicator

### Styling Contract

- Icon from `lucide-react` (Sun, Moon)
- Smooth color transition (300ms)
- Hover effect: scale (1.1) + brightness
- Active effect: slight press animation

---

## Contract 3: Hero Section Component

**File**: `components/hero-section.tsx`

### Purpose

Hero section for home page with book title, description, and CTA button.

### Props Interface

```typescript
interface HeroSectionProps {
  /** Main heading text */
  title: string

  /** Subtitle or description text */
  description: string

  /** CTA button text */
  ctaText?: string

  /** CTA button link destination */
  ctaHref?: string

  /** Optional background image URL */
  backgroundImage?: string

  /** CSS class name for styling override */
  className?: string
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| User clicks CTA button | Navigates to `ctaHref` (default: `/book`) |
| No background image | Uses gradient background |
| Background image provided | Shows image with overlay |

### Accessibility Requirements

- `h1` for title (only one h1 per page)
- Description in `p` tag
- CTA button has accessible label
- Background image has `alt=""` (decorative)

### Styling Contract

- Full-width container
- Glassmorphism card for content (centered)
- Animated gradient background (via `gradient-bg.tsx`)
- Mobile: stacked layout, text centered
- Desktop: centered content, max-width 800px

---

## Contract 4: Chapter Card Component

**File**: `components/chapter-card.tsx`

### Purpose

Preview card for a single chapter, used on home page "Book Preview" section.

### Props Interface

```typescript
interface ChapterCardProps {
  /** Chapter metadata */
  chapter: Pick<ChapterMetadata, 'title' | 'description' | 'order'>

  /** Click handler (optional) */
  onClick?: () => void

  /** Link destination (if provided, renders as Link) */
  href?: string

  /** CSS class name for styling override */
  className?: string
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| `href` provided | Renders as Next.js `<Link>` to chapter |
| `onClick` provided | Calls handler on click |
| User hovers card | Lift effect + shadow increase |

### Accessibility Requirements

- Card as `<article>` or `<div>` with `role="group"`
- If link: entire card clickable with `a` tag
- Heading (h3) for chapter title
- Description in paragraph
- `aria-label="{order}. {title}"` for screen readers

### Styling Contract

- Glassmorphism container
- Chapter number badge (top left)
- Title (h3) + description
- Hover: `translate-y` (-4px) + shadow
- Mobile: full width
- Desktop: card grid (3 columns)

---

## Contract 5: Chapter Navigation Component

**File**: `components/chapter-navigation.tsx`

### Purpose

Table of contents for book page, showing all chapters with active state.

### Props Interface

```typescript
interface ChapterNavigationProps {
  /** List of all chapters */
  chapters: Array<{
    id: string
    title: string
    order: number
  }>

  /** Currently active chapter ID */
  activeChapter: string

  /** Click handler signature */
  onChapterClick: (chapterId: string) => void

  /** CSS class name for styling override */
  className?: string

  /** Position variant */
  variant?: 'sidebar' | 'dropdown'
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| User clicks chapter link | Smooth scrolls to chapter |
| Chapter scrolls into view | Updates `activeChapter` state |
| `variant="sidebar"` | Shows as sidebar (desktop) / drawer (mobile) |
| `variant="dropdown"` | Shows as dropdown (mobile only) |

### Accessibility Requirements

- `nav` element with `aria-label="Chapter navigation"`
- Active link has `aria-current="true"`
- Links keyboard accessible
- Chapter numbers announced ("Chapter 1: Title")

### Styling Contract

- Sidebar: fixed position left (desktop), drawer (mobile)
- Glassmorphism background
- Active chapter: highlighted + left border
- Smooth scroll behavior via CSS `scroll-behavior: smooth`

---

## Contract 6: Progress Bar Component

**File**: `components/progress-bar.tsx`

### Purpose

Reading progress indicator at top of book page, updates as user scrolls.

### Props Interface

```typescript
interface ProgressBarProps {
  /** Current progress percentage (0-100) */
  progress: number

  /** Position variant */
  variant?: 'top' | 'inline'

  /** Show percentage label */
  showLabel?: boolean

  /** CSS class name for styling override */
  className?: string
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| `progress = 50` | Bar filled 50% |
| `showLabel = true` | Shows "50%" text |
| User scrolls | Bar updates smoothly (no jumps) |

### Accessibility Requirements

- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- If `showLabel`, text also in `aria-label`
- Screen reader announces: "Reading progress: 50 percent"

### Styling Contract

- Fixed position top (if `variant="top"`)
- Gradient fill color (brand colors)
- Smooth transition (150ms)
- Height: 4px (thin, unobtrusive)
- Z-index: 50 (above content)

---

## Contract 7: Glass Container Component

**File**: `components/glass-container.tsx`

### Purpose

Reusable glassmorphism wrapper component for consistent visual effects.

### Props Interface

```typescript
interface GlassContainerProps {
  /** Child content */
  children: React.ReactNode

  /** Blur intensity */
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  /** Background opacity (0-1) */
  opacity?: number

  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

  /** CSS class name for styling override */
  className?: string

  /** HTML tag to render */
  as?: 'div' | 'section' | 'article' | 'main'
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| `blur="xl"` | Applies `backdrop-blur-xl` |
| `opacity={0.2}` | Sets `bg-white/20` (light) / `bg-black/20` (dark) |
| `radius="xl"` | Applies `rounded-2xl` |

### Accessibility Requirements

- No specific requirements (decorative wrapper)
- Semantics from `as` prop (e.g., `<main>` for main content)

### Styling Contract

- Light mode: `bg-white/{opacity}`
- Dark mode: `bg-black/{opacity}`
- Border: `border border-white/20` (light) / `border-white/10` (dark)
- Shadow: `shadow-xl`

---

## Contract 8: Gradient Background Component

**File**: `components/gradient-bg.tsx`

### Purpose

Animated gradient background for hero sections and page headers.

### Props Interface

```typescript
interface GradientBgProps {
  /** Gradient colors (CSS gradient string) */
  colors?: string

  /** Animation speed in seconds */
  duration?: number

  /** CSS class name for styling override */
  className?: string

  /** Fixed positioning (true) or absolute (false) */
  fixed?: boolean
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| `fixed = true` | Covers entire viewport, fixed on scroll |
| `colors` omitted | Uses default brand gradient |

### Accessibility Requirements

- `aria-hidden="true"` (decorative)
- Does not interfere with text readability (contrast maintained)

### Styling Contract

- CSS animation (`@keyframes` gradient shift)
- Default colors: purple → pink → orange
- Smooth infinite loop
- Z-index: -1 (behind content)

---

## Contract 9: Waitlist Form Component

**File**: `components/waitlist-form.tsx`

### Purpose

Contact/waitlist form with email input and submit button.

### Props Interface

```typescript
interface WaitlistFormProps {
  /** Form submission handler */
  onSubmit: (email: string) => Promise<{ success: boolean; error?: string }>

  /** Initial email value (for edit mode) */
  initialEmail?: string

  /** Show success message if already submitted */
  isSubmitted?: boolean

  /** CSS class name for styling override */
  className?: string
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| User submits invalid email | Shows validation error |
| User submits valid email | Calls `onSubmit`, shows loading state |
| `onSubmit` returns success | Shows success message, clears form |
| `onSubmit` returns error | Shows error message |
| `isSubmitted = true` | Shows "Already joined" message, hides form |

### Accessibility Requirements

- `form` element with accessible label
- Email input: `type="email"`, `required`, `aria-label="Email address"`
- Submit button: `type="submit"`
- Error messages: `role="alert"`, announced to screen readers
- Loading state: `aria-busy="true"`

### Styling Contract

- Glassmorphism container
- Input field with focus ring
- Submit button with hover effect
- Error state: red border + icon
- Success state: green checkmark + message

---

## Contract 10: Code Block Component

**File**: `components/code-block.tsx`

### Purpose

Syntax-highlighted code block for MDX content.

### Props Interface

```typescript
interface CodeBlockProps {
  /** Code content */
  children: string

  /** Programming language for syntax highlighting */
  language?: string

  /** Show filename header */
  filename?: string

  /** CSS class name for styling override */
  className?: string
}
```

### Behavior Contract

| Input | Expected Behavior |
|-------|-------------------|
| `language="typescript"` | Applies TypeScript syntax highlighting |
| `filename` provided | Shows tab with filename |
| User clicks copy button | Copies code to clipboard |

### Accessibility Requirements

- `role="code"` or `<pre><code>` semantic tags
- `aria-label="Code example in {language}"`
- Copy button: `aria-label="Copy code to clipboard"`

### Styling Contract

- Dark theme for code (regardless of site theme)
- Line numbers (optional)
- Syntax highlighting via `rehype-highlight`
- Copy button with tooltip feedback

---

## shadcn/ui Components Used

The following components are imported from shadcn/ui (constitution-compliant):

| Component | Props Override | Customization |
|-----------|----------------|---------------|
| `Button` | `variant`, `size`, `className` | Custom variants (glass, gradient) |
| `Input` | `type`, `placeholder`, `className` | Glassmorphism style |
| `Textarea` | `placeholder`, `rows`, `className` | Glassmorphism style |
| `Card` | `className` | Glassmorphism background |

---

## Component Composition Example

```tsx
// Home page composition
export default function HomePage() {
  return (
    <>
      <Navigation currentPath="/" variant="sticky" />
      <main>
        <HeroSection
          title="AI-Native Driven Development"
          description="Master the art of building AI-native applications"
          ctaText="Start Reading"
          ctaHref="/book"
        />
        <GlassContainer>
          <section>
            <h2>Chapter Preview</h2>
            <div className="grid">
              <ChapterCard chapter={chapter1} href="/book#chapter-1" />
              <ChapterCard chapter={chapter2} href="/book#chapter-2" />
              <ChapterCard chapter={chapter3} href="/book#chapter-3" />
            </div>
          </section>
        </GlassContainer>
      </main>
    </>
  )
}
```

---

## Contract Testing Checklist

For each component, verify:

- [ ] All props are typed with TypeScript interfaces
- [ ] No hardcoded values (colors, sizes, text)
- [ ] Default props provided for all optional props
- [ ] Accessibility attributes present (`aria-*`, `role`)
- [ ] Keyboard navigation works
- [ ] Dark mode styling applied
- [ ] Mobile responsive (320px minimum)
- [ ] Error states handled (form components)
- [ ] Loading states handled (async components)

---

## Next Steps

With component contracts defined:
1. Implement components in `components/` directory
2. Write component tests (optional)
3. Create `quickstart.md` for developer onboarding
