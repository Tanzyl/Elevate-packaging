"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

export type ShowcaseItem = { label: string; href: string; image: string };
export type ShowcaseGroup = {
  title: string;
  href?: string;
  image?: string;
  items: ShowcaseItem[];
};

export type MegaMenuItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    href?: string;
    items: {
      label: string;
      description?: string;
      icon?: React.ElementType;
      href: string;
    }[];
  }[];
  // Reference-style full-width panel (categories + products + hover image).
  showcase?: {
    eyebrow?: string;
    allHref?: string;
    allLabel?: string;
    groups: ShowcaseGroup[];
  };
  link?: string;
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[];
  className?: string;
}

// easeOutQuint — matches the reference dropdown's smooth glide.
const EASE = [0.23, 1, 0.32, 1] as const;
const EASE_CSS = "cubic-bezier(0.23, 1, 0.32, 1)";

/* ---------------- Reference-style showcase panel ---------------- */

function ShowcasePanel({
  showcase,
  onNavigate
}: {
  showcase: NonNullable<MegaMenuItem["showcase"]>;
  onNavigate: () => void;
}) {
  const [activeCat, setActiveCat] = React.useState(0);
  const group = showcase.groups[activeCat] ?? showcase.groups[0];
  const [preview, setPreview] = React.useState(
    group.image ?? group.items[0]?.image ?? ""
  );

  // Reset the preview image to the category image whenever the active
  // category changes (then individual products override on hover).
  React.useEffect(() => {
    const g = showcase.groups[activeCat];
    if (g) setPreview(g.image ?? g.items[0]?.image ?? "");
  }, [activeCat, showcase.groups]);

  return (
    <motion.div
      data-lenis-prevent
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain border-t border-line/10 bg-card shadow-2xl shadow-black/10"
    >
      <div className="container grid items-stretch gap-8 py-9 md:grid-cols-[0.85fr_1fr_1.15fr] md:gap-12 md:py-11">
        {/* Column 1 — categories */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
          }}
          className="flex flex-col gap-1"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-subtle">
            {showcase.eyebrow ?? "Explore"}
          </p>
          {showcase.groups.map((g, i) => (
            <motion.div
              key={g.title}
              variants={{
                hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE }
                }
              }}
            >
              <Link
                href={g.href ?? "#"}
                onMouseEnter={() => setActiveCat(i)}
                onFocus={() => setActiveCat(i)}
                onClick={onNavigate}
                className={`flex items-center gap-3 py-1.5 font-display text-2xl font-medium tracking-tight md:text-[2rem] ${
                  i === activeCat ? "text-fg" : "text-subtle hover:text-fg"
                }`}
                style={{ transition: `color 0.5s ${EASE_CSS}` }}
              >
                <span
                  className="h-px bg-accent"
                  style={{
                    width: i === activeCat ? "2rem" : "0rem",
                    opacity: i === activeCat ? 1 : 0,
                    transition: `width 0.5s ${EASE_CSS}, opacity 0.5s ${EASE_CSS}`
                  }}
                />
                {g.title}
              </Link>
            </motion.div>
          ))}
          {showcase.allHref && (
            <Link
              href={showcase.allHref}
              onClick={onNavigate}
              className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-accent transition-colors hover:text-accent-hover"
            >
              {showcase.allLabel ?? "View all"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </motion.div>

        {/* Column 2 — products of the active category (re-stagger on switch) */}
        <div className="self-start">
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeCat}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.045, delayChildren: 0.04 }
                },
                exit: { transition: { staggerChildren: 0.015 } }
              }}
              className="flex flex-col"
            >
              {group.items.map((it) => (
                <motion.li
                  key={it.href}
                  variants={{
                    hidden: { opacity: 0, y: 16, filter: "blur(2px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.85, ease: EASE }
                    },
                    exit: {
                      opacity: 0,
                      y: -8,
                      transition: { duration: 0.25, ease: EASE }
                    }
                  }}
                  onMouseEnter={() => setPreview(it.image)}
                >
                  <Link
                    href={it.href}
                    onClick={onNavigate}
                    className="group/item flex items-center py-1 text-lg text-muted transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-accent md:text-xl"
                  >
                    <span
                      aria-hidden
                      className="w-0 -translate-x-2 overflow-hidden text-accent opacity-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/item:mr-2 group-hover/item:w-4 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                    >
                      →
                    </span>
                    <span>{it.label}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Column 3 — image preview (crossfade on hover) */}
        <div className="relative hidden aspect-square w-full overflow-hidden rounded-2xl bg-section md:block">
          <AnimatePresence>
            <motion.img
              key={preview}
              src={preview}
              alt=""
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-line/10" />
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------- styles ----------------------------- */

// Light / brand-themed adaptation of the 21st.dev mega-menu: white panels,
// royal-blue accent, real Next.js links, optional per-item descriptions.
const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, className, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const [isHover, setIsHover] = React.useState<number | null>(null);
    const pathname = usePathname() ?? "/";

    // Current-page indicator: exact match for home, prefix match for section
    // roots so /products/pouches/... keeps "Products" highlighted.
    const isActive = (link?: string) => {
      if (!link) return false;
      if (link === "/") return pathname === "/";
      return pathname === link || pathname.startsWith(`${link}/`);
    };

    const triggerClass = (active: boolean) =>
      `relative flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap py-1.5 px-3 text-sm transition-colors duration-300 group ${
        active ? "font-medium text-accent" : "text-muted hover:text-fg"
      }`;

    return (
      <ul
        ref={ref}
        className={`relative flex items-center ${className || ""}`}
        {...props}
      >
        {items.map((navItem) => {
          const hasPanel = !!navItem.subMenus || !!navItem.showcase;
          return (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(navItem.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {hasPanel && !navItem.link ? (
                <button
                  className={triggerClass(false)}
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <span>{navItem.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-180 ${
                      openMenu === navItem.label ? "rotate-180" : ""
                    }`}
                  />
                  {(isHover === navItem.id || openMenu === navItem.label) && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full bg-accent/10"
                      style={{ borderRadius: 99 }}
                    />
                  )}
                </button>
              ) : (
                // Top-level items always navigate on click — items with a
                // panel additionally open their dropdown on hover.
                <Link
                  href={navItem.link ?? "#"}
                  className={triggerClass(isActive(navItem.link))}
                  aria-current={isActive(navItem.link) ? "page" : undefined}
                  onClick={() => setOpenMenu(null)}
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <span>{navItem.label}</span>
                  {isActive(navItem.link) && (
                    <motion.span
                      layoutId="active-nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    />
                  )}
                  {hasPanel && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-180 ${
                        openMenu === navItem.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {(isHover === navItem.id || openMenu === navItem.label) && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full bg-accent/10"
                      style={{ borderRadius: 99 }}
                    />
                  )}
                </Link>
              )}

              {/* Full-width showcase panel (Products) */}
              <AnimatePresence>
                {openMenu === navItem.label && navItem.showcase && (
                  <div className="fixed inset-x-0 top-16 z-50">
                    <ShowcasePanel
                      showcase={navItem.showcase}
                      onNavigate={() => setOpenMenu(null)}
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Standard column dropdown (Industries / Businesses) */}
              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div className="absolute left-1/2 top-full z-50 w-auto -translate-x-1/2 pt-3">
                    <motion.div
                      // Let two-finger / touchpad scrolling work inside the panel —
                      // Lenis (root smooth-scroll) otherwise hijacks the wheel.
                      data-lenis-prevent
                      className="max-h-[72vh] w-[min(280px,90vw)] overflow-y-auto overscroll-contain rounded-2xl border border-line/10 bg-card p-4 shadow-xl shadow-black/10"
                      layoutId="menu"
                    >
                      {/* Vertical stack of sections; items render as a single column. */}
                      <div className="flex flex-col gap-y-5">
                        {navItem.subMenus.map((sub) => (
                          <div key={sub.title}>
                            {sub.href ? (
                              <Link
                                href={sub.href}
                                onClick={() => setOpenMenu(null)}
                                className="group/title mb-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-subtle transition-colors hover:text-accent"
                              >
                                {sub.title}
                                <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover/title:translate-x-0 group-hover/title:opacity-100" />
                              </Link>
                            ) : (
                              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-subtle">
                                {sub.title}
                              </h3>
                            )}
                            <ul className="grid grid-cols-1 gap-y-0.5">
                              {sub.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setOpenMenu(null)}
                                    className="group flex items-center rounded-md px-2 py-2 transition-colors hover:bg-accent/5"
                                  >
                                    <span className="truncate text-sm font-medium text-fg transition-colors group-hover:text-accent">
                                      {item.label}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    );
  }
);

MegaMenu.displayName = "MegaMenu";

export default MegaMenu;
