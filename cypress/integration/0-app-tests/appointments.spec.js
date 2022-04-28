describe("Appointments", () => {

  beforeEach(() => {
    // Reset database and visit the app homepage before each test
    cy.request("/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Click on the Add button
    cy.get("[alt='Add']").first().click();

    // Enter the student name, select the interviewer and save
    cy.get("[data-testid='student-name-input']").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();

    // Expect the booked interview to show the correct information
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Click on the Edit button
    cy.get("[alt='Edit']").first().click({ force: true });

    // Clear the input, enter the student name, change the selected interviewer and save
    cy.get("[data-testid='student-name-input']").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();

    // Expect the booked interview to show the correct information
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Click on the Delete button, and confirm delete button
    cy.get("[alt='Delete']").first().click({ force: true });
    cy.contains("button", "Confirm").click();

    // the "Deleting" indicator should exist for a while and then be removed
    cy.contains("Deleting");
    cy.contains("Deleting").should("not.exist");

    // Confirm the absence of the "Archie Cohen" appointment
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });

});