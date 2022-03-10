describe("Task stats", () => {
  context("when all 3 tasks are incomplete", () => {
    it("displays the correct stats", () => {
      cy.seedAndVisitTasks();
      cy.get("[data-cy='closedStat']").should("contain", 0);
      cy.get("[data-cy='openStat']").should("contain", 3);
      cy.get("[data-cy='completionStat']").should("contain", "0%");
    });
  });

  context("when a task is marked complete", () => {
    before(() => {
      cy.seedAndVisitTasks();
      cy.markTaskComplete();
    });

    it("increments the closed task stat", () => {
      cy.get("[data-cy='closedStat']").should("contain", 1);
    });

    it("decrements the open task stat", () => {
      cy.get("[data-cy='openStat']").should("contain", 2);
    });

    it("updates the completion rate", () => {
      cy.get("[data-cy='completionStat']").should("contain", "33%");
    });
  });

  context("when a task is deleted", () => {
    before(() => {
      cy.seedAndVisitTasks();
    });

    it("updates the stats", () => {
      cy.markTaskComplete();

      cy.get("[data-cy='closedStat']").should("contain", 1);
      cy.get("[data-cy='openStat']").should("contain", 2);
      cy.get("[data-cy='completionStat']").should("contain", "33%");

      cy.deleteTaskRequest();

      cy.get("[data-cy='closedStat']").should("contain", 0);
      cy.get("[data-cy='openStat']").should("contain", 2);
      cy.get("[data-cy='completionStat']").should("contain", "0%");
    });
  });
});
