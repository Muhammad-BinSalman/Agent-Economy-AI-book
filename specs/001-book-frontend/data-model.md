# Data Model: Docusaurus Book Frontend

**Feature**: 001-book-frontend
**Date**: 2025-02-15
**Phase**: Phase 1 - Design & Contracts

## Overview

This document defines the content structure model for organizing book content in the Docusaurus-powered book website. Since this is a static site, the "data model" represents the file structure and frontmatter schema rather than database entities.

---

## Content Hierarchy

```
Book (Root)
├── Frontmatter (Introductory Content)
│   ├── Introduction
│   ├── About the Author
│   ├── Table of Contents
│   └── Preface (optional)
│
├── Chapter 1: [Chapter Title]
│   ├── Section 1.1: [Section Title]
│   │   └── Subsection (optional)
│   ├── Section 1.2: [Section Title]
│   └── ...
│
├── Chapter 2: [Chapter Title]
│   ├── Section 2.1: [Section Title]
│   ├── Section 2.2: [Section Title]
│   └── ...
│
└── Backmatter (Concluding Content)
    ├── Appendix
    ├── Glossary
    ├── References
    └── Index
```

---

## File Structure Mapping

### Directory Organization

```text
docs/
├── intro.md                    # Introduction / Landing page
├── about.md                    # About the book/author
├── toc.md                      # Table of contents (optional)
│
├── chapter-1/                  # Chapter 1 directory
│   ├── index.md               # Chapter 1 introduction
│   ├── section-1-1.md         # Section 1.1
│   ├── section-1-2.md         # Section 1.2
│   └── section-1-3.md         # Section 1.3
│
├── chapter-2/                  # Chapter 2 directory
│   ├── index.md               # Chapter 2 introduction
│   ├── section-2-1.md         # Section 2.1
│   └── section-2-2.md         # Section 2.2
│
├── appendix/                   # Backmatter
│   ├── glossary.md
│   └── references.md
│
└── _category_.yml             # Optional: Category metadata (advanced)
```

---

## Content Entities

### 1. Book (Root Entity)

**Definition**: The complete publication representing the entire book.

**Attributes** (configured in `docusaurus.config.js`):
```javascript
{
  title: string,              // Book title
  tagline: string,           // Subtitle or description
  url: string,               // Deployed URL (e.g., https://mybook.com)
  baseUrl: string,           // Path prefix (usually "/")
  favicon: string,           // Path to favicon image
}
```

**File Location**: `docusaurus.config.js` (root of Docusaurus project)

**Example**:
```javascript
module.exports = {
  title: 'AI Native Book',
  tagline: 'A Comprehensive Guide to Building AI-Powered Applications',
  url: 'https://mybook.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
};
```

---

### 2. Chapter

**Definition**: A top-level content division representing a major topic or part of the book.

**File Structure**:
```
docs/chapter-{N}/
├── index.md          # Chapter introduction/overview
├── section-{N}-{M}.md  # Individual sections
└── ...
```

**Frontmatter Schema** (YAML):
```yaml
---
title: "Chapter 1: Introduction to AI"
sidebar_label: "1. Introduction"
description: "Learn the fundamentals of artificial intelligence and its applications."
slug: /chapter-1
draft: false  # Set to true to hide from production
---
```

**Attributes**:
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | ✅ Yes | Full chapter title (displayed in H1) |
| `sidebar_label` | string | ❌ No | Short label for sidebar (default: title) |
| `description` | string | ❌ No | Meta description for SEO |
| `slug` | string | ❌ No | URL path (default: derived from filename) |
| `draft` | boolean | ❌ No | If true, excluded from production builds |
| `custom_edit_url` | string | ❌ No | Override default "Edit this page" URL |

**Relationships**:
- **Parent**: Book (root)
- **Children**: Sections (one-to-many)

**Example File** (`docs/chapter-1/index.md`):
```markdown
---
title: "Chapter 1: Introduction to AI"
sidebar_label: "1. Introduction"
description: "Learn the fundamentals of artificial intelligence and its applications."
---

# Chapter 1: Introduction to AI

This chapter introduces the core concepts of artificial intelligence...

## Topics Covered

- What is AI?
- Types of AI
- AI Applications

```

