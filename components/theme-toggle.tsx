"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: number;
  iconOnly?: boolean;
}

export function ThemeToggle({
  className,
  size = 24,
  iconOnly = false,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn("w-6 h-6", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "rounded-md p-2",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-all",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
      aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun size={size} aria-hidden="true" />
      ) : (
        <Moon size={size} aria-hidden="true" />
      )}
      {!iconOnly && (
        <span className="sr-only">
          {isDark ? "Switch to light mode" : "Switch to dark mode"}
        </span>
      )}
    </button>
  );
}
