"use client";

import { cn } from "../../lib/utils";
import { ReactNode, useState } from "react";
import Grainient from "../Grainient";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const images = [
  "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=400&h=400&fit=crop",
];

const images2 = [
  "https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555255707-c07966488bd7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1664575196079-9ac025813382?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&h=400&fit=crop",
];

function ScrambleButton({ text = "Read More", onClick }: { text?: string, onClick?: () => void }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const originalText = text;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <button
      onMouseEnter={scramble}
      onClick={onClick}
      className="px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-xl active:scale-95 bg-white text-red-600 hover:bg-red-50 shadow-black/20"
    >
      {displayText}
    </button>
  );
}

export function HeroWithMarquee() {
  return (
    <div className="relative overflow-hidden py-24 text-zinc-900 border-y border-zinc-200">
      <div className="absolute max-w-[1600px] mx-auto inset-4 lg:inset-8 2xl:inset-x-20 xl:inset-16 z-0 rounded-2xl overflow-hidden border border-zinc-200/60">
        <Grainient
          color1="#FFB3C6"
          color2="#E53E3E"
          color3="#FFFFFF"
          warpStrength={1.2}
          warpFrequency={4.0}
          grainAmount={0.08}
          timeSpeed={0.1}
          contrast={1.3}
          saturation={1.1}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1600px] justify-center px-6 lg:px-12">
        {/* Left Content */}
        <div className="w-full max-w-4xl rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-2xl shadow-black/10 p-8 text-center md:p-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center justify-center gap-2 text-red-700 font-mono text-xs uppercase tracking-[0.4em] font-bold">
                <span className="h-2 w-2 rounded-full bg-red-600" />
                The Final Frontier
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black font-outfit leading-[0.95] uppercase tracking-tighter italic text-zinc-900">
                The Future of <br />Digital Labor
              </h2>
            </div>
            <div className="mx-auto max-w-2xl space-y-4 text-zinc-700">
              <p className="text-xl font-medium text-zinc-900">
                Join thousands of engineers and architects building the autonomous future.
              </p>
              <p className="text-sm leading-relaxed text-zinc-700/90">
                Stable Release 1.0.4. Available for immediate digital download.
                Includes complete SDK blueprints and multi-agent coordination frameworks.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ScrambleButton text="Start Reading" />
              <div className="hidden sm:block text-xs font-mono text-zinc-800/70">
                Instant download • Updates included
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/[0.05] blur-[120px] rounded-full"></div>
    </div>
  );
}