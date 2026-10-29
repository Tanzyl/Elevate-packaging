/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy.
//
// script-src needs 'unsafe-inline' because Next.js App Router injects inline
// hydration/flight scripts and this site is statically rendered (a nonce would
// force every page dynamic). Even so, the policy still blocks the main XSS
// payload delivery route: loading script from an attacker-controlled origin.
// Dev additionally needs 'unsafe-eval' for HMR.
//
// img-src allows any https host: the catalogue pulls remote placeholder photos
// (see next.config remotePatterns / lib/images.ts) and images cannot execute
// script, so a permissive img-src is low risk and avoids breaking new sources.
// connect-src allows https for the same reason — the contact/RFQ forms POST to
// whatever NEXT_PUBLIC_FORM_ENDPOINT is configured (Formspree/Web3Forms/Basin).
const csp = [
  "default-src 'self'",
  // translate.google.com / translate.googleapis.com / translate-pa: the
  // Google Translate page widget (components/language-switcher.tsx) loads its
  // element script and injected styles from these hosts.
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://translate.googleapis.com https://www.gstatic.com",
  "img-src 'self' data: blob: https:" + (isDev ? " http://localhost:4000" : ""),
  "font-src 'self' data:",
  "connect-src 'self' https:" + (isDev ? " ws://localhost:3002 http://localhost:4000" : ""),
  // Video embeds go through components/ui/lite-video.tsx.
  "frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
  "media-src 'self'",
  // Service worker (public/sw.js).
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  // Forms submit via fetch(), never a native cross-origin form POST.
  "form-action 'self'",
  // Clickjacking: no one may frame this site (modern equivalent of
  // X-Frame-Options, which is kept below for older browsers).
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  },
  {
    key: "Strict-Transport-Security",
    // preload directive added so the domain is eligible for the browser HSTS
    // preload list — submit at hstspreload.org once all subdomains serve HTTPS.
    value: "max-age=63072000; includeSubDomains; preload"
  },
  { key: "X-DNS-Prefetch-Control", value: "off" }
];

const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework version to attackers fingerprinting targets.
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The admin panel must never be indexed, even if a URL leaks.
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
      }
    ];
  },
  images: {
    // Serve AVIF (≈30-40% smaller than WebP) with WebP fallback, and let
    // CDNs/browsers cache optimized variants for a year — the public images
    // are content-hashed by filename convention, so long cache is safe.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // SVGs stay disabled (the default): next/image will not optimize them, so
    // a hostile SVG can never be served same-origin as an executable document.
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    // Each entry is a path a stranger can force this site's optimizer to fetch
    // and re-serve from our own domain (/_next/image?url=... is callable by
    // anyone). Paths are pinned so the allowlist can't be used as a general
    // image proxy for arbitrary content on these hosts, and the loopback entry
    // exists only in development.
    remotePatterns: [
      { protocol: "https", hostname: "elevatepackaging.com", pathname: "/images/**" },
      {
        protocol: "https",
        hostname: "www.elevatepackaging.com",
        pathname: "/images/**"
      },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/id/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/id/**" },
      { protocol: "https", hostname: "loremflickr.com", pathname: "/**" },
      ...(isDev
        ? [{ protocol: "http", hostname: "localhost", port: "4000" }]
        : [])
    ]
  }
};

export default nextConfig;
