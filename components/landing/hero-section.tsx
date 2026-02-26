"use client"
import { useCallback, useEffect, useRef } from "react";
import Grainient from "../Grainient";
import LogoCloud from "./hero-caroasel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}

interface HeroProps {
  heading?: string;
  tagline?: string;
  supportingText?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  secondaryButtonText?: string;
  imageUrl?: string;
  videoUrl?: string;
  bookTitle?: string;
  coverImageUrl?: string;
}


const parseRgbColor = (colorString: string) => {
  if (!colorString) return null;
  const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  return null;
};


const HeroSection: React.FC<HeroProps> = ({
  heading = "Building the AI Agent Economy",
  tagline = "A visionary guide to agentic architecture.",
  supportingText,
  buttonText = "Get Started",
  onButtonClick,
  secondaryButtonText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const mousePosRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const resolvedCanvasColorsRef = useRef({
    strokeStyle: { r: 9, g: 9, b: 11 },
  });

  useEffect(() => {
    const updateResolvedColors = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const fgStr = `rgb(${computedStyle.getPropertyValue('--foreground').trim() || '9, 9, 11'})`;
      const parsedFgColor = parseRgbColor(fgStr);
      if (parsedFgColor) {
        resolvedCanvasColorsRef.current.strokeStyle = parsedFgColor;
      }
    };
    updateResolvedColors();
  }, []);

  const drawArrow = useCallback(() => {
    if (!canvasRef.current || !targetRef.current || !ctxRef.current) return;

    const targetEl = targetRef.current;
    const ctx = ctxRef.current;
    const mouse = mousePosRef.current;

    const x0 = mouse.x;
    const y0 = mouse.y;

    if (x0 === null || y0 === null) return;

    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const a = Math.atan2(cy - y0, cx - x0);
    const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
    const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
    const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
    const controlX = midX;
    const controlY = midY + offset * t;

    const r = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
    const opacity = Math.min(0.3, (r - Math.max(rect.width, rect.height) / 2) / 500);

    const arrowColor = resolvedCanvasColorsRef.current.strokeStyle;
    ctx.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${opacity})`;
    ctx.lineWidth = 1.2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(controlX, controlY, x1, y1);
    ctx.setLineDash([6, 6]);
    ctx.stroke();
    ctx.restore();

    const angle = Math.atan2(y1 - controlY, x1 - controlX);
    const headLength = 6;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - headLength * Math.cos(angle - Math.PI / 6), y1 - headLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - headLength * Math.cos(angle + Math.PI / 6), y1 - headLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }, []);

  const mouseDirtyRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      // Only schedule a frame when mouse actually moves
      if (!mouseDirtyRef.current) {
        mouseDirtyRef.current = true;
        animationFrameIdRef.current = requestAnimationFrame(() => {
          if (ctxRef.current && canvas) {
            ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
            drawArrow();
          }
          mouseDirtyRef.current = false;
        });
      }
    };
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);
    updateCanvasSize();
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [drawArrow]);

  return (
    <div className="relative overflow-hidden font-inter bg-white">
      {/* Animated Grainient background: light pink → red → white */}
      <div className="absolute max-w-[1600px] mx-auto inset-4 lg:inset-8 2xl:inset-x-20 xl:inset-16 border-t border-x mt-6 z-0 rounded-2xl overflow-hidden">
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
        {/* Bottom fade to white */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-white pointer-events-none z-10 flex items-end">
          <LogoCloud />
        </div>
      </div>

      <main className="relative flex flex-col items-center justify-center z-20 px-6 py-3 xl:mt-40 lg:mt-20 md:mt-16 sm:mt-12 mt-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-mono font-bold text-white border border-white/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            V1.0 BETA AI-NATIVE EDITION
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight font-outfit leading-[0.95] mb-6 text-white drop-shadow-lg">
            {heading}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-white/90 max-w-3xl mx-auto leading-tight mb-4 drop-shadow">
            {tagline}
          </p>
          {supportingText && (
            <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              {supportingText}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
          <Link
            href={"/book/preface"}
            className="h-14 px-10 rounded-full bg-white text-red-600 flex items-center justify-center font-bold hover:bg-red-50 transition-all shadow-xl shadow-black/20 active:scale-95 text-lg"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          {secondaryButtonText && (
            <Link
              target="_blank"
              href={"https://github.com/Muhammad-BinSalman/Agent-Economy-AI-book"}
              className="h-14 px-10 flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-all text-lg"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>

        {/* <div className="mt-8 mb-24 flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 lg:gap-24 relative">
 
          <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

          <Book depth={10}>
            <div className="p-3 mb-2 grid gap-3">
              <h1 className="font-semibold">
                Your complete platform for the Design.
              </h1>
            </div>
          </Book>
        </div> */}
      </main>

      <div className="h-24 md:h-48"></div>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10"></canvas>
    </div>
  );
};

export { HeroSection };
