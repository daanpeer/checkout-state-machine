import { Address, Contact, Personal } from "../types";

export interface Context {
  tries: number;
  address: Address;
  personalData: Personal;
  contact: Contact;
}

export type Events =
  | {
      type: "COMMIT_ADDRESS";
      address: Address;
    }
  | {
      type: "COMMIT_CONTACT";
      contact: Contact;
    }
  | {
      type: "COMMIT_PERSONAL_DATA";
      personal: Personal;
    }
  | {
      type: "NEXT";
    }
  | {
      type: "PREV";
    }
  | {
      type: "RESET";
    }
  | {
      type: "SUBMIT";
    }
  | {
      type: "RETRY";
    };
