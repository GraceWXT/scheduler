import { useState, useEffect } from "react";
import axios from "axios";
const useApplicationData = () => {
  const [state, setState] = useState({
    days:[],
    selectedDay: "Monday",
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
        setState(prev => ({
          ...prev,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
        }));
      });
      
  }, []);

  const setSelectedDay = selectedDay => setState({ ...state, selectedDay });

  const updateSpotsOfDays = (id, appointments) => {
    const oldDayObj = state.days.find(day => day.appointments.includes(id));
    const spots = oldDayObj.appointments.filter(apoId => !appointments[apoId].interview).length;
    const days = state.days.map(day => {
      if (day.id === id) return {...oldDayObj, spots};
      return day;
    });
    return days;
  };
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpotsOfDays(id, appointments);

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => setState(prev => ({...prev, appointments, days})));
  };

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpotsOfDays(id, appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments, days})));
  };

  return {
    state,
    setSelectedDay,
    bookInterview,
    deleteInterview
  };
};

export default useApplicationData;