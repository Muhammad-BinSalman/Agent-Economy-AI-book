import { BookContent } from "./book-content";
import { BookChapters } from "./book-chapters";
import { ProgressBar } from "@/components/progress-bar";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";

const chapters = [
  {
    id: "chapter-1",
    title: "Chapter 1: Introduction to AI-Native Development",
    order: 1,
  },
  {
    id: "chapter-2",
    title: "Chapter 2: Core Concepts",
    order: 2,
  },
  {
    id: "chapter-3",
    title: "Chapter 3: Implementation Strategies",
    order: 3,
  },
  {
    id: "chapter-4",
    title: "Chapter 4: Advanced Patterns",
    order: 4,
  },
  {
    id: "chapter-5",
    title: "Chapter 5: Future Directions",
    order: 5,
  },
];

async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(result);
}

async function getChapterContent(filename: string) {
  const filePath = path.join(process.cwd(), "content", "chapters", filename);
  const source = fs.readFileSync(filePath, "utf-8");
  // Remove frontmatter
  const content = source.replace(/^---[\s\S]*?---/, "");
  return await processMarkdown(content);
}

export default async function BookPage() {
  const chapterContents = await Promise.all([
    getChapterContent("chapter-1.mdx"),
    getChapterContent("chapter-2.mdx"),
    getChapterContent("chapter-3.mdx"),
    getChapterContent("chapter-4.mdx"),
    getChapterContent("chapter-5.mdx"),
  ]);

  const chaptersWithContent = chapters.map((chapter, index) => ({
    ...chapter,
    content: chapterContents[index],
  }));

  return (
    <>
      <ProgressBar />
      <div className="container mx-auto px-4 py-20">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <BookContent chapters={chapters} />
          </aside>
          <main className="flex-1 max-w-4xl">
            <BookChapters chapters={chaptersWithContent} />
          </main>
        </div>
      </div>
    </>
  );
}
