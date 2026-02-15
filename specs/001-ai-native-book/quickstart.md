# Quickstart Guide: AI-Native Book Website

**Feature**: AI-Native Book Website
**Last Updated**: 2026-02-01
**Prerequisites**: Node.js 20+, npm or pnpm, Git

## Overview

This guide will help you set up the AI-Native Book Website development environment and understand the project structure. The site is built with Next.js 15, TypeScript, Tailwind CSS, and MDX.

---

## Prerequisites Installation

### 1. Install Node.js (v20 or later)

```bash
# Check Node.js version
node --version  # Should be v20+

# If not installed, download from: https://nodejs.org/
```

### 2. Install a Package Manager

Choose one:
- **npm** (included with Node.js)
- **pnpm** (faster, disk space efficient): `npm install -g pnpm`
- **yarn** (alternative): `npm install -g yarn`

This guide uses `npm` commands, but you can substitute with your preferred manager.

---

## Project Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ai-native-book
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Next.js 15.1+ (React framework)
- React 19.1+ (UI library)
- TypeScript 5.7+ (Type safety)
- Tailwind CSS 3.4+ (Styling)
- @next/mdx (MDX processing)
- next-themes (Theme management)
- lucide-react (Icons)

### Step 3: Configure shadcn/ui

```bash
npx shadcn@latest init
```

Follow the prompts:
- **Default style**: Default
- **Base color**: Slate
- **CSS variables**: Yes

Then add required components:

```bash
npx shadcn@latest add button input card
```

### Step 4: Create Environment File

```bash
touch .env.local
```

Add (if needed):

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=

# Optional: Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Development Workflow

### Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

**Hot reload enabled**: Changes to `.tsx`, `.mdx`, `.css` files auto-refresh the browser.

### Build for Production

```bash
npm run build
```

This:
1. Compiles TypeScript
2. Bundles and minifies code
3. Processes MDX files
4. Generates static pages
5. Outputs to `.next/` directory

**Build output**:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (4)
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    12 kB
├ ○ /about                                8 kB
├ ○ /book                                45 kB
└ ○ /contact                             10 kB
```

### Preview Production Build

```bash
npm run start
```

Runs the production build locally (for testing before deployment).

---

## Project Structure

```
ai-native-book/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Root layout (theme provider, nav)
│   ├── page.tsx                 # Home page
│   ├── book/
│   │   └── page.tsx            # Book page (MDX content)
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   └── globals.css             # Global styles + Tailwind
│
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── navigation.tsx           # Site header
│   ├── theme-toggle.tsx         # Light/dark switch
│   ├── progress-bar.tsx         # Reading progress
│   ├── chapter-card.tsx         # Chapter preview
│   ├── chapter-navigation.tsx   # Book TOC
│   ├── hero-section.tsx         # Hero component
│   ├── glass-container.tsx      # Glassmorphism wrapper
│   └── gradient-bg.tsx          # Animated gradient
│
├── lib/                         # Utility functions
│   ├── utils.ts                # cn() helper, clsx
│   ├── storage.ts              # localStorage wrappers
│   ├── mdx.ts                  # MDX processing
│   └── scroll.ts               # Scroll tracking
│
├── types/                       # TypeScript definitions
│   ├── chapter.ts              # Chapter types
│   ├── theme.ts                # Theme types
│   └── waitlist.ts             # Waitlist types
│
├── content/chapters/            # MDX book content
│   ├── chapter-1.mdx
│   ├── chapter-2.mdx
│   ├── chapter-3.mdx
│   ├── chapter-4.mdx
│   └── chapter-5.mdx
│
├── public/                      # Static assets
│   └── images/                 # Optimized images (WebP)
│
├── specs/                       # Feature documentation (this repo)
│   └── 001-ai-native-book/
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       └── contracts/
│
├── next.config.mjs             # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config (strict mode)
└── package.json                # Dependencies
```

---

## Creating New Content

### Adding a Chapter

1. Create MDX file in `content/chapters/`:

```bash
# Example: chapter-6.mdx (if extending beyond 5)
touch content/chapters/chapter-6.mdx
```

2. Add frontmatter:

```yaml
---
title: "Chapter 6: Advanced Topics"
description: "Explore advanced AI-native patterns"
order: 6
---

