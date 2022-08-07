// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {};
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "overview"
    | "personal"
    | "personal.address"
    | "personal.address.initial"
    | "personal.address.validate"
    | "personal.address.validated"
    | "personal.personal"
    | "personal.contact"
    | "personal.banking"
    | "switch"
    | "finalize"
    | {
        personal?:
          | "address"
          | "personal"
          | "contact"
          | "banking"
          | { address?: "initial" | "validate" | "validated" };
      };
  tags: never;
}
