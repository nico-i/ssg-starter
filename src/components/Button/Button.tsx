import { ComponentProps } from "@types";
import React from "react";

export interface ButtonProps extends ComponentProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button = ({
  children,
  onClick,
  dataTestId,
}: Readonly<ButtonProps>) => {
  return (
    <button onClick={onClick} data-testid={dataTestId}>
      {children}
    </button>
  );
};
