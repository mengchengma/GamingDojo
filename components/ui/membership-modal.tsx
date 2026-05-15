"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Music2, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MembershipModalProps {
  open: boolean;
  onClose: () => void;
}

const SOCIALS = [
  {
    Icon: Instagram,
    label: "Instagram",
    handle: "@gamingdojonyc",
    href: "https://www.instagram.com/gamingdojonyc/",
    accent: "from-pink-500/20 to-orange-500/20",
  },
  {
    Icon: Music2,
    label: "TikTok",
    handle: "@gamingdojo",
    href: "https://tiktok.com",
    accent: "from-cyan-500/20 to-pink-500/20",
  },
  {
    Icon: MessageCircle,
    label: "Discord",
    handle: "Gaming Dojo",
    href: "https://discord.gg/Gxq6HM8JKw",
    accent: "from-indigo-500/20 to-blue-500/20",
  },
];

const STEPS = [
  { n: "01", text: "Follow us on any social." },
  { n: "02", text: "Show staff at check-in." },
  { n: "03", text: "Pay $8 / hr — for life." },
];

export function MembershipModal({ open, onClose }: MembershipModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          aria-hidden={!open}
        >
          <button
            type="button"
            aria-label="Close membership info"
            onClick={onClose}
            tabIndex={-1}
            className="absolute inset-0 bg-sumi/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="membership-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full max-w-xl bg-panel border border-ash rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
          >
            <div className="absolute -top-32 -right-32 size-64 rounded-full bg-hachimaki/20 blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hachimaki to-transparent pointer-events-none" />

            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 size-9 inline-flex items-center justify-center border border-ash bg-shadow hover:border-hachimaki transition-colors rounded-full cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hachimaki focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
            >
              <X className="size-4" />
            </button>

            <div className="relative p-7 md:p-10">
              <div className="inline-flex items-center gap-2 border border-ash bg-shadow px-3 py-1.5 rounded-full mb-5">
                <Clock className="size-3.5 text-hachimaki" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/85">
                  Online sign-up · coming soon
                </span>
              </div>

              <h2
                id="membership-modal-title"
                className="font-display text-3xl md:text-4xl tracking-tight italic font-medium leading-[1.05]"
              >
                For now, become a member{" "}
                <span className="text-hachimaki">at the dojo.</span>
              </h2>

              <p className="mt-4 text-bone/80 leading-relaxed">
                Online signup&apos;s on the way. Until then, the in-person flow
                takes thirty seconds:
              </p>

              <ol className="mt-7 space-y-3">
                {STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="flex items-start gap-4 text-sm md:text-base"
                  >
                    <span className="shrink-0 inline-flex items-center justify-center size-8 rounded-full bg-hachimaki/15 text-hachimaki font-mono text-xs">
                      {s.n}
                    </span>
                    <span className="text-bone/90 leading-relaxed pt-1">
                      {s.text}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 pt-6 border-t border-ash">
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-4">
                  Step 1 · pick a platform
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {SOCIALS.map(({ Icon, label, handle, href, accent }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group relative flex flex-col gap-2 bg-shadow border border-ash p-4 rounded-lg hover:border-hachimaki transition-all duration-200 cursor-pointer overflow-hidden",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                          accent,
                        )}
                      />
                      <div className="relative flex items-center justify-between">
                        <Icon className="size-5 text-bone/75 group-hover:text-hachimaki transition-colors" />
                        <ArrowUpRight className="size-3.5 text-muted group-hover:text-hachimaki transition-colors" />
                      </div>
                      <div className="relative">
                        <div className="font-display text-base text-bone font-medium">
                          {label}
                        </div>
                        <div className="font-mono text-[10px] text-muted mt-0.5">
                          {handle}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-xs text-muted leading-relaxed">
                Follow{" "}
                <a
                  href="https://www.instagram.com/gamingdojonyc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hachimaki hover:underline"
                >
                  @gamingdojonyc
                </a>{" "}
                — we&apos;ll post the moment online signup goes live.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
