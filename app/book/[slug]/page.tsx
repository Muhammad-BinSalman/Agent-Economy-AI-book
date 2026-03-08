import { notFound } from "next/navigation";
import { Metadata } from "next";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import "highlight.js/styles/github-dark.css";
import fs from "fs";
import path from "path";
import { ChapterNavigation } from "@/components/chapter-navigation";
import { DocSearch } from "@/components/doc-search";
import { DocBreadcrumbs } from "@/components/doc-breadcrumbs";
import { ProgressBar } from "@/components/progress-bar";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// All chapters configuration
const CHAPTERS = [
  { id: "preface", title: "Preface", order: 0 },
  { id: "chapter-1", title: "Chapter 1: Introduction to AI-Native Development", order: 1 },
  { id: "chapter-2", title: "Chapter 2: Core Concepts", order: 2 },
  { id: "chapter-3", title: "Chapter 3: Implementation Strategies", order: 3 },
  { id: "chapter-4", title: "Chapter 4: Advanced Patterns", order: 4 },
  { id: "chapter-5", title: "Chapter 5: Future Directions", order: 5 },
  { id: "chapter-6", title: "Chapter 6: The Agentic Control Loop", order: 6 },
  { id: "chapter-7", title: "Chapter 7: Tool Contract Design and Verification", order: 7 },
  { id: "chapter-8", title: "Chapter 8: Multi-Agent Systems and Orchestration", order: 8 },
  { id: "chapter-9", title: "Chapter 9: Digital FTEs - Operating Model and Governance", order: 9 },
  { id: "chapter-10", title: "Chapter 10: Evaluation, Reliability, and Safety", order: 10 },
  { id: "chapter-11", title: "Chapter 11: Spec-Driven Development Methodology", order: 11 },
  { id: "chapter-12", title: "Chapter 12: Full-Stack AI Application Blueprint", order: 12 },
  { id: "chapter-13", title: "Chapter 13: Claude Code and CLI Agents", order: 13 },
  { id: "chapter-14", title: "Chapter 14: Production Readiness and Go/No-Go Criteria", order: 14 },
];

export async function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({
    slug: chapter.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = CHAPTERS.find((c) => c.id === slug);

  if (!chapter) {
    return {
      title: "Chapter Not Found",
    };
  }

  return {
    title: `${chapter.title} | AI-Native Development`,
    description: `Read ${chapter.title} from the AI-Native Development book.`,
  };
}

async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(result);
}

function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const frontmatterText = match[1];
  // Remove the frontmatter block including the closing --- and following newlines
  const contentWithoutFrontmatter = content.replace(frontmatterRegex, "");

  const frontmatter: Record<string, string | number> = {};
  const lines = frontmatterText.split(/\r?\n/);

  lines.forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: string | number = line.slice(colonIndex + 1).trim();

      if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (typeof value === 'string' && !isNaN(Number(value))) {
        value = Number(value);
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: contentWithoutFrontmatter };
}

async function getChapterContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content", "chapters", `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, content } = parseFrontmatter(source);
    const processedContent = await processMarkdown(content);

    return {
      id: slug,
      content: processedContent,
      title: String(frontmatter.title || ""),
      readTime: typeof frontmatter.readTime === 'number' ? frontmatter.readTime : null,
      order: typeof frontmatter.order === 'number' ? frontmatter.order : 0,
    };
  } catch (error) {
    console.error(`Error loading chapter ${slug}:`, error);
    return null;
  }
}

function getCurrentChapterIndex(slug: string) {
  return CHAPTERS.findIndex((c) => c.id === slug);
}

