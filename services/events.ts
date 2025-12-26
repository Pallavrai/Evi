import { Event } from "@/types/events";
import { prisma } from "@/lib/prisma";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function getEvents(): Promise<Event[]> {
  const events = await prisma.eventsModel.findMany();
  
  return events;
}

export async function createEvent(event: Event): Promise<Event> {
  const res = await fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  const data = await res.json();
  return data.event;
}