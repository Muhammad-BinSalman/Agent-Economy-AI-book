"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}

interface NavigationProps {
  logoText?: string;
  navItems?: NavItem[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { id: 'book', label: 'Book', href: '/book' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'agents', label: 'Agents', href: '/agents' },
  { id: 'contact', label: 'Contact', href: '/contact' },
  { id: 'authors', label: 'Author', href: '/author' },
  { id: 'repo', label: 'Repository', href: 'https://github.com/Muhammad-BinSalman/Agent-Economy-AI-book' },
];

export function Navigation({
  logoText = "AI Agent Economy",
  navItems = defaultNavItems,
  className,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 9);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Outer wrapper: NEVER changes position — always fixed, full-width, top-0
    // We only change padding/alignment so the pill centres via flexbox, not by moving `left`
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled ? "flex justify-center items-start pt-4 pointer-events-none" : "",
        className
      )}
    >
      <header
        className={cn(
          "transition-all duration-500 rounded-full ease-in-out pointer-events-auto max-w-[1600px] mx-auto",
          scrolled
            ? // ── Pill state ──────────────────────────────────────────────
            "flex items-center gap-3  py-2  bg-white/80 backdrop-blur-xl border border-zinc-200/80 shadow-lg shadow-black/10 px-3"
            : // ── Full-width state ────────────────────────────────────────
            " bg-white py-2"
        )}
      >
        {scrolled ? (
          /* ── Compact pill layout ── */
          <>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 group shrink-0">
              <Image src={scrolled ? "/del.png" : "/logo.png"} alt="Logo" className="h-7 w-auto" width={100} height={100}/>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-zinc-200 shrink-0" />

            {/* Nav links condensed */}
            <nav className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href || "#"}
                  className="py-1 px-2.5 rounded-full text-xs font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-all whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA button */}
            <div className="w-px h-5 bg-zinc-200 shrink-0" />
            <Link
              href="/book"
              className="shrink-0 py-1.5 px-3.5 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all shadow shadow-red-600/20"
            >
              Read Now
            </Link>
          </>
        ) : (
          /* ── Full-width layout ── */
          <div className="w-full mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <Image src="/logo.png" alt="Logo" className="h-8 w-auto" width={100} height={100} />
              <span className="text-xl font-bold tracking-tighter font-outfit uppercase bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-zinc-900">
                {logoText}
              </span>
              <span className="rounded-full border border-zinc-300/80 bg-white/70 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-zinc-700">
                BETA
              </span>
            </Link>
            <nav className="flex flex-wrap justify-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href || "#"}
                  onClick={item.onClick}
                  className="py-1.5 px-3 rounded-full text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
