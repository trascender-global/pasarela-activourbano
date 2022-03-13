describe('Login page', () => {
    const shortId = '123'
    const nonDigitId = 'aab12'
    const unauthorizedId = '1237'
    const validId = '1234'

    beforeEach(() => {
        if (window.location.href === Cypress.config().baseUrl + '/') {
            cy.get('#logout-btn').click()
        }
        cy.visit('/auth/login')
    })

    it('should have a login form', () => {
        cy.get('#login-form').should('be.visible')
    })

    it('should have image with alt', () => {
        cy.get('#au-logo').should('have.attr', 'alt', 'Logo Activo Urbano')
    })

    it('should show the user an error if the id input is empty and touched', () => {
        cy.get('input#user-id').focus().blur().should('have.attr', 'aria-invalid', 'true')
        cy.get('#field-1-feedback').should('contain.text', 'El documento de identidad es requerido.')
    })

    it('should show the user an error if the id contains non-numeric characters', () => {
        cy.get('input#user-id').focus().type(nonDigitId).blur().should('have.attr', 'aria-invalid', 'true')
        cy.get('#field-1-feedback').should('contain.text', 'El documento sólo debe contener números.')
    })

    it('should show the user an error if the id is below 4 digits', () => {
        cy.get('input#user-id').focus().type(shortId).blur().should('have.attr', 'aria-invalid', 'true')
        cy.get('#field-1-feedback').should('contain.text', 'El documento debe tener mínimo 4 dígitos.')
    })

    it('should show the user an error if the id is not authorized', () => {
        cy.get('input#user-id').focus().type(unauthorizedId).blur()
        cy.get('#field-1-helptext').should('contain.text', 'Tu documento de identidad es válido.')
        cy.get('#login-form button[type="submit"]').click()
        cy.url().should('contain', 'error=CredentialsSignin')
        cy.get('#chakra-toast-manager-bottom').should('contain', 'Combinación inválida').should('contain', 'No se pudo iniciar sesión, verifique su documento de identidad.')
    })

    it('should allow the user to log in if the id is valid', () => {
        cy.get('input#user-id').focus().type(validId).blur()
        cy.get('#field-1-helptext').should('contain.text', 'Tu documento de identidad es válido.')
        cy.get('#login-form button[type="submit"]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
})