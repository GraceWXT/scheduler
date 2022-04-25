/** A function that given the state variables,
 * returns an array of Appointment objects (that are references
 * of the appointments object properties)
 */
const getAppointmentsForDay = ({ days, appointments, selectedDay }) => {

  const dayObj = days.find(day => day.name === selectedDay);

  if (days.length === 0 || !dayObj) return [];
  
  const appointmentsIdArr = dayObj.appointments;
  const appointmentsObjArr = appointmentsIdArr.map(id => appointments[id]);

  return appointmentsObjArr;

};

/** A function that given the state variables,
 * returns an array of interviewer objects
 */
const getInterviewersForDay = ({ days, interviewers, selectedDay }) => {

  const dayObj = days.find(day => day.name === selectedDay);

  if (days.length === 0 || !dayObj) return [];
  
  const interviewersIdArr = dayObj.interviewers;
  const interviewersObjArr = interviewersIdArr.map(id => ({...interviewers[id]}));

  return interviewersObjArr;

};

/** A Function that given the interviewers objects and an interview object with "interviewer: id" property,
 *  returns a copy of the interview object with the matching "interviewer: object" property */
const getInterview = ({ interviewers }, interview) => {
  if (!interview) return null;

  return {...interview, interviewer: interviewers[interview.interviewer]};
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };