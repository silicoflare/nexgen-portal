import { encrypt, importKey } from "@/lib/crypto";
import { client, coupons, students, teams, users } from "@/lib/db";
import { generate } from "random-words";
import env from "../../env";
import { hashSync } from "bcryptjs";

function random<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const collegeNames = ["PES University", "IIT", "Amrita", "BITS", "RV", "DSU"];
// const collegeNames = ["PES University"];

const tracks = ["Open Innovation", "AI/ML", "Dev Tools", "EdTech"];

const semesters = ["II", "IV", "VI"];

async function seedStudents(arr: number[]) {
  await teams.deleteMany();
  await students.deleteMany();
  await users.deleteMany();
  await coupons.deleteMany();

  await users.insertOne({
    username: "admin",
    password: hashSync("password"),
    role: "admin",
  });

  await users.insertOne({
    username: "vendor",
    password: hashSync("vendor123"),
    role: "vendor",
  });

  await coupons.insertMany([
    {
      type: "day1Lunch",
      count: 0,
    },
    {
      type: "day1Snack",
      count: 0,
    },
    {
      type: "day1Dinner",
      count: 0,
    },
    {
      type: "day2Break",
      count: 0,
    },
    {
      type: "day2Lunch",
      count: 0,
    },
  ]);

  const foodKey = await importKey(env.FOOD_KEY);
  const entryKey = await importKey(env.ENTRY_KEY);

  for (let i = 0; i < arr.length; i++) {
    const t = arr[i];
    const selectedCollege = random(collegeNames);
    await teams.insertOne({
      teamNo: i + 1,
      college: selectedCollege,
      track: random(tracks),
      entryPass: await encrypt(`T${i + 1}_ENTRY`, entryKey),
    });
    for (let j = 1; j <= t; j++) {
      const isHostel = Math.floor(Math.random() * 2);

      const data: { [key: string]: any } = {
        team: i + 1,
        id: `N2T${(i + 1).toString().padStart(2, "0")}${"ABCD".charAt(j - 1)}`,
        name: generate({ minLength: 4, exactly: 1 })[0] as string,
        semester: random(semesters),
        srn: "ABC123",
        email: "foo@gmail.com",
        phone: 9876543210,
        top10: false,
        coupons: {
          day1Lunch: {
            qr: await encrypt(
              `DAY1LUNCH_${i + 1}${"ABCD".charAt(j - 1)}`,
              foodKey
            ),
            scanned: false,
          },
          day1Snack: {
            qr: await encrypt(
              `DAY1SNACK_${i + 1}${"ABCD".charAt(j - 1)}`,
              foodKey
            ),
            scanned: false,
          },
          day1Dinner: {
            qr: await encrypt(
              `DAY1DINE_${i + 1}${"ABCD".charAt(j - 1)}`,
              foodKey
            ),
            scanned: false,
          },
          day2Break: {
            qr: await encrypt(
              `DAY2BREAK_${i + 1}${"ABCD".charAt(j - 1)}`,
              foodKey
            ),
            scanned: false,
          },
          day2Lunch: {
            qr: await encrypt(
              `DAY2LUNCH_${i + 1}${"ABCD".charAt(j - 1)}`,
              foodKey
            ),
            scanned: false,
          },
        },
      };

      users.insertOne({
        username: data["id"],
        password: hashSync(
          `${(data["name"] as string).slice(0, 4).toUpperCase()}${
            i + 1
          }${"ABCD".charAt(j - 1)}`
        ),
        role: "participant",
      });

      if (selectedCollege === collegeNames[0]) {
        if (isHostel) {
          data["residence"] = "hostel";
          data["hostel"] = {
            type: random(["boys", "girls"]),
            room: Math.floor(Math.random() * 1000) + 100,
            guardianName: generate(1)[0] as string,
            guardianPhone: 1234567890,
          };
        } else {
          data["residence"] = "day-scholar";
        }
      }

      await students.insertOne(data);
      if (j === 1)
        console.log(
          `Username: ${data.id}, Password: ${`${(data["name"] as string)
            .slice(0, 4)
            .toUpperCase()}${i + 1}${"ABCD".charAt(
            j - 1
          )}`}, College: ${selectedCollege}`
        );
    }
  }
}

await seedStudents([3, 4, 3, 4, 4]);
await client.close();
