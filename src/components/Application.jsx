import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getInterviewersForDay, getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application() {

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

  const { days, selectedDay } = state;

  const setSelectedDay = selectedDay => setState({ ...state, selectedDay });

  const dailyAppointmentsArr = getAppointmentsForDay(state);

  const appointmentList = dailyAppointmentsArr.map(appointment => {

    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={selectedDay}
            handleClick={setSelectedDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
