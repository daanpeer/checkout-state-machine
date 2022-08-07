import { useState } from "react";
import { Personal } from "../types";
import { Input } from "./Input";

type Props = {
  onSubmitPersonal: (personal: Personal) => void;
  initialPersonal: Partial<Personal>;
};

export const PersonalForm = ({ initialPersonal, onSubmitPersonal }: Props) => {
  const [firstName, setFirstName] = useState(initialPersonal.firstName || "");
  const [lastName, setLastName] = useState(
    initialPersonal.lastName || ""
  );
  return (
    <form
      style={{ marginBottom: "10px"}}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitPersonal({
          firstName,
          lastName,
        });
      }}
    >
      <Input
        name="firstname"
        onChange={(value) => setFirstName(value)}
        value={firstName}
        label="First name"
      />
      <Input
        name="lastName"
        onChange={(value) => setLastName(value)}
        value={lastName}
        label="Last name"
      />
      <button type="submit">Submit personal details</button>
    </form>
  );
};
