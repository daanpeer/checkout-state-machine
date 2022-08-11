import { Steps } from "../machines/checkoutMachine";

type Props = {
  activeStep: string;
};

export const Stepper = ({ activeStep }: Props) => (
  <div
    style={{
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {Object.entries(Steps).map(([key, value], index) => (
      <div
        key={value}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          #{index + 1} {key}
        </div>
        {value === activeStep && <span style={{ fontSize: "40px" }}>👆</span>}
      </div>
    ))}
  </div>
);
