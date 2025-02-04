"use server";

import { compareSync } from "bcryptjs";
import { users } from "./db";
import { jwtVerify, SignJWT } from "jose";
import env from "../../env";
import { cookies } from "next/headers";

export async function signIn(username: string, password: string) {
  const user = await users.findOne({
    username,
  });

  if (!user) {
    return { status: 404, message: "User not found" };
  }

  if (!compareSync(password, user.password)) {
    return { status: 401, message: "User not found" };
  } else {
    const token = await new SignJWT({
      id: user.username,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(env.JWT_SECRET));

    (await cookies()).set("session", token);
    return { status: 200, message: "Signed in successfully!" };
  }
}

export async function signOut() {
  (await cookies()).delete("session");
  return { status: 200, message: "Signed out successfully!" };
}

export async function getSession() {
  const sessionData = (await cookies()).get("session");

  if (!sessionData) {
    return null;
  }

  const { payload } = await jwtVerify(
    sessionData.value,
    new TextEncoder().encode(env.JWT_SECRET)
  );

  return { status: 200, data: payload };
}
