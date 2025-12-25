import React from 'react'
import EventsCard from '@/components/EventsCard'
import { getEvents } from '@/services/events'

const EventsSection = async () => {

    const eventsData = await getEvents();
    
	return (
		<section className="py-16 px-6">
			<div className="max-w-6xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Upcoming Events
					</h2>
					<p className="text-zinc-400 max-w-2xl mx-auto">
						Discover exciting events happening near you. Join us for unforgettable
						experiences.
					</p>
				</div>

				{/* Events Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{eventsData.map((event, index) => (
						<EventsCard
							key={index}
							title={event.title}
							description={event.description}
							imageUrl={event.imageUrl}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default EventsSection