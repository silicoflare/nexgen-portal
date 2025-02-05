export interface Team {
  teamNo: string;
  college: string;
  track: string;
  entryPass: string;
  paymentMode?: "cash" | "upi";
  txnID?: string;
}

export type Student = {
  team: number;
  id: string;
  name: string;
  semester: string;
  srn: string;
  email: string;
  phone: number;
  present?: boolean;
  top10: boolean;
  coupons: Record<
    "day1Lunch" | "day1Snack" | "day1Dinner" | "day2Break" | "day2Lunch",
    { qr: string; scanned: boolean }
  >;
  residence: "day-scholar" | "hostel";
  hostel?: {
    type: "boys" | "girls";
    room: number;
    guardianName: string;
    guardianPhone: number;
    consentTaken?: boolean;
  };
};

export interface Snack {
  id: string;
  name: string;
  desc: string;
  log: number[];
}
