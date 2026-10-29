"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

type CursorGlowProps = {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
};

export function CursorGlow({
  children,
  className,
  size = 520,
  color = "rgba(58, 135, 193, 0.22)"
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function onLeave() {
    x.set(-9999);
    y.set(-9999);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      <motion.div
        aria-hidden
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, ${color} 0%, transparent 65%)`
        }}
        className="pointer-events-none absolute left-0 top-0 z-0 blur-2xl"
      />
      {children}
    </div>
  );
}
