
describe('cypress weekend entry task', () => {
  beforeEach(() => {
    cy.visit('https://www.kiwi.com/en/airport/bcn/barcelona-el-prat-barcelona-spain/')
    cy.clearCookies()

    cy.get('[data-test="CookiesPopup-Accept"]').click() // cookies
  })

  it('Visits Barcelona airport', () => {

//be.visible, search form, h1
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

  it.only('Ibiza trip', () => {
    
    //cy.get('[data-test="PictureCard"]').then(($cards) => {
     // const firstCard = $cards[0] // Cypress._.sample($cards)
     // firstCard.click()

      // test that current url matches what we clicked
     // const cardHref = Cypress.$(firstCard).attr("href")
     // cy.url().should('include', cardHref)
    // })

    // cy.get('[data-test="PlacePickerInput-destination"] > [data-test="PlacePickerInputPlace"]').then(($searchButton) => {
    //   cy.url().should('include', $searchButton.text().toLowerCase())
    // })

    cy.get('[data-test="PictureCard"]').first().click()
    cy.url().should('include', 'search/results')
    
  //one cabin bag
    cy.get('[data-test="FilterHeader-bags"]').find('[aria-label="increment"]').first().click()

  //results updated
    cy.intercept('https://api.skypicker.com/umbrella/v2/graphql?featureName=SearchReturnItinerariesQuery').as('search')
    cy.wait('@search')
   // cy.get('[data-test="ResultList"]')

   //reservation
   cy.get('[data-test="ResultCardWrapper"]').find('[data-test="BookingButton"]').first().click()
   cy.get('[data-test="MagicLogin-RequiredLogin"]')
   cy.get('[data-test="MagicLogin-GuestTextLink"]').click()
   cy.url().should('include', 'booking')
  })
})
