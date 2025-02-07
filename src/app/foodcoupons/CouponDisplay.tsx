"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { couponTypes } from "@/data/constants";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { isTop10 } from "./fx";
import QRCode from "react-qr-code";
import { useTheme } from "next-themes";
import JSConfetti from "js-confetti";
import { useSession } from "next-auth/react";

export default function CouponDisplay({
  coupon,
}: {
  coupon: [
    string,
    {
      qr: string;
      scanned: boolean;
    }
  ];
}) {
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();

  const [confetti] = useState(new JSConfetti());

  const { data: top10 } = useSWR("top10", async () =>
    session ? await isTop10(session.user.id) : null
  );

  if (coupon[0] === "day2Lunch" && !top10) {
    return null;
  }

  return (
    <Dialog
      onOpenChange={(o) => {
        if (o && coupon[0] === "day2Lunch" && top10) {
          confetti.addConfetti({ confettiRadius: 5 });
        }
      }}
    >
      <DialogTrigger
        className="w-full p-5 border rounded-md text-center disabled:bg-accent text-accent-foreground disabled:line-through"
        disabled={coupon[1].scanned}
      >
        {couponTypes[coupon[0] as keyof typeof couponTypes].label}
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md">
        <DialogHeader>
          <DialogTitle>
            {couponTypes[coupon[0] as keyof typeof couponTypes].label}
          </DialogTitle>
          <div className="w-full h-full flex flex-col items-center justify-center pt-5 gap-5">
            <QRCode
              value={coupon[1].qr}
              bgColor="none"
              className=""
              fgColor={resolvedTheme === "dark" ? "white" : "black"}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
