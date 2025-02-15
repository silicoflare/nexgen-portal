"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { couponTypes } from "@/data/constants";
import { Scanner } from "@yudiel/react-qr-scanner";
import { decryptFoodQR, getCouponCount } from "./fx";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

export default function CouponScanner({ id }: { id: string }) {
  const [message, setMessage] = useState<{
    error: boolean;
    message: string;
  } | null>(null);

  const { data: count, mutate } = useSWR(
    id,
    async () => await getCouponCount(id)
  );

  return (
    <Dialog
      onOpenChange={(o) => {
        if (!o) setMessage(null);
      }}
    >
      <DialogTrigger className="w-full p-3 border rounded-md flex items-center justify-center transition ease-in-out duration-200 active:bg-foreground active:text-background">
        {couponTypes[id as keyof typeof couponTypes].label}
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md">
        <DialogHeader>
          <DialogTitle>
            {couponTypes[id as keyof typeof couponTypes].label}
          </DialogTitle>
          <div className="w-full">Count: {count}</div>
        </DialogHeader>
        <div className="w-full flex flex-col items-center gap-3">
          <Scanner
            components={{
              finder: false,
              zoom: true,
            }}
            styles={{
              container: {
                width: "100%",
                height: "100%",
                border: "1px solid white",
                overflowX: "hidden",
              },
              video: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "1 / 1",
              },
            }}
            onScan={async (result) => {
              const res = await decryptFoodQR(id, result[0].rawValue);
              await mutate();

              switch (res) {
                case 401:
                  setMessage({ error: true, message: "Invalid QR" });
                  break;

                case 404:
                  setMessage({ error: true, message: "Wrong food coupon" });
                  break;

                case 403:
                  setMessage({
                    error: true,
                    message: "Coupon already scanned",
                  });
                  break;

                case 200:
                  setMessage({
                    error: false,
                    message: "Coupon scanned successfully!",
                  });
                  break;
              }
            }}
            allowMultiple={true}
            scanDelay={1000}
            paused={message !== null}
          />
          {message ? (
            <div className="w-full flex flex-col items-center gap-2">
              <div
                className={cn(
                  message.error ? "text-red-600" : "text-green-600"
                )}
              >
                {message.message}
              </div>
              <Button onClick={() => setMessage(null)}>Okay</Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
