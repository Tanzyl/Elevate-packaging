"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SplitRevealProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
};

export function SplitReveal({
  children,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.8,
  once = true
}: SplitRevealProps) {
  const words = children.split(/(\s+)/);
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={children}
    >
      {words.map((word, i) =>
        /\s+/.test(word) ? (
          <span key={i} aria-hidden>
            {word}
          </span>
        ) : (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            {word}
          </motion.span>
        )
      )}
    </MotionTag>
  );
}
