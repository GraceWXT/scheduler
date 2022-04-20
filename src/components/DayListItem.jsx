import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const classString = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  const formatSpots = () => {
    switch (props.spots) {
    case 0:
      return "no spots";
    case 1:
      return "1 spot";
    default:
      return `${props.spots} spots`;
    }
  };
  return (
    <li
      selected={props.selected}
      className={classString}
      id={props.key}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}