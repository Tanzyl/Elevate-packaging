"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, site, type NavItem } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import MegaMenu from "@/components/ui/mega-menu";
import { MEGA_ITEMS } from "@/lib/mega-nav";

/* ------------------------- helpers ------------------------- */

function basePath(href: string): string {
  return href.split("#")[0].split("?")[0];
}

function useIsActive(href: string) {
  const pathname = usePathname() ?? "/";
  const target = basePath(href);
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(target + "/");
}

/* --------------------------- mobile drawer -------------------------- */

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="border-t border-line/10 nav:hidden">
      <div
        data-lenis-prevent
        className="container max-h-[80vh] touch-pan-y overflow-y-auto overscroll-contain py-4"
      >
        <ul className="space-y-1">
          {nav.primary.map((item) => (
            <MobileEntry
              key={item.href + item.label}
              item={item}
              depth={0}
              onNavigate={onClose}
            />
          ))}
        </ul>

        <Link
          href="/rfq"
          onClick={onClose}
          className="mt-4 block rounded-md bg-accent px-4 py-2 text-center font-medium text-white"
        >
          Get a Quote
        </Link>
        <p className="mt-3 text-center text-xs text-subtle">
          {site.contact.phones[0]}
        </p>
      </div>
    </div>
  );
}

function MobileEntry({
  item,
  depth,
  onNavigate
}: {
  item: NavItem;
  depth: number;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const active = useIsActive(item.href);
  const hasKids = !!item.children?.length;

  return (
    <li>
      <div className="flex items-center" style={{ paddingLeft: depth * 12 }}>
        <Link
          href={item.href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex-1 py-2 text-sm transition",
            active ? "font-medium text-accent" : "text-fg hover:text-accent-hover"
          )}
        >
          {item.label}
        </Link>
        {hasKids && (
          <button
            aria-label={open ? "Hide submenu" : "Show submenu"}
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-subtle"
          >
            <ChevronDown
              size={16}
              className={cn("transition-transform", open && "rotate-180")}
            />
          </button>
        )}
      </div>

      {hasKids && open && (
        <ul className="mt-1 space-y-1 border-l border-line/10 pl-2">
          {item.children!.map((child) => (
            <MobileEntry
              key={child.href + child.label}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ------------------------------ shell ------------------------------- */

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  // While the mobile menu is open, freeze the page behind it (stop Lenis +
  // lock body scroll) so only the drawer scrolls, not the content underneath.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [mobileOpen, lenis]);

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled
          ? "border-line/10 bg-bg/90 backdrop-blur"
          : "border-transparent bg-bg/70 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 flex-nowrap items-center justify-between gap-2">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          aria-label={`${site.brand} homepage`}
          className="shrink-0"
        >
          <BrandLogo size="sm" />
        </Link>

        <div className="hidden nav:flex">
          <MegaMenu items={MEGA_ITEMS} />
        </div>

        <div className="hidden shrink-0 items-center gap-2 nav:flex">
          <ThemeToggle />
          <Link
            href="/rfq"
            className="whitespace-nowrap rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
          >
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-3 nav:hidden">
          <ThemeToggle />
          <button
            aria-label="Open or close menu"
            aria-expanded={mobileOpen}
            className="text-fg"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}

      {/* Reading-progress ribbon — CMYK gradient, fills as the page scrolls. */}
      <motion.div
        aria-hidden
        style={{
          scaleX: progressX,
          transformOrigin: "0% 50%"
        }}
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-print-cyan via-print-magenta via-print-yellow to-print-green"
      />
    </header>
  );
}
