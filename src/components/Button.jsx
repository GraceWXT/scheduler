import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {

  const { confirm, danger, disabled, handleClick, children } = props;

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
