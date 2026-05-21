import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Passes } from "@/components/sections/passes";
import { StreamStudio } from "@/components/sections/stream-studio";
import { BattleStations } from "@/components/sections/battle-stations";
import { Games } from "@/components/sections/games";
import { Hours } from "@/components/sections/hours";
import { Location } from "@/components/sections/location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pricing />
      <Passes />
      <StreamStudio />
      <BattleStations />
      <Games />
      <Hours />
      <Location />
    </>
  );
}
