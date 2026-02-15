export interface ChapterMetadata {
  /** Chapter title displayed in heading and navigation */
  title: string;

  /** Short description for chapter cards and SEO meta tags */
  description: string;

  /** Chapter order for sorting (1-5) */
  order: number;

  /** Optional: Estimated reading time in minutes */
  readTime?: number;

  /** Optional: Chapter tags for filtering (future feature) */
  tags?: string[];
}

export interface Chapter {
  /** Unique identifier derived from filename (e.g., "chapter-1") */
  id: string;

  /** Metadata from frontmatter */
  meta: ChapterMetadata;

  /** MDX content (not included in type, handled by MDX processor) */
  content: unknown;
}

export interface Topic {
  /** Topic heading text (extracted from H2) */
  title: string;

  /** Topic identifier for anchor links (slugified title) */
  id: string;

  /** Parent chapter identifier */
  chapterId: string;

  /** Order within chapter (1 or 2) */
  order: number;
}
