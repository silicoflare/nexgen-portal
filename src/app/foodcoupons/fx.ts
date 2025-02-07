"use server";

import { students } from "@/lib/db";
import { Student } from "@/types";

export async function getCouponCodes(id: string) {
  const stu = await students.findOne({ id });

  if (!stu) {
    return 404;
  }

  return (stu as unknown as Student).coupons;
}

export async function isTop10(id: string) {
  return (await students.findOne({ id }))!.top10 as boolean;
}
