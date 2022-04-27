import React, {useState, useEffect} from "react";
import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList.jsx";

export default function Form(props) {

  const { student, interviewer, interviewers, handleSave, handleCancel } = props;

  const [studentName, setStudentName] = useState(student || "");
  const [interviewerId, setInterviewerId] = useState(interviewer || null);
  const [error, setError] = useState("");

  // Auto focus on student name input upon form rendering
  useEffect(()=> {
    document.getElementsByClassName("appointment__create-input")[0].focus();
  });

  const handleChange = event => setStudentName(event.target.value);

  const resetForm = () => {
    setStudentName("");
    setInterviewerId(null);
  };

  const cancel = () => {
    resetForm();
    handleCancel();
  };

  const validate = () => {
    if (studentName === "" || studentName.trim() === "") {
      return setError("Student name cannot be blank");
    }
    if (interviewerId === null) {
      return setError("Please select an interviewer");
    }
    setError("");
    handleSave(studentName, interviewerId);
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
            data-testid="student-name-input"
            value={studentName}
            onChange={handleChange}
          />
          <section className="appointment__validation">{error}</section>
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
          <Button confirm handleClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );

}