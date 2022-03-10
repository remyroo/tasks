import axios from "axios";

Cypress.Commands.add("resetDatabase", async () => {
  return await axios.post("http://localhost:3000/test/reset_database");
});

Cypress.Commands.add("seedAndVisitTasks", (seedData = "fixture:tasks") => {
  cy.server();
  cy.route("GET", "/api/v1/tasks", seedData);
  cy.visit("/");
});

Cypress.Commands.add("markTaskComplete", () => {
  cy.server();
  cy.route("PUT", "/api/v1/tasks/1", {
    id: 1,
    name: "Read a book",
    description: "Ask a friend for a recommendation.",
    completed_at: "10.30 AM",
  });
  cy.get("[type='checkbox']").first().check();
});

Cypress.Commands.add("deleteTaskRequest", () => {
  cy.server();
  cy.route({
    url: "/api/v1/tasks/1",
    method: "DELETE",
    status: 204,
    response: {},
  });
  cy.get("[data-cy='delete']").first().click();
});
