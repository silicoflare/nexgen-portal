import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Loader2Icon size={30} className="animate-spin" />
    </div>
  );
}
