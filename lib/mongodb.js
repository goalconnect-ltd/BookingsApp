import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use global variable to preserve connection across hot reloads
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri); // ⚠️ NO options here
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri); // ⚠️ NO options here
  clientPromise = client.connect();
}

export default clientPromise;