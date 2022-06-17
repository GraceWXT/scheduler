import React from "react";

import {
  render, cleanup, waitForElement, fireEvent, prettyDOM,
  getByText, getAllByTestId, getByAltText, getByPlaceholderText
} from "@testing-library/react";

import Application from "components/Application";

describe("Application", () => {
  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    console.log(prettyDOM(container));

    // Get all appointments
    const appointments = getAllByTestId(container, "appointment");
    console.log(prettyDOM(appointments));

    // Get the first appointment which should be empty with the mock data
    const appointment = appointments[0];
    console.log(prettyDOM(appointment));

    // Click the add button in the first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Change the student name input
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"),
      { target: { value: "Lydia Miller-Jones" } });

    // Select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click save button
    fireEvent.click(getByText(appointment, "Save"));
  });
});
