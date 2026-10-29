"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquareText, Send, X } from "lucide-react";
import { site } from "@/lib/site-config";
import { catalog } from "@/lib/products";
import { ease } from "@/components/motion/tokens";

type BotLink = { label: string; href: string; external?: boolean };
type Message = { id: number; role: "bot" | "user"; text: string; links?: BotLink[] };

const WA_HREF = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.brand}, I have a question about your packaging.`
)}`;

const QUICK_REPLIES = [
  "Browse products",
  "Get pricing",
  "How to reach you"
];

// When the language switcher has set a `googtrans` cookie, the Google
// Translate widget handles the static page — but its mutation observer misses
// chat messages added after its initial pass. So the widget translates its own
// dynamic messages through the same endpoint: the visitor's question goes to
// English for the keyword matcher, and the scripted reply goes back to the
// visitor's language. Falls back to English silently if the endpoint fails.
function activeLang(): string {
  const m = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
  const lang = m ? decodeURIComponent(m[1]).split("/")[2] : "";
  return lang && lang !== "en" ? lang : "";
}

async function translate(text: string, from: string, to: string): Promise<string> {
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data: [string][][] = (await res.json())[0] ?? [];
    const out = data.map((seg) => seg[0]).join("");
    return out || text;
  } catch {
    return text;
  }
}

// Scripted assistant: keyword-matched answers built from the same site data
// the pages render (products.ts, site-config.ts). No backend needed — works
// on static hosting. Phase-3 AI chat can swap `answer()` for a real API call
// without touching the widget UI.
function answer(raw: string): Omit<Message, "id" | "role"> {
  const q = raw.toLowerCase();

  if (/quote|price|pricing|cost|rfq|order|moq|sample/.test(q)) {
    return {
      text: "Our quote form is the quickest route to a price. Include the product type, size, quantity, and artwork, and you'll hear back from our team within one business day.",
      links: [
        { label: "Get a Quote", href: "/rfq" },
        { label: "Message on WhatsApp", href: WA_HREF, external: true }
      ]
    };
  }
  if (/product|pouch|film|bag|packag|laminate|print/.test(q)) {
    return {
      text: `Our lineup covers ${catalog
        .map((c) => c.name.toLowerCase())
        .join(", ")}, each printed to match your brand.`,
      links: [
        ...catalog.map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
        { label: "Full catalog", href: "/products" }
      ]
    };
  }
  if (/contact|phone|call|email|address|office|location|reach/.test(q)) {
    return {
      text: `Call ${site.contact.phones[0]} or email ${site.contact.emails.general}. Our contact page lists every address.`,
      links: [
        { label: "Contact us", href: "/contact" },
        { label: "Message on WhatsApp", href: WA_HREF, external: true }
      ]
    };
  }
  if (/industr|sector|food|textile|market/.test(q)) {
    return {
      text: "We package for 25 markets, spanning food and beverage, consumer goods, industrial and farm, and retail and manufacturing.",
      links: [{ label: "See markets", href: "/industries" }]
    };
  }
  if (/human|agent|person|whatsapp|talk|speak/.test(q)) {
    return {
      text: "Glad to put you in touch with a person. WhatsApp gets the fastest answer, or send a note through our contact page and we'll respond within one business day.",
      links: [
        { label: "Message on WhatsApp", href: WA_HREF, external: true },
        { label: "Send a message", href: "/contact" }
      ]
    };
  }
  if (/hi|hello|hey|salam|assalam/.test(q)) {
    return {
      text: "Hi there! I can answer questions about our products, markets, or getting a quote."
    };
  }
  return {
    text: "I'm best with products, pricing, and contact info. For something more specific, message our team on WhatsApp and they'll get back to you within one business day.",
    links: [
      { label: "Message on WhatsApp", href: WA_HREF, external: true },
      { label: "Get a Quote", href: "/rfq" }
    ]
  };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: `Welcome! I'm the ${site.brand} helper. Looking for products, pricing, or something else?`
    }
  ]);
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setInput("");
    const lang = activeLang();
    // Quick-reply chips pass English, typed input arrives in the visitor's
    // language — `sl=auto` normalizes both directions.
    const [display, query] = lang
      ? await Promise.all([
          translate(text, "auto", lang),
          translate(text, "auto", "en")
        ])
      : [text, text];
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: display }]);
    const reply = answer(query);
    if (lang) {
      reply.text = await translate(reply.text, "en", lang);
      if (reply.links) {
        reply.links = await Promise.all(
          reply.links.map(async (l) => ({
            ...l,
            label: await translate(l.label, "en", lang)
          }))
        );
      }
    }
    setMessages((m) => [...m, { id: nextId.current++, role: "bot", ...reply }]);
  };

  return (
    <>
      {/* Launcher — stacked directly above the WhatsApp button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.25rem)] right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/40 transition hover:scale-105 hover:bg-accent-hover md:h-14 md:w-14"
      >
        {open ? <X size={22} /> : <MessageSquareText size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: ease.out } }}
            exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.18, ease: ease.inOut } }}
            role="dialog"
            aria-label={`${site.brand} chat`}
            className="fixed bottom-[9.5rem] right-5 z-50 flex max-h-[min(34rem,70vh)] w-[min(92vw,22.5rem)] flex-col overflow-hidden rounded-2xl border border-line/15 bg-bg shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-accent px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <MessageSquareText size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{site.brand} Helper</p>
                <p className="text-[11px] text-white/75">Instant answers · our team within one business day</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm text-white"
                        : "max-w-[85%] rounded-2xl rounded-bl-md bg-section px-3.5 py-2 text-sm text-fg"
                    }
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    {m.links && (
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map((l) =>
                          l.external ? (
                            <a
                              key={l.label}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-accent/30 bg-bg px-2.5 py-1 text-xs font-medium text-accent transition hover:bg-accent hover:text-white"
                            >
                              {l.label}
                            </a>
                          ) : (
                            <Link
                              key={l.label}
                              href={l.href}
                              onClick={() => setOpen(false)}
                              className="rounded-full border border-accent/30 bg-bg px-2.5 py-1 text-xs font-medium text-accent transition hover:bg-accent hover:text-white"
                            >
                              {l.label}
                            </Link>
                          )
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-1.5 border-t border-line/10 px-4 pb-2 pt-2.5">
              {QUICK_REPLIES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => send(r)}
                  className="rounded-full border border-line/15 px-2.5 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line/10 px-3 py-2.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask us anything…"
                aria-label="Your message"
                className="min-w-0 flex-1 bg-transparent px-1.5 text-sm text-fg outline-none placeholder:text-subtle"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-hover disabled:opacity-40"
                disabled={!input.trim()}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