---

### 3. Section

**Definition**: A subdivision within a chapter covering a specific subtopic. May contain subsections.

**File Structure**:
```
docs/chapter-{N}/section-{N}-{M}.md
```

**Frontmatter Schema**:
```yaml
---
title: "Understanding Machine Learning"
sidebar_label: "1.1 Machine Learning"
description: "An introduction to machine learning algorithms and concepts."
slug: /chapter-1/machine-learning
draft: false
---
```

**Attributes**:
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | ✅ Yes | Full section title |
| `sidebar_label` | string | ❌ No | Short label for sidebar |
| `description` | string | ❌ No | Meta description |
| `slug` | string | ❌ No | URL path |
| `draft` | boolean | ❌ No | Exclude from production if true |

**Relationships**:
- **Parent**: Chapter
- **Children**: Subsections (optional, via MDX/Markdown headers)

**Example File** (`docs/chapter-1/section-1-1.md`):
```markdown
---
title: "Understanding Machine Learning"
sidebar_label: "1.1 Machine Learning"
description: "An introduction to machine learning algorithms and concepts."
---

# Understanding Machine Learning

Machine learning is a subset of AI that focuses on...

## Key Concepts

### Supervised Learning
...

### Unsupervised Learning
...

```

---

### 4. Subsection

**Definition**: Nested content within a section (up to 3-4 levels deep).

**Implementation**:
- Subsections are **not separate files** in this model
- They are created using Markdown headers (H3, H4, H5, H6) within section files
- Docusaurus auto-generates anchor links and table of contents

**Example** (within `docs/chapter-1/section-1-1.md`):
```markdown
---
title: "Understanding Machine Learning"
sidebar_label: "1.1 Machine Learning"
---

# Understanding Machine Learning

## Supervised Learning  <!-- H2 = Section-level topic -->

### Classification  <!-- H3 = Subsection -->
Classification algorithms include...

### Regression  <!-- H3 = Subsection -->
Regression models predict...

## Unsupervised Learning  <!-- H2 = Section-level topic -->

### Clustering  <!-- H3 = Subsection -->
Clustering groups similar data...

```

---

### 5. Frontmatter (Introductory Content)

**Definition**: Preliminary content that appears before the main chapters (introduction, preface, about).

**File Structure**:
```
docs/
├── intro.md          # Introduction / overview
├── about.md          # About the author/book
├── toc.md            # Table of contents (auto-generated usually)
└── preface.md        # Preface (optional)
```

**Example** (`docs/intro.md`):
```markdown
---
title: "Introduction"
sidebar_label: "Introduction"
description: "Welcome to AI Native Book - your comprehensive guide to AI."
---

# Welcome to AI Native Book

This book will teach you how to build AI-powered applications...

## How to Read This Book

...

## Prerequisites

...
```

---

### 6. Backmatter (Concluding Content)

**Definition**: Supplementary content at the end of the book (appendix, glossary, references).

**File Structure**:
```
docs/appendix/
├── glossary.md       # Glossary of terms
├── references.md     # Bibliography/references
├── further-reading.md # Additional resources
└── index.md          # Appendix overview
```

**Example** (`docs/appendix/glossary.md`):
```markdown
---
title: "Glossary"
sidebar_label: "Glossary"
description: "Key terms and definitions used throughout this book."
---

# Glossary

## AI Terms

### Artificial Intelligence (AI)
Simulation of human intelligence by machines...

### Machine Learning (ML)
Subset of AI that enables systems to learn...

### Neural Network
Computing systems inspired by biological neural networks...

```

---

## Sidebar Configuration Model

### Sidebar Structure (sidebars.js)

**Purpose**: Defines the hierarchical navigation structure displayed in the sidebar.

