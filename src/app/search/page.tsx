"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { entryAtom } from "@/lib/atoms";
import { withAuth } from "@/withAuth";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function Search() {
  const [team, setTeam] = useState("");
  const [, setVal] = useAtom(entryAtom);
  const router = useRouter();

  async function onSubmit() {
    const num = parseInt(team);

    if (Number.isNaN(num)) {
      toast.error("Not a number");
      setTeam("");
      return;
    }

    if (num < 1 || num > 35) {
      toast.error("Invalid team number");
      setTeam("");
      return;
    }

    setVal(num);
    setTeam("");
    router.push("/scanpass/checkin");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="w-full text-center">Enter team no.</div>
      <div className="w-full px-10">
        <Input value={team} onChange={(e) => setTeam(e.target.value)} />
      </div>
      <Button onClick={() => onSubmit()}>Submit</Button>
    </div>
  );
}

Search.auth = ["admin"];
export default withAuth(Search);
