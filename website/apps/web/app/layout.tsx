import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
// @ts-ignore CSS imports are handled by Next.js at build time.
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientChrome } from "@/components/client-chrome";
import { JsonLd } from "@/components/json-ld";
import { organizationLd, websiteLd, SITE_URL } from "@/lib/seo";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"]
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Elevate: Flexible Packaging Manufacturer in the USA",
    template: "%s · Elevate"
  },

  description:
    "Elevate is a USA-based flexible packaging manufacturer: custom printed pouches, laminated films, and rotogravure & flexographic printing for brands nationwide.",

  applicationName: "Elevate",

  authors: [{ name: "Elevate" }],

  keywords: [
    "flexible packaging",
    "packaging manufacturer USA",
    "custom printed pouches",
    "stand up pouches",
    "rotogravure printing",
    "flexographic printing",
    "laminated films",
    "metallized film",
    "custom pouch manufacturer"
  ],

  alternates: {
    canonical: "/"
  },

  openGraph: {
    type: "website",
    siteName: "Elevate",
    locale: "en_US",
    url: SITE_URL,
    title: "Elevate: Flexible Packaging Manufacturer in the USA",
    description:
      "Premium flexible packaging: custom printed pouches, laminated films, and rotogravure & flexographic printing.",
    images: [
      {
        url: "/images/hero-lineup.webp",
        alt: "Elevate flexible packaging"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    site: "@elevate",
    title: "Elevate: Flexible Packaging Manufacturer in the USA",
    description:
      "Premium flexible packaging: custom printed pouches, laminated films, and rotogravure & flexographic printing.",
    images: ["/images/hero-lineup.webp"]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

// Set NEXT_PUBLIC_GTM_ID to enable Google Tag Manager.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <head>
        {GTM_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
          }}
        />
        )}
      </head>
      <body className="bg-royal min-h-screen font-sans">
        {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        )}
        <JsonLd data={[organizationLd(), websiteLd()]} />

        <ThemeProvider>
          <ClientChrome>{children}</ClientChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
