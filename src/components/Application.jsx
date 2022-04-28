import React from "react";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getInterviewersForDay, getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application() {
  // Get the state object and action functions related to setting state from the custom hook
  const {
    state,
    setSelectedDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  // Destructure the state object with states needed by other functions
  const { days, selectedDay } = state;

  // Based on the selected day (part of state),
  // get an array of the appointments objects associated
  const dailyAppointmentsArr = getAppointmentsForDay(state);

  // Map the appointments objects array to an array of <Appointment> components
  const appointmentList = dailyAppointmentsArr.map(appointment => {
    // get the interview object and interviewers array for each appointment
    // so that they can be passed to each <Appointment> component as props
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

  // Returns the <Application> component which has
  // a side nav bar with the days available to make an appointment,
  // and a schedule section with the appointments list for the day selected
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
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
