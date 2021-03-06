import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  // Destrucure the props object
  const { interviewers, value, handleClick } = props;

  // Map the interviewers array to an array of <InterviewerListItem>s
  const interviewerListItems = interviewers.map(interviewer => {
    const { id, name, avatar } = interviewer;
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={value === id}
        handleClick={() => handleClick(id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  value: PropTypes.number,
  handleClick: PropTypes.func.isRequired
};