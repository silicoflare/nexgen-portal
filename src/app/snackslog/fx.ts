"use server";

import { snacks } from "@/lib/db";
import { Snack } from "@/types";

export async function addSnack(name: string, desc: string) {
  await snacks.insertOne({
    id: Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) =>
      b.toString(16).padStart(2, "0")
    ).join(""),
    name,
    desc,
    log: new Array(35).fill(0),
  });
}

export async function getSnacksList() {
  const sn = (await snacks.find().toArray()).map((s) => {
    const { _id, ...other } = s;
    return other;
  });

  return sn as Snack[];
}

export async function deleteSnack(id: string) {
  await snacks.deleteOne({
    id,
  });
}
