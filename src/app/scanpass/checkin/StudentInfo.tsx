import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Student } from "@/types";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { changeAttendance, changeConsent } from "./fx";

export default function StudentDetails({
  details,
}: {
  details: Omit<Student, "coupons">;
}) {
  const [present, setPresent] = useState<boolean | null>(
    details.present ?? null
  );
  const [consent, setConsent] = useState<boolean | null>(
    details.hostel ? details.hostel.consentTaken ?? null : null
  );

  useEffect(() => {
    setPresent(details.present ?? null);
    setConsent(details.hostel ? details.hostel.consentTaken ?? null : null);
  }, [details]);

  async function getAtt(val: boolean) {
    setPresent(val);
    changeAttendance(details.id, val);
  }

  async function getCon(val: boolean) {
    setConsent(val);
    changeConsent(details.id, val);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-xl">{details.name}</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center gap-7">
        <div className="w-full grid grid-cols-2 gap-5 items-center justify-items-center">
          <div className="flex flex-col items-start gap-1 leading-none w-full">
            <div className="font-bold">ID</div>
            {details.id}
          </div>
          <div className="flex flex-col items-end gap-1 leading-none w-full">
            <div className="font-bold">SRN</div>
            {details.srn}
          </div>
          <div className="flex flex-col items-start gap-1 leading-none w-full">
            <div className="font-bold">Semester</div>
            {details.semester}
          </div>
          <div className="flex flex-col items-end gap-1 leading-none w-full">
            <div className="font-bold">Phone</div>
            {details.phone}
          </div>
          <div className="flex flex-col items-start gap-1 leading-none w-full">
            <div className="font-bold">Email</div>
            {details.email}
          </div>
          {details.residence && (
            <div className="flex flex-col items-end gap-1 leading-none w-full">
              <div className="font-bold">Residence</div>
              {details.residence}
            </div>
          )}
        </div>
        {details.hostel && (
          <div className="w-full flex flex-col items-start">
            <div className="font-bold text-xl">Hostel Details</div>
            <div className="w-full flex grow items-center gap-1">
              <div className="font-bold">Type:</div> {details.hostel.type}
            </div>
            <div className="w-full flex grow items-center gap-1">
              <div className="font-bold">Room no.:</div> {details.hostel.room}
            </div>
            <div className="w-full flex grow items-center gap-1">
              <div className="font-bold">Guardian name:</div>{" "}
              {details.hostel.guardianName}
            </div>
            <div className="w-full flex grow items-center gap-1">
              <div className="font-bold">Guardian phone:</div>{" "}
              {details.hostel.guardianPhone}
            </div>
          </div>
        )}
        <div className="w-full flex items-center justify-between gap-3">
          <div className="w-full flex flex-col items-center text-xl gap-1">
            Present?
            <div className="w-full flex items-center justify-center gap-2">
              <Button
                variant="outline"
                className={cn(
                  "aspect-square border-green-600",
                  present
                    ? "text-background bg-green-600"
                    : "text-green-600 bg-background"
                )}
                onClick={() => getAtt(true)}
              >
                <CheckIcon size={20} />
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "aspect-square border-red-600",
                  present !== null
                    ? present
                      ? "text-red-600 bg-background"
                      : "text-background bg-red-600"
                    : "text-red-600 bg-background"
                )}
                onClick={() => getAtt(false)}
              >
                <XIcon size={20} />
              </Button>
            </div>
          </div>
          {details.hostel && (
            <div className="w-full flex flex-col items-center text-xl gap-1">
              Consent?
              <div className="w-full flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={!present}
                  className={cn(
                    "aspect-square border-green-600",
                    consent
                      ? "text-background bg-green-600"
                      : "text-green-600 bg-background"
                  )}
                  onClick={() => getCon(true)}
                >
                  <CheckIcon size={20} />
                </Button>
                <Button
                  variant="outline"
                  disabled={!present}
                  className={cn(
                    "aspect-square border-red-600",
                    consent !== null
                      ? consent
                        ? "text-red-600 bg-background"
                        : "text-background bg-red-600"
                      : "text-red-600 bg-background"
                  )}
                  onClick={() => getCon(false)}
                >
                  <XIcon size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
