import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Gaming Dojo — Flushing's Cozy Gaming Lounge",
  description:
    "RTX 5070 battle stations, 280Hz monitors, Xbox / PS5 / Switch, in-house kitchen, and streaming rooms in the heart of Flushing, NYC. Follow us on social to unlock member pricing.",
  keywords: [
    "Gaming Dojo",
    "Flushing internet cafe",
    "NYC gaming lounge",
    "PC cafe Flushing",
    "Queens gaming cafe",
  ],
  openGraph: {
    title: "Gaming Dojo — Flushing NYC",
    description:
      "PC, console, kitchen, and streaming rooms. 36-29 Main St, Flushing NY.",
    type: "website",
  },
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
