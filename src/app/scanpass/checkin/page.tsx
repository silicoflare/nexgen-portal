"use client";

import { entryAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import useSWR from "swr";
import { getEntryDetails } from "./fx";
import TeamDetails from "./TeamDetails";
import { Student, Team } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentDetails from "./StudentInfo";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/withAuth";
import { Button } from "@/components/ui/button";

function CheckIn() {
  const [val] = useAtom(entryAtom);
  const router = useRouter();

  const { data, isLoading } = useSWR("teamdata", async () => {
    return await getEntryDetails(val);
  });

  useEffect(() => {
    if (val === 0 || !val) {
      router.push("/scanpass");
    }
  }, [val, router]);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    data && (
      <div className="w-full h-full flex flex-col items-center gap-5 mt-20 mb-10 p-5">
        <TeamDetails details={data.team as Team} />
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Student Details</CardTitle>
          </CardHeader>
          <CardContent className="p-2 flex flex-col items-center w-full gap-2">
            {data.student.map((x) => (
              <StudentDetails
                key={x.id}
                details={x as Omit<Student, "coupons">}
              />
            ))}
          </CardContent>
        </Card>
        <div className="w-full my-5 flex flex-col items-center justify-center">
          <Button variant="outline" onClick={() => router.push("/scanpass")}>
            Back
          </Button>
          <div className="p-5"> </div>
        </div>
      </div>
    )
  );
}

CheckIn.auth = ["admin", "sudo"];
export default withAuth(CheckIn);
