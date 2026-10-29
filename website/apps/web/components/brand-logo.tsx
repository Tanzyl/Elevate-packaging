import Image from "next/image";
import { cn } from "@/lib/utils";

// Wordmark aspect ratio is ~3.18:1 (700 × 220). Sizes bumped up for legibility.
// `sm` is the header logo — kept compact enough that the full nav stays on one line.
const sizeMap = {
  sm: { h: 40, w: 127 },
  md: { h: 48, w: 153 },
  lg: { h: 66, w: 210 }
} as const;

export function BrandLogo({
  size = "md",
  className
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { h, w } = sizeMap[size];

  // Two copies, swapped by the `dark` class (light-text variant on dark).
  return (
    <>
      <Image
        src="/images/logo.svg"
        alt="Elevate"
        width={w}
        height={h}
        className={cn("h-auto w-auto object-contain dark:hidden", className)}
        style={{ height: h, width: "auto" }}
      />
      <Image
        src="/images/logo-dark.svg"
        alt="Elevate"
        width={w}
        height={h}
        className={cn("hidden h-auto w-auto object-contain dark:block", className)}
        style={{ height: h, width: "auto" }}
      />
    </>
  );
}
