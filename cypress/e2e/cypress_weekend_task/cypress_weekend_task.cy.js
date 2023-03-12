
describe('My First Test', () => {
  it('Visits Barcelona airport', () => {
    cy.visit('https://www.kiwi.com/en/airport/bcn/barcelona-el-prat-barcelona-spain/')
    cy.get('[data-test="CookiesPopup-Accept"]').click()
// data-test="CloseContainer" - vyskakujici okno

    //Add checked in baggage
    cy.get('[data-test="PassengersField"]').click()
    cy.get('[data-test="BagsPopup-cabin"]').find('[aria-label="increment"]').click()
    cy.get('[data-test="PassengersFieldFooter-done"]').click()
//be.visible
    cy.get('#sticky-search-form').should('be.visible')
    cy.get('[data-test="TrendingDestinations"]').should('be.visible')
    cy.get('[data-test="PopularFlights"]').should('be.visible')
    cy.get('[data-test="DestinationsMap"]').should('be.visible')
    cy.get('[data-test="Faq"]').should('be.visible')
    cy.get('[data-test="TopAirlines"]').should('be.visible')
    cy.get('[data-test="NavBar"]').should('be.visible')
  })
})
