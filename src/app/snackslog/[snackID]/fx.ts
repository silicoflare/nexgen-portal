"use server";

import { snacks } from "@/lib/db";
import { Snack } from "@/types";

export async function getSnackInfo(id: string) {
  const sn = (await snacks.findOne({
    id,
  }))!;

  const { _id, ...other } = sn;

  return other as Snack;
}

export async function updateInfo(id: string, index: number) {
  await snacks.updateOne(
    {
      id,
    },
    { $bit: { [`log.${index}`]: { xor: 1 } } }
  );
}
