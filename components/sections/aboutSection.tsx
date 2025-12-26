import React from 'react'
import { Github, Calendar, Code, Users } from 'lucide-react'

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
       
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Evi
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Your one-stop platform to discover and track upcoming developer events
          </p>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              Never Miss a Dev Event Again
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Evi is built for developers who want to stay connected with the tech community. 
              Whether it&apos;s hackathons, conferences, meetups, or workshops — we&apos;ve got you covered.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Built with Next.js 16, MongoDB, and modern web technologies. 
              This project is open source and welcomes contributions from the community.
            </p>
            

            <a
              href="https://github.com/Pallavrai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              <Github size={20} />
              <span>View on GitHub</span>
            </a>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon={<Calendar className="text-purple-500" size={24} />}
              title="Track Events"
              description="Stay updated with upcoming developer events worldwide"
            />
            <FeatureCard
              icon={<Code className="text-blue-500" size={24} />}
              title="Open Source"
              description="Built with modern tech stack and open for contributions"
            />
            <FeatureCard
              icon={<Users className="text-green-500" size={24} />}
              title="Community"
              description="Connect with fellow developers and expand your network"
            />
            <FeatureCard
              icon={<Github className="text-orange-500" size={24} />}
              title="By Developers"
              description="Created by Pallav Rai for the developer community"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="mb-3">{icon}</div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      <p className="text-zinc-500 text-sm">{description}</p>
    </div>
  )
}

export default AboutSection