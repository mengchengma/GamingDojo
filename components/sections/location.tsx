"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Phone, Train, Navigation } from "lucide-react";

const ADDRESS = "36-29 Main St, Flushing, NY 11354";
const PHONE_DISPLAY = "(347) 946-3656";
const PHONE_RAW = "+13479463656";
const MAP_QUERY = encodeURIComponent(ADDRESS);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export function Location() {
  return (
    <section
      id="visit"
      className="relative isolate py-24 md:py-32 border-t border-ash bg-shadow"
    >
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="05"
          eyebrow="Visit"
          title={
            <>
              The heart of <span className="text-hachimaki italic">Flushing.</span>
            </>
          }
        />

        <p className="mt-6 max-w-2xl text-bone/75 text-base md:text-lg leading-relaxed">
          Three minutes from the 7 train. Step out at Main St, walk a block —
          you&apos;re here.
        </p>

        <div className="mt-14 grid lg:grid-cols-12 gap-px bg-ash border border-ash rounded-lg overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative bg-panel min-h-[420px]"
          >
            <iframe
              title="Gaming Dojo location"
              src={MAP_EMBED}
              className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-[0.95] sepia-[0.15] [color-scheme:dark]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/5" />
          </motion.div>

          <div className="lg:col-span-5 bg-panel p-8 md:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-8">
              <Detail
                Icon={MapPin}
                eyebrow="Address"
                line1="36-29 Main St"
                line2="Flushing, NY 11354"
              />
              <Detail
                Icon={Phone}
                eyebrow="Phone"
                line1={PHONE_DISPLAY}
                line2="Walk-ins · reservations · groups"
                href={`tel:${PHONE_RAW}`}
              />
              <Detail
                Icon={Train}
                eyebrow="Transit"
                line1="7 Train · Flushing-Main St"
                line2="3-min walk · multiple bus lines"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">
                  <Navigation className="size-4" />
                  Get directions
                </Button>
              </a>
              <a href={`tel:${PHONE_RAW}`}>
                <Button variant="outline">
                  <Phone className="size-4" />
                  Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DetailProps {
  Icon: typeof MapPin;
  eyebrow: string;
  line1: string;
  line2: string;
  href?: string;
}

function Detail({ Icon, eyebrow, line1, line2, href }: DetailProps) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex size-10 items-center justify-center border border-ash bg-shadow shrink-0 rounded-md">
        <Icon className="size-4 text-hachimaki" />
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
          {eyebrow}
        </div>
        <div className="font-display text-xl md:text-2xl tracking-tight text-bone mt-1 font-medium">
          {line1}
        </div>
        <div className="text-sm text-bone/65 mt-0.5">{line2}</div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity cursor-pointer">
      {content}
    </a>
  ) : (
    content
  );
}
