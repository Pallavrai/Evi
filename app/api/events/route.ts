import dbConnect from "@/lib/dbConfig";
import eventModel from "@/models/eventsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const events = await eventModel.find({});
    return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await dbConnect();
        const event = await eventModel.create(data);  
        return NextResponse.json({ event }, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}