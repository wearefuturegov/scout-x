/* eslint-disable no-undef */
describe("Service detail", () => {
  beforeEach(() => {
    cy.intercept("/services?", {
      fixture: "services.json",
    }).as("searchForServices")
    cy.intercept("/services/1/feedback").as("singleServiceFeedback")
    cy.intercept("/services/1", {
      fixture: "service.json",
    }).as("singleService")

    cy.visit("/service/1")
    cy.injectAxe()

    cy.wait("@singleService")
  })

  it("has no detectable accessibility problems", () => {
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

  it("renders a modal with a title and address", () => {
    cy.get("div[role='dialog']")
    cy.get("h1").should("contain", "12th Aylesbury Brownies")

    cy.get("h2").should("contain", "St Joseph's Catholic Infant School")
  })

  it("has a collapsible description", () => {
    cy.get("p").contains(
      "Brownies are a group of girls aged 7 to 10 years who meet weekly in term time for fun activities, crafts, songs, badge work, games, learning new skills and making..."
    )
    cy.get("button").contains("More").click()
    cy.get("p").contains(
      "Brownies are a group of girls aged 7 to 10 years who meet weekly in term time for fun activities, crafts, songs, badge work, games, learning new skills and making new friends. "
    )
  })

  it("displays some 'good to know' points", () => {
    cy.contains("Part of the Buckinghamshire local offer for SEND")
    cy.contains("Open weekends")
    cy.contains("Suitable for 5-11 year olds")
  })

  it("can be pinned and unpinned", () => {
    cy.get("button").contains("Add to pins").click()
    cy.contains("Added to pinned services")
    cy.get("button").contains("Added").click()
  })

  it("shows hours, links and categories", () => {
    cy.get("td strong").contains("Monday")
    cy.get("td").contains("10.00 am—5.00 pm")

    cy.get("a").contains("Facebook")
    cy.get("p").contains("Clubs and groups, Things to do")
  })

  it("lets the user suggest edits", () => {
    cy.get("div[role='dialog'] a").contains("Suggest an edit").click()
    cy.wait("@singleServiceFeedback")
  })
})
