import { MongoClient } from "mongodb";
import env from "../../env";

const client = new MongoClient(env.DATABASE_URL);
const db = client.db("nexgen");

export const users = db.collection("users");
