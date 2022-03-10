describe("Task list", () => {
  context("on page load", () => {
    before(() => {
      cy.seedAndVisitTasks();
    });

    it("displays an avatar", () => {
      cy.get("[data-cy='avatar']").first().should("be.visible");
    });

    it("displays a task name", () => {
      cy.get("[data-cy='name']").first().should("be.visible");
    });

    it("displays a task description", () => {
      cy.get("[data-cy='description']").first().should("be.visible");
    });

    it("displays a checkbox", () => {
      cy.get("[data-cy='checkbox']").should("be.visible");
    });
  });

  context("when a task is marked complete", () => {
    beforeEach(() => {
      cy.seedAndVisitTasks();
      cy.markTaskComplete();
    });

    it("strikes through the task text", () => {
      cy.get("[data-cy='completedTask']")
        .should("have.length", 1)
        .and(
          "have.css",
          "text-decoration",
          "line-through 2px solid rgb(158, 158, 158)"
        );
    });

    it("replaces checkbox with timestamp", () => {
      cy.get("[data-cy='timestamp']").should("have.text", "10.30 AM");
      cy.get("[data-cy='checkbox']").should("not.be", "visible");
    });
  });

  context("when a task is deleted", () => {
    before(() => {
      cy.seedAndVisitTasks();
    });

    it("removes it from the list", () => {
      cy.get("[data-cy='task']").as("list");
      cy.get("@list").should("have.length", 3).and("contain", "Read a book");

      cy.deleteTaskRequest();

      cy.get("@list")
        .should("have.length", 2)
        .and("not.contain", "Read a book");
    });
  });
});
