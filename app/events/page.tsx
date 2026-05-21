import type { Metadata } from "next";
import { Events } from "@/components/sections/events";
import { TournamentsCTA } from "@/components/sections/tournaments-cta";

export const metadata: Metadata = {
  title: "Events · Gaming Dojo",
  description:
    "Weekly brackets, casual co-op nights, and special tournaments at Gaming Dojo in Flushing, NYC. Check the full calendar and sign up on Discord.",
  openGraph: {
    title: "Events · Gaming Dojo",
    description:
      "Weekly brackets, co-op nights, and tournaments at Flushing's gaming lounge.",
    type: "website",
  },
};

export default function EventsPage() {
  return (
    <>
      {/* Top spacer for fixed nav clearance — match the hero pt values */}
      <div className="h-24 md:h-28" aria-hidden />
      <Events />
      <TournamentsCTA />
    </>
  );
}
