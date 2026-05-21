import { Logo } from "@/components/ui/logo";
import { Instagram, Music2, MessageCircle, MapPin, Phone } from "lucide-react";

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gamingdojonyc/" },
  { Icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@gamingdojonyc" },
  { Icon: MessageCircle, label: "Discord", href: "https://discord.gg/Gxq6HM8JKw" },
];

const SECTIONS = [
  {
    title: "Visit",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Stations", href: "/#stations" },
      { label: "Hours", href: "/#hours" },
      { label: "Location", href: "/#visit" },
    ],
  },
  {
    title: "Play",
    links: [
      { label: "Games", href: "/#games" },
      { label: "Streaming Studio", href: "/#studio" },
      { label: "Events", href: "/events" },
      { label: "Menu", href: "/menu" },
      { label: "Tournaments", href: "https://discord.gg/Gxq6HM8JKw" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate border-t border-ash bg-shadow">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center">
              <Logo variant="wordmark" className="h-16 md:h-20" />
            </div>
            <p className="mt-6 max-w-md text-bone/75 leading-relaxed">
              Flushing&apos;s coziest gaming lounge. RTX-powered PCs, full
              console lineup, in-house kitchen, and a streaming room. Open till
              5 AM on weekends.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-bone/85">
                <MapPin className="size-4 text-hachimaki shrink-0" />
                <span>36-29 Main St, Flushing, NY 11354</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-bone/85">
                <Phone className="size-4 text-hachimaki shrink-0" />
                <a
                  href="tel:+13479463656"
                  className="hover:text-bone transition-colors cursor-pointer"
                >
                  (347) 946-3656
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex size-10 items-center justify-center border border-ash bg-panel hover:border-hachimaki transition-colors duration-200 cursor-pointer rounded-md"
                >
                  <Icon className="size-4 text-bone/70 group-hover:text-hachimaki transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-hachimaki mb-5">
                {section.title}
              </div>
              <ul className="space-y-3">
                {section.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-bone/75 hover:text-hachimaki transition-colors duration-200 cursor-pointer"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <div className="border border-ash bg-panel p-6 rounded-lg">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-hachimaki mb-3">
                Members
              </div>
              <div className="font-display text-2xl tracking-tight font-medium italic">
                Save $2/hr forever
              </div>
              <p className="mt-3 text-sm text-bone/75 leading-relaxed">
                Follow us on any platform, show staff at check-in, lock in
                $8/hr for life.
              </p>
              <a
                href="/#pricing"
                className="mt-4 inline-flex items-center gap-2 font-display text-sm text-hachimaki hover:text-bone transition-colors cursor-pointer"
              >
                See pricing →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ash flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            © {new Date().getFullYear()} Gaming Dojo. All rights reserved.
          </div>
          <div className="flex items-center gap-6 uppercase tracking-[0.3em]">
            <span>Flushing · NYC</span>
            <span>Est. 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
