import React from "react";

import {
  render, cleanup, waitForElement, fireEvent, prettyDOM,
  getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText
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
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get all appointments
    const appointments = getAllByTestId(container, "appointment");

    // Get the first appointment which should be empty with the mock data
    const appointment = appointments[0];
    // console.log(prettyDOM(appointment));

    // Click the add button in the first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Change the student name input
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"),
      { target: { value: "Lydia Miller-Jones" } });

    // Select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click save button
    fireEvent.click(getByText(appointment, "Save"));

    // Output the current state of the DOM: Saving
    // debug();

    // Verify the appointment element contains the text "Saving" immediately after
    // the "Save" button is clicked
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Confirm the student's name is shown after saving
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Find the dom node for "Monday" from the array of DayListItems
    const monday = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));

    // Verify Monday has no spots remaining
    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get the "Archie Cohen" appointment
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"));

    // 3. Click the "Delete" button on the "Archie Cohen" appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete this appointment?"))
      .toBeInTheDocument();

    // 5. Click the "Confirm" button on that same appointment.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the alt text "Add" is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const monday = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));

    expect(getByText(monday, "2 spots remaining")).toBeInTheDocument();
  });
});
