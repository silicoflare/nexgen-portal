'use server'

import { students } from "@/lib/db"

export async function getPresentTeams() {
  const teams = await students.aggregate([
    {
      $group: {
        _id: "$team",
        isPresent: {
          $max: {
            $cond: [{ $eq: ["$present", true] }, 1, 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        team: "$_id",
        present: { $eq: ["$isPresent", 1] }
      }
    }
  ]).toArray() as {
    team: number
    present: boolean
  }[]

  return teams
}