"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { Soup, Sandwich, CupSoda, Cookie, ChefHat } from "lucide-react";

// PLACEHOLDER MENU — replace with real items when the kitchen finalizes.
const CATEGORIES = [
  {
    Icon: Soup,
    label: "Bowls & Mains",
    sub: "Hot, made-to-order",
    placeholder: ["Loaded fried rice", "Spicy ramen", "Katsu plate"],
  },
  {
    Icon: Sandwich,
    label: "Handhelds",
    sub: "One-handed gaming food",
    placeholder: ["Banh mi", "Crispy chicken wrap", "Onigiri"],
  },
  {
    Icon: Cookie,
    label: "Snacks",
    sub: "Bites between rounds",
    placeholder: ["Karaage popcorn", "Loaded fries", "Mochi donuts"],
  },
  {
    Icon: CupSoda,
    label: "Drinks",
    sub: "Caffeinated & cold",
    placeholder: ["Boba milk tea", "Iced matcha", "Energy drinks"],
  },
];

export function DojoBites() {
  return (
    <section
      id="bites"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="06"
          eyebrow="Dojo Bites"
          title={
            <>
              Fuel that{" "}
              <span className="text-hachimaki italic">keeps up.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          A real in-house kitchen — not vending machines, not delivery. Hot
          meals, sharp snacks, and drinks that pull their weight on the
          night-shift grind.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-panel p-6 md:p-8 group hover:bg-raised transition-colors duration-200"
            >
              <c.Icon className="size-7 text-bone/65 group-hover:text-hachimaki transition-colors duration-200 mb-6" />
              <div className="font-display text-xl md:text-2xl text-bone font-medium tracking-tight">
                {c.label}
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-muted">
                {c.sub}
              </div>

              <ul className="mt-5 space-y-2 border-t border-ash pt-5">
                {c.placeholder.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-bone/75 italic font-display"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Coming-soon card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 border border-ash bg-panel/60 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
        >
          <div className="flex size-12 items-center justify-center bg-hachimaki/15 text-hachimaki rounded-full shrink-0">
            <ChefHat className="size-5" />
          </div>
          <div className="flex-1">
            <div className="font-display text-xl text-bone font-medium tracking-tight">
              Full menu landing soon
            </div>
            <p className="mt-1 text-sm text-bone/70 leading-relaxed">
              Items above are placeholders. Ask staff for today&apos;s real menu
              and specials, or follow our socials — we drop the latest dishes
              there first.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
