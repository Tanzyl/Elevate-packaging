"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ChatWidget } from "@/components/chat-widget";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import { PageLoader } from "@/components/page-loader";
import { RouteProgress } from "@/components/route-progress";
import { PageTransition } from "@/components/motion/page-transition";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export function ClientChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const isAdmin = pathname.startsWith("/admin");

  // Image-cache service worker (public/sw.js): stale-while-revalidate for
  // /_next/image and /images/* — repeat views come from Cache Storage.
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  if (isAdmin) return <>{children}</>;

  return (
    <SmoothScroll>
      <PageLoader />
      <RouteProgress />
      <Navbar />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <ChatWidget />
      <LanguageSwitcher />
    </SmoothScroll>
  );
}
