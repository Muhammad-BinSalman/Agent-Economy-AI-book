import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  className?: string;
}

export function HeroSection({
  title,
  description,
  ctaText = "Start Reading",
  ctaHref = "/book",
  backgroundImage,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center",
        "px-4 py-20",
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          {description}
        </p>
        <a
          href={ctaHref}
          className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
