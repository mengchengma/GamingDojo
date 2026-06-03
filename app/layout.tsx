import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/sections/site-nav";
import { Footer } from "@/components/sections/footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

// Update this whenever the production domain changes.
const SITE_URL = "https://gamingdojo.co";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gaming Dojo — Flushing's Premier Internet Cafe & Esports Lounge",
    template: "%s · Gaming Dojo",
  },
  description:
    "Flushing, NYC's premier internet cafe and esports lounge. RTX 5070 PCs, 280Hz monitors, PS5 / Xbox Series X / Switch, in-house kitchen, and private streaming room. Open till 5 AM weekends — drop in or grab a pass.",
  keywords: [
    "Gaming Dojo",
    "internet cafe Flushing",
    "internet cafe NYC",
    "esports lounge Queens",
    "PC bang Flushing",
    "gaming cafe Queens",
    "gaming lounge NYC",
    "Valorant tournament NYC",
    "Smash Bros tournament Flushing",
    "streaming studio rental NYC",
  ],
  authors: [{ name: "Gaming Dojo", url: SITE_URL }],
  creator: "Gaming Dojo",
  publisher: "Gaming Dojo",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/logo-shield.png", media: "(prefers-color-scheme: light)" },
      { url: "/golden-logo.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/logo-shield.png",
  },
  openGraph: {
    title: "Gaming Dojo — Flushing NYC",
    description:
      "RTX-powered PCs, every major console, in-house kitchen, private streaming room. 36-29 Main St, Flushing NY. Open till 5 AM weekends.",
    url: SITE_URL,
    siteName: "Gaming Dojo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/golden-logo.png",
        width: 1200,
        height: 1200,
        alt: "Gaming Dojo — Flushing NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Dojo — Flushing NYC",
    description:
      "RTX-powered PCs, full console lineup, in-house kitchen, streaming room. 36-29 Main St, Flushing NY.",
    images: ["/golden-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f24" },
  ],
  colorScheme: "dark light",
};

// Runs before first paint so the page never flashes the wrong theme.
// First visit defaults to dark; user's toggle choice is persisted to localStorage.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'dark';
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`.trim();

// LocalBusiness JSON-LD — critical for Google Maps + local search results.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#business`,
  name: "Gaming Dojo",
  alternateName: "Gaming Dojo NYC",
  description:
    "Flushing, NYC's premier internet cafe and esports lounge with RTX-powered PCs, full console lineup, in-house kitchen, and a private streaming studio.",
  url: SITE_URL,
  telephone: "+1-347-946-3656",
  priceRange: "$$",
  image: `${SITE_URL}/golden-logo.png`,
  logo: `${SITE_URL}/logo-shield.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "36-29 Main St",
    addressLocality: "Flushing",
    addressRegion: "NY",
    postalCode: "11354",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.7596,
    longitude: -73.8302,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "03:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "10:00",
      closes: "05:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "12:00",
      closes: "05:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/gamingdojonyc/",
    "https://www.tiktok.com/@gamingdojonyc",
    "https://discord.gg/Gxq6HM8JKw",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="bg-sumi text-bone font-body antialiased">
        <main className="grain relative bg-sumi text-bone">
          <SiteNav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
