# Quickstart Guide: Docusaurus Book Frontend

**Feature**: 001-book-frontend
**Date**: 2025-02-15
**Phase**: Phase 1 - Design & Contracts

## Overview

This guide provides step-by-step instructions for setting up, developing, building, and deploying a professional book-reading website using Docusaurus v3.x.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Adding Book Content](#adding-book-content)
6. [Configuration](#configuration)
7. [Building & Deployment](#building--deployment)
8. [Chatbot Integration](#chatbot-integration)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

| Software | Minimum Version | Recommended | Check Command |
|----------|----------------|-------------|---------------|
| **Node.js** | 20.x | 20.x LTS | `node --version` |
| **npm** | 9.x | Latest | `npm --version` |
| **Git** | Any | Latest | `git --version` |

**Install Node.js** (if not installed):
- **Option 1**: Download from [nodejs.org](https://nodejs.org/) (LTS version)
- **Option 2**: Use version manager:
  - **macOS**: `brew install node`
  - **Windows**: Download installer from nodejs.org
  - **Linux**: `sudo apt install nodejs npm` (Debian/Ubuntu)

**Verify Installation**:
```bash
node --version  # Should be v20.x.x or higher
npm --version   # Should be 9.x.x or higher
```

---

## Installation

### Step 1: Create Docusaurus Project

**Option A: Interactive Setup** (Recommended for beginners):

```bash
# Navigate to your project directory
cd /path/to/your/projects

# Create new Docusaurus site
npx create-docusaurus@latest book-website classic

# Follow the prompts:
# - Package name: book-website
# - TypeScript? No (or Yes if you prefer TypeScript)
# - Install dependencies? Yes
```

**Option B: Non-Interactive Setup** (Faster, automation-friendly):

```bash
# Create project in one command
npx create-docusaurus@latest book-website classic --skip-install

# Navigate into project
cd book-website

# Install dependencies
npm install
```

**Project Created Successfully**:
```
✅ Your Docusaurus project is ready!
📁 Location: ./book-website
🚀 Next: cd book-website && npm start
```

---

### Step 2: Start Development Server

```bash
cd book-website
npm start
```

**Expected Output**:
```
✓ the website is running at http://localhost:3000/
✓ Compiled successfully

Open your browser to http://localhost:3000/
```

**Visit in Browser**: Navigate to [http://localhost:3000](http://localhost:3000)

You should see the default Docusaurus welcome page.

---

## Project Structure

### Directory Layout

```
book-website/                  # Docusaurus project root
├── docusaurus.config.js      # Main configuration file
├── sidebars.js                # Sidebar navigation
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
│
├── docs/                     # Book content (MARKDOWN FILES GO HERE)
│   ├── intro.md             # Introduction page
│   ├── chapter-1/
│   │   ├── index.md         # Chapter 1 intro
│   │   ├── section-1-1.md   # Section 1.1
│   │   └── section-1-2.md   # Section 1.2
│   └── chapter-2/
│       └── ...
│
├── src/                      # Custom components and styles
│   ├── css/
│   │   └── custom.css       # Custom styles
│   └── theme/
│       ├── ChatWidget/       # Chatbot component (to be created)
│       └── Footer/           # Custom footer (optional)
│
├── static/                   # Static assets (images, favicon)
│   └── img/
│
└── build/                    # Generated static site (after `npm run build`)
```

### Key Files Explained

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `docusaurus.config.js` | Site configuration (title, theme, plugins) | Once (initial setup) |
| `sidebars.js` | Navigation structure | When adding chapters |
| `docs/` | Book content (markdown files) | Frequently (as you write) |
| `src/css/custom.css` | Custom styles | Occasionally |
| `package.json` | Dependencies and scripts | Rarely |

---

## Development Workflow

### 1. Write Content

**Create a new chapter**:
```bash
# Create chapter directory
mkdir -p docs/chapter-3

# Create section files
touch docs/chapter-3/index.md
touch docs/chapter-3/section-3-1.md
touch docs/chapter-3/section-3-2.md
```

**Edit markdown files** with your favorite editor:
```bash
# VS Code
code docs/chapter-3/index.md

# Vim
vim docs/chapter-3/index.md

# Nano
nano docs/chapter-3/index.md
```

**Example Content** (`docs/chapter-3/index.md`):
```markdown
---
title: "Chapter 3: Deep Learning"
sidebar_label: "3. Deep Learning"
description: "Explore neural networks and deep learning architectures."
---

# Chapter 3: Deep Learning

Deep learning is a subset of machine learning...

## Key Topics

- Neural Networks
- CNNs
- RNNs
- Transformers

```

---

### 2. Update Sidebar

Edit `sidebars.js` to add new chapters:

```javascript
module.exports = {
  docs: [
    // ... existing chapters ...

    // Add new chapter
    {
      type: 'category',
      label: 'Chapter 3: Deep Learning',
      collapsible: true,
      collapsed: false,
      items: [
        'chapter-3/index',
        'chapter-3/section-3-1',
        'chapter-3/section-3-2',
      ],
    },
  ],
};
```

**Save the file** - the browser will automatically reload!

---

### 3. Preview Changes

1. **Browser Auto-Reload**: Docusaurus hot-reloads when you save files
2. **Check Navigation**: Verify sidebar shows new chapters
3. **Test Links**: Click through chapter/section links
4. **View on Mobile**: Resize browser to test responsive design

---

### 4. Run Locally (Continuous Development)

```bash
# Start development server
npm start

# Server runs at http://localhost:3000/
# Press Ctrl+C to stop
```

---

## Adding Book Content

### Content Creation Workflow

#### Step 1: Plan Your Structure

**Outline Example**:
```
Book: AI Native Book
├── Introduction
├── Chapter 1: What is AI?
│   ├── History of AI
│   ├── Types of AI
│   └── AI vs Traditional Programming
├── Chapter 2: Machine Learning
│   ├── Supervised Learning
│   ├── Unsupervised Learning
│   └── Reinforcement Learning
└── Chapter 3: Deep Learning
    ├── Neural Networks
    └── CNNs and RNNs
```

#### Step 2: Create Directories

```bash
# Create chapter directories
mkdir -p docs/chapter-1
mkdir -p docs/chapter-2
mkdir -p docs/chapter-3
```

#### Step 3: Create Markdown Files

```bash
# Create section files
touch docs/intro.md
touch docs/chapter-1/index.md
touch docs/chapter-1/history-of-ai.md
touch docs/chapter-1/types-of-ai.md
touch docs/chapter-2/index.md
# ... etc
```

#### Step 4: Write Content

**File**: `docs/intro.md`
```markdown
---
title: "Introduction"
sidebar_label: "Introduction"
description: "Welcome to AI Native Book - your comprehensive guide to AI."
---

# Welcome to AI Native Book

This book teaches you how to build AI-powered applications...

## What You'll Learn

- Fundamentals of AI
- Machine learning algorithms
- Deep learning architectures
- Real-world AI applications

## Prerequisites

- Basic Python knowledge
- High school math
- Curiosity! 🚀

```

#### Step 5: Configure Sidebar

Edit `sidebars.js`:
```javascript
module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'intro',
    },
    {
      type: 'category',
      label: 'Chapter 1: What is AI?',
      collapsible: true,
      collapsed: false,
      items: [
        'chapter-1/index',
        'chapter-1/history-of-ai',
        'chapter-1/types-of-ai',
      ],
    },
    // ... more chapters
  ],
};
```

---

### Markdown/MDX Features

#### Basic Markdown

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- List item 1
- List item 2
  - Nested item

1. Numbered list
2. Another item

[Link text](https://example.com)

![Image alt](/img/chapter-1/diagram.png)
```

#### Code Blocks

```markdown
\```python
def hello():
    print("Hello, AI!")
\```

\```javascript
const ai = {
  name: "Chatbot",
  version: "1.0"
};
\```

\```bash
npm install @docusaurus/core@latest
\```
```

**With Line Numbers**:
```markdown
\```python showLineNumbers
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\```
```

#### Admonitions (Callouts)

```markdown
:::tip Pro Tip
Use semantic HTML for better accessibility!
:::

:::warning Warning
Always test your code before deployment.
:::

:::note Note
Docusaurus supports MDX - you can use React components!
:::

:::info Important
This is crucial information.
:::

:::danger Danger
Proceed with caution!
:::

:::caution Caution
Read the documentation carefully.
:::
```

#### Tables

```markdown
| Algorithm | Type | Use Case |
|-----------|------|----------|
| Linear Regression | Supervised | Prediction |
| K-Means | Unsupervised | Clustering |
| Q-Learning | Reinforcement | Game AI |
```

---

## Configuration

### Main Configuration (docusaurus.config.js)

#### Basic Setup

```javascript
module.exports = {
  title: 'AI Native Book',
  tagline: 'Your Comprehensive Guide to AI',
  favicon: 'img/favicon.ico',

  // Set your production URL
  url: 'https://yourbook.com',
  baseUrl: '/',

  // GitHub Pages (if using)
  // url: 'https://username.github.io',
  // baseUrl: '/repo-name/',

  organizationName: 'your-org',
  projectName: 'book-website',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',  // Serve docs at root (not /docs)
          sidebarPath: './sidebars.js',
          editUrl: null,  // Disable "Edit this page" button
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'AI Native Book',
        logo: {
          alt: 'AI Book Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Start Reading',
          },
          {
            href: 'https://github.com/username/repo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Your Name. Built with Docusaurus.`,
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },

      prism: {
        theme: {
          dark: require('prism-react-renderer/themes/vsDark'),
          light: require('prism-react-renderer/themes/vsLight'),
        },
        additionalLanguages: ['python', 'javascript', 'bash', 'json', 'yaml'],
      },

      colorMode: {
        defaultMode: 'system',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};
```

---

### Custom Styles (src/css/custom.css)

**Typography Optimization**:

```css
/**
 * Any CSS included here will be global.
 */

:root {
  /* Base font size */
  --ifm-font-size-base: 16px;

  /* Line height for readability */
  --ifm-line-height-base: 1.7;

  /* Spacing */
  --ifm-spacing-vertical: 1.5rem;

  /* Content width (optimal reading length) */
  --ifm-container-width: 800px;
}

/* Improved heading spacing */
.markdown h1,
.markdown h2,
.markdown h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Content max-width for reading comfort */
.markdown {
  max-width: 42rem;  /* ~680px, ~70 characters per line */
  margin: 0 auto;
}

/* Code block horizontal scroll */
.theme-code-block {
  overflow-x: auto;
  white-space: pre;
}

/* Chat widget placeholder */
.chat-widget-placeholder {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
```

---

## Building & Deployment

### Build for Production

#### Step 1: Test Build Locally

```bash
# Build the site
npm run build

# Output: ./build/ directory
```

**Expected Output**:
```
✓ Building...
✓ Server rendered routes
✓ Static routes rendered
✓ Client bundles
✓ Optimizing...

✔ Build successful! Output: ./build/
```

#### Step 2: Test Production Build Locally

```bash
# Serve the built site locally
npm run serve

# Visit http://localhost:3000/
```

This simulates the production build exactly.

---

### Deployment Options

#### Option 1: Vercel (Recommended)

**Automated Deployment**:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/book-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

**Vercel Configuration** (optional):

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "docusaurus"
}
```

**Automatic**: Every push to `main` branch triggers deployment.

---

#### Option 2: Netlify

**Deploy via Netlify**:

1. **Push to GitHub** (same as above)

2. **Connect on Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Configure:
     - **Build command**: `npm run build`
     - **Publish directory**: `build`
   - Click "Deploy site"

**Netlify Configuration** (optional):

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

#### Option 3: GitHub Pages

**Step 1: Configure docusaurus.config.js**

```javascript
module.exports = {
  url: 'https://username.github.io',
  baseUrl: '/repo-name/',
  projectName: 'repo-name',
  organizationName: 'username',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
};
```

**Step 2: Deploy Script**

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

**Script in package.json**:
```json
{
  "scripts": {
    "deploy": "docusaurus deploy"
  }
}
```

**Visit Your Site**: `https://username.github.io/repo-name/`

---

### Deployment Checklist

Before deploying, verify:

- [ ] Site builds successfully (`npm run build`)
- [ ] All links work (test navigation)
- [ ] Images load correctly
- [ ] Dark mode toggles properly
- [ ] Mobile responsive (test on phone)
- [ ] Search works
- [ ] No console errors
- [ ] Performance is good (Lighthouse score)

---

## Chatbot Integration

### Placeholder Component (Phase 1)

**Create Chat Widget Placeholder**:

```bash
# Create component directory
mkdir -p src/theme/ChatWidget

# Create component file
touch src/theme/ChatWidget/index.js
```

**File**: `src/theme/ChatWidget/index.js`
```javascript
import React from 'react';

export default function ChatWidget() {
  return (
    <div className="chat-widget-placeholder">
      <button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--ifm-color-primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          fontSize: '24px',
          zIndex: 1000,
        }}
        onClick={() => alert('Chat coming soon!')}
        aria-label="Open chat assistant"
      >
        💬
      </button>
    </div>
  );
}
```

**Use in Layout** (wrap root):

File: `src/theme/Root.js` (create if doesn't exist)
```javascript
import React from 'react';
import ChatWidget from '@theme/ChatWidget';

export default function Root({children}) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}
```

---

### Future Backend Integration (Phase 2)

When the RAG backend is ready:

1. **Install API Client**:
   ```bash
   npm install axios
   ```

2. **Update ChatWidget Component**:
   ```javascript
   import React, { useState } from 'react';
   import axios from 'axios';

   export default function ChatWidget() {
     const [isOpen, setIsOpen] = useState(false);
     const [messages, setMessages] = useState([]);
     const [input, setInput] = useState('');

     const sendMessage = async () => {
       const response = await axios.post('https://your-backend-api.com/api/v1/chat', {
         query: input,
       });
       setMessages([...messages, { user: input, bot: response.data.answer }]);
     };

     return (
       <div className="chat-widget">
         {/* Chat UI implementation */}
       </div>
     );
   }
   ```

3. **Add Environment Variable**:
   ```bash
   # .env.production
   CHAT_API_URL=https://your-backend-api.com
   ```

---

## Troubleshooting

### Common Issues

#### 1. Port 3000 Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill process on port 3000 (macOS/Linux)
npx kill-port 3000

# Or use different port
PORT=3001 npm start
```

---

#### 2. Module Not Found

**Error**: `Module not found: Error: Can resolve '@docusaurus/core'`

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

#### 3. Build Fails

**Error**: Build fails with syntax errors

**Solution**:
```bash
# Check markdown syntax
npm run build 2>&1 | grep "error"

# Fix reported errors in markdown files
```

---

#### 4. Images Not Loading

**Problem**: Images show broken link icon

**Solution**:
- Ensure images are in `static/` directory
- Use absolute paths starting with `/`
- Check file name case (Linux is case-sensitive)

**Correct**:
```markdown
![Image](/img/chapter-1/diagram.png)
```

**Wrong**:
```markdown
![Image](../static/img/diagram.png)
```

---

#### 5. Sidebar Not Showing

**Problem**: Sidebar is empty or missing items

**Solution**:
- Check `sidebars.js` syntax
- Verify file paths match actual files
- Restart dev server: `Ctrl+C` then `npm start`

---

### Getting Help

**Official Resources**:
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Docusaurus Discord](https://discord.gg/docusaurus)
- [GitHub Issues](https://github.com/facebook/docusaurus/issues)

**Search First**:
- Google your error message
- Check Docusaurus docs
- Search GitHub issues

---

## Next Steps

1. ✅ **Set up project**: Follow installation steps
2. ✅ **Write content**: Create markdown files in `docs/`
3. ✅ **Configure sidebar**: Edit `sidebars.js`
4. ✅ **Test locally**: Run `npm start` and preview
5. ✅ **Build**: Run `npm run build`
6. ✅ **Deploy**: Choose Vercel, Netlify, or GitHub Pages
7. ✅ **Iterate**: Add content, update sidebar, rebuild

---

## Summary

**Key Commands**:

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server (http://localhost:3000) |
| `npm run build` | Build production site (`./build/` directory) |
| `npm run serve` | Test production build locally |
| `npm run deploy` | Deploy to GitHub Pages (if configured) |

**Key Files**:

| File | Purpose |
|------|---------|
| `docusaurus.config.js` | Site configuration |
| `sidebars.js` | Navigation structure |
| `docs/*.md` | Book content |
| `src/css/custom.css` | Custom styles |

**Deployment Platforms**:

- Vercel: [vercel.com](https://vercel.com) ⭐ Recommended
- Netlify: [netlify.com](https://netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)

---

**Quickstart Status**: ✅ Complete
**Phase 1 Artifact**: ✅ Ready
