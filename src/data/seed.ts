import { encrypt, importKey } from "@/lib/crypto";
import { coupons, snacks, students, teams, users } from "@/lib/db";
import env from "../../env";
import { hashSync } from "bcryptjs";
import { TeamImport } from "../../prepdb";

export async function seedStudents(teamData: TeamImport) {
  await teams.deleteMany();
  await students.deleteMany();
  await users.deleteMany();
  await coupons.deleteMany();
  await snacks.deleteMany();

  await users.insertOne({
    username: "silicoflare",
    password: hashSync("FishFuckerPrime%420"),
    role: "sudo",
  });

  await users.insertOne({
    username: "admin1",
    password: hashSync("YjYPyqc2"),
    role: "admin",
    loggedIn: false,
  });

  await users.insertOne({
    username: "admin2",
    password: hashSync("6x0IVTtP"),
    role: "admin",
    loggedIn: false,
  });

  await users.insertOne({
    username: "admin3",
    password: hashSync("715jqXlh"),
    role: "admin",
    loggedIn: false,
  });

  await users.insertOne({
    username: "admin4",
    password: hashSync("TW3aCRLc"),
    role: "admin",
    loggedIn: false,
  });

  await users.insertOne({
    username: "snacks1",
    password: hashSync("+yndMuDh"),
    role: "snacks",
    loggedIn: false,
  });

  await users.insertOne({
    username: "snacks2",
    password: hashSync("miWBTmXB"),
    role: "snacks",
    loggedIn: false,
  });

  await users.insertOne({
    username: "snacks3",
    password: hashSync("5fRIO5uV"),
    role: "snacks",
    loggedIn: false,
  });

  await users.insertOne({
    username: "vendor1",
    password: hashSync("p8cdsre7"),
    role: "vendor",
  });

  await users.insertOne({
    username: "vendor2",
    password: hashSync("4me2OcYI"),
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
      type: "day1Midnight",
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

  for (let i = 0; i < teamData.length; i++) {
    const t = teamData[i];
    await teams.insertOne({
      teamNo: i + 1,
      college: t.college,
      track: t.track,
      entryPass: await encrypt(`T${i + 1}_ENTRY`, entryKey),
    });
    for (let j = 0; j < t.students.length; j++) {
      const st = t.students[j];
      const data: { [key: string]: any } = {
        team: i + 1,
        id: `N2T${(i + 1).toString().padStart(2, "0")}${"ABCD".charAt(j)}`,
        name: st.name,
        semester: st.semester,
        srn: st.srn,
        email: st.email,
        phone: st.phone,
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
          day1Midnight: {
            qr: await encrypt(
              `DAY1MID_${i + 1}${"ABCD".charAt(j - 1)}`,
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
        password: hashSync(data["id"]),
        role: "participant",
      });

      if (t.college === "PES University") {
        if (st.hostel) {
          data["residence"] = "hostel";
          data["hostel"] = {
            type: st.hostel.type,
            room: st.hostel.room,
            guardianName: st.hostel.guardianName,
            guardianPhone: st.hostel.guardianPhone,
          };
        } else {
          data["residence"] = "day-scholar";
        }
      }

      await students.insertOne(data);
      if (j === 0) console.log(`Username: ${data.id}, Password: ${data.id}`);
    }
  }
}
