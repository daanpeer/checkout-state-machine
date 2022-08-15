import { assign, createMachine } from "xstate";
import {
  validateAddress,
  validContact,
  validPersonalDetails,
} from "./validation";
import { Context, Events } from "./types";

const initialContext: Context = {
  tries: 0,
  address: {
    houseNumber: "",
    postalCode: "",
  },
  personalData: {
    firstName: "",
    lastName: "",
  },
  contact: {
    phoneNumber: "",
    email: "",
  },
};

export enum Steps {
  Overview = 'overview',
  Address = 'address',
  PersonalDetails = 'personalDetails',
  Contact = 'contact',
}

export const checkoutMachine = createMachine<Context, Events>(
  {
    id: "wizard",
    context: initialContext,
    initial: "overview",
    states: {
      [Steps.Overview]: {
        on: {
          NEXT: Steps.Address,
        },
      },
      [Steps.Address]: {
        on: {
          COMMIT_ADDRESS: {
            actions: assign({
              address: (_, e) => e.address,
            }),
          },
          NEXT: {
            cond: validateAddress,
            target: Steps.PersonalDetails,
          },
          PREV: "overview",
        },
      },
      [Steps.PersonalDetails]: {
        on: {
          COMMIT_PERSONAL_DATA: {
            actions: assign({
              personalData: (_, e) => e.personal,
            }),
          },
          NEXT: {
            cond: validPersonalDetails,
            target: Steps.Contact,
          },
          PREV: "address",
        },
      },
      [Steps.Contact]: {
        on: {
          COMMIT_CONTACT: {
            actions: assign({
              contact: (_, e) => e.contact,
            }),
          },
          PREV: Steps.PersonalDetails,
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
        type: "final",
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
