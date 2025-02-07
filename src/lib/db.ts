import { MongoClient } from "mongodb";
import env from "../../env";

export const client = new MongoClient(env.DATABASE_URL);
const db = client.db("nexgen");

export const users = db.collection("users");
export const teams = db.collection("teams");
export const students = db.collection("students");
export const snacks = db.collection("snacks");
export const coupons = db.collection("coupons");
