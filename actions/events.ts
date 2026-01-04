"use server";

import { db } from "@/db/drizzle";
import { events } from "@/db/schema";
import { eq,not } from "drizzle-orm";
import { Event } from "@/types/events";

export async function getEvents() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay
  const allEvents = await db.select().from(events);
  return allEvents;
}

export async function createEvent(data: Event) {
   await db.insert(events).values(data).returning();
}

export async function deleteEvent(id: string) {
  await db.delete(events).where(eq(events.id, id));
}
