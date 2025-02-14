"use client";

import { withAuth } from "@/withAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAtom } from "jotai";
import { entryAtom } from "@/lib/atoms";
import { useRouter } from "next/navigation";

function Search() {
  const [, set] = useAtom(entryAtom);
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-7 px-10">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex flex-col gap-2 items-center">
          <h1 className="text-xl font-bold">Search for Team</h1>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 content-center justify-items-center gap-5">
        {Array.from({ length: 35 }, (_, i) => i + 1).map((x) => (
          <Button
            variant="outline"
            className="w-10 h-10 p-5"
            key={x}
            onClick={async () => {
              set(x);
              router.push("/scanpass/checkin");
            }}
          >
            {x}
          </Button>
        ))}
      </div>
      <Link
        href="/menu"
        className="mt-5 text-center p-5 py-2 bg-primary text-primary-foreground rounded-md w-3/4"
      >
        Back
      </Link>
    </div>
  );
}

Search.auth = ["admin"];
export default withAuth(Search);
