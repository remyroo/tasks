describe("Task form", () => {
  beforeEach(() => {
    cy.visit("/new");
  });

  after(() => {
    cy.resetDatabase();
  });

  const typeTaskName = "Read the Hobbit";
  const typeTaskDescription = "Invite friends to read along";

  it("focuses task name input field on load", () => {
    cy.focused().should("have.attr", "name", "name");
  });

  it("accepts name input", () => {
    cy.get("input[name=name]")
      .type(typeTaskName)
      .should("have.value", typeTaskName);
  });

  it("accepts description input", () => {
    cy.get("input[name=description]")
      .type(typeTaskDescription)
      .should("have.value", typeTaskDescription);
  });

  context("Form submission", () => {
    beforeEach(() => {
      cy.resetDatabase();
      cy.server();
      cy.route("POST", "/api/v1/tasks").as("create");
    });

    it("requires task name input to be filled", () => {
      cy.get("input[name=name]")
        .then(($el) => $el[0].checkValidity())
        .should("be.false");
      cy.get("input[name=name]")
        .type(typeTaskName)
        .then(($el) => $el[0].checkValidity())
        .should("be.true");
    });

    it("creates a new task on submit", () => {
      cy.get("input[name=name]").type(typeTaskName);
      cy.get("input[name=description]").type(typeTaskDescription);
      cy.get("button[type='submit']").click();

      cy.wait("@create");

      cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
      cy.get("[data-cy='task']")
        .should("have.length", 1)
        .and("contain", typeTaskName)
        .and("contain", typeTaskDescription);
    });

    it("displays an error on failed submission", () => {
      cy.route({
        url: "/api/v1/tasks",
        method: "POST",
        status: 500,
        response: {},
      });

      cy.get("input[name=name]").type("test{enter}");

      cy.get("[data-cy='alerts']")
        .should("be.visible")
        .and("contain", "Request failed with status code 500");
    });
  });
});
