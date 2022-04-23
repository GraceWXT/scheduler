import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const { time, interview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const body = (() => {
    switch (mode) {
    case EMPTY:
      return <Empty />;
    case SHOW:
      return <Show {...interview}/>;
    }
  })();

  return (
    <article className="appointment">
      <Header time={time}/>
      {body}
    </article>
  );

}