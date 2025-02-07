import { users } from "@/lib/db";
import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    };
  }
  interface User {
    id: string;
    role: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await users.findOne({
          username: credentials!.username,
        });

        if (!user) {
          return null;
        }

        return {
          id: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Ensure session is JWT-based
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

export default authOptions;
