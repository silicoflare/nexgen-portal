import { couponTypes } from "@/data/constants";
import CouponScanner from "./CouponScanner";
import { withAuth } from "@/withAuth";

function CouponScan() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Scan Food Coupons</h1>
      <div className="w-full flex flex-col items-center mt-10 gap-5 px-5">
        {Object.keys(couponTypes).map((x) => (
          <CouponScanner id={x} key={x} />
        ))}
      </div>
    </div>
  );
}

CouponScan.auth = ["vendor"];
export default withAuth(CouponScan);
