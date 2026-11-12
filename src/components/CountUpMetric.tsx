import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface CountUpMetricProps {
  target: number;
  suffix?: string;
  label: string;
}

export const CountUpMetric: React.FC<CountUpMetricProps> = ({
  target,
  suffix = '',
  label,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion || target === 0) {
      setDisplayValue(target);
      return;
    }

    const durationMs = 950;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-primary tabular-nums">
        {displayValue}
        <span className="text-secondary">{suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-snug">{label}</p>
    </div>
  );
};
