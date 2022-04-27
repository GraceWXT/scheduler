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
    const handleSave = jest.fn();

    /* 2. Render the Form with interviewers and the handleSave mock function passed as an handleSave prop, the student prop should be blank or undefined */
    const { getByText } = render(
      <Form
        interviewer={1}
        interviewers={interviewers}
        handleSave={handleSave}
      />
    );

    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. handleSave is not called */
    expect(handleSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock handleSave function */
    const handleSave = jest.fn();

    /* 2. Render the Form with interviewers and the handleSave mock function passed as an handleSave prop, the interviewer prop should be null */
    const { getByText } = render(
      <Form
        student="Lydia Miller-Jones"
        interviewer={null}
        interviewers={interviewers}
        handleSave={handleSave}
      />
    );

    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    /* 1. validation is shown */
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  
    /* 1. handleSave is not called */
    expect(handleSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const handleSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewer={1} interviewers={interviewers} handleSave={handleSave} />
    );
      
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
      
    const input = getByPlaceholderText("Enter Student Name");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  
    fireEvent.click(saveButton);
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});