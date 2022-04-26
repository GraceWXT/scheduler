import React from "react";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getInterviewersForDay, getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application() {

  const {
    state,
    setSelectedDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  const { days, selectedDay } = state;

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
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
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
