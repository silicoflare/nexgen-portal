"use client";

import { entryAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import useSWR from "swr";
import { getEntryDetails } from "./fx";
import Navbar from "@/components/Navbar";
import { Loader2Icon } from "lucide-react";
import TeamDetails from "./TeamDetails";
import { Student, Team } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentDetails from "./StudentInfo";
import PaymentInfo from "./PaymentInfo";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/withAuth";

function CheckIn() {
  const [val] = useAtom(entryAtom);
  const router = useRouter();

  const { data, isLoading } = useSWR("teamdata", async () => {
    return await getEntryDetails(val);
  });

  useEffect(() => {
    if (val === "" || !val) {
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
        <PaymentInfo
          details={data.team as Team}
          count={data.student.length}
          team={data.team.teamNo}
        />
      </div>
    )
  );
}

CheckIn.auth = ["admin"];
export default withAuth(CheckIn);
