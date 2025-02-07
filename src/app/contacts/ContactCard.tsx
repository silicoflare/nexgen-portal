import { importantContacts } from "@/data/constants";
import { MailIcon, PhoneIcon } from "lucide-react";

export default function ContactCard({
  contact,
}: {
  contact: (typeof importantContacts)[0];
}) {
  return (
    <div className="w-full flex flex-col items-center gap-1 p-5 border rounded-md">
      <div className="font-semibold text-lg leading-none">{contact.name}</div>
      <div className="text-muted-foreground">{contact.title}</div>
      <div className="w-full grid grid-cols-2 gap-3 items-center justify-items-center mt-5">
        <a
          href={`tel:+91${contact.phone}`}
          className="px-5 py-2 flex items-center justify-center gap-1 bg-foreground text-background rounded-md w-full"
        >
          <PhoneIcon size={20} />
          Call
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="px-5 py-2 flex items-center justify-center gap-1 text-foreground border rounded-md w-full"
        >
          <MailIcon size={20} />
          Email
        </a>
      </div>
    </div>
  );
}
