"use client";

import { couponTypes } from "@/data/constants";
import CouponScanner from "./CouponScanner";
import { withAuth } from "@/withAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function CouponScan() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Scan Food Coupons</h1>
      <div className="w-full flex flex-col items-center mt-10 gap-5 px-5">
        <div className="w-full flex items-center justify-start my-10">
          <Button variant="outline" onClick={() => router.push("/menu")}>
            <ArrowLeftIcon size={20} />
            Back
          </Button>
        </div>
        {Object.keys(couponTypes).map((x) => (
          <CouponScanner id={x} key={x} />
        ))}
      </div>
    </div>
  );
}

CouponScan.auth = ["vendor", "sudo"];
export default withAuth(CouponScan);
