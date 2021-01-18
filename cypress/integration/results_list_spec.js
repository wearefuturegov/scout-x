describe("Results list page", () => {
  beforeEach(() => {
    cy.intercept("https://example.com/api/v1/services?", {
      fixture: "services.json",
    }).as("searchForServices")

    cy.visit("/")
    cy.injectAxe()
  })

  it("has no detectable accessibility problems", () => {
    cy.checkA11y()
  })

  it("renders a first page of 20 results", () => {
    cy.get("h1").should("contain", "Find activities and organisations near you")

    cy.get("#results li").should("have.length", 20)

    cy.get("#results")
      .should("contain", "12th Aylesbury Brownies")
      .should("contain", "Chepping View Primary Academy")

    cy.get("button").should("contain", "Next page")
  })

  it("responds to keyword and location search", () => {
    cy.get("input#query").type("Example")

    cy.get("input#location").type("Example2")

    cy.get("form").submit()

    cy.wait("@searchForServices")

    cy.get("p").contains("Showing results for Example near Example2")
  })

  it("has a switch for rendering a map", () => {
    cy.get("label").contains("Show map?").click()

    cy.wait("@searchForServices")
  })

  it("responds to collection filtering", () => {
    cy.get("label").contains("Things to do").click()

    cy.wait("@searchForServices")
  })

  it("responds to category filtering", () => {
    cy.get("label").contains("Things to do").click()

    cy.get("button").contains("Categories").click()

    cy.get("label").contains("Clubs and groups").click()

    cy.wait("@searchForServices")
  })

  it("responds to SEND need filtering", () => {
    cy.get("button").contains("SEND needs").click()

    cy.get("label").contains("Autism").click()

    cy.wait("@searchForServices")
  })

  it("responds to age filtering", () => {
    cy.get("button").contains("Ages").click()

    cy.get("input#min_age").type("0")

    cy.get("input#max_age").type("10")

    cy.wait("@searchForServices")
  })

  it("responds to 'only' filtering", () => {
    cy.get("button").contains("Only show").click()

    cy.get("label").contains("Free").click()

    cy.wait("@searchForServices")
  })
})
