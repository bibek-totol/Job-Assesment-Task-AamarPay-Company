import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const events = await db.collection("events").find({}).toArray();

    return Response.json(events);
  } catch (error) {
    return Response.json({ error: "Database connection failed" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { title, description, date, location, category } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("events").insertOne({
      title,
      description,
      date,
      location,
      category,
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Insert failed" }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    const { id, title, description, date, location, category } = await req.json();

    if (!id) {
      return Response.json({ error: "Event ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("events").updateOne(
      { id },
      { $set: { title, description, date, location, category } }
    );

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "Event ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("events").deleteOne({
      id
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
