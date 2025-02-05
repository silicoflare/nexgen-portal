"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { entryAtom } from "@/lib/atoms";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function ScanPass() {
  const [, setVal] = useAtom(entryAtom);
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-2 bg-background">
      <Navbar />
      <div className="w-3/4 aspect-square flex flex-col items-center justify-center gap-5">
        <h1 className="text-xl font-semibold">Scan Entry Pass</h1>
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
          onScan={(result) => {
            setVal(result[0].rawValue);
            router.push("/scanpass/checkin");
          }}
          allowMultiple={true}
          scanDelay={1000}
        />
        <Button variant="outline" onClick={() => router.push("/menu")}>
          Back
        </Button>
      </div>
    </div>
  );
}
