describe("Task home page", () => {
  context("On page load", () => {
    it("displays start instructions if no tasks are present", () => {
      cy.seedAndVisitTasks([]);

      cy.get("[data-cy='alerts']")
        .should("be.visible")
        .and("contain", "add a task");

      cy.get("[data-cy='tasks']").should("not.be", "visible");
      cy.get("[data-cy='stats']").should("not.be", "visible");
    });

    it("loads tasks on page load", () => {
      cy.seedAndVisitTasks();

      cy.get("[data-cy='alerts']").should("not.be", "visible");
      cy.get("[data-cy='task']").should("have.length", 3);
    });

    it("displays task stats", () => {
      cy.seedAndVisitTasks();

      cy.get("[data-cy='stats']").children().should("have.length", 2);

      cy.get("[data-cy='stats']")
        .children()
        .first()
        .should("have.class", "MuiDivider-root");

      cy.get("[data-cy='stats']").children().last().should("contain", "Stats");
    });

    it("displays an error if tasks fail to load", () => {
      cy.server();
      cy.route({
        url: "/api/v1/tasks",
        method: "GET",
        status: 500,
        response: {},
      });
      cy.visit("/");

      cy.get("[data-cy='alerts']")
        .should("be.visible")
        .and("contain", "Request failed with status code 500");

      cy.get("[data-cy='tasks']").should("not.be", "visible");
      cy.get("[data-cy='stats']").should("not.be", "visible");
    });

    it("displays loading spinner when fetching data", () => {
      cy.server();
      cy.route({
        url: "/api/v1/tasks",
        method: "GET",
        delay: 1000,
        response: "fixture:tasks.json",
      });
      cy.visit("/?delay=500");

      cy.get("[data-cy='spinner']").should("be.visible");
      cy.get("[data-cy='spinner']").should("not.be", "visible");
      cy.get("[data-cy='task']").should("have.length", 3);
    });
  });
});