function getNavigationChapters(currentSlug: string) {
  const currentIndex = getCurrentChapterIndex(currentSlug);
  return {
    prev: currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null,
    next: currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = await getChapterContent(slug);

  if (!chapter) {
    notFound();
  }

  const { prev, next } = getNavigationChapters(slug);

  return (
    <>
      <ProgressBar />
      <ChapterNavigation
        chapters={CHAPTERS}
        activeChapter={slug}
        variant="mobile"
      />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-24">
        <div className="flex gap-4 md:gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <DocSearch
                chapters={CHAPTERS.map((c) => ({ ...c, title: c.title, content: "" }))}
              />
              <ChapterNavigation
                chapters={CHAPTERS}
                activeChapter={slug}
                variant="sidebar"
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl mx-auto">
              {/* Mobile Search */}
              <div className="lg:hidden mb-6">
                <DocSearch
                  chapters={CHAPTERS.map((c) => ({ ...c, title: c.title, content: "" }))}
                />
              </div>

              {/* Breadcrumbs */}
              <DocBreadcrumbs />

              {/* Chapter Navigation (Top) */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>Chapter {chapter.order} of {CHAPTERS.length - 1}</span>
                </div>
              </div>

              {/* Chapter Content */}
              <article className="mb-16">
                {/* Chapter Header */}
                <div className="mb-8 pb-6 border-b">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-tight">
                    {chapter.title}
                  </h1>
                  {chapter.readTime && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{chapter.readTime} min read</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className="prose prose-slate dark:prose-invert max-w-none
                    prose-base
                    md:prose-lg
                    prose-headings:font-black
                    prose-headings:scroll-mt-24
                    prose-headings:text-foreground
                    prose-headings:tracking-tight
                    prose-h1:text-3xl
                    sm:prose-h1:text-4xl
                    md:prose-h1:text-5xl
                    lg:prose-h1:text-6xl
                    prose-h1:mb-8
                    prose-h1:mt-12
                    prose-h1:pb-6
                    prose-h1:border-b-2
                    prose-h1:border-primary/20
                    prose-h2:text-2xl
                    sm:prose-h2:text-3xl
                    prose-h2:mt-16
                    prose-h2:mb-8
                    prose-h2:font-black
                    prose-h2:text-primary
                    prose-h2:tracking-tight
                    prose-h3:text-xl
                    sm:prose-h3:text-2xl
                    prose-h3:mt-12
                    prose-h3:mb-6
                    prose-h3:font-bold
                    prose-h3:text-foreground
                    prose-h4:text-xl
                    md:prose-h4:text-2xl
                    prose-h4:mt-8
                    prose-h4:mb-4
                    prose-h4:font-bold
                    prose-h4:text-muted-foreground
                    prose-p:leading-loose
                    prose-p:mb-6
                    prose-p:text-base
                    md:prose-p:text-lg
                    prose-p:text-muted-foreground
                    prose-a:text-primary
                    prose-a:no-underline
                    prose-a:font-bold
                    prose-a:hover:underline
                    prose-a:hover:text-primary/80
                    prose-a:transition-colors
                    prose-a:underline-offset-4
                    prose-strong:text-foreground
                    prose-strong:font-black
                    prose-strong:text-lg
                    prose-em:italic
                    prose-em:font-semibold
                    prose-em:text-foreground
                    prose-code:text-primary
                    prose-code:bg-primary/10
                    prose-code:px-2
                    prose-code:py-1
                    prose-code:rounded-md
                    prose-code:text-sm
                    prose-code:font-mono
                    prose-code:font-bold
                    prose-code:before:content-['']
                    prose-code:after:content-['']
                    prose-pre:bg-muted/80
                    prose-pre:border-2
                    prose-pre:border-primary/20
                    prose-pre:rounded-xl
                    prose-pre:p-6
                    prose-pre:my-8
                    prose-pre:overflow-x-auto
                    prose-pre:shadow-lg
                    prose-blockquote:border-l-4
                    prose-blockquote:border-primary
                    prose-blockquote:bg-gradient-to-r
                    prose-blockquote:from-primary/5
                    prose-blockquote:to-transparent
                    prose-blockquote:py-6
                    prose-blockquote:px-6
                    prose-blockquote:my-8
                    prose-blockquote:italic
                    prose-blockquote:font-semibold
                    prose-blockquote:text-lg
                    prose-blockquote:text-foreground
                    prose-blockquote:rounded-r-lg
                    prose-ul:my-8
                    prose-ul:ml-8
                    prose-ul:list-disc
                    prose-ul:space-y-4
                    prose-ul:text-lg
                    prose-ol:my-8
                    prose-ol:ml-8
                    prose-ol:list-decimal
                    prose-ol:space-y-4
                    prose-ol:text-lg
                    prose-li:text-foreground
                    prose-li:leading-loose
                    prose-li:marker:text-primary
                    prose-li:marker:font-black
                    prose-li:marker:text-xl
                    prose-hr:border-border
                    prose-hr:my-12
                    prose-hr:border-t-2
                  "
                >
                  <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
                </div>
              </article>

              {/* Chapter Navigation (Bottom) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 border-t">
                {prev ? (
                  <Link
                    href={`/book/${prev.id}`}
                    className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2 rounded-lg hover:bg-accent transition-colors group border sm:border-transparent flex-1"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="font-medium line-clamp-2">{prev.title.replace(/^Chapter \d+: /, "")}</div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {next ? (
                  <Link
                    href={`/book/${next.id}`}
                    className="flex items-center justify-center sm:justify-end gap-2 px-4 py-3 sm:py-2 rounded-lg hover:bg-accent transition-colors group text-right border sm:border-transparent flex-1"
                  >
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="font-medium line-clamp-2">{next.title.replace(/^Chapter \d+: /, "")}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            </div>
          </main>

          {/* Table of Contents (Right side) - visible on xl screens */}
          <aside className="hidden 2xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="border rounded-xl bg-card/50 backdrop-blur-sm p-4">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                  On this page
                </h4>
                <nav className="space-y-2 text-sm">
                  {CHAPTERS.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/book/${chapter.id}`}
                      className={`block py-1 rounded transition-colors ${chapter.id === slug
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {chapter.order > 0 && `${chapter.order}. `}{chapter.title.replace(/^Chapter \d+: /, "")}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
