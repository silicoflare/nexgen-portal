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
    password: hashSync("password"),
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
      type: "welcomeSnacks",
      count: 0,
    },
    {
      type: "lunch",
      count: 0,
    },
    {
      type: "eveSnacks",
      count: 0,
    }
  ]);

  const foodKey = await importKey(env.FOOD_KEY);
  const entryKey = await importKey(env.ENTRY_KEY);

  for (let i = 0; i < teamData.length; i++) {
    console.log("Inserting team", i + 1)
    const t = teamData[i];
    await teams.insertOne({
      teamNo: i + 1,
      college: t.college,
      track: t.track,
      entryPass: await encrypt(`T${i + 1}_ENTRY`, entryKey),
    });
    for (let j = 0; j < t.students.length; j++) {
      const st = t.students[j];
      if (!st.name) continue
      const data: { [key: string]: any } = {
        team: i + 1,
        id: `NJT${(i + 1).toString().padStart(2, "0")}${"ABCD".charAt(j)}`,
        name: st.name,
        semester: st.semester,
        srn: st.srn,
        email: st.email,
        phone: st.phone,
        top10: false,
        coupons: {
          welcomeSnacks: {
            qr: await encrypt(
              `WELCOMESNACK_${i + 1}${"ABCD".charAt(j)}`,
              foodKey
            ),
            scanned: false,
          },
          lunch: {
            qr: await encrypt(
              `LUNCH_${i + 1}${"ABCD".charAt(j)}`,
              foodKey
            ),
            scanned: false,
          },
          eveSnacks: {
            qr: await encrypt(
              `EVESNACKS_${i + 1}${"ABCD".charAt(j)}`,
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
    }
  }
}
