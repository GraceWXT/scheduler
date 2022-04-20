import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const { name, spots, selected, setSelectedDay } = props;

  const classString = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  const formatedSpots = ((spots) => {
    switch (spots) {
    case 0:
      return "no spots";
    case 1:
      return "1 spot";
    default:
      return `${spots} spots`;
    }
  })(spots);

  return (
    <li
      selected={selected}
      className={classString}
      onClick={setSelectedDay}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatedSpots} remaining</h3>
    </li>
  );
  
}