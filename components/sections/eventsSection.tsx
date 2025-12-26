import EventsCards from "@/components/EventsCard";

const EventsSection = async () => {
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
        <EventsCards />
      </div>
    </section>
  );
};

export default EventsSection;
