"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

// Lenis owns the scroll position, so Next.js's default scroll-to-top on
// navigation (and a plain window.scrollTo) has no effect. Reset Lenis itself
// on every route change so each page opens at the very top.
function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 0.9,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        wheelMultiplier: 1,
        touchMultiplier: 1.4
      }}
    >
      <ScrollToTopOnRouteChange />
      {children}
    </ReactLenis>
  );
}
