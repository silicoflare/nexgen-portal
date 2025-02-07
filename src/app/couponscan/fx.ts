"use server";

import { decrypt, importKey } from "@/lib/crypto";
import env from "../../../env";
import { couponTypes } from "@/data/constants";
import { coupons, students } from "@/lib/db";

export async function decryptFoodQR(id: string, qr: string) {
  const key = await importKey(env.FOOD_KEY);
  let res = "";

  try {
    res = await decrypt(qr, key);
  } catch (err) {
    return 401;
  }

  const match = res.match(couponTypes[id as keyof typeof couponTypes].format);

  if (!match) {
    return 404;
  }

  const team = match[1];
  const member = match[2];
  const participantID = `N2T${team.padStart(2, "0")}${member}`;

  const student = await students.findOne({
    id: participantID,
  });

  if (student!.coupons[id].scanned) {
    return 403;
  }

  await students.updateOne(
    {
      id: participantID,
    },
    {
      $set: {
        [`coupons.${id}.scanned`]: true,
      },
    }
  );

  await coupons.updateOne(
    {
      type: id,
    },
    {
      $inc: {
        count: 1,
      },
    }
  );

  return 200;
}

export async function getCouponCount(id: string) {
  return (await coupons.findOne({
    type: id,
  }))!.count as number;
}
