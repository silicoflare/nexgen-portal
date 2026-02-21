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

  const seedUsers = [
    // Admins
    ["admin1", "YjYPyqc2", "admin"],
    ["admin2", "6x0IVTtP", "admin"],
    ["admin3", "715jqXlh", "admin"],
    ["admin4", "TW3aCRLc", "admin"],
    ["admin5", "lIHIH3gx", "admin"],
    ["admin6", "pR3A3J0k", "admin"],
    ["admin7", "Gf9Kp2Lm", "admin"],
    ["admin8", "Qx7Tn4Vz", "admin"],
    ["admin9", "R8cYw1Hs", "admin"],
    ["admin10", "M3pL6Dqa", "admin"],

    // Snacks
    ["snacks1", "iekaCbBL", "snacks"],
    ["snacks2", "miWBTmXB", "snacks"],
    ["snacks3", "5fRIO5uV", "snacks"],
    ["snacks4", "1sr1ft5L", "snacks"],
    ["snacks5", "Mc97PfM5", "snacks"],
    ["snacks6", "oxg2A26+", "snacks"],
    ["snacks7", "bT9wXc4P", "snacks"],
    ["snacks8", "H2mN7sQa", "snacks"],
    ["snacks9", "Z5rK8dJu", "snacks"],
    ["snacks10", "L0pE3vYn", "snacks"],

    // Vendors
    ["vendor1", "p8cdsre7", "vendor"],
    ["vendor2", "4me2OcYI", "vendor"],
    ["vendor3", "lcvdfBom", "vendor"],
    ["vendor4", "CzjqwTEY", "vendor"],
    ["vendor5", "B7CjbSuO", "vendor"],
    ["vendor6", "6hz75vjd", "vendor"],
    ["vendor7", "tP4sN9Qe", "vendor"],
    ["vendor8", "Wm2Kx7Ld", "vendor"],
    ["vendor9", "V8rHc5Ba", "vendor"],
    ["vendor10", "Jq6Zp1Xs", "vendor"],
  ];

  for (const [username, password, role] of seedUsers) {
    await users.insertOne({
      username,
      password: hashSync(password),
      role,
      loggedIn: false,
    });
  }

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
