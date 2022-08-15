import { Context } from "./types";

export const validateAddress = ({
  address: { houseNumber, postalCode },
}: Context) => houseNumber !== "" && postalCode !== "";

export const validPersonalDetails = ({
  personalData: { firstName, lastName },
}: Context) => firstName !== "" && lastName !== "";

export const validContact = ({ contact: { phoneNumber, email } }: Context) =>
  phoneNumber !== "" && email !== "";
