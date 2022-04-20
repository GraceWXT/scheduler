import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const { interviewers, selectedInterviewer, setSelectedInterviewer } = props;

  const interviewerListItems = interviewers.map(interviewer => {
    const { id, name, avatar } = interviewer;
    return (
      <InterviewerListItem
        key={id}
        id={id}
        name={name}
        avatar={avatar}
        selected={selectedInterviewer === id}
        setSelectedInterviewer={setSelectedInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );

}