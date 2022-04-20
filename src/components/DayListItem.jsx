import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const { key, name, spots, selected, setDay } = props;

  const classString = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  const formatSpots = (spots) => {
    switch (spots) {
    case 0:
      return "no spots";
    case 1:
      return "1 spot";
    default:
      return `${spots} spots`;
    }
  };

  return (
    <li
      selected={selected}
      className={classString}
      id={key}
      onClick={() => setDay(name)}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
  
}