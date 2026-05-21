"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  num: string;
  /** Path prefix that, when matched against the current pathname, marks the link as active. */
  activePath?: string;
}

const NAV: NavItem[] = [
  { label: "Pricing", href: "/#pricing", num: "01" },
  { label: "Stations", href: "/#stations", num: "02" },
  { label: "Events", href: "/events", num: "03", activePath: "/events" },
  { label: "Menu", href: "/menu", num: "04", activePath: "/menu" },
  { label: "Visit", href: "/#visit", num: "05" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.activePath) return pathname === item.activePath;
    // Home-anchor links are "active" when we're on the home page
    return pathname === "/" && item.href.startsWith("/#");
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-sumi/85 backdrop-blur-md border-b border-ash"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex h-20 md:h-24 items-center justify-between">
          <Link
            href="/"
            aria-label="Gaming Dojo — home"
            className="inline-flex items-center cursor-pointer"
          >
            <Logo
              variant="wordmark"
              className="h-12 md:h-14 lg:h-16"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-2 px-4 py-2 font-display text-sm transition-colors duration-200 cursor-pointer rounded-full",
                    active
                      ? "text-bone bg-panel/60"
                      : "text-bone/75 hover:text-bone",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] transition-colors",
                      active
                        ? "text-hachimaki"
                        : "text-hachimaki/70 group-hover:text-hachimaki",
                    )}
                  >
                    {item.num}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-ash bg-panel/60 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-hachimaki animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-hachimaki" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/85">
                Open Now
              </span>
            </div>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Menu"
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 border border-ash bg-panel/80 cursor-pointer rounded-full"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden bg-sumi/95 backdrop-blur-lg border-t border-ash"
          >
            <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col gap-1">
              {NAV.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-ash py-4 cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-hachimaki">
                        {item.num}
                      </span>
                      <span
                        className={cn(
                          "font-display text-2xl tracking-tight transition-colors",
                          active
                            ? "text-hachimaki italic"
                            : "text-bone group-hover:text-hachimaki",
                        )}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span className="font-display text-bone/30">→</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