**Schema**:
```javascript
module.exports = {
  docs: [
    // Frontmatter
    {
      type: 'category',
      label: 'Frontmatter',
      items: [
        'intro',
        'about',
        'toc',
      ],
    },

    // Chapters
    {
      type: 'category',
      label: 'Chapter 1: Introduction to AI',
      collapsible: true,
      collapsed: false,  // Open by default
      items: [
        'chapter-1/index',
        'chapter-1/section-1-1',
        'chapter-1/section-1-2',
        'chapter-1/section-1-3',
      ],
    },

    {
      type: 'category',
      label: 'Chapter 2: Machine Learning Fundamentals',
      collapsible: true,
      collapsed: true,  // Closed by default
      items: [
        'chapter-2/index',
        'chapter-2/section-2-1',
        'chapter-2/section-2-2',
      ],
    },

    // Backmatter
    {
      type: 'category',
      label: 'Appendix',
      collapsible: true,
      collapsed: true,
      items: [
        'appendix/glossary',
        'appendix/references',
      ],
    },
  ],
};
```

**Sidebar Item Types**:
| Type | Purpose | Example |
|------|---------|---------|
| `doc` | Single document | `'intro'` |
| `category` | Collapsible folder with items | `{ type: 'category', label: 'Chapter 1', items: [...] }` |
| `link` | External link | `{ type: 'link', label: 'GitHub', href: '...' }` |
| `html` | Custom HTML content | `{ type: 'html', value: '<hr />' }` |

**Category Attributes**:
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | - | Must be `'category'` |
| `label` | string | - | Display name in sidebar |
| `collapsible` | boolean | `false` | Can category be collapsed? |
| `collapsed` | boolean | `true` | Is category collapsed by default? |
| `items` | array | - | Child documents or categories |

---

## URL Structure Model

### URL Generation Rules

**Pattern**: `{baseUrl}{doc slug}`

**Examples**:
| File | Slug | URL (if baseUrl=/) |
|------|------|-------------------|
| `docs/intro.md` | `/intro` | `https://mybook.com/intro` |
| `docs/chapter-1/index.md` | `/chapter-1` | `https://mybook.com/chapter-1` |
| `docs/chapter-1/section-1-1.md` | `/chapter-1/machine-learning` | `https://mybook.com/chapter-1/machine-learning` |

**Slug Default**:
- If `slug` is not in frontmatter, Docusaurus derives it from the file path
- Example: `docs/chapter-1/section-1-1.md` → `/chapter-1/section-1-1`

**Custom Slug Override**:
```yaml
---
title: "Understanding Machine Learning"
slug: /chapter-1/ml  # Custom slug
---
```

---

## Content Relationships

### Relationship Diagram

```
Book (docusaurus.config.js)
  │
  ├─→ Frontmatter
  │    ├─→ intro.md
  │    ├─→ about.md
  │    └─→ toc.md
  │
  ├─→ Chapter 1
  │    ├─→ index.md (Chapter intro)
  │    ├─→ section-1-1.md (Contains H3 subsections)
  │    └─→ section-1-2.md
  │
  ├─→ Chapter 2
  │    ├─→ index.md
  │    ├─→ section-2-1.md
  │    └─→ section-2-2.md
  │
  └─→ Backmatter
       ├─→ glossary.md
       └─→ references.md
```

### Navigation Flow

1. **Book Landing** → `docs/intro.md` (or first chapter)
2. **Chapter Navigation** → Sidebar links to `chapter-N/index.md`
3. **Section Navigation** → Sidebar links to `chapter-N/section-N-M.md`
4. **Subsection Navigation** → In-page anchor links (auto-generated by Docusaurus)
5. **Search** → Full-text search index (build-time generated)

---

## Content Validation Rules

### Required Frontmatter

**Minimum Required** (defaults work if omitted):
```yaml
---
title: "Page Title"
---
```

**Recommended** (for SEO and UX):
```yaml
---
title: "Page Title"
description: "Page description for SEO and social sharing"
sidebar_label: "Short Label"
slug: /custom-url-path
---
```

### File Naming Conventions

**Rules**:
- ✅ Use lowercase, hyphen-separated names: `section-1-1.md`
- ✅ Use descriptive names: `machine-learning-basics.md`
- ❌ Avoid spaces: `Section 1.1.md` (breaks URLs)
- ❌ Avoid special characters: `section@1.md` (encoding issues)

