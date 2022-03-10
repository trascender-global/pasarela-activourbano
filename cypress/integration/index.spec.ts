describe('Home page', () => {
    const validId = '1234'

    beforeEach(() => {
        cy.visit('/auth/login')
        cy.get('input#user-id').focus().type(validId).blur()
        cy.get('#login-form button[type="submit"]').click()
    })

    it('should have a navbar with a sign-out button', () => {
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('#navbar').should('have.attr', 'role', 'navigation')
        cy.get('#logout-btn').should('be.visible')
    })
})