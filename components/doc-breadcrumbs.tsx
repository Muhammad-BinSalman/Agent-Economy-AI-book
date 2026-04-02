"use client";

import { ChevronRight, Home, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface DocBreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function DocBreadcrumbs({
  items = [
    { label: "Home", href: "/", icon: <Home size={14} /> },
    { label: "Book", href: "/book", icon: <BookOpen size={14} /> },
  ],
  className,
}: DocBreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-1 text-sm text-muted-foreground mb-8",
        className
      )}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight size={14} className="mx-2 text-muted-foreground/50" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-foreground font-medium">
              {item.icon}
              <span>{item.label}</span>
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
