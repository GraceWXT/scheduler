import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // Destrucure the props object
  const { name, avatar, selected, handleClick } = props;

  // Generate the class string conditionally
  const classString = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  // Show the interviewer's name when it's selected
  const conditionalName = selected ? name : "";

  return (
    <li
      className={classString}
      onClick={handleClick}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {conditionalName}
    </li>
  );

}