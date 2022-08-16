import {ReactNode} from "react";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => (
  <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
);
