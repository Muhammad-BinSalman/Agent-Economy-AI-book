# Frontmatter Guide for Book Chapters

## Required Frontmatter

Every chapter file should have frontmatter at the top in YAML format:

```yaml
---
title: "Chapter 1: Your Title Here"
description: "Brief description of the chapter"
order: 1
readTime: 8
---
```

## Frontmatter Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `title` | String | ✅ Yes | Chapter title (displayed above content) | `"Chapter 1: Introduction"` |
| `description` | String | No | Chapter description for metadata | `"Learn the basics"` |
| `order` | Number | ✅ Yes | Chapter order (1, 2, 3...) | `1` |
| `readTime` | Number | ✅ Yes | Reading time in minutes | `8` |

## How Read Time is Calculated

Standard reading time: **200 words per minute**

```javascript
readTime = Math.ceil(wordCount / 200);
```

**Example:**
- 1600 words → 8 min read
- 2000 words → 10 min read
- 500 words → 3 min read

## Complete Example

```markdown
---
title: "Chapter 1: Introduction to AI-Native Development"
description: "Learn the fundamentals of building AI-native applications"
order: 1
readTime: 8
---

# Chapter 1: Introduction to AI-Native Development

Welcome to the world of AI-native development...

## Topic 1.1: What is AI-Native?

AI-native represents a paradigm shift...

### Key Concepts

- Probabilistic outputs
- Continuous learning
- Natural language interface
```

## Display

The frontmatter will be displayed as:

```
Chapter 1: Introduction to AI-Native Development
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 8 min read

[Content starts here...]
```

## Chapter Files Checklist

For each chapter file, ensure:

- ✅ Frontmatter at the top (between `---`)
- ✅ `title` field (for chapter header)
- ✅ `readTime` field (for "X min read")
- ✅ `order` field (for sorting)
- ✅ Content starts after frontmatter

## Multiple Chapters Example

**Chapter 1:**
```yaml
---
title: "Chapter 1: Introduction to AI-Native Development"
order: 1
readTime: 8
---
```

**Chapter 2:**
```yaml
---
title: "Chapter 2: Core Concepts"
order: 2
readTime: 12
---
```

**Chapter 3:**
```yaml
---
title: "Chapter 3: Implementation Strategies"
order: 3
readTime: 15
---
```

## Updating Existing Chapters

To add frontmatter to existing chapters:

1. Open the chapter file
2. Add frontmatter at the very top
3. Include at minimum:
   ```yaml
   ---
   title: "Chapter X: Title"
   order: X
   readTime: X
   ---
   ```

## Testing

1. Start dev server: `npm run dev`
2. Navigate to `/book`
3. Check that:
   - Chapter title appears above content
   - Read time shows "X min read" with clock icon
   - Title is large and bold
   - Read time is muted color

## Notes

- **Title** will be displayed in a large, bold font (48-60px)
- **Read time** appears below the title with a clock icon
- Both are positioned at the top left of each chapter
- If `readTime` is missing, the indicator won't display
- If `title` is missing, the header section won't display
