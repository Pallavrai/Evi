import { Suspense } from "react";
import HeroSection from "@/components/sections/heroSection";
import EventsSection from "@/components/sections/eventsSection";
import AboutSection from "@/components/sections/aboutSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<div className="text-center py-16 text-zinc-400">Loading events...</div>}>
        <EventsSection />
      </Suspense>
      <AboutSection />
    </main>
  );
}
