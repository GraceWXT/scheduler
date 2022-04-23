/** A function that given the state variables and a selected day,
 * returns an array of Appointment objects (that are references
 * of the appointments object properties)
 */
const getAppointmentsForDay = (state, selectedDay) => {

  const { days, appointments } = state;

  if (days.length === 0) return [];

  const dayObj = days.filter(day => day.name === selectedDay)[0];

  if (!dayObj) return [];
  
  const appointmentsIdArr = dayObj.appointments;
  const appointmentsObjArr = appointmentsIdArr.map(id => appointments[id]);

  return appointmentsObjArr;

};

/** A Function that given an interview object with "interviewer: id" property,
 *  returns a copy of the interview object with the matching "interviewer: object" property */
const getInterview = ({ interviewers }, interview) => {
  if (!interview) return null;

  return {...interview, interviewer: interviewers[interview.interviewer]};
};

export { getAppointmentsForDay, getInterview };