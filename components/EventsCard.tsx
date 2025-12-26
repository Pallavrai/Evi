import { use } from "react";
import Image from "next/image";

import { Event } from "@/types/events";

interface EventsCardProps {
  eventsPromise: Promise<Event[]>;
}

const EventsCards = ({ eventsPromise }: EventsCardProps) => {
  const events = use(eventsPromise); // react-19 utiliy that lets us unwrap promises in client components
  // client components cannot be async so we use this utility to unwrap the promise
  // but the component using it should be wrapped in suspense so that the loading state can be handled

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        return (
          <div
            key={event.id}
            className="group relative overflow-hidden rounded-xl  from-zinc-900 to-zinc-800 border border-zinc-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={

                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                }
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0  from-zinc-900 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                {event.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                {event.description}
              </p>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-x-0 -bottom-px h-px  from-transparent via-purple-500 to-transparent" />
              <div className="absolute inset-y-0 -right-px w-px  from-transparent via-purple-500 to-transparent" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventsCards;

