/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Database,
  HardDrive,
  Monitor,
  Maximize2,
  Gauge,
  Timer,
  RefreshCw,
  Keyboard,
  Mouse,
  Headphones,
  Square,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicePoint {
  head: string;
  body: React.ReactNode;
}

interface SpecCard {
  Icon: LucideIcon;
  label: string;
  value: string;
  /** When true, the card gets the amber halo treatment */
  featured?: boolean;
}

interface Service {
  title: string;
  Icon: LucideIcon;
  /** Optional image at /specs/<filename>.jpg — see public/specs/README.md */
  image?: string;
  alt: string;
  specLine: React.ReactNode;
  /** Use either points (description bullets) OR specs (mini cards). */
  points?: ServicePoint[];
  specs?: SpecCard[];
}

// Inline highlight for the marquee spec — bold amber + soft tint background.
const RTX = (
  <span className="font-bold text-hachimaki bg-hachimaki/10 px-1.5 py-0.5 rounded -my-0.5">
    RTX 5070
  </span>
);

const SERVICES: Service[] = [
  {
    title: "Gaming PCs",
    Icon: Cpu,
    image: "/specs/pc-tower.jpg",
    alt: "Gaming Dojo PC tower with RGB lighting",
    specLine: (
      <>
        Same hardware on every station · {RTX} powered
      </>
    ),
    specs: [
      { Icon: Zap, label: "GPU", value: "RTX 5070", featured: true },
      { Icon: Cpu, label: "CPU", value: "AMD Ryzen 7" },
      { Icon: Database, label: "RAM", value: "32 GB DDR5" },
      { Icon: HardDrive, label: "Storage", value: "1 TB NVMe" },
    ],
  },
  {
    title: "MSI MAG 276CXF",
    Icon: Monitor,
    image: "/specs/msi-276cxf.jpg",
    alt: "MSI MAG 276CXF 280Hz esports monitor",
    specLine: <>Esports-grade display · tear-free under load</>,
    specs: [
      { Icon: Gauge, label: "Refresh", value: "280 Hz", featured: true },
      { Icon: Maximize2, label: "Size", value: "27 inch" },
      { Icon: Timer, label: "Response", value: "0.5 ms" },
      { Icon: RefreshCw, label: "Sync", value: "Adaptive" },
    ],
  },
  {
    title: "Logitech G stack",
    Icon: Keyboard,
    image: "/specs/accessories.jpg",
    alt: "Logitech G keyboard, mouse, headset, and mousepad",
    specLine: <>Tournament-ready peripherals · same on every station</>,
    specs: [
      { Icon: Mouse, label: "Mouse", value: "G502 HERO", featured: true },
      { Icon: Keyboard, label: "Keyboard", value: "G413 SE" },
      { Icon: Headphones, label: "Headset", value: "G432" },
      { Icon: Square, label: "Mousepad", value: "G XL" },
    ],
  },
];

const CONSOLES = [
  {
    name: "Xbox Series X",
    tag: "120 FPS · Game Pass library",
    dot: "#22c55e",
  },
  {
    name: "PlayStation 5",
    tag: "DualSense haptics · PS5 exclusives",
    dot: "#3b82f6",
  },
  {
    name: "Nintendo Switch",
    tag: "Smash, Mario Kart, Zelda",
    dot: "#f43f5e",
  },
];

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const reverse = index % 2 === 1;
  const [imgFailed, setImgFailed] = useState(false);
  const showPlaceholder = !service.image || imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "grid lg:grid-cols-12 gap-6 lg:gap-12 items-center",
        reverse && "lg:[&>*:first-child]:order-2",
      )}
    >
      {/* Image side */}
      <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden border border-ash bg-panel">
        {!showPlaceholder ? (
          <>
            <img
              src={service.image}
              alt={service.alt}
              onError={() => setImgFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sumi/65 to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-panel via-shadow to-panel">
            <service.Icon className="size-12 text-bone/15" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted text-center px-4">
              Drop {service.image?.split("/").pop()} in /public/specs/
            </span>
          </div>
        )}
      </div>

      {/* Content side */}
      <div className="lg:col-span-6 flex flex-col">
        <div className="inline-flex items-center gap-2 mb-3">
          <service.Icon className="size-4 text-hachimaki" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-hachimaki">
            {`0${index + 1}`} · Service
          </span>
        </div>

        <h3 className="font-display text-4xl md:text-5xl tracking-tight uppercase font-bold leading-[0.95]">
          {service.title}
        </h3>

        <div className="mt-4 font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-bone/65 leading-relaxed">
          {service.specLine}
        </div>

        {service.specs && service.specs.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 border-t border-ash pt-7">
            {service.specs.map((s) => (
              <div
                key={s.label}
                className={cn(
                  "relative p-4 md:p-5 border rounded-lg overflow-hidden transition-colors duration-200",
                  s.featured
                    ? "border-hachimaki/50 bg-hachimaki/[0.07]"
                    : "border-ash bg-shadow hover:border-iron",
                )}
              >
                {s.featured && (
                  <div className="absolute -top-12 -right-12 size-32 rounded-full bg-hachimaki/15 blur-2xl pointer-events-none" />
                )}
                <div className="relative flex items-center gap-2">
                  <s.Icon
                    className={cn(
                      "size-4",
                      s.featured ? "text-hachimaki" : "text-bone/60",
                    )}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    {s.label}
                  </span>
                </div>
                <div
                  className={cn(
                    "relative mt-2 font-display text-xl md:text-2xl font-bold tracking-tight",
                    s.featured ? "text-hachimaki" : "text-bone",
                  )}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        ) : service.points && service.points.length > 0 ? (
          <div className="mt-8 space-y-7 border-t border-ash pt-7">
            {service.points.map((p) => (
              <div key={p.head}>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-bone font-semibold">
                  {p.head}
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <span className="size-3 rounded-full border-2 border-hachimaki bg-hachimaki/25 mt-1.5 shrink-0" />
                  <p className="text-bone/80 leading-relaxed text-sm md:text-base">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export function BattleStations() {
  return (
    <section
      id="stations"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="02"
          eyebrow="Our services"
          title={
            <>
              Built for{" "}
              <span className="text-hachimaki italic">smooth gameplay.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          A premium gaming experience powered by high-performance PCs,
          competitive hardware, and modern consoles. Every station is built
          for smooth gameplay, fast response times, and consistency — whether
          you&apos;re competing, practicing, or playing for fun.
        </p>

        <div className="mt-16 md:mt-20 space-y-20 md:space-y-28">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Compact console lineup — sub-section under stations */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-hachimaki">
                <Gamepad2 className="size-3.5" />
                Console lineup
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight mt-2 font-medium">
                Xbox, PlayStation,{" "}
                <span className="italic">Switch.</span>
              </h3>
            </div>
            <div className="font-mono text-xs text-muted uppercase tracking-[0.3em]">
              Same hourly rate · same station
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
            {CONSOLES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-panel p-5 md:p-6 group hover:bg-raised transition-colors duration-200"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="size-2 rounded-full shrink-0"
                    style={{ background: c.dot }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Console
                  </span>
                </div>
                <div className="font-display text-xl md:text-2xl text-bone font-medium tracking-tight">
                  {c.name}
                </div>
                <div className="mt-1 text-sm text-bone/70 leading-relaxed">
                  {c.tag}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
