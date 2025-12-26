import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.eventsModel.findMany();
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const event = await prisma.eventsModel.create({
      data,
    });
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 },
    );
  }
}
