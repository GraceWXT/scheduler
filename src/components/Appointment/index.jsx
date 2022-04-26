import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import ConfirmDelete from "./ConfirmDelete";
import Error from "./Error";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview, deleteInterview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRMDELTE = "CONFIRMDELTE";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const saveAppo = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };
  const editAppo = () => {
    transition(EDIT);
  };
  const confirmDeleteOfAppo = () => {
    transition(CONFIRMDELTE);
  };
  const deleteAppo = () => {
    console.log("deleteAppo called");
    transition(DELETING, true);
    deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const body = (() => {
    switch (mode) {
    case EMPTY:
      return <Empty handleAdd={()=>transition(CREATE)}/>;
    case SHOW:
      return (
        <Show
          {...interview}
          handleDelete={confirmDeleteOfAppo}
          handleEdit={editAppo}
        />
      );
    case CREATE:
      return (
        <Form
          interviewers={interviewers}
          handleSave={(name, interviewer) => saveAppo(name, interviewer)}
          handleCancel={()=>back()}
        />
      );
    case SAVING:
      return <Status message="Saving" />;
    case CONFIRMDELTE:
      return (
        <ConfirmDelete
          message="Are you sure you would like to delete this appointment?"
          handleConfirm={deleteAppo}
          handleCancel={()=>back()}
        />
      );
    case DELETING:
      return <Status message="Deleting" />;
    case EDIT:
      return (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          handleSave={(name, interviewer) => saveAppo(name, interviewer)}
          handleCancel={()=>back()}
        />
      );
    case ERROR_SAVE:
      return (
        <Error
          message="Could not save the appointment."
          handleClose={()=>back()}
        />
      );
    case ERROR_DELETE:
      return (
        <Error
          message="Could not cancel the appointment."
          handleClose={()=>back()}
        />
      );
    default:
      return;
    }
  })();

  return (
    <article className="appointment">
      <Header time={time}/>
      {body}
    </article>
  );

}