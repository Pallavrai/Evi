"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getEvents } from "@/services/events";

import type { Event } from "@/types/events";

const EventsCards = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  // this is not the best way to fetch data in client components
  // it should be replaced with SWR or React Query for better data fetching and caching
  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error)
    return (
      <div className="text-red-500 text-center">
        <p>Error loading events: {error}</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        return (
          <div
            key={`${event.id}-`}
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
