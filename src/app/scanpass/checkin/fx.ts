"use server";

import { decrypt, importKey } from "@/lib/crypto";
import env from "../../../../env";
import { students, teams } from "@/lib/db";
import { Team } from "@/types";

export async function getEntryDetails(code: string) {
  const key = await importKey(env.ENTRY_KEY);
  const val = await decrypt(code, key);

  const teamNo = parseInt(Array.from(val.matchAll(/T(\d{1,2})_ENTRY/gm))[0][1]);

  const { _id, entryPass, ...teamDetails } = (await teams.findOne({
    teamNo,
  }))!;

  const studentDetails = (
    await (
      await students.find({
        team: teamNo,
      })
    ).toArray()
  ).map((x) => {
    const { _id, coupons, ...other } = x;
    return other;
  });

  return { team: teamDetails, student: studentDetails };
}

export async function changeAttendance(id: string, present: boolean) {
  await students.updateOne(
    {
      id,
    },
    {
      $set: {
        present: present,
      },
    }
  );
}

export async function changeConsent(id: string, consent: boolean) {
  await students.updateOne(
    {
      id,
    },
    {
      $set: {
        "hostel.consentTaken": consent,
      },
    }
  );
}

export async function updatePayment(
  id: number,
  mode: Team["paymentMode"],
  txn: string
) {
  await teams.updateOne(
    {
      teamNo: id,
    },
    {
      $set: {
        paymentMode: mode,
        txnID: txn,
      },
    }
  );
}
