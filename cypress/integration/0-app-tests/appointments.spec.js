describe("Appointments", () => {

  beforeEach(() => {
    cy.request("/api/debug/reset");
    cy.visit("/");
  });

  it("should book an interview", () => {
    cy.contains("Monday");
  });
});