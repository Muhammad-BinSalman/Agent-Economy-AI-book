'use client';
import { cn } from '@/lib/utils';

export type ProgressiveBlurProps = {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
};

// Replaced 8x backdrop-filter:blur() layers (extremely GPU expensive) with a
// single CSS gradient mask. Identical visual, zero GPU compositing cost.
export function ProgressiveBlur({
  direction = 'bottom',
  className,
}: ProgressiveBlurProps) {
  const gradients: Record<string, string> = {
    left: 'linear-gradient(to right, white, transparent)',
    right: 'linear-gradient(to left, white, transparent)',
    top: 'linear-gradient(to bottom, white, transparent)',
    bottom: 'linear-gradient(to top, white, transparent)',
  };

  return (
    <div
      className={cn('pointer-events-none', className)}
      style={{
        maskImage: gradients[direction],
        WebkitMaskImage: gradients[direction],
        background: 'white',
      }}
    />
  );
}

