"use client";

import useSWR from "swr";
import AddSnack from "./AddSnack";
import { getSnacksList } from "./fx";
import { Loader2Icon } from "lucide-react";
import SnackCard from "./SnackCard";
import { useAtom } from "jotai";
import { snackMutateAtom } from "@/lib/atoms";
import { useEffect } from "react";
import { withAuth } from "@/withAuth";

function SnacksLog() {
  const { data, isLoading, mutate } = useSWR(
    "snacks",
    async () => await getSnacksList()
  );

  const [, setMutate] = useAtom(snackMutateAtom);

  useEffect(() => {
    setMutate(() => mutate);
  }, [mutate]);

  return data ? (
    <div className="w-full h-full flex flex-col items-center mt-28 px-7">
      <h1 className="w-full text-xl font-bold flex items-center justify-between">
        Snacks Log
        <AddSnack mutate={mutate} />
      </h1>
      <div className="mt-5 w-full flex flex-col items-center gap-2">
        {data.map((s) => (
          <SnackCard snack={s} key={s.id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Loader2Icon size={30} className="animate-spin" />
    </div>
  );
}

SnacksLog.auth = ["snacks", "sudo"];
export default withAuth(SnacksLog);
