"use server";

import { decrypt, importKey } from "@/lib/crypto";
import env from "../../../env";

export async function getTeamNumber(qr: string) {
  const key = await importKey(env.ENTRY_KEY);
  let dec = "";

  try {
    dec = await decrypt(qr, key);
  } catch (err) {
    return 401;
  }

  const match = dec.match(/T(\d{1,2})_ENTRY/);

  if (!match) {
    return 404;
  }

  return parseInt(match[1]);
}
