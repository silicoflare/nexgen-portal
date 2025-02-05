"use client";

import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function NavLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-2 bg-background">
      <Navbar />
      {children}
    </div>
  );
}
