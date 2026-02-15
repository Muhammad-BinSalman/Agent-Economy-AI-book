import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GradientBgProps {
  children?: ReactNode;
  className?: string;
  colors?: string;
  duration?: number;
  fixed?: boolean;
}

export function GradientBg({
  children,
  className,
  colors = "from-purple-500 via-pink-500 to-orange-500",
  duration = 15,
  fixed = true,
}: GradientBgProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-to-br",
        colors,
        "animate-gradient",
        fixed ? "fixed" : "absolute",
        className
      )}
      style={{
        animationDuration: `${duration}s`,
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
