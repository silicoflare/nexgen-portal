"use client";

import Loading from "@/components/Loading";
import menuItems from "@/data/menuItems";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { withAuth } from "@/withAuth";

function Menu() {
  const { data: session, status } = useSession();

  return status === "loading" || !session ? (
    <Loading />
  ) : (
    <div className="w-full h-full px-5 flex flex-col items-center justify-center gap-5">
      {menuItems[session.user!.role].map((x) => (
        <Link
          href={x.route}
          key={x.route}
          className="w-full p-3 border rounded-md flex items-center justify-center transition ease-in-out duration-200 active:bg-foreground active:text-background"
        >
          {x.label}
        </Link>
      ))}
    </div>
  );
}

Menu.auth = ["participant", "vendor", "admin"];
export default withAuth(Menu);
