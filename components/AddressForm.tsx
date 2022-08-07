import { useState } from "react";
import { Address } from "../types";
import { Input } from "./Input";

type Props = {
  onSubmitAddress: (address: Address) => void;
  initialAddress: Partial<Address>;
};

export const AddressForm = ({ initialAddress, onSubmitAddress }: Props) => {
  const [postalCode, setPostalCode] = useState(initialAddress.postalCode || "");
  const [houseNumber, setHouseNumber] = useState(
    initialAddress.houseNumber || ""
  );
  return (
    <form
      style={{ marginBottom: "10px"}}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitAddress({
          postalCode,
          houseNumber,
        });
      }}
    >
      <Input
        name="postalCode"
        onChange={(value) => setPostalCode(value)}
        value={postalCode}
        label="Postal code"
      />
      <Input
        name="houseNumber"
        onChange={(value) => setHouseNumber(value)}
        value={houseNumber}
        label="House number"
      />
      <button type="submit">Submit address</button>
    </form>
  );
};
