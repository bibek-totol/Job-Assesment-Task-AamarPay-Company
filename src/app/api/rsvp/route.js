

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, eventId } = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("rsvp");

    
    const existing = await collection.findOne({ userId, eventId });
    if (existing) {
      return NextResponse.json({ success: false, message: "Already interested" }, { status: 400 });
    }

    const result = await collection.insertOne({
      userId,
      eventId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, rsvp: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
