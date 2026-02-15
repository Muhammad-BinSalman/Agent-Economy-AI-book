"use client";

import { cn } from "@/lib/utils";
import { useReadingProgress } from "@/lib/scroll";

interface ProgressBarProps {
  progress?: number;
  variant?: "top" | "inline";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  progress: externalProgress,
  variant = "top",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const internalProgress = useReadingProgress();
  const progress = externalProgress ?? internalProgress;

  return (
    <div
      className={cn(
        variant === "top" ? "fixed top-0 left-0 right-0 z-50" : "relative",
        "h-1 bg-secondary",
        className
      )}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={showLabel ? `Reading progress: ${progress.toFixed(0)}%` : undefined}
    >
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {showLabel && (
        <span className="sr-only">{progress.toFixed(0)}% complete</span>
      )}
    </div>
  );
}
