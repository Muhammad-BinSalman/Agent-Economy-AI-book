"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DocSearchProps {
  chapters: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  className?: string;
}

interface SearchResult {
  chapterId: string;
  title: string;
  snippet: string;
  highlights: number[];
}

export function DocSearch({
  chapters,
  className,
}: DocSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];

    chapters.forEach((chapter) => {
      const titleMatch = chapter.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const contentLower = chapter.content.toLowerCase();
      const queryLower = query.toLowerCase();

      // Find all occurrences in content
      const matches: Array<{ index: number; length: number }> = [];
      let index = contentLower.indexOf(queryLower);
      while (index !== -1) {
        matches.push({ index, length: query.length });
        index = contentLower.indexOf(queryLower, index + 1);
      }

      if (titleMatch || matches.length > 0) {
        // Get a snippet around the first match
        let snippet = "";
        if (matches.length > 0) {
          const firstMatch = matches[0].index;
          const start = Math.max(0, firstMatch - 100);
          const end = Math.min(
            chapter.content.length,
            firstMatch + query.length + 100
          );
          snippet =
            (start > 0 ? "..." : "") +
            chapter.content.slice(start, end) +
            (end < chapter.content.length ? "..." : "");
        }

        searchResults.push({
          chapterId: chapter.id,
          title: chapter.title,
          snippet,
          highlights: matches.map((m) => m.index),
        });
      }
    });

    setResults(searchResults.slice(0, 5)); // Limit to 5 results
  }, [query, chapters]);

  const handleResultClick = (chapterId: string) => {
    setQuery("");
    setIsOpen(false);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 dark:bg-yellow-600 text-inherit rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search in book..."
          className={cn(
            "w-full pl-10 pr-10 py-2.5",
            "border rounded-lg",
            "bg-background",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-all",
            "placeholder:text-muted-foreground"
          )}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && results.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-2 bg-background border rounded-lg shadow-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link
                  key={result.chapterId}
                  href={`/book/${result.chapterId}`}
                  onClick={() => handleResultClick(result.chapterId)}
                  className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b last:border-b-0 block"
                >
                  <div className="font-medium text-sm mb-1">
                    {highlightText(result.title, query)}
                  </div>
                  {result.snippet && (
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {highlightText(result.snippet, query)}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <div className="px-4 py-2 bg-muted/50 text-xs text-muted-foreground border-t">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </>
      )}

      {/* No results */}
      {isOpen && query && results.length === 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-2 bg-background border rounded-lg shadow-lg p-4 text-center text-muted-foreground">
            No results found for "{query}"
          </div>
        </>
      )}
    </div>
  );
}
