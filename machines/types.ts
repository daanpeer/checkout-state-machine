import { Address, Contact, Personal } from "../types";

export interface Context {
  tries: number;
  address: Address;
  personalData: Personal;
  contact: Contact;
}
