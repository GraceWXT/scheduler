import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, selectedDay, setSelectedDay } = props;

  const dayListItems = days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === selectedDay}
      setSelectedDay={() => setSelectedDay(day.name)}
    />
  ));

  return (
    <ul>
      {dayListItems}
    </ul>
  );
  
}