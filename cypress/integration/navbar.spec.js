describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Landing page", () => {
    it("displays 'Tasks' title", () => {
      cy.get("[data-cy='title']").should("have.text", "Tasks");
    });

    it("displays dark mode toggle", () => {
      cy.get("[data-cy='darkModeToggle']").should("be.visible");
    });

    it("displays link to form page", () => {
      cy.get("[data-cy='formLink']").should("be.visible");
    });
  });

  context("Form page", () => {
    it("displays 'Add Task' title only", () => {
      cy.get("[data-cy='formLink']").click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}/new`);

      cy.get("[data-cy='title']").should("have.text", "Add Task");
      cy.get("[data-cy='darkModeToggle']").should("not.be", "visible");
      cy.get("[data-cy='formLink']").should("not.be", "visible");
    });
  });

  context("Dark mode toggle", () => {
    context("on page load", () => {
      it("defaults to light mode", () => {
        cy.get("body").should(
          "have.css",
          "background-color",
          "rgb(255, 255, 255)"
        );

        cy.get("[data-cy=banner]").should(
          "have.css",
          "background-color",
          "rgb(239, 108, 0)"
        );

        cy.get("[data-cy='title']").should(
          "have.css",
          "color",
          "rgb(66, 66, 66)"
        );

        cy.get("[data-cy='darkModeToggle']")
          .children()
          .should("have.css", "color", "rgb(239, 108, 0)");

        cy.get("[data-cy='formLink']")
          .children()
          .should("have.css", "color", "rgb(239, 108, 0)");
      });
    });

    context("when dark mode toggle clicked", () => {
      it("switches to dark mode", () => {
        cy.get("[data-cy='darkModeToggle']").click();

        cy.get("body").should("have.css", "background-color", "rgb(0, 30, 60)");

        cy.get("[data-cy=banner]").should(
          "have.css",
          "background-color",
          "rgb(230, 81, 0)"
        );

        cy.get("[data-cy='title']").should(
          "have.css",
          "color",
          "rgb(224, 224, 224)"
        );

        cy.get("[data-cy='darkModeToggle']")
          .children()
          .should("have.css", "color", "rgb(230, 81, 0)");

        cy.get("[data-cy='formLink']")
          .children()
          .should("have.css", "color", "rgb(230, 81, 0)");
      });
    });
  });
});
