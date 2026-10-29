"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";

// The loader is gone before the Google Translate widget has rewritten the
// page, so its tagline carries its own translations, picked by the same
// `googtrans` cookie the language switcher sets.
const TAGLINE: Record<string, string> = {
  en: "Flexible packaging, made in the USA",
  es: "Empaque flexible hecho en EE. UU.",
  fr: "Emballage souple fabriqué aux États-Unis",
  ar: "تغليف مرن مصنوع في الولايات المتحدة"
};

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [tagline, setTagline] = useState(TAGLINE.en);

  useEffect(() => {
    const lang = document.cookie
      .match(/(?:^|; )googtrans=([^;]*)/)?.[1]
      ?.split("%2F")
      .join("/")
      .split("/")[2];
    if (lang && TAGLINE[lang]) setTagline(TAGLINE[lang]);
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <BrandLogo size="lg" />
          </motion.div>

          <div className="relative mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-line/10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 bg-accent"
            />
          </div>

          <p
            translate="no"
            className="notranslate mt-4 px-6 text-center text-xs uppercase tracking-[0.3em] text-subtle"
          >
            {tagline}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
