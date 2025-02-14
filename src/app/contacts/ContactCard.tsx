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
      <div
        className="w-full grid gap-3 place-items-center mt-5"
        style={{
          gridTemplateColumns:
            contact.email === ""
              ? "repeat(1, minmax(0, 1fr))"
              : "repeat(2, minmax(0, 1fr))",
        }}
      >
        <a
          href={`tel:+91${contact.phone}`}
          className="px-5 py-2 flex items-center justify-center gap-1 bg-foreground text-background rounded-md w-full"
        >
          <PhoneIcon size={20} />
          Call
        </a>
        {contact.email !== "" && (
          <a
            href={`mailto:${contact.email}`}
            className="px-5 py-2 flex items-center justify-center gap-1 text-foreground border rounded-md w-full"
          >
            <MailIcon size={20} />
            Email
          </a>
        )}
      </div>
    </div>
  );
}
