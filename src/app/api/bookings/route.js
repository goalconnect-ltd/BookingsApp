import clientPromise from "../../../../lib/mongodb";

export async function POST(req) {
    const data = await req.json();

const client = await clientPromise;
const db = client.db("bookingsApp");

await db.collection("bookings").insertOne(data);

return new Response(JSON.stringify({ message: "Booking saved" }), {
    status: 200,
});
 }

 export async function GET() {
    const client = await clientPromise;
    const db = client.db("bookingsApp");

const bookings = await db.collection("bookings").find({}).toArray();

return new Response(JSON.stringify(bookings), {
    status: 200,
});         
 }
















