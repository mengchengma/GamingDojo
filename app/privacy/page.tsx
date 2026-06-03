import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Gaming Dojo handles your information. The short version: this site collects no personal data, runs no analytics, and uses no tracking cookies.",
  openGraph: {
    title: "Privacy Policy · Gaming Dojo",
    description:
      "This site collects no personal data, runs no analytics, and uses no tracking cookies.",
    type: "website",
  },
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "June 3, 2026";

export default function PrivacyPage() {
  return (
    <>
      {/* Top spacer for fixed nav clearance */}
      <div className="h-24 md:h-28" aria-hidden />

      <article className="relative isolate py-12 md:py-16">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <header className="border-b border-ash pb-8 md:pb-10">
            <div className="flex items-center gap-4 font-mono text-xs text-muted">
              <span className="uppercase tracking-[0.32em]">Legal</span>
              <span className="h-px flex-1 max-w-12 bg-ash" />
            </div>
            <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Privacy <span className="text-hachimaki italic">Policy</span>
            </h1>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              Last updated · {LAST_UPDATED}
            </p>
          </header>

          <p className="mt-10 text-lg text-bone/85 leading-relaxed">
            Gaming Dojo runs a gaming lounge in Flushing, NYC — and this website
            to tell you about it. We keep this policy short because our data
            practices are simple: the site doesn&apos;t ask you for personal
            information, and we don&apos;t track you.
          </p>

          <div className="mt-12 space-y-10">
            <Block heading="The short version">
              <ul className="space-y-2.5">
                {[
                  "No accounts, no sign-up forms, and no contact forms on this site.",
                  "No analytics, no advertising networks, and no tracking cookies.",
                  "The only thing we store on your device is your dark/light theme choice.",
                  "We never sell, rent, or trade information about you.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 shrink-0 text-hachimaki">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block heading="What this website collects">
              <p>
                Nothing directly. There are no accounts to create and no forms to
                fill out, so the site never asks you for your name, email, or any
                other personal detail.
              </p>
              <p>
                The only data stored is a single{" "}
                <span className="text-bone font-medium">theme preference</span>{" "}
                (dark or light mode), saved in your browser&apos;s local storage
                so the site remembers your choice on your next visit. It stays on
                your device and is never sent to us or anyone else.
              </p>
            </Block>

            <Block heading="Embedded Google Maps">
              <p>
                Our location section loads an interactive map from Google. When
                that map loads, Google may receive your IP address and set its own
                cookies, governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hachimaki underline-offset-4 hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                . That processing is Google&apos;s, not ours.
              </p>
            </Block>

            <Block heading="Links to other platforms">
              <p>
                We link out to our Instagram, TikTok, and Discord, and to a phone
                dialer and Google Maps. Once you leave our site, the privacy
                policy of that company applies — we don&apos;t control what they
                collect.
              </p>
            </Block>

            <Block heading="At the cafe">
              <p>
                When you visit in person, becoming a member just means following
                us on social media and showing staff at check-in. Payments are
                taken at the counter through our point-of-sale system.
              </p>
            </Block>

            <Block heading="Changes to this policy">
              <p>
                If our practices change, we&apos;ll update this page and the
                &ldquo;last updated&rdquo; date at the top. That&apos;s the best
                way to know where things stand.
              </p>
            </Block>

            <Block heading="Questions?">
              <p>
                Reach us by phone at{" "}
                <a
                  href="tel:+13479463656"
                  className="text-hachimaki underline-offset-4 hover:underline"
                >
                  (347) 946-3656
                </a>
                , ask a staff member in person at 36-29 Main St, Flushing, NY
                11354, or message us on{" "}
                <a
                  href="https://discord.gg/Gxq6HM8JKw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hachimaki underline-offset-4 hover:underline"
                >
                  Discord
                </a>
                .
              </p>
            </Block>
          </div>

          <div className="mt-14 pt-8 border-t border-ash">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-display text-hachimaki hover:text-bone transition-colors cursor-pointer"
            >
              ← Back to Gaming Dojo
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl md:text-3xl tracking-tight font-medium">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-bone/75 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