# Topic 6.1: First Topic

Content...

## Topic 6.2: Second Topic

Content...
```

3. Chapter automatically appears on book page (MDX loader picks it up).

### Adding Images

1. Place image in `public/images/`:

```bash
# Use WebP format for optimization
cp my-image.webp public/images/
```

2. Reference in MDX or components:

```tsx
<Image src="/images/my-image.webp" alt="Description" width={800} height={600} />
```

**Optimization**:
- Use WebP format (25-35% smaller than JPEG)
- Provide fallback for older browsers (automatic with Next.js)
- Lazy load below-the-fold images (`loading="lazy"`)

---

## Component Development

### Creating a Reusable Component

1. Create component file in `components/`:

```tsx
// components/my-component.tsx
interface MyComponentProps {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'fancy'
}

export function MyComponent({ title, children, variant = 'default' }: MyComponentProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg',
      variant === 'fancy' && 'bg-gradient-to-r from-purple-500 to-pink-500'
    )}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

2. Use `cn()` helper for conditional classes:

```tsx
import { cn } from '@/lib/utils'

<div className={cn('base-class', isActive && 'active-class')} />
```

### Using shadcn/ui Components

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function MyForm() {
  return (
    <form>
      <Input type="email" placeholder="your@email.com" />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

**Customize shadcn components**:
- Edit component files in `components/ui/`
- Or use `className` prop for one-off styles:
  ```tsx
  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
    Custom Button
  </Button>
  ```

---

## Styling Guidelines

### Tailwind CSS Best Practices

1. **Mobile-first responsive**:
   ```tsx
   <div className="w-full md:w-1/2 lg:w-1/3">
     <!-- Full width on mobile, 1/2 on tablet, 1/3 on desktop -->
   </div>
   ```

2. **Dark mode support**:
   ```tsx
   <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
     <!-- Light: white bg, dark text; Dark: black bg, light text -->
   </div>
   ```

3. **Glassmorphism pattern**:
   ```tsx
   <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">
     <!-- Frosted glass effect -->
   </div>
   ```

4. **Gradient backgrounds**:
   ```tsx
   <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
     <!-- Smooth gradient -->
   </div>
   ```

### Custom Utilities

See `lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Use `cn()` to merge Tailwind classes intelligently:

```tsx
<div className={cn('px-4 py-2', isActive && 'bg-blue-500')} />
```

---

## Theme Development

### Adding New Colors

Edit `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        'brand-purple': '#8b5cf6',
        'brand-pink': '#ec4899',
        'brand-orange': '#f97316',
      },
    },
  },
}
```

Use in components:

```tsx
<div className="bg-brand-purple dark:bg-brand-purple/80">
```

### Dark Mode Customization

Dark mode is handled by `next-themes`. To customize dark styles:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

The `dark:` prefix applies styles when dark mode is active.

---

## Testing Locally

### Manual Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation links work (Home, Book, About, Contact)
- [ ] Theme toggle switches between light/dark
- [ ] Book page displays all 5 chapters
- [ ] Chapter navigation jumps to correct section
- [ ] Progress bar updates on scroll
- [ ] Waitlist form saves to localStorage
- [ ] Mobile layout (320px breakpoint)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader announces content (NVDA/VoiceOver)

### Browser DevTools

**Performance**:
- Open DevTools → Network tab
- Reload page
- Check FCP (First Contentful Paint) < 1.5s
- Check bundle size (hover over `.js` files)

**Accessibility**:
- Install axe DevTools extension
- Run audit: No violations
- Check color contrast (4.5:1 minimum)

**Responsive Design**:
- DevTools → Device toolbar (Ctrl+Shift+M)
- Test at: 320px, 375px, 768px, 1024px, 1920px

---

## Deployment

### Deploy to Vercel

1. **Push code to GitHub**:

   ```bash
   git add .
   git commit -m "feat: initial implementation"
   git push origin 001-ai-native-book
   ```

2. **Connect to Vercel**:
   - Visit: https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Click "Deploy"

3. **Automatic deployment**:
   - Vercel builds and deploys on every push to `main`
   - Preview deployments for pull requests

4. **Custom domain** (optional):
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update DNS records (CNAME)

### Environment Variables (Vercel)

Add in Vercel Dashboard → Settings → Environment Variables:

```env
NODE_ENV=production
```

---

## Troubleshooting

### Issue: Module not found

**Error**: `Module not found: Can't resolve '@/components/...'

