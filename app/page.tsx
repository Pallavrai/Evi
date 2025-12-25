import { Suspense } from "react";
import HeroSection from "@/components/sections/heroSection";
import EventsSection from "@/components/sections/eventsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<EventsLoading />}>
        <EventsSection />
      </Suspense>
    </main>
  );
}

function EventsLoading() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Upcoming Events
          </h2>
          <p className="text-zinc-400">Loading events...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-zinc-800 h-72 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
