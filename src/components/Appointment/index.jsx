import React, { useEffect } from "react";
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
  // Destrucure the props object
  const { id, time, interview, interviewers, bookInterview, deleteInterview } = props;

  // Setup the visual mode
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

  useEffect(() => {
    if (mode === EMPTY && interview) transition(SHOW);
    if (mode === SHOW && !interview) transition(EMPTY);
  }, [ mode, interview, transition ]);

  // Functions that handles button click in different modes
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
    transition(DELETING, true);
    deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  // Use body[mode]() to conditionally render the body of appointment
  const body = {
    EMPTY: () => <Empty handleAdd={()=>transition(CREATE)}/>,
    SHOW: () =>
      (interview ?
        <Show
          {...interview}
          handleDelete={confirmDeleteOfAppo}
          handleEdit={editAppo}
        /> : ""),
    CREATE: () =>
      <Form
        interviewers={interviewers}
        handleSave={(name, interviewer) => saveAppo(name, interviewer)}
        handleCancel={()=>back()}
      />,
    SAVING: () => <Status message="Saving" />,
    CONFIRMDELTE: () =>
      <ConfirmDelete
        message="Are you sure you would like to delete this appointment?"
        handleConfirm={deleteAppo}
        handleCancel={()=>back()}
      />,
    DELETING: () => <Status message="Deleting" />,
    EDIT: () =>
      <Form
        student={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={interviewers}
        handleSave={(name, interviewer) => saveAppo(name, interviewer)}
        handleCancel={()=>back()}
      />,
    ERROR_SAVE: () =>
      <Error
        message="Could not save the appointment."
        handleClose={()=>back()}
      />,
    ERROR_DELETE: () =>
      <Error
        message="Could not delete the appointment."
        handleClose={()=>back()}
      />,
  }[mode]();

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time}/>
      {body}
    </article>
  );

}
