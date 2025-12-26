"use client";

import { useState } from "react";
import { Home, User, Settings, Mail, Menu } from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", href: "/" },
  { icon: <User size={20} />, label: "About", href: "/#about" }, 
  { icon: <Mail size={20} />, label: "Contact", href: "/contact" },
  { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
        {navItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                transition-all duration-300 ease-out
                ${hoveredIndex === index 
                  ? "bg-white text-black scale-110" 
                  : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              {item.icon}
            </div>
            
            {/* Tooltip */}
            <span
              className={`
                absolute -top-10 left-1/2 -translate-x-1/2
                px-3 py-1.5 rounded-lg
                bg-white text-black text-sm font-medium
                whitespace-nowrap
                transition-all duration-200
                ${hoveredIndex === index 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-2 pointer-events-none"
                }
              `}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}