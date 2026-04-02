"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  tomorrow,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface EnhancedCodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export function EnhancedCodeBlock({
  children,
  language = "typescript",
  filename,
  className,
  showLineNumbers = true,
  highlightLines = [],
}: EnhancedCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLineProps = (lineNumber: number) => {
    if (highlightLines.includes(lineNumber)) {
      return {
        style: {
          display: "block",
          background: theme === "dark" ? "rgba(255, 255, 0, 0.1)" : "rgba(255, 200, 0, 0.15)",
          width: "100%",
        },
      };
    }
    return {};
  };

  return (
    <div
      className={cn(
        "group relative my-6 rounded-lg overflow-hidden border",
        "bg-muted/30 backdrop-blur-sm",
        className
      )}
    >
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b text-xs">
        <div className="flex items-center gap-2">
          {filename && (
            <>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-muted-foreground font-mono">{filename}</span>
            </>
          )}
          {!filename && (
            <span className="text-muted-foreground font-mono uppercase">
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? vscDarkPlus : tomorrow}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.7",
          }}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            color: theme === "dark" ? "#6b7280" : "#9ca3af",
            fontSize: "0.75rem",
            paddingRight: "1.5rem",
            minWidth: "2.5rem",
            textAlign: "right",
            userSelect: "none",
          }}
          wrapLines={true}
          lineProps={(lineNumber) => getLineProps(lineNumber)}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
