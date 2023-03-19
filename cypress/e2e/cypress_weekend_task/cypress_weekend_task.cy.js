
Cypress._.times(10, () => {
  describe('cypress weekend entry task', () => {
    beforeEach(() => {
      cy.setCookie('__kwc_agreed', 'true')
      cy.visit('https://www.kiwi.com/en/airport/bcn/barcelona-el-prat-barcelona-spain/')

    })

    it('visits Barcelona airport and checks the visibility of critical components', () => {

      cy.get('#sticky-search-form').should('be.visible')
      cy.get('[data-test="TrendingDestinations"]').should('be.visible')
      cy.get('[data-test="PopularFlights"]').should('be.visible')
      cy.get('[data-test="DestinationsMap"]').should('be.visible')
      cy.get('[data-test="Faq"]').should('be.visible')
      cy.get('[data-test="TopAirlines"]').should('be.visible')
      cy.get('[data-test="NavBar"]').should('be.visible')
      cy.get('[data-test="SearchFieldItem-origin"]').should('contain', 'Barcelona BCN')
      cy.get('h1').should('contain', 'Barcelona–El Prat (BCN)')
    })

    it('clicks to the first picture card, adds a cabin bag and tries to make a reservation', () => {

      cy.get('[data-test="PictureCard"]').first().click()
      cy.url().should('include', 'search/results')

      cy.get('[data-test="FilterHeader-bags"]').find('[aria-label="increment"]').first().click()
      cy.url().should('include', 'bags=1.0-')
      cy.log('one cabin bag added')
       
      cy.intercept('https://api.skypicker.com/umbrella/v2/graphql?featureName=SearchReturnItinerariesQuery').as('search')
      cy.wait('@search', {timeout: 8000})
      cy.log('results updated')
      
      cy.get('[data-test="ResultCardWrapper"]').find('[data-test="BookingButton"]').first().click()
      cy.get('[data-test="MagicLogin-RequiredLogin"]').should('be.visible')
      cy.get('[data-test="MagicLogin-GuestTextLink"]').click()
      cy.url().should('include', 'booking')
    })
  })
})
