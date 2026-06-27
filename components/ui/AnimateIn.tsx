"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  delay?: number;          // ms
  className?: string;
  style?: CSSProperties;
  threshold?: number;      // 0–1, default 0.12
}

/**
 * Wraps children in a div that fades + slides up
 * when it enters the viewport (IntersectionObserver).
 */
export default function AnimateIn({
  children,
  delay = 0,
  className = "",
  style,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            el.classList.remove("reveal-hidden");
            el.classList.add("reveal-visible");
          }, delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`reveal-hidden ${className}`} style={style}>
      {children}
    </div>
  );
}
