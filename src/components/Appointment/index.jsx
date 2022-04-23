import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  const { time, interview } = props;

  const body = interview ? <Show {...interview}/> : <Empty />;

  return (
    <article className="appointment">
      <Header time={time}/>
      {body}
    </article>
  );

}