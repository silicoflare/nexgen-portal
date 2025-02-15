"use client";

import { use } from "react";
import { getSnackInfo, updateInfo } from "./fx";
import useSWR from "swr";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteSnack from "../DeleteSnack";
import { withAuth } from "@/withAuth";

function SnackLogger({ params }: { params: Promise<{ snackID: string }> }) {
  const snackID = use(params).snackID;

  const { data: snackData, mutate } = useSWR("snackdata", async () =>
    getSnackInfo(snackID)
  );

  return snackData ? (
    <div className="w-full h-full flex flex-col items-center justify-center gap-7 px-10">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex flex-col gap-2 items-start">
          <h1 className="text-xl font-bold">{snackData.name}</h1>
          <div className="">{snackData.desc}</div>
        </div>
        <DeleteSnack id={snackID} />
      </div>

      <div className="w-full grid grid-cols-5 content-center justify-items-center gap-5">
        {snackData.log.map((x, i) => (
          <Button
            variant={x === 0 ? "outline" : "default"}
            className="w-10 h-10 p-5"
            key={i}
            onClick={async () => {
              await updateInfo(snackID, i);
              await mutate();
            }}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Link
        href="/snackslog"
        className="mt-5 text-center p-5 py-2 bg-primary text-primary-foreground rounded-md w-3/4"
      >
        Back
      </Link>
    </div>
  ) : (
    <div className="w-w-full h-full flex flex-col items-center justify-center">
      <Loader2Icon size={30} className="animate-spin" />
    </div>
  );
}

SnackLogger.auth = ["snacks", "sudo"];
export default withAuth(SnackLogger);
