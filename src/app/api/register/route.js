import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const runtime = "nodejs"; 

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    console.log(name, email, password);

    if (!name || !email || !password) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return Response.json({ message: "User registered", user: result }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
}
