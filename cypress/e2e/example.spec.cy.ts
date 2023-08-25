import { baseUrl } from '../support/e2e'

describe('Example', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('loads the main page', () => {
    cy.contains('Esimerkkisovellus')
  })
})
