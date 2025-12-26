import EventsCards from "@/components/EventsCard";
import { getEvents } from "@/services/events";
import { Suspense } from "react";

const EventsSection = async () => {
  "use cache";
  const eventsPromise = getEvents(); // this promise fires on creation so
  // the work starts immediately
  //  i removed await so that the html shell below can reach the client faster

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Upcoming Events
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover exciting events happening near you. Join us for
            unforgettable experiences.
          </p>
        </div>

        {/* Events Grid */}
        {/* this portion will show fallback on client until the data from the passed promise resolves  */}

        <Suspense fallback={<div>Loading events...</div>}>
          <EventsCards eventsPromise={eventsPromise} />
        </Suspense>
      </div>
    </section>
  );
};

export default EventsSection;
