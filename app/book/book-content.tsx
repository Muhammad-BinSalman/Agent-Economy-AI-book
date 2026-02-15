"use client";

import { ChapterNavigation } from "@/components/chapter-navigation";

interface Chapter {
  id: string;
  title: string;
  order: number;
}

interface BookContentProps {
  chapters: Chapter[];
}

export function BookContent({ chapters }: BookContentProps) {
  const handleChapterClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ChapterNavigation
      chapters={chapters}
      activeChapter={null}
      onChapterClick={handleChapterClick}
    />
  );
}
