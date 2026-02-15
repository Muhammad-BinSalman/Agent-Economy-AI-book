"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPath?: string;
  className?: string;
  variant?: "sticky" | "fixed";
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation({
  currentPath,
  className,
  variant = "sticky",
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        variant,
        "top-0 w-full z-50",
        "glass",
        "glass-dark",
        "border-b border-border",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            AI-Native Book
          </Link>
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-primary transition-colors",
                    (currentPath || pathname) === item.href &&
                      "text-primary font-semibold"
                  )}
                  aria-current={(currentPath || pathname) === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
