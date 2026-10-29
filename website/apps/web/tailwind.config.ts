import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    // Fluid layout: no max-width cap at any breakpoint (screens: {}) — the
    // container spans the full screen with viewport-scaled edge padding.
    // Content width therefore derives from the actual screen size instead of
    // a hardcoded cap; type/spacing scale via the root font-size clamp() in
    // globals.css.
    container: {
      center: true,
      padding: "clamp(1rem, 3.5vw, 5rem)",
      screens: {}
    },
    extend: {
      // Custom breakpoint: the full horizontal header nav only renders once it
      // genuinely fits on one line; below this the mobile menu shows. Raised
      // from 1100 when nav labels became whitespace-nowrap (wrapping "About
      // Us"/"Our Businesses" was the old pressure valve) — with nowrap + the
      // fluid container padding the row needs ~1280px to fit.
      screens: {
        nav: "1280px"
      },
      colors: {
        // ---------- Primary brand — evergreen (#1f5f47 at 600) ----------
        primary: {
          50: "#eef6f2",
          100: "#d5e9df",
          200: "#abd3bf",
          300: "#79b69a",
          400: "#4c9677",
          500: "#2f7a5c",
          600: "#1f5f47",
          700: "#1a4c3a",
          800: "#163d30",
          900: "#112f26",
          950: "#091a15"
        },

        // ---------- Secondary — copper accents (token name kept as `gold`) ----------
        gold: {
          50: "#fcf6f1",
          100: "#f7e7d9",
          200: "#eecbb0",
          300: "#e2a77f",
          400: "#d68653",
          500: "#c56b36",
          600: "#a8552a",
          700: "#864325",
          800: "#6c3823",
          900: "#5a301f",
          950: "#31170e"
        },

        // ---------- Decorative accent dots — earthy set (names kept for existing classes) ----------
        print: {
          red: "#c56b36",
          yellow: "#e0a63a",
          green: "#2f7a5c",
          cyan: "#3a8fa8",
          magenta: "#b5536b"
        },

        // ---------- Warm charcoal scale (token name kept as `navy`) ----------
        navy: {
          50: "#f5f4f1",
          100: "#e6e4de",
          200: "#cdc9bf",
          300: "#aca79a",
          400: "#888274",
          500: "#6b665a",
          600: "#55514a",
          700: "#423f3a",
          800: "#2d2b28",
          900: "#1c1b19",
          950: "#12110f"
        },

        // ---------- Semantic tokens mapped to CSS vars ----------
        bg: "rgb(var(--bg) / <alpha-value>)",
        section: "rgb(var(--section) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        gold: "0 4px 24px -6px rgba(197, 107, 54, 0.35)",
        accent: "0 4px 24px -6px rgba(31, 95, 71, 0.28)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
