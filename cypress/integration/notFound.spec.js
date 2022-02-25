describe("Not found", () => {
  context("when user accesses wrong path", () => {
    it("displays 404 page with link to homepage", () => {
      cy.visit("/non-existent-path");

      cy.get("h4").contains("Oops! Page Not Found");
      cy.get("[data-cy='urlHome']").should("have.attr", "href", "/");
    });
  });
});
