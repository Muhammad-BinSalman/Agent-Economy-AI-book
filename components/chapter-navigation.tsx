"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Chapter {
  id: string;
  title: string;
  order: number;
}

interface ChapterNavigationProps {
  chapters: Chapter[];
  activeChapter: string | null;
  onChapterClick: (chapterId: string) => void;
  className?: string;
  variant?: "sidebar" | "dropdown";
}

export function ChapterNavigation({
  chapters,
  activeChapter,
  onChapterClick,
  className,
  variant = "sidebar",
}: ChapterNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  // Toggle chapter expansion
  const toggleChapter = (chapterId: string) => () => {
    if (expandedChapter === chapterId) {
      // If clicking the same chapter, collapse it
      setExpandedChapter(null);
      setIsCollapsed(false);
    } else {
      // Expand the clicked chapter
      setExpandedChapter(chapterId);
      setIsCollapsed(true);
      // Also navigate to the chapter
      onChapterClick(chapterId);
    }
  };

  const toggleAll = () => {
    if (isCollapsed) {
      setExpandedChapter(null);
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
      // Show only active chapter if there is one, otherwise show first
      setExpandedChapter(activeChapter || chapters[0].id);
    }
  };

  // Display mode: collapsed (only selected) or expanded (all chapters)
  const chaptersToShow = isCollapsed && expandedChapter
    ? chapters.filter((ch) => ch.id === expandedChapter)
    : chapters;

  return (
    <nav
      className={cn(
        "sticky top-20",
        "glass",
        "glass-dark",
        "rounded-lg p-4",
        variant === "sidebar" && "w-64",
        className
      )}
      aria-label="Chapter navigation"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {isCollapsed && expandedChapter
            ? `Chapter ${chapters.find((c) => c.id === expandedChapter)?.order}`
            : "Chapters"}
        </h3>
        <button
          onClick={toggleAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label={isCollapsed ? "Show all chapters" : "Show selected chapter only"}
        >
          {isCollapsed ? "▸" : "▴"}
        </button>
      </div>
      <ul className="space-y-2">
        {chaptersToShow.map((chapter) => (
          <li key={chapter.id}>
            <button
              onClick={toggleChapter(chapter.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded",
                "hover:bg-accent hover:text-accent-foreground",
                "transition-all",
                "text-sm",
                "transition-all",
                activeChapter === chapter.id && "bg-accent font-semibold"
              )}
              aria-current={activeChapter === chapter.id ? "true" : undefined}
            >
              {chapter.order}.{" "}
              {chapter.title.replace(/^Chapter \d+: /, "")}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
