const getAppointmentsForDay = (state, selectedDay) => {

  const { days, appointments } = state;

  if (days.length === 0) {
    return [];
  }

  const dayObj = days.filter(day => day.name === selectedDay)[0];

  if (!dayObj) {
    return [];
  }
  
  const appointmentsIdArr = dayObj.appointments;
  const appointmentsObjArr = appointmentsIdArr.map(id => appointments[id]);

  return appointmentsObjArr;
  
};

export { getAppointmentsForDay };