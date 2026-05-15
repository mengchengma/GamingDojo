"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // null while we wait for hydration so server + client agree on first paint
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const initial = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={theme === "light" ? "Switch to dark" : "Switch to light"}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden",
        "rounded-full border border-ash bg-panel/60",
        "hover:border-hachimaki hover:bg-panel transition-colors duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hachimaki focus-visible:ring-offset-2 focus-visible:ring-offset-sumi",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === null ? (
          // Skeleton while resolving — keeps layout stable
          <span key="skeleton" className="size-4 opacity-0" />
        ) : theme === "light" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 45, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="size-[18px] text-hachimaki" strokeWidth={2.2} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 45, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -45, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="size-[17px] text-hachimaki" strokeWidth={2.2} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
