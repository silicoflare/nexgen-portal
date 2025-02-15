"use client";

import { withAuth } from "@/withAuth";
import useSWR from "swr";
import { changeTop10, getTop10 } from "./fx";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

function Top10() {
  const { data: teamNums, mutate } = useSWR(
    "top10",
    async () => await getTop10()
  );

  return teamNums ? (
    <div className="w-full h-full flex flex-col items-center justify-center gap-7 px-10">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex flex-col gap-2 items-center">
          <h1 className="text-xl font-bold">Top 10 Teams</h1>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 content-center justify-items-center gap-5">
        {teamNums.map((x, i) => (
          <Button
            variant={x === 0 ? "outline" : "default"}
            className="w-10 h-10 p-5"
            key={i}
            onClick={async () => {
              await changeTop10(i + 1, x === 0);
              await mutate();
            }}
          >
            {i + 1}
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
  ) : (
    <Loading />
  );
}

Top10.auth = ["sudo"];
export default withAuth(Top10);
