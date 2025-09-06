import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";


export const runtime = "nodejs"; 
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);


    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    return Response.json({ message: "Login successful", user}, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
