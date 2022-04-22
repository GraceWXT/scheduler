import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {

  const [state, setState] = useState({
    days:[],
    selectedDay: "Monday",
    appointments: {}
  });

  const { days, selectedDay, appointments } = state;
  const setSelectedDay = selectedDay => setState({ ...state, selectedDay });

  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    Promise.all([daysPromise, appointmentsPromise])
      .then(([daysResponse, appointmentsResponse]) => {
        setState(prev => ({...prev, days: daysResponse.data, appointments: appointmentsResponse.data}));
      });
  }, []);

  const dailyAppointments = [];

  const appointmentList = dailyAppointments.map(appointment => (
    <Appointment
      key={appointment.id}
      {...appointment}
    />
  ));

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
