"use client";

import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function NavLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-screen h-screen flex md:hidden flex-col items-center gap-2 bg-background">
        <Navbar />
        {children}
      </div>
      <div className="w-screen h-screen hidden md:flex flex-col items-center justify-center bg-background">
        <div className="text-2xl w-2/3 text-center flex flex-col items-center gap-5">
          <div className="text-4xl font-bold">NexGen 2.0</div>
          This display is too large for this website. Please switch to a phone.
        </div>
      </div>
    </>
  );
}
