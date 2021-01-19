/* eslint-disable no-undef */
describe("Pinboard", () => {
  beforeEach(() => {
    cy.intercept("/services?", {
      fixture: "services.json",
    }).as("searchForServices")
    cy.intercept("/services/1", {
      fixture: "service.json",
    }).as("singleService")
    cy.intercept("/print").as("printList")
    cy.intercept("/send-email").as("emailList")
  })

  it("has no detectable accessibility problems", () => {
    cy.visit("/pinboard")
    cy.injectAxe()
    // disable rules that don't understand reach dialog, see: https://reach.tech/dialog/
    cy.configureAxe({
      rules: [
        {
          id: "tabindex",
          enabled: false,
        },
        {
          id: "landmark-no-duplicate-main",
          enabled: false,
        },
      ],
    })
    cy.checkA11y()
  })

  it("renders a modal with a title", () => {
    cy.visit("/pinboard")
    cy.get("div[role='dialog']")
    cy.get("h1").should("contain", "Pinned services (0)")
  })

  it("shows pinned services", () => {
    cy.visit("/service/1")
    cy.get("div[role='dialog'] button").contains("Add to pins").click()

    cy.visit("/pinboard")
    cy.get("ul li").should("contain", "12th Aylesbury Brownies")
  })

  it("can print the list", () => {
    cy.visit("/service/1")
    cy.get("div[role='dialog'] button").contains("Add to pins").click()

    cy.visit("/pinboard")
    cy.get("a").contains("Print list").click()
    cy.wait("@printList")
  })

  it("can email the list", () => {
    cy.visit("/service/1")
    cy.get("div[role='dialog'] button").contains("Add to pins").click()

    cy.visit("/pinboard")
    cy.get("button").contains("Email list").click()

    cy.get("input#email").type("example@email.com")
    cy.get("button").contains("Send email").click()
    cy.wait("@emailList")
  })
})
