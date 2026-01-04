import EventsCards from "@/components/EventsCard";
import { getEvents } from "@/actions/events";
import { Suspense } from "react";

const EventsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-900"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 bg-zinc-800 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
          </div>

          {/* Content Skeleton */}
          <div className="p-5 space-y-3">
            {/* Title Skeleton */}
            <div className="relative h-6 w-3/4 bg-zinc-800 rounded overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
            </div>

            {/* Description Skeleton - 2 lines */}
            <div className="space-y-2">
              <div className="relative h-4 w-full bg-zinc-800 rounded overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
              </div>
              <div className="relative h-4 w-2/3 bg-zinc-800 rounded overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EventsSection = () => {
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

        <Suspense fallback={<EventsCardSkeleton />}>
          <EventsCards eventsPromise={eventsPromise} />
        </Suspense>
      </div>
    </section>
  );
};

export default EventsSection;

