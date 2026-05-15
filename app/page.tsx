import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Passes } from "@/components/sections/passes";
import { StreamStudio } from "@/components/sections/stream-studio";
import { BattleStations } from "@/components/sections/battle-stations";
import { Games } from "@/components/sections/games";
import { DojoBites } from "@/components/sections/dojo-bites";
import { Hours } from "@/components/sections/hours";
import { TournamentsCTA } from "@/components/sections/tournaments-cta";
import { Partners } from "@/components/sections/partners";
import { Location } from "@/components/sections/location";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className="grain relative bg-sumi text-bone">
      <SiteNav />
      <Hero />
      <Pricing />
      <Passes />
      <StreamStudio />
      <BattleStations />
      <Games />
      <DojoBites />
      <Hours />
      <TournamentsCTA />
      <Partners />
      <Location />
      <Footer />
    </main>
  );
}
