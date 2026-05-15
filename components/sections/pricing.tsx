"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { MembershipModal } from "@/components/ui/membership-modal";
import { motion } from "framer-motion";
import { Check, Instagram, Music2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    rank: "Drop-in",
    name: "Casual",
    price: 10,
    tagline: "No commitment. Walk in, plug in, play.",
    features: [
      "Full access to all gaming PCs",
      "All consoles (Xbox, PS5, Switch)",
      "Logitech G peripherals & 280 Hz monitors",
    ],
    cta: { label: "Walk-in welcome", variant: "outline" as const },
    highlight: false,
  },
  {
    rank: "Member",
    name: "Regular",
    price: 8,
    tagline: "Follow us. Earn the discount. Forever.",
    features: [
      "$2 / hour off, every visit",
      "First-look at tournament signups",
      "Free with your social follow — no app, no card",
    ],
    cta: { label: "Become a member", variant: "primary" as const },
    highlight: true,
  },
];

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", handle: "@gamingdojonyc", href: "https://www.instagram.com/gamingdojonyc/" },
  { Icon: Music2, label: "TikTok", handle: "@gamingdojo", href: "https://tiktok.com" },
  { Icon: MessageCircle, label: "Discord", handle: "Gaming Dojo", href: "https://discord.gg/Gxq6HM8JKw" },
];

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section
      id="pricing"
      className="relative isolate py-24 md:py-32 border-t border-ash"
    >
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="01"
          eyebrow="Pricing"
          title={
            <>
              Two tiers. <span className="text-hachimaki italic">One discount.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          Pay-as-you-play. No subscriptions, no minimums, no nonsense. Members
          save $2/hour just for following us — that&apos;s it.
        </p>

        <div className="mt-14 grid md:grid-cols-2 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.rank}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card
                className={cn(
                  "h-full p-8 md:p-10 border-0 relative overflow-hidden rounded-none",
                  tier.highlight ? "bg-panel" : "bg-shadow",
                )}
              >
                {tier.highlight && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hachimaki to-transparent" />
                    <div className="absolute -top-32 -right-32 size-64 rounded-full bg-hachimaki/10 blur-3xl" />
                  </>
                )}

                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      {tier.rank}
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl mt-1 text-bone italic font-medium">
                      {tier.name}
                    </h3>
                  </div>
                  {tier.highlight && (
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 bg-hachimaki text-sumi rounded-full">
                      Save 20%
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-7xl md:text-8xl text-bone leading-none font-medium">
                    ${tier.price}
                  </span>
                  <span className="font-mono text-sm text-muted ml-1">
                    /hour
                  </span>
                </div>
                <p className="text-bone/75 mb-8 leading-relaxed">
                  {tier.tagline}
                </p>

                <ul className="space-y-3 mb-10">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          "size-4 mt-0.5 shrink-0",
                          tier.highlight ? "text-hachimaki" : "text-bone/60",
                        )}
                      />
                      <span className="text-bone/85 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.cta.variant}
                  size="lg"
                  className="w-full"
                  onClick={
                    tier.highlight
                      ? () => setModalOpen(true)
                      : () => {
                          window.location.hash = "#visit";
                        }
                  }
                >
                  {tier.cta.label}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 border border-ash bg-shadow/60 p-8 md:p-10 rounded-lg">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-hachimaki mb-3">
                How to become a member
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight italic">
                Follow. Show staff. Pay $8/hr.
              </h3>
              <p className="mt-4 text-bone/75 max-w-md leading-relaxed">
                That&apos;s the whole flow. Hit follow on any of our socials,
                show our staff at check-in, and the member rate kicks in. No
                fees, no expiry.
              </p>
            </div>
            <div className="md:col-span-7 grid sm:grid-cols-3 gap-px bg-ash border border-ash rounded-md overflow-hidden">
              {SOCIALS.map(({ Icon, label, handle, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 bg-panel p-6 hover:bg-raised transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="size-6 text-bone/70 group-hover:text-hachimaki transition-colors" />
                  <div>
                    <div className="font-display text-xl text-bone font-medium">
                      {label}
                    </div>
                    <div className="font-mono text-xs text-muted mt-0.5">
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <MembershipModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
