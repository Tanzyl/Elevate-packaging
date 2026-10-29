"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

// Machine translation via the Google Translate page widget, driven by the
// `googtrans` cookie. English is the source language; the widget rewrites the
// DOM in place, so no content or routes needed restructuring. Selecting a
// language sets the cookie and reloads; the widget script is only loaded when
// a non-English cookie is present.
//
// UI: a floating flag pill fixed to the bottom-left corner, modeled on
// toyopackaging.com.pk. The chat widget and WhatsApp button are marked
// `notranslate`; the header translates but is condensed via the
// `html.translated-*` rules in globals.css so it stays on one row.
// ponytail: client-side machine translation — upgrade path is next-intl
// locale routes with human-translated lib/*.ts data.

type LangCode = "en" | "es" | "fr" | "ar";

const LANGS: { code: LangCode; label: string; flag: JSX.Element }[] = [
  {
    code: "en",
    label: "English",
    flag: (
      <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden>
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7" />
      </svg>
    )
  },
  {
    code: "es",
    label: "Español",
    flag: (
      <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden>
        <rect width="60" height="40" fill="#AA151B" />
        <rect y="10" width="60" height="20" fill="#F1BF00" />
      </svg>
    )
  },
  {
    code: "fr",
    label: "Français",
    flag: (
      <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden>
        <rect width="20" height="40" fill="#002395" />
        <rect x="20" width="20" height="40" fill="#fff" />
        <rect x="40" width="20" height="40" fill="#ED2939" />
      </svg>
    )
  },
  {
    code: "ar",
    label: "العربية",
    flag: (
      <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden>
        <rect width="60" height="40" fill="#165D31" />
        <text
          x="30"
          y="19"
          fontSize="11"
          fill="#fff"
          textAnchor="middle"
          fontWeight="bold"
        >
          لا إله إلا الله
        </text>
        {/* sword below the shahada */}
        <rect x="13" y="26" width="30" height="2.6" rx="1.3" fill="#fff" />
        <rect x="43.5" y="24.6" width="3.5" height="5.8" rx="1.2" fill="#fff" />
      </svg>
    )
  }
];

const COOKIE = "googtrans";

function readLang(): LangCode {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  const target = match ? decodeURIComponent(match[1]).split("/")[2] : "";
  return LANGS.some((l) => l.code === target) ? (target as LangCode) : "en";
}

function setCookie(value: string, maxAge: number) {
  const base = `${COOKIE}=${value}; path=/; max-age=${maxAge}`;
  document.cookie = base;
  // The widget sometimes reads the cookie from the bare domain in production.
  const host = window.location.hostname;
  if (host.includes(".")) {
    document.cookie = `${base}; domain=.${host.replace(/^www\./, "")}`;
  }
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (options: object, container: string) => unknown;
      };
    };
  }
}

function loadWidget() {
  if (document.getElementById("gt-script")) return;
  if (!document.getElementById("google_translate_element")) {
    const host = document.createElement("div");
    host.id = "google_translate_element";
    document.body.appendChild(host);
  }
  window.googleTranslateElementInit = () => {
    if (!window.google) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: LANGS.map((l) => l.code).join(","),
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  const s = document.createElement("script");
  s.id = "gt-script";
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(s);
}

export function LanguageSwitcher() {
  const [lang, setLang] = useState<LangCode>("en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = readLang();
    setLang(current);
    if (current !== "en") loadWidget();
  }, []);

  function change(code: LangCode) {
    if (code === lang) {
      setOpen(false);
      return;
    }
    if (code === "en") {
      setCookie("", 0); // expire — English is the untranslated source
    } else {
      setCookie(`/en/${code}`, 60 * 60 * 24 * 365);
    }
    window.location.reload();
  }

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div
      translate="no"
      className="notranslate fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 z-40"
    >
      {open && (
        <>
          {/* click-away backdrop */}
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 cursor-default"
          />
          <ul className="absolute bottom-full left-0 mb-2 w-36 overflow-hidden rounded-xl border border-line/15 bg-bg shadow-2xl">
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => change(l.code)}
                  aria-current={l.code === lang ? "true" : undefined}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition hover:bg-section ${
                    l.code === lang ? "font-medium text-accent" : "text-fg"
                  }`}
                >
                  <span className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] shadow-sm">
                    {l.flag}
                  </span>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Choose language"
        className="relative flex items-center gap-2 rounded-full border border-line/15 bg-bg px-3 py-2 text-sm font-medium text-fg shadow-lg transition hover:border-accent/40"
      >
        <span className="h-3.5 w-5 overflow-hidden rounded-[3px] shadow-sm">
          {current.flag}
        </span>
        <span className="uppercase">{current.code}</span>
        <ChevronUp
          size={14}
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
