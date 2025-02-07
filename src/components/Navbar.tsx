"use client";

import ThemeSwitcher from "./ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="w-[90%] max-w-screen-lg p-3 flex items-center justify-between fixed top-4 left-1/2 transform -translate-x-1/2 border shadow-md rounded-lg bg-background text-foreground z-50">
      <h1
        className="font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        NexGen 2.0
      </h1>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel className="flex items-center justify-between gap-2 w-[12.5rem]">
              <div className="w-full flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${session.user.id}`}
                  />
                </Avatar>
                <div className="flex flex-col items-start gap-2">
                  <div className="font-semibold">{session.user.id}</div>
                  <Badge
                    role={
                      session.user.role as "admin" | "vendor" | "participant"
                    }
                  >
                    {session.user.role[0].toUpperCase() +
                      session.user.role.slice(1).toLowerCase()}
                  </Badge>
                </div>
              </div>
              <ThemeSwitcher />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push("/menu");
              }}
            >
              Menu
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={async () => {
                await signOut({
                  callbackUrl: "/",
                });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ThemeSwitcher />
      )}
    </div>
  );
}
