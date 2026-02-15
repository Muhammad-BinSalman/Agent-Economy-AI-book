interface BookChaptersProps {
  chapters: {
    id: string;
    content: string;
  }[];
}

export function BookChapters({ chapters }: BookChaptersProps) {
  return (
    <>
      {chapters.map((chapter) => (
        <article
          key={chapter.id}
          id={chapter.id}
          className="prose dark:prose-invert max-w-none mb-20"
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />
      ))}
    </>
  );
}

