"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Thin accent progress bar under the top edge that appears the moment any
// internal link is clicked and completes when the new route renders. Route
// loads can take a beat (RSC fetch, dev-mode compile), and with zero feedback
// users assume the click didn't register and click again — this is the
// "something is happening" signal.
export function RouteProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  // Watch every same-origin link click (capture phase so it works for links
  // rendered anywhere, including portals/mega-menu) and start the bar.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      const path = href.split(/[?#]/)[0];
      // Hash/query changes on the current page don't trigger a route load.
      if (!path || path === window.location.pathname) return;
      setState("loading");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // New route rendered — snap the bar to 100% and fade it out.
  useEffect(() => {
    setState((s) => (s === "loading" ? "done" : s));
  }, [pathname]);

  useEffect(() => {
    if (state === "done") {
      const t = setTimeout(() => setState("idle"), 500);
      return () => clearTimeout(t);
    }
    if (state === "loading") {
      // Safety valve: never leave a stuck bar (aborted nav, error page).
      const t = setTimeout(() => setState("idle"), 15000);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]"
    >
      <div
        className={`h-full rounded-r-full bg-accent shadow-[0_0_10px_rgba(31,95,71,0.6)] ${
          state === "loading"
            ? "w-[82%] opacity-100 transition-[width] duration-[4000ms] ease-out"
            : state === "done"
            ? "w-full opacity-0 transition-all duration-500 ease-out"
            : "w-0 opacity-0 transition-none"
        }`}
      />
    </div>
  );
}
