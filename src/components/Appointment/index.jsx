import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const { time, interview, interviewers } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
  const body = (() => {
    switch (mode) {
    case EMPTY:
      return <Empty handleAdd={()=>transition(CREATE)}/>;
    case SHOW:
      return <Show {...interview}/>;
    case CREATE:
      return (
        <Form
          interviewers={interviewers}
          handleCancel={()=>back()}
        />
      );
    }
  })();

  return (
    <article className="appointment">
      <Header time={time}/>
      {body}
    </article>
  );

}