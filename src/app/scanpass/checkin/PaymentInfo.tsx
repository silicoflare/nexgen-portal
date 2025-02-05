import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Team } from "@/types";
import { ScanQrCodeIcon, WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { updatePayment } from "./fx";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function PaymentInfo({
  details,
  count,
  team,
}: {
  details: Team;
  count: number;
  team: number;
}) {
  const [mode, setMode] = useState<Team["paymentMode"]>("cash");
  const [txn, setTxn] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setMode(details.paymentMode ?? "cash");
    setTxn(details.txnID ?? "");
  }, [details]);

  async function onSubmit() {
    await updatePayment(team, mode, txn);
    toast.success("Updated payment successfully!");
    router.push("/scanpass");
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center gap-3">
        <div className="w-full flex items-center justify-center gap-5">
          <Button
            variant={mode === "cash" ? "default" : "outline"}
            onClick={() => setMode("cash")}
          >
            <WalletIcon size={20} />
            Cash
          </Button>
          <Button
            variant={mode === "upi" ? "default" : "outline"}
            onClick={() => setMode("upi")}
          >
            <ScanQrCodeIcon size={20} />
            UPI
          </Button>
        </div>
        {mode === "cash" ? null : (
          <div className="w-full flex flex-col items-center gap-5 mt-2">
            <QRCode
              value={`upi://pay?pa=silicoflare@ybl&pn=NEXGEN 2.0&am=${
                count * 200
              }.00&cu=INR&mode=02&purpose=00&tn=Nexgen - Team ${team}`}
              bgColor="none"
              fgColor={theme === "dark" ? "white" : "black"}
            />
            <div className="w-full flex flex-col items-center gap-2">
              Last 5 digits of transaction ID:
              <InputOTP
                maxLength={5}
                className="bg-none w-full"
                value={txn}
                onChange={(val) => setTxn(val)}
              >
                <InputOTPGroup className="w-full border-cyan-500">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        )}
        <div className="w-full flex items-center justify-center mt-5 gap-5">
          {details.paymentMode ? null : (
            <Button onClick={() => onSubmit()}>Submit</Button>
          )}
          <Button variant="outline" onClick={() => router.push("/scanpass")}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
