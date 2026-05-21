import type { Metadata } from "next";
import { DojoBites } from "@/components/sections/dojo-bites";

export const metadata: Metadata = {
  title: "Menu · Gaming Dojo",
  description:
    "Dojo Bites — in-house kitchen serving hot meals, snacks, and drinks. Fuel for the late-night grind at Gaming Dojo, Flushing NYC.",
  openGraph: {
    title: "Menu · Gaming Dojo",
    description:
      "Hot meals, snacks, and drinks from our in-house kitchen.",
    type: "website",
  },
};

export default function MenuPage() {
  return (
    <>
      {/* Top spacer for fixed nav clearance */}
      <div className="h-24 md:h-28" aria-hidden />
      <DojoBites />
    </>
  );
}
