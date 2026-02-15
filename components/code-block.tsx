"use client";

import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  children,
  language,
  filename,
  className,
}: CodeBlockProps) {
  return (
    <div className={cn("relative group", className)}>
      {filename && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-muted text-xs rounded-br">
          {filename}
        </div>
      )}
      <pre className={cn("overflow-x-auto", language && `language-${language}`)}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
