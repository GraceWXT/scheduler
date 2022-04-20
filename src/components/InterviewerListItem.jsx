import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const { name, avatar, selected, setSelectedInterviewer } = props;

  const classString = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  const conditionalName = selected ? name : "";

  return (
    <li
      className={classString}
      onClick={setSelectedInterviewer}
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