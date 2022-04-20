import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, selectedDay, setDay } = props;

  const dayListItems = days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === selectedDay}
        setDay={setDay}
      />
    );
  });

  return (
    <ul>
      {dayListItems}
    </ul>
  );
  
}