"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { createEvent, getEvents, deleteEvent, canAccessDashboard } from "@/actions/events";
import { Event } from "@/types/events";
import { hasPermission, Role } from "@/lib/permissions";
import SplitText from "@/components/SplitText";
import Image from "next/image";
import { Plus, X, LogOut, Trash2, Calendar, Loader2, ShieldX } from "lucide-react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  const userRole = (session?.user?.role as Role) || "user";

  // Permission checks
  const canCreate = hasPermission(userRole, "event:create");
  const canDelete = hasPermission(userRole, "event:delete");
  const canViewDashboard = hasPermission(userRole, "event:dashboard");

  // Check dashboard access
  useEffect(() => {
    const checkAccess = async () => {
      if (!isPending && !session) {
        router.push("/signin");
        return;
      }

      if (session) {
        const access = await canAccessDashboard();
        if (!access.allowed) {
          setAccessDenied(true);
          setIsLoading(false);
        }
      }
    };
    checkAccess();
  }, [session, isPending, router]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      if (accessDenied) return;
      
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (session && !accessDenied) {
      fetchEvents();
    }
  }, [session, accessDenied]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canCreate) {
      alert("You don't have permission to create events");
      return;
    }
    
    setIsSubmitting(true);

    try {
      await createEvent({
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url || null,
      });

      // Refresh events list
      const updatedEvents = await getEvents();
      setEvents(updatedEvents);

      // Reset form and close modal
      setFormData({ title: "", description: "", image_url: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create event:", error);
      alert(error instanceof Error ? error.message : "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canDelete) {
      alert("You don't have permission to delete events");
      return;
    }
    
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert(error instanceof Error ? error.message : "Failed to delete event");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  // Access Denied Screen
  if (accessDenied || !canViewDashboard) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <ShieldX className="w-12 h-12 text-red-400" />
          </div>
          
          <SplitText
            text="Access Denied"
            className="text-4xl font-bold text-white mb-4"
            delay={50}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            tag="h1"
          />
          
          <p className="text-white/60 mb-8 max-w-md">
            You don&apos;t have permission to access the dashboard. 
            Please contact an administrator if you believe this is an error.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              Go Home
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Event Manager</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-sm">
                  {session?.user?.name || "User"}
                </span>
                <span className="text-white/40 text-xs capitalize">{userRole}</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <SplitText
              text="Your Events"
              className="text-4xl font-bold text-white"
              delay={50}
              duration={0.5}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              tag="h1"
            />
            <p className="text-white/50 mt-2">
              Manage and create new events for your audience
            </p>
          </div>

          {canCreate && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create Event
            </button>
          )}
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Calendar className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No events yet
            </h3>
            <p className="text-white/50 mb-6">
              {canCreate ? "Create your first event to get started" : "No events available"}
            </p>
            {canCreate && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <Plus className="w-5 h-5" />
                Create Event
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={
                      event.image_url ||
                      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                    }
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Delete Button - Only show if user has permission */}
                  {canDelete && (
                    <button
                      onClick={() => event.id && handleDelete(event.id)}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white/60 hover:text-red-400 hover:bg-red-500/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Event Modal - Only render if user has permission */}
      {isModalOpen && canCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Create New Event</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Title */}
              <div className="relative">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("title")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter event title"
                  required
                  className={`
                    w-full px-4 py-3 bg-white/5 rounded-xl
                    border transition-all duration-300 ease-out
                    text-white placeholder:text-white/30
                    focus:outline-none
                    ${
                      focusedField === "title"
                        ? "border-purple-500 bg-white/10 shadow-lg shadow-purple-500/20"
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                />
              </div>

              {/* Description */}
              <div className="relative">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Describe your event"
                  rows={4}
                  required
                  className={`
                    w-full px-4 py-3 bg-white/5 rounded-xl
                    border transition-all duration-300 ease-out
                    text-white placeholder:text-white/30
                    focus:outline-none resize-none
                    ${
                      focusedField === "description"
                        ? "border-purple-500 bg-white/10 shadow-lg shadow-purple-500/20"
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                />
              </div>

              {/* Image URL */}
              <div className="relative">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Image URL{" "}
                  <span className="text-white/30">(optional)</span>
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("image_url")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="https://example.com/image.jpg"
                  className={`
                    w-full px-4 py-3 bg-white/5 rounded-xl
                    border transition-all duration-300 ease-out
                    text-white placeholder:text-white/30
                    focus:outline-none
                    ${
                      focusedField === "image_url"
                        ? "border-purple-500 bg-white/10 shadow-lg shadow-purple-500/20"
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-4 rounded-xl font-semibold
                  transition-all duration-300 ease-out
                  relative overflow-hidden group
                  ${
                    isSubmitting
                      ? "bg-white/20 text-white/50 cursor-not-allowed"
                      : "bg-white text-black hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
                  }
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create Event
                    </>
                  )}
                </span>
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;