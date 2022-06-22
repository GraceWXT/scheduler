// create const for each action types which works like enums
const SET_SELECTED_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// A reducer function returns the updated state
// for different action types
const reducer = (state, action) => {
  // Destructure the action object to get the values needed
  const { selectedDay, days, appointments, interviewers, id, interview } = action;

  switch (action.type) {

  // For action type "SET_SELECTED_DAY", update the selected day in the state object
  case SET_SELECTED_DAY:
    return { ...state, selectedDay };

  // For action type "SET_APPLICATION_DATA",
  // update the days, appointments and interviewers data in the state object
  case SET_APPLICATION_DATA:
    return { ...state, days, appointments, interviewers};

  // For action type "SET_INTERVIEW",
  // update the interview object (of given id) in the appointments object,
  // and update the spots remaining in the days array
  case SET_INTERVIEW: {
    // Update appointments
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Update days
    const updateSpotsOfDays = (id, appointments) => {
      const oldDayObj = state.days.find(day => day.appointments.includes(id));
      const spots = oldDayObj.appointments.filter((appoId) => !appointments[appoId].interview).length;
      const days = state.days.map(day => {
        if (day.id === oldDayObj.id) return {...oldDayObj, spots};
        return day;
      });
      return days;
    };
    const days = updateSpotsOfDays(id, appointments);
    // Return the state with updated appointments and days
    return { ...state, appointments, days};
  }
  // Throw an error if the action type is not listed above
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
};

export default reducer;
export { SET_SELECTED_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };
