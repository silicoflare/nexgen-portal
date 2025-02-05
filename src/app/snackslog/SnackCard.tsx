import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Snack } from "@/types";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import DeleteSnack from "./DeleteSnack";

export default function SnackCard({ snack }: { snack: Snack }) {
  return (
    <Link
      href={`/snackslog/${snack.id}`}
      className="w-full p-5 border rounded-md flex items-center justify-between"
    >
      <div className="flex flex-col items-start gap-2">
        <div className="text-lg font-semibold">{snack.name}</div>
        <div className="text-muted-foreground">{snack.desc}</div>
      </div>
    </Link>
  );
}
