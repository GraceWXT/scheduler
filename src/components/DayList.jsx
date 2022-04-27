import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // Destrucure the props object
  const { days, value, handleClick } = props;
  
  // Map the days array to an array of <DayListItem>s
  const dayListItems = days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === value}
      handleClick={() => handleClick(day.name)}
    />
  ));

  return (
    <ul>
      {dayListItems}
    </ul>
  );
  
}