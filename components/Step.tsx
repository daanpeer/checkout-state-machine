import React from "react";

type Props = {
  icon: string;
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export const Step = ({ title, icon, children, actions }: Props) => (
  <div>
    <div style={{ textAlign: "center" }}>
      <h1>{title}</h1>
    </div>
    <div
      style={{
        fontSize: "90px",
        textAlign: "center",
      }}
    >
      {icon}
    </div>
    <div style={{ padding: "10px" }}>{children}</div>
    <div style={{ padding: "5px" }}>{actions}</div>
  </div>
);
