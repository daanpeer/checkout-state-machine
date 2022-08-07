import { createMachine, assign } from "xstate";
import { Address, Contact, Personal } from "../types";

interface Context {
  tries: number;
  address: Address;
  personalData: Personal;
  contact: Contact;
}

const validateAddress = ({ address: { houseNumber, postalCode } }: Context) =>
  houseNumber !== "" && postalCode !== "";

const validPersonalDetails = ({
  personalData: { firstName, lastName },
}: Context) => firstName !== "" && lastName !== "";

const validContact = ({ contact: { phoneNumber, email } }: Context) =>
  phoneNumber !== "" && email !== "";

const initialContext: Context = {
  tries: 0,
  address: {
    houseNumber: "99",
    postalCode: "89123ax",
  },
  personalData: {
    firstName: "Saul",
    lastName: "Goodman",
  },
  contact: {
    phoneNumber: "0521-better-call-saul",
    email: "saul@goodman.com",
  },
};

type Events =
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

export const checkoutMachine = createMachine<Context, Events>(
  {
    id: "wizard",
    context: initialContext,
    initial: "overview",
    states: {
      overview: {
        on: {
          NEXT: "address",
        },
      },
      address: {
        on: {
          COMMIT_ADDRESS: {
            actions: assign({
              address: (_, e) => e.address,
            }),
          },
          NEXT: {
            cond: validateAddress,
            target: "personalDetails",
          },
          PREV: "overview",
        },
      },
      personalDetails: {
        on: {
          COMMIT_PERSONAL_DATA: {
            actions: assign({
              personalData: (_, e) => e.personal,
            }),
          },
          NEXT: {
            cond: validPersonalDetails,
            target: "contact",
          },
          PREV: "address",
        },
      },
      contact: {
        on: {
          COMMIT_CONTACT: {
            actions: assign({
              contact: (_, e) => e.contact,
            }),
          },
          PREV: "personalDetails",
          SUBMIT: {
            target: "submitting",
            cond: validContact,
          },
        },
      },
      submitting: {
        entry: assign({
          tries: (ctx) => ctx.tries + 1,
        }),
        invoke: {
          src: "submit",
          onDone: "success",
          onError: "error",
        },
      },
      error: {
        on: {
          RETRY: "submitting",
        },
      },
      success: {
        on: {
          RESET: {
            target: "overview",
            actions: assign(() => initialContext),
          },
        },
      },
    },
  },
  {
    services: {
      submit: (ctx) =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (ctx.tries === 1) {
              reject();
              return;
            }
            resolve();
          }, 3000);
        }),
    },
  }
);
