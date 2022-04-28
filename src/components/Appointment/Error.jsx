import React from "react";

/** A component that shows the error message to the user
 * and allows the user to go back to the previous step on close */
export default function Error(props) {

  const { message, handleClose } = props;

  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={handleClose}
      />
    </main>
  );
}