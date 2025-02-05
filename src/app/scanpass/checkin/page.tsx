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

export default function CheckIn() {
  const [val] = useAtom(entryAtom);

  const { data, isLoading } = useSWR("teamdata", async () => {
    return await getEntryDetails(val);
  });

  if (isLoading || !data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Loader2Icon size={30} className="animate-spin" />
      </div>
    );
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
