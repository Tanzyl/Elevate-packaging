"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/site-config";

type ShiftingNavProps = {
  items: NavItem[];
  className?: string;
};

function basePath(href: string): string {
  return href.split("#")[0].split("?")[0];
}

export function ShiftingNav({ items, className }: ShiftingNavProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<"l" | "r" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const instanceId = useId().replace(/:/g, "");

  function setSelectedSafe(val: number | null) {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  }

  function schedClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSelectedSafe(null), 140);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <nav
      onMouseLeave={schedClose}
      className={cn("relative hidden h-fit items-center gap-0.5 nav:flex", className)}
    >
      {items.map((item, i) => (
        <Tab
          key={item.href + item.label}
          item={item}
          index={i}
          selected={selected}
          instanceId={instanceId}
          onEnter={() => {
            cancelClose();
            setSelectedSafe(i);
          }}
        />
      ))}

      <AnimatePresence>
        {selected !== null && items[selected]?.children && (
          <Dropdown
            item={items[selected]!}
            selectedIndex={selected}
            instanceId={instanceId}
            dir={dir}
            onEnter={cancelClose}
            onLeave={schedClose}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

function Tab({
  item,
  index,
  selected,
  instanceId,
  onEnter
}: {
  item: NavItem;
  index: number;
  selected: number | null;
  instanceId: string;
  onEnter: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const target = basePath(item.href);
  const active =
    target === "/"
      ? pathname === "/"
      : pathname === target || pathname.startsWith(target + "/");

  const isOpen = selected === index;
  const hasKids = !!item.children?.length;

  return (
    <Link
      id={`shift-tab-${instanceId}-${index}`}
      href={item.href}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm transition-colors",
        isOpen
          ? "bg-card text-fg shadow-sm"
          : active
            ? "text-fg"
            : "text-muted hover:text-fg"
      )}
    >
      <span>{item.label}</span>
      {hasKids && (
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      )}
      {active && !isOpen && (
        <span
          aria-hidden
          className="absolute inset-x-3 -bottom-[2px] h-[2px] rounded-full bg-accent"
        />
      )}
    </Link>
  );
}

function Dropdown({
  item,
  selectedIndex,
  instanceId,
  dir,
  onEnter,
  onLeave
}: {
  item: NavItem;
  selectedIndex: number;
  instanceId: string;
  dir: "l" | "r" | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const flatChildren = (item.children ?? []).every((c) => !(c.children?.length));
  const manyFlat = flatChildren && (item.children?.length ?? 0) > 12;
  return (
    <motion.div
      id={`shift-overlay-${instanceId}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "absolute left-0 top-[calc(100%_+_18px)] z-50 max-h-[70vh] overflow-y-auto rounded-xl border border-line/10 bg-card/95 p-5 shadow-xl shadow-black/20 backdrop-blur",
        manyFlat ? "w-[min(720px,94vw)]" : "w-[min(560px,90vw)]"
      )}
    >
      <Bridge />
      <Nub selectedIndex={selectedIndex} instanceId={instanceId} />
      <motion.div
        key={item.label}
        initial={{
          opacity: 0,
          x: dir === "l" ? 60 : dir === "r" ? -60 : 0
        }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <DropdownContent item={item} />
      </motion.div>
    </motion.div>
  );
}

function Bridge() {
  return <div className="absolute -top-[18px] left-0 right-0 h-[18px]" />;
}

function Nub({
  selectedIndex,
  instanceId
}: {
  selectedIndex: number;
  instanceId: string;
}) {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const tab = document.getElementById(
      `shift-tab-${instanceId}-${selectedIndex}`
    );
    const overlay = document.getElementById(`shift-overlay-${instanceId}`);
    if (!tab || !overlay) return;
    const tabRect = tab.getBoundingClientRect();
    const { left: overlayLeft } = overlay.getBoundingClientRect();
    setLeft(tabRect.left + tabRect.width / 2 - overlayLeft);
  }, [selectedIndex, instanceId]);

  return (
    <motion.span
      aria-hidden
      style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)" }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-line/10 bg-card"
    />
  );
}

function DropdownContent({ item }: { item: NavItem }) {
  const children = item.children ?? [];
  const hasGrandchildren = children.some((c) => (c.children?.length ?? 0) > 0);

  if (hasGrandchildren) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3">
          {children.map((group) => (
            <div key={group.href + group.label}>
              <Link
                href={group.href}
                className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-accent hover:text-accent-hover"
              >
                {group.label}
              </Link>
              {group.children?.length ? (
                <ul className="space-y-1.5">
                  {group.children.map((leaf) => (
                    <li key={leaf.href + leaf.label}>
                      <Link
                        href={leaf.href}
                        className="block text-sm text-muted transition-colors hover:text-fg"
                      >
                        {leaf.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link
                  href={group.href}
                  className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-fg"
                >
                  <span>View category</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </div>
          ))}
        </div>
        <Link
          href={item.href}
          className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover"
        >
          <span>View all {item.label.toLowerCase()}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  const columns =
    children.length > 12 ? 2 : children.length > 6 ? 3 : children.length > 3 ? 2 : 1;
  return (
    <div className="space-y-4">
      <ul
        className={cn(
          "grid gap-x-6 gap-y-1.5",
          columns === 3
            ? "grid-cols-2 md:grid-cols-3"
            : columns === 2
              ? "grid-cols-2"
              : "grid-cols-1"
        )}
      >
        {children.map((leaf) => (
          <li key={leaf.href + leaf.label}>
            <Link
              href={leaf.href}
              className="block truncate rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-line/5 hover:text-fg"
            >
              {leaf.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover"
      >
        <span>Go to {item.label}</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
