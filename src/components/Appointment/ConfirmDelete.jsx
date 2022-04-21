import React from "react";
import Button from "components/Button";

export default function ConfirmDelete(props) {

  const { message, handleConfirm, handleCancel } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={handleConfirm}>Confirm</Button>
        <Button danger onClick={handleCancel}>Cancel</Button>
      </section>
    </main>
  );

}