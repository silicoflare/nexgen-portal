import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/types";

export default function TeamDetails({ details }: { details: Team }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Team Details</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center gap-5">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 leading-none w-full">
            <div className="font-bold">Team no.</div>
            {details.teamNo}
          </div>
          <div className="flex flex-col items-end gap-1 leading-none w-full">
            <div className="font-bold">Track</div>
            {details.track}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 leading-none w-full">
          <div className="font-bold">College</div>
          {details.college}
        </div>
      </CardContent>
    </Card>
  );
}
