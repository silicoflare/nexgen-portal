"use server";

import { teams } from "@/lib/db";

export async function getQRContent(id: string) {
  const teamNo = parseInt(Array.from(id.matchAll(/N2T(\d{2})[ABCD]/gm))[0][1]);

  const data = await teams.findOne({
    teamNo,
  });

  return data!.entryPass;
}
