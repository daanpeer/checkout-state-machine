import { useState } from "react";
import { Contact, Personal } from "../types";
import { Input } from "./Input";

type Props = {
  onSubmitContact: (personal: Contact) => void;
  initialContact: Partial<Contact>;
};

export const ContactForm = ({ initialContact, onSubmitContact }: Props) => {
  const [email, setEmail] = useState(initialContact.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    initialContact.phoneNumber || ""
  );
  return (
    <form
      style={{ marginBottom: "10px" }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitContact({
          email,
          phoneNumber,
        });
      }}
    >
      <Input
        name="Email"
        onChange={(value) => setEmail(value)}
        value={email}
        label="Email"
      />
      <Input
        name="Phone number"
        onChange={(value) => setPhoneNumber(value)}
        value={phoneNumber}
        label="Phone number"
      />
      <button type="submit">Submit address</button>
    </form>
  );
};
