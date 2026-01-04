"use server";

import { db } from "@/db/drizzle";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Event } from "@/types/events";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { hasPermission, Role } from "@/lib/permissions";

// Helper to get current user session
async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}

export async function getEvents() {
  const allEvents = await db.select().from(events);
  return allEvents;
}

export async function createEvent(data: Event) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized: Please sign in");
  }

  const userRole = (user.role as Role) || "user";
  
  if (!hasPermission(userRole, "event:create")) {
    throw new Error("Forbidden: You don't have permission to create events");
  }

  await db.insert(events).values(data).returning();
}

export async function deleteEvent(id: string) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized: Please sign in");
  }

  const userRole = (user.role as Role) || "user";
  
  if (!hasPermission(userRole, "event:delete")) {
    throw new Error("Forbidden: You don't have permission to delete events");
  }

  await db.delete(events).where(eq(events.id, id));
}

// Check if user can access dashboard
export async function canAccessDashboard() {
  const user = await getCurrentUser();
  
  if (!user) {
    return { allowed: false, reason: "not_authenticated" };
  }

  const userRole = (user.role as Role) || "user";
  
  if (!hasPermission(userRole, "event:dashboard")) {
    return { allowed: false, reason: "no_permission" };
  }

  return { allowed: true, role: userRole };
}
