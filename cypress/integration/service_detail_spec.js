describe("Service detail", () => {
  beforeEach(() => {
    cy.intercept("/services?", {
      fixture: "services.json",
    }).as("searchForServices")
    cy.intercept("/services/1?", {
      fixture: "service.json",
    }).as("singleService")

    cy.visit("/service/1")
    cy.injectAxe()
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
})
