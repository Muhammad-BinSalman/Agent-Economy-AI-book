import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChapterCardProps {
  chapter: {
    title: string;
    description: string;
    order: number;
  };
  href?: string;
  className?: string;
}

export function ChapterCard({ chapter, href, className }: ChapterCardProps) {
  const content = (
    <>
      <div className="text-sm text-muted-foreground mb-2">
        Chapter {chapter.order}
      </div>
      <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
      <p className="text-muted-foreground">{chapter.description}</p>
    </>
  );

  const cardClassName = cn(
    "block p-6 border border-border rounded-lg",
    "hover:border-primary transition-all",
    "hover:shadow-lg hover:-translate-y-1",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}
