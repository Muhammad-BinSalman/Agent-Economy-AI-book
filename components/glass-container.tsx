import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl" | "2xl";
  opacity?: number;
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  as?: "div" | "section" | "article" | "main";
}

const blurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
};

const radiusMap = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-2xl",
  "2xl": "rounded-3xl",
  full: "rounded-full",
};

export function GlassContainer({
  children,
  className,
  blur = "xl",
  opacity = 0.1,
  radius = "xl",
  as: Component = "div",
}: GlassContainerProps) {
  const blurClass = blurMap[blur];
  const radiusClass = radiusMap[radius];

  return (
    <Component
      className={cn(
        blurClass,
        `bg-white/${opacity}`,
        "border border-white/20",
        "shadow-xl",
        "dark:bg-black/40",
        "dark:border-white/10",
        radiusClass,
        className
      )}
    >
      {children}
    </Component>
  );
}
