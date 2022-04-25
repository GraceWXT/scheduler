import React, {useState} from "react";
import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList.jsx";

export default function Form(props) {

  const { student, interviewer, interviewers, handleSave, handleCancel } = props;

  const [studentName, setStudentName] = useState(student || "");
  const [interviewerId, setInterviewerId] = useState(interviewer || null);

  const handleChange = (event) => {
    setStudentName(event.target.value);
  };

  const resetForm = () => {
    setStudentName("");
    setInterviewerId(null);
  };

  const cancel = () => {
    resetForm();
    handleCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={handleChange}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerId}
          handleClick={setInterviewerId}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger handleClick={cancel}>Cancel</Button>
          <Button confirm handleClick={()=> handleSave(studentName, interviewerId)}>Save</Button>
        </section>
      </section>
    </main>
  );

}