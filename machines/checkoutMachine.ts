import { assign } from "xstate";
import {
  validateAddress,
  validContact,
  validPersonalDetails,
} from "./validation";
import { Context } from "./types";
import { Address, Contact, Personal } from "../types";
import {createModel} from "xstate/lib/model";

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

const checkoutModel = createModel(initialContext, {
  events: {
    COMMIT_ADDRESS: (address: Address) => ({ address }),
    NEXT: () => ({}),
    PREV: () => ({}),
    COMMIT_PERSONAL_DATA: (personal: Personal) => ({ personal }),
    COMMIT_CONTACT: (contact: Contact) => ({ contact }),
    SUBMIT: () => ({}),
    RETRY: () => ({}),
  },
});

export const checkoutMachine = checkoutModel.createMachine(
  {
    id: "wizard",
    context: checkoutModel.initialContext,
    initial: "overview",
    schema: {
      services: {} as {
        submit: {
          data: void,
        },
      }
    },
    states: {
      [Steps.Overview]: {
        on: {
          NEXT: "address",
        },
      },
      [Steps.Address]: {
        on: {
          COMMIT_ADDRESS: {
            actions: checkoutModel.assign((ctx, e) => ({
              address: e.address,
            })),
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
            actions: checkoutModel.assign({
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
