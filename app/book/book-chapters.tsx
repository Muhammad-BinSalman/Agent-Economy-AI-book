interface BookChaptersProps {
  chapters: {
    id: string;
    content: string;
    title?: string;
    readTime?: number | null;
  }[];
}

export function BookChapters({ chapters }: BookChaptersProps) {
  return (
    <div className="space-y-24">
      {chapters.map((chapter) => (
        <article
          key={chapter.id}
          id={chapter.id}
          className="scroll-mt-32"
        >
          {/* Chapter Header with Read Time */}
          {chapter.title && (
            <div className="mb-8 pb-6 border-b">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                  {chapter.title}
                </h2>
              </div>
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
          )}

          <div
            className="prose prose-slate dark:prose-invert max-w-none
              /* Base prose settings */
              prose-base
              md:prose-lg

              /* Headings - EXTRA LARGE & BOLD */
              prose-headings:font-black
              prose-headings:scroll-mt-24
              prose-headings:text-foreground
              prose-headings:tracking-tight

              /* H1 - Main Chapter Title */
              prose-h1:text-4xl
              md:prose-h1:text-5xl
              lg:prose-h1:text-6xl
              prose-h1:mb-8
              prose-h1:mt-12
              prose-h1:pb-6
              prose-h1:border-b-2
              prose-h1:border-primary/20

              /* H2 - Section Headings - LARGE & BOLD */
              prose-h2:text-3xl
              md:prose-h2:text-4xl
              prose-h2:mt-16
              prose-h2:mb-8
              prose-h2:font-black
              prose-h2:text-primary
              prose-h2:tracking-tight

              /* H3 - Subsection Headings - ITALIC */
              prose-h3:text-2xl
              md:prose-h3:text-3xl
              prose-h3:mt-12
              prose-h3:mb-6
              prose-h3:font-bold
              prose-h3:italic
              prose-h3:text-foreground
              prose-h3:not-italic

              /* H4 - Sub-subsection Headings - BOLD ITALIC */
              prose-h4:text-xl
              md:prose-h4:text-2xl
              prose-h4:mt-8
              prose-h4:mb-4
              prose-h4:font-bold
              prose-h4:italic
              prose-h4:text-muted-foreground

              /* H5 - Even smaller headings */
              prose-h5:text-lg
              md:prose-h5:text-xl
              prose-h5:mt-6
              prose-h5:mb-3
              prose-h5:font-semibold
              prose-h5:italic
              prose-h5:text-muted-foreground

              /* H6 - Smallest headings */
              prose-h6:text-base
              md:prose-h6:text-lg
              prose-h6:mt-4
              prose-h6:mb-2
              prose-h6:font-semibold
              prose-h6:italic
              prose-h6:text-muted-foreground

              /* Paragraphs */
              prose-p:leading-loose
              prose-p:mb-6
              prose-p:text-base
              md:prose-p:text-lg
              prose-p:text-muted-foreground

              /* Links */
              prose-a:text-primary
              prose-a:no-underline
              prose-a:font-bold
              prose-a:hover:underline
              prose-a:hover:text-primary/80
              prose-a:transition-colors
              prose-a:underline-offset-4

              /* Strong/Bold - EXTRA BOLD */
              prose-strong:text-foreground
              prose-strong:font-black
              prose-strong:text-lg

              /* Emphasis/Italic - ITALIC TEXT */
              prose-em:italic
              prose-em:font-semibold
              prose-em:text-foreground

              /* Inline Code */
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

              /* Code Blocks */
              prose-pre:bg-muted/80
              prose-pre:border-2
              prose-pre:border-primary/20
              prose-pre:rounded-xl
              prose-pre:p-6
              prose-pre:my-8
              prose-pre:overflow-x-auto
              prose-pre:shadow-lg

              /* Blockquotes */
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

              /* Lists - PROPER BULLETS */
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

              /* Nested Lists */
              prose-ul-ul:marker:text-primary/70
              prose-ul-ul:ml-6
              prose-ul-ol:marker:text-primary/70
              prose-ul-ol:ml-6

              /* Horizontal Rules */
              prose-hr:border-border
              prose-hr:my-12
              prose-hr:border-t-2

              /* Tables */
              prose-th:border
              prose-th:border-border
              prose-th:bg-primary/10
              prose-th:px-6
              prose-th:py-4
              prose-th:font-black
              prose-th:text-foreground
              prose-th:text-lg

              prose-td:border
              prose-td:border-border
              prose-td:px-6
              prose-td:py-3
              prose-td:text-muted-foreground
              prose-td:text-lg

              prose-tr:border-b-2
              prose-tr:border-border

              prose-table:my-8
              prose-table:border-collapse
              prose-table:w-full
              prose-table:overflow-hidden
              prose-table:rounded-xl
              prose-table:border-2
              prose-table:border-border
              prose-table:shadow-lg

              /* Images */
              prose-img:rounded-xl
              prose-img:shadow-2xl
              prose-img:my-8
              prose-img:border-2
              prose-img:border-border

              /* Headings within prose */
              prose-h2:first-child:mt-0
              prose-h3:first-child:mt-0
              prose-h4:first-child:mt-0
            "
          >
            <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
          </div>
        </article>
      ))}
    </div>
  );
}

