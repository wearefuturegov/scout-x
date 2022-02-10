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

  // TO ADD
  // 1. handle multiple and no locations
  // 2. full "good to know" range
  // 3. contacts
  // 4. local offer
  // 5. hours
  // 6. accessibility
  // 7. fees
  // 8. links
  // 9. categories

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
    cy.contains("Includes information for people with SEND")
    cy.contains("Suitable for 5 to 11 year olds")
  })

  it("can be pinned and unpinned", () => {
    cy.get("button").contains("Add to pins").click()
    cy.contains("Added to pinned services")
    cy.get("button").contains("Added").click()
  })

  it("shows hours, links and categories", () => {
    cy.get("td strong").contains("Monday")
    cy.get("td").contains("10am to 5pm")

    cy.get("a").contains("Facebook")
  })

  // need to fix svg issue and the weird env variable issues befor ehtis will work properly
  // it("shows categories depending on theme settings", () => {
  // if(theme.serviceCard.hideCategories) {
  // cy.get("p").contains("Clubs and groups, Things to do").should('not.exist')
  // } else {
  // cy.get("p").contains("Clubs and groups, Things to do")
  // }

  // })

  it("lets the user suggest edits", () => {
    cy.get("div[role='dialog'] a").contains("Suggest an edit").click()
    cy.wait("@singleServiceFeedback")
  })
})
