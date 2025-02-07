"use client";

import useSWR from "swr";
import { getCouponCodes } from "./fx";
import Loading from "@/components/Loading";
import CouponDisplay from "./CouponDisplay";
import { useSession } from "next-auth/react";
import { withAuth } from "@/withAuth";

function FoodCoupons() {
  const { data: session } = useSession();

  const { data } = useSWR("coupons", async () =>
    session ? await getCouponCodes(session.user.id) : null
  );

  return data ? (
    data === 404 ? (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="text-2xl text-red-600">Student not found</div>
      </div>
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-full px-5 flex flex-col items-center gap-3">
          {Object.entries(data).map((coupon) => (
            <CouponDisplay key={coupon[0]} coupon={coupon} />
          ))}
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
}

FoodCoupons.auth = ["participant"];
export default withAuth(FoodCoupons);
