"use server";

import { students } from "@/lib/db";

export async function getTop10() {
  let res = await (
    await students.aggregate([
      {
        $match: {
          top10: true,
        },
      },
      {
        $group: {
          _id: "team",
          teamNo: {
            $addToSet: "$team",
          },
        },
      },
      {
        $project: {
          _id: 0,
          teamNums: "$teamNo",
        },
      },
    ])
  ).toArray();

  const final = res.length > 0 ? (res[0].teamNums as number[]) : [];

  const arr = new Array(35)
    .fill(0)
    .map((x, i) => (final.length > 0 && final.includes(i + 1) ? 1 : 0));

  return arr;
}

export async function changeTop10(team: number, val: boolean) {
  await students.updateMany(
    { team },
    {
      $set: {
        top10: val,
      },
    }
  );
}
