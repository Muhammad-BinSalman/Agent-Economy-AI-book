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
  return (
    <ChapterNavigation
      chapters={chapters}
      activeChapter={null}
    />
  );
}
