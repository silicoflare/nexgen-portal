"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteSnack } from "./fx";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { snackMutateAtom } from "@/lib/atoms";

export default function DeleteSnack({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [mutate] = useAtom(snackMutateAtom);

  return (
    <AlertDialog open={open} onOpenChange={(o) => setOpen(o)}>
      <AlertDialogTrigger
        className="rounded-sm p-3 aspect-square bg-red-600 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Trash2Icon size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete this snack from the log?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex flex-row items-center justify-between gap-5">
          <AlertDialogAction
            className="w-full inline-block"
            onClick={async () => {
              setOpen(false);
              await deleteSnack(id);
              toast.success("Deleted snack successfully!");
              if (typeof mutate === "function") await mutate();
              router.push("/snackslog");
            }}
          >
            Yes
          </AlertDialogAction>
          <AlertDialogCancel className="w-full inline-block mt-0">
            No
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
