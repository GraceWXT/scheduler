import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { time } = props;
  const text = time ? `Appointment at ${time}` : "No Appointmemnts";
  return (
    <article className="appointment">
      {text}
    </article>
  );
}