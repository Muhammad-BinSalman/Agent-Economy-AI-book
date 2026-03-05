"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Chapter {
  id: string;
  title: string;
  order: number;
}

interface ChapterNavigationProps {
  chapters: Chapter[];
  activeChapter: string | null;
  className?: string;
  variant?: "sidebar" | "dropdown" | "mobile";
}

export function ChapterNavigation({
  chapters,
  activeChapter,
  className,
  variant = "sidebar",
}: ChapterNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(activeChapter);

  useEffect(() => {
    setActiveSection(activeChapter);
  }, [activeChapter]);

  // Mobile menu
  if (variant === "mobile") {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Toggle chapter menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="absolute right-0 top-0 bottom-0 w-80 bg-background border-l shadow-xl overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">Chapters</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <ul className="space-y-1">
                  {chapters.map((chapter) => (
                    <li key={chapter.id}>
                      <Link
                        href={`/book/${chapter.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg block",
                          "hover:bg-accent hover:text-accent-foreground",
                          "transition-all duration-200",
                          "flex items-center gap-3",
                          "text-sm",
                          activeSection === chapter.id
                            ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {chapter.id !== "preface" && (
                          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-muted text-xs font-medium">
                            {chapter.order}
                          </span>
                        )}
                        {chapter.id === "preface" && (
                          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                          </span>
                        )}
                        <span className="flex-1">
                          {chapter.title.replace(/^Chapter \d+: /, "")}
                        </span>
                        {activeSection === chapter.id && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <nav
      className={cn(
        "sticky top-24",
        "border rounded-xl bg-card/50 backdrop-blur-sm",
        "overflow-hidden",
        "max-h-[calc(100vh-8rem)]", // Max height with viewport consideration
        variant === "sidebar" && "w-72",
        className
      )}
      aria-label="Chapter navigation"
    >
      <div className="border-b bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Table of Contents</h3>
        </div>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
        <ul className="space-y-1">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link
                href={`/book/${chapter.id}`}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg block",
                  "hover:bg-accent hover:text-accent-foreground",
                  "transition-all duration-200",
                  "flex items-center gap-3",
                  "text-sm group",
                  activeSection === chapter.id
                    ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                    : "text-muted-foreground"
                )}
              >
                {chapter.id !== "preface" && (
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-muted text-xs font-medium group-hover:bg-primary/20 transition-colors">
                    {chapter.order}
                  </span>
                )}
                {chapter.id === "preface" && (
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </span>
                )}
                <span className="flex-1">
                  {chapter.title.replace(/^Chapter \d+: /, "")}
                </span>
                {activeSection === chapter.id && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
