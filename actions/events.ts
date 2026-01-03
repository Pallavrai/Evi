"use server";

import { db } from "@/db/drizzle";
import { events } from "@/db/schema";
import { eq,not } from "drizzle-orm";
import { Event } from "@/types/events";

export async function getEvents() {
  const allEvents = await db.select().from(events);
  return allEvents;
}

export async function createEvent(data: Event) {
   await db.insert(events).values(data).returning();
}

export async function deleteEvent(id: string) {
  await db.delete(events).where(eq(events.id, id));
}
