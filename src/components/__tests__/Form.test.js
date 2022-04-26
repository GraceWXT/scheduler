import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock handleSave function */

    /* 2. Render the Form with interviewers and the handleSave mock function passed as an handleSave prop, the student prop should be blank or undefined */

    /* 3. Click the save button */

    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. handleSave is not called */
    expect(handleSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock handleSave function */

    /* 2. Render the Form with interviewers and the handleSave mock function passed as an handleSave prop, the interviewer prop should be null */

    /* 3. Click the save button */

    /* 1. validation is shown */
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  
    /* 1. handleSave is not called */
    expect(handleSave).not.toHaveBeenCalled();
  });
  
  it("calls handleSave function when the name is defined", () => {
    /* 1. Create the mock handleSave function */
    const handleSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the handleSave mock function passed as an handleSave prop */
    const { queryByText, getByText } = render(
      <Form
        student="Lydia Miller-Jones"
        interviewer={1}
        interviewers={interviewers}
        handleSave={handleSave}
      />
    );
    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    /* 1. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    /* 1. handleSave is called once*/
    expect(handleSave).toHaveBeenCalledTimes(1);
  
    /* 3. handleSave is called with the correct arguments */
    expect(handleSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});