/** A function that given the state variables and a selected day,
 * returns an array of Appointment objects
 */
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

/** A Function that replaces the interviewer property in the interview object
 *  from the interviewer id to the matching interviewer object */
const getInterview = ({ interviewers }, interview) => {
  if (!interview) return null;

  return interview = {...interview, interviewer: interviewers[interview.interviewer]};
};

export { getAppointmentsForDay, getInterview };