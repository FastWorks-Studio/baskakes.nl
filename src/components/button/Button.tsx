import React from "react";
import "./Button.css";

interface ButtonProps {
  click: (() => void) | string;
  center?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  click,
  children,
}) => {
  const onClick = () => {
    if (typeof click === "string") {
      window.open(click, "_blank");
    } else {
      click();
    }
  };

  return (
    <>
      <button onClick={onClick}>
        <p>{children}</p>
      </button>
    </>
  );
};
