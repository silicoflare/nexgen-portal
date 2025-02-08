import { seedStudents } from "@/data/seed";
import { client } from "@/lib/db";
import { Student, Team } from "@/types";
import { readFileSync } from "fs";

export type TeamImport = (Omit<Team, "entryPass"> & {
  _id?: string;
  students: Omit<Student, "top10" | "coupons">[];
})[];

async function prepDB(path: string) {
  const fileContent = readFileSync(path, "utf-8");
  const res = (JSON.parse(fileContent) as TeamImport).map((x) => {
    const { _id, ...other } = x;
    return other;
  });
  await seedStudents(res);
}

await prepDB(process.argv[2]);
await client.close();