**Examples**:
| ✅ Good | ❌ Bad |
|---------|--------|
| `intro.md` | `Introduction.md` |
| `chapter-1/index.md` | `Chapter 1/Index.md` |
| `machine-learning.md` | `Machine Learning.md` |
| `section-1-1.md` | `section_1_1.md` |

### Content Length Guidelines

**Recommendations**:
| Content Type | Target Length | Rationale |
|--------------|---------------|-----------|
| **Chapter Intro** | 500-1000 words | Overview, set context |
| **Section** | 1500-3000 words | Focused topic, readable in one session |
| **Subsection** | 500-1500 words | Specific concept |
| **Code Blocks** | < 100 lines | Scannable, mobile-friendly |
| **Total Page** | < 5000 words | Maintain scrollability, performance |

**Handling Long Content**:
- Split into multiple sections if > 3000 words
- Use "More Information" subsections for advanced topics
- Consider collapsible details for optional content

---

## Asset Management

### Image/File Organization

**Structure**:
```text
static/img/                    # Public images
├── chapter-1/                 # Chapter-specific images
│   ├── ml-diagram.png
│   └── algorithm-flowchart.svg
├── chapter-2/
│   └── neural-network.png
└── cover.jpg                  # Book cover, favicon source
```

**Image Reference in Markdown**:
```markdown
<!-- Relative path (automatically resolved) -->
![Machine Learning Diagram](/img/chapter-1/ml-diagram.png)

<!-- With alt text and sizing -->
![Neural Network](/img/chapter-1/neural-network.png){width=600}
```

**Image Optimization**:
- Use WebP or AVIF format (smaller than PNG/JPEG)
- Lazy loading (automatic in Docusaurus v3.x)
- Responsive images (use `srcset` if needed)

---

## Metadata & SEO

### Page Metadata

**SEO Tags** (auto-generated from frontmatter):
```yaml
---
title: "Chapter 1: Introduction to AI"
description: "Learn the fundamentals of AI, its history, applications, and future directions."
---

<!-- Docusaurus generates: -->
<html>
<head>
  <title>Chapter 1: Introduction to AI | AI Native Book</title>
  <meta name="description" content="Learn the fundamentals of AI..." />
  <meta property="og:title" content="Chapter 1: Introduction to AI" />
  <meta property="og:description" content="Learn the fundamentals of AI..." />
  <!-- Open Graph, Twitter Cards, etc. -->
</head>
</html>
```

### Custom Metadata (Advanced)

**Global Metadata** (`docusaurus.config.js`):
```javascript
themeConfig: {
  metadata: [
    {name: 'keywords', content: 'AI, machine learning, deep learning, book'},
    {name: 'author', content: 'Author Name'},
  ],
}
```

---

## Summary

### Key Entities

| Entity | File Representation | Hierarchy Level |
|--------|-------------------|-----------------|
| **Book** | `docusaurus.config.js` | Root |
| **Chapter** | `docs/chapter-N/index.md` | Level 1 |
| **Section** | `docs/chapter-N/section-N-M.md` | Level 2 |
| **Subsection** | H3/H4/H5/H6 in section files | Level 3+ |
| **Frontmatter** | `docs/intro.md`, `docs/about.md` | Level 1 |
| **Backmatter** | `docs/appendix/*.md` | Level 1 |

### Relationships

- **Book** → 1:N **Chapters**
- **Chapter** → 1:N **Sections**
- **Section** → 0:N **Subsections** (via headers)
- **All Pages** → N:1 **Sidebar** (navigation hierarchy)

### Next Steps

1. ✅ Content structure defined
2. ✅ File organization model established
3. ✅ Frontmatter schema specified
4. ✅ Sidebar configuration template provided
5. ✅ URL structure rules documented

**Ready for Implementation**: ✅ Yes

Use this data model as a reference when organizing book markdown files and configuring the Docusaurus project.

---

**Data Model Status**: ✅ Complete
**Phase 1 Artifact**: ✅ Ready
