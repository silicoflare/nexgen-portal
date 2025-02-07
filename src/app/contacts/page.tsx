"use client";

import { importantContacts } from "@/data/constants";
import { withAuth } from "@/withAuth";
import { MailIcon, PhoneIcon } from "lucide-react";
import ContactCard from "./ContactCard";

function Contacts() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Important Contacts</h1>

      <div className="w-full flex flex-col items-center gap-5 px-10">
        {importantContacts.map((con) => (
          <ContactCard contact={con} key={con.name} />
        ))}
      </div>
    </div>
  );
}

Contacts.auth = ["vendor", "participant"];
export default withAuth(Contacts);
