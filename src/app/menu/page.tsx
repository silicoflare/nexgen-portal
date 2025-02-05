"use client";

import Navbar from "@/components/Navbar";
import menuItems from "@/data/menuItems";
import useSession from "@/hooks/useSession";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  const { user, loading } = useSession();

  return loading ? (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <LoaderCircleIcon className="animate-spin" size={30} />
    </div>
  ) : (
    <div className="w-full h-full px-5 flex flex-col items-center justify-center gap-5">
      {menuItems[user!.role].map((x) => (
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
