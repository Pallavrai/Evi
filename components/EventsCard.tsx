import React from 'react'
import Image from 'next/image'

interface EventsCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const EventsCard = ({ title, description, imageUrl }: EventsCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
      </div>
    </div>
  )
}

export default EventsCard