import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the Gaming Dojo website. Pricing, hours, and event details are kept current but can change — the venue has the final word.",
  openGraph: {
    title: "Terms of Service · Gaming Dojo",
    description:
      "The terms for using the Gaming Dojo website and what to expect at the venue.",
    type: "website",
  },
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "June 3, 2026";

export default function TermsPage() {
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
              Terms of <span className="text-hachimaki italic">Service</span>
            </h1>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              Last updated · {LAST_UPDATED}
            </p>
          </header>

          <p className="mt-10 text-lg text-bone/85 leading-relaxed">
            These terms cover your use of the Gaming Dojo website. Visiting the
            lounge itself is also subject to staff direction and the house rules
            posted on-site.
          </p>

          <div className="mt-12 space-y-10">
            <Block heading="About this site">
              <p>
                This website is informational — it lists our hours, pricing,
                services, and events. We work to keep it accurate, but details can
                change without notice. For anything that matters to your plans,
                the final word on pricing and availability is at the venue.
              </p>
            </Block>

            <Block heading="Pricing and membership">
              <p>
                Posted rates — $10/hr standard, $8/hr for members — and pass
                prices are current as of the last update and may change. Member
                pricing requires following us on one of our social platforms and
                showing staff at check-in, and is subject to verification.
              </p>
            </Block>

            <Block heading="Events and tournaments">
              <p>
                Event schedules can shift, sell out, or be capped by space.
                Sign-ups and brackets run through our Discord, and entry may be
                limited by capacity. We&apos;ll always do our best to keep the
                calendar current.
              </p>
            </Block>

            <Block heading="House rules and conduct">
              <p>
                Inside the lounge, treat the space, the equipment, and other
                players with respect. Staff may ask anyone to leave for damaging
                gear, harassing others, or otherwise disrupting the room. Use of
                the stations and consoles is at your own risk.
              </p>
            </Block>

            <Block heading="Accuracy and “as is”">
              <p>
                We provide this site&apos;s information &ldquo;as is&rdquo; and do
                our best to keep it correct, but we don&apos;t warrant that it&apos;s
                complete or error-free, and we&apos;re not liable for decisions
                made solely on it. When in doubt, give us a call first.
              </p>
            </Block>

            <Block heading="Third-party links">
              <p>
                We link to Instagram, TikTok, Discord, Google Maps, and a phone
                dialer. We don&apos;t control and aren&apos;t responsible for the
                content or services on those third-party platforms.
              </p>
            </Block>

            <Block heading="Intellectual property">
              <p>
                The Gaming Dojo name, logo, and the content on this site belong to
                Gaming Dojo. Please don&apos;t copy or reuse them without our
                permission.
              </p>
            </Block>

            <Block heading="Changes to these terms">
              <p>
                We may update these terms from time to time. When we do,
                we&apos;ll change the &ldquo;last updated&rdquo; date above.
                Continued use of the site means you accept the current version.
              </p>
            </Block>

            <Block heading="Governing law">
              <p>
                These terms are governed by the laws of the State of New York.
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
                , in person at 36-29 Main St, Flushing, NY 11354, or on{" "}
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
