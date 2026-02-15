"use client";

import { useEffect, useState } from "react";

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrolled = scrollTop / (documentHeight - windowHeight);
      setProgress(Math.min(scrolled * 100, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

export function useActiveChapter() {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id.startsWith("chapter-")) {
              setActiveChapter(id);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all chapter sections
    document.querySelectorAll('article[id^="chapter-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return activeChapter;
}
