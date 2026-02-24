'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button, type ButtonProps } from './button';

// Helper component to inject the required CSS animations into the document head
const Styles = () => {
  const css = `
    @keyframes orbit {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes counter-orbit {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    .animate-orbit {
      animation: orbit var(--orbit-duration) linear infinite;
    }
    .animate-counter-orbit {
      animation: counter-orbit var(--orbit-duration) linear infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `;
  return <style>{css}</style>;
};

// Interface for individual avatar properties
interface Avatar {
  src: string;
  alt: string;
}

// Interface for the main component props
export interface OrbitingAvatarsCTAProps {
  title: React.ReactNode;
  description: React.ReactNode;
  buttonText: string;
  buttonHref?: string;
  buttonTarget?: string;
  buttonProps?: ButtonProps;
  avatars: Avatar[];
  className?: string;
  orbitRadius?: number; // Radius in rem
  orbitDuration?: number; // Duration in seconds
}

export const OrbitingAvatarsCTA = ({
  title,
  description,
  buttonText,
  buttonHref,
  buttonTarget,
  buttonProps,
  avatars,
  className,
  orbitRadius = 20, // Default radius: 20rem (320px)
  orbitDuration = 40, // Default duration: 40s
}: OrbitingAvatarsCTAProps) => {
  // We assume a base font size of 16px for rem conversion
  const radiusInPx = orbitRadius * 16;

  return (
    <>
      {/* Inject styles into the DOM */}
      <Styles />
      <section className={cn('relative max-w-[1600px] mx-auto flex min-h-[600px] md:min-h-[800px] w-full items-center justify-center overflow-hidden bg-white py-24', className)}>
        {/* Background concentric circles */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[25rem] w-[25rem] md:h-[35rem] md:w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-200" />
          <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] md:h-[50rem] md:w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-100" />
        </div>

        {/* Central Content */}
        <div className="relative z-20 flex flex-col items-center gap-6 px-6 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[10px] font-mono font-bold text-red-600 border border-red-100 mb-2">
            OPEN SOURCE // COMMUNITY BLUEPRINTS
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter leading-[0.9] text-zinc-900">
            {title}
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed font-medium">
            {description}
          </p>
          <Button
            className="rounded-full h-12 px-8 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-colors shadow-lg shadow-zinc-200"
            asChild={!!buttonHref}
            {...buttonProps}
          >
            {buttonHref ? (
              <a href={buttonHref} target={buttonTarget} rel={buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}>
                {buttonText}
              </a>
            ) : (
              buttonText
            )}
          </Button>
        </div>

        {/* Single rotating container for all avatars */}
        <div
          className="absolute inset-0 z-10 animate-orbit pointer-events-none"
          style={{ '--orbit-duration': `${orbitDuration}s` } as React.CSSProperties}
        >
          {avatars.map((avatar, i) => {
            // Calculate position on the circle using trigonometry
            const angle = (i / avatars.length) * 2 * Math.PI; // Angle in radians
            const x = Math.cos(angle) * radiusInPx;
            const y = Math.sin(angle) * radiusInPx;

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2" // Position relative to center
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div
                  className="relative h-12 w-12 md:h-16 md:w-16 animate-float"
                  style={{ animationDelay: `-${i * 1.2}s` }}
                >
                  <div className="h-full w-full rounded-full border-2 border-white shadow-xl overflow-hidden bg-zinc-100">
                    <img
                      src={avatar.src}
                      alt={avatar.alt}
                      className="h-full w-full animate-counter-orbit object-cover"
                      style={{ '--orbit-duration': `${orbitDuration}s` } as React.CSSProperties}
                    />
                  </div>
                  {/* Small decorative status dot */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-red-600 border-2 border-white rounded-full animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative corner accents */}
        <div className="absolute bottom-0 left-0 p-8 flex gap-4 text-zinc-100 pointer-events-none select-none">
          <div className="text-[120px] font-black font-outfit leading-none">010</div>
          <div className="text-[120px] font-black font-outfit leading-none opacity-50 italic">FTE</div>
        </div>
      </section>
    </>
  );
};