import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview).then(() => transition(SHOW));
  };
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
          handleSave={(name, interviewer) => save(name, interviewer)}
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