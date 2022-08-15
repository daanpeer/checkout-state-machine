import type { NextPage } from "next";
import { inspect } from "@xstate/inspect";
import { useMachine } from "@xstate/react";
import { checkoutMachine, Steps } from "../machines/checkoutMachine";
import { Step } from "../components/Step";
import { AddressForm } from "../components/AddressForm";
import { PersonalForm } from "../components/PersonalForm";
import { ContactForm } from "../components/ContactForm";
import { Stepper } from "../components/Stepper";

if (typeof window !== "undefined") {
  inspect({
    iframe: false,
  });
}

const Checkout: NextPage = () => {
  const [state, send] = useMachine(checkoutMachine, { devTools: true });
  return (
    <>
      {!["success", "submitting", "error"].some(state.matches) && <Stepper activeStep={state.value.toString()} />}
      {state.matches("submitting") && <Step icon={`🕰`} title="Loading.." />}
      {state.matches("overview") && (
        <Step
          title="Cart"
          icon={"🛒"}
          actions={
            <button onClick={() => send("NEXT")} disabled={!state.can("NEXT")}>
              Next step
            </button>
          }
        >
          <ul>
            <li>Alles-in-1 Complete</li>
            <li>Help with installation</li>
          </ul>
        </Step>
      )}
      {state.matches("address") && (
        <Step
          title="Address"
          icon={`🏡`}
          actions={
            <>
              <button
                onClick={() => send("PREV")}
                disabled={!state.can("PREV")}
              >
                Previous step
              </button>
              <button
                onClick={() => send("NEXT")}
                disabled={!state.can("NEXT")}
              >
                Next step
              </button>
            </>
          }
        >
          <AddressForm
            onSubmitAddress={(address) => {
              send({
                type: "COMMIT_ADDRESS",
                address,
              });
            }}
            initialAddress={{
              postalCode: state.context.address.postalCode || "8000ab",
              houseNumber: state.context.address.houseNumber || "123",
            }}
          />
        </Step>
      )}
      {state.matches("personalDetails") && (
        <Step
          title="Personal details"
          icon={`🙋‍♂️`}
          actions={
            <>
              <button
                onClick={() => send("PREV")}
                disabled={!state.can("PREV")}
              >
                Previous step
              </button>
              <button
                onClick={() => send("NEXT")}
                disabled={!state.can("NEXT")}
              >
                Next step
              </button>
            </>
          }
        >
          <PersonalForm
            onSubmitPersonal={(personal) => {
              send({
                type: "COMMIT_PERSONAL_DATA",
                personal,
              });
            }}
            initialPersonal={{
              firstName: state.context.personalData.firstName || "Saul",
              lastName: state.context.personalData.lastName || "Goodman",
            }}
          />
        </Step>
      )}
      {state.matches("contact") && (
        <Step
          title="Contact"
          icon={`☎️`}
          actions={
            <>
              <button
                onClick={() => send("PREV")}
                disabled={!state.can("PREV")}
              >
                Previous step
              </button>
              <button
                onClick={() => send("SUBMIT")}
                disabled={!state.can("SUBMIT")}
              >
                Submit 🚀
              </button>
            </>
          }
        >
          <ContactForm
            onSubmitContact={(contact) => {
              send({
                type: "COMMIT_CONTACT",
                contact,
              });
            }}
            initialContact={{
              email: state.context.contact.email || "saul@goodman.com",
              phoneNumber: state.context.contact.phoneNumber || "06123456789",
            }}
          />
        </Step>
      )}
      {state.matches("error") && (
        <Step
          icon={`❌`}
          title={"FAIL!"}
          actions={
            <>
              <button
                onClick={() => send("RETRY")}
                disabled={!state.can("RETRY")}
              >
                Retry!
              </button>
            </>
          }
        >
          <h1>Oops!</h1>
        </Step>
      )}
      {state.matches("success") && (
        <Step
          icon={`✅`}
          title="SUCCESS!"
        >
          <h1>Success!</h1>
        </Step>
      )}
    </>
  );
};

export default Checkout;
