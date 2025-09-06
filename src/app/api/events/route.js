import clientPromise from "@/lib/mongodb";


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
    const {id,title,description,date,location,category } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("events").insertOne({ id,title,description,date,location,category });

    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Insert failed" }, { status: 500 });
  }
}
