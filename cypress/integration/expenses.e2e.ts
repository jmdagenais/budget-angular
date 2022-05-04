import { getRandomNumber, getRandomString } from "./../utils";

describe("Expenses page", () => {
  beforeEach(() => {
    cy.login();

    cy.visit("/app/expenses");
  });

  it("has expenses table", () => {
    cy.get("expenses-table");
    cy.contains("Counterparty");
    cy.contains("Category");
    cy.contains("Value");
  });

  it("adds a new expense", () => {
    // const date = new Date().toLocaleDateString().replace(/\./g, "/");
    // const expectedDate = date.substring(0, 6) + date.substr(8);
    const date = '5/1/22';
    const expectedDate = '01/05/22';
    const cp = getRandomString();
    const value = getRandomNumber();

    // open the popup form to add expense
    cy.get("[data-cy=add-expense]").click();

    // enter the data
    cy.get("[data-cy=expense-date]").clear().type(date);
    cy.get("[data-cy=expense-counterparty]").type(cp);
    cy.get("[data-cy=expense-category]").click();
    cy.get("mat-option").contains("Shopping").click();
    cy.get("[data-cy=expense-value]").clear().type(value.toString());

    // click save
    // debugger;
    cy.get("[data-cy=save-btn]").click();
    // cy.contains("Save").click();

    // expect success message
    cy.contains("Success");

    // expect expense to be present after refresh
    cy.reload(true);
    cy.get("[data-cy=et-date]").contains(expectedDate);
    cy.get("[data-cy=et-counterparty]").contains(cp);
    cy.get("[data-cy=et-value]").contains(`$${value}`);
  });
});
