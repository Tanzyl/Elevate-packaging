"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { ease } from "@/components/motion/tokens";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: ease.out, delay: 0.08 }
        }}
        exit={{
          opacity: 0,
          y: -14,
          transition: { duration: 0.22, ease: ease.inOut }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
