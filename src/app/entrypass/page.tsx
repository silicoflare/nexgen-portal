"use client";

import Navbar from "@/components/Navbar";
import { LoaderCircleIcon } from "lucide-react";
import QRCode from "react-qr-code";
import { getQRContent } from "./fx";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { withAuth } from "@/withAuth";
import { useSession } from "next-auth/react";

function EntryPass() {
  const { data: session, status } = useSession();
  const [qr, setQR] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    async function set() {
      if (session) {
        setQR(await getQRContent(session.user.id));
      }
    }

    set();
  }, [status]);

  return status === "loading" ? (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <LoaderCircleIcon className="animate-spin" size={30} />
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col items-center gap-2 bg-background">
      <Navbar />
      <div className="w-full h-full px-5 flex flex-col items-center justify-center gap-5">
        <h1 className="text-xl font-bold">Entry Pass</h1>
        <QRCode
          value={qr}
          bgColor="none"
          fgColor={theme === "dark" ? "white" : "black"}
        />
      </div>
    </div>
  );
}

EntryPass.auth = ["participant"];
export default withAuth(EntryPass);
