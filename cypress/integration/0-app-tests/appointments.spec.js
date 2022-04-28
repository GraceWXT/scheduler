describe("Appointments", () => {

  beforeEach(() => {
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
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

});