import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  // Destrucure the props object
  const { confirm, danger, disabled, handleClick, children } = props;

  // Generate the class string conditionally
  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={buttonClass}
    >
      {children}
    </button>
  );

}
