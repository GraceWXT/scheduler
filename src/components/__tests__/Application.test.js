import React from "react";
import axios from "axios";

import {
  render, cleanup, waitForElement, fireEvent, prettyDOM,
  getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, getByDisplayValue
} from "@testing-library/react";

import Application from "components/Application";

describe("Application", () => {
  afterEach(cleanup);

  // Loading data and changing the schedule asynchronously
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  // Booking an interview
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

  // Deleting an interview
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

  // Editing and interview
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get the "Archie Cohen" appointment
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"));

    // 3. Click the "Edit" button on the "Archie Cohen" appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Change the student name and selected interviewer
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"),
      { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Confirm the student's name is changed after saving
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const monday = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));

    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
  });

  // Error Handling - Saving
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

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

    // Verify the appointment element contains the text "Saving" immediately after
    // the "Save" button is clicked
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Output the current state of the DOM: Saving
    debug();

    // Confirm the saving error is shown
    await waitForElement(() => getByText(appointment, "Could not save the appointment."));

    // Click the close button
    fireEvent.click(getByAltText(appointment, "Close"));

    // Confirm the appointment card is back to form
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument();

    // Find the dom node for "Monday" from the array of DayListItems
    const monday = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));

    // Verify Monday still has 1 spot remaining
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

  });

  // Error Handling - Deleting
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
  });
});