**Solution**:
- Check `tsconfig.json` has correct `paths` alias:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./*"]
      }
    }
  }
  ```

### Issue: MDX not rendering

**Error**: MDX content shows as raw text

**Solution**:
- Check `next.config.mjs` has `@next/mdx` setup
- Restart dev server after config changes
- Ensure MDX files have `.mdx` extension

### Issue: Tailwind classes not working

**Error**: Custom classes have no effect

**Solution**:
- Run `npm run dev` to restart Tailwind JIT compiler
- Check `tailwind.config.ts` `content` array includes all file paths:
  ```typescript
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ]
  ```

### Issue: Theme flickering

**Error**: Flash of unstyled content when switching themes

**Solution**:
- Ensure `suppressHydrationWarning` on `<html>` tag in `layout.tsx`
- Use `next-themes` library (don't implement manually)

---

## Performance Optimization

### Bundle Size Analysis

```bash
npm run build -- --analyze
```

This generates a visual bundle analyzer to identify large dependencies.

### Optimization Tips

1. **Dynamic imports** for heavy components:
   ```tsx
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <div>Loading...</div>,
   })
   ```

2. **Image optimization**:
   - Use Next.js `<Image>` component (not `<img>`)
   - Convert images to WebP
   - Lazy load below-the-fold images

3. **Code splitting**:
   - Next.js automatically splits by route
   - No additional configuration needed

4. **Font optimization**:
   ```tsx
   // app/layout.tsx
   import { Inter } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'], display: 'swap' })
   ```

---

## Constitution Compliance

### Before Committing Code

Verify compliance with project constitution (`.specify/memory/constitution.md`):

1. **Minimal Dependency Philosophy** (Principle I):
   - No new UI libraries beyond shadcn/ui + Tailwind
   - Check `package.json` for unexpected dependencies

2. **Mobile-First Responsive Design** (Principle II):
   - Test at 320px width
   - Use mobile-first Tailwind classes

3. **MDX-First Content Management** (Principle III):
   - Content in `/content/chapters/` as `.mdx` files
   - No hardcoded content in components

4. **Performance Excellence** (Principle IV):
   - Bundle size < 150KB
   - FCP < 1.5s

5. **Universal Accessibility** (Principle V):
   - ARIA labels on interactive elements
   - Keyboard navigation works
   - Color contrast passes axe DevTools

6. **TypeScript Strict Mode** (Principle VI):
   - No `any` types
   - All components typed

7. **Component Reusability** (Principle VII):
   - Components accept props (no hardcoded values)
   - Extract repeated patterns

---

## Learning Resources

### Official Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDX Docs](https://mdxjs.com)
- [shadcn/ui Docs](https://ui.shadcn.com)

### Project-Specific

- Constitution: `.specify/memory/constitution.md`
- Feature Spec: `specs/001-ai-native-book/spec.md`
- Implementation Plan: `specs/001-ai-native-book/plan.md`
- Data Model: `specs/001-ai-native-book/data-model.md`
- Component Contracts: `specs/001-ai-native-book/contracts/components.md`

---

## Getting Help

### Issues or Questions?

1. Check existing documentation in `specs/001-ai-native-book/`
2. Review constitution for principle-level guidance
3. Search project issues on GitHub
4. Contact project maintainers

### Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes following constitution principles
3. Test locally (`npm run dev`)
4. Commit with conventional commits: `git commit -m "feat: add new component"`
5. Push and create pull request

---

## Summary

✅ You're ready to develop!

**Quick commands**:
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Preview production build
npm run lint       # Lint code
```

**Next steps**:
1. Explore `content/chapters/` to see book content
2. Modify `app/page.tsx` to customize home page
3. Add new components in `components/`
4. Deploy to Vercel when ready

Happy building! 🚀
